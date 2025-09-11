
import axios from 'axios';
import { OpenAPI } from '@/lib/core/OpenAPI';

// Configure l'URL de base de l'API 
OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Temporairement désactivé pour debug - réactiver après résolution du problème CORS
OpenAPI.WITH_CREDENTIALS = false;
OpenAPI.CREDENTIALS = 'omit';

// Configuration axios globale pour le développement
if (typeof window !== 'undefined') {
  // Configuration des intercepteurs pour le debug
  axios.interceptors.request.use(
    (config) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          baseURL: config.baseURL,
          withCredentials: config.withCredentials,
          headers: config.headers
        });
      }
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ API Response:', {
          status: response.status,
          statusText: response.statusText,
          url: response.config.url,
          data: response.data
        });
      }
      return response;
    },
    (error) => {
      console.error('❌ API Error:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      return Promise.reject(error);
    }
  );

  // Configuration pour le développement local
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 API Configuration:', {
      BASE: OpenAPI.BASE,
      WITH_CREDENTIALS: OpenAPI.WITH_CREDENTIALS,
      CREDENTIALS: OpenAPI.CREDENTIALS
    });
  }
}

/**
 * Fonction pour définir un token JWT manuellement si nécessaire.
 * Actuellement, nous nous appuyons sur les cookies httpOnly, donc cette fonction
 * n'est pas utilisée pour le moment mais reste disponible.
 * @param token Le token JWT
 */
export const setApiToken = (token: string | null) => {
  if (token) {
    OpenAPI.TOKEN = token;
  } else {
    OpenAPI.TOKEN = undefined;
  }
};
