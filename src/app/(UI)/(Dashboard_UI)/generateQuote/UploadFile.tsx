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

const UploadFile: FC<UploadFileInterface> = ({
  setUploadFileData,
  uploadFileData,
  addInExistingQuote,
  addQuoteLineItem,
  form,
  showSelectFields = true,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // Define your Nanonets API key and endpoint
  const API_KEY = '198c15fd-9680-11ed-82f6-7a0abc6e8cc8';
  const API_ENDPOINT =
    'https://app.nanonets.com/api/v2/OCR/Model/91814dd8-75f6-44d7-aad3-776df449b59f/LabelFile/';

  const sendDataToNanonets = async (base64Data: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString(
            'base64',
          )}`,
          'Content-Type': 'application/pdf',
        },
      });

      if (response) {
        dispatch(uploadToAws({document: base64Data})).then((payload: any) => {
          const pdfUrl = payload?.payload?.data?.Location;
          setUploadFileData((filedData: any) => [
            ...filedData,
            {...response, pdf_url: pdfUrl},
          ]);
        });
      }
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const beforeUpload = (file: File) => {
    convertFileToBase64(file)
      .then((base64String) => {
        sendDataToNanonets(base64String, file);
      })
      .catch((error) => {
        message.error('Error converting file to base64', error);
      });
    return false;
  };

  return (
    <GlobalLoader loading={loading}>
      <OsUpload
        beforeUpload={beforeUpload}
        uploadFileData={uploadFileData}
        setUploadFileData={setUploadFileData}
        setLoading={setLoading}
        loading={loading}
        addInExistingQuote={addInExistingQuote}
        addQuoteLineItem={addQuoteLineItem}
        form={form}
        showSelectFields={showSelectFields}
      />
    </GlobalLoader>
  );
};

export default UploadFile;
