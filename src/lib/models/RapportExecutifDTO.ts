/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyseRisquesOpportunitesDTO } from './AnalyseRisquesOpportunitesDTO';
import type { IndicateursClesToDTO } from './IndicateursClesToDTO';
import type { MetadonneesRapportDTO } from './MetadonneesRapportDTO';
import type { ResultatVoteDTO } from './ResultatVoteDTO';
import type { SyntheseExecutiveDTO } from './SyntheseExecutiveDTO';
export type RapportExecutifDTO = {
    metadonnees?: MetadonneesRapportDTO;
    syntheseExecutive?: SyntheseExecutiveDTO;
    indicateursClesToutes?: IndicateursClesToDTO;
    principauxResultats?: Array<ResultatVoteDTO>;
    risquesOpportunites?: AnalyseRisquesOpportunitesDTO;
    recommandationsStrategiques?: Array<string>;
    prochainesEtapes?: Array<string>;
};

