/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import {message, Upload} from 'antd';
import axios from 'axios';
import {useState} from 'react';
import useThemeToken from './components/common/hooks/useThemeToken';
import OsButton from './components/common/os-button';
import Typography from './components/common/typography';
import styles from './page.module.css';

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

export default function Home() {
  const [token] = useThemeToken();
  const [base64File, setBase64File] = useState<string | null>(null);

  // Define your Nanonets API key and endpoint
  const API_KEY = '76211feb-7e49-11ee-865f-22778caf775b';
  const API_ENDPOINT =
    'https://app.nanonets.com/api/v2/OCR/Model/e2fecf65-ccfc-4c05-be1c-2f7c9fdf7180/LabelFile/';

  const sendImageToNanonets = async (base64Data: string, file: File) => {
    console.log('base64Data', base64Data);
    const formData = new FormData();
    // formData.append('data', base64Data);
    formData.append('file', file);
    try {
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${API_KEY}:`).toString(
            'base64',
          )}`,
          'Content-Type': 'application/pdf',
        },
      });

      console.log('Nanonets API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending image to Nanonets API:', error);
      throw error;
    }
  };

  const beforeUpload = (file: File) => {
    convertFileToBase64(file)
      .then((base64String) => {
        setBase64File(base64String);
        sendImageToNanonets(base64String, file);
      })
      .catch((error) => {
        message.error('Error converting file to base64', error);
      });
    return false;
  };

  return (
    <main className={styles.main}>
      <div
        style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}
      >
        <Typography as="div" name="Display 1" color={token?.colorPrimary}>
          Welcome to ResselerOS
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <Upload beforeUpload={beforeUpload} showUploadList={false}>
          <OsButton type="primary">Select File</OsButton>
        </Upload>
      </div>
    </main>
  );
}
