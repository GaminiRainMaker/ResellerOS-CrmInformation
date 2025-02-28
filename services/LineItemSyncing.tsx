import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const LINEITEM_SYNCING_API = {
  post: (data: any) => post(API.LINEITEM_SYNCING.INDEX, data),
  SalesForceAdd: (data: any) => post(API.LINEITEM_SYNCING.SalesForceAdd, data),
  patch: (data: any) =>
    patch(API.LINEITEM_SYNCING.INDEX, data) as Promise<AxiosResponse<any>>,
  getById: (id: number) =>
    get(`${API.LINEITEM_SYNCING.GetLineItemSyncingById}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  get: () =>
    get(`${API.LINEITEM_SYNCING.INDEX}`) as Promise<AxiosResponse<any>>,
  query: (data: any) =>
    post(API.LINEITEM_SYNCING.QUERY, data) as Promise<AxiosResponse<any>>,
  deleteById: (data: any) =>
    post(API.LINEITEM_SYNCING.DeleteLineItemSyncingById, data) as Promise<
      AxiosResponse<any>
    >,
  SalesForceGet: (data: any) =>
    post(API.LINEITEM_SYNCING.SalesForceGet, data) as Promise<
      AxiosResponse<any>
    >,
  postManual: (data: any) =>
    post(API.LINEITEM_SYNCING.postManual, data) as Promise<AxiosResponse<any>>,
  updateLineItemSyncingByIdForAsssert: (data: any) =>
    post(API.LINEITEM_SYNCING.updateLineItemSyncingByIdForAsssert, data) as Promise<AxiosResponse<any>>,
};
