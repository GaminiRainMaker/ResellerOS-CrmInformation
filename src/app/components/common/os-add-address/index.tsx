import {Form} from 'antd';
import React, {FC, useState} from 'react';
import {Col, Row} from '../antd/Grid';
import {CustomerTabsStyle} from '../os-add-customer/styled-components';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import Typography from '../typography';
import OsInput from '../os-input';
import {Checkbox} from '../antd/Checkbox';
import {OsAddAddressInterface} from './os-add-address.interface';
import {Space} from '../antd/Space';

const AddAddress: FC<OsAddAddressInterface> = ({
  form,
  activeKey,
  setActiveKey,
  onFinish,
  drawer,
}) => {
  const [sameAsShippingAddress, setSameAsShippingAddress] =
    useState<boolean>(false);
  const onChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      requiredMark={false}
      style={{width: '100%', padding: drawer ? '' : '40px'}}
      initialValues={{
        currency: '$',
      }}
    >
      <>
        <CustomerTabsStyle
          defaultActiveKey="1"
          activeKey={activeKey ?? '1'}
          onChange={onChange}
          items={[
            {
              label: (
                <Typography name="Body 4/Medium">Shipping Address</Typography>
              ),
              key: '1',
              children: (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Address Line
                        </Typography>
                      }
                      name="shiping_address_line"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: 'Please enter valid city.',
                        },
                      ]}
                      label={<Typography name="Body 4/Medium">City</Typography>}
                      name="shiping_city"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: 'Please enter valid state.',
                        },
                      ]}
                      label={
                        <Typography name="Body 4/Medium">State</Typography>
                      }
                      name="shiping_state"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">Zip Code</Typography>
                      }
                      name="shiping_pin_code"
                      rules={[
                        {
                          pattern: /^[0-9]{5}$/,
                          message:
                            'Please enter a valid zip code (exactly 5 digits).',
                        },
                      ]}
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: 'Please enter valid country.',
                        },
                      ]}
                      label={
                        <Typography name="Body 4/Medium">Country</Typography>
                      }
                      name="shiping_country"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                  <Col span={drawer ? 24 : 12}>
                    <Space align="start">
                      <SelectFormItem
                        label=""
                        valuePropName="checked"
                        name="primary_shipping"
                      >
                        <Checkbox style={{paddingBottom: '10px'}} />
                      </SelectFormItem>
                      <Typography name="Body 3/Regular">
                        Should this be your default shipping address?
                      </Typography>
                    </Space>
                  </Col>
                </Row>
              ),
            },
            {
              label: (
                <Typography name="Body 4/Medium">Billing Address</Typography>
              ),
              key: '2',
              children: (
                <Row gutter={[16, 16]} justify={'space-between'}>
                  {!drawer && (
                    <Row style={{paddingTop: '24px'}}>
                      <Col>
                        <Space align="start">
                          <SelectFormItem
                            label=""
                            valuePropName="checked"
                            name="is_same_shipping_address"
                          >
                            <Checkbox
                              style={{paddingBottom: '10px'}}
                              onChange={(e) => {
                                setSameAsShippingAddress(e.target.checked);
                                if (e.target.checked) {
                                  const data = form.getFieldsValue();
                                  form.setFieldsValue({
                                    billing_address_line:
                                      data?.shiping_address_line,
                                    billing_city: data?.shiping_city,
                                    billing_state: data?.shiping_state,
                                    billing_pin_code: data?.shiping_pin_code,
                                    billing_country: data?.shiping_country,
                                    bill_preVale: true,
                                  });
                                } else {
                                  form.resetFields([
                                    'billing_address_line',
                                    'billing_city',
                                    'billing_state',
                                    'billing_pin_code',
                                    'billing_country',
                                    'bill_preVale',
                                  ]);
                                }
                              }}
                            />
                          </SelectFormItem>
                          <Typography name="Body 3/Regular">
                            Same as Shipping Address
                          </Typography>
                        </Space>
                      </Col>
                    </Row>
                  )}

                  <Col span={24}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Address Line
                        </Typography>
                      }
                      name="billing_address_line"
                    >
                      <OsInput
                        placeholder="Enter here"
                        disabled={sameAsShippingAddress}
                      />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: 'Please enter valid city.',
                        },
                      ]}
                      label={<Typography name="Body 4/Medium">City</Typography>}
                      name="billing_city"
                    >
                      <OsInput
                        placeholder="Enter here"
                        disabled={sameAsShippingAddress}
                      />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: 'Please enter valid state.',
                        },
                      ]}
                      label={
                        <Typography name="Body 4/Medium">State</Typography>
                      }
                      name="billing_state"
                    >
                      <OsInput
                        placeholder="Enter here"
                        disabled={sameAsShippingAddress}
                      />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">Zip Code</Typography>
                      }
                      name="billing_pin_code"
                      rules={[
                        {
                          pattern: /^[0-9]{5}$/,
                          message:
                            'Please enter a valid zip code (exactly 5 digits).',
                        },
                      ]}
                    >
                      <OsInput
                        placeholder="Enter here"
                        disabled={sameAsShippingAddress}
                      />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: 'Please enter valid country.',
                        },
                      ]}
                      label={
                        <Typography name="Body 4/Medium">Country</Typography>
                      }
                      name="billing_country"
                    >
                      <OsInput
                        placeholder="Enter here"
                        disabled={sameAsShippingAddress}
                      />
                    </SelectFormItem>
                  </Col>

                  <Col span={drawer ? 24 : 12}>
                    <Space align="start">
                      <SelectFormItem
                        label=""
                        valuePropName="checked"
                        name="primary_billing"
                      >
                        <Checkbox style={{paddingBottom: '10px'}} />
                      </SelectFormItem>
                      <Typography name="Body 3/Regular">
                        Should this be your default billing address?
                      </Typography>
                    </Space>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </>
    </Form>
  );
};

export default AddAddress;
