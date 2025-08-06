import { Suspense } from 'react';
import { CandidatsList } from '@/components/candidats/CandidatsList';
import { SearchInput } from '@/components/ui/SearchInput';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import type { PageProps } from '@/types';

export default async function CandidatsPage({ searchParams }: PageProps) {
  const filters = await searchParams;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Candidats
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez les profils des candidats et leurs programmes
          </p>
        </div>

        {/* Recherche */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <SearchInput
            placeholder="Rechercher un candidat..."
            defaultValue={filters?.recherche as string}
            paramName="recherche"
            className="max-w-lg"
          />
        </div>

        {/* Liste des candidats */}
        <Suspense fallback={<LoadingSkeleton count={6} />}>
          <CandidatsList filters={filters} />
        </Suspense>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Candidats - CIVIX',
  description: 'Découvrez les profils des candidats et leurs programmes sur CIVIX',
};