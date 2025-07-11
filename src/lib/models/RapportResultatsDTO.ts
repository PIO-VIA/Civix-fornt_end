/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyseResultatsDTO } from './AnalyseResultatsDTO';
import type { MetadonneesRapportDTO } from './MetadonneesRapportDTO';
import type { ResultatVoteDTO } from './ResultatVoteDTO';
import type { StatistiquesVoteDTO } from './StatistiquesVoteDTO';
import type { VoteTemporelDTO } from './VoteTemporelDTO';
export type RapportResultatsDTO = {
    metadonnees?: MetadonneesRapportDTO;
    resumeExecutif?: string;
    resultatsDetailles?: Array<ResultatVoteDTO>;
    statistiquesGlobales?: StatistiquesVoteDTO;
    analyseTemporelle?: Array<VoteTemporelDTO>;
    analysesApprofondies?: AnalyseResultatsDTO;
    conclusions?: Array<string>;
};

