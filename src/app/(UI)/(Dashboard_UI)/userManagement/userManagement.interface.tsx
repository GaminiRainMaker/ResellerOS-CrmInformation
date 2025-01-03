import {FormInstance} from 'antd';

export interface UserManagementInterface {
  form: FormInstance;
  onFinish: any;
  selectedRowRecord?: any;
  activeKey: string;
  setActiveKey: (s: string) => void;
}
