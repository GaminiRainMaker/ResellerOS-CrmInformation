import {Col, Form, Row, Space} from 'antd';
import {FC, useEffect} from 'react';
import {Switch} from '../antd/Switch';
import useThemeToken from '../hooks/useThemeToken';
import OsInput from '../os-input';
import Typography from '../typography';
import {OsAdduser} from './add-users.interface';

const AddUser: FC<OsAdduser> = ({
  isDrawer = false,
  userData,
  onFinish,
  form,
}) => {
  const [token] = useThemeToken();

  useEffect(() => {
    form.resetFields();
  }, [userData]);

  return (
    <>
      {!isDrawer && (
        <Row
          justify="space-between"
          style={{
            padding: '24px 40px 20px 40px',
            backgroundColor: '#F0F4F7',
            borderRadius: '10px 10px 0px 0px',
          }}
          gutter={[0, 16]}
        >
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Add New User
          </Typography>
        </Row>
      )}

      <Space
        size={16}
        direction="vertical"
        style={{width: '100%', padding: !isDrawer ? '24px 40px 20px 40px' : ''}}
      >
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onFinish={onFinish}
          initialValues={userData}
        >
          <Row gutter={[16, 16]}>
            <Col sm={24} md={12}>
              <Form.Item label="Name" name="user_name">
                <OsInput placeholder="Enter Name" />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item label="Email" name="email">
                <OsInput placeholder="Enter Email" />
              </Form.Item>
            </Col>
          </Row>
          <Space size={30} direction="horizontal" align="center">
            <Typography name="Body 4/Medium">Is Admin?</Typography>
            <Form.Item label="" name="is_admin">
              <Switch size="default" />
            </Form.Item>
          </Space>
        </Form>
      </Space>
    </>
  );
};

export default AddUser;
