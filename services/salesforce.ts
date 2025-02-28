/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch, del} from './index';

export const SALESFORCE_API = {
  createSalesForcePartner: (data: any) =>
    post(API.SALESFORCE.CreateSalesForcePartner, data) as Promise<
      AxiosResponse<[]>
    >,
  createSalesForcePartnerProgram: (data: any) =>
    post(API.SALESFORCE.CreateSalesForcePartnerProgram, data) as Promise<
      AxiosResponse<[]>
    >,
  createSalesForceDealreg: (data: any) =>
    post(API.SALESFORCE.CreateSalesForceDealreg, data) as Promise<
      AxiosResponse<[]>
    >,
  getSalesForceDealregByOpportunityId: (data: any) =>
    post(API.SALESFORCE.GetSalesForceDealregByOpportunityId, data) as Promise<
      AxiosResponse<any>
    >,
  getSalesForceDealregById: (data: any) =>
    post(API.SALESFORCE.GetSalesForceDealregById, data) as Promise<
      AxiosResponse<any>
    >,
  updateSalesForceDealregById: (data: any) =>
    post(API.SALESFORCE.UpdateSalesForceDealregById, data) as Promise<
      AxiosResponse<any>
    >,
  getSalesForcePartnerCredentials: (data: any) =>
    post(API.SALESFORCE.GetSalesForcePartnerCredentials, data) as Promise<
      AxiosResponse<any>
    >,
  getSalesForceActivePartners: (data: any) =>
    post(API.SALESFORCE.GetSalesForceActivePartners, data) as Promise<
      AxiosResponse<any>
    >,
  updatePartnersandProgramIdFromFS: (data: any) =>
    post(API.SALESFORCE.UpdatePartnersandProgramIdFromFS, data) as Promise<
      AxiosResponse<any>
    >,
};
