'use client';

import {FC, useState} from 'react';

import OsUpload from '@/app/components/common/os-upload';
import {message} from 'antd';
import axios from 'axios';

const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });

const UploadFile: FC<any> = ({setUploadFileData, uploadFileData}) => {
  // const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

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
        // onUploadProgress: (progressEvent) => {
        //   const {loaded, total} = progressEvent;
        //   const progress = (loaded / total) * 100;
        //   console.log(`Upload Progress: ${progress.toFixed(2)}%`);
        // },
      });
      if (response) {
        // dispatch(setQuote((filedData: any) => [...filedData, response]));
        setUploadFileData((filedData: any) => [...filedData, response]);
      }
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.error('Error sending image to Nanonets API:', error);
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
    <OsUpload
      beforeUpload={beforeUpload}
      uploadFileData={uploadFileData}
      setUploadFileData={setUploadFileData}
      setLoading={setLoading}
      loading={loading}
    />
  );
};

export default UploadFile;
