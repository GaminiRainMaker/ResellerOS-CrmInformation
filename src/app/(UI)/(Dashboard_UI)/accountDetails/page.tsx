/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import {OsCard} from '@/app/components/common/os-card';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import DetailAnalyticCard from '@/app/components/common/os-table/DetailAnalyticCard';
import Typography from '@/app/components/common/typography';
import {StageValue} from '@/app/utils/CONSTANTS';
import {
  CheckCircleIcon,
  EyeIcon,
  PencilSquareIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Space} from 'antd';

import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {formatDate} from '@/app/utils/base';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getCustomerBYId} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import DetailCard from './DetailCard';
import {setBillingContact} from '../../../../../redux/slices/billingAddress';

const AccountDetails = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const {abbreviate} = useAbbreviationHook(0);

  const {loading, data: customerData} = useAppSelector(
    (state) => state.customer,
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getCustomerID = searchParams.get('id');

  useEffect(() => {
    dispatch(getCustomerBYId(getCustomerID));
  }, [getCustomerID]);

  useEffect(() => {
    if (customerData?.profile_image) {
      dispatch(
        setBillingContact({
          image: customerData?.profile_image,
          BillingContacts: customerData?.BillingContacts,
          name: customerData?.name,
          id: customerData?.id,
        }),
      );
    }
  }, [customerData]);

  const analyticsData = [
    {
      key: 1,
      primary: <div>{customerData?.Opportunities?.length ?? 0}</div>,
      secondry: 'Total Opportunities',
      icon: <CheckCircleIcon width={36} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 2,
      primary: <div>{customerData?.Quotes?.length ?? 0}</div>,
      secondry: 'Total Quotes',
      icon: <TagIcon width={36} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 3,
      primary: (
        <div>
          {customerData?.Quotes?.filter(
            (item: any) => item.approved_request === true,
          ).length ?? 0}
        </div>
      ),
      secondry: 'Completed Quotes',
      icon: <CheckCircleIcon width={36} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
  ];

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/crmInAccount');
          }}
        >
          Accounts
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography
          name="Heading 3/Medium"
          cursor="pointer"
          color={token?.colorPrimaryText}
          onClick={() => {
            // router?.push(`/accountDetails?id=${getQuoteID}`);
          }}
        >
          {customerData?.name}
        </Typography>
      ),
    },
  ];

  const Quotecolumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          File Name
        </Typography>
      ),
      dataIndex: 'file_name',
      key: 'file_name',
      width: 250,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.file_name ??
            formatDate(record?.createdAt, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Opportunity
        </Typography>
      ),
      dataIndex: 'opportunity',
      key: 'opportunity',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.Opportunity?.title ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {customerData?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string, record: any) => (
        <span style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={text} />
        </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: 139,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              // router.push(`/generateQuote?id=${record?.id}`);
            }}
          />
          <EyeIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              // router.push(`/generateQuote?id=${record?.id}`);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
          />
        </Space>
      ),
    },
  ];

  const OpportunityColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Opportunity
        </Typography>
      ),
      dataIndex: 'title',
      key: 'title',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    // {
    //   title: (
    //     <Typography name="Body 4/Medium" className="dragHandler">
    //       Customer Account
    //     </Typography>
    //   ),
    //   dataIndex: 'customer_name',
    //   key: 'customer_name',
    //   width: 187,
    //   render: (text: string) => (
    //     <Typography name="Body 4/Regular">
    //       {customerData?.name ?? '--'}
    //     </Typography>
    //   ),
    // },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Amount
        </Typography>
      ),
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {' '}
          {`$ ${abbreviate(Number(text ?? 0))}` ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Stage
        </Typography>
      ),
      dataIndex: 'stages',
      key: 'stages',
      width: 130,
      render: (text: string, record: any) => (
        <CommonStageSelect
          options={StageValue}
          // value={text}
          currentStage={text}
        />
      ),
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {}}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
          />
        </Space>
      ),
    },
  ];

  const locale = {
    emptyText: <EmptyContainer title="No Data" />,
  };

  return (
    <>
      <OsBreadCrumb items={menuItems} />

      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} sm={8} md={8} lg={6}>
          <DetailCard />
        </Col>
        <Col xs={24} sm={16} md={16} lg={18}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
            <Row justify="space-between" gutter={[16, 16]}>
              {analyticsData?.map((item: any) => (
                <Col xs={24} sm={24} md={24} lg={10} xl={8} xxl={8}>
                  <DetailAnalyticCard
                    primaryText={item?.primary}
                    secondaryText={item?.secondry}
                    fallbackIcon={item?.icon}
                    iconBg={item?.iconBg}
                  />
                </Col>
              ))}
            </Row>

            <Row justify="start">
              <Typography name="Heading 3/Medium">Quotes</Typography>
            </Row>

            <OsCard>
              <OsTableWithOutDrag
                loading={loading}
                columns={Quotecolumns}
                dataSource={customerData?.Quotes}
                scroll
                locale={locale}
              />
            </OsCard>

            <Row justify="start">
              <Typography name="Heading 3/Medium">Opportunities</Typography>
            </Row>

            <OsCard>
              <OsTable
                loading={loading}
                columns={OpportunityColumns}
                dataSource={customerData?.Opportunities}
                locale={locale}
              />
            </OsCard>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default AccountDetails;
