'use client';

import { useSearchParams } from 'next/navigation';
import { DetailedVoteForm } from './DetailedVoteForm';
import { Info } from 'lucide-react';

interface VoteInterfaceProps {}

export function VoteInterface({}: VoteInterfaceProps) {
  const searchParams = useSearchParams();
  const electionId = searchParams.get('election');

  if (!electionId) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="text-blue-500 mb-4">
            <Info className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Sélectionnez une élection
          </h3>
          <p className="text-gray-600">
            Choisissez une élection dans la liste ci-dessus pour procéder au vote.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Interface de vote détaillée
      </h2>
      <DetailedVoteForm electionId={electionId} />
    </div>
  );
}