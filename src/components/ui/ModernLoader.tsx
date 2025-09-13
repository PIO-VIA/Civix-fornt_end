'use client';

import { motion } from 'framer-motion';

interface ModernLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TopLoadingBar() {
  return (
    <div className="fixed top-16 left-0 w-full z-50">
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
        initial={{ width: 0 }}
        animate={{ width: ['0%', '100%'] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

export function ModernLoader({ message }: ModernLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <TopLoadingBar />
      
      {message && (
        <motion.p 
          className="text-gray-600 text-center max-w-xs mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// Variante avec animation de pulsation et particules
export function ParticleLoader({ message, size = 'md' }: ModernLoaderProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20', 
    lg: 'w-32 h-32'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Cercle principal avec pulsation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Particules qui tournent autour */}
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos(index * 60 * Math.PI / 180) * 40],
              y: [0, Math.sin(index * 60 * Math.PI / 180) * 40],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Logo ou icône au centre */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: [0, -360] }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-6 h-6 bg-white rounded-full shadow-lg" />
        </motion.div>
      </div>

      {message && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-700 font-medium">{message}</p>
          <motion.div 
            className="mt-2 flex justify-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={`dot-${index}`}
                className="w-1 h-1 bg-gray-400 rounded-full"
                animate={{ 
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}