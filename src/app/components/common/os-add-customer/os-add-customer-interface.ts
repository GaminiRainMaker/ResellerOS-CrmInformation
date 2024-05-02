import {FormInstance} from 'antd';

export interface AddCustomertInterface {
  drawer?: boolean;
  form: FormInstance;
  onFinish: any;
}
export interface CustomerAccountInterface {
  formValue?: any;
  setFormValue?: any;
  setCustomerValue?: any;
  customerValue?: any;
  setShowModal?: any;
  drawer?: any;
  setOpen?: any;
}
