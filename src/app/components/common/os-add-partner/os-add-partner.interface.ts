import {FormInstance} from 'antd';

export interface RequestPartnerInterface {
  setOpen: (B: boolean) => void;
  setRequestPartnerLoading: (B: boolean) => void;
  form: FormInstance;
  getPartnerData?: any;
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
  partnerData?: any;
  setPartnerOptions?: any;
  partnerOptions?: any;
  setPartnerValue?: any;
  setFinalProgramOptions?: any;
  finalProgramOptions?: any;
}
