/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post} from './index';

export const GENERALSETTING_API = {
  post: (data: any) => post(API.GENERALSETTING.INDEX, data),
  get: () => get(`${API.GENERALSETTING.INDEX}`) as Promise<AxiosResponse<any>>,
};
