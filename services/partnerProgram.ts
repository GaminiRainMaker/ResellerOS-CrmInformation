/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const PARTNER_PROGRAM_API = {
  get: () => get(API.PARTNER_PROGRAM.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.PARTNER_PROGRAM.INDEX, data),
  query: (data: any) =>
    post(API.PARTNER_PROGRAM.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.PARTNER_PROGRAM.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.PARTNER_PROGRAM.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (data: any) =>
    patch(API.PARTNER_PROGRAM.DeleteById, data) as Promise<AxiosResponse<any>>,
  updatePartnerProgramById: (data: any) =>
    patch(API.PARTNER_PROGRAM.UpdatePartnerProgramById, data) as Promise<
      AxiosResponse<any>
    >,
  getPartnerProgramById: (id: number) =>
    get(`${API.PARTNER_PROGRAM.GetPartnerProgramById}/${id}`) as Promise<
      AxiosResponse<any>
    >,
};
