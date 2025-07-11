/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampagneDTO } from '../models/CampagneDTO';
import type { CandidatAvecVotesDTO } from '../models/CandidatAvecVotesDTO';
import type { CandidatDetailDTO } from '../models/CandidatDetailDTO';
import type { CandidatDTO } from '../models/CandidatDTO';
import type { ComparaisonCandidatsDTO } from '../models/ComparaisonCandidatsDTO';
import type { HealthCheckDTO } from '../models/HealthCheckDTO';
import type { StatistiquesCandidatDTO } from '../models/StatistiquesCandidatDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CandidatsPublicService {
    /**
     * Liste des candidats
     * Obtenir la liste de tous les candidats (accès public)
     * @returns CandidatDTO OK
     * @throws ApiError
     */
    public static listerTousCandidats(): CancelablePromise<Array<CandidatDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats',
        });
    }
    /**
     * Détails candidat
     * Obtenir les détails d'un candidat spécifique
     * @param candidatId
     * @returns CandidatDetailDTO OK
     * @throws ApiError
     */
    public static obtenirCandidat(
        candidatId: string,
    ): CancelablePromise<CandidatDetailDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/{candidatId}',
            path: {
                'candidatId': candidatId,
            },
        });
    }
    /**
     * Campagnes du candidat
     * Obtenir toutes les campagnes d'un candidat
     * @param candidatId
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static obtenirCampagnesCandidat(
        candidatId: string,
    ): CancelablePromise<Array<CampagneDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/{candidatId}/campagnes',
            path: {
                'candidatId': candidatId,
            },
        });
    }
    /**
     * Statistiques candidats
     * Obtenir les statistiques détaillées de tous les candidats
     * @returns StatistiquesCandidatDTO OK
     * @throws ApiError
     */
    public static obtenirStatistiques1(): CancelablePromise<Array<StatistiquesCandidatDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/statistiques',
        });
    }
    /**
     * Recherche candidats
     * Rechercher des candidats par nom
     * @param nom
     * @returns CandidatDTO OK
     * @throws ApiError
     */
    public static rechercherCandidats(
        nom?: string,
    ): CancelablePromise<Array<CandidatDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/recherche',
            query: {
                'nom': nom,
            },
        });
    }
    /**
     * Health check
     * Vérifier la santé du service candidats
     * @returns HealthCheckDTO OK
     * @throws ApiError
     */
    public static healthCheck1(): CancelablePromise<HealthCheckDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/health',
        });
    }
    /**
     * Filtrer par votes
     * Filtrer candidats par tranche de votes
     * @param minVotes
     * @param maxVotes
     * @returns CandidatAvecVotesDTO OK
     * @throws ApiError
     */
    public static filtrerParVotes(
        minVotes?: number,
        maxVotes: number = 999999,
    ): CancelablePromise<Array<CandidatAvecVotesDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/filtre/par-votes',
            query: {
                'minVotes': minVotes,
                'maxVotes': maxVotes,
            },
        });
    }
    /**
     * Filtrer par campagnes
     * Filtrer candidats ayant un certain nombre de campagnes
     * @param minCampagnes
     * @returns CandidatDetailDTO OK
     * @throws ApiError
     */
    public static filtrerParNombreCampagnes(
        minCampagnes: number = 1,
    ): CancelablePromise<Array<CandidatDetailDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/filtre/par-campagnes',
            query: {
                'minCampagnes': minCampagnes,
            },
        });
    }
    /**
     * Candidat en tête
     * Obtenir le candidat actuellement en tête
     * @returns CandidatAvecVotesDTO OK
     * @throws ApiError
     */
    public static obtenirCandidatEnTete(): CancelablePromise<CandidatAvecVotesDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/en-tete',
        });
    }
    /**
     * Comparer candidats
     * Comparer deux candidats côte à côte
     * @param candidat1Id
     * @param candidat2Id
     * @returns ComparaisonCandidatsDTO OK
     * @throws ApiError
     */
    public static comparerCandidats(
        candidat1Id: string,
        candidat2Id: string,
    ): CancelablePromise<ComparaisonCandidatsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/comparer',
            query: {
                'candidat1Id': candidat1Id,
                'candidat2Id': candidat2Id,
            },
        });
    }
    /**
     * Classement candidats
     * Obtenir le classement des candidats par nombre de votes
     * @returns CandidatAvecVotesDTO OK
     * @throws ApiError
     */
    public static obtenirClassement(): CancelablePromise<Array<CandidatAvecVotesDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/public/candidats/classement',
        });
    }
}
