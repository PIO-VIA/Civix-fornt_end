/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionRecenteDTO } from './ActionRecenteDTO';
import type { AlerteDTO } from './AlerteDTO';
import type { MetriquesPerformanceDTO } from './MetriquesPerformanceDTO';
import type { ResultatVoteDTO } from './ResultatVoteDTO';
import type { StatistiquesAdminDTO } from './StatistiquesAdminDTO';
import type { StatistiquesCampagnesDTO } from './StatistiquesCampagnesDTO';
import type { StatistiquesCandidatDTO } from './StatistiquesCandidatDTO';
import type { VoteTemporelDTO } from './VoteTemporelDTO';
export type DashboardAdminDTO = {
    statistiquesAdmin?: StatistiquesAdminDTO;
    resultatsDetailles?: Array<ResultatVoteDTO>;
    analyseTemporelle?: Array<VoteTemporelDTO>;
    statistiquesCandidats?: Array<StatistiquesCandidatDTO>;
    statistiquesCampagnes?: StatistiquesCampagnesDTO;
    alertes?: Array<AlerteDTO>;
    metriquesPerformance?: MetriquesPerformanceDTO;
    actionsRecentes?: Array<ActionRecenteDTO>;
    resumeExecutif?: string;
    derniereMiseAJour?: string;
};

