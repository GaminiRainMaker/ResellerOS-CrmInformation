import {Checkbox, CheckboxGroup} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Select} from '@/app/components/common/antd/Select';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Form, Radio} from 'antd';
import React, {useState} from 'react';

const GrantLicense = ({form, onFinish, activeKey, setActiveKey}: any) => {
  const [licenseType, setLicenseType] = useState('LifeTime');
  const [token] = useThemeToken();
  const onChange = (key: string) => {
    setActiveKey(key);
  };
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
    <>
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        <OsTabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: (
                <Typography name="Body 4/Regular">Grant License</Typography>
              ),
              key: '1',
              children: (
                <Row>
                  <Col span={24}>
                    <Space
                      direction="vertical"
                      style={{width: '100%'}}
                      size={2}
                    >
                      <Typography name="Body 3/Medium">License Type</Typography>
                      <Form.Item name="licenseType">
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
                        <Typography name="Body 3/Medium">
                          License Features
                        </Typography>
                        <Form.Item name="features">
                          <CheckboxGroup>
                            <Checkbox value="QuoteAI">QuoteAI</Checkbox>
                            <Checkbox value="DealregAI">DealregAI</Checkbox>
                          </CheckboxGroup>
                        </Form.Item>
                      </Space>
                    )}

                    {licenseType === 'Paid' && (
                      <Space
                        direction="vertical"
                        style={{width: '100%'}}
                        size={2}
                      >
                        <Typography name="Body 3/Medium">
                          Expiration Time
                        </Typography>
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
                          <Typography name="Body 3/Medium">
                            License Features
                          </Typography>
                          <Form.Item name="features">
                            <CheckboxGroup>
                              <Checkbox value="QuoteAI">QuoteAI</Checkbox>
                              <Checkbox value="DealRegAI">DealRegAI</Checkbox>
                            </CheckboxGroup>
                          </Form.Item>
                        </Space>
                      </Space>
                    )}
                  </Col>
                </Row>
              ),
            },
            {
              label: (
                <Typography name="Body 4/Regular">Revoke License</Typography>
              ),
              key: '2',
              children: (
                <Row gutter={[12, 12]} justify="space-between">
                  <Col span={24}>
                    <Space
                      direction="vertical"
                      style={{marginTop: '16px', width: '100%'}}
                      size={2}
                    >
                      <Typography name="Body 3/Medium">
                        License Features
                      </Typography>
                      <Form.Item name="features_type">
                        <CheckboxGroup>
                          <Checkbox value="QuoteAI">QuoteAI</Checkbox>
                          <Checkbox value="DealRegAI">DealRegAI</Checkbox>
                        </CheckboxGroup>
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </Form>

      {/* <Form form={form} onFinish={onFinish} layout="vertical">
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
      </Form> */}
    </>
  );
};

export default GrantLicense;
