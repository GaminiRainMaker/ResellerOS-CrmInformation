'use client';

import {Col, Form, Row, Space} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';
import useThemeToken from '../hooks/useThemeToken';
import ContactInput from '../os-contact';
import OsInput from '../os-input';
import Typography from '../typography';
import {OsAdduser} from './add-users.interface';
import {Checkbox} from '../antd/Checkbox';

const AddUser: FC<OsAdduser> = ({
  isDrawer = false,
  userData,
  onFinish,
  form,
}) => {
  const [token] = useThemeToken();
  const [contactValue, setContactValue] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);

  useEffect(() => {
    form.setFieldsValue({
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      user_name: userData?.user_name,
      email: userData?.email,
      phone_number: userData?.phone_number,
      job_title: userData?.job_title,
    });
  }, [userData]);

  const validateEmail = (_: any, value: any) => {
    const emailPattern = new RegExp(
      `^[^\\s@]+@${userInformation?.organization}\\.com$`,
    );
    if (!emailPattern.test(value)) {
      return Promise.reject(
        `Email must be from ${userInformation?.organization} domain.`,
      );
    }
    return Promise.resolve();
  };

  return (
    <>
      {!isDrawer && (
        <Row
          justify="space-between"
          style={{
            padding: '24px 40px 20px 40px',
            backgroundColor: '#F0F4F7',
            borderRadius: '10px 10px 0px 0px',
          }}
          gutter={[0, 16]}
        >
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            New User
          </Typography>
        </Row>
      )}

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: !isDrawer ? '24px 40px 20px 40px' : ''}}
      >
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col sm={24} md={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{required: true, message: 'This field is required!'}]}
              >
                <OsInput placeholder="Enter First Name" />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item label="Last Name" name="last_name">
                <OsInput placeholder="Enter Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col sm={24} md={12}>
              <Form.Item label="User Name" name="user_name">
                <OsInput placeholder="Enter User Name" />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {required: true, message: 'This field is required!'},
                  {validator: validateEmail},
                ]}
              >
                <OsInput placeholder="Enter Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col sm={24} md={isDrawer ? 24 : 12}>
              <Form.Item label="Contact No." name="phone_number">
                <ContactInput
                  name="contact_number"
                  id="contact_number"
                  value={contactValue}
                  onChange={(value) => {
                    setContactValue(value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={isDrawer ? 24 : 12}>
              <Form.Item label="Job Title" name="job_title">
                <OsInput placeholder="Enter Job Title" />
              </Form.Item>
            </Col>
          </Row>

          <Typography name="Body 3/Medium">Provide Permissions</Typography>
          <Row gutter={[16, 16]} style={{marginTop: '10px'}}>
            <Col span={6}>
              <Space align="start">
                <Form.Item label="" valuePropName="checked" name="is_quote">
                  <Checkbox style={{paddingBottom: '10px'}} />
                </Form.Item>
                <Typography name="Body 4/Medium">Quote AI</Typography>
              </Space>
            </Col>
            <Col span={6}>
              <Space align="start">
                <Form.Item label="" name="is_dealReg" valuePropName="checked">
                  <Checkbox style={{paddingBottom: '10px'}} />
                </Form.Item>
                <Typography name="Body 4/Medium">DealReg AI</Typography>
              </Space>
            </Col>
            <Col span={6}>
              <Space align="start">
                <Form.Item label="" name="is_admin" valuePropName="checked">
                  <Checkbox style={{paddingBottom: '10px'}} />
                </Form.Item>
                <Typography name="Body 4/Medium">Admin Access</Typography>
              </Space>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};

export default AddUser;
