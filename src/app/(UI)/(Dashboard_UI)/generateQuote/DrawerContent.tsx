import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsInput from '@/app/components/common/os-input';
import OsStatusWrapper from '@/app/components/common/os-status';
import Typography from '@/app/components/common/typography';
import {Button, Form} from 'antd';
import {useState} from 'react';

const DrawerContent = () => {
  console.log('object');
  const [form] = Form.useForm();

  const [drawerData, setDrawerData] = useState<{
    id: number | string;
    file: string;
    customer: string;
    opportinity: string;
  }>();

  const onSubmit = (values: {
    file: string;
    opportunity: string;
    customer: string;
  }) => {
    console.log('object', values);
  };
  return (
    <Space size={24} style={{width: '100%'}} direction="vertical">
      <Row justify="space-between">
        <Col>
          <Typography name="Body 4/Medium" as="div">
            Quote Generate Date
          </Typography>
          <Typography name="Body 2/Regular">12/11/2023</Typography>
        </Col>
        <Col>
          <Typography name="Body 4/Medium" as="div">
            Status
          </Typography>
          {/* <Typography name="Body 4/Medium">Drafts</Typography> */}
          <OsStatusWrapper value="Drafts" />
        </Col>
      </Row>
      <Row>
        <Col style={{width: '100%'}}>
          <Form
            layout="vertical"
            name="wrap"
            // labelCol={{flex: '110px'}}
            // labelAlign="left"
            // labelWrap
            wrapperCol={{flex: 1}}
            // colon={false}
            onFinish={onSubmit}
            form={form}
            initialValues={{
              file: 'file  oo',
              customer: 'customer dd',
              opportunity: 'opportunity ddd',
            }}
            // style={{maxWidth: 600}}
          >
            <Form.Item label="File Name" name="file">
              <OsInput />
            </Form.Item>

            <Form.Item label="Opportunity" name="opportunity">
              <OsInput />
            </Form.Item>

            <Form.Item label="Customer" name="customer">
              <OsInput />
            </Form.Item>

            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                // onClick={() => form.su/mit()}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Space>
  );
};

export default DrawerContent;
