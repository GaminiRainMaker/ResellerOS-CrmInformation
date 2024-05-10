'use client';

import Typography from '@/app/components/common/typography';
import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Form, {FormInstance} from 'antd/es/form/Form';

interface CustomerAccountInterface {
  onFinish: any;
  drawer?: boolean;
  form: FormInstance;
  customerValue?: number;
  setCustomerValue: any;
}

const AddContact: React.FC<CustomerAccountInterface> = ({
  onFinish,
  form,
  customerValue,
  setCustomerValue,
  drawer,
}) => {
  const [token] = useThemeToken();
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
        <OsCustomerSelect
          setCustomerValue={setCustomerValue}
          customerValue={customerValue}
          isAddNewCustomer
          isRequired
        />
        <Divider style={{border: '1px solid #C7CDD5'}} />

        <Row gutter={[16, 24]} justify="space-between">
          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">First Name</Typography>}
              name="billing_first_name"
              rules={[
                {
                  required: true,
                  message: 'First Name is required!',
                },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Please enter valid text.',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>

          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Last Name</Typography>}
              name="billing_last_name"
              rules={[
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: 'Please enter valid text.',
                },
              ]}
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
                {
                  required: true,
                  message: 'Role is required!',
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
                {
                  required: true,
                  message: 'Email is required!',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddContact;
