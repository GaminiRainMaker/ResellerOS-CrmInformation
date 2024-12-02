import axios from 'axios';
import {requestInterceptor} from './interceptors/request.interceptor';
import {
  errorResponseInterceptor,
  responseInterceptor,
} from './interceptors/response.interceptor';

const client = axios.create({
  //Local
  // baseURL: 'http://localhost:4000',

  //Developement
  baseURL: 'https://api-dev.reselleros.com',

  //Production
  // baseURL: 'https://api.reselleros.com',

  // Azure Deployed

  // baseURL: 'https://dev-api.reselleros.com',

  withCredentials: false,
});

client.interceptors.request.use(requestInterceptor);
client.interceptors.response.use(responseInterceptor, errorResponseInterceptor);

export default client;
