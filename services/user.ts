/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post} from './index';

export const USERAPI = {
  get: () => get(API.USER.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.USER.INDEX, data),
  loginUser: (data: any) => post(API.USER.LOGIN, data),
  query: (data: any) =>
    post(API.USER.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.USER.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
