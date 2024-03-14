import {FormInstance} from 'antd';

export interface OsDistriButorSelectInterface {
  form?: FormInstance;
  name?: string;
  isRequired?: boolean;
  setDistributorValue?: any;
  distributorValue?: string;
  isAddNewDistributor?: boolean;
  label?: boolean;
  height?: number;
  onChange?: any;
  quoteCreation?: boolean;
  oemValue?: number;
}
