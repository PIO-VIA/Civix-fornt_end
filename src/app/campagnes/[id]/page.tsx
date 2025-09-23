'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  ExternalLink,
  Target
} from 'lucide-react';
import { CampagnesPublicService } from '@/lib';
import type { CampagneDetailDTO } from '@/types';

export default function CampagnePage() {
  const params = useParams();
  const campagneId = params.id as string;
  
  const [campagne, setCampagne] = useState<CampagneDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampagneData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const campagneResponse = await CampagnesPublicService.obtenirCampagne(campagneId);
        setCampagne(campagneResponse);
      } catch (err) {
        console.error('Erreur lors du chargement des données de la campagne:', err);
        setError('Impossible de charger les informations de la campagne');
      } finally {
        setLoading(false);
      }
    };

    if (campagneId) {
      fetchCampagneData();
    }
  }, [campagneId]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des informations de la campagne...</p>
        </div>
      </div>
    );
  }

  if (error || !campagne?.campagne) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Campagne introuvable</h1>
          <p className="text-gray-600 mb-6">{error || 'Cette campagne n&apos;existe pas ou n&apos;est plus disponible'}</p>
          <Link
            href="/campagnes"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux campagnes
          </Link>
        </div>
      </div>
    );
  }

  const campagneInfo = campagne.campagne;
  const candidat = campagne.candidat;

  const isValidPath = (path?: string) => {
    return path && path.trim() !== '' && path !== 'string' && (path.startsWith('/') || path.startsWith('http'));
  };
  
  const campagneImage = isValidPath(campagneInfo.photo) ? campagneInfo.photo! : '/assets/poduim.jpeg';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/campagnes"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux campagnes
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de la campagne */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8"
        >
          {/* Image de la campagne */}
          <div className="relative h-48">
            <Image
              src={campagneImage}
              alt={'Photo de campagne'}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            {/* Description */}
            {campagneInfo.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{campagneInfo.description}</p>
              </div>
            )}


            {/* Informations détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



            </div>
          </div>
        </motion.div>

        {/* Section candidat */}
        {candidat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Candidat</h2>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {candidat.photo ? (
                    <Image
                      src={candidat.photo}
                      alt={candidat.username || 'Photo du candidat'}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {candidat.username || 'Nom non disponible'}
                  </h3>
                  {candidat.email && (
                    <p className="text-gray-600">{candidat.email}</p>
                  )}
                  {candidat.description && (
                    <p className="text-gray-700 mt-2">{candidat.description}</p>
                  )}
                </div>
                <Link
                  href={`/candidats/${candidat.externalIdCandidat}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir le profil
                </Link>
              </div>
            </div>
          </motion.div>
        )}


      </div>
    </div>
  );
}