/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import {API} from './CONSTANTS';
import {post} from './index';

export const UPLOAD_API = {
  post: (data: any) => post(API.UPLOADAWS.INDEX, data),
  postIMage: (data: any) => post(API.UPLOADAWS.IMAGE, data),
  uploadExcel: (data: any) => post(API.UPLOADAWS.EXCEL, data),
  uploadImagesOnAzure: (data: any) => post(API.UPLOADAWS.uploadImagesOnAzure, data),
  uploadDocumentTypeDocOnAzure: (data: any) => post(API.UPLOADAWS.uploadDocumentTypeDocOnAzure, data),


};
