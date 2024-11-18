/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const PRODUCT_API = {
  get: () => get(API.PRODUCT.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.PRODUCT.INDEX, data),
  getBulkProduct: (data: any) => post(API.PRODUCT.GETBULK, data),
  postBulk: (data: any) => post(API.PRODUCT.BULKINSERT, data),
  query: (data: any) =>
    post(API.PRODUCT.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.PRODUCT.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  getProductByPartNo: (part_no: any) =>
    get(`${API.PRODUCT.GetProductByPartNo}/${part_no}`) as Promise<
      AxiosResponse<any>
    >,
  patch: (data: any) =>
    patch(API.PRODUCT.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (data: any) =>
    patch(API.PRODUCT.DeleteById, data) as Promise<AxiosResponse<any>>,
  updateProductById: (data: any) =>
    patch(API.PRODUCT.UpdateProductById, data) as Promise<AxiosResponse<any>>,
  getAllProductContract: (data: any) =>
    post(API.PRODUCT.ProductForContract, data) as Promise<AxiosResponse<any>>,
  // getAllProductContract: (data: any) =>
  //   post(API.PRODUCT.ProductForContract, data) as Promise<AxiosResponse<[]>>,
};
