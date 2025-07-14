"use client";

import { useState } from "react";
import { Vote, LogOut, User, Calendar, CheckCircle, Clock, Eye } from "lucide-react";

export default function VoterPage() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const currentElection = {
    id: 1,
    title: "Élection Présidentielle 2024",
    status: "active",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    votingPeriod: {
      start: "2024-12-15",
      end: "2024-12-30"
    }
  };

  const candidates = [
    { 
      id: 1, 
      name: "Jean Dupont", 
      party: "Parti Démocrate", 
      email: "jean.dupont@parti-demo.fr",
      description: "Candidat expérimenté avec 15 ans d'expérience politique",
      campaign: {
        title: "Pour une France plus juste",
        slogan: "L'égalité pour tous",
        description: "Programme axé sur la justice sociale et l'égalité des chances",
        keyPoints: [
          "Réforme du système éducatif",
          "Renforcement de la protection sociale",
          "Transition écologique",
          "Réduction des inégalités"
        ]
      }
    },
    { 
      id: 2, 
      name: "Marie Martin", 
      party: "Parti Républicain", 
      email: "marie.martin@parti-rep.fr",
      description: "Économiste reconnue, spécialiste des questions financières",
      campaign: {
        title: "L'avenir ensemble",
        slogan: "Ensemble, construisons l'avenir",
        description: "Vision moderne et pragmatique pour la France de demain",
        keyPoints: [
          "Libéralisation économique",
          "Simplification administrative",
          "Innovation technologique",
          "Sécurité renforcée"
        ]
      }
    },
    { 
      id: 3, 
      name: "Pierre Durand", 
      party: "Parti Centriste", 
      email: "pierre.durand@parti-cent.fr",
      description: "Maire de Lyon, expert en gestion locale",
      campaign: {
        title: "Unité et progrès",
        slogan: "Rassembler pour avancer",
        description: "Approche consensuelle et rassembleuse",
        keyPoints: [
          "Décentralisation renforcée",
          "Dialogue social",
          "Développement durable",
          "Cohésion nationale"
        ]
      }
    }
  ];

  const isVotingPeriod = () => {
    const now = new Date();
    const start = new Date(currentElection.votingPeriod.start);
    const end = new Date(currentElection.votingPeriod.end);
    return now >= start && now <= end;
  };

  const handleVote = () => {
    if (selectedCandidate !== null) {
      setHasVoted(true);
      // TODO: Envoyer le vote à l'API
      console.log("Vote enregistré pour le candidat:", selectedCandidate);
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">CIVIX - Espace Électeur</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Électeur</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue dans votre espace de vote</h2>
          <p className="text-gray-600">Consultez les candidats, leurs campagnes et participez aux élections</p>
        </div>

        {/* Current Election Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentElection.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Période de vote: {currentElection.votingPeriod.start} - {currentElection.votingPeriod.end}</span>
                </div>
                {isVotingPeriod() ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Vote en cours</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span>Vote à venir</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
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
              >
                Voter
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === "candidates" && (
          <div className="grid gap-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{candidate.party}</p>
                    <p className="text-gray-700 mb-4">{candidate.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{candidate.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("campaigns")}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir la campagne</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "campaigns" && (
          <div className="space-y-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.campaign.title}</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-2">&ldquo;{candidate.campaign.slogan}&rdquo;</p>
                  <p className="text-gray-700 mb-4">{candidate.campaign.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Points clés du programme :</h4>
                  <ul className="space-y-2">
                    {candidate.campaign.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>Candidat: {candidate.name} - {candidate.party}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidate.id);
                      setActiveTab("vote");
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Vote className="w-4 h-4" />
                    <span>Voter pour ce candidat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "vote" && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            {!isVotingPeriod() ? (
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Période de vote fermée</h4>
                <p className="text-gray-600">
                  Le vote sera ouvert du {currentElection.votingPeriod.start} au {currentElection.votingPeriod.end}
                </p>
              </div>
            ) : hasVoted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Vote enregistré !</h4>
                <p className="text-gray-600">Votre vote a été pris en compte avec succès.</p>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Sélectionnez votre candidat</h4>
                <div className="grid gap-4">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      onClick={() => setSelectedCandidate(candidate.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedCandidate === candidate.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-gray-900">{candidate.name}</h5>
                          <p className="text-sm text-gray-600">{candidate.party}</p>
                          <p className="text-sm text-gray-500 mt-1">{candidate.campaign.title}</p>
                        </div>
                        {selectedCandidate === candidate.id && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleVote}
                    disabled={selectedCandidate === null}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      selectedCandidate !== null
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Confirmer mon vote
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 