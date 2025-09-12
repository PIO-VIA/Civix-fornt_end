/**
 * Services authentifiés qui incluent automatiquement le token d'autorisation
 */

import { 
  LecteurService, 
  ElectionsService,
  VoteService,
  AuthentificationService,
  ChangePasswordRequest,
  VoterElectionRequest
} from '@/lib';
import { getAuthHeader } from './apiUtils';

/**
 * Service LecteurService avec authentification automatique
 */
export const AuthenticatedLecteurService = {
  async obtenirMonProfil() {
    const authToken = getAuthHeader();
    return LecteurService.obtenirMonProfil(authToken);
  },

  async changerMotDePasse(request: ChangePasswordRequest) {
    const authToken = getAuthHeader();
    return LecteurService.changerMotDePasse(request, authToken);
  },

  async obtenirNotifications() {
    const authToken = getAuthHeader();
    return LecteurService.obtenirNotifications(authToken);
  },

  async obtenirHistoriqueActivite() {
    const authToken = getAuthHeader();
    return LecteurService.obtenirHistorique(authToken);
  },

  async obtenirTableauDeBord() {
    const authToken = getAuthHeader();
    return LecteurService.obtenirTableauBord(authToken);
  },

  async consulterResultats() {
    const authToken = getAuthHeader();
    return LecteurService.consulterResultats1(authToken);
  },

  async obtenirAide() {
    return LecteurService.obtenirAide();
  },

  async consulterCandidats() {
    const authToken = getAuthHeader();
    return LecteurService.consulterCandidats(authToken);
  },

  async consulterCampagnesCandidat(candidatId: string) {
    const authToken = getAuthHeader();
    return LecteurService.consulterCampagnesCandidat(candidatId, authToken);
  }
};

/**
 * Service ElectionsService avec authentification automatique
 */
export const AuthenticatedElectionsService = {
  async voterPourElection(electionId: string, request: VoterElectionRequest) {
    const authToken = getAuthHeader();
    return ElectionsService.voterPourElection(authToken, electionId, request);
  },

  async listerElectionsDisponibles() {
    const authToken = getAuthHeader();
    return ElectionsService.listerElectionsDisponibles(authToken);
  },

  // Les méthodes publiques restent inchangées
  listerToutesElections: ElectionsService.listerToutesElections,
  obtenirElection1: ElectionsService.obtenirElection1,
  obtenirResultatsElection: ElectionsService.obtenirResultatsElection
};

/**
 * Service VoteService avec authentification automatique
 */
export const AuthenticatedVoteService = {
  async previsualiserVote(candidatId: string) {
    const authToken = getAuthHeader();
    return VoteService.previsualiserVote(authToken, candidatId);
  },

  async effectuerVote(candidatId: string) {
    const authToken = getAuthHeader();
    return VoteService.effectuerVote(authToken, candidatId);
  },

  async obtenirStatutVote() {
    const authToken = getAuthHeader();
    return VoteService.obtenirStatutVote(authToken);
  },

  async verifierPeutVoter() {
    const authToken = getAuthHeader();
    return VoteService.verifierPeutVoter(authToken);
  }
};

/**
 * Service AuthentificationService avec authentification automatique
 */
export const AuthenticatedAuthentificationService = {
  async changerMotDePasseElecteur(request: ChangePasswordRequest) {
    const authToken = getAuthHeader();
    return AuthentificationService.changerMotDePasseElecteur(authToken, request);
  },

  async getSessionElecteur() {
    const authToken = getAuthHeader();
    return AuthentificationService.getSessionElecteur(authToken);
  },

  async verifierTokenElecteur() {
    const authToken = getAuthHeader();
    return AuthentificationService.verifierTokenElecteur(authToken);
  },

  // Les méthodes publiques restent inchangées
  loginElecteur: AuthentificationService.loginElecteur,
  logout: AuthentificationService.logout
};