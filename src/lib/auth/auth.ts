
import { AuthentificationService, LoginRequest, AuthResponse, ElecteurDTO } from '@/lib';

// Le type pour l'utilisateur authentifié, basé sur ElecteurDTO
export type AuthUser = ElecteurDTO;

const USER_STORAGE_KEY = 'civix_user';

/**
 * Appelle l'API pour connecter l'utilisateur.
 * En cas de succès, stocke les informations de l'utilisateur dans le localStorage.
 * Le token JWT est géré par un cookie httpOnly défini par le serveur.
 */
export const login = async (credentials: LoginRequest): Promise<AuthUser> => {
  const authResponse: AuthResponse = await AuthentificationService.postApiAuthLogin(credentials);
  
  // Nous supposons que AuthResponse contient les détails de l'électeur
  const user = authResponse.electeur;

  if (!user) {
    throw new Error("Les données de l'électeur ne sont pas présentes dans la réponse d'authentification.");
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  return user;
};

/**
 * Déconnecte l'utilisateur en appelant l'API et en nettoyant le localStorage.
 */
export const logout = async () => {
  try {
    // Appelle l'endpoint de déconnexion du backend (si disponible)
    await AuthentificationService.postApiAuthLogout();
  } catch (error) {
    console.warn("L'appel à l'API de déconnexion a échoué, mais la déconnexion côté client se poursuit.", error);
  } finally {
    // Supprime toujours les données utilisateur du localStorage
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};

/**
 * Récupère les données de l'utilisateur depuis le localStorage.
 */
export const getUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (error) {
    return null;
  }
};

/**
 * Vérifie si l'utilisateur est actuellement authentifié (basé sur la présence dans le localStorage).
 */
export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};
