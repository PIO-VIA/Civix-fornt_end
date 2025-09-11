'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Filter } from 'lucide-react';

const STATUTS = [
  { value: '', label: 'Tous les statuts' },
  { value: 'OUVERTE', label: 'Ouvertes' },
  { value: 'EN_COURS', label: 'En cours' },
  { value: 'TERMINEE', label: 'Terminées' },
  { value: 'PLANIFIEE', label: 'Planifiées' },
];

export function ElectionFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statut, setStatut] = useState(searchParams.get('statut') || '');

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // Reset pagination
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-700">Filtrer par:</span>
      </div>
      
      <select
        value={statut}
        onChange={(e) => {
          setStatut(e.target.value);
          handleFilterChange('statut', e.target.value);
        }}
        className="block w-full px-3 py-2 border border-gray-300 text-black rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {STATUTS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}