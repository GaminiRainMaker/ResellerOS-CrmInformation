/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const QUOTEAPI = {
  get: () => get(API.QUOTE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.QUOTE.INDEX, data),
  query: (data: any) =>
    post(API.QUOTE.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.QUOTE.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  updateQuoteDraftById: (id: number) =>
    get(`${API.QUOTE.UpdateDraftByID}/${id}`) as Promise<AxiosResponse<any>>,
  updateQuoteCompleteById: (id: number) =>
    get(`${API.QUOTE.UpdateCompleteByID}/${id}`) as Promise<AxiosResponse<any>>,
  updateQuoteByQuery: (data: any) =>
    post(API.QUOTE.UpdateQuoteByQuery, data) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.QUOTE.INDEX, data) as Promise<AxiosResponse<any>>,

  // put: (id: number, data: any) => put(API.QUOTE.INDEX + "/" + id, data),
  // delete: (id: number) => del(API.QUOTE.INDEX + "/" + id),
};
