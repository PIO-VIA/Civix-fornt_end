"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthentificationService } from '@/lib/services/AuthentificationService';
import { AuthResponse } from '@/lib/models/AuthResponse';
import { SessionInfoDTO } from '@/lib/models/SessionInfoDTO';
import { LoginRequest } from '@/lib/models/LoginRequest';

export type UserRole = 'electeur' | 'admin' | 'administrateur' | 'lecteur';

interface AuthUser {
  userId: string;
  username: string;
  email: string;
  role: UserRole;
  avote?: boolean;
  premierConnexion?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest, role: 'electeur' | 'admin') => Promise<AuthResponse>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialisation au chargement de l'app
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedRole = localStorage.getItem('userRole') as UserRole;
      
      if (storedToken && storedRole) {
        setToken(storedToken);
        await verifyAndLoadSession(storedToken, storedRole);
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'auth:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAndLoadSession = async (authToken: string, role: UserRole) => {
    try {
      // Vérifier la validité du token
      let isValid = false;
      let sessionInfo: SessionInfoDTO;

      if (role === 'electeur') {
        isValid = await AuthentificationService.verifierTokenElecteur(`Bearer ${authToken}`);
        sessionInfo = await AuthentificationService.getSessionElecteur(`Bearer ${authToken}`);
      } else if (role === 'admin' || role === 'administrateur') {
        isValid = await AuthentificationService.verifierTokenAdmin(`Bearer ${authToken}`);
        sessionInfo = await AuthentificationService.getSessionAdmin(`Bearer ${authToken}`);
      } else {
        throw new Error('Rôle non supporté');
      }

      if (isValid && sessionInfo.tokenValide) {
        // Le backend ne renvoie pas le role dans sessionInfo non plus, on utilise celui stocké
        const userData = {
          userId: sessionInfo.userId || '',
          username: sessionInfo.username || '',
          email: sessionInfo.email || '',
          role: role, // Utiliser le rôle passé en paramètre (stocké localement)
          avote: sessionInfo.avote
        };
        setUser(userData);
      } else {
        throw new Error('Token invalide');
      }
    } catch (error) {
      console.error('Erreur vérification session:', error);
      clearAuth();
      throw error;
    }
  };

  const login = async (credentials: LoginRequest, role: 'electeur' | 'admin'): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      
      let response: AuthResponse;
      
      if (role === 'electeur') {
        response = await AuthentificationService.loginElecteur(credentials);
      } else {
        response = await AuthentificationService.loginAdministrateur(credentials);
      }

      if (response.token) {
        // Le backend ne renvoie pas le role, on utilise celui sélectionné par l'utilisateur
        const userRole = role; // Utiliser directement le rôle sélectionné
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', userRole);
        
        setToken(response.token);
        const userData = {
          userId: response.userId || '',
          username: response.username || '',
          email: response.email || '',
          role: userRole as UserRole,
          avote: response.avote,
          premierConnexion: response.premierConnexion
        };
        
        setUser(userData);

        return response;
      } else {
        throw new Error('Aucun token reçu');
      }
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Appeler l'API de déconnexion si possible
      if (token) {
        await AuthentificationService.logout();
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      clearAuth();
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUser(null);
  };

  const refreshSession = async () => {
    if (!token || !user) return;
    
    try {
      await verifyAndLoadSession(token, user.role);
    } catch (error) {
      console.error('Erreur lors du rafraîchissement de la session:', error);
      clearAuth();
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshSession,
    hasRole
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};