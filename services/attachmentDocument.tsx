/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const ATTACHMENTDOCUMENT_API = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.ATTACHMENTDOCUMENT.INDEX, data),
  get: (id: any) =>
    get(`${API.ATTACHMENTDOCUMENT.INDEX}/${id}`) as Promise<AxiosResponse<any>>,
};
