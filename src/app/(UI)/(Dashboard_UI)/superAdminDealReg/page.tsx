'use client';

import {Space} from '@/app/components/common/antd/Space';
import React from 'react';
import {Col, Row} from '@/app/components/common/antd/Grid';
import Typography from '@/app/components/common/typography';
import OsButton from '@/app/components/common/os-button';
import {PlusIcon} from '@heroicons/react/24/outline';
import OsDropdown from '@/app/components/common/os-dropdown';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsTabs from '@/app/components/common/os-tabs';
import {Form} from 'antd';
import CommonSelect from '@/app/components/common/os-select';
import SuperAdminDealRegAnalytic from './superAdminDealRegAnalytic';

const SuperAdminDealReg = () => {
  const [token] = useThemeToken();

  const superAdmintabItems = [
    {
      label: <Typography name="Body 4/Regular">Templates</Typography>,
      key: '1',
      children: <>dfgh</>,
    },
    {
      label: <Typography name="Body 4/Regular">Standard Attributes</Typography>,
      key: '2',
      children: <></>,
    },
    {
      label: (
        <Typography name="Body 4/Regular">
          Standard Attributes Sections
        </Typography>
      ),
      key: '3',
      children: <>mnbvcx</>,
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <SuperAdminDealRegAnalytic data={[]} />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Registered Forms
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <Space size={12} style={{height: '48px'}}>
              <OsButton
                text="New Standard Attribute Section"
                buttontype="SECONDARY"
                icon={<PlusIcon color={token?.colorPrimary} />}
              />

              <OsButton
                text="New Template"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
              />

              <OsDropdown menu={{items: []}} />
            </Space>
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            tabBarExtraContent={
              <Form layout="vertical">
                <Space size={12}>
                  <Form.Item label="Attribute Label">
                    <CommonSelect
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Form.Item>

                  <Form.Item label="Attribute Section">
                    <CommonSelect
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Form.Item>
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color="#C6CDD5"
                    onClick={() => {}}
                  >
                    Reset
                  </Typography>
                </Space>
              </Form>
            }
            items={superAdmintabItems}
          />
        </Row>
      </Space>
    </>
  );
};

export default SuperAdminDealReg;
