/* eslint-disable no-param-reassign */
import {AxiosResponse} from 'axios';

export const responseInterceptor = (config: AxiosResponse): AxiosResponse => {
  const {headers} = config;
  if (headers?.location) {
    const loc = headers.location.split('/');
    config.data = {id: loc[loc.length - 1]};
  }
  return config;
};
