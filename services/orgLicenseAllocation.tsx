import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const ORG_LICENSE_API = {
  allocateLicensesToOrg: (data: any) =>
    post(API.ORG_LICENSE.AllocateLicensesToOrg, data) as Promise<
      AxiosResponse<any>
    >,
  checkAvailableLicenses: (data: any) =>
    post(API.ORG_LICENSE.CheckAvailableLicenses, data) as Promise<
      AxiosResponse<any>
    >,
};
