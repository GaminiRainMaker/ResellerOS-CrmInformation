/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch, del} from './index';

export const SALESFORCE_CREDENTIALS_API = {
  addSalesForceCredentials: (data: any) =>
    post(API.SALESFORCE_CREDENTIALS.INDEX, data) as Promise<AxiosResponse<[]>>,
  queryAddSalesForceCredentials: (data: any) =>
    post(
      API.SALESFORCE_CREDENTIALS.QueryAddSalesForceCredentials,
      data,
    ) as Promise<AxiosResponse<[]>>,
  updatesalesForceCredentialsId: (data: any) =>
    patch(API.SALESFORCE_CREDENTIALS.INDEX, data) as Promise<AxiosResponse<[]>>,

  updateSalesForceSSOLogin: (data: any) =>
    patch(API.SALESFORCE_CREDENTIALS.UpdateSalesForceSSOLogin, data) as Promise<AxiosResponse<[]>>,

  deleteSalesForceCredentials: (data: any) =>
    post(API.SALESFORCE_CREDENTIALS.DeleteSalesForceCredentials, data) as Promise<AxiosResponse<any>>,
};
