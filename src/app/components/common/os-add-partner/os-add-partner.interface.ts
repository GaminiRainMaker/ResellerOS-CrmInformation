import {FormInstance} from 'antd';

export interface RequestPartnerInterface {
  setOpen: (B: boolean) => void;
  setRequestPartnerLoading: (B: boolean) => void;
  form: FormInstance;
  getPartnerData?: any;
  partnerProgramNewId?: any;
  setPartnerProgramNewId?: any;
  partnerNewId?: any;
  setPartnerNewId?: any;
  setShowModal?: any;
}
export interface AddPartnerInterface {
  setPartnerNewId?: any;
  setPartnerProgramNewId?: any;
  setOpen?: (B: boolean) => void;
  form: FormInstance;
  drawer?: boolean;
  formPartnerData?: any;
  partnerId?: number;
  setUpdateTheObject?: any;
  updateTheObject?: any;
  getPartnerDataForSuperAdmin?: any;
  partnerData?: any;
  setPartnerOptions?: any;
  partnerOptions?: any;
  setPartnerValue?: any;
  setFinalProgramOptions?: any;
  finalProgramOptions?: any;
}
