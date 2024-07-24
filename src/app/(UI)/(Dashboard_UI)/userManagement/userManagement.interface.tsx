import {FormInstance} from 'antd';

export interface UserManagementInterface {
  form: FormInstance;
  onFinish: any;
  organizationCurrent?:string
}
