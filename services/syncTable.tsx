/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {del, get, patch, post} from './index';

export const SYNCTABLE_API = {
  post: (data: any) => post(API.SYNCTABLE.INDEX, data),
  get: (name:any) => get(`${API.SYNCTABLE.INDEX}/${name}`) as Promise<AxiosResponse<any>>,
  delete: (id: any) =>
    del(`${API.SYNCTABLE.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
