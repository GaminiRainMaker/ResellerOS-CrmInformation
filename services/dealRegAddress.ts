/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const DEALREG_ADDRESS_API = {
  get: () => get(API.DEALREGADDRESS.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.DEALREGADDRESS.INDEX, data),
  query: (data: any) =>
    post(API.DEALREGADDRESS.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.DEALREGADDRESS.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.DEALREGADDRESS.INDEX, data) as Promise<AxiosResponse<any>>,
};
