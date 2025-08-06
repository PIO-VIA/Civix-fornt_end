'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, User, Vote, AlertTriangle, ArrowRight } from 'lucide-react';
import { ElectionsService } from '@/lib/services/ElectionsService';
import { VoteService } from '@/lib/services/VoteService';
import { CandidatsPublicService } from '@/lib/services/CandidatsPublicService';
import type { ElectionDTO, CandidatDTO } from '@/types';

interface DetailedVoteFormProps {
  electionId: string;
  user: {
    externalIdElecteur: string;
    username?: string;
    email?: string;
  };
}

export function DetailedVoteForm({ electionId, user }: DetailedVoteFormProps) {
  const router = useRouter();
  const [election, setElection] = useState<ElectionDTO | null>(null);
  const [candidats, setCandidats] = useState<CandidatDTO[]>([]);
  const [selectedCandidat, setSelectedCandidat] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    loadElectionData();
  }, [electionId]);

  const loadElectionData = async () => {
    try {
      setIsLoading(true);
      
      // Charger les détails de l'élection
      const electionData = await ElectionsService.obtenirElection(electionId);
      setElection(electionData);

      // Charger les candidats participants
      if (electionData.candidatsParticipants && electionData.candidatsParticipants.length > 0) {
        const candidatsData = await Promise.all(
          electionData.candidatsParticipants.map(candidatId => 
            CandidatsPublicService.obtenirCandidatPublic(candidatId)
          )
        );
        setCandidats(candidatsData.filter(Boolean));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError('Erreur lors du chargement des données de l\'élection');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoteSubmit = async () => {
    if (!selectedCandidat) {
      setError('Veuillez sélectionner un candidat');
      return;
    }

    setIsVoting(true);
    setError('');

    try {
      // Prévisualiser le vote
      const previewResponse = await VoteService.previsualiserVote(
        `Bearer ${localStorage.getItem('token')}`,
        selectedCandidat
      );

      if (previewResponse.success) {
        setShowConfirmation(true);
      } else {
        setError('Erreur lors de la prévisualisation du vote');
      }
    } catch (error) {
      console.error('Erreur lors de la prévisualisation:', error);
      setError('Erreur lors de la prévisualisation du vote');
    } finally {
      setIsVoting(false);
    }
  };

  const confirmVote = async () => {
    setIsVoting(true);
    setError('');

    try {
      const voteResponse = await VoteService.voterPourCandidat(
        `Bearer ${localStorage.getItem('token')}`,
        selectedCandidat
      );

      if (voteResponse.success) {
        // Rediriger vers la page de confirmation
        router.push(`/vote/confirmation?election=${electionId}&candidat=${selectedCandidat}`);
      } else {
        setError('Erreur lors de l\'enregistrement du vote');
      }
    } catch (error) {
      console.error('Erreur lors du vote:', error);
      setError('Erreur lors de l\'enregistrement du vote');
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="space-y-3 mt-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && !election) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center text-red-600">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900">
          {election?.titre}
        </h3>
        <p className="text-sm text-blue-700 mt-1">
          {election?.description}
        </p>
      </div>

      <div className="p-6">
        {/* Candidats */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Sélectionnez votre candidat :
          </h4>
          
          {candidats.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Aucun candidat disponible pour cette élection
            </p>
          ) : (
            <div className="space-y-3">
              {candidats.map((candidat) => (
                <motion.div
                  key={candidat.externalIdCandidat}
                  whileHover={{ scale: 1.01 }}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCandidat === candidat.externalIdCandidat
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCandidat(candidat.externalIdCandidat!)}
                >
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <div className="bg-gray-100 rounded-full p-2 mr-3">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {candidat.username || 'Nom non disponible'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {candidat.email}
                        </div>
                      </div>
                    </div>
                    {selectedCandidat === candidat.externalIdCandidat && (
                      <CheckCircle2 className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Erreur */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        {!showConfirmation ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleVoteSubmit}
            disabled={!selectedCandidat || isVoting || candidats.length === 0}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isVoting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Traitement...
              </div>
            ) : (
              <>
                <Vote className="w-4 h-4 mr-2" />
                Prévisualiser le vote
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </motion.button>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">
                Confirmation de vote
              </h4>
              <p className="text-sm text-yellow-800">
                Vous êtes sur le point de voter pour :{' '}
                <strong>
                  {candidats.find(c => c.externalIdCandidat === selectedCandidat)?.username}
                </strong>
              </p>
              <p className="text-xs text-yellow-700 mt-2">
                ⚠️ Cette action est irréversible
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirmVote}
                disabled={isVoting}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 transition-colors flex items-center justify-center"
              >
                {isVoting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Vote en cours...
                  </div>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirmer le vote
                  </>
                )}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}