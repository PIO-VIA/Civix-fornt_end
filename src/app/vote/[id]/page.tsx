'use client';

import { Suspense } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { VoteInterface } from '@/components/vote/VoteInterface';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { useParams } from 'next/navigation';
import { ArrowLeft, Vote } from 'lucide-react';
import Link from 'next/link';

export default function DetailedVotePage() {
  const params = useParams();
  const electionId = params.id as string;

  if (!electionId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <p className="text-lg text-gray-600">Élection non trouvée.</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/vote" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux élections
            </Link>
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                <Vote className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Voter pour l'élection
                </h1>
                <p className="text-lg text-gray-600">
                  Sélectionnez votre candidat et confirmez votre vote.
                </p>
              </div>
            </div>
          </div>

          <Suspense fallback={<LoadingSkeleton count={1} />}>
            <VoteInterface electionId={electionId} />
          </Suspense>
        </div>
      </div>
    </ProtectedRoute>
  );
}
