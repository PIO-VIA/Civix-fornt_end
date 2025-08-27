/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateElectionRequest = {
    titre: string;
    description?: string;
    photo?: string;
    dateDebut: string;
    dateFin: string;
    autoriserVoteMultiple?: boolean;
    nombreMaxVotesParElecteur?: number;
    resultatsVisibles?: boolean;
    electeursAutorises?: Array<string>;
    candidatsParticipants?: Array<string>;
};

