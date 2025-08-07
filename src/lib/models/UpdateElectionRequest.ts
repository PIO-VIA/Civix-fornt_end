/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateElectionRequest = {
    titre?: string;
    description?: string;
    photo?: string;
    dateDebut?: string;
    dateFin?: string;
    dateDebutValidite?: string;
    dateFinValidite?: string;
    statut?: UpdateElectionRequest.statut;
    autoriserVoteMultiple?: boolean;
    nombreMaxVotesParElecteur?: number;
    resultatsVisibles?: boolean;
    electeursAutorises?: Array<string>;
    candidatsParticipants?: Array<string>;
};
export namespace UpdateElectionRequest {
    export enum statut {
        PLANIFIEE = 'PLANIFIEE',
        OUVERTE = 'OUVERTE',
        EN_COURS = 'EN_COURS',
        TERMINEE = 'TERMINEE',
        ANNULEE = 'ANNULEE',
        RESULTATS_PUBLIES = 'RESULTATS_PUBLIES',
    }
}

