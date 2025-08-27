import { OpenAPI } from '../core/OpenAPI';

export const configureAPI = () => {
  
  console.log('🌐 API configurée sur :', OpenAPI.BASE);
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    OpenAPI.TOKEN = token;
  } else {
    OpenAPI.TOKEN = undefined;
  }
};

export const getApiBaseUrl = () => OpenAPI.BASE;