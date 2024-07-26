import {FormInstance} from 'antd';

export interface OsCustomerSelectInterface {
  setCustomerValue?: any;
  isAddNewCustomer?: boolean;
  isRequired?: boolean;
  customerValue?: any;
  isDisable?: boolean;
}
export interface OsContactSelectInterface {
  customerValue: any;
  isAddNewContact?: boolean;
  form?: FormInstance;
  value?: string;
  name: string;
}
