/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ElectionDTO = {
    externalIdElection?: string;
    titre?: string;
    description?: string;
    dateDebut?: string;
    dateFin?: string;
    dateDebutValidite?: string;
    dateFinValidite?: string;
    statut?: ElectionDTO.statut;
    dateCreation?: string;
    dateModification?: string;
    administrateurId?: string;
    administrateurNom?: string;
    autoriserVoteMultiple?: boolean;
    nombreMaxVotesParElecteur?: number;
    resultatsVisibles?: boolean;
    electeursAutorises?: Array<string>;
    candidatsParticipants?: Array<string>;
    nombreElecteursInscrits?: number;
    nombreCandidats?: number;
    nombreVotes?: number;
    estActive?: boolean;
    estDansLaPeriodeDeValidite?: boolean;
};
export namespace ElectionDTO {
    export enum statut {
        PLANIFIEE = 'PLANIFIEE',
        OUVERTE = 'OUVERTE',
        EN_COURS = 'EN_COURS',
        TERMINEE = 'TERMINEE',
        ANNULEE = 'ANNULEE',
        RESULTATS_PUBLIES = 'RESULTATS_PUBLIES',
    }
}

