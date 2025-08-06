import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { AuthentificationService } from '../services/AuthentificationService';
import type { LoginRequest } from '../models/LoginRequest';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

export interface AuthUser {
  externalIdElecteur: string;
  username: string;
  email: string;
  mustChangePassword?: boolean;
}

export async function login(credentials: LoginRequest) {
  try {
    const response = await AuthentificationService.loginElecteur(credentials);
    
    if (response.token && response.electeur) {
      // Stocker le token dans les cookies
      const cookieStore = await cookies();
      cookieStore.set('civix-token', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 heures
      });

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
}

export async function logout() {
  try {
    await AuthentificationService.logout();
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
  } finally {
    const cookieStore = await cookies();
    cookieStore.delete('civix-token');
  }
}

export async function getUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('civix-token')?.value;

    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as AuthUser;
  } catch (error) {
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getUser();
  
  if (!user) {
    throw new Error('Non authentifié');
  }
  
  return user;
}