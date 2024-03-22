export interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined;
  };
}
export interface AddQuoteInterface {
  setUploadFileData: any;
  existingQuoteId?: number;
  uploadFileData: any;
  loading?: boolean;
  buttonText: string;
  uploadForm?: any;
  rowSelection?: any;
  setShowToggleTable?: any;
  showToggleTable?: boolean;
  Quotecolumns?: any;
}
