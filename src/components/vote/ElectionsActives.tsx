'use client';

import { useEffect, useState } from 'react';
import { ElectionsService } from '@/lib/services/ElectionsService';
import { AuthenticatedVoteService } from '@/lib/auth/authenticatedServices';
import { ElectionVoteCard } from './ElectionVoteCard';
import { ElectionDTO } from '@/lib';

interface ElectionsActivesProps {
  userId: string;
}

interface ElectionAvecStatut extends ElectionDTO {
  aVote?: boolean;
  peutVoter?: boolean;
}

export function ElectionsActives({ userId }: ElectionsActivesProps) {
  const [elections, setElections] = useState<ElectionAvecStatut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadElections = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer toutes les élections (endpoint public)
        const electionsOuvertes = await ElectionsService.listerToutesElections();
        
        if (!electionsOuvertes || electionsOuvertes.length === 0) {
          setElections([]);
          return;
        }

        // Vérifier le statut de vote pour chaque élection
        const electionsAvecStatut = await Promise.all(
          electionsOuvertes.map(async (election) => {
            try {
              const statutVote = await AuthenticatedVoteService.obtenirStatutVote();
              return {
                ...election,
                aVote: statutVote.avote || false,
                peutVoter: statutVote.peutVoter || false
              };
            } catch (err) {
              console.error(`Erreur statut vote pour élection ${election.externalIdElection}:`, err);
              return {
                ...election,
                aVote: false,
                peutVoter: false // Par défaut, l'utilisateur ne peut pas voter
              };
            }
          })
        );

        // Filtrer pour ne montrer que les élections où l'utilisateur peut voter
        const electionsEligibles = electionsAvecStatut.filter(election => 
          election.peutVoter && !election.aVote && 
          (election.statut === 'OUVERTE' || election.statut === 'EN_COURS')
        );

        setElections(electionsEligibles);
      } catch (err) {
        console.error('Erreur lors du chargement des élections actives:', err);
        setError('Impossible de charger les élections actives');
      } finally {
        setLoading(false);
      }
    };

    loadElections();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chargement des élections...
          </h3>
        </div>
      </div>
    );
  }

  if (error) {
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
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (elections.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune élection disponible
          </h3>
          <p className="text-gray-600">
            {"Vous n'êtes inscrit à aucune élection ouverte au vote actuellement, ou vous avez déjà voté pour toutes les élections disponibles."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Élections ouvertes au vote
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {elections.map((election) => (
          <ElectionVoteCard
            key={election.externalIdElection}
            election={election}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}