/* eslint-disable no-param-reassign */
import {InternalAxiosRequestConfig} from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

// ToDo: add intercepting logic
export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  if (!config?.url?.includes('auth') || !config?.url?.includes('addUser')) {
    const token: any = Cookies.get('token');

    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['Content-Type'] = 'application/json';
  return config;
};
