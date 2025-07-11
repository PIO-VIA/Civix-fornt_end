/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AlerteSystemeDTO } from './AlerteSystemeDTO';
import type { NetworkStatsDTO } from './NetworkStatsDTO';
export type MonitoringDTO = {
    cpuUsage?: number;
    memoryUsage?: number;
    diskUsage?: number;
    networkStats?: NetworkStatsDTO;
    threadCount?: number;
    sessionCount?: number;
    requestsPerMinute?: number;
    errorsLast24h?: number;
    averageResponseTime?: number;
    timestamp?: string;
    alertes?: Array<AlerteSystemeDTO>;
};

