/* eslint-disable no-param-reassign */
import {InternalAxiosRequestConfig} from 'axios';

// ToDo: add intercepting logic
export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = '';
  config.headers.Authorization = `Bearer ${token}`;
  config.headers['Content-Type'] = 'application/json';
  return config;
};
