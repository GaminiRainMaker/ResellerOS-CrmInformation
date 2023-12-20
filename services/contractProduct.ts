/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const CONTRACT_PRODUCT_API = {
  get: () => get(API.CONTRACT_PRODUCT.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.CONTRACT_PRODUCT.INDEX, data),
  query: (data: any) =>
    post(API.CONTRACT_PRODUCT.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.CONTRACT_PRODUCT.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  getContractProductByProductCode: (product_code: string) =>
    get(`${API.CONTRACT_PRODUCT.INDEX}/${product_code}`) as Promise<
      AxiosResponse<any>
    >,
  patch: (data: any) =>
    patch(API.CONTRACT_PRODUCT.INDEX, data) as Promise<AxiosResponse<any>>,
};
