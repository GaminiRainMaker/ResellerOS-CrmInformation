import {FormInstance} from 'antd';

export interface FormBuilderInterFace {
  isOpenDrawer: boolean;
  setIsOpenDrawer?: (B: Boolean) => void;
  sectionIndex?: number | string;
  contentIndex?: number | string;
  setCartItems?: any;
  cartItems?: any;
  form: FormInstance;
  typeFiled?: string;
  setColumnData?: any;
  columnData?: any;
  selectedColumnIndex?: number;
}

export interface FormUploadInterface {
  setCollapsed?: any;
}
export interface PreviewFormBuilder {
  cartItems?: any;
}
