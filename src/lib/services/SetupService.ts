/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAdministrateurRequest } from '../models/CreateAdministrateurRequest';
import type { SetupStatusDTO } from '../models/SetupStatusDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SetupService {
    /**
     * Créer premier admin
     * Créer le premier administrateur (disponible uniquement si aucun admin n'existe)
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static creerPremierAdmin(
        requestBody: CreateAdministrateurRequest,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setup/first-admin',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Statut setup
     * Vérifier si la plateforme est initialisée
     * @returns SetupStatusDTO OK
     * @throws ApiError
     */
    public static obtenirStatutSetup(): CancelablePromise<SetupStatusDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/setup/status',
        });
    }
}
