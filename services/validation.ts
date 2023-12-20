/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const VALIDATION_API = {
  get: () => get(API.VALIDATION.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.VALIDATION.INDEX, data),
  query: (data: any) =>
    post(API.VALIDATION.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.VALIDATION.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.VALIDATION.INDEX, data) as Promise<AxiosResponse<any>>,
};
