'use client';

import {message, Upload} from 'antd';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {insertQuote} from '../../redux/actions/quote';
import {useAppDispatch} from '../../redux/hook';
import useThemeToken from './components/common/hooks/useThemeToken';
import OsButton, {ButtonType} from './components/common/os-button';
import Typography from './components/common/typography';
import {insertQuoteLineItem} from '../../redux/actions/quotelineitem';

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

export default function Home() {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const router = useRouter();
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
          router.push('/quote');
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

  return (
    <main>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '2rem',
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
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          beforeUpload={beforeUpload}
          showUploadList={false}
          name="file"
        >
          <OsButton
            type="primary"
            buttontype={ButtonType.PRIMARY_LARGE}
            loading={loading}
          >
            <Typography name="Button 1" color={token?.colorBgBase}>
              Upload File
            </Typography>
          </OsButton>
        </Upload>
      </div>
    </main>
  );
}
