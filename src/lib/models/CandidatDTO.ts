/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Campagne } from './Campagne';
import type { Vote } from './Vote';
export type CandidatDTO = {
    externalIdCandidat?: string;
    username?: string;
    email?: string;
    empreinteDigitale?: string;
    votes?: Array<Vote>;
    campagnes?: Array<Campagne>;
};

