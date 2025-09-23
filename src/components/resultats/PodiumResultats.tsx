'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Crown, Medal, Award } from 'lucide-react';
import type { ResultatCandidatDTO } from '@/lib/models/ResultatCandidatDTO';

interface PodiumResultatsProps {
  candidats: ResultatCandidatDTO[];
  totalVotes: number;
}

const getPodiumIcon = (position: number) => {
  switch (position) {
    case 0:
      return <Crown className="w-8 h-8 text-yellow-500" />;
    case 1:
      return <Medal className="w-7 h-7 text-gray-400" />;
    case 2:
      return <Award className="w-6 h-6 text-amber-600" />;
    default:
      return null;
  }
};

const getPodiumHeight = (position: number) => {
  switch (position) {
    case 0:
      return 'h-32'; // 1er - le plus haut
    case 1:
      return 'h-24'; // 2ème - moyen
    case 2:
      return 'h-20'; // 3ème - le plus bas
    default:
      return 'h-16';
  }
};

const getPodiumColor = (position: number) => {
  switch (position) {
    case 0:
      return 'bg-gradient-to-t from-yellow-400 to-yellow-300'; // Or pour 1er
    case 1:
      return 'bg-gradient-to-t from-gray-300 to-gray-200'; // Argent pour 2ème
    case 2:
      return 'bg-gradient-to-t from-amber-500 to-amber-400'; // Bronze pour 3ème
    default:
      return 'bg-gradient-to-t from-gray-200 to-gray-100';
  }
};

const calculatePercentage = (votes: number, total: number) => {
  if (total === 0) return 0;
  return ((votes / total) * 100).toFixed(1);
};

export function PodiumResultats({ candidats, totalVotes }: PodiumResultatsProps) {
  // Trier les candidats par nombre de votes décroissant et prendre les 3 premiers
  const top3 = candidats
    .sort((a, b) => (b.nombreVotes || 0) - (a.nombreVotes || 0))
    .slice(0, 3);

  // Réorganiser pour l'affichage du podium : 2ème, 1er, 3ème
  const podiumOrder = [
    top3[1], // 2ème place à gauche
    top3[0], // 1er place au centre  
    top3[2], // 3ème place à droite
  ].filter(Boolean); // Supprimer les candidats non définis

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="text-center mb-8">
        <Image
          src="/assets/poduim.jpeg"
          alt="Podium"
          width={120}
          height={80}
          className="mx-auto mb-4 rounded-lg"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Podium des résultats</h3>
        <p className="text-gray-600">{"Les 3 premiers candidats de l'élection"}</p>
      </div>

      {podiumOrder.length > 0 ? (
        <div className="flex items-end justify-center space-x-4 mb-8">
          {podiumOrder.map((candidat, displayIndex) => {
            if (!candidat) return null;
            
            // Position réelle basée sur les votes (0=1er, 1=2ème, 2=3ème)
            const realPosition = top3.findIndex(c => c === candidat);
            const percentage = calculatePercentage(candidat.nombreVotes || 0, totalVotes);
            
            return (
              <motion.div
                key={candidat.candidatId || displayIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: displayIndex * 0.2 
                }}
                className="flex flex-col items-center"
              >
                {/* Candidat info */}
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    {getPodiumIcon(realPosition)}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm max-w-20 truncate">
                    {candidat.candidatNom || `Candidat ${realPosition + 1}`}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {candidat.nombreVotes || 0} votes
                  </p>
                  <p className="text-xs font-medium text-gray-800">
                    {percentage}%
                  </p>
                </div>
                
                {/* Marche du podium */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ 
                    duration: 0.8, 
                    delay: displayIndex * 0.2 + 0.3 
                  }}
                  className={`
                    w-20 ${getPodiumHeight(realPosition)} ${getPodiumColor(realPosition)} 
                    rounded-t-lg border-2 border-gray-300 
                    flex items-center justify-center relative
                  `}
                >
                  <div className="absolute top-2 text-white font-bold text-lg">
                    {realPosition + 1}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Aucun résultat à afficher sur le podium</p>
        </div>
      )}
    </div>
  );
}