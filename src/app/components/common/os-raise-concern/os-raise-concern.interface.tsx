import {FormInstance} from 'antd';

export interface RaiseConcernInterface {
  form?: FormInstance;
  onClick?: any;
  title: string;
  description: string;
  image?: any;
}
