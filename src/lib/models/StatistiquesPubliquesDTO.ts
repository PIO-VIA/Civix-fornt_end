/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetadonneesDTO } from './MetadonneesDTO';
import type { StatistiquesCampagnesDTO } from './StatistiquesCampagnesDTO';
import type { StatistiquesCandidatDTO } from './StatistiquesCandidatDTO';
import type { StatistiquesVoteDTO } from './StatistiquesVoteDTO';
export type StatistiquesPubliquesDTO = {
    statistiquesVote?: StatistiquesVoteDTO;
    statistiquesCampagnes?: StatistiquesCampagnesDTO;
    statistiquesDetaillesCandidats?: Array<StatistiquesCandidatDTO>;
    metadonnees?: MetadonneesDTO;
};

