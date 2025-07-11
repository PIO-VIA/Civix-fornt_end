/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestEmailControllerService {
    /**
     * @param email
     * @param username
     * @returns string OK
     * @throws ApiError
     */
    public static testerIdentifiants(
        email: string,
        username: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/test/identifiants',
            query: {
                'email': email,
                'username': username,
            },
        });
    }
    /**
     * @param destination
     * @returns string OK
     * @throws ApiError
     */
    public static testerEmail(
        destination: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/test/email',
            query: {
                'destination': destination,
            },
        });
    }
}
