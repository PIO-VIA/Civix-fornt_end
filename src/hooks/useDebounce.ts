'use client';

import { useEffect, useMemo, useRef } from 'react';

// Définition d'un type pour la fonction de rappel déboncée
type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

/**
 * Hook personnalisé pour déboncer une fonction de rappel.
 * @param callback La fonction à déboncer.
 * @param delay Le délai en millisecondes.
 * @returns Une version déboncée de la fonction de rappel.
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): DebouncedFunction<T> {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Met à jour la référence du callback si la fonction change
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Nettoie le timeout lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Retourne la fonction mémoïsée qui gère le décalage
  const debouncedCallback = useMemo(() => {
    return (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    };
  }, [delay]);

  return debouncedCallback;
}
