/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VoteElectionDTO = {
    id?: number;
    electionId?: string;
    electeurId?: string;
    candidatId?: string;
    dateVote?: string;
    adresseIp?: string;
    userAgent?: string;
    statutVote?: VoteElectionDTO.statutVote;
    electionTitre?: string;
    electeurNom?: string;
    candidatNom?: string;
};
export namespace VoteElectionDTO {
    export enum statutVote {
        VALIDE = 'VALIDE',
        ANNULE = 'ANNULE',
        EN_ATTENTE_VALIDATION = 'EN_ATTENTE_VALIDATION',
        REJETE = 'REJETE',
    }
}

