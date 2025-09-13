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
  const nombreCampagnes = candidat.campagnes?.length || 0;
  
  const isValidPath = (path?: string) => {
    return path && path.trim() !== '' && path !== 'string' && (path.startsWith('/') || path.startsWith('http'));
  };
  
  const candidatImage = isValidPath(candidat.photo) ? candidat.photo! : '/assets/poduim.jpeg';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Photo du candidat */}
      <div className="relative h-48">
        <Image
          src={candidatImage}
          alt={candidat.username || 'Candidat'}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <div className="bg-white bg-opacity-90 rounded-lg px-3 py-1">
            <span className="text-sm font-medium text-gray-900">
              {candidat.username || 'Candidat'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Informations du candidat */}
        <div className="mb-4">
          {candidat.email && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              <span className="truncate">{candidat.email}</span>
            </div>
          )}
          {candidat.description && (
            <p className="text-gray-700 text-sm line-clamp-2">
              {candidat.description}
            </p>
          )}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg col-span-2">
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