'use client';

import { Suspense } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProfilInfo } from '@/components/profil/ProfilInfo';
import { HistoriqueVotes } from '@/components/profil/HistoriqueVotes';
import { ChangePasswordForm } from '@/components/profil/ChangePasswordForm';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { User, History, Key } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

export default function ProfilPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-purple-600 text-white p-3 rounded-lg mr-4">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Mon Profil
                </h1>
                <p className="text-lg text-gray-600">
                  Gérez vos informations personnelles et votre historique de vote
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Informations personnelles */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informations personnelles
                  </h2>
                </div>
                <div className="p-6">
                  <Suspense fallback={<LoadingSkeleton count={1} />}>
                    <ProfilInfo user={user} />
                  </Suspense>
                </div>
              </div>

              {/* Historique des votes */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <History className="w-5 h-5 mr-2" />
                    Historique de vote
                  </h2>
                </div>
                <div className="p-6">
                  <Suspense fallback={<LoadingSkeleton count={3} />}>
                    <HistoriqueVotes />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Changement de mot de passe */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    Sécurité
                  </h2>
                </div>
                <div className="p-6">
                  <Suspense fallback={<LoadingSkeleton count={1} />}>
                    <ChangePasswordForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}