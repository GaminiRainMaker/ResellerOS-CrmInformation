/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import { post} from './index';

export const UPLOAD_API = {
  post: (data: any) => post(API.UPLOADAWS.INDEX, data),
};
