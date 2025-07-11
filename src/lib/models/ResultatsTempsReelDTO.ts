/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResultatVoteDTO } from './ResultatVoteDTO';
import type { StatistiquesVoteDTO } from './StatistiquesVoteDTO';
import type { VoteTemporelDTO } from './VoteTemporelDTO';
export type ResultatsTempsReelDTO = {
    resultatsComplets?: Array<ResultatVoteDTO>;
    candidatEnTete?: ResultatVoteDTO;
    statistiquesGlobales?: StatistiquesVoteDTO;
    progressionVote?: Array<VoteTemporelDTO>;
    derniereMiseAJour?: string;
    prochaineMiseAJour?: string;
};

