import { ElectionsService } from '@/lib/services/ElectionsService';
import { VoteService } from '@/lib/services/VoteService';
import { ElectionVoteCard } from './ElectionVoteCard';

interface ElectionsActivesProps {
  userId: string;
}

export async function ElectionsActives({ userId }: ElectionsActivesProps) {
  try {
    // Récupérer les élections ouvertes
    const electionsOuvertes = await ElectionsService.obtenirElectionsOuvertes();
    
    if (!electionsOuvertes || electionsOuvertes.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune élection active
            </h3>
            <p className="text-gray-600">
              Il n'y a actuellement aucune élection ouverte au vote.
            </p>
          </div>
        </div>
      );
    }

    // Vérifier le statut de vote pour chaque élection
    const electionsAvecStatut = await Promise.all(
      electionsOuvertes.map(async (election) => {
        try {
          const statutVote = await VoteService.verifierStatutVoteElecteur(
            `Bearer ${process.env.API_TOKEN}`, // Token du serveur
            election.externalIdElection!
          );
          return {
            ...election,
            aVote: statutVote.aVote || false,
            peutVoter: statutVote.peutVoter || false
          };
        } catch (error) {
          console.error(`Erreur statut vote pour élection ${election.externalIdElection}:`, error);
          return {
            ...election,
            aVote: false,
            peutVoter: true
          };
        }
      })
    );

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Élections ouvertes au vote
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {electionsAvecStatut.map((election) => (
            <ElectionVoteCard
              key={election.externalIdElection}
              election={election}
              userId={userId}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erreur lors du chargement des élections actives:', error);
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-gray-600">
            Impossible de charger les élections actives.
          </p>
        </div>
      </div>
    );
  }
}