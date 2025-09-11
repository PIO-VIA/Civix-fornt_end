'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebouncedCallback } from '@/hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  paramName?: string;
  className?: string;
}

export function SearchInput({ 
  placeholder = "Rechercher...", 
  defaultValue = "",
  paramName = "q",
  className = ""
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);

  const debouncedSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(paramName, term);
    } else {
      params.delete(paramName);
    }
    params.delete('page'); // Reset pagination
    router.push(`?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  const clearSearch = () => {
    setValue('');
    const params = new URLSearchParams(searchParams);
    params.delete(paramName);
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 text-black   rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
}