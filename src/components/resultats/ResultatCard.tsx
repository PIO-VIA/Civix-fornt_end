'use client';

import Link from 'next/link';
import { Calendar, Users, TrendingUp, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ElectionDTO, ResultatsElectionDTO } from '@/types';

interface ResultatCardProps {
  election: ElectionDTO;
  resultats: ResultatsElectionDTO | null;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Non définie';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const calculatePercentage = (votes: number, total: number) => {
  if (total === 0) return 0;
  return ((votes / total) * 100).toFixed(1);
};

export function ResultatCard({ election, resultats }: ResultatCardProps) {
  const totalVotes = election.nombreVotes || 0;
  const participation = election.nombreElecteursInscrits 
    ? ((totalVotes / election.nombreElecteursInscrits) * 100).toFixed(1)
    : '0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {election.titre || 'Sans titre'}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {election.description}
            </p>
          </div>
          <div className="ml-4 text-right">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Terminée
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-lg font-semibold text-gray-900">{totalVotes}</span>
            </div>
            <span className="text-sm text-gray-600">Votes exprimés</span>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-lg font-semibold text-gray-900">{participation}%</span>
            </div>
            <span className="text-sm text-gray-600">Participation</span>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">
                {formatDate(election.dateFin)}
              </span>
            </div>
            <span className="text-sm text-gray-600">Date de clôture</span>
          </div>
        </div>

        {/* Résultats par candidat */}
        {resultats && resultats.resultatsParCandidat && resultats.resultatsParCandidat.length > 0 ? (
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Résultats par candidat
            </h4>
            
            <div className="space-y-3">
              {resultats.resultatsParCandidat
                .sort((a, b) => (b.nombreVotes || 0) - (a.nombreVotes || 0))
                .map((resultat, index) => {
                  const percentage = calculatePercentage(resultat.nombreVotes || 0, totalVotes);
                  const isWinner = index === 0 && totalVotes > 0;
                  
                  return (
                    <motion.div
                      key={resultat.candidatId || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 ${
                        isWinner 
                          ? 'border-yellow-300 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {isWinner && (
                            <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                          )}
                          <span className="font-medium text-gray-900">
                            {resultat.candidatNom || 'Candidat inconnu'}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {resultat.nombreVotes || 0} votes
                          </div>
                          <div className="text-sm text-gray-600">
                            {percentage}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Barre de progression */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                          className={`h-2 rounded-full ${
                            isWinner ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="mb-6 text-center py-8 text-gray-500">
            <TrendingUp className="mx-auto h-8 w-8 mb-2 text-gray-300" />
            <p>Aucun résultat détaillé disponible</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            href={`/elections/${election.externalIdElection}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Voir les détails
          </Link>
          <Link
            href={`/elections/${election.externalIdElection}/resultats`}
            className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Rapport complet
          </Link>
        </div>
      </div>
    </motion.div>
  );
}