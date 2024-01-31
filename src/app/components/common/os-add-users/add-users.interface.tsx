import {FormInstance} from 'antd/es/form';

type UserData = {
  name: string;
  email: string;
  isAdmin: boolean;
};

export interface OsAdduser {
  isDrawer?: boolean;
  userData?: UserData;
  onFinish?: any;
  form: FormInstance;
}
