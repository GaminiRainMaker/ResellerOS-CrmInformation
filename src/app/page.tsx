'use client';

import {message, Upload} from 'antd';
import axios from 'axios';
import {useEffect} from 'react';
import {getQuote, insertQuote} from '../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {Table} from './components/common/antd/Table';
import useThemeToken from './components/common/hooks/useThemeToken';
import OsButton, {ButtonType} from './components/common/os-button';
import Typography from './components/common/typography';

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
  const dispatch = useAppDispatch();
  const {data} = useAppSelector((state) => state.quote);

  useEffect(() => {
    dispatch(getQuote());
  }, []);

  const columns = [
    {
      title: 'Quote No',
      dataIndex: 'quote_no',
      key: 'quote_no',
    },
    {
      title: 'Quote Date',
      dataIndex: 'quote_date',
      key: 'quote_date',
    },
    {
      title: 'Shipping Amount',
      dataIndex: 'shipping_amount',
      key: 'shipping_amount',
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
    },
  ];

  // Define your Nanonets API key and endpoint
  const API_KEY = '76211feb-7e49-11ee-865f-22778caf775b';
  const API_ENDPOINT =
    'https://app.nanonets.com/api/v2/OCR/Model/fe2c7a28-7345-45d6-b9c5-0fed622b0f92/LabelFile/';

  const sendDataToNanonets = async (base64Data: string, file: File) => {
    const formData = new FormData();
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
      response?.data?.result?.[0]?.prediction?.forEach((item: any) => {
        labelOcrMap[item?.label?.toLowerCase()] = item?.ocr_text;
      });

      console.log('labelOcrMap', labelOcrMap);

      if (labelOcrMap) {
        dispatch(insertQuote(labelOcrMap));
      }
      return labelOcrMap;
    } catch (error) {
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
          marginTop: '5rem',
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
          <OsButton type="primary" buttontype={ButtonType.PRIMARY_LARGE}>
            <Typography name="Button 1" color={token?.colorBgBase}>
              Upload File
            </Typography>
          </OsButton>
        </Upload>
        <br />
        <br />
        <br />
        <br />
        <Typography name="Heading 1/Medium" color={token?.colorPrimary}>
          Quote Data
        </Typography>
      </div>
      <Table dataSource={data?.data} columns={columns} />;
    </main>
  );
}
