import {Col, Row} from '@/app/components/common/antd/Grid';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Form, message} from 'antd';
import {FormInstance} from 'antd/lib';
import {FC, useEffect, useState} from 'react';

const AddNewOrganization: FC<{
  form: FormInstance;
  onFinish: any;
}> = ({form, onFinish}) => {
  const [activeKey, setActiveKey] = useState<string>('1');
  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const validateEmail = (key: string) => async (_: any, value: string) => {
    if (key === activeKey) {
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
    }
  };

  const hasAnyValue = (data: Record<string, any>): boolean => {
    return Object.values(data).some(
      (value) => value !== undefined && value !== null && value !== '',
    );
  };

  useEffect(() => {
    const formdata = form.getFieldsValue();
    const isAllFields = hasAnyValue(formdata);
    if (isAllFields) {
      message.error(
        'The current values will be cleared upon switching to another tab.',
      );
      form.resetFields();
    }
  }, [activeKey]);

  const validateInput = (key: string) => async (_: any, value: string) => {
    if (key === activeKey) {
      // Check if value exists
      if (!value) {
        return Promise.reject(new Error('Input is required.'));
      }

      // Check if the input is an email
      if (value.includes('@')) {
        // Email-specific validations
        if (/^\./.test(value)) {
          return Promise.reject(new Error('Email cannot start with a dot.'));
        }
        if (/\.\./.test(value)) {
          return Promise.reject(
            new Error('Email cannot contain consecutive dots.'),
          );
        }
        const domainPart = value.split('@')[1];
        if (domainPart && !/^[a-zA-Z0-9+-.]+$/.test(domainPart)) {
          return Promise.reject(
            new Error('Domain name contains invalid characters.'),
          );
        }
        if (/(@|\.)-/.test(value) || /-\./.test(value)) {
          return Promise.reject(
            new Error('Domain name cannot start or end with a hyphen.'),
          );
        }
        if (!/\.[a-zA-Z]{2,}$/.test(value)) {
          return Promise.reject(
            new Error('Domain must have a valid TLD (e.g., .com).'),
          );
        }
        if (/@[a-zA-Z0-9.-]*--/.test(value)) {
          return Promise.reject(
            new Error('Domain name cannot contain consecutive hyphens.'),
          );
        }
        const emailRegex =
          /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~](?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]{0,63}@[a-zA-Z0-9+](?:[a-zA-Z0-9-+]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
        if (!emailRegex.test(value)) {
          return Promise.reject(new Error('Invalid email format.'));
        }
      } else {
        // Username-specific validations
        const usernameRegex = /^[a-zA-Z0-9\s]+$/; // Allows alphanumeric characters and spaces
        if (!usernameRegex.test(value)) {
          return Promise.reject(
            new Error(
              'Username can only contain letters, numbers, and spaces.',
            ),
          );
        }

        // Optional: Set additional constraints on username
        if (value.length < 3 || value.length > 30) {
          return Promise.reject(
            new Error('Username must be between 3 and 30 characters long.'),
          );
        }
      }

      // If all checks pass
      return Promise.resolve();
    }
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
                      rules={[{validator: validateEmail('1')}]}
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
                      rules={[{validator: validateInput('1')}]}
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
                      rules={[{validator: validateEmail('2')}]}
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
                      rules={[{validator: validateInput('2')}]}
                    >
                      <OsInput placeholder="Enter Username" />
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
