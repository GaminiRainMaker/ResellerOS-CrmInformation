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

export interface EditableFiledsCommonInterface {
  sectionIndex?: number | string;
  cartItems?: any;
  contentIndex?: number | string;
  setCartItems?: any;
  form?: FormInstance;
  selectedColumnIndex?: number;
}

export interface FormBuilderInterFaceMain {
  setCartItems?: any;
  cartItems?: any;
  form: FormInstance;
  setSectionIndexActive?: any;
  setOpenPreviewModal?: any;
  openPreviewModal?: any;
  setCollapsed?: any;
  setActiveContentIndex?: any;
  setActiveSectionIndex?: any;
  setSelectedColumnIndex?: any;
  setContentActiveIndex?: any;
  previewFile?: any;
}
