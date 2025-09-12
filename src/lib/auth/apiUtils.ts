/**
 * Utilitaires pour gérer les tokens d'authentification dans les appels API
 */

import { AuthResponse } from '@/lib';

const USER_STORAGE_KEY = 'civix_user';

/**
 * Récupère le token d'autorisation depuis le localStorage
 */
export const getAuthorizationToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (!userJson) return null;
  
  try {
    const user: AuthResponse = JSON.parse(userJson);
    return user.token ? `Bearer ${user.token}` : null;
  } catch {
    return null;
  }
};

/**
 * Vérifie si l'utilisateur est authentifié et retourne le token
 */
export const getAuthHeader = (): string => {
  const token = getAuthorizationToken();
  return token || '';
};

/**
 * Stocke les informations d'authentification
 */
export const storeAuthInfo = (authResponse: AuthResponse): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authResponse));
  }
};

/**
 * Supprime les informations d'authentification
 */
export const clearAuthInfo = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};