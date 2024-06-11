/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const CONTRACT_API = {
  get: () => get(API.CONTRACT.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.CONTRACT.INDEX, data),
  query: (data: any) =>
    post(API.CONTRACT.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.CONTRACT.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.CONTRACT.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (id: any) =>
    get(`${API.CONTRACT.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
