'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AlertModal } from '@/components/ui/AlertModal';
import { AuthenticatedVoteService } from '@/lib/auth/authenticatedServices';
import type { ElectionDTO } from '@/types';

interface ElectionCardProps {
  election: ElectionDTO;
}

const getStatutColor = (statut?: string) => {
  switch (statut) {
    case 'OUVERTE':
    case 'EN_COURS':
      return 'bg-green-100 text-green-800';
    case 'TERMINEE':
      return 'bg-blue-100 text-blue-800';
    case 'PLANIFIEE':
      return 'bg-yellow-100 text-yellow-800';
    case 'ANNULEE':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatutLabel = (statut?: string) => {
  switch (statut) {
    case 'OUVERTE':
      return 'Ouverte';
    case 'EN_COURS':
      return 'En cours';
    case 'TERMINEE':
      return 'Terminée';
    case 'PLANIFIEE':
      return 'Planifiée';
    case 'ANNULEE':
      return 'Annulée';
    default:
      return 'Inconnue';
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Non définie';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export function ElectionCard({ election }: ElectionCardProps) {
  const isActive = election.estActive;
  const hasEnded = election.statut === 'TERMINEE';
  const [showNotEligibleModal, setShowNotEligibleModal] = useState(false);
  const [canVote, setCanVote] = useState<boolean | null>(null);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  
  const isValidPath = (path?: string) => {
    return path && path.trim() !== '' && path !== 'string' && (path.startsWith('/') || path.startsWith('http'));
  };
  
  const electionImage = isValidPath(election.photo) ? election.photo! : '/assets/poduim.jpeg';

  // Fonction pour vérifier l'éligibilité au vote
  const checkVoteEligibility = async () => {
    try {
      setCheckingEligibility(true);
      const response = await AuthenticatedVoteService.obtenirStatutVote();
      const eligible = response.peutVoter && !response.avote;
      setCanVote(eligible || false);
      return eligible || false;
    } catch (error) {
      console.error('Erreur lors de la vérification d\'éligibilité:', error);
      setCanVote(false);
      return false;
    } finally {
      setCheckingEligibility(false);
    }
  };

  // Gérer le clic sur le bouton voter
  const handleVoteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const eligible = canVote !== null ? canVote : await checkVoteEligibility();
    
    if (!eligible) {
      setShowNotEligibleModal(true);
    } else {
      // Rediriger vers la page de vote
      window.location.href = `/vote?election=${election.externalIdElection}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Image de l'élection */}
      <div className="relative h-48">
        <Image
          src={electionImage}
          alt={election.titre || 'Élection'}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatutColor(election.statut)}`}>
            {getStatutLabel(election.statut)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        {/* Header avec titre */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {election.titre || 'Sans titre'}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {election.description || 'Aucune description disponible'}
        </p>

        {/* Informations */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Du {formatDate(election.dateDebut)} au {formatDate(election.dateFin)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{election.nombreElecteursInscrits || 0} électeurs inscrits</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            <span>{election.nombreVotes || 0} votes exprimés</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            href={`/elections/${election.externalIdElection}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Voir les détails
          </Link>
          {hasEnded && (
            <Link
              href={`/elections/${election.externalIdElection}/resultats`}
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Résultats
            </Link>
          )}
          {isActive && (
            <button
              onClick={handleVoteClick}
              disabled={checkingEligibility}
              className="bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {checkingEligibility ? 'Vérification...' : 'Voter'}
            </button>
          )}
        </div>
      </div>
      
      {/* Modal d'erreur pour inscription manquante */}
      <AlertModal
        isOpen={showNotEligibleModal}
        onClose={() => setShowNotEligibleModal(false)}
        title="Non inscrit à cette élection"
        message="Vous n'êtes pas inscrit à cette élection et ne pouvez donc pas y participer. Veuillez contacter l'administrateur si vous pensez qu'il s'agit d'une erreur."
        type="error"
      />
    </motion.div>
  );
}