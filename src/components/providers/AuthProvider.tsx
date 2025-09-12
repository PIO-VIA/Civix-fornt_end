
'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { login as apiLogin, logout as apiLogout, AuthUser } from '@/lib/auth/auth';
import { LoginRequest } from '@/lib';
import { AuthenticatedLecteurService } from '@/lib/auth/authenticatedServices';
import { useRouter } from 'next/navigation';

// Initialise la configuration de l'API client
import '@/lib/api/client';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Vérifie la session au chargement de l'application
  const verifySession = useCallback(async () => {
    setIsLoading(true);
    try {
      // Tente de récupérer le profil de l'électeur depuis le serveur
      // Le token sera automatiquement inclus via AuthenticatedLecteurService
      const currentUser = await AuthenticatedLecteurService.obtenirMonProfil();
      setUser(currentUser);
    } catch {
      // Si l'appel échoue (ex: 401), l'utilisateur n'est pas connecté
      setUser(null);
      // Nettoie également le localStorage
      localStorage.removeItem('civix_user');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = async (credentials: LoginRequest) => {
    const loggedInUser = await apiLogin(credentials);
    setUser(loggedInUser);
    // Redirige vers la page de profil après connexion réussie
    router.push('/profil');
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    // Redirige vers la page de connexion après déconnexion
    router.push('/login');
  };

  const isAuthenticated = !!user;

  // Pendant le chargement initial, on peut choisir de ne rien afficher ou un loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, refreshAuth: verifySession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
