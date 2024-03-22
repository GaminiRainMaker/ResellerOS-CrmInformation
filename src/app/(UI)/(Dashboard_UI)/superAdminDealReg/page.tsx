'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {standardAttributesData, templateDummyData} from '@/app/utils/CONSTANTS';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useState} from 'react';
import SuperAdminDealRegAnalytic from './superAdminDealRegAnalytic';
import {standardAttributes, templateColumns} from './templateColumns';

const SuperAdminDealReg = () => {
  const [token] = useThemeToken();
  const [showModalDelete, setShowModalDelete] = useState<any>();

  const statusWrapper = (item: any) => {
    const getStatus = () => item;

    return <OsStatusWrapper value={getStatus()} />;
  };
  const editQuote = () => {};
  const setDeleteIds = () => {};

  const TemplateColumns = templateColumns(
    token,
    statusWrapper,
    editQuote,
    setDeleteIds,
    setShowModalDelete,
  );
  const StandardAttributesColumns = standardAttributes(
    token,
    statusWrapper,
    editQuote,
    setDeleteIds,
    setShowModalDelete,
  );

  const superAdmintabItems = [
    {
      label: <Typography name="Body 4/Regular">Templates</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={TemplateColumns}
          dataSource={templateDummyData}
          // rowSelection={rowSelection}
          scroll
          locale={[]}
          loading={false}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Standard Attributes</Typography>,
      key: '2',
      children: (
        <OsTable
          columns={StandardAttributesColumns}
          dataSource={standardAttributesData}
          // rowSelection={rowSelection}
          scroll
          locale={[]}
          loading={false}
        />
      ),
    },
    {
      label: (
        <Typography name="Body 4/Regular">
          Standard Attributes Sections
        </Typography>
      ),
      key: '3',
      children: <>In Development Phase....</>,
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
