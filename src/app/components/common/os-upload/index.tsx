/* eslint-disable react-hooks/exhaustive-deps */
import {FolderArrowDownIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import React, {useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {getAllOpportunity} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {Checkbox} from '../antd/Checkbox';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import CommonSelect from '../os-select';
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
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [fileList, setFileList] = useState([]);
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const [customerValue, setCustomerValue] = useState<number>(0);
  const [opportunityFilterOption, setOpportunityFilterOption] = useState<any>();

  useEffect(() => {
    const newrrr: any = [...fileList];
    if (uploadFileData && uploadFileData?.length > 0) {
      newrrr?.push({nsss: uploadFileData?.data?.result?.[0]?.input});
    }
    setFileList(newrrr);
  }, [uploadFileData]);

  useEffect(() => {
    dispatch(getAllCustomer({}));
    dispatch(getAllOpportunity());
  }, []);

  const customerOptions = dataAddress.map((dataAddressItem: any) => ({
    value: dataAddressItem.id,
    label: (
      <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
        {dataAddressItem.name}
      </Typography>
    ),
  }));

  useEffect(() => {
    form?.resetFields(['opportunity_id']);

    const filterUsers = opportunityData?.filter((item: any) =>
      item?.customer_id?.toString()?.includes(customerValue),
    );
    const opportunityOptions = filterUsers.map((opportunity: any) => ({
      value: opportunity.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {opportunity.title}
        </Typography>
      ),
    }));

    setOpportunityFilterOption(opportunityOptions);
  }, [customerValue]);

  const onFinish = () => {
    const customerId = form.getFieldValue('customer_id');
    const opportunityId = form.getFieldValue('opportunity_id');
    addQuoteLineItem(customerId, opportunityId);
  };

  return (
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      {addInExistingQuote && (
        <Space size={8} direction="horizontal">
          <Checkbox />
          <Typography name="Body 3/Regular">Add in existing quote</Typography>
        </Space>
      )}
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
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Col sm={24} md={12}>
            <Form.Item
              label="Customer"
              name="customer_id"
              rules={[{required: true, message: 'Please Select Customer!'}]}
            >
              <CommonSelect
                placeholder="Select"
                allowClear
                style={{width: '100%'}}
                options={customerOptions}
                onChange={(value) => {
                  setCustomerValue(value);
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item
              label="Opportunity"
              name="opportunity_id"
              rules={[{required: true, message: 'Please Select Opportunity!'}]}
            >
              <CommonSelect
                placeholder="Select"
                allowClear
                style={{width: '100%'}}
                options={opportunityFilterOption}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};
export default OsUpload;
