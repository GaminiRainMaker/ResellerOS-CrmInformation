'use client';

import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import Form from 'antd/es/form/Form';
import {CustomerAccountInterface} from './os-contact-interface';
import {
  OsContactStyle,
  OsPhoneInputStyle,
} from '../os-contact/styled-components';
import {InputNumber} from 'antd';
import {InputNumberStyled} from '../os-input/styled-components';

const AddContact: React.FC<CustomerAccountInterface> = ({
  onFinish,
  form,
  customerValue,
  setCustomerValue,
  drawer,
  isDealregForm = false,
}) => {
  const [token] = useThemeToken();

  const formatPhoneNumber = (input: any) => {
    const cleaned = input.replace(/\D/g, ''); // Remove non-digits
    const formatted = cleaned.slice(0, 11); // Limit to 11 digits

    if (formatted.length <= 3) {
      return `(${formatted}`;
    } else if (formatted.length <= 6) {
      return `(${formatted.slice(0, 3)}) ${formatted.slice(3)}`;
    } else {
      return `(${formatted.slice(0, 3)}) ${formatted.slice(3, 6)}-${formatted.slice(6, 11)}`;
    }
  };
  const handlePhoneChange = (e: any) => {
    // Get the current value
    const value = e.target.value;

    if (value === '') {
      // If input is empty, reset the form field
      form.setFieldsValue({billing_phone: ''});
    } else {
      // Otherwise, format the phone number
      const formattedValue = formatPhoneNumber(value);
      form.setFieldsValue({billing_phone: formattedValue});
    }
  };

  return (
    <>
      {!drawer && (
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
            Add Contact
          </Typography>
        </Row>
      )}

      <Form
        layout="vertical"
        requiredMark={false}
        style={{
          padding: drawer ? '0px' : '40px',
        }}
        form={form}
        onFinish={onFinish}
      >
        {!isDealregForm && (
          <>
            <OsCustomerSelect
              setCustomerValue={setCustomerValue}
              customerValue={customerValue}
              isAddNewCustomer
              isRequired
            />
            <Divider style={{border: '1px solid #C7CDD5'}} />
          </>
        )}

        <Row gutter={[16, 24]} justify="space-between">
          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">First Name</Typography>}
              name="billing_first_name"
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>

          <Col span={12}>
            <SelectFormItem
              rules={[
                {
                  required: true,
                  message: 'Last Name is required!',
                },
              ]}
              label={<Typography name="Body 4/Medium">Last Name</Typography>}
              name="billing_last_name"
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>

          <Col span={24}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Role</Typography>}
              name="billing_role"
              rules={[
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Please enter valid role.',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>
          <Col span={24}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Email</Typography>}
              name="billing_email"
              rules={[
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter valid email.',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>
          <Col span={24}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Phone</Typography>}
              name="billing_phone"
              rules={[
                {
                  required: true,
                  message: 'Please enter a phone number.',
                },
                {
                  pattern: /^\(\d{3}\) \d{3}-\d{4}$/, // Regex to match (XXX) XXX-XXXX format
                  message: 'Please enter a valid phone number.',
                },
              ]}
            >
              <OsInput
                maxLength={14} // Includes parentheses and dashes
                placeholder="Enter phone number"
                onChange={handlePhoneChange}
              />
            </SelectFormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddContact;
