/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const DEALREG_API = {
  get: () => get(API.DEALREG.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.DEALREG.INDEX, data),
  query: (data: any) =>
    post(API.DEALREG.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.DEALREG.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.DEALREG.INDEX, data) as Promise<AxiosResponse<any>>,
};
