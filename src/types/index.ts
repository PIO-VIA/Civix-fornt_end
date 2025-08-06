// Ré-export de tous les types existants pour plus de clarté
export type { ElecteurDTO } from '../lib/models/ElecteurDTO';
export type { CandidatDTO } from '../lib/models/CandidatDTO';
export type { CampagneDTO } from '../lib/models/CampagneDTO';
export type { ElectionDTO } from '../lib/models/ElectionDTO';
export type { VoteResponse } from '../lib/models/VoteResponse';
export type { AuthResponse } from '../lib/models/AuthResponse';
export type { LoginRequest } from '../lib/models/LoginRequest';
export type { ChangePasswordRequest } from '../lib/models/ChangePasswordRequest';
export type { ResultatsElectionDTO } from '../lib/models/ResultatsElectionDTO';
export type { DashboardElecteurDTO } from '../lib/models/DashboardElecteurDTO';
export type { CandidatDetailDTO } from '../lib/models/CandidatDetailDTO';
export type { CampagneDetailDTO } from '../lib/models/CampagneDetailDTO';

// Types utilitaires pour l'interface
export interface PageProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface LayoutProps {
  children: React.ReactNode;
}

// Types pour les filtres et recherche
export interface ElectionFilters {
  statut?: string;
  dateDebut?: string;
  dateFin?: string;
  recherche?: string;
}

export interface CandidatFilters {
  recherche?: string;
  campagne?: string;
}

export interface CampagneFilters {
  recherche?: string;
  candidat?: string;
}