import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FormInstance} from 'antd/lib';
import {FC} from 'react';

const AddNewOrganization: FC<{
  form: FormInstance;
  onFinish: any;
}> = ({form, onFinish}) => {
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      style={
        {
          //   padding: drawer ? '0px' : '40px',
        }
      }
      onFinish={onFinish}
    >
      <Row gutter={[12, 12]} justify="space-between">
        <Col span={12}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Organization Email</Typography>
            }
            name={'organization_email'}
            rules={[
              {
                required: true,
                message: 'Organization Email is required!',
              },
            ]}
          >
            <OsInput placeholder="Enter Organization Email" />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Master Email</Typography>}
            name={'email'}
            rules={[
              {
                required: true,
                message: 'Email is required!',
              },
            ]}
          >
            <OsInput placeholder="Enter Email" />
          </SelectFormItem>
        </Col>

        <Col span={12}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Master Username</Typography>
            }
            name={'user_name'}
            rules={[
              {
                required: true,
                message: 'Username is required!',
              },
            ]}
          >
            <OsInput placeholder="Enter Text" />
          </SelectFormItem>
        </Col>

        <Col span={12}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">
                Salesforce Organization
              </Typography>
            }
            name="is_salesforce"
            valuePropName="checked"
          >
            <Checkbox />
          </SelectFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewOrganization;
