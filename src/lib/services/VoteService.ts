/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PeutVoterResponse } from '../models/PeutVoterResponse';
import type { PreviewVoteResponse } from '../models/PreviewVoteResponse';
import type { ResultatVoteDTO } from '../models/ResultatVoteDTO';
import type { StatistiquesVoteDTO } from '../models/StatistiquesVoteDTO';
import type { StatutVoteElecteurDTO } from '../models/StatutVoteElecteurDTO';
import type { VoteResponse } from '../models/VoteResponse';
import type { VoteTemporelDTO } from '../models/VoteTemporelDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VoteService {
    /**
     * Prévisualiser vote
     * Prévisualiser le vote avant confirmation (sans l'enregistrer)
     * @param authorization
     * @param candidatId
     * @returns PreviewVoteResponse OK
     * @throws ApiError
     */
    public static previsualiserVote(
        authorization: string,
        candidatId: string,
    ): CancelablePromise<PreviewVoteResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/votes/previsualiser',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'candidatId': candidatId,
            },
        });
    }
    /**
     * Effectuer un vote
     * Enregistrer le vote d'un électeur pour un candidat (un seul vote par électeur)
     * @param authorization
     * @param candidatId
     * @returns VoteResponse OK
     * @throws ApiError
     */
    public static effectuerVote(
        authorization: string,
        candidatId: string,
    ): CancelablePromise<VoteResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/votes/effectuer',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'candidatId': candidatId,
            },
        });
    }
    /**
     * Statut de vote électeur
     * Vérifier si l'électeur connecté a déjà voté
     * @param authorization
     * @returns StatutVoteElecteurDTO OK
     * @throws ApiError
     */
    public static obtenirStatutVote(
        authorization: string,
    ): CancelablePromise<StatutVoteElecteurDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/votes/statut',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Statistiques de vote
     * Obtenir les statistiques globales de l'élection
     * @returns StatistiquesVoteDTO OK
     * @throws ApiError
     */
    public static obtenirStatistiques(): CancelablePromise<StatistiquesVoteDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/votes/statistiques',
        });
    }
    /**
     * Résultats de l'élection
     * Obtenir les résultats complets de l'élection (accès public)
     * @returns ResultatVoteDTO OK
     * @throws ApiError
     */
    public static consulterResultats(): CancelablePromise<Array<ResultatVoteDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/votes/resultats',
        });
    }
    /**
     * Répartition temporelle
     * Obtenir l'évolution temporelle des votes
     * @returns VoteTemporelDTO OK
     * @throws ApiError
     */
    public static obtenirRepartitionTemporelle(): CancelablePromise<Array<VoteTemporelDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/votes/repartition-temporelle',
        });
    }
    /**
     * Vérifier droit de vote
     * Vérifier si l'électeur connecté peut encore voter
     * @param authorization
     * @returns PeutVoterResponse OK
     * @throws ApiError
     */
    public static verifierPeutVoter(
        authorization: string,
    ): CancelablePromise<PeutVoterResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/votes/peut-voter',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Candidat gagnant
     * Obtenir le candidat actuellement en tête
     * @returns ResultatVoteDTO OK
     * @throws ApiError
     */
    public static obtenirGagnant(): CancelablePromise<ResultatVoteDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/votes/gagnant',
        });
    }
}
