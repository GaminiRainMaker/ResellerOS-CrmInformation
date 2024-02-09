/* eslint-disable no-nested-ternary */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OpportunityAnalyticCard from '@/app/components/common/os-opportunity-analytic-card';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {EyeIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import {getOpportunityById} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const OpportunityDetails = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const opportunityId = searchParams.get('id');
  const {loading, data: opportunityData} = useAppSelector(
    (state) => state.Opportunity,
  );
  useEffect(() => {
    dispatch(getOpportunityById(opportunityId));
  }, []);

  const OpportunityData = {
    title: opportunityData?.[0]?.title,
    amount: opportunityData?.[0]?.amount,
    customer: opportunityData?.[0]?.Customer?.name,
    quotes: opportunityData?.[0]?.Quotes,
  };

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/crmOpportunity');
          }}
        >
          Opportunities
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
          {OpportunityData?.title}
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
      dataIndex: 'name',
      key: 'name',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
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
        <Typography name="Body 4/Regular">
          {OpportunityData?.title ?? '--'}
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
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
      render: (text: string, record: any) => {
        const statusValue = record.is_completed
          ? 'Completed'
          : record?.is_drafted
            ? 'In Progress'
            : 'Drafts';
        return <OsStatusWrapper value={statusValue} />;
      },
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
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

  const locale = {
    emptyText: <EmptyContainer title="No Files" actionButton="Add Quote" />,
  };

  const tabItems = [
    {
      label: <Typography name="Body 4/Regular">All</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={Quotecolumns}
          dataSource={OpportunityData?.quotes}
          scroll
          loading={loading}
          locale={locale}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">In Progress</Typography>,
      key: '2',
    },
    {
      label: <Typography name="Body 4/Regular">Completed</Typography>,
      key: '3',
    },
  ];

  const dropDownItemss = [
    {
      key: '1',
      label: (
        <Typography name="Body 3/Regular">Bundle Configuration</Typography>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={24} style={{width: '100%'}}>
      <OsBreadCrumb items={menuItems} />
      <OpportunityAnalyticCard OpportunityData={OpportunityData} />
      <Row justify="space-between">
        <Col>
          <Typography name="Heading 3/Medium">Quotes</Typography>
        </Col>
        <Col style={{float: 'right'}}>
          <div
            style={{
              display: 'flex',
              width: '40%',
              gap: '8px',
            }}
          >
            <OsButton
              text="Add Quote"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
            />
            <Space>
              <OsDropdown menu={{items: dropDownItemss}} />
            </Space>
          </div>
        </Col>
      </Row>
      <Row style={{background: 'white', padding: '24px', borderRadius: '12px'}}>
        <OsTabs
          tabBarExtraContent={
            <Space size={12} align="center">
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">Registration Form</Typography>
                <OsInput style={{width: '180px'}} placeholder="Search Here" />
              </Space>
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">Customer Account</Typography>
                <CommonSelect
                  style={{width: '180px'}}
                  placeholder="Search Here"
                />
              </Space>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '15px',
                }}
              >
                <Typography cursor="pointer" name="Button 1" color="#C6CDD5">
                  Apply
                </Typography>
              </div>
            </Space>
          }
          items={tabItems}
        />
      </Row>
    </Space>
  );
};

export default OpportunityDetails;
