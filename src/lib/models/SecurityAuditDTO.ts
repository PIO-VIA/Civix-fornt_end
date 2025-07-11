/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VerificationSecuriteDTO } from './VerificationSecuriteDTO';
export type SecurityAuditDTO = {
    scoreGlobal?: number;
    verificationsEffectuees?: Array<VerificationSecuriteDTO>;
    vulnerabilitesDetectees?: Array<string>;
    recommandations?: Array<string>;
    derniereVerification?: string;
    prochainAudit?: string;
};

