/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch, del} from './index';

export const OPPORTUNITY_API = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.OPPORTUNITY.INDEX, data),
  get: () => get(`${API.OPPORTUNITY.INDEX}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.OPPORTUNITY.INDEX, data) as Promise<AxiosResponse<any>>,
  delete: (id: any) => del(`${API.OPPORTUNITY.INDEX}/${id}`),
  getById: (id: any) =>
    get(`${API.OPPORTUNITY.QUERY}/${id}`) as Promise<AxiosResponse<any>>,
};
