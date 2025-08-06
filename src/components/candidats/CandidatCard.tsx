'use client';

import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Vote } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CandidatDTO } from '@/types';

interface CandidatCardProps {
  candidat: CandidatDTO;
}

export function CandidatCard({ candidat }: CandidatCardProps) {
  const nombreVotes = candidat.votes?.length || 0;
  const nombreCampagnes = candidat.campagnes?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Photo de profil */}
      <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 relative">
        <div className="absolute bottom-4 left-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="p-6 pt-8">
        {/* Nom et identifiant */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {candidat.username || 'Nom non disponible'}
          </h3>
          {candidat.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span className="truncate">{candidat.email}</span>
            </div>
          )}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">{nombreVotes}</div>
            <div className="text-xs text-gray-600">Votes reçus</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">{nombreCampagnes}</div>
            <div className="text-xs text-gray-600">Campagnes</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Link
            href={`/candidats/${candidat.externalIdCandidat}`}
            className="w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <User className="w-4 h-4 mr-2" />
            Voir le profil
          </Link>
          {nombreCampagnes > 0 && (
            <Link
              href={`/candidats/${candidat.externalIdCandidat}/campagnes`}
              className="w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Vote className="w-4 h-4 mr-2" />
              Voir les campagnes
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}