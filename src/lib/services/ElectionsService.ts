/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ElectionDTO } from '../models/ElectionDTO';
import type { HealthCheckDTO } from '../models/HealthCheckDTO';
import type { ResultatsElectionDTO } from '../models/ResultatsElectionDTO';
import type { VoteElectionDTO } from '../models/VoteElectionDTO';
import type { VoterElectionRequest } from '../models/VoterElectionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ElectionsService {
    /**
     * Voter pour une élection
     * Enregistrer un vote pour une élection
     * @param authorization
     * @param electionId
     * @param requestBody
     * @returns VoteElectionDTO OK
     * @throws ApiError
     */
    public static voterPourElection(
        authorization: string,
        electionId: string,
        requestBody: VoterElectionRequest,
    ): CancelablePromise<VoteElectionDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/elections/{electionId}/voter',
            path: {
                'electionId': electionId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Lister toutes les élections
     * Obtenir la liste de toutes les élections
     * @returns ElectionDTO OK
     * @throws ApiError
     */
    public static listerToutesElections(): CancelablePromise<Array<ElectionDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/elections',
        });
    }
    /**
     * Détails d'une élection
     * Obtenir les détails d'une élection spécifique
     * @param electionId
     * @returns ElectionDTO OK
     * @throws ApiError
     */
    public static obtenirElection1(
        electionId: string,
    ): CancelablePromise<ElectionDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/elections/{electionId}',
            path: {
                'electionId': electionId,
            },
        });
    }
    /**
     * Résultats d'une élection
     * Obtenir les résultats d'une élection
     * @param electionId
     * @returns ResultatsElectionDTO OK
     * @throws ApiError
     */
    public static obtenirResultatsElection(
        electionId: string,
    ): CancelablePromise<ResultatsElectionDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/elections/{electionId}/resultats',
            path: {
                'electionId': electionId,
            },
        });
    }
    /**
     * Health check
     * Vérifier la santé du service élections
     * @returns HealthCheckDTO OK
     * @throws ApiError
     */
    public static healthCheck3(): CancelablePromise<HealthCheckDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/elections/health',
        });
    }
    /**
     * Élections disponibles
     * Lister les élections disponibles pour l'électeur connecté
     * @param authorization
     * @returns ElectionDTO OK
     * @throws ApiError
     */
    public static listerElectionsDisponibles(
        authorization: string,
    ): CancelablePromise<Array<ElectionDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/elections/disponibles',
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
