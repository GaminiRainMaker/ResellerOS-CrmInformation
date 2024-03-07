/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const QUOTECONFIGURATION = {
  post: (data: any) => post(API.QUOTECONFIGURATION.INDEX, data),
  get: () => get(API.QUOTECONFIGURATION.INDEX) as Promise<AxiosResponse<[]>>,
  patch: (data: any) =>
    patch(API.QUOTECONFIGURATION.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (id: number) =>
    get(`${API.QUOTECONFIGURATION.DeleteById}/${id}`) as Promise<
      AxiosResponse<any>
    >,
};
