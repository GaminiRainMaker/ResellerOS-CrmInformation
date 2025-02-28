/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const SHARED_PARTNER_PASSWORD_API = {
  get: () =>
    get(API.SHARED_PARTNER_PASSWORD.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.SHARED_PARTNER_PASSWORD.INDEX, data),
  query: (data: any) =>
    post(API.SHARED_PARTNER_PASSWORD.QUERY, data) as Promise<AxiosResponse<[]>>,
  deleteById: (data: any) =>
    patch(API.SHARED_PARTNER_PASSWORD.DeleteById, data) as Promise<
      AxiosResponse<any>
    >,
  updateById: (data: any) =>
    patch(API.SHARED_PARTNER_PASSWORD.UpdateById, data) as Promise<
      AxiosResponse<any>
    >,
  getById: (id: number) =>
    get(`${API.SHARED_PARTNER_PASSWORD.INDEX}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  patch: (data: any) =>
    patch(API.SHARED_PARTNER_PASSWORD.INDEX, data) as Promise<
      AxiosResponse<any>
    >,
    getByIdfororganization: (id: number) =>
      get(`${API.SHARED_PARTNER_PASSWORD.getByIdfororganization}/${id}`) as Promise<
        AxiosResponse<any>
      >,
};
