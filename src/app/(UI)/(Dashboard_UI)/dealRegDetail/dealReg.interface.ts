import {FormInstance} from 'antd';

export interface AttributeData {
  id: number;
  is_deleted: boolean;
  name: string | null;
  label: string;
  data_type: string;
  order: number;
  map_from: string;
  map_to: string;
  help_text: string;
  attribute_section_id: number;
  is_active: boolean;
  is_view: boolean;
  is_required: boolean;
  createdAt: string;
  updatedAt: string;
  AttributeSection: {
    id: number;
    is_deleted: boolean;
    name: string;
    order: number;
    is_active: boolean;
    is_view: boolean;
    is_required: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface TransformedChild {
  [x: string]: any;
  id: number;
  label: string;
  data_type: string;
  help_text: string;
  is_active: boolean;
  is_deleted: boolean;
  is_required: boolean;
  is_view: boolean;
  map_from: string;
  map_to: string;
  name: string | null;
  order: number;
  value?: any;
}

export interface TransformedData {
  title: string;
  children: TransformedChild[];
}

export interface CommonFieldsProps {
  form: FormInstance;
  activeKey: string;
  handleBlur: () => void;
  formData: any;
}
export interface UniqueFieldsProps {
  data: any;
  form: FormInstance;
  activeKey: string;
  handleBlur: () => void;
  formData: any;
}

export interface SeparatedData {
  [opportunityId: number]: {
    opportunity_id: number;
    dealReg_id: number;
    contact_id: number;
    customer_id: number;
    data: any[];
    title: string;
  };
}
