/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Candidat } from './Candidat';
import type { Electeur } from './Electeur';
export type Vote = {
    id?: number;
    electeur?: Electeur;
    candidat?: Candidat;
    dateVote?: string;
};

