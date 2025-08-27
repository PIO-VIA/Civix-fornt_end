
import { OpenAPI } from '@/lib/core/OpenAPI';

// Configure l'URL de base de l'API 
OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Active l'envoi des "credentials" (comme les cookies httpOnly) avec chaque requête
OpenAPI.WITH_CREDENTIALS = true;

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
