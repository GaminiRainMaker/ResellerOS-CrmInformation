/* eslint-disable react-hooks/exhaustive-deps */
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Form, Switch} from 'antd';
import React, {useEffect, useState} from 'react';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsCustomerSelect from '../os-customer-select';
import OsOpportunitySelect from '../os-opportunity-select';
import Typography from '../typography';
import UploadCard from './UploadCard';
import {OSDraggerStyle} from './styled-components';

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

  useEffect(() => {
    const newrrr: any = [...fileList];
    if (uploadFileData && uploadFileData?.length > 0) {
      newrrr?.push({nsss: uploadFileData?.data?.result?.[0]?.input});
    }
    setFileList(newrrr);
  }, [uploadFileData]);

  const onFinish = () => {
    const customerId = form.getFieldValue('customer_id');
    const opportunityId = form.getFieldValue('opportunity_id');
    addQuoteLineItem(customerId, opportunityId);
    // console.log('customerId', customerId, opportunityId);
  };

  return (
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
  );
};
export default OsUpload;
