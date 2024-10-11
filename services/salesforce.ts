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
};
