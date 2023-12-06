/* eslint-disable import/no-extraneous-dependencies */

'use client';

import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import type {ColumnsType} from 'antd/es/table';
import TabPane from 'antd/es/tabs/TabPane';
import React, {useState} from 'react';
import {
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  TagIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import Typography from '@/app/components/common/typography';
import OsButton, {ButtonType} from '@/app/components/common/os-button';
import {ButtonStyled} from '@/app/components/common/os-button/styled-components';
import {FilePdfOutlined} from '@ant-design/icons';
import {Avatar} from 'antd';
import OsTabs from '@/app/components/common/os-tabs';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const QuoteAI: React.FC = () => {
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const data123 = [
    {
      key: 1,
      primary: '217',
      secondry: 'Line Items',
      icon: <DocumentTextIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorPrimaryHover,
    },
    {
      key: 2,
      primary: '$0.00',
      secondry: 'Quote Total',
      icon: <TagIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: '$734,308.14',
      secondry: 'Total Cost',
      icon: <CurrencyDollarIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: '$0.00',
      secondry: 'Total GP',
      icon: <BanknotesIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
    {
      key: 5,
      primary: '0%',
      secondry: 'Total GP%',
      icon: <ReceiptPercentIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 6,
      primary: '$21,966.00',
      secondry: 'Rebate Total',
      icon: <CreditCardIcon width={24} color={token?.colorLinkHover} />,
      iconBg: token?.colorInfoHover,
    },
  ];

  const TabPaneData = [
    {
      key: 1,
      name: 'Input Details',
    },
    {
      key: 2,
      name: 'Profitability',
    },
    {
      key: 3,
      name: 'Rebates',
    },
    {
      key: 4,
      name: 'Validation',
    },
    {
      key: 5,
      name: 'Matrix',
    },
  ];
  console.log('435435', setActiveTab);
  return (
    <Space size={24} direction="vertical" style={{width: '100%'}}>
      <Row
        justify="space-between"
        style={{
          padding: '36px 24px',
          background: 'white',
          borderRadius: '12px',
        }}
        gutter={[0, 16]}
      >
        {data123?.map((item) => (
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
            Generated Quote
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
            <OsButton text="Save as Draft" buttontype="" />
            <OsButton
              text="Add Quote"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
            />
            <OsButton text=" Mark as Complete" buttontype="PRIMARY" />

            <OsButton buttontype="PRIMARY_ICON" icon={<FilePdfOutlined />} />
          </div>
        </Col>
      </Row>
      <Row style={{background: 'white', padding: '12px', borderRadius: '10px'}}>
        <OsTabs
          onChange={(e) => {
            setActiveTab(e);
          }}
          activeKey={activeTab}
          tabBarExtraContent={
            <>
              <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
                Select Grouping
              </Typography>
            </>
          }
        >
          {TabPaneData?.map((item, index) => (
            <TabPane
              tab={
                // eslint-disable-next-line eqeqeq
                <Typography
                  name="Body 4/Regular"
                  // eslint-disable-next-line eqeqeq
                  color={
                    // eslint-disable-next-line eqeqeq
                    activeTab == item?.key ? token?.colorPrimary : '#666666'
                  }
                >
                  {' '}
                  {item?.name}
                </Typography>
              }
              key={item?.key}
            >
              <OsTable
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                scroll
              />
            </TabPane>
          ))}
        </OsTabs>
      </Row>
    </Space>
  );
};

export default QuoteAI;
