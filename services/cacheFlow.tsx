/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get} from './index';

export const CACHE_FLOW = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  get: () => get(API.CACHEFLOW.INDEX),
  getByCusId: (id: number) =>
    get(`${API.CACHEFLOW.GETBYID}/${id}`) as Promise<AxiosResponse<any>>,
  getProposalBySub: (id: number) =>
    get(`${API.CACHEFLOW.ProposalSub}/${id}`) as Promise<AxiosResponse<any>>,
};
