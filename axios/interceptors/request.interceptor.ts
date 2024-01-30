/* eslint-disable no-param-reassign */
import {InternalAxiosRequestConfig} from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

// ToDo: add intercepting logic
export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token: any = Cookies.get('token');
  Cookies.set('access_token', token, {
    expires: 0.8,
    secure: true,
    sameSite: 'strict',
  });
  // const token = '';
  config.headers.Authorization = `Bearer ${token}`;
  config.headers['Content-Type'] = 'application/json';
  return config;
};
