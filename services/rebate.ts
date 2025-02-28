/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const REBATE_API = {
  get: () => get(API.REBATE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.REBATE.INDEX, data),
  query: (data: any) =>
    post(API.REBATE.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.REBATE.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  getRebatesByProductCode: (product_code: string) =>
    get(`${API.REBATE.GetRebatesByProductCode}/${product_code}`) as Promise<
      AxiosResponse<any>
    >,
  patch: (data: any) =>
    patch(API.REBATE.INDEX, data) as Promise<AxiosResponse<any>>,
  getRebatesInBulk: (data: any) => post(API.REBATE.RebatesInBul, data),
};
