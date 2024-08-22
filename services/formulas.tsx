/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const FORMULA_API = {
  get: () => get(API.FORMULA.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.FORMULA.INDEX, data),
  deleteById: (id: number) =>
    get(`${API.FORMULA.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
