"use client";

import { useState, useEffect } from "react";
import { Vote, Calendar, CheckCircle, Clock, Eye, AlertCircle, User, Bell, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { TableauxDeBordService } from "@/lib/services/TableauxDeBordService";
import { VoteService } from "@/lib/services/VoteService";
import { ElectionsService } from "@/lib/services/ElectionsService";
import { DashboardElecteurDTO } from "@/lib/models/DashboardElecteurDTO";
import { StatutVoteElecteurDTO } from "@/lib/models/StatutVoteElecteurDTO";
import { VoteResponse } from "@/lib/models/VoteResponse";
import { ElectionDTO } from "@/lib/models/ElectionDTO";

export default function VoterPage() {
  const [activeTab, setActiveTab] = useState("elections");
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string>("");
  const [dashboardData, setDashboardData] = useState<DashboardElecteurDTO | null>(null);
  const [voteStatus, setVoteStatus] = useState<StatutVoteElecteurDTO | null>(null);
  const [electionsDisponibles, setElectionsDisponibles] = useState<ElectionDTO[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  const { user, token, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Vérifier l'authentification
  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'electeur') {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  // Charger les données au montage
  useEffect(() => {
    if (isAuthenticated && token) {
      loadDashboardData();
      loadVoteStatus();
      loadElectionsDisponibles();
    }
  }, [isAuthenticated, token]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const dashboard = await TableauxDeBordService.obtenirDashboardElecteur(`Bearer ${token}`);
      setDashboardData(dashboard);
      
    } catch (error) {
      console.error("Erreur lors du chargement du dashboard:", error);
      setError("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  const loadVoteStatus = async () => {
    try {
      const status = await VoteService.obtenirStatutVote(`Bearer ${token}`);
      setVoteStatus(status);
    } catch (error) {
      console.error("Erreur lors du chargement du statut de vote:", error);
    }
  };

  const loadElectionsDisponibles = async () => {
    try {
      const elections = await ElectionsService.listerElectionsDisponibles();
      setElectionsDisponibles(elections);
    } catch (error) {
      console.error("Erreur lors du chargement des élections disponibles:", error);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate || !token) return;
    
    try {
      setIsVoting(true);
      setError("");
      
      const response = await VoteService.effectuerVote(`Bearer ${token}`, selectedCandidate);
      
      if (response.success) {
        // Recharger le statut de vote
        await loadVoteStatus();
        await loadDashboardData();
        setActiveTab("results");
      } else {
        setError(response.message || "Erreur lors du vote");
      }
      
    } catch (error) {
      console.error("Erreur lors du vote:", error);
      setError("Erreur lors de l'enregistrement du vote");
    } finally {
      setIsVoting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Afficher un loader pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-700">Chargement de votre espace électeur...</p>
        </div>
      </div>
    );
  }

  // Si pas de données dashboard, afficher erreur
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error || "Impossible de charger les données"}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <Header title="CIVIX - Espace Électeur" role="Électeur" color="blue" onLogout={handleLogout} />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenue {dashboardData.profil?.electeur?.username || user?.username}
            </h2>
            <p className="text-gray-600">
              {dashboardData.messageBienvenue || "Consultez les candidats, leurs campagnes et participez aux élections"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Profile and Status Info */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Statut de votre participation</h3>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Électeur inscrit</span>
                  </div>
                  {voteStatus?.avote ? (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Vous avez voté</span>
                      {voteStatus.dateVote && (
                        <span className="ml-2">le {new Date(voteStatus.dateVote).toLocaleDateString()}</span>
                      )}
                    </div>
                  ) : voteStatus?.peutVoter ? (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Clock className="w-4 h-4" />
                      <span>Vous pouvez voter</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-orange-600">
                      <Clock className="w-4 h-4" />
                      <span>Vote non disponible</span>
                    </div>
                  )}
                </div>
                {voteStatus?.messageStatut && (
                  <p className="mt-2 text-sm text-gray-600">{voteStatus.messageStatut}</p>
                )}
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          {dashboardData.statistiquesGlobales && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Électeurs inscrits</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.profil?.nombreTotalElecteurs?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Vote className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Votes exprimés</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.statistiquesGlobales.nombreVotesTotal?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Taux participation</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.profil?.tauxParticipationGlobal ? 
                        `${dashboardData.profil.tauxParticipationGlobal}%` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("elections")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "elections"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Élections ({electionsDisponibles.length})
                </button>
                <button
                  onClick={() => setActiveTab("candidates")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "candidates"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Candidats
                </button>
                <button
                  onClick={() => setActiveTab("campaigns")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "campaigns"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Campagnes
                </button>
                <button
                  onClick={() => setActiveTab("vote")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "vote"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  disabled={voteStatus?.avote}
                >
                  {voteStatus?.avote ? "Vote effectué" : "Voter"}
                </button>
                <button
                  onClick={() => setActiveTab("results")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "results"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Résultats
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "profile"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Mon Profil
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "notifications"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Notifications
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {activeTab === "elections" && (
            <div className="grid gap-6">
              {electionsDisponibles.map((election) => (
                <div key={election.externalIdElection} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {election.titre || 'Élection sans titre'}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          election.statut === 'OUVERTE' || election.statut === 'EN_COURS' ? 'bg-green-100 text-green-800' :
                          election.statut === 'TERMINEE' ? 'bg-gray-100 text-gray-800' :
                          election.statut === 'PLANIFIEE' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {election.statut || 'N/A'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{election.description || 'Pas de description'}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">Candidats:</span> {election.nombreCandidats || 0}
                        </div>
                        <div>
                          <span className="font-medium">Électeurs inscrits:</span> {election.nombreElecteursInscrits || 0}
                        </div>
                        <div>
                          <span className="font-medium">Votes exprimés:</span> {election.nombreVotes || 0}
                        </div>
                        <div>
                          <span className="font-medium">Vote multiple:</span> {election.autoriserVoteMultiple ? 'Autorisé' : 'Non autorisé'}
                        </div>
                      </div>
                      {election.dateDebut && election.dateFin && (
                        <div className="text-sm text-gray-500">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Du {new Date(election.dateDebut).toLocaleDateString()} au {new Date(election.dateFin).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      {election.estActive && !voteStatus?.avote && (
                        <button
                          onClick={() => setActiveTab("candidates")}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Vote className="w-4 h-4" />
                          <span>Voter</span>
                        </button>
                      )}
                      <button
                        onClick={() => setActiveTab("results")}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Résultats</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {electionsDisponibles.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucune élection disponible</h4>
                  <p className="text-gray-600">Il n'y a actuellement aucune élection ouverte pour voter.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="grid gap-6">
              {dashboardData.candidatsDisponibles?.map((candidatAvecStatut) => (
                <div key={candidatAvecStatut.candidat?.externalIdCandidat} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {candidatAvecStatut.candidat?.username || 'Candidat'}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{candidatAvecStatut.candidat?.email}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span>Nombre de votes: {candidatAvecStatut.nombreVotes || 0}</span>
                        <span>Campagnes: {candidatAvecStatut.nombreCampagnes || 0}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab("campaigns")}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Voir les détails</span>
                    </button>
                  </div>
                </div>
              ))}
              
              {!dashboardData.candidatsDisponibles?.length && (
                <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun candidat disponible</h4>
                  <p className="text-gray-600">Il n'y a actuellement aucun candidat pour cette élection.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "campaigns" && (
            <div className="space-y-6">
              {dashboardData.candidatsDisponibles?.map((candidatAvecStatut) => (
                <div key={candidatAvecStatut.candidat?.externalIdCandidat} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Campagne de {candidatAvecStatut.candidat?.username}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{candidatAvecStatut.candidat?.email}</p>
                    
                    {candidatAvecStatut.candidat?.campagnes?.length ? (
                      <div className="space-y-4">
                        {candidatAvecStatut.candidat.campagnes.map((campagne, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <p className="text-gray-700">Campagne #{index + 1}</p>
                            {/* TODO: Afficher plus de détails sur les campagnes quand disponible dans l'API */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Aucune information de campagne disponible</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span>Votes reçus: {candidatAvecStatut.nombreVotes || 0}</span>
                    </div>
                    {!voteStatus?.avote && voteStatus?.peutVoter && (
                      <button
                        onClick={() => {
                          setSelectedCandidate(candidatAvecStatut.candidat?.externalIdCandidat || null);
                          setActiveTab("vote");
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Vote className="w-4 h-4" />
                        <span>Choisir ce candidat</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {!dashboardData.candidatsDisponibles?.length && (
                <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                  <Vote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucune campagne disponible</h4>
                  <p className="text-gray-600">Il n'y a actuellement aucune campagne active.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "vote" && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {!voteStatus?.peutVoter ? (
                <div className="text-center py-8">
                  <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Vote non disponible</h4>
                  <p className="text-gray-600">
                    {voteStatus?.messageStatut || "Vous ne pouvez pas voter pour le moment."}
                  </p>
                </div>
              ) : voteStatus?.avote ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Vote enregistré !</h4>
                  <p className="text-gray-600">
                    Votre vote a été pris en compte avec succès le {" "}
                    {voteStatus.dateVote ? new Date(voteStatus.dateVote).toLocaleDateString() : ""}
                  </p>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Sélectionnez votre candidat</h4>
                  <div className="grid gap-4">
                    {dashboardData.candidatsDisponibles?.map((candidatAvecStatut) => (
                      <div
                        key={candidatAvecStatut.candidat?.externalIdCandidat}
                        onClick={() => setSelectedCandidate(candidatAvecStatut.candidat?.externalIdCandidat || null)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedCandidate === candidatAvecStatut.candidat?.externalIdCandidat
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              {candidatAvecStatut.candidat?.username || "Candidat"}
                            </h5>
                            <p className="text-sm text-gray-600">{candidatAvecStatut.candidat?.email}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Votes reçus: {candidatAvecStatut.nombreVotes || 0}
                            </p>
                          </div>
                          {selectedCandidate === candidatAvecStatut.candidat?.externalIdCandidat && (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!dashboardData.candidatsDisponibles?.length && (
                    <div className="text-center py-8">
                      <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun candidat disponible</h4>
                      <p className="text-gray-600">Il n'y a actuellement aucun candidat pour voter.</p>
                    </div>
                  )}

                  {dashboardData.candidatsDisponibles?.length && (
                    <div className="mt-6">
                      <button
                        onClick={handleVote}
                        disabled={!selectedCandidate || isVoting}
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          selectedCandidate && !isVoting
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {isVoting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Vote className="w-4 h-4" />
                            <span>Confirmer mon vote</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "results" && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {dashboardData.resultatsPartiels ? (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Résultats partiels</h4>
                  {/* TODO: Afficher les résultats quand la structure sera définie */}
                  <p className="text-gray-600">Résultats disponibles après la période de vote.</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Résultats à venir</h4>
                  <p className="text-gray-600">
                    Les résultats seront publiés à la fin de la période de vote.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-gray-900">Mon Profil</h4>
                <button
                  onClick={() => router.push('/voter/profile')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Gérer mon profil</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Nom d'utilisateur</p>
                      <p className="text-gray-900 font-medium">{user?.username}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">{user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Statut</p>
                      <p className="text-green-600 font-medium">Compte actif</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Dernière connexion</p>
                      <p className="text-gray-900 font-medium">{new Date().toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Accédez à votre profil complet pour modifier vos informations personnelles et changer votre mot de passe.
                </p>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-gray-900">Notifications</h4>
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {notifications.length === 0 ? "Aucune notification" : `${notifications.length} notification(s)`}
                  </span>
                </div>
              </div>
              
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucune notification</h4>
                  <p className="text-gray-600">
                    Vous serez notifié des nouvelles élections, des résultats et des mises à jour importantes.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 mb-1">{notification.title}</h5>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-400">{notification.date}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notification.type === 'info' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'success' ? 'bg-green-100 text-green-800' :
                          notification.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {notification.type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Les notifications importantes concernant les élections et votre participation apparaîtront ici.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
} 