import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post} from './index';

export const FORMSTACK = {
  get: () => get(API.FORM_STACK.INDEX),
  post: (data: any) => post(API.FORM_STACK.INDEX, data),
  query: (data: any) =>
    post(API.FORM_STACK.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.FORM_STACK.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
