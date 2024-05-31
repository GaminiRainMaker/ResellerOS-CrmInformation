import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, post, patch} from './index';

export const FORMSTACK_API = {
  post: (data: any) => post(API.FORMSTACK.INDEX, data),
  get: () => get(`${API.FORMSTACK.INDEX}`) as Promise<AxiosResponse<any>>,
  getByDocId: (id: number) =>
    get(`${API.FORMSTACK.GETBYDOCID}/${id}`) as Promise<AxiosResponse<any>>,
};
