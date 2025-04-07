import _axios, { type AxiosRequestConfig } from 'axios';
import { registerInterceptors } from './interceptors';
import { APP_API_URL } from '@constants/apiConstants';

declare module 'axios' {
  export interface AxiosRequestConfig {
    isRetryRequest?: boolean;
    snakecaseData?:
      | boolean
      | {
          exclude?: Array<string>;
        };
    camelcaseResponse?: boolean;
    camelcaseResponseOptions?: {
      exclude?: Array<string>;
      stopPaths?: Array<string>;
    };
  }
}

declare type AnyMessage = {
  $type?: string;
};

type RequestDataType = AnyMessage | Record<string, unknown>;

const createAxiosInstance = () => {
  const config: AxiosRequestConfig = {
    baseURL: APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const axios = _axios.create(config);

  registerInterceptors(axios);

  return axios;
};

export const axios = createAxiosInstance();

async function get<T>(
  url: string,
  params?: Record<string, string>,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axios.get<T>(url, { params, ...config });
  return response.data;
}

async function post<T, RequestData = RequestDataType>(
  url: string,
  data?: RequestData,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axios.post<T>(url, data, config);
  return response.data;
}

async function patch<T, RequestData = RequestDataType>(
  url: string,
  data?: RequestData,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axios.patch<T>(url, data, config);
  return response.data;
}

async function put<T, RequestData = RequestDataType>(
  url: string,
  data?: RequestData,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axios.put<T>(url, data, config);
  return response.data;
}

async function del<T, RequestData = RequestDataType>(
  url: string,
  data?: RequestData,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axios.delete<T>(url, { data, ...config });
  return response.data;
}

export const http = {
  get,
  post,
  patch,
  put,
  delete: del,
};
