import {FormInstance} from 'antd';

export interface OsOemSelectInterface {
  form?: FormInstance;
  name?: string;
  isRequired?: boolean;
  setOemValue?: any;
  oemValue?: string;
  isAddNewOem?: boolean;
}
