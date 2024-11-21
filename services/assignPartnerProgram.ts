/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const ASSIGN_PARTNER_PROGRAM_API = {
  get: () =>
    get(API.ASSIGN_PARTNER_PROGRAM.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.ASSIGN_PARTNER_PROGRAM.INDEX, data),
  updateForTheResellerRequest: (data: any) =>
    post(API.ASSIGN_PARTNER_PROGRAM.updateForTheResellerRequest, data),
  getAllOrgApprovedDataSalesForce: (data: any) =>
    post(API.ASSIGN_PARTNER_PROGRAM.GetAllOrgApprovedDataSalesForce, data),

  query: (data: any) =>
    post(API.ASSIGN_PARTNER_PROGRAM.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.ASSIGN_PARTNER_PROGRAM.INDEX}/${id}`) as Promise<
      AxiosResponse<any>
    >,
  patch: (data: any) =>
    patch(API.ASSIGN_PARTNER_PROGRAM.INDEX, data) as Promise<
      AxiosResponse<any>
    >,
  deleteById: (data: any) =>
    patch(API.ASSIGN_PARTNER_PROGRAM.DeleteById, data) as Promise<
      AxiosResponse<any>
    >,
  updateAssignPartnerProgramById: (data: any) =>
    patch(
      API.ASSIGN_PARTNER_PROGRAM.UpdateAssignPartnerProgramById,
      data,
    ) as Promise<AxiosResponse<any>>,
};
