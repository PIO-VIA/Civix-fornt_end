/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponse } from '../models/AuthResponse';
import type { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import type { LoginRequest } from '../models/LoginRequest';
import type { SessionInfoDTO } from '../models/SessionInfoDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthentificationService {
    /**
     * Déconnexion
     * Déconnexion utilisateur
     * @returns string OK
     * @throws ApiError
     */
    public static logout(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
    /**
     * Connexion électeur
     * Authentification d'un électeur avec email et mot de passe
     * @param requestBody
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static loginElecteur(
        requestBody: LoginRequest,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/electeur/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Changer mot de passe électeur
     * Changement de mot de passe lors de la première connexion
     * @param authorization
     * @param requestBody
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static changerMotDePasseElecteur(
        authorization: string,
        requestBody: ChangePasswordRequest,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/electeur/change-password',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Connexion administrateur
     * Authentification d'un administrateur
     * @param requestBody
     * @returns AuthResponse OK
     * @throws ApiError
     */
    public static loginAdministrateur(
        requestBody: LoginRequest,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/admin/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Vérifier token électeur
     * Valider un token électeur
     * @param authorization
     * @returns boolean OK
     * @throws ApiError
     */
    public static verifierTokenElecteur(
        authorization: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/electeur/verify',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Info session électeur
     * Obtenir les informations de la session électeur
     * @param authorization
     * @returns SessionInfoDTO OK
     * @throws ApiError
     */
    public static getSessionElecteur(
        authorization: string,
    ): CancelablePromise<SessionInfoDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/electeur/session',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Vérifier token admin
     * Valider un token administrateur
     * @param authorization
     * @returns boolean OK
     * @throws ApiError
     */
    public static verifierTokenAdmin(
        authorization: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/admin/verify',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Info session admin
     * Obtenir les informations de la session admin
     * @param authorization
     * @returns SessionInfoDTO OK
     * @throws ApiError
     */
    public static getSessionAdmin(
        authorization: string,
    ): CancelablePromise<SessionInfoDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/admin/session',
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
