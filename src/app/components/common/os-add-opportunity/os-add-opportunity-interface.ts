import {FormInstance} from 'antd';

export interface AddOpportunityInterface {
  onFinish?: any;
  drawer?: boolean;
  form?: FormInstance;
  customerValue?: number;
  setCustomerValue?: any;
  showCustomerSelect?: boolean;
  stageValue?: string;
}
