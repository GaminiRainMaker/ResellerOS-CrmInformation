/* eslint-disable @typescript-eslint/no-explicit-any */
import {API} from './CONSTANTS';
import {post} from './index';

export const AUTH_API = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.AUTH.INDEX, data),
  verify: (data: any) => post(API.AUTH.VERIFY, data),
  SendEmail: (data: any) => post(API.AUTH.SEND_EMAIL, data),
  SendForgotPasswordEmail: (data: any) => post(API.AUTH.Send_Forgot_Password_Email, data),
};
