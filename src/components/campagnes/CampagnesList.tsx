'use client';

import { useCampagnes } from '@/hooks';
import { CampagneCard } from './CampagneCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import type { CampagneFilters } from '@/types';

interface CampagnesListProps {
  filters?: CampagneFilters;
}

export function CampagnesList({ filters }: CampagnesListProps) {
  const { data: campagnes, isLoading, error } = useCampagnes();

  if (isLoading) {
    return <LoadingSkeleton count={4} />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Erreur de chargement des campagnes: {error.message}</p>
      </div>
    );
  }

  // Appliquer les filtres côté client
  let filteredCampagnes = campagnes || [];
  if (filters?.recherche) {
    const searchTerm = filters.recherche.toLowerCase();
    filteredCampagnes = filteredCampagnes.filter(
      campagne => 
        campagne.description?.toLowerCase().includes(searchTerm) ||
        campagne.candidat?.username?.toLowerCase().includes(searchTerm) ||
        campagne.candidat?.email?.toLowerCase().includes(searchTerm)
    );
  }

  if (filteredCampagnes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune campagne trouvée</h3>
        <p className="text-gray-600">
          Aucune campagne ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-1">
      {filteredCampagnes.map((campagne) => (
        <CampagneCard 
          key={campagne.externalIdCampagne} 
          campagne={campagne} 
        />
      ))}
    </div>
  );
}