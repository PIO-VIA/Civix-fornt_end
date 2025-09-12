'use client';

import { User, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CandidatDTO } from '@/lib/models/CandidatDTO';

interface VoteCandidatCardProps {
  candidat: CandidatDTO;
  isSelected: boolean;
  onClick: () => void;
}

export function VoteCandidatCard({ candidat, isSelected, onClick }: VoteCandidatCardProps) {

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
      
      {/* Photo de profil */}
      <div className="h-32 bg-gradient-to-br from-gray-300 to-gray-400 relative">
        {/* Remplacer par une vraie image si disponible */}
        <div className="absolute bottom-4 left-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="p-6 pt-8">
        {/* Nom et identifiant */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {candidat.username || 'Nom non disponible'}
          </h3>
          {candidat.parti && (
            <p className="text-sm text-blue-600 font-medium">{candidat.parti}</p>
          )}
        </div>

        {/* Slogan ou biographie courte */}
        <p className="text-gray-600 text-sm mb-4 h-10">
          {candidat.slogan || 'Slogan ou description du candidat à venir.'}
        </p>
        
        <div className="pt-4 border-t border-gray-100">
           <p className="text-xs text-center text-gray-500">Cliquez pour sélectionner</p>
        </div>
      </div>
    </motion.div>
  );
}
