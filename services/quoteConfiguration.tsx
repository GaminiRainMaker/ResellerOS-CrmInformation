/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const QUOTE_CONFIGURATION_API = {
  get: () =>
    get(`${API.QUOTE_CONFIGURATION.INDEX}`) as Promise<AxiosResponse<any>>,
  post: (data: any) => post(API.QUOTE_CONFIGURATION.INDEX, data),
  patch: (data: any) =>
    patch(API.QUOTE_CONFIGURATION.INDEX, data) as Promise<AxiosResponse<any>>,
  query: (data: any) =>
    post(API.QUOTE_CONFIGURATION.QUERY, data) as Promise<AxiosResponse<[]>>,
  delete: (data: any) =>
    post(API.QUOTE_CONFIGURATION.DeleteById, data) as Promise<
      AxiosResponse<[]>
    >,
};
