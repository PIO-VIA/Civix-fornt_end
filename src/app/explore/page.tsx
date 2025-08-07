import { Suspense } from 'react';
import { ElectionsList } from '@/components/elections/ElectionsList';
import { ElectionFilters } from '@/components/elections/ElectionFilters';
import { CandidatsList } from '@/components/candidats/CandidatsList';
import { CampagnesList } from '@/components/campagnes/CampagnesList';
import { SearchInput } from '@/components/ui/SearchInput';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { ExploreFooter } from '@/components/layout/ExploreFooter';
import type { PageProps } from '@/types';

export default async function ExplorePage({ searchParams }: PageProps) {
  const filters = await searchParams;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Élections */}
      <section id="elections" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Élections
            </h1>
            <p className="text-lg text-gray-600">
              Découvrez toutes les élections disponibles et participez à la démocratie
            </p>
          </div>

          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
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

          <Suspense fallback={<LoadingSkeleton count={6} />}>
            <ElectionsList filters={filters} />
          </Suspense>
        </div>
      </section>

      {/* Section Candidats */}
      <section id="candidats" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Candidats
            </h1>
            <p className="text-lg text-gray-600">
              Découvrez les profils des candidats et leurs programmes
            </p>
          </div>

          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <SearchInput
              placeholder="Rechercher un candidat..."
              defaultValue={filters?.recherche as string}
              paramName="recherche"
              className="max-w-lg"
            />
          </div>

          <Suspense fallback={<LoadingSkeleton count={6} />}>
            <CandidatsList filters={filters} />
          </Suspense>
        </div>
      </section>

      {/* Section Campagnes */}
      <section id="campagnes" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Campagnes
            </h1>
            <p className="text-lg text-gray-600">
              Explorez les campagnes électorales et les programmes des candidats
            </p>
          </div>

          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <SearchInput
              placeholder="Rechercher une campagne..."
              defaultValue={filters?.recherche as string}
              paramName="recherche"
              className="max-w-lg"
            />
          </div>

          <Suspense fallback={<LoadingSkeleton count={6} />}>
            <CampagnesList filters={filters} />
          </Suspense>
        </div>
      </section>

      {/* Footer avec navigation */}
      <ExploreFooter />
    </div>
  );
}

export const metadata = {
  title: 'Explorer - CIVIX',
  description: 'Découvrez les élections, candidats et campagnes sur la plateforme CIVIX',
};