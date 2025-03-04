import {FormInstance} from 'antd';

export interface UserProfileInterface {
  form: FormInstance;
  onFinish: any;
  isEditable: boolean;
}
