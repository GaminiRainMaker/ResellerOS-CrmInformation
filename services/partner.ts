/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const PARTNER_API = {
  get: () => get(API.PARTNER.INDEX) as Promise<AxiosResponse<[]>>,
  getAllPartnerandProgramApprovedDataSalesForce: () =>
    get(API.PARTNER.GetAllPartnerandProgramApprovedDataSalesForce) as Promise<
      AxiosResponse<[]>
    >,
  post: (data: any) => post(API.PARTNER.INDEX, data),
  query: (data: any) =>
    post(API.PARTNER.QUERY, data) as Promise<AxiosResponse<[]>>,
  getById: (id: number) =>
    get(`${API.PARTNER.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.PARTNER.INDEX, data) as Promise<AxiosResponse<any>>,
  deleteById: (data: any) =>
    patch(API.PARTNER.DeleteById, data) as Promise<AxiosResponse<any>>,
  updatePartnerById: (data: any) =>
    patch(API.PARTNER.UpdatePartnerById, data) as Promise<AxiosResponse<any>>,
  getAllPartnerTemp: () =>
    get(API.PARTNER.GetAllPartnerTemp) as Promise<AxiosResponse<[]>>,
  getAllPartnerandProgram: () =>
    get(API.PARTNER.getAllPartnerandProgram) as Promise<AxiosResponse<[]>>,
  filterData: (data: any) =>
    post(API.PARTNER.filterData, data) as Promise<AxiosResponse<[]>>,
  filterDataAdmin: (data: any) =>
    post(API.PARTNER.filterDataAdmin, data) as Promise<AxiosResponse<[]>>,
  approvedForOrg: (data: any) =>
    post(API.PARTNER.approvedForOrg, data) as Promise<AxiosResponse<[]>>,
  ApprovedForOrgSalesForce: (data: any) =>
    post(API.PARTNER.approvedForOrgSalesForce, data) as Promise<
      AxiosResponse<[]>
    >,
  CanAddedToOrg: (data: any) =>
    post(API.PARTNER.CanAddedToOrg, data) as Promise<AxiosResponse<[]>>,
  getAllPartnerandProgramFilterDataForOrganizationOnly: (data: any) =>
    post(
      API.PARTNER.GetAllPartnerandProgramFilterDataForOrganizationOnly,
      data,
    ) as Promise<AxiosResponse<[]>>,
  upadteRequestForOrgNewPartnerApproval: (data: any) =>
    post(API.PARTNER.upadteRequestForOrgNewPartnerApproval, data) as Promise<
      AxiosResponse<[]>
    >,
  getAllPartnerById: (data: any) =>
    post(API.PARTNER.GetAllPartnerById, data) as Promise<AxiosResponse<[]>>,
  getAllApprovedPartnerForQuoteConfiq: (data: any) =>
    post(API.PARTNER.getAllApprovedPartnerForQuoteConfiq, data) as Promise<
      AxiosResponse<[]>
    >,
  getAllApprovedPartnerFoFormulas: (data: any) =>
    post(API.PARTNER.getAllApprovedPartnerFoFormulas, data) as Promise<
      AxiosResponse<[]>
    >,
};
