/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const COMPANY_API = {
  get: () => get(API.COMPANY.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.COMPANY.INDEX, data),
  getCompanyByUserId: (data: any) => post(API.COMPANY.GetCompanyByUserId, data),
  query: (data: any) =>
    post(API.COMPANY.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.COMPANY.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.COMPANY.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (id: any) =>
    get(`${API.COMPANY.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
