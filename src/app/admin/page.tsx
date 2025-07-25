"use client";

import { useState, useEffect } from "react";
import { Vote, LogOut, Shield, Plus, Edit, Trash2, Users, Calendar, BarChart3, Settings, Mail, UserPlus, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/ui/Modal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/hooks/useNotification";
import { TableauxDeBordService } from "@/lib/services/TableauxDeBordService";
import { AdministrationService } from "@/lib/services/AdministrationService";
import { DashboardAdminDTO } from "@/lib/models/DashboardAdminDTO";
import { ElecteurDTO } from "@/lib/models/ElecteurDTO";
import { CandidatDTO } from "@/lib/models/CandidatDTO";
import { CampagneDTO } from "@/lib/models/CampagneDTO";
import { CreateElecteurAdminRequest } from "@/lib/models/CreateElecteurAdminRequest";
import { CreateCandidatRequest } from "@/lib/models/CreateCandidatRequest";
import { CreateCampagneRequest } from "@/lib/models/CreateCampagneRequest";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState<"voter" | "candidate" | "campaign" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // États pour les données
  const [dashboardData, setDashboardData] = useState<DashboardAdminDTO | null>(null);
  const [electeurs, setElecteurs] = useState<ElecteurDTO[]>([]);
  const [candidats, setCandidats] = useState<CandidatDTO[]>([]);
  const [campagnes, setCampagnes] = useState<CampagneDTO[]>([]);
  
  // États pour les formulaires
  const [newElecteur, setNewElecteur] = useState<CreateElecteurAdminRequest>({
    email: '',
    username: ''
  });
  const [newCandidat, setNewCandidat] = useState<CreateCandidatRequest>({
    email: '',
    username: ''
  });
  const [newCampagne, setNewCampagne] = useState<CreateCampagneRequest>({
    candidatId: '',
    description: ''
  });
  
  const { user, isAuthenticated, logout, token } = useAuth();
  const router = useRouter();
  const { showSuccess, showError,  NotificationContainer } = useNotification();

  // Vérifier l'authentification et le rôle admin
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/');
      return;
    }
    
    if (user.role !== 'admin' && user.role !== 'administrateur') {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, router]);

  // Charger les données au montage
  useEffect(() => {
    if (isAuthenticated && token) {
      loadAllData();
    }
  }, [isAuthenticated, token]);

  const loadAllData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        loadDashboard(),
        loadElecteurs(),
        loadCandidats(),
        loadCampagnes()
      ]);
    } catch (error) {
      showError('Erreur', 'Impossible de charger les données');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboard = async () => {
    try {
      const dashboard = await TableauxDeBordService.obtenirDashboardAdmin(`Bearer ${token}`);
      setDashboardData(dashboard);
    } catch (error) {
      console.error('Erreur dashboard admin:', error);
    }
  };

  const loadElecteurs = async () => {
    try {
      const electeursList = await AdministrationService.listerElecteurs(`Bearer ${token}`, 0, 100);
      setElecteurs(electeursList);
    } catch (error) {
      console.error('Erreur chargement électeurs:', error);
    }
  };

  const loadCandidats = async () => {
    try {
      const candidatsList = await AdministrationService.listerCandidats(`Bearer ${token}`);
      setCandidats(candidatsList);
    } catch (error) {
      console.error('Erreur chargement candidats:', error);
    }
  };

  const loadCampagnes = async () => {
    try {
      const campagnesList = await AdministrationService.listerCampagnes(`Bearer ${token}`);
      setCampagnes(campagnesList);
    } catch (error) {
      console.error('Erreur chargement campagnes:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Fonctions de création
  const handleCreateElecteur = async () => {
    try {
      setIsSubmitting(true);
      await AdministrationService.creerElecteur(`Bearer ${token}`, newElecteur);
      showSuccess('Succès', 'Électeur créé avec succès');
      setNewElecteur({ email: '', username: '' });
      setShowCreateModal(false);
      await loadElecteurs();
    } catch (error) {
      showError('Erreur', 'Impossible de créer l\'électeur');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateCandidat = async () => {
    try {
      setIsSubmitting(true);
      await AdministrationService.creerCandidat(`Bearer ${token}`, newCandidat);
      showSuccess('Succès', 'Candidat créé avec succès');
      setNewCandidat({ email: '', username: '' });
      setShowCreateModal(false);
      await loadCandidats();
    } catch (error) {
      showError('Erreur', 'Impossible de créer le candidat');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateCampagne = async () => {
    try {
      setIsSubmitting(true);
      await AdministrationService.creerCampagne(`Bearer ${token}`, newCampagne);
      showSuccess('Succès', 'Campagne créée avec succès');
      setNewCampagne({ candidatId: '', description: '' });
      setShowCreateModal(false);
      await loadCampagnes();
    } catch (error) {
      showError('Erreur', 'Impossible de créer la campagne');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteElecteur = async (electeurId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet électeur ?')) return;
    
    try {
      await AdministrationService.supprimerElecteur(`Bearer ${token}`, electeurId);
      showSuccess('Succès', 'Électeur supprimé');
      await loadElecteurs();
    } catch (error) {
      showError('Erreur', 'Impossible de supprimer l\'électeur');
    }
  };

  const handleCreateModal = (type: "voter" | "candidate" | "campaign") => {
    setModalType(type);
    setShowCreateModal(true);
  };

  // Afficher un loader pendant la vérification
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="md" color="purple" className="mx-auto mb-4" />
          <p className="text-purple-700">Vérification des droits d'accès...</p>
        </div>
      </div>
    );
  }

  // Vérifier le rôle
  if (user.role !== 'admin' && user.role !== 'administrateur') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Accès non autorisé</h2>
          <p className="text-gray-600 mb-4">Vous n'avez pas les droits d'accès à cette page.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Affichage du loader pendant le chargement des données
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="purple" className="mx-auto mb-4" />
          <p className="text-purple-700">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
        {/* Header */}
        <Header title="CIVIX - Espace Administrateur" role="Administrateur" color="purple" onLogout={handleLogout} />
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Tableau de bord administrateur
              </h2>
              <p className="text-gray-600">
                {dashboardData?.messageBienvenue || "Gérez les électeurs, candidats, campagnes et surveillez les élections"}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Électeurs</p>
                    <p className="text-2xl font-bold text-gray-900">{electeurs.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Candidats</p>
                    <p className="text-2xl font-bold text-gray-900">{candidats.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Campagnes</p>
                    <p className="text-2xl font-bold text-gray-900">{campagnes.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Vote className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Votes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData?.statistiquesGlobales?.nombreVotesTotal || 0}
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
                    onClick={() => setActiveTab("dashboard")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "dashboard"
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Tableau de bord
                  </button>
                  <button
                    onClick={() => setActiveTab("voters")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "voters"
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Électeurs ({electeurs.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("candidates")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "candidates"
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Candidats ({candidats.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("campaigns")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "campaigns"
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Campagnes ({campagnes.length})
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {dashboardData?.recommendations && dashboardData.recommendations.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandations</h3>
                    <div className="space-y-2">
                      {dashboardData.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vue d'ensemble</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Statistiques générales</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Total électeurs:</span>
                          <span className="font-medium">{electeurs.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total candidats:</span>
                          <span className="font-medium">{candidats.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total campagnes:</span>
                          <span className="font-medium">{campagnes.length}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Activité récente</h4>
                      <p className="text-sm text-gray-600">
                        {dashboardData?.derniereMiseAJour ? 
                          `Dernière mise à jour: ${new Date(dashboardData.derniereMiseAJour).toLocaleString()}` :
                          "Système à jour"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "voters" && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Gestion des électeurs</h3>
                    <button
                      onClick={() => handleCreateModal("voter")}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Nouvel électeur</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {electeurs.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun électeur</h4>
                      <p className="text-gray-600">Commencez par ajouter des électeurs au système</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {electeurs.map((electeur) => (
                        <div key={electeur.externalIdElecteur} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {electeur.username || 'Électeur'}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">{electeur.email}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>ID: {electeur.externalIdElecteur}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button 
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                title="Envoyer les identifiants"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteElecteur(electeur.externalIdElecteur || '')}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "candidates" && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Gestion des candidats</h3>
                    <button
                      onClick={() => handleCreateModal("candidate")}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nouveau candidat</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {candidats.length === 0 ? (
                    <div className="text-center py-8">
                      <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun candidat</h4>
                      <p className="text-gray-600">Ajoutez des candidats pour commencer une élection</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {candidats.map((candidat) => (
                        <div key={candidat.externalIdCandidat} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {candidat.username || 'Candidat'}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">{candidat.email}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Votes: {candidat.votes?.length || 0}</span>
                                <span>Campagnes: {candidat.campagnes?.length || 0}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "campaigns" && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Gestion des campagnes</h3>
                    <button
                      onClick={() => handleCreateModal("campaign")}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nouvelle campagne</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {campagnes.length === 0 ? (
                    <div className="text-center py-8">
                      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucune campagne</h4>
                      <p className="text-gray-600">Créez des campagnes pour vos candidats</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {campagnes.map((campagne, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">Campagne #{index + 1}</h4>
                              <p className="text-sm text-gray-600 mb-2">{campagne.description || 'Pas de description'}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Candidat ID: {campagne.candidatIds?.[0] || 'N/A'}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modales */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title={
            modalType === "voter" ? "Nouvel électeur" :
            modalType === "candidate" ? "Nouveau candidat" :
            modalType === "campaign" ? "Nouvelle campagne" : ""
          }
          size="md"
        >
          {modalType === "voter" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  value={newElecteur.username}
                  onChange={(e) => setNewElecteur({...newElecteur, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nom d'utilisateur"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={newElecteur.email}
                  onChange={(e) => setNewElecteur({...newElecteur, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="email@exemple.com"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateElecteur}
                  disabled={isSubmitting || !newElecteur.email || !newElecteur.username}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isSubmitting && <LoadingSpinner size="sm" color="purple" />}
                  <span>Créer</span>
                </button>
              </div>
            </div>
          )}

          {modalType === "candidate" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  value={newCandidat.username}
                  onChange={(e) => setNewCandidat({...newCandidat, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nom du candidat"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={newCandidat.email}
                  onChange={(e) => setNewCandidat({...newCandidat, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="email@exemple.com"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateCandidat}
                  disabled={isSubmitting || !newCandidat.email || !newCandidat.username}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isSubmitting && <LoadingSpinner size="sm" color="purple" />}
                  <span>Créer</span>
                </button>
              </div>
            </div>
          )}

          {modalType === "campaign" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Candidat
                </label>
                <select
                  value={newCampagne.candidatId}
                  onChange={(e) => setNewCampagne({...newCampagne, candidatId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un candidat</option>
                  {candidats.map((candidat) => (
                    <option key={candidat.externalIdCandidat} value={candidat.externalIdCandidat}>
                      {candidat.username} ({candidat.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newCampagne.description}
                  onChange={(e) => setNewCampagne({...newCampagne, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Description de la campagne"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateCampagne}
                  disabled={isSubmitting || !newCampagne.candidatId || !newCampagne.description}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isSubmitting && <LoadingSpinner size="sm" color="purple" />}
                  <span>Créer</span>
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
      <Footer />
      
      {/* Conteneur de notifications */}
      <NotificationContainer />
    </>
  );
}