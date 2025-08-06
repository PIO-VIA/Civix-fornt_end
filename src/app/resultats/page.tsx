import { Suspense } from 'react';
import { requireAuth } from '@/lib/auth/auth';
import { ResultatsList } from '@/components/resultats/ResultatsList';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

export default async function ResultatsPage() {
  const user = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-green-600 text-white p-3 rounded-lg mr-4">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Résultats des Élections
              </h1>
              <p className="text-lg text-gray-600">
                Consultez les résultats en temps réel des élections
              </p>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">-</div>
                  <div className="text-sm text-gray-600">Électeurs inscrits</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">-</div>
                  <div className="text-sm text-gray-600">Taux de participation</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">-</div>
                  <div className="text-sm text-gray-600">Élections terminées</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des résultats */}
        <Suspense fallback={<LoadingSkeleton count={4} />}>
          <ResultatsList userId={user.externalIdElecteur} />
        </Suspense>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Résultats - CIVIX',
  description: 'Consultez les résultats des élections en temps réel sur CIVIX',
};