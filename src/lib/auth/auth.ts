import { AuthentificationService } from '../services/AuthentificationService';
import type { LoginRequest, AuthResponse } from '../models';

export interface AuthUser {
  externalIdElecteur: string;
  username: string;
  email: string;
  mustChangePassword?: boolean;
}

// Clé pour le localStorage
const TOKEN_KEY = 'civix-token';
const USER_KEY = 'civix-user';

export async function login(credentials: LoginRequest): Promise<{
  success: boolean;
  user?: AuthUser;
  mustChangePassword?: boolean;
  error?: string;
}> {
  try {
    const response = await AuthentificationService.loginElecteur(credentials);
    
    if (response.token && response.electeur) {
      // Stocker le token et les informations utilisateur dans localStorage
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.electeur));

      return {
        success: true,
        user: response.electeur,
        mustChangePassword: response.mustChangePassword || false
      };
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return {
      success: false,
      error: 'Identifiants invalides'
    };
  }

  return {
    success: false,
    error: 'Erreur de connexion'
  };
}

export async function logout(): Promise<void> {
  try {
    await AuthentificationService.logout();
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
  } finally {
    // Nettoyer le localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Erreur parsing user data:', error);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getToken() !== null && getUser() !== null;
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}