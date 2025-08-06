import axios from 'axios';
import { OpenAPI } from '../core/OpenAPI';
import { getToken, clearAuth } from '../auth/auth';

// Configuration de l'API client
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configuration OpenAPI
OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Intercepteur pour ajouter le token JWT depuis localStorage
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    OpenAPI.TOKEN = token;
  }
  
  return config;
});

// Intercepteur pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide, nettoyer et rediriger
      if (typeof window !== 'undefined') {
        clearAuth();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Fonction utilitaire pour configurer le token OpenAPI
export function setApiToken(token: string | null) {
  if (token) {
    OpenAPI.TOKEN = token;
  } else {
    OpenAPI.TOKEN = undefined;
  }
}