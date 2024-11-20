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
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const validateEmail = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Email is required.'));
    }

    // Check for invalid starting character
    if (/^\./.test(value)) {
      return Promise.reject(new Error('Email cannot start with a dot.'));
    }

    // Check for consecutive dots
    if (/\.\./.test(value)) {
      return Promise.reject(
        new Error('Email cannot contain consecutive dots.'),
      );
    }

    // Check for invalid domain characters
    const domainPart = value.split('@')[1];
    if (domainPart && !/^[a-zA-Z0-9+-.]+$/.test(domainPart)) {
      return Promise.reject(
        new Error('Domain name contains invalid characters.'),
      );
    }

    // Check for invalid domain (starting or ending with a hyphen)
    if (/(@|\.)-/.test(value) || /-\./.test(value)) {
      return Promise.reject(
        new Error('Domain name cannot start or end with a hyphen.'),
      );
    }

    // Check for missing TLD
    if (!/\.[a-zA-Z]{2,}$/.test(value)) {
      return Promise.reject(
        new Error('Domain must have a valid TLD (e.g., .com).'),
      );
    }

    // Check for consecutive hyphens in the domain
    if (/@[a-zA-Z0-9.-]*--/.test(value)) {
      return Promise.reject(
        new Error('Domain name cannot contain consecutive hyphens.'),
      );
    }

    // Validate overall structure using regex
    const emailRegex =
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~](?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]{0,63}@[a-zA-Z0-9+](?:[a-zA-Z0-9-+]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;

    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Invalid email format.'));
    }

    // If all checks pass
    return Promise.resolve();
  };

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
                <Typography name="Body 4/Regular">ResellersOS Org</Typography>
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
                          required: activeKey === '1' ? true : false,
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
                          required: activeKey === '1' ? true : false,
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
                <Typography name="Body 4/Regular">Salesforce Org</Typography>
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
                      name={'salesforce_email'}
                      rules={[{validator: validateEmail}]}
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
                      name={'salesforce_user_name'}
                      rules={[
                        {
                          required: activeKey === '2' ? true : false,
                          message: 'Username is required!',
                        },
                        {
                          pattern:
                            /^(?!\s)[a-zA-Z0-9][a-zA-Z0-9\s]*$|^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~](?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]{0,63}@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/,
                          message: 'Please enter a valid username or email.',
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
