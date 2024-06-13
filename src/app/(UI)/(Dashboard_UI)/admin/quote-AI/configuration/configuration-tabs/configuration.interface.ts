export interface RowData {
  key: string;
  serialNumber: string;
  fieldName: string;
  operator: string;
  valueType: string;
  value: string;
}

export interface StatusFileProps {
  initialData?: any;
  contractStatus?: string;
  customLogic?: string;
  customInputLogic?: string;
  isActive?: boolean;
}
