import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import Typography from '@/app/components/common/typography';
import {Drawer, Form} from 'antd';
import React from 'react';
import {CollapseSpaceStyle} from '../dealRegDetail/DealRegDetailForm/styled-components';
import {FormBuilderInterFace} from './formBuilder.interface';

const EditFiledDetails: React.FC<FormBuilderInterFace> = ({
  isOpenDrawer = false,
  setIsOpenDrawer,
}) => {
  const [token] = useThemeToken();
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: 800,
    overflow: 'hidden',
    background: 'null',
    border: 'null',
    borderRadius: 'null',
    padding: '0px',
  };

  const QuickSetupItems = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Quick Setup
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col sm={12}>
              <Form.Item
                label={
                  <Typography name="Body 4/Medium">No. of Rows</Typography>
                }
                name="no_of_rows"
              >
                <OsInputNumber placeholder="2" />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item
                label={
                  <Typography name="Body 4/Medium">No. of Columns</Typography>
                }
                name="no_of_columns"
              >
                <OsInputNumber placeholder="2" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  const OptionsItems = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Options
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          <Row>
            <Col>
              <Form.Item
                label={
                  <Typography name="Body 4/Medium">Required Field</Typography>
                }
                name="is_required"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return (
    <div style={containerStyle}>
      <Drawer
        title="Text Field"
        placement="right"
        closable={false}
        onClose={() => setIsOpenDrawer && setIsOpenDrawer(false)}
        open={isOpenDrawer}
        getContainer={false}
      >
        <Row >
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin items={QuickSetupItems} />
          </CollapseSpaceStyle>
        </Row>

        <Row>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin items={OptionsItems} />
          </CollapseSpaceStyle>
        </Row>
      </Drawer>
    </div>
  );
};

export default EditFiledDetails;
