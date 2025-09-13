'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, User, Vote, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { ElectionDTO, CandidatDTO, ResultatsElectionDTO, ElectionsService, CandidatsPublicService, VoterElectionRequest } from '@/lib';
import { AuthenticatedElectionsService, AuthenticatedVoteService } from '@/lib/auth/authenticatedServices';
import { useState } from 'react';
import { VoteCandidatCard } from './VoteCandidatCard';

interface DetailedVoteFormProps {
  electionId: string;
}

const useElectionData = (electionId: string) => {
  return useQuery<{
    election: ElectionDTO;
    candidats: CandidatDTO[];
    canVote: boolean;
  }, Error>({
    queryKey: ['election', electionId],
    queryFn: async () => {
      const election = await ElectionsService.obtenirElection1(electionId);
      let candidats: CandidatDTO[] = [];
      if (election.candidatsParticipants && election.candidatsParticipants.length > 0) {
        candidats = await Promise.all(
          election.candidatsParticipants.map(candidatId => 
            CandidatsPublicService.obtenirCandidat(candidatId)
          )
        );
      }
      const peutVoterResponse = await AuthenticatedVoteService.verifierPeutVoter();
      const canVote = peutVoterResponse.peutVoter || false;
      console.log('Candidats récupérés:', candidats);
      return { election, candidats: candidats || [], canVote };
    },
    enabled: !!electionId,
  });
};

export function DetailedVoteForm({ electionId }: DetailedVoteFormProps) {
  const queryClient = useQueryClient();
  const [selectedCandidat, setSelectedCandidat] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { data, isLoading, error: queryError } = useElectionData(electionId);
  const { election, candidats = [], canVote = false } = data || {};

  const { data: resultsData, isLoading: isLoadingResults } = useQuery<ResultatsElectionDTO, Error>({
    queryKey: ['electionResults', electionId],
    queryFn: () => ElectionsService.obtenirResultatsElection(electionId),
    enabled: !isLoading && !canVote && !!electionId, // Activer si l'utilisateur ne peut pas voter
  });

  const voteMutation = useMutation({
    mutationFn: (candidatId: string) => {
      const request: VoterElectionRequest = { candidatId, electionId };
      return AuthenticatedElectionsService.voterPourElection(electionId, request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['election', electionId] });
      setShowConfirmation(false);
      // Optionnel: afficher un message de succès avant de rafraîchir ou rediriger
    },
  });

  const handleVoteSubmit = () => {
    if (!selectedCandidat) return;
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    voteMutation.mutate(selectedCandidat);
  };

  const error = queryError || voteMutation.error;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center text-red-600">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-lg font-semibold">Erreur de chargement</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">{election?.titre}</h3>
        <p className="text-sm text-gray-600 mt-1">{election?.description}</p>
      </div>

      <div className="p-6">
        {voteMutation.isSuccess ? (
          <div className="text-center py-12">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">Vote enregistré !</h3>
            <p className="text-gray-600 mt-2">Merci pour votre participation.</p>
          </div>
        ) : !canVote ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Info className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
                <span className="text-sm font-medium text-blue-800">
                  Vous avez déjà voté, ne pouvez pas voter pour cette élection, ou elle est terminée.
                </span>
              </div>
            </div>
            {isLoadingResults && <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto" />}
            {resultsData && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{"Résultats de l'élection"}</h4>
                <div className="space-y-3">
                  {resultsData.resultatsParCandidat && resultsData.resultatsParCandidat.length > 0 ? (
                    resultsData.resultatsParCandidat.map((resultat) => (
                      <div key={resultat.candidatId} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-gray-600 mr-3" />
                          <span className="font-medium text-gray-800">{resultat.candidatNom}</span>
                        </div>
                        <span className="font-semibold text-blue-700">{resultat.nombreVotes} votes ({resultat.pourcentageVotes}%)</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">Les résultats ne sont pas encore disponibles.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">Choisissez votre candidat</h4>
              <p className="text-sm text-gray-600">Cliquez sur la carte du candidat pour le sélectionner.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidats.map((candidat) => {
                const candidatInfo = (candidat as any).candidat || candidat;
                const candidatId = candidatInfo.externalIdCandidat || candidat.externalIdCandidat;
                return (
                  <VoteCandidatCard 
                    key={candidatId}
                    candidat={candidat}
                    isSelected={selectedCandidat === candidatId}
                    onClick={() => setSelectedCandidat(candidatId || '')}
                  />
                );
              })}
            </div>
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button 
                onClick={handleVoteSubmit}
                disabled={!selectedCandidat || voteMutation.isPending}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center">
                {voteMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Vote className="mr-2 h-5 w-5"/>}
                Valider mon vote
              </button>
            </div>
          </div>
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-900">Confirmer votre vote</h3>
            <p className="text-gray-600 mt-2">Êtes-vous sûr de vouloir voter pour ce candidat ? Cette action est irréversible.</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Annuler</button>
              <button onClick={confirmVote} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
