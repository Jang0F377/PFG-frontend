import {
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { getIdToken } from '../auth/tokens';

export const registerInterceptors = (axios: AxiosInstance) => {
  axios.interceptors.response.use(snakeToCamelSerializer);
  axios.interceptors.request.use(camelToSnakeSerializer);
  axios.interceptors.request.use(tokenAttacher);
};

const shouldIncludeAuthToken = (url?: string) => {
  if (!url) return false;

  const urlObj = new URL(url);
  const path = urlObj.pathname;

  return path.startsWith('/');
};

const tokenAttacher = (config: InternalAxiosRequestConfig) => {
  const idToken = getIdToken();
  if (idToken !== null && shouldIncludeAuthToken(config.url)) {
    const headers = new AxiosHeaders(config.headers);
    headers.set('Authorization', `Bearer ${idToken}`);
    return {
      ...config,
      headers,
    };
  }
  return config;
};

export const camelToSnakeSerializer = (config: InternalAxiosRequestConfig) => {
  if (
    config.data &&
    (config.headers?.['content-type'] === 'application/json' ||
      config.headers?.['Content-Type'] === 'application/json') &&
    config.snakecaseData
  ) {
    config.data = snakecaseKeys(config.data, {
      deep: true,
    });
  }

  return config;
};

export const snakeToCamelSerializer = (
  response: AxiosResponse,
): AxiosResponse => {
  const options = response.config.camelcaseResponseOptions || {};

  if (
    response.data &&
    typeof response.data === 'object' &&
    response.config.camelcaseResponse
  ) {
    response.data = camelcaseKeys(response.data, {
      deep: true,
      ...options,
    });
  }

  return response;
};
