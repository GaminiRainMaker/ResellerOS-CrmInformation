'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import TextArea from 'antd/es/input/TextArea';

const ContactSales: React.FC<any> = ({onFinish, form}) => {
  const [token] = useThemeToken();

  return (
    <>
      <Row
        justify="space-between"
        style={{
          padding: '24px 40px 20px 40px',
          backgroundColor: '#F0F4F7',
          borderRadius: '10px 10px 0px 0px',
        }}
        gutter={[0, 0]}
      >
        <Typography
          name="Body 1/Regular"
          align="left"
          color={token?.colorLinkHover}
        >
          Contact Sales
        </Typography>
      </Row>

      <Form
        layout="vertical"
        requiredMark={false}
        style={{
          padding: '40px',
        }}
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[8, 0]} justify="space-between">
          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">First Name</Typography>}
              name="firstname"
              rules={[
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Please enter valid text.',
                },
                {
                  required: true,
                  message: 'This field is required.',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>

          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Last Name</Typography>}
              name="lastname"
              rules={[
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Please enter valid last name.',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>

          <Col span={24}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Email</Typography>}
              name="email"
              rules={[
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter valid email.',
                },
                {
                  required: true,
                  message: 'This field is required.',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>

          <Col span={24}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Message</Typography>}
              name="message"
              rules={[
                {
                  required: true,
                  message: 'This field is required.',
                },
              ]}
            >
              <TextArea
                placeholder="Write description here!"
                autoSize={{minRows: 3, maxRows: 8}}
              />
            </SelectFormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ContactSales;
