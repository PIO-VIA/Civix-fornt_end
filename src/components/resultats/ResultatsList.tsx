'use client';

import { useResultats } from '@/hooks';
import { ResultatCard } from './ResultatCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export function ResultatsList() {
  const { data: electionsAvecResultats, isLoading, error } = useResultats();

  if (isLoading) {
    return <LoadingSkeleton count={3} />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Impossible de charger les résultats: {error.message}</p>
      </div>
    );
  }

  if (!electionsAvecResultats || electionsAvecResultats.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun résultat disponible
          </h3>
          <p className="text-gray-600">
            Il n'y a actuellement aucun résultat d'élection à afficher.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Résultats des élections terminées
      </h2>
      
      <div className="space-y-6">
        {electionsAvecResultats.map(({ election, resultats }) => (
          <ResultatCard
            key={election.externalIdElection}
            election={election}
            resultats={resultats}
          />
        ))}
      </div>
    </div>
  );
}