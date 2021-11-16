import axios, {AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import { getToken } from './token';
import { ERROR_404 } from '../consts';

const BACKEND_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 10000;

enum HttpCode {
  Unauthorized = 401,
  NotFound = ERROR_404,
}

type UnauthorizedCallback = () => void;

export const createAPI = (onUnauthorized: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const {response} = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      if (response?.status === HttpCode.NotFound) {
        return Promise.reject(HttpCode.NotFound);
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
