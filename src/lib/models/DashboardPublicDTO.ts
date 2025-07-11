/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampagneAvecCandidatDTO } from './CampagneAvecCandidatDTO';
import type { ProgressionParticipationDTO } from './ProgressionParticipationDTO';
import type { ResultatVoteDTO } from './ResultatVoteDTO';
import type { StatistiquesCampagnesDTO } from './StatistiquesCampagnesDTO';
import type { StatistiquesVoteDTO } from './StatistiquesVoteDTO';
import type { VoteTemporelDTO } from './VoteTemporelDTO';
export type DashboardPublicDTO = {
    statistiquesGenerales?: StatistiquesVoteDTO;
    topCandidats?: Array<ResultatVoteDTO>;
    tendancesVotes?: Array<VoteTemporelDTO>;
    statistiquesCampagnes?: StatistiquesCampagnesDTO;
    campagnesEnVedette?: Array<CampagneAvecCandidatDTO>;
    progressionParticipation?: ProgressionParticipationDTO;
    messagePublic?: string;
    derniereMiseAJour?: string;
    prochaineMiseAJour?: string;
};

