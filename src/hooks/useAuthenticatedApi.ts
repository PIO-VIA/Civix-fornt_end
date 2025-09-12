/**
 * Hook pour utiliser les services API authentifiés
 */

import { 
  AuthenticatedLecteurService, 
  AuthenticatedElectionsService,
  AuthenticatedVoteService,
  AuthenticatedAuthentificationService 
} from '@/lib/auth/authenticatedServices';

export const useAuthenticatedApi = () => {
  return {
    lecteur: AuthenticatedLecteurService,
    elections: AuthenticatedElectionsService,
    vote: AuthenticatedVoteService,
    auth: AuthenticatedAuthentificationService,
  };
};