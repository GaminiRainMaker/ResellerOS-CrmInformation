/* eslint-disable import/no-extraneous-dependencies */

'use client';

import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClockIcon,
  DocumentCheckIcon,
  EllipsisVerticalIcon,
  QueueListIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsTabs from '@/app/components/common/os-tabs';
import TabPane from 'antd/es/tabs/TabPane';
import {useState} from 'react';
import OsTable from '@/app/components/common/os-table';
import OsCollapse from '@/app/components/common/os-collapse';
import {CollapseProps} from 'antd';

const AllQuote: React.FC = () => {
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');

  const analyticsData = [
    {
      key: 1,
      primary: '1000',
      secondry: 'Total Quotes',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorPrimaryHover,
    },
    {
      key: 2,
      primary: '550',
      secondry: 'Completed',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: '20',
      secondry: 'Draft',
      icon: <DocumentCheckIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: '05',
      secondry: 'Recents',
      icon: <ClockIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: '30',
      secondry: 'Deleted',
      icon: <TrashIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorErrorBg,
    },
  ];

  const TabPaneData = [
    {
      key: 1,
      name: 'All',
      // tableData: s
    },
    {
      key: 2,
      name: 'Drafts',
    },
    {
      key: 3,
      name: 'Completed',
    },
    {
      key: 4,
      name: 'Recent',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <Row justify="space-between">
          <Col span={6}>
            <Typography name="Body 4/Medium">Hewlett</Typography>
          </Col>
          <Col span={6}>
            <Typography name="Body 4/Medium">Lines: 9</Typography>
          </Col>
          <Col span={6}>
            <Typography name="Body 4/Medium">MSRP: $5,511.00</Typography>
          </Col>
          <Col span={6}>
            <Typography name="Body 4/Medium">Cost: $3,511.00</Typography>
          </Col>
        </Row>
      ),
      children: <OsTable columns={columns} dataSource={dataSource} scroll />,
    },
    {
      key: '2',
      label: (
        <Row justify="space-between">
          <Col span={6}>
            <Typography name="Body 4/Medium">Dell</Typography>
          </Col>
          <Col span={6}>
            <Typography name="Body 4/Medium">Lines: 9</Typography>
          </Col>
          <Col span={6}>
            <Typography name="Body 4/Medium">MSRP: $5,511.00</Typography>
          </Col>
          <Col span={6}>
            <Typography name="Body 4/Medium">Cost: $3,511.00</Typography>
          </Col>
        </Row>
      ),
      children: <OsTable columns={columns} dataSource={dataSource} scroll />,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <OsTable columns={columns} dataSource={dataSource} scroll />,
    },
  ];

  return (
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      <Row
        justify="space-between"
        style={{
          padding: '36px 24px',
          background: token?.colorBgContainer,
          borderRadius: '12px',
        }}
        gutter={[0, 16]}
      >
        {analyticsData?.map((item) => (
          <Col>
            <TableNameColumn
              primaryText={item?.primary}
              secondaryText={item?.secondry}
              fallbackIcon={item?.icon}
              iconBg={item?.iconBg}
            />
          </Col>
        ))}
      </Row>

      <Row justify="space-between" align="middle">
        <Col>
          <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
            All Quotes
          </Typography>
        </Col>
        <Col>
          <div
            style={{
              display: 'flex',
              // justifyContent: 'space-evenly',
              width: '40%',
              gap: '8px',
            }}
          >
            <OsButton text="Save as Draft" buttontype="SECONDARY" />
            <OsButton text=" Mark as Complete" buttontype="PRIMARY" />

            <OsButton
              buttontype="PRIMARY_ICON"
              icon={<EllipsisVerticalIcon />}
            />
          </div>
        </Col>
      </Row>
      <Row style={{background: 'white', padding: '24px', borderRadius: '12px'}}>
        <OsTabs
          onChange={(e) => {
            setActiveTab(e);
          }}
          activeKey={activeTab}
          tabBarExtraContent={
            <Space size={12} align="center">
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">From Date</Typography>

                <CommonDatePicker placeholder="dd/mm/yyyy" />
              </Space>
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">To Date</Typography>

                <CommonDatePicker placeholder="dd/mm/yyyy" />
              </Space>

              <Typography name="Button 1" color="#C6CDD5">
                Reset
              </Typography>
            </Space>
          }
        >
          {TabPaneData?.map((item) => (
            <TabPane
              tab={
                <Typography
                  name="Body 4/Regular"
                  color={
                    activeTab === item?.key ? token?.colorPrimary : '#666666'
                  }
                >
                  {item?.name}
                </Typography>
              }
              key={item?.key}
            >
              <OsCollapse items={items} />
            </TabPane>
          ))}
        </OsTabs>
      </Row>
    </Space>
  );
};

export default AllQuote;
