import {Col, Row} from '@/app/components/common/antd/Grid';
import ContactInput from '@/app/components/common/os-contact';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FC} from 'react';
import {UserProfileInterface} from './profile.interface';

const EditUserDetails: FC<UserProfileInterface> = ({
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
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">First Name</Typography>}
            name="first_name"
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter valid text.',
              },
            ]}
          >
            <OsInput disabled={isEditable} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Last Name</Typography>}
            name="last_name"
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter valid text.',
              },
            ]}
          >
            <OsInput disabled={isEditable} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Email</Typography>}
            name="email"
            // rules={[
            //   {
            //     pattern: /^[A-Za-z\s]+$/,
            //     message: 'Please enter valid text.',
            //   },
            // ]}
          >
            <OsInput disabled={isEditable} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Contact No.</Typography>}
            name="phone_number"
            // rules={[
            //   {
            //     pattern: /^[A-Za-z\s]+$/,
            //     message: 'Please enter valid text.',
            //   },
            // ]}
          >
            <ContactInput
              disabled={isEditable}
              name="contact_number"
              id="contact_number"
              value={''}
              onChange={(value) => {}}
            />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Job Title</Typography>}
            name="job_title"
            // rules={[
            //   {
            //     pattern: /^[A-Za-z\s]+$/,
            //     message: 'Please enter valid text.',
            //   },
            // ]}
          >
            <OsInput disabled={isEditable} />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Company Name</Typography>}
            name="company_name"
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter valid text.',
              },
            ]}
          >
            <OsInput disabled={isEditable} />
          </SelectFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default EditUserDetails;
