/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const QUOTEAPI = {
  get: () => get(API.QUOTE.INDEX) as Promise<AxiosResponse<[]>>,
  queryAllManualQuotes: (data: any) =>
    post(API.QUOTE.QueryAllManualQuotes, data) as Promise<AxiosResponse<[]>>,
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
  deleteById: (data: any) =>
    patch(API.QUOTE.DeleteById, data) as Promise<AxiosResponse<any>>,
  updateQuoteStatusById: (data: any) =>
    patch(API.QUOTE.UpdateQuoteStatusById, data) as Promise<AxiosResponse<any>>,
  getQuotesByDateFilter: (data: any) =>
    post(API.QUOTE.GetQuotesByDateFilter, data) as Promise<AxiosResponse<any>>,
  getQuoteByID: (id: number) =>
    get(`${API.QUOTE.GetQuoteByID}/${id}`) as Promise<AxiosResponse<any>>,
  getQuoteByIdForEditQuoteHeader: (id: number) =>
    get(`${API.QUOTE.getQuoteByIdForEditQuoteHeader}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  getQuoteByIdForFormStack: (id: number) =>
    get(`${API.QUOTE.getQuoteByIdForFormStack}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  updateQuoteWithNewlineItemAdd: (id: number) =>
    get(`${API.QUOTE.UpdateQuoteWithNewlineItemAdd}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  updateQuoteJson: (data: any) =>
    post(API.QUOTE.updateQuoteJson, data) as Promise<AxiosResponse<any>>,
  updateQuoteConcern: (data: any) =>
    post(API.QUOTE.ConcernUpdate, data) as Promise<AxiosResponse<any>>,
  getAllQuotesByOrganization: (data: any) =>
    post(API.QUOTE.GetAllQuotesByOrganization, data) as Promise<
      AxiosResponse<any>
    >,
  getQuotesByExistingQuoteFilter: (data: any) =>
    post(API.QUOTE.GetQuotesByExistingQuoteFilter, data) as Promise<
      AxiosResponse<any>
    >,
  updateQuoteCustomerId: (data: any) =>
    patch(API.QUOTE.UpdateQuoteCustomerId, data) as Promise<AxiosResponse<any>>,
  // put: (id: number, data: any) => put(API.QUOTE.INDEX + "/" + id, data),
  // delete: (id: number) => del(API.QUOTE.INDEX + "/" + id),
};
