/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClockIcon,
  PencilSquareIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddOpportunity from '@/app/components/common/os-add-opportunity';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsTabs from '@/app/components/common/os-tabs';
import {StageValue} from '@/app/utils/CONSTANTS';
import {MenuProps, TabsProps} from 'antd';
import {Option} from 'antd/es/mentions';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  deleteOpportunity,
  getdeleteOpportunity,
  queryOpportunity,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import EditOpportunity from './EditOpportunity';
import {queryContact} from '../../../../../redux/actions/billingContact';
import {queryCustomer} from '../../../../../redux/actions/customer';

const CrmOpportunity: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const {
    data: opportunityData,
    loading,
    deletedCount: countDeletedOpp,
  } = useAppSelector((state) => state.Opportunity);
  const {filteredData: customerData} = useAppSelector(
    (state) => state.customer,
  );
  const {filteredData} = useAppSelector((state) => state.billingContact);
  const [formValue, setFormValue] = useState<any>();
  const [activeOpportunity, setActiveOpportunity] = useState<any>();
  const {abbreviate} = useAbbreviationHook(0);
  const router = useRouter();

  const [query, setQuery] = useState<{
    opportunity: string | null;
    customer: string | null;
  }>({
    opportunity: null,
    customer: null,
  });
  const searchQuery = useDebounceHook(query, 500);

  useEffect(() => {
    dispatch(queryOpportunity(searchQuery));
    dispatch(queryContact(''));
    dispatch(queryCustomer(''));
  }, [searchQuery]);

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteOpportunity(data));
    setTimeout(() => {
      dispatch(queryOpportunity(query));
      dispatch(getdeleteOpportunity(''));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  useEffect(() => {
    dispatch(getdeleteOpportunity(''));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(queryOpportunity(query));
    }, 1000);

    dispatch(getdeleteOpportunity(''));
  }, [!showModal]);

  const analyticsData = [
    {
      key: 1,
      primary: <div>{customerData?.length}</div>,
      secondry: 'Customers',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{opportunityData?.length}</div>,
      secondry: 'Opportunities',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <div>{filteredData?.length}</div>,
      secondry: 'Contacts',
      icon: <PhoneIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <div>{0}</div>,
      secondry: 'Recents',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: <div>{countDeletedOpp || 0}</div>,
      secondry: 'Deleted',
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
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
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/opportunityDetail?id=${record?.id}`);
          }}
          hoverOnText
        >
          {text ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Account{' '}
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            router.push(`/accountDetails?id=${record?.Customer?.id}`);
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
          Amount{' '}
        </Typography>
      ),
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {`$ ${abbreviate(Number(text ?? 0))}` ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Stage{' '}
        </Typography>
      ),
      dataIndex: 'stages',
      key: 'stages',
      render: (text: string, record: any) => (
        <CommonStageSelect
          options={StageValue}
          onChange={(e: any) => {
            const dataa = {id: record?.id, stages: e};
            dispatch(updateOpportunity(dataa));
            setTimeout(() => {
              dispatch(queryOpportunity(query));
              dispatch(getdeleteOpportunity(''));
            }, 1000);
          }}
          currentStage={text}
        />
      ),
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setOpen(true);
              setFormValue(record);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeleteIds([record?.id]);
              setShowModalDelete(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="Add Opportunity"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  useEffect(() => {
    if (activeTab && opportunityData?.length > 0) {
      const quoteItems =
        activeTab === '3'
          ? opportunityData?.filter((item: any) => item.stages === 'Develop')
          : activeTab == '1'
            ? opportunityData
            : activeTab === '2'
              ? opportunityData?.filter((item: any) => item.stages === 'Commit')
              : activeTab === '4'
                ? opportunityData?.filter(
                    (item: any) => item.stages === 'Negotiate',
                  )
                : activeTab === '5'
                  ? opportunityData?.filter(
                      (item: any) => item.stages === 'Qualify',
                    )
                  : activeTab === '6'
                    ? opportunityData?.filter(
                        (item: any) => item.stages === 'Prove',
                      )
                    : opportunityData;
      setActiveOpportunity(quoteItems);
    } else {
      setActiveOpportunity([]);
    }
  }, [activeTab, opportunityData]);

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Regular">All</Typography>,
      key: '1',
    },
    {
      label: <Typography name="Body 4/Regular">Commit</Typography>,
      key: '2',
    },
    {
      label: <Typography name="Body 4/Regular">Develop</Typography>,
      key: '3',
    },
    {
      label: <Typography name="Body 4/Regular">Negotiate</Typography>,
      key: '4',
    },
    {
      label: <Typography name="Body 4/Regular">Qualify</Typography>,
      key: '5',
    },
    {
      label: <Typography name="Body 4/Regular">Prove</Typography>,
      key: '6',
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          color="#EB445A"
          onClick={() => {
            setShowModalDelete(true);
          }}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  const uniqueOpportunity = Array.from(
    new Set(opportunityData?.map((opportunity: any) => opportunity.title)),
    // new Set(opportunityData?.map((opportunity: any) => opportunity?.title)),
  );

  const uniqueCustomer = Array.from(
    new Set(opportunityData?.map((contact: any) => contact.Customer?.name)),
  );

  return (
    <>
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
              Opportunities
            </Typography>
          </Col>
          <Col>
            <div
              style={{
                display: 'flex',
                width: '40%',
                gap: '8px',
              }}
            >
              <OsButton
                text="Add Opportunity"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />
              <Space>
                <OsDropdown menu={{items: dropDownItemss}} />
              </Space>
            </div>
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            onChange={(e) => {
              setActiveTab(e);
            }}
            activeKey={activeTab}
            tabBarExtraContent={
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Customer Account</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        customer: e,
                      });
                    }}
                    onChange={(e) => {
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
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Opportunity</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        opportunity: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        opportunity: e,
                      });
                    }}
                    value={query?.opportunity}
                  >
                    {uniqueOpportunity?.map((opportunity: any) => (
                      <Option key={opportunity} value={opportunity}>
                        {opportunity}
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
                    color="#C6CDD5"
                    onClick={() => {
                      setQuery({
                        opportunity: null,
                        customer: null,
                      });
                    }}
                  >
                    Reset
                  </Typography>
                </div>
              </Space>
            }
            items={tabItems.map((tabItem: any, index: number) => ({
              key: `${index + 1}`,
              label: tabItem?.label,
              children: (
                <OsTable
                  key={tabItem?.key}
                  columns={OpportunityColumns}
                  dataSource={activeOpportunity}
                  scroll
                  loading={loading}
                  locale={locale}
                  rowSelection={rowSelection}
                />
              ),
              ...tabItem,
            }))}
          />
        </Row>
      </Space>

      <OsModal
        body={
          <AddOpportunity
            setFormValue={setFormValue}
            formValue={formValue}
            setShowModal={setShowModal}
          />
        }
        width={600}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
      />

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        description="Are you sure you want to delete this opportunity?"
        heading="Delete Opportunity"
      />
      <EditOpportunity
        setFormValue={setFormValue}
        formValue={formValue}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default CrmOpportunity;
