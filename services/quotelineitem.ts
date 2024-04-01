/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

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
  deleteQuoteLineItemById: (data: any) =>
    patch(API.QUOTE_LINE_ITEM.DeleteQuoteLineItemById, data) as Promise<
      AxiosResponse<any>
    >,
  getQuoteLineItemByQuoteId: (id: number) =>
    get(`${API.QUOTE_LINE_ITEM.GetQuoteLineItemByQuoteId}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  patch: (data: any) =>
    patch(API.QUOTE_LINE_ITEM.INDEX, data) as Promise<AxiosResponse<[]>>,
  getQuoteLineItemByQuoteIdandBundleIdNull: (id: number) =>
    get(
      `${API.QUOTE_LINE_ITEM.GetQuoteLineItemByQuoteIdandBundleIdNull}/${id}`,
    ) as Promise<AxiosResponse<[]>>,
  updateQuoteLineItemById: (data: any) =>
    patch(API.QUOTE_LINE_ITEM.UpdateQuoteLineItemById, data) as Promise<
      AxiosResponse<[]>
    >,
  updateQuoteLineItemConcern: (data: any) =>
    patch(API.QUOTE_LINE_ITEM.UpdateQuoteLineItemConcern, data) as Promise<
      AxiosResponse<[]>
    >,
  updateQuoteLineItemVerified: (data: any) =>
    patch(API.QUOTE_LINE_ITEM.UpdateQuoteLineItemVerified, data) as Promise<
      AxiosResponse<[]>
    >,
  deleteQuoteLineByQuoteID: (id: number) =>
    get(`${API.QUOTE_LINE_ITEM.deleteQuoteLineByQuoteId}/${id}`) as Promise<
      AxiosResponse<any>
    >,

  // put: (id: number, data: any) => put(API.QUOTE_LINE_ITEM.INDEX + "/" + id, data),
  // delete: (id: number) => del(API.QUOTE_LINE_ITEM.INDEX + "/" + id),
};
