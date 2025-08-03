"use client";

import { Eye, Calendar, Users, ChevronRight } from "lucide-react";
import { CampagneAvecCandidatDTO } from "@/lib/models/CampagneAvecCandidatDTO";

interface CampaignsSectionProps {
  campaigns: CampagneAvecCandidatDTO[];
}

export default function CampaignsSection({ campaigns }: CampaignsSectionProps) {
  const visibleCampaigns = campaigns.filter(campaign => campaign.visible);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Campagnes électorales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les campagnes et les candidats qui se présentent
          </p>
        </div>

        {visibleCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 max-w-md mx-auto shadow-sm">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucune campagne visible
              </h3>
              <p className="text-gray-500">
                Aucune campagne n'est actuellement disponible publiquement
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCampaigns.slice(0, 6).map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-purple-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {campaign.nom}
                  </h3>
                  {campaign.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {campaign.description}
                    </p>
                  )}
                </div>

                {/* Campaign Info */}
                <div className="space-y-2 mb-4">
                  {campaign.dateDebut && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Depuis le {new Date(campaign.dateDebut).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  
                  {campaign.candidat && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Candidat: {campaign.candidat.nom} {campaign.candidat.prenom}</span>
                    </div>
                  )}
                </div>

                {/* Candidate Info */}
                {campaign.candidat && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {campaign.candidat.nom.charAt(0)}{campaign.candidat.prenom.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {campaign.candidat.nom} {campaign.candidat.prenom}
                        </div>
                        {campaign.candidat.email && (
                          <div className="text-sm text-gray-600">
                            {campaign.candidat.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <button className="w-full bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 py-3 px-4 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-all duration-300 flex items-center justify-center group">
                  <span className="font-medium">Voir la campagne</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}

        {visibleCampaigns.length > 6 && (
          <div className="text-center mt-8">
            <button className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 font-medium">
              Voir toutes les campagnes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}