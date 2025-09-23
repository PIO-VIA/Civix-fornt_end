'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Mail, ArrowLeft, Vote, Calendar, TrendingUp } from 'lucide-react';
import { CandidatsPublicService } from '@/lib/services/CandidatsPublicService';
import type { CandidatDetailDTO } from '@/lib/models/CandidatDetailDTO';
import type { CampagneDTO } from '@/lib/models/CampagneDTO';

export default function CandidatPage() {
  const params = useParams();
  const candidatId = params.id as string;
  
  const [candidatDetail, setCandidatDetail] = useState<CandidatDetailDTO | null>(null);
  const [campagnes, setCampagnes] = useState<CampagneDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidatData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [detailResponse, campagnesResponse] = await Promise.all([
          CandidatsPublicService.obtenirCandidat(candidatId),
          CandidatsPublicService.obtenirCampagnesCandidat(candidatId)
        ]);
        
        setCandidatDetail(detailResponse);
        setCampagnes(campagnesResponse);
      } catch (err) {
        console.error('Erreur lors du chargement des données du candidat:', err);
        setError('Impossible de charger les informations du candidat');
      } finally {
        setLoading(false);
      }
    };

    if (candidatId) {
      fetchCandidatData();
    }
  }, [candidatId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des informations du candidat...</p>
        </div>
      </div>
    );
  }

  if (error || !candidatDetail?.candidat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Candidat introuvable</h1>
          <p className="text-gray-600 mb-6">{error || 'Ce candidat n&apos;existe pas ou n&apos;est plus disponible'}</p>
          <Link
            href="/candidats"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const candidat = candidatDetail.candidat;
  const nombreVotes = candidatDetail.nombreVotes || 0;
  const nombreCampagnes = campagnes.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/candidats"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux candidats
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profil principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8"
        >
          {/* Header du profil */}
          <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
            <div className="absolute bottom-6 left-6">
              <div className="flex items-end space-x-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  {candidat.photo ? (
                    <Image
                      src={candidat.photo}
                      alt={candidat.username || 'Photo du candidat'}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-blue-600" />
                  )}
                </div>
                <div className="text-white pb-2">
                  <h1 className="text-3xl font-bold">{candidat.username || 'Nom non disponible'}</h1>
                  {candidat.email && (
                    <div className="flex items-center mt-2">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-blue-100">{candidat.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Description */}
            {candidat.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">À propos</h3>
                <p className="text-gray-700 leading-relaxed">{candidat.description}</p>
              </div>
            )}

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Vote className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{nombreVotes.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Votes reçus</div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{nombreCampagnes}</div>
                <div className="text-sm text-gray-600">Campagnes</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {nombreCampagnes > 0 ? Math.round(nombreVotes / nombreCampagnes) : 0}
                </div>
                <div className="text-sm text-gray-600">Votes/Campagne</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section des campagnes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Campagnes</h2>
              {nombreCampagnes > 0 && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {nombreCampagnes} campagne{nombreCampagnes > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          <div className="p-6">
            {campagnes.length > 0 ? (
              <div className="grid gap-4">
                {campagnes.map((campagne, index) => (
                  <motion.div
                    key={campagne.externalIdCampagne || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {`Campagne ${index + 1}`}
                        </h3>
                        {campagne.description && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {campagne.description}
                          </p>
                        )}
                      </div>
                      {campagne.externalIdCampagne && (
                        <Link
                          href={`/campagnes/${campagne.externalIdCampagne}`}
                          className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                        >
                          Voir détails
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune campagne</h3>
                <p className="text-gray-600">Ce candidat n&apos;a pas encore de campagnes publiques.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}