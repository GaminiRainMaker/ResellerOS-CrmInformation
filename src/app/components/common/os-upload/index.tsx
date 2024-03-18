/* eslint-disable react-hooks/exhaustive-deps */
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Form, Switch} from 'antd';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsCustomerSelect from '../os-customer-select';
import OsOpportunitySelect from '../os-opportunity-select';
import Typography from '../typography';
import UploadCard from './UploadCard';
import {OSDraggerStyle} from './styled-components';
import GlobalLoader from '../os-global-loader';

const OsUpload: React.FC<any> = ({
  beforeUpload,
  uploadFileData,
  setUploadFileData,
  addInExistingQuote,
  addQuoteLineItem,
  form,
  showSelectFields,
}) => {
  const [token] = useThemeToken();
  const [fileList, setFileList] = useState([]);
  const [customerValue, setCustomerValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const newrrr: any = [...fileList];
    if (uploadFileData && uploadFileData?.length > 0) {
      newrrr?.push({nsss: uploadFileData?.data?.result?.[0]?.input});
    }
    setFileList(newrrr);
  }, [uploadFileData]);

  // Define your Nanonets API key and endpoint

  const sendDataToNanonets = async (
    base64Data: string,
    file: File,
    model_id: string,
  ) => {
    const API_KEY = '198c15fd-9680-11ed-82f6-7a0abc6e8cc8';
    const API_ENDPOINT =
      //   prevoius
      // 'https://app.nanonets.com/api/v2/OCR/Model/91814dd8-75f6-44d7-aad3-776df449b59f/LabelFile/';
      // new4
      `https://app.nanonets.com/api/v2/OCR/Model/${model_id}/LabelFile/`;
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

      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const onFinish = async () => {
    const customerId = form.getFieldValue('customer_id');
    const opportunityId = form.getFieldValue('opportunity_id');
    const newArr = [];
    for (let i = 0; i < uploadFileData.length; i++) {
      let obj: any = {...uploadFileData[i]};
      // eslint-disable-next-line no-await-in-loop
      const response = await sendDataToNanonets(
        obj?.base64,
        obj?.file,
        obj?.model_id,
      );
      obj = {...obj, ...response};
      newArr.push(obj);
    }
    addQuoteLineItem(customerId, opportunityId, newArr);
  };

  return (
    <GlobalLoader loading={loading}>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <OSDraggerStyle
          beforeUpload={beforeUpload}
          showUploadList={false}
          multiple
        >
          <FolderArrowDownIcon width={24} color={token?.colorInfoBorder} />
          <Typography
            name="Body 4/Medium"
            color={token?.colorPrimaryText}
            as="div"
          >
            <Typography
              name="Body 4/Medium"
              style={{textDecoration: 'underline', cursor: 'pointer'}}
              color={token?.colorPrimary}
            >
              Click to Upload
            </Typography>{' '}
            or Drag and Drop
          </Typography>
          <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
            XLS, PDF, DOC, PNG and JPG
          </Typography>
        </OSDraggerStyle>
        <UploadCard
          uploadFileData={uploadFileData}
          setUploadFileData={setUploadFileData}
        />
        {addInExistingQuote && (
          <Space size={8} direction="horizontal">
            <Typography name="Body 3/Regular">Add in existing quote</Typography>
            <Switch />
          </Space>
        )}
        {showSelectFields && (
          <Form
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={[16, 16]}>
              <Col sm={24} md={12}>
                <OsCustomerSelect
                  setCustomerValue={setCustomerValue}
                  customerValue={customerValue}
                  isAddNewCustomer
                />
              </Col>

              <Col sm={24} md={12}>
                <OsOpportunitySelect
                  form={form}
                  customerValue={customerValue}
                  isAddNewOpportunity
                />
              </Col>
            </Row>
          </Form>
        )}
      </Space>
    </GlobalLoader>
  );
};
export default OsUpload;
