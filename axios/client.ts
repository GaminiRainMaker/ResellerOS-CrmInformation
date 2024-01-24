import axios from 'axios';
import {requestInterceptor} from './interceptors/request.interceptor';
import {responseInterceptor} from './interceptors/response.interceptor';

const client = axios.create({
  // baseURL: 'http://localhost:4000',
  // baseURL: 'http://ec2-3-218-195-191.compute-1.amazonaws.com:4000',
  // baseURL: 'https://api.reselleros.com',
  baseURL: 'http://ec2-3-218-195-191.compute-1.amazonaws.com:4000',
  withCredentials: false,
});

client.interceptors.request.use(requestInterceptor);
client.interceptors.response.use(responseInterceptor);

export default client;
