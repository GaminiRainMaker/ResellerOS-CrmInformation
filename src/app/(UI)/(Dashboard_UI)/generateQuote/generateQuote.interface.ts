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
}
