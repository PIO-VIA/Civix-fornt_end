'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const electionImage = election.photo || '/assets/poduim.jpeg';

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
            <Link
              href={`/vote?election=${election.externalIdElection}`}
              className="bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Voter
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}