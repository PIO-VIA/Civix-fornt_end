/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampagneAvecCandidatDTO } from './CampagneAvecCandidatDTO';
import type { CandidatAvecVotesDTO } from './CandidatAvecVotesDTO';
import type { StatistiquesCandidatDTO } from './StatistiquesCandidatDTO';
export type DecouverteDTO = {
    candidatsActifs?: Array<StatistiquesCandidatDTO>;
    campagnesEnVedette?: Array<CampagneAvecCandidatDTO>;
    candidatsEnProgression?: Array<CandidatAvecVotesDTO>;
    conseilDuJour?: string;
    motsClesPopulaires?: Array<string>;
};

