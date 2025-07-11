/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyseDemographiqueDTO } from './AnalyseDemographiqueDTO';
import type { ComparaisonObjectifsDTO } from './ComparaisonObjectifsDTO';
import type { MetadonneesRapportDTO } from './MetadonneesRapportDTO';
import type { VoteTemporelDTO } from './VoteTemporelDTO';
export type RapportParticipationDTO = {
    metadonnees?: MetadonneesRapportDTO;
    tauxParticipationGlobal?: number;
    nombreElecteursInscrits?: number;
    nombreVotants?: number;
    analyseDemographique?: AnalyseDemographiqueDTO;
    evolutionTemporelle?: Array<VoteTemporelDTO>;
    comparaisonObjectifs?: ComparaisonObjectifsDTO;
    facteurstParticipation?: Array<string>;
    recommendations?: Array<string>;
};

