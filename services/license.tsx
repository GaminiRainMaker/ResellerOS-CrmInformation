import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const LICENSE_API = {
  post: (data: any) => post(API.LICENSE.INDEX, data),
  patch: (data: any) =>
    patch(API.LICENSE.INDEX, data) as Promise<AxiosResponse<any>>,
  query: (data: any) =>
    post(API.LICENSE.QUERY, data) as Promise<AxiosResponse<any>>,
  revokeLicense: (data: any) =>
    post(API.LICENSE.REVOKE, data) as Promise<AxiosResponse<any>>,
  assignLicense: (data: any) =>
    post(API.LICENSE.REVOKE, data) as Promise<AxiosResponse<any>>,
  getLicenseCount: (data: any) =>
    post(API.LICENSE.Get_LICENSE_Count, data) as Promise<AxiosResponse<any>>,
  CheckQuoteAIAccess: (data: any) =>
    post(API.LICENSE.CheckQuoteAIAccess, data) as Promise<AxiosResponse<any>>,
  Activate_Trail_Phase: (data: any) =>
    post(API.LICENSE.ActivateTrailPhase, data) as Promise<AxiosResponse<any>>,
  getActiveLicensesByOrg: (data: any) =>
    post(API.LICENSE.GetActiveLicensesByOrg, data) as Promise<AxiosResponse<any>>,
};
