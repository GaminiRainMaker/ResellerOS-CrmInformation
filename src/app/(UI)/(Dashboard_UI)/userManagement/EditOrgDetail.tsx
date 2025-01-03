import {Col, Row} from '@/app/components/common/antd/Grid';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FormInstance} from 'antd/lib';
import {FC} from 'react';

const EditOrgDetail: FC<{
  onFinish: any;
  form: FormInstance;
  drawer?: boolean;
  editRecordData?: any;
}> = ({form, onFinish, drawer, editRecordData}) => {
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={[12, 12]} justify="space-between">
        <Col span={drawer ? 24 : 12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Organization</Typography>}
            name={'organization'}
            rules={[
              {
                required: true,
                message: 'Organization is required!',
              },
            ]}
          >
            <OsInput placeholder="Organization" />
          </SelectFormItem>
        </Col>
        <Col span={drawer ? 24 : 12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Master Email</Typography>}
            name={'email'}
            rules={[
              {
                required: true,
                message: 'Master Email is required!',
              },
            ]}
          >
            <OsInput placeholder="Master Email" />
          </SelectFormItem>
        </Col>
        <Col span={drawer ? 24 : 12}>
          <SelectFormItem
            label={
              <Typography name="Body 4/Medium">
                Master Admin Username
              </Typography>
            }
            name={'user_name'}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Salesforce Org Name is required!',
            //   },
            // ]}
          >
            <OsInput placeholder="Enter Username" />
          </SelectFormItem>
        </Col>
        {editRecordData?.org_id && (
          <Col span={drawer ? 24 : 12}>
            <SelectFormItem
              label={
                <Typography name="Body 4/Medium">Organization ID</Typography>
              }
              name={'org_id'}
              rules={[
                {
                  required: true,
                  message: 'Org Id is required!',
                },
              ]}
            >
              <OsInput placeholder="Enter Salesforce Org ID" />
            </SelectFormItem>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default EditOrgDetail;
