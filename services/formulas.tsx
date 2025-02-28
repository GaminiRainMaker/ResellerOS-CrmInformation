/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const FORMULA_API = {
  get: () => get(API.FORMULA.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.FORMULA.INDEX, data),
  GET_FORMULA: (data: any) => post(API.FORMULA.GET_FORMULA, data),
  GET_WITH_OEM_DISTRIIBUTER: (data: any) => post(API.FORMULA.getWithOemDist, data),
  GET_FORMULA_BY_OEM_DIST: (data: any) =>
    post(API.FORMULA.GET_FORMULA_BY_OEM_DIST, data),

  deleteById: (id: number) =>
    get(`${API.FORMULA.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
