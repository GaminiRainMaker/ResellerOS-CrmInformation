/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

'use client';

import {FC, useState} from 'react';

import GlobalLoader from '@/app/components/common/os-global-loader';
import OsUpload from '@/app/components/common/os-upload';
import {message} from 'antd';
import axios from 'axios';
import {convertFileToBase64} from '@/app/utils/base';
import {uploadToAws} from '../../../../../redux/actions/upload';
import {useAppDispatch} from '../../../../../redux/hook';
import {UploadFileInterface} from './generateQuote.interface';

interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined;
  };
}
const UploadFile: FC<UploadFileInterface> = ({
  setUploadFileData,
  uploadFileData,
  addInExistingQuote,
  addQuoteLineItem,
  form,
  showSelectFields = true,
  beforeUpload,
}) => (
  <OsUpload
    beforeUpload={beforeUpload}
    uploadFileData={uploadFileData}
    setUploadFileData={setUploadFileData}
    addInExistingQuote={addInExistingQuote}
    addQuoteLineItem={addQuoteLineItem}
    form={form}
    showSelectFields={showSelectFields}
  />
);

export default UploadFile;
