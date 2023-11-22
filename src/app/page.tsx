/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

'use client';

import {message, Upload} from 'antd';
import axios from 'axios';
import useThemeToken from './components/common/hooks/useThemeToken';
import OsButton, {ButtonType} from './components/common/os-button';
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
  // const [base64File, setBase64File] = useState<string | null>(null);

  // Define your Nanonets API key and endpoint
  const API_KEY = '76211feb-7e49-11ee-865f-22778caf775b';
  const API_ENDPOINT =
    'https://app.nanonets.com/api/v2/OCR/Model/fe2c7a28-7345-45d6-b9c5-0fed622b0f92/LabelFile/';

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

      const labelOcrMap: any = {};
      response.data?.result[0]?.prediction.forEach((item: any) => {
        labelOcrMap[item?.label] = item.ocr_text;
      });

      console.log('labelOcrMap', labelOcrMap);

      return labelOcrMap;
    } catch (error) {
      console.error('Error sending image to Nanonets API:', error);
      throw error;
    }
  };

  const beforeUpload = (file: File) => {
    convertFileToBase64(file)
      .then((base64String) => {
        // setBase64File(base64String);
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
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          as="div"
          name="Display 1/Regular"
          color={token?.colorPrimary}
        >
          Welcome to ResellerOS
        </Typography>

        <br />
        <br />
        <br />
        <br />
        <Upload beforeUpload={beforeUpload} showUploadList={false}>
          <OsButton type="primary" buttontype={ButtonType.PRIMARY_LARGE}>
            <Typography name="Button 1" color={token?.colorBgBase}>
              Button
            </Typography>
          </OsButton>
        </Upload>
      </div>
    </main>
  );
}
