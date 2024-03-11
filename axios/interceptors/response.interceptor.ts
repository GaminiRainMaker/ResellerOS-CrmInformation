/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import {AxiosError, AxiosResponse} from 'axios';
import Cookies from 'js-cookie';

export const responseInterceptor = (config: AxiosResponse): AxiosResponse => {
  const {headers} = config;
  if (headers?.location) {
    const loc = headers.location.split('/');
    config.data = {id: loc[loc.length - 1]};
  }
  return config;
};
export const errorResponseInterceptor = (error: AxiosError) => {
  if (error?.response?.status == 401) {
    Cookies.remove('token');
    window.location.href = '/' as string;
  }
  return Promise.resolve({
    success: false,
    message: 'Something went wrong',
  });
};
