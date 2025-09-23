'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Vote, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  
} from 'lucide-react';
import { ElectionsService, AdministrationService } from '@/lib';
import { PodiumResultats } from '@/components/resultats/PodiumResultats';
import type { ElectionDTO, ResultatsElectionDTO } from '@/types';

export default function ElectionPage() {
  const params = useParams();
  const electionId = params.id as string;
  
  const [election, setElection] = useState<ElectionDTO | null>(null);
  const [resultats, setResultats] = useState<ResultatsElectionDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Essayer d'abord obtenirElection1 (public), sinon obtenirElection (admin)
        let electionResponse;
        try {
          electionResponse = await ElectionsService.obtenirElection1(electionId);
        } catch {
          electionResponse = await AdministrationService.obtenirElection('bearer token', electionId);
        }
        
        setElection(electionResponse);

        // Récupérer les résultats si disponibles
        try {
          const resultatsResponse = await ElectionsService.obtenirResultatsElection(electionId);
          setResultats(resultatsResponse);
        } catch {
          // Les résultats ne sont peut-être pas encore disponibles
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données de l\'élection:', err);
        setError('Impossible de charger les informations de l\'élection');
      } finally {
        setLoading(false);
      }
    };

    if (electionId) {
      fetchElectionData();
    }
  }, [electionId]);

  const getStatutIcon = (statut?: string) => {
    switch (statut) {
      case 'OUVERTE':
      case 'EN_COURS':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'TERMINEE':
      case 'RESULTATS_PUBLIES':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'PLANIFIEE':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'ANNULEE':
        return <XCircle className="w-5 h-5 text-gray-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatutText = (statut?: string) => {
    switch (statut) {
      case 'OUVERTE':
        return 'Ouverte';
      case 'EN_COURS':
        return 'En cours';
      case 'TERMINEE':
        return 'Terminée';
      case 'RESULTATS_PUBLIES':
        return 'Résultats publiés';
      case 'PLANIFIEE':
        return 'Planifiée';
      case 'ANNULEE':
        return 'Annulée';
      default:
        return 'Statut inconnu';
    }
  };

  const getStatutColor = (statut?: string) => {
    switch (statut) {
      case 'OUVERTE':
      case 'EN_COURS':
        return 'bg-green-100 text-green-800';
      case 'TERMINEE':
      case 'RESULTATS_PUBLIES':
        return 'bg-red-100 text-red-800';
      case 'PLANIFIEE':
        return 'bg-yellow-100 text-yellow-800';
      case 'ANNULEE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des informations de l&apos;élection...</p>
        </div>
      </div>
    );
  }

  if (error || !election) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Vote className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Élection introuvable</h1>
          <p className="text-gray-600 mb-6">{error || 'Cette élection n\'existe pas ou n\'est plus disponible'}</p>
          <Link
            href="/elections"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux élections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/elections"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux élections
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de l'élection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8"
        >
          {/* Banner de l'élection */}
          <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end justify-between">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{election.titre || 'Nom de l\'élection non disponible'}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatutIcon(election.statut)}
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(election.statut)}`}>
                        {getStatutText(election.statut)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Description */}
            {election.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{election.description}</p>
              </div>
            )}

            {/* Informations détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {election.dateDebut && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Date de début</span>
                  </div>
                  <p className="text-blue-700">
                    {new Date(election.dateDebut).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {election.dateFin && (
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Date de fin</span>
                  </div>
                  <p className="text-red-700">
                    {new Date(election.dateFin).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Vote className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Votes multiples</span>
                </div>
                <p className="text-purple-700">{election.autoriserVoteMultiple ? 'Autorisés' : 'Non autorisés'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section des résultats */}
        {resultats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Résultats de l&apos;élection</h2>
            </div>

            <div className="p-6">
              {resultats.resultatsParCandidat && resultats.resultatsParCandidat.length > 0 ? (
                <div className="space-y-6">
                  {/* Podium des 3 premiers */}
                  <PodiumResultats 
                    candidats={resultats.resultatsParCandidat}
                    totalVotes={resultats.totalVotes || 0}
                  />

                  {/* Tous les candidats */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Résultats détaillés
                    </h4>
                    <div className="grid gap-4">
                      {resultats.resultatsParCandidat
                        .sort((a, b) => (b.nombreVotes || 0) - (a.nombreVotes || 0))
                        .map((candidat, index: number) => {
                          const percentage = candidat.pourcentageVotes || 
                            ((candidat.nombreVotes || 0) / (resultats.totalVotes || 1) * 100);
                          
                          return (
                            <motion.div
                              key={candidat.candidatId || index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={`border rounded-lg p-4 ${
                                index < 3 
                                  ? 'border-yellow-200 bg-yellow-50' 
                                  : 'border-gray-200 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    index < 3 ? 'bg-yellow-100' : 'bg-blue-100'
                                  }`}>
                                    <span className="font-bold text-lg">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900">
                                      {candidat.candidat?.username || candidat.candidatNom || `Candidat ${index + 1}`}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {candidat.nombreVotes || 0} votes
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-blue-600">
                                    {percentage.toFixed(1)}%
                                  </div>
                                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 0.6, delay: index * 0.1 }}
                                      className="bg-blue-600 h-2 rounded-full"
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Statistiques générales */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {resultats.totalVotes || 0}
                        </div>
                        <div className="text-sm text-gray-600">Total des votes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {resultats.resultatsParCandidat?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Candidats</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {resultats.tauxParticipation?.toFixed(1) || '0.0'}%
                        </div>
                        <div className="text-sm text-gray-600">Taux de participation</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Vote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat disponible</h3>
                  <p className="text-gray-600">
                    Les résultats de cette élection ne sont pas encore disponibles.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Bouton de vote si l'élection est active */}
        {(election.statut === 'OUVERTE' || election.statut === 'EN_COURS') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Link
              href={`/vote?election=${electionId}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <Vote className="w-5 h-5 mr-2" />
              Participer à cette élection
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}