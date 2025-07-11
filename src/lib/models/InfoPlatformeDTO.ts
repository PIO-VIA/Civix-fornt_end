/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SecuriteDTO } from './SecuriteDTO';
import type { SupportDTO } from './SupportDTO';
export type InfoPlatformeDTO = {
    nomPlateforme?: string;
    version?: string;
    description?: string;
    fonctionnalites?: Array<string>;
    technologies?: Array<string>;
    support?: SupportDTO;
    securite?: SecuriteDTO;
    dateMiseEnService?: string;
};

