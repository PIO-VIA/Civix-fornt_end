/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FileControllerService {
    /**
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static uploadFile(
        requestBody?: {
            file: Blob;
        },
    ): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/upload',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param fileName
     * @returns binary OK
     * @throws ApiError
     */
    public static downloadFile(
        fileName: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/files/{fileName}',
            path: {
                'fileName': fileName,
            },
        });
    }
}
