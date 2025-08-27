/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampagneDTO } from '../models/CampagneDTO';
import type { CandidatDTO } from '../models/CandidatDTO';
import type { CreateCampagneRequest } from '../models/CreateCampagneRequest';
import type { CreateCandidatRequest } from '../models/CreateCandidatRequest';
import type { CreateElecteurAdminRequest } from '../models/CreateElecteurAdminRequest';
import type { CreateElectionRequest } from '../models/CreateElectionRequest';
import type { ElecteurDTO } from '../models/ElecteurDTO';
import type { ElectionDTO } from '../models/ElectionDTO';
import type { StatistiquesAdminDTO } from '../models/StatistiquesAdminDTO';
import type { UpdateCampagneRequest } from '../models/UpdateCampagneRequest';
import type { UpdateCandidatRequest } from '../models/UpdateCandidatRequest';
import type { UpdateElecteurRequest } from '../models/UpdateElecteurRequest';
import type { UpdateElectionRequest } from '../models/UpdateElectionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdministrationService {
    /**
     * Détails d'une élection
     * Obtenir les détails d'une élection spécifique
     * @param authorization
     * @param electionId
     * @returns ElectionDTO OK
     * @throws ApiError
     */
    public static obtenirElection(
        authorization: string,
        electionId: string,
    ): CancelablePromise<ElectionDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/elections/{electionId}',
            path: {
                'electionId': electionId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Modifier une élection
     * Modifier une élection existante
     * @param authorization
     * @param electionId
     * @param requestBody
     * @returns ElectionDTO OK
     * @throws ApiError
     */
    public static modifierElection(
        authorization: string,
        electionId: string,
        requestBody: UpdateElectionRequest,
    ): CancelablePromise<ElectionDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/admin/elections/{electionId}',
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
     * Supprimer une élection
     * Supprimer une élection
     * @param authorization
     * @param electionId
     * @returns any OK
     * @throws ApiError
     */
    public static supprimerElection(
        authorization: string,
        electionId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/elections/{electionId}',
            path: {
                'electionId': electionId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Obtenir électeur
     * Obtenir les détails d'un électeur
     * @param authorization
     * @param electeurId
     * @returns ElecteurDTO OK
     * @throws ApiError
     */
    public static obtenirElecteur(
        authorization: string,
        electeurId: string,
    ): CancelablePromise<ElecteurDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/electeurs/{electeurId}',
            path: {
                'electeurId': electeurId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Modifier électeur
     * Modifier les informations d'un électeur
     * @param authorization
     * @param electeurId
     * @param requestBody
     * @returns ElecteurDTO OK
     * @throws ApiError
     */
    public static modifierElecteur(
        authorization: string,
        electeurId: string,
        requestBody: UpdateElecteurRequest,
    ): CancelablePromise<ElecteurDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/admin/electeurs/{electeurId}',
            path: {
                'electeurId': electeurId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Supprimer électeur
     * Supprimer un électeur (impossible s'il a voté)
     * @param authorization
     * @param electeurId
     * @returns any OK
     * @throws ApiError
     */
    public static supprimerElecteur(
        authorization: string,
        electeurId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/electeurs/{electeurId}',
            path: {
                'electeurId': electeurId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Modifier candidat
     * Modifier les informations d'un candidat
     * @param authorization
     * @param candidatId
     * @param requestBody
     * @returns CandidatDTO OK
     * @throws ApiError
     */
    public static modifierCandidat(
        authorization: string,
        candidatId: string,
        requestBody: UpdateCandidatRequest,
    ): CancelablePromise<CandidatDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/admin/candidats/{candidatId}',
            path: {
                'candidatId': candidatId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Supprimer candidat
     * Supprimer un candidat (impossible s'il a des votes)
     * @param authorization
     * @param candidatId
     * @returns any OK
     * @throws ApiError
     */
    public static supprimerCandidat(
        authorization: string,
        candidatId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/candidats/{candidatId}',
            path: {
                'candidatId': candidatId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Modifier campagne
     * Modifier une campagne
     * @param authorization
     * @param campagneId
     * @param requestBody
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static modifierCampagne(
        authorization: string,
        campagneId: string,
        requestBody: UpdateCampagneRequest,
    ): CancelablePromise<CampagneDTO> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/admin/campagnes/{campagneId}',
            path: {
                'campagneId': campagneId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Supprimer campagne
     * Supprimer une campagne
     * @param authorization
     * @param campagneId
     * @returns any OK
     * @throws ApiError
     */
    public static supprimerCampagne(
        authorization: string,
        campagneId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/campagnes/{campagneId}',
            path: {
                'campagneId': campagneId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Lister les élections
     * Obtenir la liste de toutes les élections
     * @param authorization
     * @returns ElectionDTO OK
     * @throws ApiError
     */
    public static listerElections(
        authorization: string,
    ): CancelablePromise<Array<ElectionDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/elections',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Créer une élection
     * Créer une nouvelle élection
     * @param authorization
     * @param requestBody
     * @returns ElectionDTO OK
     * @throws ApiError
     */
    public static creerElection(
        authorization: string,
        requestBody: CreateElectionRequest,
    ): CancelablePromise<ElectionDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/elections',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Lister électeurs
     * Obtenir la liste paginée des électeurs
     * @param authorization
     * @param page
     * @param size
     * @returns ElecteurDTO OK
     * @throws ApiError
     */
    public static listerElecteurs(
        authorization: string,
        page?: number,
        size: number = 20,
    ): CancelablePromise<Array<ElecteurDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/electeurs',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * Créer électeur
     * Créer un nouvel électeur avec envoi automatique des identifiants par email
     * @param authorization
     * @param requestBody
     * @returns ElecteurDTO OK
     * @throws ApiError
     */
    public static creerElecteur(
        authorization: string,
        requestBody: CreateElecteurAdminRequest,
    ): CancelablePromise<ElecteurDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/electeurs',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Renvoyer identifiants
     * Renvoyer les identifiants à un électeur
     * @param authorization
     * @param electeurId
     * @returns string OK
     * @throws ApiError
     */
    public static renvoyerIdentifiants(
        authorization: string,
        electeurId: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/electeurs/{electeurId}/resend-credentials',
            path: {
                'electeurId': electeurId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Lister candidats
     * Obtenir la liste des candidats
     * @param authorization
     * @returns CandidatDTO OK
     * @throws ApiError
     */
    public static listerCandidats(
        authorization: string,
    ): CancelablePromise<Array<CandidatDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/candidats',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Créer candidat
     * Créer un nouveau candidat
     * @param authorization
     * @param requestBody
     * @returns CandidatDTO OK
     * @throws ApiError
     */
    public static creerCandidat(
        authorization: string,
        requestBody: CreateCandidatRequest,
    ): CancelablePromise<CandidatDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/candidats',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Lister campagnes
     * Obtenir la liste des campagnes
     * @param authorization
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static listerCampagnes(
        authorization: string,
    ): CancelablePromise<Array<CampagneDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/campagnes',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Créer campagne
     * Créer une nouvelle campagne pour un candidat
     * @param authorization
     * @param requestBody
     * @returns CampagneDTO OK
     * @throws ApiError
     */
    public static creerCampagne(
        authorization: string,
        requestBody: CreateCampagneRequest,
    ): CancelablePromise<CampagneDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/campagnes',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Export électeurs
     * Exporter la liste des électeurs
     * @param authorization
     * @returns string OK
     * @throws ApiError
     */
    public static exporterElecteurs(
        authorization: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/export/electeurs',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Tableau de bord admin
     * Obtenir les statistiques administratives
     * @param authorization
     * @returns StatistiquesAdminDTO OK
     * @throws ApiError
     */
    public static obtenirTableauBord1(
        authorization: string,
    ): CancelablePromise<StatistiquesAdminDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/dashboard',
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
