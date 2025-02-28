import {FormInstance} from 'antd';

export interface OsPartnerProgramSelectInterface {
  organizationName?: string;
  form: FormInstance;
  name?: string;
  value?: number;
  partnerId?: number;
  isRequired?: boolean;
  isAddNewProgram?: boolean;
  notApprovedData?: boolean;
  allPartnerData?: any;
}
