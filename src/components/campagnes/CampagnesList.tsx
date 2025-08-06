import { CampagnesPublicService } from '@/lib/services/CampagnesPublicService';
import { CampagneCard } from './CampagneCard';
import type { CampagneFilters } from '@/types';

interface CampagnesListProps {
  filters?: CampagneFilters;
}

export async function CampagnesList({ filters }: CampagnesListProps) {
  try {
    // Récupérer toutes les campagnes publiques
    const campagnes = await CampagnesPublicService.listerToutesCampagnes();
    
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
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune campagne trouvée</h3>
          <p className="text-gray-600">
            Aucune campagne ne correspond à vos critères de recherche.
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredCampagnes.map((campagne) => (
          <CampagneCard 
            key={campagne.externalIdCampagne} 
            campagne={campagne} 
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Erreur lors du chargement des campagnes:', error);
    
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
        <p className="text-gray-600">
          Une erreur s'est produite lors du chargement des campagnes.
        </p>
      </div>
    );
  }
}