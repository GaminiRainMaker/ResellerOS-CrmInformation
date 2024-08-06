/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const NOTIFICATIONS_API = {
  post: (data: any) => post(API.NOTIFICATION.INDEX, data),
  get: () => get(`${API.NOTIFICATION.INDEX}`) as Promise<AxiosResponse<any>>,
  delete: () =>
    get(`${API.NOTIFICATION.DeleteById}`) as Promise<AxiosResponse<any>>,

  getRecentNotifications: () =>
    get(`${API.NOTIFICATION.GetRecentNotifications}`) as Promise<
      AxiosResponse<any>
    >,
  getEarlierNotifications: () =>
    get(`${API.NOTIFICATION.GetEarlierNotifications}`) as Promise<
      AxiosResponse<any>
    >,
};
