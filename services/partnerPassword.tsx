/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const PARTNER_PASSWORD_API = {
  get: () => get(API.PARTNER_PASSWORD.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.PARTNER_PASSWORD.INDEX, data),
  query: (data: any) =>
    post(API.PARTNER_PASSWORD.QUERY, data) as Promise<AxiosResponse<[]>>,
  deleteById: (data: any) =>
    patch(API.PARTNER_PASSWORD.DeleteById, data) as Promise<AxiosResponse<any>>,
  updateById: (data: any) =>
    patch(API.PARTNER_PASSWORD.UpdateById, data) as Promise<AxiosResponse<any>>,
  getById: (id: number) =>
    get(`${API.PARTNER_PASSWORD.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.PARTNER_PASSWORD.INDEX, data) as Promise<AxiosResponse<any>>,
};
