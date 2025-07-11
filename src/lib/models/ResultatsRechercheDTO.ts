/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampagneDTO } from './CampagneDTO';
import type { CandidatDTO } from './CandidatDTO';
export type ResultatsRechercheDTO = {
    termeRecherche?: string;
    candidatsTrouves?: Array<CandidatDTO>;
    campagnesTrouvees?: Array<CampagneDTO>;
    nombreTotal?: number;
    suggestions?: Array<string>;
    horodatage?: string;
};

