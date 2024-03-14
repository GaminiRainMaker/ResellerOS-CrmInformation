import {FormInstance} from 'antd';

export interface FormDataProps {
  file_name: string;
  opportunity: string;
  customer_name: string;
}

export interface InputDetailTabInterface {
  tableColumnDataShow: any;
  setIsDeleteInputDetailModal: (B: boolean) => void;
  isDeleteInputDetailModal: boolean;
  setFinalInputColumn: any;
  finalInputColumn: any;
  selectedFilter?: string;
  familyFilter?: any;
  setFamilyFilter?: any;
  setSelectedRowIds?: any;
  selectTedRowIds?: any;
  setQuoteLineItemExist?: any;
}

export interface UploadFileInterface {
  setUploadFileData?: any;
  uploadFileData?: any;
  addInExistingQuote?: boolean;
  addQuoteLineItem?: any;
  form?: FormInstance;
  showSelectFields?: boolean;
  beforeUpload?: any;
}
