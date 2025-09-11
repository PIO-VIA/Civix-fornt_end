/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AideElecteurDTO } from '../models/AideElecteurDTO';
import type { CampagneDTO } from '../models/CampagneDTO';
import type { CandidatAvecStatutDTO } from '../models/CandidatAvecStatutDTO';
import type { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import type { ElecteurProfilDTO } from '../models/ElecteurProfilDTO';
import type { HistoriqueElecteurDTO } from '../models/HistoriqueElecteurDTO';
import type { NotificationDTO } from '../models/NotificationDTO';
import type { ResultatsPartielsDTO } from '../models/ResultatsPartielsDTO';
import type { TableauBordElecteurDTO } from '../models/TableauBordElecteurDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LecteurService {
    /**
     * Changer mot de passe
     * Changer le mot de passe de l'électeur connecté
     * @param requestBody
     * @param authorization
     * @returns string OK
     * @throws ApiError
     */
    public static changerMotDePasse(
        requestBody: ChangePasswordRequest,
        authorization?: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/electeur/profil/mot-de-passe',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Résultats partiels
     * Consulter les résultats partiels du vote
     * @param authorization
     * @returns ResultatsPartielsDTO OK
     * @throws ApiError
     */
    public static consulterResultats1(
        authorization?: string,
    ): CancelablePromise<ResultatsPartielsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/electeur/resultats',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Mon profil
     * Obtenir les informations de profil de l'électeur connecté
     * @param authorization
     * @returns ElecteurProfilDTO OK
     * @throws ApiError
     */
    public static obtenirMonProfil(
        authorization?: string,
    ): CancelablePromise<ElecteurProfilDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/electeur/profil',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Mes notifications
     * Obtenir les notifications de l'électeur
     * @param authorization
     * @returns NotificationDTO OK
     * @throws ApiError
     */
    public static obtenirNotifications(
        authorization?: string,
    ): CancelablePromise<Array<NotificationDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/electeur/notifications',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Historique activité
     * Obtenir l'historique d'activité de l'électeur
     * @param authorization
     * @returns HistoriqueElecteurDTO OK
     * @throws ApiError
     */
    public static obtenirHistorique(
        authorization?: string,
    ): CancelablePromise<HistoriqueElecteurDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/electeur/historique',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Tableau de bord électeur
     * Obtenir le tableau de bord personnalisé de l'électeur
     * @param authorization
     * @returns TableauBordElecteurDTO OK
     * @throws ApiError
     */
    public static obtenirTableauBord(
        authorization?: string,
    ): CancelablePromise<TableauBordElecteurDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/electeur/dashboard',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Liste des candidats
     * Consulter la liste de tous les candidats avec leurs informations
     * @param authorization
     * @returns CandidatAvecStatutDTO OK
     * @throws ApiError
     */
    public static consulterCandidats(
        authorization?: string,
    ): CancelablePromise<Array<CandidatAvecStatutDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/electeur/candidats',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Campagnes d'un candidat
     * Consulter toutes les campagnes d'un candidat spécifique
     * @param candidatId
     * @param authorization
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static consulterCampagnesCandidat(
        candidatId: string,
        authorization?: string,
    ): CancelablePromise<Array<CampagneDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/electeur/candidats/{candidatId}/campagnes',
            path: {
                'candidatId': candidatId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Aide électeur
     * Obtenir l'aide et FAQ pour les électeurs
     * @returns AideElecteurDTO OK
     * @throws ApiError
     */
    public static obtenirAide(): CancelablePromise<AideElecteurDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/electeur/aide',
        });
    }
}
