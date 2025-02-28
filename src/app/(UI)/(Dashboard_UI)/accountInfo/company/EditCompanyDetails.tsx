import { Col, Row } from '@/app/components/common/antd/Grid';
import OsInput from '@/app/components/common/os-input';
import { SelectFormItem } from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import { Form } from 'antd';
import { FC } from 'react';
import { UserProfileInterface } from '../myProfile/profile.interface';

const EditCompanyDetails: FC<UserProfileInterface> = ({
  form,
  isEditable,
  onFinish,
}) => {
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col span={24}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Organization Names</Typography>
            }
            name="company_name"
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
            <OsInput disabled={isEditable} />
          </SelectFormItem>
        </Col>

        <Col span={24}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Address Line</Typography>}
            name="shiping_address_line"
          >
            <OsInput placeholder="Enter here" disabled={isEditable} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              { pattern: /^[A-Za-z\s]+$/, message: 'Please enter a valid city.' },
            ]}
            label={<Typography name="Body 4/Medium">City</Typography>}
            name="shiping_city"
          >
            <OsInput placeholder="Enter here" disabled={isEditable} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter a valid state.',
              },
            ]}
            label={<Typography name="Body 4/Medium">State</Typography>}
            name="shiping_state"
          >
            <OsInput placeholder="Enter here" disabled={isEditable} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Zip Code</Typography>}
            name="shiping_pin_code"
            rules={[
              {
                pattern: /^[0-9]{5}$/,
                message: 'Please enter a valid zip code (5 digits).',
              },
            ]}
          >
            <OsInput placeholder="Enter here" disabled={isEditable} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter a valid country.',
              },
            ]}
            label={<Typography name="Body 4/Medium">Country</Typography>}
            name="shiping_country"
          >
            <OsInput placeholder="Enter here" disabled={isEditable} />
          </SelectFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default EditCompanyDetails;
