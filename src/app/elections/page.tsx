import { Suspense } from 'react';
import { ElectionsList } from '@/components/elections/ElectionsList';
import { ElectionFilters } from '@/components/elections/ElectionFilters';
import { SearchInput } from '@/components/ui/SearchInput';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import type { PageProps } from '@/types';

export default async function ElectionsPage({ searchParams }: PageProps) {
  const filters = await searchParams;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Élections
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez toutes les élections disponibles et participez à la démocratie
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="md:col-span-2">
              <SearchInput
                placeholder="Rechercher une élection..."
                defaultValue={filters?.recherche as string}
                paramName="recherche"
              />
            </div>
            <Suspense fallback={<div className="h-10 bg-gray-200 rounded animate-pulse" />}>
              <ElectionFilters />
            </Suspense>
          </div>
        </div>

        {/* Liste des élections */}
        <Suspense fallback={<LoadingSkeleton count={6} />}>
          <ElectionsList filters={filters} />
        </Suspense>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Élections - CIVIX',
  description: 'Découvrez toutes les élections disponibles sur la plateforme CIVIX',
};