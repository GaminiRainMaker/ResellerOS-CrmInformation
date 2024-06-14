import {FormInstance} from 'antd';

export interface OsOpportunitySelectInterface {
  form: FormInstance;
  isAddNewOpportunity?: boolean;
  customerValue?: number
  value?: number
  isRequired?: boolean;
  isDisable?: boolean;
}
