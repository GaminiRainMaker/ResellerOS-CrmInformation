/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const DISTRIBUTOR_API = {
  get: () => get(`${API.DISTRIBUTOR.INDEX}`) as Promise<AxiosResponse<any>>,
  post: (data: any) => post(API.DISTRIBUTOR.INDEX, data),
  patch: (data: any) =>
    patch(API.DISTRIBUTOR.INDEX, data) as Promise<AxiosResponse<any>>,
  query: (data: any) =>
    post(API.DISTRIBUTOR.QUERY, data) as Promise<AxiosResponse<[]>>,
  delete: (data: any) =>
    post(API.DISTRIBUTOR.DeleteById, data) as Promise<AxiosResponse<[]>>,
};
