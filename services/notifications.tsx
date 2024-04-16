/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {get, patch, post} from './index';

export const NOTIFICATIONS_API = {
  get: () => get(`${API.NOTIFICATION.INDEX}`) as Promise<AxiosResponse<any>>,
  getNEWNotifications: () =>
    get(`${API.NOTIFICATION.NEWNOTIFICATION}`) as Promise<AxiosResponse<any>>,
  delete: () =>
    get(`${API.NOTIFICATION.DeleteById}`) as Promise<AxiosResponse<any>>,
};
