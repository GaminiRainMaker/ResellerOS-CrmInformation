import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const MAPPED_OPTIONS_API = {
  post: (data: any) => post(API.MAPPED_OPTIONS.INDEX, data),
  patch: (data: any) =>
    patch(API.MAPPED_OPTIONS.INDEX, data) as Promise<AxiosResponse<any>>,
  getById: (id: number) =>
    get(`${API.MAPPED_OPTIONS.getMappedOptionById}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  query: (data: any) =>
    post(API.MAPPED_OPTIONS.QUERY, data) as Promise<AxiosResponse<any>>,
  deleteById: (data: any) =>
    post(API.MAPPED_OPTIONS.deleteMappedOption, data) as Promise<
      AxiosResponse<any>
    >,
};
