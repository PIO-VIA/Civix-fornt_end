import { ElectionsService } from '@/lib/services/ElectionsService';
import { ElectionCard } from './ElectionCard';
import type { ElectionFilters } from '@/types';

interface ElectionsListProps {
  filters?: ElectionFilters;
}

export async function ElectionsList({ filters }: ElectionsListProps) {
  try {
    // Récupérer toutes les élections publiques
    const elections = await ElectionsService.listerToutesElections();
    
    // Appliquer les filtres côté client (en production, ceci devrait être fait côté serveur)
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
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
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
  } catch (error) {
    console.error('Erreur lors du chargement des élections:', error);
    
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
        <p className="text-gray-600">
          Une erreur s'est produite lors du chargement des élections.
        </p>
      </div>
    );
  }
}