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
  if (error?.response?.status == 400) {
    return Promise.resolve({
      success: false,
      message: error,
    });
  }
  if (error?.response?.status == 601) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      success: false,
      message: error,
    });
  }
  return Promise.resolve({
    success: false,
    message: 'Something went wrong',
  });
};
