import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post} from './index';

export const CONTRACT_CONFIGURATION_API = {
  post: (data: any) => post(API.CONTRACT_CONFIGURATION.INDEX, data),
  get: () =>
    get(`${API.CONTRACT_CONFIGURATION.INDEX}`) as Promise<AxiosResponse<any>>,
};
