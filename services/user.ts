/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const USERAPI = {
  get: () => get(API.USER.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.USER.INDEX, data),
  loginUser: (data: any) => post(API.USER.LOGIN, data),
  query: (data: any) =>
    post(API.USER.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.USER.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  updateUserById: (data: any) =>
    patch(API.USER.UpdateUserById, data) as Promise<AxiosResponse<any>>,
  addUser: (data: any) =>
  post(API.USER.AddUser, data) as Promise<AxiosResponse<any>>,
};
