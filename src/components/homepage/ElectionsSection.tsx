"use client";

import { Calendar, Clock, Users, ChevronRight } from "lucide-react";
import { ElectionDTO } from "@/lib/models/ElectionDTO";

interface ElectionsSectionProps {
  elections: ElectionDTO[];
}

export default function ElectionsSection({ elections }: ElectionsSectionProps) {
  const activeElections = elections.filter(election => 
    election.statut === 'OUVERTE' || election.statut === 'EN_COURS'
  );

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Élections en cours
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Participez aux élections ouvertes et faites entendre votre voix
          </p>
        </div>

        {activeElections.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucune élection active
              </h3>
              <p className="text-gray-500">
                Aucune élection n'est actuellement ouverte au vote
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeElections.map((election) => (
              <div
                key={election.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {election.nom}
                    </h3>
                    {election.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {election.description}
                      </p>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    election.statut === 'OUVERTE' || election.statut === 'EN_COURS'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {election.statut === 'OUVERTE' ? 'En cours' : election.statut}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {election.dateDebut && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        Début: {new Date(election.dateDebut).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  
                  {election.dateFin && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>
                        Fin: {new Date(election.dateFin).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  
                  {election.nombreVotants !== undefined && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{election.nombreVotants} votants</span>
                    </div>
                  )}
                </div>

                <button className="w-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 py-3 px-4 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-300 flex items-center justify-center group">
                  <span className="font-medium">Voir les détails</span>
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}