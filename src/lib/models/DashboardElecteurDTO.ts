/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CandidatAvecStatutDTO } from './CandidatAvecStatutDTO';
import type { ElecteurProfilDTO } from './ElecteurProfilDTO';
import type { ResultatsPartielsDTO } from './ResultatsPartielsDTO';
import type { StatistiquesVoteDTO } from './StatistiquesVoteDTO';
import type { StatutVoteElecteurDTO } from './StatutVoteElecteurDTO';
export type DashboardElecteurDTO = {
    profil?: ElecteurProfilDTO;
    statutVote?: StatutVoteElecteurDTO;
    candidatsDisponibles?: Array<CandidatAvecStatutDTO>;
    resultatsPartiels?: ResultatsPartielsDTO;
    statistiquesGlobales?: StatistiquesVoteDTO;
    recommendations?: Array<string>;
    messageBienvenue?: string;
    derniereMiseAJour?: string;
};

