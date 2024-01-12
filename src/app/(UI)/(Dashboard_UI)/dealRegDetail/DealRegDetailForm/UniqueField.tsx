import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import React from 'react';
import Typography from '@/app/components/common/typography';
import {CollapseSpaceStyle} from './styled-components';

const UniqueFields = () => {
  const AccountInformationItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Account Information</Typography>,
      children: (
        <Space
          size={36}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Account Name</Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Industry</Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Account Website</Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>

            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Account Contact</Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  return (
    <CollapseSpaceStyle size={24} direction="vertical">
      <OsCollapseAdmin items={AccountInformationItem} />
    </CollapseSpaceStyle>
  );
};
export default UniqueFields;
