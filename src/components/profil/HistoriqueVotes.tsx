'use client';

import { useHistoriqueVotes } from '@/hooks';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { Calendar, Vote, CheckCircle2 } from 'lucide-react';

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Date inconnue';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function HistoriqueVotes() {
  const { data: historique, isLoading, error } = useHistoriqueVotes();

  if (isLoading) {
    return <LoadingSkeleton count={3} />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Impossible de charger votre historique de vote: {error.message}</p>
      </div>
    );
  }

  if (!historique || !historique.participations || historique.participations.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun vote enregistré</h3>
        <p className="text-gray-600">Vous n'avez encore participé à aucune élection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Vous avez participé à {historique.participations.length} élection(s)
      </div>
      
      <div className="space-y-4">
        {historique.participations.map((participation, index) => (
          <div
            key={participation.electionId || index}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  <h4 className="font-medium text-gray-900">
                    {participation.electionTitre || 'Élection sans titre'}
                  </h4>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {participation.electionDescription || 'Aucune description disponible'}
                </p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>
                    Voté le {formatDate(participation.dateVote)}
                  </span>
                </div>
              </div>
              
              <div className="ml-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Participé
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistiques résumées */}
      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600">
              {historique.participations.length}
            </div>
            <div className="text-sm text-blue-700">
              Élections
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-semibold text-green-600">
              100%
            </div>
            <div className="text-sm text-green-700">
              Participation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

    
}