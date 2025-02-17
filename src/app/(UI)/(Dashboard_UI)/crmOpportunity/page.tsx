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
import OsDrawer from '@/app/components/common/os-drawer';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import CommonTable from '@/app/components/common/os-table/CommonTable';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsTabs from '@/app/components/common/os-tabs';
import {StageValue} from '@/app/utils/CONSTANTS';
import {Form, MenuProps, notification, TabsProps} from 'antd';
import {Option} from 'antd/es/mentions';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {queryContact} from '../../../../../redux/actions/billingContact';
import {queryCustomer} from '../../../../../redux/actions/customer';
import {
  deleteOpportunity,
  getAllOpportunity,
  getdeleteOpportunity,
  insertOpportunity,
  queryOpportunity,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import React from 'react';
import OsStatusWrapper from '@/app/components/common/os-status';

const CrmOpportunity: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const {abbreviate} = useAbbreviationHook(0);
  const router = useRouter();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const {
    loading,
    deletedCount: countDeletedOpp,
    opportunity,
    queryOpportunityData,
  } = useAppSelector((state) => state.Opportunity);
  const {filteredData: customerData} = useAppSelector(
    (state) => state.customer,
  );
  const {filteredData} = useAppSelector((state) => state.billingContact);
  const [activeOpportunity, setActiveOpportunity] = useState<any>();
  const [customerValue, setCustomerValue] = useState<number>();
  const [stageValue, setStageValue] = useState<string>('');
  const [recordId, setRecordId] = useState<number>();
  const [deleteModalDescription, setDeleteModalDescription] =
    useState<string>('');

  const [query, setQuery] = useState<{
    opportunity: string | null;
    customer: string | null;
    pageSize: number;
    pageNumber: number;
  }>({
    opportunity: null,
    customer: null,
    pageSize: 5,
    pageNumber: 1,
  });
  const searchQuery = useDebounceHook(query, 500);

  useEffect(() => {
    dispatch(queryOpportunity(searchQuery));

    dispatch(queryContact(''));
    dispatch(queryCustomer({}));
    dispatch(getAllOpportunity());
  }, [searchQuery]);

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteOpportunity(data)).then((d: any) => {
      if (d?.payload) {
        dispatch(queryOpportunity(query));
        dispatch(getAllOpportunity());
        setDeleteIds([]);
        setShowModalDelete(false);
      }
    });
  };

  const analyticsData = [
    {
      key: 1,
      primary: <div>{customerData?.total ?? 0}</div>,
      secondry: 'Customers',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{queryOpportunityData?.total ?? 0}</div>,
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
    // {
    //   key: 4,
    //   primary: <div>{0}</div>,
    //   secondry: 'Recents',
    //   icon: <ClockIcon width={24} color={token?.colorWarning} />,
    //   iconBg: token?.colorWarningBg,
    // },
    // {
    //   key: 5,
    //   primary: <div>{countDeletedOpp || 0}</div>,
    //   secondry: 'Deleted',
    //   icon: <TrashIcon width={24} color={token?.colorError} />,
    //   iconBg: token?.colorErrorBg,
    // },
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
            router.push(`/opportunityDetail?id=${record?.id}`);
          }}
          color={token?.colorInfo}
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
          $ Amount{' '}
        </Typography>
      ),
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {text ? abbreviate(Number(text ?? 0)) : '--'}
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
      render: (text: string) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={text} />
        </div>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Action
        </Typography>
      ),
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
              setRecordId(record?.id);
              form.setFieldsValue({
                stages: record?.stages,
                customer_id: record?.customer_id,
                title: record?.title,
                amount: record?.amount,
              });
              setStageValue(record?.stages);
              setShowDrawer(true);
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
      disabled: record?.name === 'Disabled User',
      name: record?.name,
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
    if (activeTab && queryOpportunityData?.opportunity?.length > 0) {
      const finalData = queryOpportunityData?.opportunity;
      const quoteItems =
        activeTab === '5'
          ? finalData?.filter((item: any) => item.stages === 'Develop')
          : activeTab == '1'
            ? finalData
            : activeTab === '6'
              ? finalData?.filter((item: any) => item.stages === 'Commit')
              : activeTab === '4'
                ? finalData?.filter((item: any) => item.stages === 'Negotiate')
                : activeTab === '3'
                  ? finalData?.filter((item: any) => item.stages === 'Qualify')
                  : activeTab === '2'
                    ? finalData?.filter((item: any) => item.stages === 'Prove')
                    : finalData;
      setActiveOpportunity(quoteItems);
    } else {
      setActiveOpportunity([]);
    }
  }, [activeTab, queryOpportunityData]);

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Regular">All</Typography>,
      key: '1',
    },
    {
      label: <Typography name="Body 4/Regular">Prove</Typography>,
      key: '2',
    },

    {
      label: <Typography name="Body 4/Regular">Qualify</Typography>,
      key: '3',
    },
    {
      label: <Typography name="Body 4/Regular">Negotiate</Typography>,
      key: '4',
    },
    {
      label: <Typography name="Body 4/Regular">Develop</Typography>,
      key: '5',
    },

    {
      label: <Typography name="Body 4/Regular">Commit</Typography>,
      key: '6',
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          color="#EB445A"
          cursor="pointer"
          onClick={() => {
            if (deleteIds?.length > 0) {
              if (deleteIds?.length > 1) {
                setDeleteModalDescription(
                  `Are you sure you want to delete these opportunity?`,
                );
              } else {
                setDeleteModalDescription(
                  `Are you sure you want to delete this opportunity?`,
                );
              }
              deleteIds && deleteIds?.length > 0 && setShowModalDelete(true);
            } else {
              notification?.open({
                message: 'Please select the Opportunity you want to delete.',
                type: 'info',
              });
            }
          }}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  const uniqueOpportunity = Array?.from(
    new Set(
      queryOpportunityData?.opportunity?.map(
        (opportunity: any) => opportunity?.title,
      ),
    ),
  );

  const uniqueCustomer = Array?.from(
    new Set(
      queryOpportunityData?.opportunity?.map(
        (contact: any) => contact?.Customer?.name,
      ),
    ),
  );

  const onFinish = () => {
    const FormDAta = form.getFieldsValue();
    const finalData = {
      ...FormDAta,
      customer_id: customerValue,
    };
    dispatch(insertOpportunity(finalData)).then((d: any) => {
      if (d?.payload) {
        dispatch(queryOpportunity(searchQuery));
        dispatch(getAllOpportunity());
        setShowModal(false);
        form.resetFields();
      }
    });
  };

  const updateOpportunityData = () => {
    const FormDAta = form.getFieldsValue();
    const finalData = {
      ...FormDAta,
      customer_id: customerValue,
      id: recordId,
    };
    dispatch(updateOpportunity(finalData))?.then((d: any) => {
      if (d?.payload) {
        dispatch(queryOpportunity(searchQuery));
        setShowDrawer(false);
        form.resetFields();
      }
    });
  };

  const handleTableChange = (pagination: any) => {
    setQuery({
      ...query,
      pageSize: pagination.pageSize,
      pageNumber: pagination.current,
    });
  };

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row
          justify="space-between"
          style={{
            padding: '20px 24px',
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
                isNotification={false}
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
                    color={
                      query?.opportunity || query?.customer
                        ? '#0D0D0D'
                        : '#C6CDD5'
                    }
                    onClick={() => {
                      setQuery({
                        opportunity: null,
                        customer: null,
                        pageSize: query.pageSize,
                        pageNumber: query.pageNumber,
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
                <CommonTable
                  key={tabItem?.key}
                  columns={OpportunityColumns}
                  dataSource={activeOpportunity}
                  loading={loading}
                  locale={locale}
                  rowSelection={rowSelection}
                  pagination={{
                    current: query?.pageNumber,
                    pageSize: query?.pageSize,
                    total: queryOpportunityData?.total,
                    showSizeChanger: true,
                  }}
                  onChange={handleTableChange}
                  rowKey="id"
                />
              ),
              ...tabItem,
            }))}
          />
        </Row>
      </Space>

      <OsModal
        loading={loading}
        body={
          <AddOpportunity
            form={form}
            onFinish={onFinish}
            setCustomerValue={setCustomerValue}
            customerValue={customerValue}
          />
        }
        width={600}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
        onOk={form.submit}
        primaryButtonText="Save"
        footerPadding={30}
      />

      <OsDrawer
        title={
          <Typography name="Body 1/Regular">Opportunity Details</Typography>
        }
        placement="right"
        onClose={() => {
          setShowDrawer(false);
          form.resetFields();
        }}
        open={showDrawer}
        width={450}
        footer={
          <OsButton
            loading={loading}
            btnStyle={{width: '100%'}}
            buttontype="PRIMARY"
            text="Update Changes"
            clickHandler={form.submit}
          />
        }
      >
        <AddOpportunity
          form={form}
          onFinish={updateOpportunityData}
          setCustomerValue={setCustomerValue}
          customerValue={customerValue}
          drawer
          stageValue={stageValue}
        />
      </OsDrawer>

      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        description={deleteModalDescription}
        heading="Delete Opportunity"
      />
    </>
  );
};

export default CrmOpportunity;
