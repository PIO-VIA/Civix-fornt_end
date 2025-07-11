/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HealthStatusDTO } from './HealthStatusDTO';
export type HealthCheckDTO = {
    status?: string;
    timestamp?: string;
    application?: string;
    version?: string;
    services?: Record<string, HealthStatusDTO>;
    uptime?: string;
    error?: string;
};

