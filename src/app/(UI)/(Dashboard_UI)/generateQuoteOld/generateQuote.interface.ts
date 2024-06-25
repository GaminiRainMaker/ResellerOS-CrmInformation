import {FormInstance} from 'antd';
import {Dispatch, SetStateAction} from 'react';

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
  setActiveTab?: any;
  activeTab?: any;
  setCountOFFiles?: any;
  countOfFiles?: any;
}

export interface UploadFileInterface {
  setUploadFileData?: any;
  uploadFileData?: any;
  addInExistingQuote?: boolean;
  addQuoteLineItem?: any;
  form?: FormInstance;
  showSelectFields?: boolean;
  beforeUpload?: any;
  cardLoading?: boolean;
  rowSelection?: boolean;
  setShowToggleTable?: any;
  showToggleTable?: boolean;
  Quotecolumns?: any;
  existingQuoteId?: number;
}

export interface UpdateLineItemsInterFace {
  setProfabilityUpdationState: Dispatch<
    SetStateAction<
      {
        id: number;
        value: string | number;
        field: string | null;
        label: string;
      }[]
    >
  >;
  profabilityUpdationState: {
    id: number;
    value: string | number;
    field: string | null;
    label: string;
  }[];
  tableColumnDataShow: any;
}
