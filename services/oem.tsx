/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const OEM_API = {
  get: () => get(`${API.OEM.INDEX}`) as Promise<AxiosResponse<any>>,
  post: (data: any) => post(API.OEM.INDEX, data),
  patch: (data: any) =>
    patch(API.OEM.INDEX, data) as Promise<AxiosResponse<any>>,
  query: (data: any) => post(API.OEM.QUERY, data) as Promise<AxiosResponse<[]>>,
  delete: (data: any) =>
    post(API.OEM.DeleteById, data) as Promise<AxiosResponse<[]>>,
  getById: (id: any) =>
    get(`${API.OEM.GetOemByDistributorId}/${id}`) as Promise<
      AxiosResponse<any>
    >,
};
