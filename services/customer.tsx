/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const CUSTOMER_API = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.CUSTOMER.INDEX, data),
  updateCustomerDetails: (data: any) => post(API.CUSTOMER.QUERY, data),
  get: () => get(`${API.CUSTOMER.INDEX}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.CUSTOMER.INDEX, data) as Promise<AxiosResponse<any>>,
  getAllDeleted: () =>
    get(`${API.CUSTOMER.INDEX}`) as Promise<AxiosResponse<any>>,
};
