import {FormLayout} from 'antd/es/form/Form';

export interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined;
  };
}
export interface AddQuoteInterface {
  setUploadFileData: any;
  existingQuoteId?: number;
  uploadFileData: any;
  loading: boolean;
  buttonText: string;
  uploadForm?: any;
}
