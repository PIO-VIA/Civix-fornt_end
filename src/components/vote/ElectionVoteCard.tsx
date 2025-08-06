'use client';

import Link from 'next/link';
import { Calendar, Users, CheckCircle2, Vote, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ElectionDTO } from '@/types';

interface ElectionVoteCardProps {
  election: ElectionDTO & {
    aVote?: boolean;
    peutVoter?: boolean;
  };
  userId: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Non définie';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function ElectionVoteCard({ election, userId }: ElectionVoteCardProps) {
  const hasVoted = election.aVote;
  const canVote = election.peutVoter && !hasVoted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-6">
        {/* Header avec titre et statut */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex-1 line-clamp-2">
            {election.titre || 'Sans titre'}
          </h3>
          <div className="ml-4">
            {hasVoted ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Voté
              </span>
            ) : canVote ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Vote className="w-3 h-3 mr-1" />
                Ouvert
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <Clock className="w-3 h-3 mr-1" />
                Fermé
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {election.description || 'Aucune description disponible'}
        </p>

        {/* Informations */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Fin le {formatDate(election.dateFin)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>
              {election.nombreVotes || 0} votes / {election.nombreElecteursInscrits || 0} électeurs
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {hasVoted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">
                  Vous avez déjà voté pour cette élection
                </span>
              </div>
            </div>
          ) : canVote ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/vote/${election.externalIdElection}`}
                className="w-full bg-blue-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Vote className="w-4 h-4 mr-2" />
                Voter maintenant
              </Link>
            </motion.div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Vote non autorisé ou fermé
                </span>
              </div>
            </div>
          )}
          
          {/* Lien vers les détails */}
          <Link
            href={`/elections/${election.externalIdElection}`}
            className="w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </motion.div>
  );
}