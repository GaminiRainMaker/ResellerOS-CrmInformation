/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const PROFITABILITY_API = {
  get: () => get(API.PROFITABALITY.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.PROFITABALITY.INDEX, data),
  query: (data: any) =>
    post(API.PROFITABALITY.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.PROFITABALITY.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.PROFITABALITY.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (data: any) =>
    post(API.PROFITABALITY.DeleteById, data) as Promise<AxiosResponse<any>>,
  updateProfitabilityValueForBulk: (data: any) =>
    post(API.PROFITABALITY.UpdateProfitabilityValueForBulk, data) as Promise<AxiosResponse<any>>,
};
