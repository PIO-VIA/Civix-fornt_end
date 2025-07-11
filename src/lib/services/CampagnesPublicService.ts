/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampagneAvecCandidatDTO } from '../models/CampagneAvecCandidatDTO';
import type { CampagneDetailDTO } from '../models/CampagneDetailDTO';
import type { CampagneDTO } from '../models/CampagneDTO';
import type { HealthCheckDTO } from '../models/HealthCheckDTO';
import type { RepartitionCampagnesDTO } from '../models/RepartitionCampagnesDTO';
import type { StatistiquesCampagnesDTO } from '../models/StatistiquesCampagnesDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CampagnesPublicService {
    /**
     * Liste des campagnes
     * Obtenir la liste de toutes les campagnes (accès public)
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static listerToutesCampagnes(): CancelablePromise<Array<CampagneDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes',
        });
    }
    /**
     * Détails campagne
     * Obtenir les détails d'une campagne spécifique
     * @param campagneId
     * @returns CampagneDetailDTO OK
     * @throws ApiError
     */
    public static obtenirCampagne(
        campagneId: string,
    ): CancelablePromise<CampagneDetailDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/{campagneId}',
            path: {
                'campagneId': campagneId,
            },
        });
    }
    /**
     * Campagnes tendance
     * Obtenir les campagnes les plus récentes ou populaires
     * @param limite
     * @returns CampagneAvecCandidatDTO OK
     * @throws ApiError
     */
    public static obtenirCampagnesTendance(
        limite: number = 5,
    ): CancelablePromise<Array<CampagneAvecCandidatDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/tendance',
            query: {
                'limite': limite,
            },
        });
    }
    /**
     * Statistiques campagnes
     * Obtenir les statistiques globales des campagnes
     * @returns StatistiquesCampagnesDTO OK
     * @throws ApiError
     */
    public static obtenirStatistiques2(): CancelablePromise<StatistiquesCampagnesDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/statistiques',
        });
    }
    /**
     * Répartition campagnes
     * Obtenir la répartition détaillée des campagnes par candidat
     * @returns RepartitionCampagnesDTO OK
     * @throws ApiError
     */
    public static obtenirRepartition(): CancelablePromise<Array<RepartitionCampagnesDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/repartition',
        });
    }
    /**
     * Recherche campagnes
     * Rechercher des campagnes par mot-clé dans la description ou nom candidat
     * @param motCle
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static rechercherCampagnes(
        motCle?: string,
    ): CancelablePromise<Array<CampagneDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/recherche',
            query: {
                'motCle': motCle,
            },
        });
    }
    /**
     * Campagnes par candidat
     * Obtenir les campagnes regroupées par candidat
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static obtenirCampagnesParCandidat(): CancelablePromise<Record<string, Array<CampagneDTO>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/par-candidat',
        });
    }
    /**
     * Health check
     * Vérifier la santé du service campagnes
     * @returns HealthCheckDTO OK
     * @throws ApiError
     */
    public static healthCheck2(): CancelablePromise<HealthCheckDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/health',
        });
    }
    /**
     * Filtrer par longueur
     * Filtrer campagnes par longueur de description
     * @param minLongueur
     * @param maxLongueur
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static filtrerParLongueurDescription(
        minLongueur?: number,
        maxLongueur: number = 10000,
    ): CancelablePromise<Array<CampagneDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/filtre/par-longueur',
            query: {
                'minLongueur': minLongueur,
                'maxLongueur': maxLongueur,
            },
        });
    }
    /**
     * Export simple
     * Exporter les campagnes en format texte simple
     * @returns string OK
     * @throws ApiError
     */
    public static exporterCampagnesSimple(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/export/simple',
        });
    }
    /**
     * Campagnes d'un candidat
     * Obtenir toutes les campagnes d'un candidat spécifique
     * @param candidatId
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static obtenirCampagnesCandidat1(
        candidatId: string,
    ): CancelablePromise<Array<CampagneDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/candidat/{candidatId}',
            path: {
                'candidatId': candidatId,
            },
        });
    }
    /**
     * Campagnes avec photos
     * Obtenir uniquement les campagnes qui ont des photos
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static obtenirCampagnesAvecPhotos(): CancelablePromise<Array<CampagneDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/avec-photos',
        });
    }
    /**
     * Campagnes avec candidats
     * Obtenir toutes les campagnes avec les informations des candidats
     * @returns CampagneAvecCandidatDTO OK
     * @throws ApiError
     */
    public static obtenirCampagnesAvecCandidats(): CancelablePromise<Array<CampagneAvecCandidatDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/avec-candidats',
        });
    }
    /**
     * Campagne aléatoire
     * Obtenir une campagne choisie aléatoirement
     * @returns CampagneAvecCandidatDTO OK
     * @throws ApiError
     */
    public static obtenirCampagneAleatoire(): CancelablePromise<CampagneAvecCandidatDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/campagnes/aleatoire',
        });
    }
}
