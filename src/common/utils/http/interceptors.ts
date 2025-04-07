import {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export const registerInterceptors = (axios: AxiosInstance) => {
  axios.interceptors.response.use(snakeToCamelSerializer);
  axios.interceptors.request.use(camelToSnakeSerializer);
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
