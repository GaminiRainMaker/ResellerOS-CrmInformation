/* eslint-disable @typescript-eslint/no-explicit-any */
import {API} from './CONSTANTS';
import {post, get} from './index';

export const AUTH_API = {
  // get: () => get(API.BUNDLE.INDEX) as Promise<AxiosResponse<[]>>,
  post: (data: any) => post(API.AUTH.INDEX, data),
  verify: (data: any) => post(API.AUTH.VERIFY, data),
  SendEmail: (data: any) => post(API.AUTH.SEND_EMAIL, data),
  SendForgotPasswordEmail: (data: any) =>
    post(API.AUTH.Send_Forgot_Password_Email, data),
  ContactSales: (data: any) => post(API.AUTH.Contact_Sales, data),
  get: () => get(API.AUTH.salesforceFileGet),
  postSalesGet: (data: any) => post(API.AUTH.salesforceFileGet, data),
  getAsItIs: (data: any) => post(API.AUTH.salesforceDataAsItIs, data),
  addUpdateSales: (data: any) => post(API.AUTH.salesforceAddUpdate, data),
};
