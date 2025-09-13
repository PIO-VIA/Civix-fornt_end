'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, UserX } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export function AlertModal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'error' 
}: AlertModalProps) {
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <UserX className="w-12 h-12 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
      case 'info':
        return <AlertTriangle className="w-12 h-12 text-blue-500" />;
      default:
        return <UserX className="w-12 h-12 text-red-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        };
      default:
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`
                bg-white rounded-lg shadow-xl max-w-md w-full mx-4
                ${colors.border} border-2 ${colors.bg}
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center">
                  {getIcon()}
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
                <button
                  onClick={onClose}
                  className={`
                    px-4 py-2 text-white font-medium rounded-md 
                    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${colors.button}
                  `}
                >
                  Compris
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}