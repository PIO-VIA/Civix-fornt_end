/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationInfoDTO } from './ApplicationInfoDTO';
import type { DependencyDTO } from './DependencyDTO';
import type { EnvironnementDTO } from './EnvironnementDTO';
export type SystemInfoDTO = {
    application?: ApplicationInfoDTO;
    environnement?: EnvironnementDTO;
    dependencies?: Array<DependencyDTO>;
    configuration?: Record<string, any>;
    timestamp?: string;
};

