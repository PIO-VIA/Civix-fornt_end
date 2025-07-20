"use client";

import { useState } from "react";
import { Vote, LogOut, Shield, Plus, Edit, Trash2, Users, Calendar, BarChart3, Settings, Mail, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("voters");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState<"voter" | "candidate" | "campaign" | null>(null);

  const voters = [
    { id: 1, email: "electeur1@example.com", name: "Jean Dupont", status: "active", lastLogin: "2024-12-15" },
    { id: 2, email: "electeur2@example.com", name: "Marie Martin", status: "active", lastLogin: "2024-12-14" },
    { id: 3, email: "electeur3@example.com", name: "Pierre Durand", status: "pending", lastLogin: null }
  ];

  const candidates = [
    { id: 1, name: "Jean Dupont", party: "Parti Démocrate", email: "jean.dupont@parti-demo.fr", status: "active" },
    { id: 2, name: "Marie Martin", party: "Parti Républicain", email: "marie.martin@parti-rep.fr", status: "active" },
    { id: 3, name: "Pierre Durand", party: "Parti Centriste", email: "pierre.durand@parti-cent.fr", status: "active" }
  ];

  const campaigns = [
    { id: 1, candidateId: 1, candidateName: "Jean Dupont", title: "Pour une France plus juste", status: "active", startDate: "2024-12-01", endDate: "2024-12-31" },
    { id: 2, candidateId: 2, candidateName: "Marie Martin", title: "L'avenir ensemble", status: "active", startDate: "2024-12-01", endDate: "2024-12-31" },
    { id: 3, candidateId: 3, candidateName: "Pierre Durand", title: "Unité et progrès", status: "active", startDate: "2024-12-01", endDate: "2024-12-31" }
  ];

  const elections = [
    {
      id: 1,
      title: "Élection Présidentielle 2024",
      status: "active",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      totalVoters: 1500,
      votesCast: 1200,
      candidates: 3
    }
  ];

  const handleLogout = () => {
    window.location.href = "/";
  };

  const handleCreateModal = (type: "voter" | "candidate" | "campaign") => {
    setModalType(type);
    setShowCreateModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "pending": return "text-orange-600 bg-orange-100";
      case "inactive": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <Header title="CIVIX - Espace Administrateur" role="Administrateur" color="purple" onLogout={handleLogout} />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord administrateur</h2>
            <p className="text-gray-600">Gérez les électeurs, candidats, campagnes et surveillez les élections</p>
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
                  <p className="text-2xl font-bold text-gray-900">{voters.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">1,200</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("voters")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "voters"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Électeurs
                </button>
                <button
                  onClick={() => setActiveTab("candidates")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "candidates"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Candidats
                </button>
                <button
                  onClick={() => setActiveTab("campaigns")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "campaigns"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Campagnes
                </button>
                <button
                  onClick={() => setActiveTab("elections")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "elections"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Élections
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
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
                <div className="space-y-4">
                  {voters.map((voter) => (
                    <div key={voter.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{voter.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{voter.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(voter.status)}`}>
                              {voter.status === "active" ? "Actif" : "En attente"}
                            </span>
                            {voter.lastLogin && (
                              <span>Dernière connexion: {voter.lastLogin}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Envoyer les identifiants">
                            <Mail className="w-4 h-4" />
                          </button>
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
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <div key={candidate.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{candidate.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{candidate.party}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{candidate.email}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                              {candidate.status === "active" ? "Actif" : "Inactif"}
                            </span>
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
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{campaign.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">Candidat: {campaign.candidateName}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{campaign.startDate} - {campaign.endDate}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status === "active" ? "Active" : "Inactive"}
                            </span>
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
              </div>
            </div>
          )}

          {activeTab === "elections" && (
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Gestion des élections</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Nouvelle élection</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {elections.map((election) => (
                    <div key={election.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{election.title}</h4>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{election.startDate} - {election.endDate}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(election.status)}`}>
                              {election.status === "active" ? "En cours" : "À venir"}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                            <span>{election.totalVoters} électeurs</span>
                            <span>{election.votesCast} votes</span>
                            <span>{election.candidates} candidats</span>
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
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
} 