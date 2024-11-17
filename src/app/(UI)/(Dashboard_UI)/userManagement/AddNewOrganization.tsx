import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FormInstance} from 'antd/lib';
import {FC, useState} from 'react';

const AddNewOrganization: FC<{
  form: FormInstance;
  onFinish: any;
}> = ({form, onFinish}) => {
  const [activeKey, setActiveKey] = useState<string>('1');

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
          items={[
            {
              label: (
                <Typography
                  name="Body 4/Regular"
                  onClick={() => {
                    setActiveKey('1');
                  }}
                >
                  ResellersOS Org
                </Typography>
              ),
              key: '1',

              children: (
                <Row gutter={[12, 12]} justify="space-between">
                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Master Email
                        </Typography>
                      }
                      name={'email'}
                      rules={[
                        {
                          required: true,
                          message: 'Email is required!',
                        },
                        {
                          pattern:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Please enter valid email.',
                        },
                      ]}
                    >
                      <OsInput placeholder="Enter Email" />
                    </SelectFormItem>
                  </Col>

                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Master Username
                        </Typography>
                      }
                      name={'user_name'}
                      rules={[
                        {
                          required: true,
                          message: 'Username is required!',
                        },
                        {
                          pattern: /^[a-zA-Z0-9 ]*$/,
                          message: 'Special characters are not allowed!',
                        },
                      ]}
                    >
                      <OsInput placeholder="Enter Text" />
                    </SelectFormItem>
                  </Col>
                </Row>
              ),
            },
            {
              label: (
                <Typography
                  name="Body 4/Regular"
                  onClick={() => {
                    setActiveKey('2');
                  }}
                >
                  Salesforce Org
                </Typography>
              ),
              key: '2',
              children: (
                <Row gutter={[12, 12]} justify="space-between">
                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Organization ID
                        </Typography>
                      }
                      name={'org_id'}
                      rules={[
                        {
                          required: activeKey === '2' ? true : false,
                          message: 'Organization ID is required!',
                        },
                        {
                          pattern: /^[a-zA-Z0-9 ]*$/,
                          message: 'Special characters are not allowed!',
                        },
                      ]}
                    >
                      <OsInput placeholder="Enter Organization ID" />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Master Email
                        </Typography>
                      }
                      name={'email'}
                      rules={[
                        {
                          required: true,
                          message: 'Email is required!',
                        },
                        {
                          pattern:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Please enter valid email.',
                        },
                      ]}
                    >
                      <OsInput placeholder="Enter Email" />
                    </SelectFormItem>
                  </Col>

                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Master Username
                        </Typography>
                      }
                      name={'user_name'}
                      rules={[
                        {
                          required: true,
                          message: 'Username is required!',
                        },
                        {
                          pattern: /^[a-zA-Z0-9 ]*$/,
                          message: 'Special characters are not allowed!',
                        },
                      ]}
                    >
                      <OsInput placeholder="Enter Text" />
                    </SelectFormItem>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </Form>
    </>
  );
};

export default AddNewOrganization;
