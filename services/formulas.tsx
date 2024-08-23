/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const FORMULA_API = {
  get: () => get(API.FORMULA.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.FORMULA.INDEX, data),
  GET_FORMULA: (data: any) => post(API.FORMULA.GET_FORMULA, data),
  deleteById: (id: number) =>
    get(`${API.FORMULA.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
