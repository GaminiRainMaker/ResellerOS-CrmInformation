/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

'use client';

import {FC} from 'react';

import OsUpload from '@/app/components/common/os-upload';

import {UploadFileInterface} from './generateQuote.interface';

const UploadFile: FC<UploadFileInterface> = ({
  setUploadFileData,
  uploadFileData,
  addInExistingQuote,
  addQuoteLineItem,
  form,
  showSelectFields = true,
  beforeUpload,
  cardLoading
}) => (
  <OsUpload
    beforeUpload={beforeUpload}
    uploadFileData={uploadFileData}
    setUploadFileData={setUploadFileData}
    addInExistingQuote={addInExistingQuote}
    addQuoteLineItem={addQuoteLineItem}
    form={form}
    showSelectFields={showSelectFields}
    cardLoading={cardLoading}
  />
);

export default UploadFile;
