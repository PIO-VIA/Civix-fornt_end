'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, getToken, isAuthenticated } from '@/lib/auth/auth';
import { setApiToken } from '@/lib/api/client';
import type { AuthUser } from '@/lib/auth/auth';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  refreshAuth: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = () => {
    const currentUser = getUser();
    const token = getToken();
    
    setUser(currentUser);
    setApiToken(token);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: isAuthenticated(),
    isLoading,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}