/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RapportCampagnesDTO } from '../models/RapportCampagnesDTO';
import type { RapportCandidatsDTO } from '../models/RapportCandidatsDTO';
import type { RapportExecutifDTO } from '../models/RapportExecutifDTO';
import type { RapportParticipationDTO } from '../models/RapportParticipationDTO';
import type { RapportResultatsDTO } from '../models/RapportResultatsDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RapportsService {
    /**
     * Rapport résultats complets
     * Générer un rapport complet des résultats de l'élection
     * @param authorization
     * @returns RapportResultatsDTO OK
     * @throws ApiError
     */
    public static genererRapportResultats(
        authorization: string,
    ): CancelablePromise<RapportResultatsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reports/resultats-complets',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Rapport participation
     * Rapport détaillé sur la participation électorale
     * @param authorization
     * @returns RapportParticipationDTO OK
     * @throws ApiError
     */
    public static genererRapportParticipation(
        authorization: string,
    ): CancelablePromise<RapportParticipationDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reports/participation',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Export CSV
     * Exporter un rapport au format CSV
     * @param authorization
     * @param typeRapport
     * @returns string OK
     * @throws ApiError
     */
    public static exporterRapportCsv(
        authorization: string,
        typeRapport: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reports/export/csv/{typeRapport}',
            path: {
                'typeRapport': typeRapport,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Rapport exécutif
     * Rapport consolidé pour la direction
     * @param authorization
     * @returns RapportExecutifDTO OK
     * @throws ApiError
     */
    public static genererRapportExecutif(
        authorization: string,
    ): CancelablePromise<RapportExecutifDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reports/executif',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Rapport candidats
     * Analyse complète des candidats et leurs performances
     * @param authorization
     * @returns RapportCandidatsDTO OK
     * @throws ApiError
     */
    public static genererRapportCandidats(
        authorization: string,
    ): CancelablePromise<RapportCandidatsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reports/candidats',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Rapport campagnes
     * Analyse de l'efficacité des campagnes électorales
     * @param authorization
     * @returns RapportCampagnesDTO OK
     * @throws ApiError
     */
    public static genererRapportCampagnes(
        authorization: string,
    ): CancelablePromise<RapportCampagnesDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/reports/campagnes',
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
