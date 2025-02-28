/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const BILLINGADDRESS_API = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.BILLINGADDRESS.INDEX, data),
  get: () => get(`${API.BILLINGADDRESS.INDEX}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.BILLINGADDRESS.INDEX, data) as Promise<AxiosResponse<any>>,
  delete: (data: any) =>
    post(API.BILLINGADDRESS.QUERY, data) as Promise<AxiosResponse<any>>,
  search: (data: any) =>
    post(API.BILLINGADDRESS.SEARCH, data) as Promise<AxiosResponse<any>>,
  query: (data: any) =>
    post(API.BILLINGADDRESS.QUERYCONTACT, data) as Promise<AxiosResponse<[]>>,
  getAllBillingContactByCustomerId: (id: any) =>
    get(
      `${API.BILLINGADDRESS.getAllBillingContactByCustomerId}/${id}`,
    ) as Promise<AxiosResponse<any>>,
};
