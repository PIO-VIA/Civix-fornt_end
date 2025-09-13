'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  MapPin,
  ExternalLink,
  Clock,
  Target,
  Users,
  TrendingUp,
  MessageSquare
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
        console.error('Erreur lors du chargement des donn�es de la campagne:', err);
        setError('Impossible de charger les informations de la campagne');
      } finally {
        setLoading(false);
      }
    };

    if (campagneId) {
      fetchCampagneData();
    }
  }, [campagneId]);

  const getStatutColor = (statut?: string) => {
    switch (statut?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'terminee':
        return 'bg-red-100 text-red-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'brouillon':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatutText = (statut?: string) => {
    switch (statut?.toLowerCase()) {
      case 'active':
        return 'Active';
      case 'terminee':
        return 'Termin�e';
      case 'en_attente':
        return 'En attente';
      case 'brouillon':
        return 'Brouillon';
      default:
        return statut || 'Statut inconnu';
    }
  };

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
  const election = campagne.election;

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
        {/* En-t�te de la campagne */}
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
              alt={campagneInfo.nom || 'Campagne'}
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

            {/* Programme */}
            {campagneInfo.programme && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Programme</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{campagneInfo.programme}</p>
                </div>
              </div>
            )}

            {/* Informations d�taill�es */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {campagneInfo.dateDebut && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Date de d�but</span>
                  </div>
                  <p className="text-green-700">
                    {new Date(campagneInfo.dateDebut).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {campagneInfo.dateFin && (
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Date de fin</span>
                  </div>
                  <p className="text-red-700">
                    {new Date(campagneInfo.dateFin).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {campagneInfo.budget && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Budget</span>
                  </div>
                  <p className="text-blue-700 font-semibold">
                    {campagneInfo.budget.toLocaleString('fr-FR')} �
                  </p>
                </div>
              )}

              {campagneInfo.objectifVotes && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Target className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Objectif votes</span>
                  </div>
                  <p className="text-purple-700 font-semibold">
                    {campagneInfo.objectifVotes.toLocaleString('fr-FR')} votes
                  </p>
                </div>
              )}
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

        {/* Section �lection */}
        {election && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">�lection associ�e</h2>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {election.nom || 'Nom de l\'�lection non disponible'}
                  </h3>
                  {election.description && (
                    <p className="text-gray-600 mb-4">{election.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {election.dateDebut && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          D�but: {new Date(election.dateDebut).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                    {election.dateFin && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Fin: {new Date(election.dateFin).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    )}
                    {election.lieu && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{election.lieu}</span>
                      </div>
                    )}
                    {election.typeElection && (
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{election.typeElection}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link
                  href={`/elections/${election.externalIdElection}`}
                  className="ml-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir l'�lection
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Messages de la campagne */}
        {campagne.messages && campagne.messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Messages de campagne</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {campagne.messages.length} message{campagne.messages.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {campagne.messages.map((message, index) => (
                  <motion.div
                    key={message.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {message.titre || `Message ${index + 1}`}
                        </h4>
                        <p className="text-gray-700 mb-2">{message.contenu}</p>
                        {message.dateEnvoi && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(message.dateEnvoi).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}