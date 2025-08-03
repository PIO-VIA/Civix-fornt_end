"use client";

import { useState, useEffect } from "react";
import { Vote, Plus, Edit, Trash2, Users, Calendar, BarChart3, Mail, UserPlus, AlertCircle, Shield, FileImage, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import FormModal from "@/components/ui/FormModal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/hooks/useNotification";

// Import des services
import { TableauxDeBordService } from "@/lib/services/TableauxDeBordService";
import { AdministrationService } from "@/lib/services/AdministrationService";
import { ElectionsService } from "@/lib/services/ElectionsService";

// Import des types
import { DashboardAdminDTO } from "@/lib/models/DashboardAdminDTO";
import { ElecteurDTO } from "@/lib/models/ElecteurDTO";
import { CandidatDTO } from "@/lib/models/CandidatDTO";
import { CampagneDTO } from "@/lib/models/CampagneDTO";
import { ElectionDTO } from "@/lib/models/ElectionDTO";
import { CreateElecteurAdminRequest } from "@/lib/models/CreateElecteurAdminRequest";
import { CreateCandidatRequest } from "@/lib/models/CreateCandidatRequest";
import { CreateCampagneRequest } from "@/lib/models/CreateCampagneRequest";
import { CreateElectionRequest } from "@/lib/models/CreateElectionRequest";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState<"voter" | "candidate" | "campaign" | "election" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // États pour les données
  const [dashboardData, setDashboardData] = useState<DashboardAdminDTO | null>(null);
  const [electeurs, setElecteurs] = useState<ElecteurDTO[]>([]);
  const [candidats, setCandidats] = useState<CandidatDTO[]>([]);
  const [campagnes, setCampagnes] = useState<CampagneDTO[]>([]);
  const [elections, setElections] = useState<ElectionDTO[]>([]);
  
  // États pour les formulaires
  const [newElecteur, setNewElecteur] = useState<CreateElecteurAdminRequest>({
    email: '',
    username: ''
  });
  const [newCandidat, setNewCandidat] = useState<CreateCandidatRequest>({
    username: ''
  });
  const [newCampagne, setNewCampagne] = useState<CreateCampagneRequest>({
    candidatId: '',
    description: ''
  });
  const [newElection, setNewElection] = useState<CreateElectionRequest>({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    autoriserVoteMultiple: false,
    nombreMaxVotesParElecteur: 1,
    resultatsVisibles: false,
    electeursAutorises: [],
    candidatsParticipants: []
  });
  
  // États pour l'upload d'images
  const [selectedImages, setSelectedImages] = useState<{[key: string]: File | null}>({});
  
  const { user, isAuthenticated, token } = useAuth();
  const router = useRouter();
  const { showSuccess, showError, NotificationContainer } = useNotification();

  // Vérifier l'authentification et le rôle admin
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/admin-login');
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
        loadCampagnes(),
        loadElections()
      ]);
    } catch (error) {
      showError('Erreur', 'Impossible de charger les données');
      console.error('Erreur lors du chargement des données:', error);
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

  const loadElections = async () => {
    try {
      const electionsList = await ElectionsService.listerMesElections();
      setElections(electionsList);
    } catch (error) {
      console.error('Erreur chargement élections:', error);
    }
  };

  // Fonctions de gestion des images
  const handleImageSelect = (type: string, file: File | null) => {
    setSelectedImages(prev => ({
      ...prev,
      [type]: file
    }));
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
      console.error('Erreur création électeur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateCandidat = async () => {
    try {
      setIsSubmitting(true);
      await AdministrationService.creerCandidat(`Bearer ${token}`, newCandidat);
      showSuccess('Succès', 'Candidat créé avec succès');
      setNewCandidat({ username: '' });
      setShowCreateModal(false);
      await loadCandidats();
    } catch (error) {
      showError('Erreur', 'Impossible de créer le candidat');
      console.error('Erreur création candidat:', error);
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
      console.error('Erreur création campagne:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateElection = async () => {
    try {
      setIsSubmitting(true);
      await ElectionsService.creerElection(newElection);
      showSuccess('Succès', 'Élection créée avec succès');
      setNewElection({
        titre: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        autoriserVoteMultiple: false,
        nombreMaxVotesParElecteur: 1,
        resultatsVisibles: false,
        electeursAutorises: [],
        candidatsParticipants: []
      });
      setShowCreateModal(false);
      await loadElections();
    } catch (error) {
      showError('Erreur', 'Impossible de créer l\'élection');
      console.error('Erreur création élection:', error);
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
      console.error('Erreur suppression électeur:', error);
    }
  };

  const handleCreateModal = (type: "voter" | "candidate" | "campaign" | "election") => {
    setModalType(type);
    setShowCreateModal(true);
  };

  // Afficher un loader pendant la vérification
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <LoadingSpinner size="md" color="purple" className="mx-auto mb-4" />
            <p className="text-purple-700">{"Vérification des droits d'accès..."}</p>
          </div>
        </div>
      </div>
    );
  }

  // Vérifier le rôle
  if (user.role !== 'admin' && user.role !== 'administrateur') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center max-w-md mx-auto p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès non autorisé</h2>
            <p className="text-gray-600 mb-6">{"Vous n'avez pas les droits d'accès à cette page d'administration."}</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {"Retour à l'accueil"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Affichage du loader pendant le chargement des données
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-blue-600 shadow-lg mb-6">
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="w-8 h-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du tableau de bord administrateur...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Administration CIVIX</h1>
              <p className="text-gray-600">Tableau de bord administrateur</p>
            </div>
          </div>
          <p className="text-gray-600">
            Gérez les électeurs, candidats, campagnes et surveillez les élections en temps réel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Électeurs</p>
                <p className="text-2xl font-bold text-gray-900">{electeurs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Candidats</p>
                <p className="text-2xl font-bold text-gray-900">{candidats.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Campagnes</p>
                <p className="text-2xl font-bold text-gray-900">{campagnes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Élections</p>
                <p className="text-2xl font-bold text-gray-900">{elections.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Vote className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Votes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.nombreVotesTotal || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 bg-white rounded-t-xl">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "dashboard", label: "Tableau de bord", icon: BarChart3 },
                { id: "voters", label: `Électeurs (${electeurs.length})`, icon: Users },
                { id: "candidates", label: `Candidats (${candidats.length})`, icon: UserPlus },
                { id: "campaigns", label: `Campagnes (${campagnes.length})`, icon: BarChart3 },
                { id: "elections", label: `Élections (${elections.length})`, icon: Calendar }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
          {activeTab === "dashboard" && (
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{"Vue d'ensemble"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">Statistiques générales</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-blue-800">
                      <span>Total électeurs:</span>
                      <span className="font-semibold">{electeurs.length}</span>
                    </div>
                    <div className="flex justify-between text-blue-800">
                      <span>Total candidats:</span>
                      <span className="font-semibold">{candidats.length}</span>
                    </div>
                    <div className="flex justify-between text-blue-800">
                      <span>Total campagnes:</span>
                      <span className="font-semibold">{campagnes.length}</span>
                    </div>
                    <div className="flex justify-between text-blue-800">
                      <span>Total élections:</span>
                      <span className="font-semibold">{elections.length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <h4 className="font-semibold text-green-900 mb-4">Activité récente</h4>
                  <p className="text-sm text-green-800">
                    {dashboardData?.derniereMiseAJour ? 
                      `Dernière mise à jour: ${new Date(dashboardData.derniereMiseAJour).toLocaleDateString('fr-FR')}` :
                      "Système à jour"
                    }
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <h4 className="font-semibold text-purple-900 mb-4">Actions rapides</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleCreateModal("election")}
                      className="w-full text-left text-sm text-purple-800 hover:text-purple-900 py-2 px-3 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      • Créer une élection
                    </button>
                    <button 
                      onClick={() => handleCreateModal("voter")}
                      className="w-full text-left text-sm text-purple-800 hover:text-purple-900 py-2 px-3 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      • Ajouter un électeur
                    </button>
                    <button 
                      onClick={() => handleCreateModal("candidate")}
                      className="w-full text-left text-sm text-purple-800 hover:text-purple-900 py-2 px-3 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      • Ajouter un candidat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "voters" && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Gestion des électeurs</h3>
                  <button
                    onClick={() => handleCreateModal("voter")}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Nouvel électeur</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                {electeurs.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun électeur</h4>
                    <p className="text-gray-600 mb-6">Commencez par ajouter des électeurs au système</p>
                    <button
                      onClick={() => handleCreateModal("voter")}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Ajouter le premier électeur
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {electeurs.map((electeur) => (
                      <div key={electeur.externalIdElecteur} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {electeur.username?.charAt(0)?.toUpperCase() || electeur.email?.charAt(0)?.toUpperCase() || 'E'}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {electeur.username || 'Électeur'}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">{electeur.email}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>ID: {electeur.externalIdElecteur}</span>
                              </div>
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
                              title="Supprimer"
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
            <div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Gestion des candidats</h3>
                  <button
                    onClick={() => handleCreateModal("candidate")}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouveau candidat</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                {candidats.length === 0 ? (
                  <div className="text-center py-12">
                    <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucun candidat</h4>
                    <p className="text-gray-600 mb-6">Ajoutez des candidats pour commencer une élection</p>
                    <button
                      onClick={() => handleCreateModal("candidate")}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Ajouter le premier candidat
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidats.map((candidat) => (
                      <div key={candidat.externalIdCandidat} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                            {candidat.username?.charAt(0)?.toUpperCase() || 'C'}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {candidat.username || 'Candidat'}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">ID: {candidat.externalIdCandidat}</p>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex justify-between">
                            <span>Votes:</span>
                            <span className="font-medium">{candidat.votes?.length || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Campagnes:</span>
                            <span className="font-medium">{candidat.campagnes?.length || 0}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "campaigns" && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Gestion des campagnes</h3>
                  <button
                    onClick={() => handleCreateModal("campaign")}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouvelle campagne</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                {campagnes.length === 0 ? (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucune campagne</h4>
                    <p className="text-gray-600 mb-6">Créez des campagnes pour vos candidats</p>
                    <button
                      onClick={() => handleCreateModal("campaign")}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Créer la première campagne
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {campagnes.map((campagne, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">Campagne #{index + 1}</h4>
                            <p className="text-gray-600 mb-3">{campagne.description || 'Pas de description'}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Candidat ID: {campagne.candidat?.externalIdCandidat || 'N/A'}</span>
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

          {activeTab === "elections" && (
            <div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Gestion des élections</h3>
                  <button
                    onClick={() => handleCreateModal("election")}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nouvelle élection</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                {elections.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Aucune élection</h4>
                    <p className="text-gray-600 mb-6">Créez votre première élection pour commencer</p>
                    <button
                      onClick={() => handleCreateModal("election")}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Créer la première élection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {elections.map((election) => (
                      <div key={election.externalIdElection} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900 text-lg">
                                {election.titre || 'Élection sans titre'}
                              </h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                election.statut === 'OUVERTE' || election.statut === 'EN_COURS' ? 'bg-green-100 text-green-800' :
                                election.statut === 'TERMINEE' ? 'bg-gray-100 text-gray-800' :
                                election.statut === 'PLANIFIEE' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {election.statut || 'N/A'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{election.description || 'Pas de description'}</p>
                            
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-xl font-bold text-gray-900">{election.nombreCandidats || 0}</div>
                                <div className="text-sm text-gray-600">Candidats</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-xl font-bold text-gray-900">{election.nombreElecteursInscrits || 0}</div>
                                <div className="text-sm text-gray-600">Électeurs</div>
                              </div>
                              <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-xl font-bold text-gray-900">{election.nombreVotes || 0}</div>
                                <div className="text-sm text-gray-600">Votes</div>
                              </div>
                            </div>
                            
                            {election.dateDebut && election.dateFin && (
                              <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                                Du {new Date(election.dateDebut).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })} au {new Date(election.dateFin).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
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

      {/* Modales de création */}
      
      {/* Modal Électeur */}
      <FormModal
        isOpen={showCreateModal && modalType === "voter"}
        onClose={() => {
          setShowCreateModal(false);
          setNewElecteur({ email: '', username: '' });
        }}
        title="Nouvel électeur"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateElecteur();
        }}
        isLoading={isSubmitting}
        submitText="Créer l'électeur"
        size="md"
      >
        <Input
          label="Nom d'utilisateur"
          type="text"
          value={newElecteur.username}
          onChange={(e) => setNewElecteur({...newElecteur, username: e.target.value})}
          placeholder="Nom d'utilisateur"
          required
        />
        <Input
          label="Adresse email"
          type="email"
          value={newElecteur.email}
          onChange={(e) => setNewElecteur({...newElecteur, email: e.target.value})}
          placeholder="email@exemple.com"
          required
        />
      </FormModal>

      {/* Modal Candidat */}
      <FormModal
        isOpen={showCreateModal && modalType === "candidate"}
        onClose={() => {
          setShowCreateModal(false);
          setNewCandidat({ username: '' });
        }}
        title="Nouveau candidat"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCandidat();
        }}
        isLoading={isSubmitting}
        submitText="Créer le candidat"
        size="md"
      >
        <Input
          label="Nom d'utilisateur"
          type="text"
          value={newCandidat.username}
          onChange={(e) => setNewCandidat({...newCandidat, username: e.target.value})}
          placeholder="Nom du candidat"
          required
        />
        
        {/* Section upload d'image pour candidat */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Photo du candidat (optionnel)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageSelect('candidate', e.target.files?.[0] || null)}
              className="hidden"
              id="candidate-image"
            />
            <label htmlFor="candidate-image" className="cursor-pointer">
              <FileImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Cliquez pour sélectionner une image</p>
              <p className="text-xs text-gray-500">{"PNG, JPG jusqu'à 5MB"}</p>
            </label>
            {selectedImages['candidate'] && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {selectedImages['candidate'].name}
              </p>
            )}
          </div>
        </div>
      </FormModal>

      {/* Modal Campagne */}
      <FormModal
        isOpen={showCreateModal && modalType === "campaign"}
        onClose={() => {
          setShowCreateModal(false);
          setNewCampagne({ candidatId: '', description: '' });
        }}
        title="Nouvelle campagne"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCampagne();
        }}
        isLoading={isSubmitting}
        submitText="Créer la campagne"
        size="md"
      >
        <Select
          label="Candidat"
          value={newCampagne.candidatId}
          onChange={(e) => setNewCampagne({...newCampagne, candidatId: e.target.value})}
          options={candidats.map((candidat) => ({
            value: candidat.externalIdCandidat || '',
            label: `${candidat.username} (${candidat.email || 'ID: ' + candidat.externalIdCandidat})`
          }))}
          placeholder="Sélectionner un candidat"
          required
        />
        <Textarea
          label="Description"
          value={newCampagne.description}
          onChange={(e) => setNewCampagne({...newCampagne, description: e.target.value})}
          placeholder="Description de la campagne"
          rows={3}
          required
        />
        
        {/* Section upload d'image pour campagne */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image de campagne (optionnel)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageSelect('campaign', e.target.files?.[0] || null)}
              className="hidden"
              id="campaign-image"
            />
            <label htmlFor="campaign-image" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Cliquez pour sélectionner une image</p>
              <p className="text-xs text-gray-500">{"PNG, JPG jusqu'à 5MB"}</p>
            </label>
            {selectedImages['campaign'] && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {selectedImages['campaign'].name}
              </p>
            )}
          </div>
        </div>
      </FormModal>

      {/* Modal Élection */}
      <FormModal
        isOpen={showCreateModal && modalType === "election"}
        onClose={() => {
          setShowCreateModal(false);
          setNewElection({
            titre: '',
            description: '',
            dateDebut: '',
            dateFin: '',
            autoriserVoteMultiple: false,
            nombreMaxVotesParElecteur: 1,
            resultatsVisibles: false,
            electeursAutorises: [],
            candidatsParticipants: []
          });
        }}
        title="Nouvelle élection"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateElection();
        }}
        isLoading={isSubmitting}
        submitText="Créer l'élection"
        size="lg"
      >
        <Input
          label="Titre de l'élection"
          type="text"
          value={newElection.titre}
          onChange={(e) => setNewElection({...newElection, titre: e.target.value})}
          placeholder="Titre de l'élection"
          required
        />
        <Textarea
          label="Description"
          value={newElection.description}
          onChange={(e) => setNewElection({...newElection, description: e.target.value})}
          placeholder="Description de l'élection"
          rows={3}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date de début"
            type="datetime-local"
            value={newElection.dateDebut}
            onChange={(e) => setNewElection({...newElection, dateDebut: e.target.value})}
            required
          />
          <Input
            label="Date de fin"
            type="datetime-local"
            value={newElection.dateFin}
            onChange={(e) => setNewElection({...newElection, dateFin: e.target.value})}
            required
          />
        </div>
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="autoriserVoteMultiple"
              checked={newElection.autoriserVoteMultiple}
              onChange={(e) => setNewElection({...newElection, autoriserVoteMultiple: e.target.checked})}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="autoriserVoteMultiple" className="text-sm font-medium text-gray-700">
              Autoriser le vote multiple
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="resultatsVisibles"
              checked={newElection.resultatsVisibles}
              onChange={(e) => setNewElection({...newElection, resultatsVisibles: e.target.checked})}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="resultatsVisibles" className="text-sm font-medium text-gray-700">
              Résultats visibles immédiatement
            </label>
          </div>
          <Input
            label="Nombre maximum de votes par électeur"
            type="number"
            min={1}
            value={newElection.nombreMaxVotesParElecteur}
            onChange={(e) => setNewElection({...newElection, nombreMaxVotesParElecteur: parseInt(e.target.value) || 1})}
            required
          />
        </div>
      </FormModal>
      
      {/* Conteneur de notifications */}
      <NotificationContainer />
    </div>
  );
}