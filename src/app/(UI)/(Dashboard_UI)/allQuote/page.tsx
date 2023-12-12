/* eslint-disable import/no-extraneous-dependencies */

'use client';

import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  QueueListIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import TabPane from 'antd/es/tabs/TabPane';
import {useEffect, useState} from 'react';
import {getAllQuotesWithCompletedAndDraft} from '../../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {data: quoteData, loading} = useAppSelector((state) => state.quote);

  useEffect(() => {
    dispatch(getAllQuotesWithCompletedAndDraft());
  }, []);

  const Quotecolumns = [
    {
      title: 'Cage Code',
      dataIndex: 'cage_code',
      key: 'cage_code',
    },
    {
      title: 'Credit Cards',
      dataIndex: 'credit_cards',
      key: 'credit_cards',
    },
    {
      title: 'Customer Address',
      dataIndex: 'customer_address',
      key: 'customer_address',
    },
    {
      title: 'Customer City',
      dataIndex: 'customer_city',
      key: 'customer_city',
    },
    {
      title: 'Customer Contact',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
    },
    {
      title: 'Customer Email',
      dataIndex: 'customer_email',
      key: 'customer_email',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Customer Phone',
      dataIndex: 'customer_phone',
      key: 'customer_phone',
    },
    {
      title: 'Customer State',
      dataIndex: 'customer_state',
      key: 'customer_state',
    },
    {
      title: 'Total Price',
      dataIndex: 'customer_street',
      key: 'customer_street',
    },
    {
      title: 'Customer Zip',
      dataIndex: 'customer_zip',
      key: 'customer_zip',
    },

    {
      title: 'Deal Id',
      dataIndex: 'deal_id',
      key: 'deal_id',
    },
    {
      title: 'Distributor Address',
      dataIndex: 'distributor_address',
      key: 'distributor_address',
    },
    {
      title: 'Distributor City',
      dataIndex: 'distributor_city',
      key: 'distributor_city',
    },
    {
      title: 'Distributor Contact',
      dataIndex: 'distributor_contact',
      key: 'distributor_contact',
    },
    {
      title: 'Distributor Email',
      dataIndex: 'distributor_email',
      key: 'distributor_email',
    },
    {
      title: 'Distributor Fax',
      dataIndex: 'distributor_fax',
      key: 'distributor_fax',
    },

    {
      title: 'Distributor Name',
      dataIndex: 'distributor_name',
      key: 'distributor_name',
    },
    {
      title: 'Distributor Phone',
      dataIndex: 'distributor_phone',
      key: 'distributor_phone',
    },
    {
      title: 'Distributor State',
      dataIndex: 'distributor_state',
      key: 'distributor_state',
    },
    {
      title: 'Distributor Street',
      dataIndex: 'distributor_street',
      key: 'distributor_street',
    },
    {
      title: 'Distributor Zip',
      dataIndex: 'distributor_zip',
      key: 'distributor_zip',
    },

    {
      title: 'Duns Number',
      dataIndex: 'duns_number',
      key: 'duns_number',
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
    {
      title: 'Fob Shipping',
      dataIndex: 'fob_shipping',
      key: 'fob_shipping',
    },
    {
      title: 'Ftin',
      dataIndex: 'ftin',
      key: 'ftin',
    },

    {
      title: 'Oem Name',
      dataIndex: 'oem_name',
      key: 'oem_name',
    },
    {
      title: 'Payment Terms',
      dataIndex: 'payment_terms',
      key: 'payment_terms',
    },
    {
      title: 'Quote Amount',
      dataIndex: 'quote_amount',
      key: 'quote_amount',
    },
    {
      title: 'Quote Date',
      dataIndex: 'quote_date',
      key: 'quote_date',
    },
    {
      title: 'Quote Number',
      dataIndex: 'quote_number',
      key: 'quote_number',
    },
    {
      title: 'Remit To',
      dataIndex: 'remit_to',
      key: 'remit_to',
    },
    {
      title: 'Reseller Address',
      dataIndex: 'reseller_address',
      key: 'reseller_address',
    },
    {
      title: 'Reseller City',
      dataIndex: 'reseller_city',
      key: 'reseller_city',
    },
    {
      title: 'Reseller Contact',
      dataIndex: 'reseller_contact',
      key: 'reseller_contact',
    },
    {
      title: 'Reseller Email',
      dataIndex: 'reseller_email',
      key: 'reseller_email',
    },
    {
      title: 'Reseller Name',
      dataIndex: 'reseller_name',
      key: 'reseller_name',
    },
    {
      title: 'Reseller Phone',
      dataIndex: 'reseller_phone',
      key: 'reseller_phone',
    },
    {
      title: 'Reseller State',
      dataIndex: 'reseller_state',
      key: 'reseller_state',
    },
    {
      title: 'Reseller Street',
      dataIndex: 'reseller_street',
      key: 'reseller_street',
    },
    {
      title: 'Reseller Zip',
      dataIndex: 'reseller_zip',
      key: 'reseller_zip',
    },
    {
      title: 'Shipping',
      dataIndex: 'shipping',
      key: 'shipping',
    },
    {
      title: 'Shipping Amount',
      dataIndex: 'shipping_amount',
      key: 'shipping_amount',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
    {
      title: 'UEI',
      dataIndex: 'uei',
      key: 'uei',
    },
  ];
  const analyticsData = [
    {
      key: 1,
      primary: '1000',
      secondry: 'Total Quotes',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: '650',
      secondry: 'Completed',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: '20',
      secondry: 'Drafts',
      icon: <ClipboardDocumentCheckIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: '05',
      secondry: 'Recents',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: '30',
      secondry: 'Deleted',
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
  ];

  const TabPaneData = [
    {
      key: 1,
      name: 'All',
      // tableData: s
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
                  <div
                    style={{
                      // eslint-disable-next-line eqeqeq
                      borderBottom:
                        // eslint-disable-next-line eqeqeq
                        activeTab == item?.key ? '2px solid #1C3557' : '',
                      marginTop: '3px',
                    }}
                  />
                </Typography>
              }
              key={item?.key}
            >
              <OsTable
                columns={Quotecolumns}
                dataSource={quoteData}
                scroll
                loading={loading}
              />
            </TabPane>
          ))}
        </OsTabs>
      </Row>
    </Space>
  );
};

export default AllQuote;
