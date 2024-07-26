import {FormInstance} from 'antd';

export interface RequestPartnerInterface {
  setOpen: (B: boolean) => void;
  setRequestPartnerLoading: (B: boolean) => void;
  form: FormInstance;
}
export interface AddPartnerInterface {
  setOpen?: (B: boolean) => void;
  form: FormInstance;
  drawer?: boolean;
  formPartnerData?: any;
  partnerId?: number;
  setUpdateTheObject?: any;
  updateTheObject?: any;
  getAllPartnerData?: any;
}
