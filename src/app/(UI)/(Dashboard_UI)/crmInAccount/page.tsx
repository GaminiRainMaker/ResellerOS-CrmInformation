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
// eslint-disable-next-line import/no-extraneous-dependencies

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddCustomer from '@/app/components/common/os-add-customer';
import AddCustomerInputVale from '@/app/components/common/os-add-customer/AddCustomerInput';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsTabs from '@/app/components/common/os-tabs';
import {MenuProps, TabsProps} from 'antd';
import {Option} from 'antd/es/mentions';
import {useEffect, useState} from 'react';
import EmptyContainer from '@/app/components/common/os-empty-container';
import {updateAddress} from '../../../../../redux/actions/address';
import {
  deleteCustomers,
  queryCustomer,
  updateCustomer,
} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import EditCustomer from './EditCustomer';

const CrmInformation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [formValue, setFormValue] = useState<any>();
  const [customerValue, setCustomerValue] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const {loading, filteredData} = useAppSelector((state) => state.customer);
  const {data: billingData} = useAppSelector((state) => state.billingContact);
  const [open, setOpen] = useState(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deletedData, setDeletedData] = useState<any>();
  // const [searchCustomerData, setSearchCustomerData] = useState<any>();
  const [query, setQuery] = useState<{
    customer: string | null;
    contact: string | null;
  }>({
    customer: null,
    contact: null,
  });
  const searchQuery = useDebounceHook(query, 500);

  useEffect(() => {
    dispatch(queryCustomer(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    const deletedAll = billingData?.filter((item: any) => item?.is_deleted);
    const setDeleted = deletedAll;
    setDeletedData(setDeleted);
  }, [billingData, activeTab]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(queryCustomer(query));
  //   }, 1000);
  // }, [!open, showModal]);

  const updateCustomerDetails = async () => {
    await dispatch(updateAddress(formValue));
    await dispatch(updateCustomer(customerValue));
    setOpen((p) => !p);
    setTimeout(() => {
      dispatch(queryCustomer(query));
    }, 1000);
  };

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteCustomers(data));
    setTimeout(() => {
      dispatch(queryCustomer(query));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const editCustomerFileds = (record: any) => {
    setCustomerValue(record);
    setFormValue({
      ...record,
      billing_address_line: record?.Addresses?.[0]?.billing_address_line,
      billing_city: record?.Addresses?.[0]?.billing_city,
      billing_state: record?.Addresses?.[0]?.billing_state,
      billing_pin_code: record?.Addresses?.[0]?.billing_pin_code,
      billing_country: record?.Addresses?.[0]?.billing_country,
      shiping_address_line: record?.Addresses?.[0]?.shiping_address_line,
      shiping_city: record?.Addresses?.[0]?.shiping_city,
      shiping_state: record?.Addresses?.[0]?.shiping_state,
      shiping_pin_code: record?.Addresses?.[0]?.shiping_pin_code,
      shiping_country: record?.Addresses?.[0]?.shiping_country,
      shipping_id: record?.Addresses?.[0]?.id,
    });
  };

  const analyticsData = [
    {
      key: 1,
      primary: <div>{filteredData?.length}</div>,
      secondry: 'Customers',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{0}</div>,
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
      primary: <div>0</div>,
      secondry: 'Recents',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: <div>{deletedData?.length}</div>,
      secondry: 'Deleted',
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
  ];

  const AccountColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Name
        </Typography>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 130,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/accountDetails?id=${record?.id}`);
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
          Shipping Address
        </Typography>
      ),
      dataIndex: 'shiping_address_line',
      key: 'shiping_address_line',
      width: 187,
      render: (text: any, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.Addresses?.[0]?.shiping_address_line ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Billing Address
        </Typography>
      ),
      dataIndex: 'billing_address_line',
      key: 'billing_address_line',
      width: 187,
      render: (text: any, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.Addresses?.[0]?.billing_address_line ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Contact
        </Typography>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 187,
      render: (text: any, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.BillingContacts?.[0]?.billing_first_name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Currency
        </Typography>
      ),
      dataIndex: 'currency',
      key: 'currency',
      width: 187,
      render: (text: any) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          {' '}
        </Typography>
      ),
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
              setOpen((p) => !p);
              editCustomerFileds(record);
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

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <div>
          <div>All</div>
          {/* <div style={{border: activeTab == 1 ? '1px solid #1C3557' : ''}} /> */}
        </div>
      ),
      key: '1',
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
          onClick={deleteSelectedIds}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  const uniqueBillingNames = Array.from(
    new Set(
      filteredData.map(
        (customer: any) => customer.BillingContacts[0].billing_first_name,
      ),
    ),
  );
  const uniqueCustomer = Array.from(
    new Set(filteredData.map((customer: any) => customer.name)),
  );

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Data"
        actionButton="Add Customer"
        onClick={() => {
          setShowModal(true);
        }}
      />
    ),
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
              All Customer Accounts
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
                text="Add Customer"
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
                  <Typography name="Body 4/Medium">Customer Name</Typography>
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
                  <Typography name="Body 4/Medium">Contact</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    optionFilterProp="children"
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        contact: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        contact: e,
                      });
                    }}
                    value={query?.contact}
                  >
                    {uniqueBillingNames?.map((billingName: any) => (
                      <Option key={billingName} value={billingName}>
                        {billingName}
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
                        customer: null,
                        contact: null,
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
                  locale={locale}
                  key={tabItem?.key}
                  columns={AccountColumns}
                  dataSource={filteredData}
                  rowSelection={rowSelection}
                  scroll
                  loading={loading}
                />
              ),
              ...tabItem,
            }))}
          />
        </Row>
      </Space>

      <OsModal
        body={
          <AddCustomer
            setShowModal={setShowModal}
            open={open}
            setOpen={setOpen}
          />
        }
        width={800}
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
        heading="Delete Account"
        description="Are you sure you want to delete this account?"
      />
      
      <EditCustomer
        setOpen={setOpen}
        open={open}
        formValue={formValue}
        setFormValue={setFormValue}
        customerValue={customerValue}
        setCustomerValue={setCustomerValue}
      />
    </>
  );
};

export default CrmInformation;
