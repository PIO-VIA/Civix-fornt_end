import { ElectionsService } from '@/lib/services/ElectionsService';
import { VoteService } from '@/lib/services/VoteService';
import { ResultatCard } from './ResultatCard';

interface ResultatsListProps {
  userId: string;
}

export async function ResultatsList({ userId }: ResultatsListProps) {
  try {
    // Récupérer les élections terminées avec des résultats
    const electionsTerminees = await ElectionsService.obtenirElectionsAvecResultats();
    
    if (!electionsTerminees || electionsTerminees.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun résultat disponible
            </h3>
            <p className="text-gray-600">
              Il n'y a actuellement aucun résultat d'élection à afficher.
            </p>
          </div>
        </div>
      );
    }

    // Charger les résultats pour chaque élection
    const electionsAvecResultats = await Promise.all(
      electionsTerminees.map(async (election) => {
        try {
          const resultats = await ElectionsService.obtenirResultatsElection(
            election.externalIdElection!
          );
          return {
            election,
            resultats
          };
        } catch (error) {
          console.error(`Erreur résultats pour élection ${election.externalIdElection}:`, error);
          return {
            election,
            resultats: null
          };
        }
      })
    );

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Résultats des élections terminées
        </h2>
        
        <div className="space-y-6">
          {electionsAvecResultats.map(({ election, resultats }) => (
            <ResultatCard
              key={election.externalIdElection}
              election={election}
              resultats={resultats}
              userId={userId}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erreur lors du chargement des résultats:', error);
    
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
            Impossible de charger les résultats des élections.
          </p>
        </div>
      </div>
    );
  }
}