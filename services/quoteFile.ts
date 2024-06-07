/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const QUOTE_FILE_API = {
  get: () => get(`${API.QUOTE_FILE.INDEX}`) as Promise<AxiosResponse<any>>,
  post: (data: any) => post(API.QUOTE_FILE.INDEX, data),
  postJson: (data: any) => post(API.QUOTE_FILE.postJson, data),
  patch: (data: any) =>
    patch(API.QUOTE_FILE.INDEX, data) as Promise<AxiosResponse<any>>,
  query: (data: any) =>
    post(API.QUOTE_FILE.QUERY, data) as Promise<AxiosResponse<[]>>,
  delete: (data: any) =>
    post(API.QUOTE_FILE.DeleteById, data) as Promise<AxiosResponse<[]>>,
  updateQuoteFileById: (data: any) =>
    patch(API.QUOTE_FILE.UpdateQuoteFileById, data) as Promise<
      AxiosResponse<[]>
    >,
  getQuoteFileByQuoteId: (id: number) =>
    get(`${API.QUOTE_FILE.GetQuoteFileByQuoteId}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  getQuoteFileById: (id: number) =>
    get(`${API.QUOTE_FILE.GetQuoteFileById}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  getQuoteFileByQuoteIdAll: (id: number) =>
    get(`${API.QUOTE_FILE.getQuoteFileByQuoteIdAll}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  quoteFileVerification: (data: any) =>
    patch(API.QUOTE_FILE.QuoteFileVerification, data) as Promise<
      AxiosResponse<any>
    >,
};
