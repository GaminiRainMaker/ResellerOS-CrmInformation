/* eslint-disable import/no-extraneous-dependencies */

'use client';

import styled from '@emotion/styled';
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
} from '@heroicons/react/24/outline';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import Typography from '@/app/components/common/typography';
import OsButton, {ButtonType} from '@/app/components/common/os-button';
import {ButtonStyled} from '@/app/components/common/os-button/styled-components';
import {FilePdfOutlined, MoreOutlined, PlusOutlined} from '@ant-design/icons';
import {Tabs} from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const CustomTab = styled(Tabs)`
  width: 100%;
  .ant-tabs-ink-bar {
    border-bottom: 2px solid #1c3557 !important;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 9px 0 22px 0;
  }
  .ant-tabs-nav {
    border-bottom: none;
  }
`;
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
            <OsButton text="Save as Draft" type={ButtonType.PRIMARY} />
            {/* <ButtonStyled>Save as Draft</ButtonStyled> */}
            <ButtonStyled
              style={{background: '#1c3557', color: 'white'}}
              icon={<PlusOutlined />}
            >
              Add Quote
            </ButtonStyled>
            <ButtonStyled style={{background: '#1c3557', color: 'white'}}>
              Mark as Complete
            </ButtonStyled>
            <ButtonStyled
              icon={<FilePdfOutlined />}
              style={{
                width: '48px',
                background: '#1c3557',
                color: 'white',
                padding: '20px',
              }}
            />
          </div>
        </Col>
      </Row>
      <Row style={{background: 'white', padding: '12px', borderRadius: '10px'}}>
        <CustomTab
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
          <TabPane
            tab={
              // eslint-disable-next-line eqeqeq
              <Typography name="Body 4/Regular"> Input Details</Typography>
            }
            key="1"
          >
            <OsTable
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              scroll
            />
          </TabPane>
          <TabPane
            tab={
              // eslint-disable-next-line eqeqeq
              <Typography name="Body 4/Regular">Profitability</Typography>
            }
            key="2"
          >
            Profitability Content
          </TabPane>
          <TabPane
            tab={
              // eslint-disable-next-line eqeqeq
              <Typography name="Body 4/Regular"> Rebates</Typography>
            }
            key="3"
          >
            Rebates Content
          </TabPane>
          <TabPane
            tab={
              // eslint-disable-next-line eqeqeq

              <Typography name="Body 4/Regular"> Validation</Typography>
            }
            key="4"
          >
            Validation Content
          </TabPane>
          <TabPane
            tab={
              <Typography name="Body 4/Regular"> Matrix</Typography>
              // eslint-disable-next-line eqeqeq
            }
            key="5"
          >
            Matrix Content
          </TabPane>
        </CustomTab>
      </Row>
    </Space>
  );
};

export default QuoteAI;
