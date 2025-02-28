import {FormInstance} from 'antd';

export interface OsAddAddressInterface {
  form: FormInstance;
  activeKey: string;
  drawer?: boolean;
  setActiveKey: (b: string) => void;
  onFinish: (p: any) => void;
  recordData?: any;
}
