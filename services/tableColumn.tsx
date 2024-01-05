/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch} from './index';

export const TABLE_COLUMN_API = {
  get: () => get(`${API.TABLECOLUMN.INDEX}`) as Promise<AxiosResponse<any>>,
  patch: (data: any) =>
    patch(API.TABLECOLUMN.INDEX, data) as Promise<AxiosResponse<any>>,
};
