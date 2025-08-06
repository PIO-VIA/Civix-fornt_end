import Link from 'next/link';
import Image from 'next/image';
import { User, Eye, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CampagneDTO } from '@/types';

interface CampagneCardProps {
  campagne: CampagneDTO;
}

export function CampagneCard({ campagne }: CampagneCardProps) {
  const candidatNom = campagne.candidat?.username || 'Candidat inconnu';
  const candidatEmail = campagne.candidat?.email;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="flex">
        {/* Image de campagne */}
        <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex-shrink-0 relative">
          {campagne.photo ? (
            <Image
              src={campagne.photo}
              alt="Photo de campagne"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-16 h-16 text-blue-400" />
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="flex-1 p-6">
          {/* Header avec candidat */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Campagne de {candidatNom}
              </h3>
              {candidatEmail && (
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>{candidatEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
              {campagne.description || 'Aucune description disponible pour cette campagne.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Link
              href={`/campagnes/${campagne.externalIdCampagne}`}
              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              Voir la campagne
            </Link>
            {campagne.candidat?.externalIdCandidat && (
              <Link
                href={`/candidats/${campagne.candidat.externalIdCandidat}`}
                className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <User className="w-4 h-4 mr-2" />
                Profil candidat
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}