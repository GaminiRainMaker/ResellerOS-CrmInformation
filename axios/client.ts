import axios from 'axios';
import {requestInterceptor} from './interceptors/request.interceptor';
import {
  errorResponseInterceptor,
  responseInterceptor,
} from './interceptors/response.interceptor';

const client = axios.create({
  //Local
  baseURL: 'http://localhost:4000',

  // //Developement
  // baseURL: 'https://3.218.195.191:4000',

  //Production
  // baseURL: 'https://44.206.217.110:4000',

  withCredentials: false,
});

client.interceptors.request.use(requestInterceptor);
client.interceptors.response.use(responseInterceptor, errorResponseInterceptor);

export default client;
