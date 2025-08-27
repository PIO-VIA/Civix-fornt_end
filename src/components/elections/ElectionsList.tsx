'use client';

import { useElections } from '@/hooks';
import { ElectionCard } from './ElectionCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import type { ElectionFilters } from '@/types';

interface ElectionsListProps {
  filters?: ElectionFilters;
}

export function ElectionsList({ filters }: ElectionsListProps) {
  const { data: elections, isLoading, error } = useElections();

  if (isLoading) {
    return <LoadingSkeleton count={6} />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Erreur de chargement des élections: {error.message}</p>
      </div>
    );
  }

  // Appliquer les filtres côté client
  let filteredElections = elections || [];
  if (filters?.statut) {
    filteredElections = filteredElections.filter(
      election => election.statut === filters.statut
    );
  }
  if (filters?.recherche) {
    const searchTerm = filters.recherche.toLowerCase();
    filteredElections = filteredElections.filter(
      election => 
        election.titre?.toLowerCase().includes(searchTerm) ||
        election.description?.toLowerCase().includes(searchTerm)
    );
  }

  if (filteredElections.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune élection trouvée</h3>
        <p className="text-gray-600">
          Aucune élection ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredElections.map((election) => (
        <ElectionCard 
          key={election.externalIdElection} 
          election={election} 
        />
      ))}
    </div>
  );
}