"use client";

import { Trophy, Medal, Award, Users } from "lucide-react";
import { CandidatAvecVotesDTO } from "@/lib/models/CandidatAvecVotesDTO";

interface LeaderboardSectionProps {
  candidates: CandidatAvecVotesDTO[];
}

export default function LeaderboardSection({ candidates }: LeaderboardSectionProps) {
  const sortedCandidates = [...candidates]
    .sort((a, b) => (b.nombreVotes || 0) - (a.nombreVotes || 0))
    .slice(0, 10);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
            {index + 1}
          </div>
        );
    }
  };

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return "border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50";
      case 1:
        return "border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50";
      case 2:
        return "border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50";
      default:
        return "border-gray-200 bg-white hover:bg-gray-50";
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Classement des candidats
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les candidats en tête et leurs performances
          </p>
        </div>

        {sortedCandidates.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucun candidat
              </h3>
              <p className="text-gray-500">
                Aucun candidat n'est actuellement disponible
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Top 3 podium */}
            {sortedCandidates.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* 2nd place */}
                <div className="text-center order-1">
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-6 shadow-md">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                      {sortedCandidates[1].nom.charAt(0)}{sortedCandidates[1].prenom.charAt(0)}
                    </div>
                    <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h3 className="font-bold text-lg text-gray-900">
                      {sortedCandidates[1].nom} {sortedCandidates[1].prenom}
                    </h3>
                    <div className="text-2xl font-bold text-gray-600 mt-2">
                      {sortedCandidates[1].nombreVotes || 0} votes
                    </div>
                  </div>
                </div>

                {/* 1st place - larger */}
                <div className="text-center order-2">
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-8 shadow-lg transform scale-105">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                      {sortedCandidates[0].nom.charAt(0)}{sortedCandidates[0].prenom.charAt(0)}
                    </div>
                    <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-bold text-xl text-gray-900">
                      {sortedCandidates[0].nom} {sortedCandidates[0].prenom}
                    </h3>
                    <div className="text-3xl font-bold text-yellow-600 mt-2">
                      {sortedCandidates[0].nombreVotes || 0} votes
                    </div>
                  </div>
                </div>

                {/* 3rd place */}
                <div className="text-center order-3">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-md">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                      {sortedCandidates[2].nom.charAt(0)}{sortedCandidates[2].prenom.charAt(0)}
                    </div>
                    <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <h3 className="font-bold text-lg text-gray-900">
                      {sortedCandidates[2].nom} {sortedCandidates[2].prenom}
                    </h3>
                    <div className="text-2xl font-bold text-amber-600 mt-2">
                      {sortedCandidates[2].nombreVotes || 0} votes
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Complete ranking list */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Classement complet
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {sortedCandidates.map((candidate, index) => (
                  <div
                    key={candidate.id}
                    className={`p-4 transition-colors duration-200 ${getRankStyle(index)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getRankIcon(index)}
                        </div>
                        
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {candidate.nom.charAt(0)}{candidate.prenom.charAt(0)}
                        </div>
                        
                        <div>
                          <div className="font-semibold text-gray-900">
                            {candidate.nom} {candidate.prenom}
                          </div>
                          {candidate.email && (
                            <div className="text-sm text-gray-600">
                              {candidate.email}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          {candidate.nombreVotes || 0}
                        </div>
                        <div className="text-sm text-gray-600">votes</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}