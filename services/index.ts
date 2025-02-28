/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosRequestConfig} from 'axios';
import client from '../axios/client';

export const get = (url: string, config?: AxiosRequestConfig) =>
  client.get(url, config);

export const post = (url: string, payload: any) => client.post(url, payload);

export const put = (url: string, payload: any) => client.put(url, payload);

export const patch = (url: string, payload: any) => client.patch(url, payload);

export const del = (url: string) => client.delete(url);

export const head = (url: string) => client.head(url);
