/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DashboardAdminDTO } from '../models/DashboardAdminDTO';
import type { DashboardElecteurDTO } from '../models/DashboardElecteurDTO';
import type { DashboardPublicDTO } from '../models/DashboardPublicDTO';
import type { WidgetPodiumDTO } from '../models/WidgetPodiumDTO';
import type { WidgetProgressionDTO } from '../models/WidgetProgressionDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TableauxDeBordService {
    /**
     * Widget progression
     * Widget de progression du vote en temps réel
     * @returns WidgetProgressionDTO OK
     * @throws ApiError
     */
    public static obtenirWidgetProgression(): CancelablePromise<WidgetProgressionDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/widget/progression',
        });
    }
    /**
     * Widget podium
     * Widget podium des 3 premiers candidats
     * @returns WidgetPodiumDTO OK
     * @throws ApiError
     */
    public static obtenirWidgetPodium(): CancelablePromise<WidgetPodiumDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/widget/podium',
        });
    }
    /**
     * Dashboard public
     * Tableau de bord public accessible à tous
     * @returns DashboardPublicDTO OK
     * @throws ApiError
     */
    public static obtenirDashboardPublic(): CancelablePromise<DashboardPublicDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/public',
        });
    }
    /**
     * Dashboard électeur
     * Tableau de bord complet pour l'électeur connecté
     * @param authorization
     * @returns DashboardElecteurDTO OK
     * @throws ApiError
     */
    public static obtenirDashboardElecteur(
        authorization: string,
    ): CancelablePromise<DashboardElecteurDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/electeur',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Dashboard admin
     * Tableau de bord complet pour l'administrateur
     * @param authorization
     * @returns DashboardAdminDTO OK
     * @throws ApiError
     */
    public static obtenirDashboardAdmin(
        authorization: string,
    ): CancelablePromise<DashboardAdminDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/dashboard/admin',
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
