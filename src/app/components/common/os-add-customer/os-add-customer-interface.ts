import {FormInstance} from 'antd';

export interface AddCustomertInterface {
  drawer?: boolean;
  form: FormInstance;
  onFinish: any;
  objectValuesForContact: any;
  setObjectValueForContact: any;
  contactDetail?:any;
  setContactDetail?:any;
  shipppingAddress?:any
  setShippingAddress?:any
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
