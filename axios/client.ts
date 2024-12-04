import axios from 'axios';
import {requestInterceptor} from './interceptors/request.interceptor';
import {
  errorResponseInterceptor,
  responseInterceptor,
} from './interceptors/response.interceptor';

const client = axios.create({
  //Developement
  // baseURL: 'https://api-dev.reselleros.com',
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,

  withCredentials: false,
});

client.interceptors.request.use(requestInterceptor);
client.interceptors.response.use(responseInterceptor, errorResponseInterceptor);

export default client;
