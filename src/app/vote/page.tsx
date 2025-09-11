'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VoteInterface } from '@/components/vote/VoteInterface';
import { ElectionsActives } from '@/components/vote/ElectionsActives';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { Vote, Shield, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

export default function VotePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
              <Vote className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Espace de Vote
              </h1>
              <p className="text-lg text-gray-600">
                Bonjour {user?.username || user?.email}, exercez votre droit de vote en toute sécurité
              </p>
            </div>
          </div>

          {/* Informations de sécurité */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-blue-600 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  Votre vote est sécurisé
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Authentification vérifiée
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Connexion chiffrée
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Vote anonyme et traçable
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Interface de vote */}
        <div className="space-y-8">
          {/* Élections actives */}
          <Suspense fallback={<LoadingSkeleton count={3} />}>
            <ElectionsActives userId={user?.externalIdElecteur || ''} />
          </Suspense>

          {/* Interface de vote détaillée */}
          <Suspense fallback={<LoadingSkeleton count={1} />}>
            <VoteInterface />
          </Suspense>
        </div>
      </div>
    </div>
  );
}