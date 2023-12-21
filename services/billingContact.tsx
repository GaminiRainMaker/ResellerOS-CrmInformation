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
};
