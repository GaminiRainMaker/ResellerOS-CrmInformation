import {Checkbox, CheckboxGroup} from '@/app/components/common/antd/Checkbox';
import {Select} from '@/app/components/common/antd/Select';
import {Space} from '@/app/components/common/antd/Space';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form, Radio} from 'antd';
import React, {useState} from 'react';

const GrantLicense = ({form, onFinish}: any) => {
  const [licenseType, setLicenseType] = useState('LifeTime');

  const handleLicenseTypeChange = (e: any) => {
    setLicenseType(e.target.value);
    const licenseTypeValue = form.getFieldValue('licenseType');
    form.resetFields();
    form.setFieldsValue({licenseType: licenseTypeValue});
  };

  const SelectOption = [
    {
      label: '7 days',
      value: '7 days',
    },
    {
      label: '15 days',
      value: '15 days',
    },
    {
      label: '1 month',
      value: '1 month',
    },
    {
      label: '6 months',
      value: '6 months',
    },
    {
      label: '1 year',
      value: '1 year',
    },
  ];

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Space direction="vertical" style={{width: '100%'}} size={2}>
        <Typography name="Body 3/Medium">License Type</Typography>
        <Form.Item name="licenseType" initialValue="LifeTime">
          <Radio.Group onChange={handleLicenseTypeChange}>
            <Radio value="LifeTime">LifeTime</Radio>
            <Radio value="Paid">Paid</Radio>
          </Radio.Group>
        </Form.Item>
      </Space>

      {licenseType === 'LifeTime' && (
        <Space
          direction="vertical"
          style={{width: '100%', marginTop: '16px'}}
          size={2}
        >
          <Typography name="Body 3/Medium">License Features</Typography>
          <Form.Item name="features">
            <CheckboxGroup>
              <Checkbox value="QuoteAI">QuoteAI</Checkbox>
              <Checkbox value="DealregAI">DealregAI</Checkbox>
            </CheckboxGroup>
          </Form.Item>
        </Space>
      )}

      {licenseType === 'Paid' && (
        <Space direction="vertical" style={{width: '100%'}} size={2}>
          <Typography name="Body 3/Medium">Expiration Time</Typography>
          <Form.Item name="expirationTime">
            <CommonSelect
              style={{width: '100%'}}
              placeholder="Select Expiration Time"
              options={SelectOption}
              allowClear
            />
          </Form.Item>
          <Space
            direction="vertical"
            style={{marginTop: '16px', width: '100%'}}
            size={2}
          >
            <Typography name="Body 3/Medium">License Features</Typography>
            <Form.Item name="features">
              <CheckboxGroup>
                <Checkbox value="QuoteAI">QuoteAI</Checkbox>
                <Checkbox value="DealRegAI">DealRegAI</Checkbox>
              </CheckboxGroup>
            </Form.Item>
          </Space>
        </Space>
      )}
    </Form>
  );
};

export default GrantLicense;
