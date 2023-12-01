import {FormInstance} from 'antd';

export interface AuthLayoutInterface {
  heading: string;
  description: string;
  username?: boolean;
  email?: boolean;
  password?: boolean;
  alreadyAmember?: boolean;
  registerNow?: boolean;
  rememberPassword?: boolean;
  form?: FormInstance;
  onClick?: any;
  buttonText: string;
  inputFields?: any;
}
