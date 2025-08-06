import axios from 'axios';
import { OpenAPI } from '../core/OpenAPI';

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

// Intercepteur pour ajouter le token JWT
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('civix-token='))
      ?.split('=')[1];
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      OpenAPI.TOKEN = token;
    }
  }
  return config;
});

// Intercepteur pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré, rediriger vers login
      if (typeof window !== 'undefined') {
        document.cookie = 'civix-token=; Max-Age=0; path=/';
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);