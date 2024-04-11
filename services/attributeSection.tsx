/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const ATTRIBUTE_SECTION_API = {
  get: () => get(API.ATTRIBUTE_SECTION.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.ATTRIBUTE_SECTION.INDEX, data),
  query: (data: any) =>
    post(API.ATTRIBUTE_SECTION.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.ATTRIBUTE_SECTION.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.ATTRIBUTE_SECTION.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (data: any) =>
    patch(API.ATTRIBUTE_SECTION.DeleteById, data) as Promise<
      AxiosResponse<any>
    >,
  updateAttributeSectionById: (data: any) =>
    patch(API.ATTRIBUTE_SECTION.UpdateAttributeSectionById, data) as Promise<
      AxiosResponse<any>
    >,
};
