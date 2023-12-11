/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post} from './index';

export const QUOTE_LINE_ITEM_API = {
  get: () => get(API.QUOTE_LINE_ITEM.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.QUOTE_LINE_ITEM.INDEX, data),
  query: (data: any) =>
    post(API.QUOTE_LINE_ITEM.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.QUOTE_LINE_ITEM.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  updateQuoteLineItemQuantityById: (data: any) =>
    post(API.QUOTE_LINE_ITEM.UpdateQuoteLineItemQuantityById, data) as Promise<
      AxiosResponse<any>
    >,
  deleteQuoteLineItemQuantityById: (id: number) =>
    get(
      `${API.QUOTE_LINE_ITEM.DeleteQuoteLineItemQuantityById}/${id}`,
    ) as Promise<AxiosResponse<any>>,
  // put: (id: number, data: any) => put(API.QUOTE_LINE_ITEM.INDEX + "/" + id, data),
  // delete: (id: number) => del(API.QUOTE_LINE_ITEM.INDEX + "/" + id),
};
