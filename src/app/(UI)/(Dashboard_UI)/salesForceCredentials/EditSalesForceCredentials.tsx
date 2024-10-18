import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FormInstance} from 'antd/lib';
import {FC} from 'react';

const EditSalesForceCredentials: FC<{
  onFinish: any;
  form: FormInstance;
}> = ({form, onFinish}) => {
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={[12, 12]} justify="space-between">
        <Col span={24}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Username</Typography>}
            name={'username'}
            rules={[
              {
                required: true,
                message: 'Username is required!',
              },
            ]}
          >
            <OsInput placeholder="Enter Username" />
          </SelectFormItem>
        </Col>
        <Col span={24}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Salesforce Org ID</Typography>
            }
            name={'saleforce_org_Id'}
            rules={[
              {
                required: true,
                message: 'Salesforce Org ID is required!',
              },
            ]}
          >
            <OsInput placeholder="Enter Salesforce Org ID" />
          </SelectFormItem>
        </Col>
        <Col span={24}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Consumer Key</Typography>}
            name={'consumer_key'}
            rules={[
              {
                required: true,
                message: 'Consumer Key is required!',
              },
            ]}
          >
            <OsInput placeholder="Enter Salesforce Org ID" />
          </SelectFormItem>
        </Col>
        <Col span={24}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">Consumer Secret</Typography>
            }
            name={'consumer_secret'}
            rules={[
              {
                required: true,
                message: 'Consumer Secret is required!',
              },
            ]}
          >
            <OsInput placeholder="Enter Consumer Secret" />
          </SelectFormItem>
        </Col>
        <Col span={24}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Login URL</Typography>}
            name={'login_url'}
            rules={[
              {
                required: true,
                message: 'Login URL is required!',
              },
            ]}
          >
            <OsInput placeholder="Enter Login URL" />
          </SelectFormItem>
        </Col>

        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">SSO Login</Typography>}
            name="is_sso"
            valuePropName="checked"
          >
            <Switch />
          </SelectFormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default EditSalesForceCredentials;
