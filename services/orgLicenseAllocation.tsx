import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const ORG_LICENSE_API = {
  post: (data: any) => post(API.ORG_LICENSE.INDEX, data),
  patch: (data: any) =>
    patch(API.ORG_LICENSE.INDEX, data) as Promise<AxiosResponse<any>>,
  query: (data: any) =>
    post(API.ORG_LICENSE.QUERY, data) as Promise<AxiosResponse<any>>,
  revokeLicense: (data: any) =>
    post(API.ORG_LICENSE.REVOKE, data) as Promise<AxiosResponse<any>>,
  allocateLicensesToOrg: (data: any) =>
    post(API.ORG_LICENSE.AllocateLicensesToOrg, data) as Promise<AxiosResponse<any>>,
  checkAvailableLicenses: (data: any) =>
    post(API.ORG_LICENSE.CheckAvailableLicenses, data) as Promise<AxiosResponse<any>>,
  CheckQuoteAIAccess: (data: any) =>
    post(API.ORG_LICENSE.CheckQuoteAIAccess, data) as Promise<AxiosResponse<any>>,
  Activate_Trail_Phase: (data: any) =>
    post(API.ORG_LICENSE.ActivateTrailPhase, data) as Promise<AxiosResponse<any>>,
  getActiveLicensesByOrgUserId: (data: any) =>
    post(API.ORG_LICENSE.getActiveLicensesByOrgUserId, data) as Promise<
      AxiosResponse<any>
    >,
};
