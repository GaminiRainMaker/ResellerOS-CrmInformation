/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapse from '@/app/components/common/os-collapse';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {ArrowTopRightOnSquareIcon, PlusIcon} from '@heroicons/react/24/outline';
import {TabsProps} from 'antd';
import {Option} from 'antd/es/mentions';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {queryDealReg} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import NewRegistrationForm from './NewRegistrationForm';
import DealRegAnalytics from './dealRegAnalytics';
import {formatDate} from '@/app/utils/base';

interface SeparatedData {
  [opportunityId: number]: {
    opportunity_id: number;
    dealReg_id: number;
    contact_id: number;
    customer_id: number;
    data: any[];
    title: string;
  };
}

const DealReg: React.FC = () => {
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const {data: DealRegData, loading: dealLoading} = useAppSelector(
    (state) => state.dealReg,
  );
  const {userInformation} = useAppSelector((state) => state.user);
  const [finalDealRegData, setFinalDealRegData] = useState<any>();
  const [query, setQuery] = useState<{
    customer: string | null;
  }>({
    customer: null,
  });
  const searchQuery = useDebounceHook(query, 500);
  const [statusValue, setStatusValue] = useState<string>('All');

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
  };

  const DealRegColumns = [
    // {
    //   title: (
    //     <Typography name="Body 4/Medium" className="dragHandler">
    //       Registration Forms
    //     </Typography>
    //   ),
    //   dataIndex: 'title',
    //   key: 'title',
    //   width: 266,
    //   render: (text: string) => (
    //     <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
    //   ),
    // },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {formatDate(text, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Type
        </Typography>
      ),
      dataIndex: 'type',
      key: 'type',
      width: 187,
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Account
        </Typography>
      ),
      dataIndex: 'account',
      key: 'account',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/accountDetails?id=${record?.Customer?.id}`);
          }}
          hoverOnText
        >
          {record?.Customer?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner
        </Typography>
      ),
      dataIndex: 'partner_id',
      key: 'partner_id',
      width: 187,
      render: (text: string, record: any) => (
        <CustomTextCapitalization text={record?.Partner?.partner} />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program_id',
      key: 'partner_program_id',
      width: 187,
      render: (text: string, record: any) => (
        <CustomTextCapitalization
          text={record?.PartnerProgram?.partner_program}
        />
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
      render: (text: string) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={text} />
        </div>
      ),
    },
  ];

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="New Registration Form"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const processDealRegData = (
    dealRegData: any[],
    status: string,
  ): SeparatedData => {
    const separatedData: SeparatedData = {};
    const finalData = userInformation?.Admin
      ? dealRegData
      : dealRegData?.filter(
          (dealRegDataItem: any) =>
            dealRegDataItem?.user_id === userInformation?.id,
        );

    const filteredDealRegData =
      status === 'All'
        ? finalData
        : finalData?.filter((item: any) => item?.status === status);

    filteredDealRegData?.forEach((item: any) => {
      const {
        opportunity_id,
        contact_id,
        customer_id,
        id: dealReg_id,
        Opportunity,
      } = item;
      const opportunityTitle = Opportunity?.title;

      if (!separatedData[opportunity_id]) {
        separatedData[opportunity_id] = {
          opportunity_id,
          contact_id,
          customer_id,
          dealReg_id,
          title: opportunityTitle,
          data: [],
        };
      }

      separatedData[opportunity_id]?.data.push(item);
    });
    return separatedData;
  };

  useEffect(() => {
    const separatedData = processDealRegData(DealRegData, statusValue);
    setFinalDealRegData(Object.values(separatedData));
  }, [DealRegData, statusValue]);

  const generateTabContent = (status: string) => {
    return (
      <>
        {finalDealRegData && finalDealRegData.length > 0 ? (
          finalDealRegData.map((itemDeal: any) => (
            <OsCollapse
              defaultActiveKey={['1']}
              items={[
                {
                  key: '1',
                  label: (
                    <Row justify="space-between">
                      <Col>
                        <p>{itemDeal.title}</p>
                      </Col>
                      <Col>
                        <Space
                          align="center"
                          onClick={(e) => {
                            router.push(
                              `/dealRegDetailNew?id=${itemDeal.dealReg_id}&opportunityId=${itemDeal.opportunity_id}&customerId=${itemDeal.customer_id}&contactId=${itemDeal.contact_id}`,
                            );
                            e.stopPropagation();
                          }}
                        >
                          <p>Deal Registration</p>
                          <ArrowTopRightOnSquareIcon
                            cursor="pointer"
                            style={{marginTop: '5px'}}
                            width={20}
                          />
                        </Space>
                      </Col>
                    </Row>
                  ),
                  children: (
                    <OsTable
                      columns={DealRegColumns}
                      dataSource={itemDeal.data}
                      scroll
                      loading={dealLoading}
                      locale={locale}
                    />
                  ),
                },
              ]}
            />
          ))
        ) : (
          <OsTable
            columns={[]}
            dataSource={[]}
            scroll
            loading={false}
            locale={locale}
          />
        )}
      </>
    );
  };

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setStatusValue('All')}>
          All
        </Typography>
      ),
      key: '1',
      children: generateTabContent('All'),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('In Progress')}
        >
          In Progress
        </Typography>
      ),
      key: '2',
      children: generateTabContent('In Progress'),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Submitted')}
        >
          Submitted
        </Typography>
      ),
      key: '3',
      children: generateTabContent('Submitted'),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Approved')}
        >
          Approved
        </Typography>
      ),
      key: '4',
      children: generateTabContent('Approved'),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Rejected')}
        >
          Rejected
        </Typography>
      ),
      key: '5',
      children: generateTabContent('Rejected'),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Expired')}
        >
          Expired
        </Typography>
      ),
      key: '6',
      children: generateTabContent('Expired'),
    },
  ];

  useEffect(() => {
    dispatch(queryDealReg(searchQuery));
  }, [searchQuery]);

  const uniqueCustomer = Array?.from(
    new Set(DealRegData?.map((contact: any) => contact?.Customer?.name)),
  );

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <DealRegAnalytics />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Registered Forms
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <OsButton
              text="New Registration Form"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
              clickHandler={() => setShowModal((p) => !p)}
            />
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            onChange={(e: any) => {
              setActiveTab(e);
            }}
            activeKey={activeTab}
            tabBarExtraContent={
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">
                    Registration Form
                  </Typography>
                  <OsInput style={{width: '180px'}} placeholder="Search Here" />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Customer Account</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e: any) => {
                      setQuery({
                        ...query,
                        customer: e,
                      });
                    }}
                    onChange={(e: any) => {
                      setQuery({
                        ...query,
                        customer: e,
                      });
                    }}
                    value={query?.customer}
                  >
                    {uniqueCustomer?.map((customer: any) => (
                      <Option key={customer} value={customer}>
                        {customer}
                      </Option>
                    ))}
                  </CommonSelect>
                </Space>
                <div
                  style={{
                    marginTop: '15px',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color={query?.customer ? '#0D0D0D' : '#C6CDD5'}
                    onClick={() => {
                      setQuery({
                        customer: null,
                      });
                    }}
                  >
                    Reset
                  </Typography>
                </div>
              </Space>
            }
            items={tabItems}
          />
        </Row>
      </Space>

      <OsModal
        bodyPadding={22}
        body={<NewRegistrationForm setShowModal={setShowModal} />}
        width={583}
        open={showModal}
        onOk={() => {}}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
        footer={false}
      />
    </>
  );
};

export default DealReg;
