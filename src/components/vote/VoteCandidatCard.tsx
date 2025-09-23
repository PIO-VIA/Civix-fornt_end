'use client';

import Image from 'next/image';
import {  CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CandidatDTO } from '@/lib/models/CandidatDTO';

interface VoteCandidatCardProps {
  candidat: CandidatDTO;
  isSelected: boolean;
  onClick: () => void;
}

export function VoteCandidatCard({ candidat, isSelected, onClick }: VoteCandidatCardProps) {
  console.log('Candidat dans VoteCandidatCard:', candidat);
  
  // Utiliser directement l'objet candidat
  const candidatInfo = candidat;
  
  const isValidPath = (path?: string) => {
    return path && path.trim() !== '' && path !== 'string' && (path.startsWith('/') || path.startsWith('http'));
  };
  
  const candidatImage = isValidPath(candidatInfo.photo) ? candidatInfo.photo! : '/assets/poduim.jpeg';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`rounded-lg shadow-sm border transition-all duration-200 cursor-pointer relative ${
        isSelected
          ? 'border-blue-600 ring-2 ring-blue-500 shadow-lg'
          : 'border-gray-200 hover:shadow-md hover:border-blue-300'
      } bg-white overflow-hidden`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 z-10">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}
      
      {/* Photo du candidat */}
      <div className="relative h-48">
        <Image
          src={candidatImage}
          alt={candidatInfo.username || 'Candidat'}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <div className="bg-white bg-opacity-90 rounded-lg px-3 py-1">
            <span className="text-sm font-medium text-gray-900">
              {candidatInfo.username || candidatInfo.email?.split('@')[0] || 'Candidat'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Description ou biographie courte */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px]">
            {candidatInfo.description || 'Description du candidat à venir.'}
          </p>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
           <p className="text-xs text-center text-gray-500">Cliquez pour sélectionner</p>
        </div>
      </div>
    </motion.div>
  );
}
