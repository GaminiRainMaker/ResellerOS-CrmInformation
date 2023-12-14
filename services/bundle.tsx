/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post} from './index';

export const BUNDLE_API = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.BUNDLE.INDEX, data),
  getById: (id: number) =>
    get(`${API.BUNDLE.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
