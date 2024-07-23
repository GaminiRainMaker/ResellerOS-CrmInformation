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
import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsTabs from '@/app/components/common/os-tabs';
import {StageValue} from '@/app/utils/CONSTANTS';
import {Form, MenuProps, TabsProps} from 'antd';
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
    data: opportunityData,
    loading,
    deletedCount: countDeletedOpp,
    opportunity,
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
  }>({
    opportunity: null,
    customer: null,
  });
  const searchQuery = useDebounceHook(query, 500);

  useEffect(() => {
    dispatch(queryOpportunity(searchQuery));
    dispatch(queryContact(''));
    dispatch(queryCustomer(''));
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
      primary: <div>{customerData?.length}</div>,
      secondry: 'Customers',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{opportunity?.length}</div>,
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
          {` ${abbreviate(Number(text ?? 0))}` ?? '--'}
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
          disabled={true}
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
    if (activeTab && opportunityData?.length > 0) {
      const quoteItems =
        activeTab === '5'
          ? opportunityData?.filter((item: any) => item.stages === 'Develop')
          : activeTab == '1'
            ? opportunityData
            : activeTab === '6'
              ? opportunityData?.filter((item: any) => item.stages === 'Commit')
              : activeTab === '4'
                ? opportunityData?.filter(
                    (item: any) => item.stages === 'Negotiate',
                  )
                : activeTab === '3'
                  ? opportunityData?.filter(
                      (item: any) => item.stages === 'Qualify',
                    )
                  : activeTab === '2'
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
          }}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  const uniqueOpportunity = Array?.from(
    new Set(opportunityData?.map((opportunity: any) => opportunity?.title)),
  );

  const uniqueCustomer = Array?.from(
    new Set(opportunityData?.map((contact: any) => contact?.Customer?.name)),
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
                    color={
                      query?.opportunity || query?.customer
                        ? '#0D0D0D'
                        : '#C6CDD5'
                    }
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
