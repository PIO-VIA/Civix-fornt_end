/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyseConcurrenceDTO } from './AnalyseConcurrenceDTO';
import type { AnalysePerformanceDTO } from './AnalysePerformanceDTO';
import type { MetadonneesRapportDTO } from './MetadonneesRapportDTO';
import type { ResultatVoteDTO } from './ResultatVoteDTO';
import type { StatistiquesCandidatDTO } from './StatistiquesCandidatDTO';
export type RapportCandidatsDTO = {
    metadonnees?: MetadonneesRapportDTO;
    nombreTotalCandidats?: number;
    statistiquesIndividuelles?: Array<StatistiquesCandidatDTO>;
    classementGeneral?: Array<ResultatVoteDTO>;
    analyseConcurrence?: AnalyseConcurrenceDTO;
    analysePerformance?: AnalysePerformanceDTO;
    tendancesObservees?: Array<string>;
    profilsTypes?: Array<string>;
};

