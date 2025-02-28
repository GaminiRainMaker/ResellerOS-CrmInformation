/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post} from './index';

export const CONTRACTSETTING_API = {
  post: (data: any) => post(API.CONTRACTSETTING_API.INDEX, data),
  get: () => get(`${API.CONTRACTSETTING_API.INDEX}`) as Promise<AxiosResponse<any>>,
};
