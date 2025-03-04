import {FormInstance} from 'antd';

export interface CustomerAccountInterface {
  onFinish: any;
  drawer?: boolean;
  form: FormInstance;
  customerValue?: number;
  setCustomerValue?: any;
  isDealregForm?: boolean;
}
