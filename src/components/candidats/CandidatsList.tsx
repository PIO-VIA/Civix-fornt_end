'use client';

import { useCandidats } from '@/hooks';
import { CandidatCard } from './CandidatCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import type { CandidatDTO } from '@/lib/models/CandidatDTO';

interface CandidatsListProps {
  filters?: { [key: string]: string | string[] | undefined };
}

export function CandidatsList({ filters }: CandidatsListProps) {
  const { data: candidats, isLoading, error } = useCandidats();

  if (isLoading) {
    return <LoadingSkeleton count={6} />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Erreur de chargement des candidats: {error.message}</p>
      </div>
    );
  }

  // Appliquer les filtres côté client
  let filteredCandidats: CandidatDTO[] = candidats || [];
  const recherche = filters?.recherche as string;
  if (recherche) {
    const searchTerm = recherche.toLowerCase();
    filteredCandidats = filteredCandidats.filter(
      candidat => 
        candidat.username?.toLowerCase().includes(searchTerm) ||
        candidat.email?.toLowerCase().includes(searchTerm)
    );
  }

  if (filteredCandidats.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun candidat trouvé</h3>
        <p className="text-gray-600">
          Aucun candidat ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredCandidats.map((candidat) => (
        <CandidatCard 
          key={candidat.externalIdCandidat} 
          candidat={candidat} 
        />
      ))}
    </div>
  );
}