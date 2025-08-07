'use client';

import { CandidatsPublicService } from '@/lib/services/CandidatsPublicService';
import { CandidatCard } from './CandidatCard';
import type { CandidatFilters } from '@/types';

interface CandidatsListProps {
  filters?: CandidatFilters;
}

export async function CandidatsList({ filters }: CandidatsListProps) {
  try {
    // Récupérer tous les candidats publics
    const candidats = await CandidatsPublicService.listerTousCandidats();
    
    // Appliquer les filtres côté client
    let filteredCandidats = candidats || [];
    
    if (filters?.recherche) {
      const searchTerm = filters.recherche.toLowerCase();
      filteredCandidats = filteredCandidats.filter(
        candidat => 
          candidat.username?.toLowerCase().includes(searchTerm) ||
          candidat.email?.toLowerCase().includes(searchTerm)
      );
    }

    if (filteredCandidats.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
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
  } catch (error) {
    console.error('Erreur lors du chargement des candidats:', error);
    
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
        <p className="text-gray-600">
          {"Une erreur s'est produite lors du chargement des candidats."}
        </p>
      </div>
    );
  }
}