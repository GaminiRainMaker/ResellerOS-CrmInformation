'use client';

import {Col, Form, Row, Space} from 'antd';
import {FC, useEffect, useState} from 'react';
import useThemeToken from '../hooks/useThemeToken';
import OsInput from '../os-input';
import Typography from '../typography';
import {OsAdduser} from './add-users.interface';
import ContactInput from '../os-contact';

const AddUser: FC<OsAdduser> = ({
  isDrawer = false,
  userData,
  onFinish,
  form,
}) => {
  const [token] = useThemeToken();
  const [contactValue, setContactValue] = useState<any>();

  useEffect(() => {
    form.resetFields();
  }, [userData]);

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
          initialValues={userData}
        >
          <Row gutter={[16, 16]}>
            <Col sm={24} md={12}>
              <Form.Item label="First Name" name="first_name">
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
              <Form.Item label="Email" name="email">
                <OsInput placeholder="Enter Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col sm={24} md={isDrawer ? 24 :12}>
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
            <Col sm={24} md={isDrawer ? 24 :12}>
              <Form.Item label="Job Title" name="job_title">
                <OsInput placeholder="Enter Job Title" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};

export default AddUser;
