"use client";

import { useState, useEffect } from "react";
import { BarChart3, Calendar, Users, Eye, Vote, TrendingUp, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { PublicService } from "@/lib/services/PublicService";
import { VoteService } from "@/lib/services/VoteService";
import { StatistiquesPubliquesDTO } from "@/lib/models/StatistiquesPubliquesDTO";
import { ResultatsTempsReelDTO } from "@/lib/models/ResultatsTempsReelDTO";
import { ResultatVoteDTO } from "@/lib/models/ResultatVoteDTO";

export default function ReaderPage() {
  const [activeTab, setActiveTab] = useState("statistics");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  // États pour les données réelles
  const [statistiques, setStatistiques] = useState<StatistiquesPubliquesDTO | null>(null);
  const [resultatsTempsReel, setResultatsTempsReel] = useState<ResultatsTempsReelDTO | null>(null);
  const [resultatsFinaux, setResultatsFinaux] = useState<ResultatVoteDTO[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    loadPublicData();
  }, []);

  const loadPublicData = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Charger les données publiques depuis les vraies APIs
      const [stats, tempsReel, finaux] = await Promise.all([
        PublicService.obtenirStatistiquesPubliques(),
        PublicService.obtenirResultatsTempsReel(),
        VoteService.consulterResultats()
      ]);
      
      setStatistiques(stats);
      setResultatsTempsReel(tempsReel);
      setResultatsFinaux(finaux);
      
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setError("Erreur lors du chargement des données publiques");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="green" className="mx-auto mb-4" />
          <p className="text-green-700">Chargement des données publiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      {/* Header */}
      <Header 
        title="CIVIX - Consultation Publique" 
        role="Lecteur" 
        color="green" 
        onLogout={handleBackToLogin} 
      />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Consultation publique</h2>
            <p className="text-gray-600">Consultez les campagnes en cours et les résultats d'élections publiques</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
              <button 
                onClick={loadPublicData}
                className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Électeurs inscrits</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistiques?.nombreElecteursTotal?.toLocaleString() || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Vote className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Votes exprimés</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistiques?.nombreVotesTotal?.toLocaleString() || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Taux participation</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistiques?.tauxParticipation ? `${statistiques.tauxParticipation}%` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("statistics")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "statistics"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Statistiques
                </button>
                <button
                  onClick={() => setActiveTab("live")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "live"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Temps réel
                </button>
                <button
                  onClick={() => setActiveTab("results")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "results"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Résultats finaux
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {activeTab === "statistics" && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Statistiques détaillées</h3>
              {statistiques ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Électeurs inscrits:</span>
                      <span className="font-semibold">{statistiques.nombreElecteursTotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Votes exprimés:</span>
                      <span className="font-semibold">{statistiques.nombreVotesTotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taux de participation:</span>
                      <span className="font-semibold">{statistiques.tauxParticipation}%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Campagnes actives:</span>
                      <span className="font-semibold">{statistiques.nombreCampagnesActives || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Candidats total:</span>
                      <span className="font-semibold">{statistiques.nombreCandidatsTotal || 0}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2" />
                  <p>Aucune statistique disponible</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "live" && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Résultats temps réel</h3>
              {resultatsTempsReel ? (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-lg text-gray-600">
                      Dernière mise à jour: {new Date(resultatsTempsReel.derniereMiseAJour || '').toLocaleString()}
                    </p>
                  </div>
                  {resultatsTempsReel.resultats?.map((resultat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{resultat.nomCandidat}</h4>
                        <p className="text-sm text-gray-600">{resultat.parti}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{resultat.nombreVotes}</p>
                        <p className="text-sm text-gray-600">{resultat.pourcentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                  <p>Aucun résultat temps réel disponible</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "results" && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Résultats finaux</h3>
              {resultatsFinaux && resultatsFinaux.length > 0 ? (
                <div className="space-y-4">
                  {resultatsFinaux.map((resultat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{resultat.nomCandidat}</h4>
                        <p className="text-sm text-gray-600">{resultat.parti}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">{resultat.nombreVotes}</p>
                        <p className="text-sm text-gray-600">{resultat.pourcentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Aucun résultat final disponible</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}