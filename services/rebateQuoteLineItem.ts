/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const REBATE_QUOTE_LINE_ITEM_API = {
  get: () =>
    get(API.REBATE_QUOTE_LINE_ITEM.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.REBATE_QUOTE_LINE_ITEM.INDEX, data),
  query: (data: any) =>
    post(API.REBATE_QUOTE_LINE_ITEM.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.REBATE_QUOTE_LINE_ITEM.INDEX}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  patch: (data: any) =>
    patch(API.REBATE_QUOTE_LINE_ITEM.INDEX, data) as Promise<
      AxiosResponse<any>
    >,
};
