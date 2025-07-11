/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResultatVoteDTO } from './ResultatVoteDTO';
import type { StatistiquesGeneralesDTO } from './StatistiquesGeneralesDTO';
export type AccueilDTO = {
    titre?: string;
    description?: string;
    statistiquesGenerales?: StatistiquesGeneralesDTO;
    topCandidats?: Array<ResultatVoteDTO>;
    messageActualite?: string;
    horodatage?: string;
    versionPlateforme?: string;
};

