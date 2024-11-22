/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const ADDRESS_API = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.ADDRESS.INDEX, data),
  get: () => get(`${API.ADDRESS.INDEX}`) as Promise<AxiosResponse<any>>,
  getAddressByCustomerId: (id: any) =>
    get(`${API.ADDRESS.GetAddressByCustomerId}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.ADDRESS.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteAddress: (data: any) =>
    patch(API.ADDRESS.DeleteAddress, data) as Promise<AxiosResponse<any>>,
};
