/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResultatCandidatDTO } from './ResultatCandidatDTO';
export type ResultatsElectionDTO = {
    electionId?: string;
    electionTitre?: string;
    totalVotes?: number;
    totalElecteursAutorises?: number;
    tauxParticipation?: number;
    resultatsParCandidat?: Array<ResultatCandidatDTO>;
    dateCalcul?: string;
};

