/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const ATTRIBUTE_FIELD_API = {
  get: () => get(API.ATTRIBUTE_FIELD.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.ATTRIBUTE_FIELD.INDEX, data),
  query: (data: any) =>
    post(API.ATTRIBUTE_FIELD.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.ATTRIBUTE_FIELD.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.ATTRIBUTE_FIELD.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (data: any) =>
    patch(API.ATTRIBUTE_FIELD.DeleteById, data) as Promise<AxiosResponse<any>>,
  updateAttributeFieldById: (data: any) =>
    patch(API.ATTRIBUTE_FIELD.UpdateAttributeFieldById, data) as Promise<
      AxiosResponse<any>
    >,
};
