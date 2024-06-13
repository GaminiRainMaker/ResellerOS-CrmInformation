export interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined;
  };
}
export interface AddQuoteInterface {
  setUploadFileData: any;
  uploadFileData: any;
  loading?: boolean;
  buttonText: string;
  uploadForm?: any;
  setShowToggleTable?: any;
  showToggleTable?: boolean;
  isGenerateQuote?: boolean;
  Quotecolumns?: any;
  existingGenerateQuoteId?: number;
  quoteDetails?: any;
}
