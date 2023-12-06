'use client';

import {useState} from 'react';

import OsUpload from '@/app/components/common/os-upload';
import {message} from 'antd';
import axios from 'axios';
import {insertQuote} from '../../../../../redux/actions/quote';
import {insertQuoteLineItem} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch} from '../../../../../redux/hook';

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

interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined; // Define the inner object structure
  };
}

const UploadFile = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  // Define your Nanonets API key and endpoint
  const API_KEY = '198c15fd-9680-11ed-82f6-7a0abc6e8cc8';
  const API_ENDPOINT =
    'https://app.nanonets.com/api/v2/OCR/Model/91814dd8-75f6-44d7-aad3-776df449b59f/LabelFile/';

  const sendDataToNanonets = async (base64Data: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(false);
    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString(
            'base64',
          )}`,
          'Content-Type': 'application/pdf',
        },
        onUploadProgress: (progressEvent: any) => {
          const {loaded, total} = progressEvent;
          const progress = (loaded / total) * 100;
          console.log(`Upload Progress: ${progress.toFixed(2)}%`);
        },
      });

      const arrayOfTableObjects =
        response?.data?.result?.[0]?.prediction?.filter(
          (item: any) => item.label === 'table',
        );
      const formattedData: FormattedData = {};
      arrayOfTableObjects?.[0]?.cells.forEach((item: any) => {
        const rowNum = item.row;
        if (!formattedData[rowNum]) {
          formattedData[rowNum] = {};
        }
        formattedData[rowNum][item.label?.toLowerCase()] = item.text;
      });
      const formattedArray = Object.values(formattedData);
      const labelOcrMap: any = {};
      response?.data?.result?.[0]?.prediction?.forEach((item: any) => {
        labelOcrMap[item?.label?.toLowerCase()] = item?.ocr_text;
      });
      if (labelOcrMap) {
        dispatch(insertQuote(labelOcrMap)).then((d) => {
          if (d?.payload?.data?.id) {
            const lineitemData = formattedArray?.map((item: any) => ({
              ...item,
              qoute_id: d?.payload?.data?.id,
            }));
            dispatch(insertQuoteLineItem(lineitemData));
          }
          window?.location?.reload();
        });
      }
      setLoading(false);
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

  return <OsUpload beforeUpload={beforeUpload} />;
};

export default UploadFile;
