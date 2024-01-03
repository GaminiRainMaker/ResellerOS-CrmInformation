/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import {OsCard} from '@/app/components/common/os-card';
import OsTable from '@/app/components/common/os-table';
import DetailAnalyticCard from '@/app/components/common/os-table/DetailAnalyticCard';
import Typography from '@/app/components/common/typography';
import {
  CheckCircleIcon,
  EyeIcon,
  PencilSquareIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Space} from 'antd';
import OsStatusWrapper from '@/app/components/common/os-status';
import {
  StageValue,
  opportunityDummyData,
  quoteDummyData,
} from '@/app/utils/CONSTANTS';
import {useEffect} from 'react';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import {useSearchParams} from 'next/navigation';
import DetailCard from './DetailCard';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {getCustomerBYId} from '../../../../../redux/actions/customer';

const AccountDetails = () => {
  const [token] = useThemeToken();
  const {loading, data: filteredData} = useAppSelector(
    (state) => state.customer,
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getCustomerID = searchParams.get('id');

  useEffect(() => {
    dispatch(getCustomerBYId(getCustomerID));
  }, [getCustomerID]);

  console.log('filteredData', filteredData);
  const analyticsData = [
    {
      key: 1,
      primary: <div>{filteredData?.Opportunities?.length}</div>,
      secondry: 'Total Opportunities',
      icon: <CheckCircleIcon width={36} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 2,
      primary: <div>{0}</div>,
      secondry: 'Total Quotes',
      icon: <TagIcon width={36} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 3,
      primary: <div>{41}</div>,
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
            // router?.push('/allQuote');
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
          Impres Technologies
        </Typography>
      ),
    },
  ];

  const Quotecolumns = [
    {
      title: 'File Name',
      dataIndex: 'name',
      key: 'name',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Generated Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Opportunity',
      dataIndex: 'opportunity',
      key: 'opportunity',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string, record: any) => (
        <OsStatusWrapper value={record.status} />
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
      title: 'Opportunity',
      dataIndex: 'title',
      key: 'title',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Customer Account',
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {filteredData?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Stage',
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
      title: 'Quotes / Forms',
      dataIndex: 'quotesForms',
      key: 'quotesForms',
      width: 130,
      render: (text: string) => (
        <Typography color={token?.colorLink} name="Body 4/Bold">
          View All
        </Typography>
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

  return (
    <>
      <OsBreadCrumb items={menuItems} />

      <Row justify="space-between" style={{width: '100%'}} gutter={[16, 16]}>
        <Col>
          <DetailCard />
        </Col>
        <Col span={17}>
          <Space direction="vertical" size={24} style={{width: '100%'}}>
            <Row gutter={[16, 16]} justify="center">
              {analyticsData?.map((item: any) => (
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
                  <DetailAnalyticCard
                    primaryText={item?.primary}
                    secondaryText={item?.secondry}
                    fallbackIcon={item?.icon}
                    iconBg={item?.iconBg}
                  />
                </Col>
              ))}
            </Row>

            <Row justify="space-between">
              <Col>
                <Typography name="Heading 3/Medium">Quotes</Typography>
              </Col>
              <Col style={{float: 'right'}}>
                <OsButton
                  buttontype="PRIMARY"
                  clickHandler={() => {}}
                  text="View all"
                />
              </Col>
            </Row>

            <OsCard>
              <OsTable
                loading={false}
                columns={Quotecolumns}
                dataSource={quoteDummyData}
                scroll
              />
            </OsCard>

            <Row justify="space-between">
              <Col>
                <Typography name="Heading 3/Medium">Opportunities</Typography>
              </Col>
              <Col style={{float: 'right'}}>
                <OsButton
                  buttontype="PRIMARY"
                  clickHandler={() => {}}
                  text="View all"
                />
              </Col>
            </Row>

            <OsCard>
              <OsTable
                loading={false}
                columns={OpportunityColumns}
                dataSource={filteredData?.Opportunities}
              />
            </OsCard>
          </Space>
        </Col>
      </Row>
    </>
  );
};
export default AccountDetails;
