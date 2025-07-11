/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccueilDTO } from '../models/AccueilDTO';
import type { ActualiteDTO } from '../models/ActualiteDTO';
import type { DecouverteDTO } from '../models/DecouverteDTO';
import type { InfoPlatformeDTO } from '../models/InfoPlatformeDTO';
import type { ResultatsRechercheDTO } from '../models/ResultatsRechercheDTO';
import type { ResultatsTempsReelDTO } from '../models/ResultatsTempsReelDTO';
import type { StatistiquesPubliquesDTO } from '../models/StatistiquesPubliquesDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PublicService {
    /**
     * Statistiques publiques
     * Obtenir toutes les statistiques publiques consolidées
     * @returns StatistiquesPubliquesDTO OK
     * @throws ApiError
     */
    public static obtenirStatistiquesPubliques(): CancelablePromise<StatistiquesPubliquesDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/statistiques',
        });
    }
    /**
     * Résultats temps réel
     * Obtenir les résultats actuels en temps réel
     * @returns ResultatsTempsReelDTO OK
     * @throws ApiError
     */
    public static obtenirResultatsTempsReel(): CancelablePromise<ResultatsTempsReelDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/resultats-temps-reel',
        });
    }
    /**
     * Recherche globale
     * Rechercher dans tous les contenus de la plateforme
     * @param terme
     * @returns ResultatsRechercheDTO OK
     * @throws ApiError
     */
    public static rechercheGlobale(
        terme: string,
    ): CancelablePromise<ResultatsRechercheDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/recherche',
            query: {
                'terme': terme,
            },
        });
    }
    /**
     * Informations plateforme
     * Obtenir les informations générales sur la plateforme
     * @returns InfoPlatformeDTO OK
     * @throws ApiError
     */
    public static obtenirInfoPlateforme(): CancelablePromise<InfoPlatformeDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/info',
        });
    }
    /**
     * Découverte candidats
     * Découvrir des candidats et leurs campagnes
     * @returns DecouverteDTO OK
     * @throws ApiError
     */
    public static obtenirDecouverte(): CancelablePromise<DecouverteDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/decouverte',
        });
    }
    /**
     * Actualités plateforme
     * Obtenir le flux d'actualités de la plateforme
     * @param limite
     * @returns ActualiteDTO OK
     * @throws ApiError
     */
    public static obtenirActualites(
        limite: number = 10,
    ): CancelablePromise<Array<ActualiteDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/actualites',
            query: {
                'limite': limite,
            },
        });
    }
    /**
     * Page d'accueil
     * Obtenir les informations d'accueil de la plateforme
     * @returns AccueilDTO OK
     * @throws ApiError
     */
    public static obtenirAccueil(): CancelablePromise<AccueilDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/accueil',
        });
    }
}
