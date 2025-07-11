/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyseEfficaciteCampagnesDTO } from './AnalyseEfficaciteCampagnesDTO';
import type { MetadonneesRapportDTO } from './MetadonneesRapportDTO';
import type { RepartitionCampagnesDTO } from './RepartitionCampagnesDTO';
import type { StatistiquesCampagnesDTO } from './StatistiquesCampagnesDTO';
export type RapportCampagnesDTO = {
    metadonnees?: MetadonneesRapportDTO;
    statistiquesGlobales?: StatistiquesCampagnesDTO;
    repartitionParCandidat?: Array<RepartitionCampagnesDTO>;
    analyseEfficacite?: AnalyseEfficaciteCampagnesDTO;
    meilleuresPratiques?: Array<string>;
    recommandationsAmelioration?: Array<string>;
};

