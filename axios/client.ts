import axios from 'axios';
import {requestInterceptor} from './interceptors/request.interceptor';
import {responseInterceptor} from './interceptors/response.interceptor';

const client = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: false,
});

client.interceptors.request.use(requestInterceptor);
client.interceptors.response.use(responseInterceptor);

export default client;
