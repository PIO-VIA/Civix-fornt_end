"use client";

import { useState, useEffect } from "react";
import { BarChart3, Calendar, Users, Eye, Vote, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PublicService } from "@/lib/services/PublicService";
import { CampagnesPublicService } from "@/lib/services/CampagnesPublicService";
import { CandidatsPublicService } from "@/lib/services/CandidatsPublicService";

export default function ReaderPage() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // TODO: Remplacer par de vraies API calls
  const [publicData, setPublicData] = useState({
    campaigns: [],
    candidates: [],
    results: [],
    stats: {
      totalVoters: 0,
      totalVotes: 0,
      participationRate: 0
    }
  });

  useEffect(() => {
    loadPublicData();
  }, []);

  const loadPublicData = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // TODO: Implémenter les vraies API calls
      // const campaigns = await CampagnesPublicService.getCampagnesPubliques();
      // const candidates = await CandidatsPublicService.getCandidatsPublics();
      // const stats = await PublicService.getStatistiquesPubliques();
      
      // Mock data pour le moment
      setPublicData({
        campaigns: [
          {
            id: 1,
            title: "Élection Présidentielle 2024",
            description: "Élection du Président de la République",
            startDate: "2024-12-01",
            endDate: "2024-12-31",
            status: "en_cours",
            candidatesCount: 3,
            votersCount: 1500
          }
        ],
        candidates: [
          {
            id: 1,
            name: "Jean Dupont",
            party: "Parti Démocrate",
            campaignTitle: "Pour une France plus juste",
            description: "Candidat expérimenté avec 15 ans d'expérience politique"
          },
          {
            id: 2,
            name: "Marie Martin",
            party: "Parti Républicain",
            campaignTitle: "L'avenir ensemble",
            description: "Économiste reconnue, spécialiste des questions financières"
          },
          {
            id: 3,
            name: "Pierre Durand",
            party: "Parti Centriste",
            campaignTitle: "Unité et progrès",
            description: "Maire de Lyon, expert en gestion locale"
          }
        ],
        results: [],
        stats: {
          totalVoters: 1500,
          totalVotes: 1200,
          participationRate: 80
        }
      });
      
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setError("Erreur lors du chargement des données publiques");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
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
                  <p className="text-2xl font-bold text-gray-900">{publicData.stats.totalVoters.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{publicData.stats.totalVotes.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{publicData.stats.participationRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("campaigns")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "campaigns"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Campagnes en cours
                </button>
                <button
                  onClick={() => setActiveTab("candidates")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "candidates"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Candidats
                </button>
                <button
                  onClick={() => setActiveTab("results")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "results"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Résultats
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {activeTab === "campaigns" && (
            <div className="space-y-6">
              {publicData.campaigns.map((campaign: any) => (
                <div key={campaign.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
                      <p className="text-gray-700 mb-4">{campaign.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{campaign.candidatesCount} candidats</span>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {campaign.status === "en_cours" ? "En cours" : "Terminée"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="grid gap-6">
              {publicData.candidates.map((candidate: any) => (
                <div key={candidate.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
                      <p className="text-sm text-green-600 font-semibold mb-2">{candidate.party}</p>
                      <p className="text-lg text-gray-800 font-medium mb-2">{candidate.campaignTitle}</p>
                      <p className="text-gray-700">{candidate.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "results" && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Résultats à venir</h4>
                <p className="text-gray-600">
                  Les résultats seront publiés à la fin de la période de vote
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