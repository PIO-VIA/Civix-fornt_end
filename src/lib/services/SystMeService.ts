/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackupInfoDTO } from '../models/BackupInfoDTO';
import type { BackupResultDTO } from '../models/BackupResultDTO';
import type { CleanupResultDTO } from '../models/CleanupResultDTO';
import type { HealthCheckDTO } from '../models/HealthCheckDTO';
import type { LogsDTO } from '../models/LogsDTO';
import type { MaintenanceDTO } from '../models/MaintenanceDTO';
import type { MaintenanceRequest } from '../models/MaintenanceRequest';
import type { MonitoringDTO } from '../models/MonitoringDTO';
import type { SecurityAuditDTO } from '../models/SecurityAuditDTO';
import type { SystemInfoDTO } from '../models/SystemInfoDTO';
import type { SystemMetricsDTO } from '../models/SystemMetricsDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SystMeService {
    /**
     * Mode maintenance
     * Activer/désactiver le mode maintenance
     * @param authorization
     * @param requestBody
     * @returns MaintenanceDTO OK
     * @throws ApiError
     */
    public static toggleMaintenance(
        authorization: string,
        requestBody: MaintenanceRequest,
    ): CancelablePromise<MaintenanceDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/system/maintenance',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Nettoyage système
     * Effectuer des tâches de nettoyage système
     * @param authorization
     * @returns CleanupResultDTO OK
     * @throws ApiError
     */
    public static effectuerNettoyage(
        authorization: string,
    ): CancelablePromise<CleanupResultDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/system/cleanup',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Backup données
     * Créer une sauvegarde des données
     * @param authorization
     * @param type
     * @returns BackupResultDTO OK
     * @throws ApiError
     */
    public static creerBackup(
        authorization: string,
        type: string = 'FULL',
    ): CancelablePromise<BackupResultDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/system/backup',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'type': type,
            },
        });
    }
    /**
     * Audit sécurité
     * Effectuer un audit de sécurité du système
     * @param authorization
     * @returns SecurityAuditDTO OK
     * @throws ApiError
     */
    public static effectuerAuditSecurite(
        authorization: string,
    ): CancelablePromise<SecurityAuditDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/system/security-audit',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Monitoring temps réel
     * Données de monitoring en temps réel
     * @param authorization
     * @returns MonitoringDTO OK
     * @throws ApiError
     */
    public static obtenirMonitoring(
        authorization: string,
    ): CancelablePromise<MonitoringDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/system/monitoring',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Métriques système
     * Obtenir les métriques détaillées du système
     * @returns SystemMetricsDTO OK
     * @throws ApiError
     */
    public static obtenirMetriques(): CancelablePromise<SystemMetricsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/system/metrics',
        });
    }
    /**
     * Logs système
     * Obtenir les logs récents du système (admin uniquement)
     * @param authorization
     * @param niveau
     * @param limite
     * @returns LogsDTO OK
     * @throws ApiError
     */
    public static obtenirLogs(
        authorization: string,
        niveau: string = 'INFO',
        limite: number = 50,
    ): CancelablePromise<LogsDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/system/logs',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'niveau': niveau,
                'limite': limite,
            },
        });
    }
    /**
     * Informations système
     * Obtenir les informations détaillées du système
     * @returns SystemInfoDTO OK
     * @throws ApiError
     */
    public static obtenirInfoSysteme(): CancelablePromise<SystemInfoDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/system/info',
        });
    }
    /**
     * Health check global
     * Vérifier la santé globale de l'application
     * @returns HealthCheckDTO OK
     * @throws ApiError
     */
    public static healthCheck(): CancelablePromise<HealthCheckDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/system/health',
        });
    }
    /**
     * Liste backups
     * Obtenir la liste des backups disponibles
     * @param authorization
     * @returns BackupInfoDTO OK
     * @throws ApiError
     */
    public static listerBackups(
        authorization: string,
    ): CancelablePromise<Array<BackupInfoDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/system/backups',
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
