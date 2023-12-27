/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsTabs from '@/app/components/common/os-tabs';
import {SearchOutlined} from '@ant-design/icons';
import {Button, MenuProps, TabsProps} from 'antd';
import {useEffect, useState} from 'react';
import {updateAddress} from '../../../../../redux/actions/address';
import {
  deleteCustomers,
  getAllCustomer,
  searchCustomer,
  updateCustomer,
} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddCustomer from './addCustomer';
import AddCustomerInputVale from './addCustomerInput';

const CrmInformation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [formValue, setFormValue] = useState<any>();
  const [customerValue, setCustomerValue] = useState<any>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const {data: dataAddress, loading} = useAppSelector(
    (state) => state.customer,
  );
  const {data: billingData} = useAppSelector((state) => state.billingContact);
  const [open, setOpen] = useState(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<Boolean>(false);
  const [deletedData, setDeletedData] = useState<any>();
  const [searchCustomerData, setSearchCustomerData] = useState<any>();

  useEffect(() => {
    const deletedAll = billingData?.filter((item: any) => item?.is_deleted);
    // const onLive = billingData?.filter((item: any) => !item?.is_deleted);
    // setTableDataforBillContact(onLive);
    // const bilingOnly = onLive?.filter((item: any) => item?.billing);
    // const deletedBill = bilingOnly?.filter((item: any) => item?.is_deleted);

    // setBillingDataTable(bilingOnly);
    const setDeleted = deletedAll;
    setDeletedData(setDeleted);
  }, [billingData, activeTab]);

  useEffect(() => {
    dispatch(getAllCustomer({}));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllCustomer(''));
    }, 1000);
  }, [!open, showModal]);

  const updateCustomerDetails = async () => {
    await dispatch(updateAddress(formValue));
    await dispatch(updateCustomer(customerValue));
    setOpen((p) => !p);
    setTimeout(() => {
      dispatch(getAllCustomer(''));
    }, 1000);
  };

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteCustomers(data));
    setTimeout(() => {
      dispatch(getAllCustomer(''));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const searchFilterForCustomer = async () => {
    dispatch(searchCustomer(searchCustomerData));
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
      primary: <div>{dataAddress.length}</div>,
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
      primary: <div>{billingData.length}</div>,
      secondry: 'Contacts',
      icon: <PhoneIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <div>--</div>,
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
      title: 'Contact Name',
      dataIndex: 'name',
      key: 'name',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Shipping Address',
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
      title: 'Billing Address',
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
      title: 'Contact',
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
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      width: 187,
      render: (text: any) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
              setOpen((p) => !p);
              editCustomerFileds(record);
            }}
          />
          {/* <PopConfirm
            placement="top"
            title={record?.customer_name}
            description="Are you sure to delete this Contact?"
            okText="Yes"
            cancelText="No"
          > */}
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
          {/* </PopConfirm> */}
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      console.log('rowSelection', selectedRowKeys);
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
              <Dropdown
                // trigger="click"
                menu={{items: dropDownItemss}}
                placement="bottomRight"
              >
                <Button
                  style={{
                    background: '#14263E',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                  }}
                >
                  <EllipsisVerticalIcon width={24} color="white" />
                </Button>
              </Dropdown>
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
                  <OsInput
                    style={{width: '200px'}}
                    placeholder="Search here"
                    onChange={(e) => {
                      setSearchCustomerData({
                        ...searchCustomerData,
                        name: e.target.value,
                      });
                    }}
                    prefix={<SearchOutlined style={{color: '#949494'}} />}
                  />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Customer Contact</Typography>
                  <OsInput
                    style={{width: '200px'}}
                    placeholder="Search here"
                    onChange={(e) => {
                      setSearchCustomerData({
                        ...searchCustomerData,
                        currency: e.target.value,
                      });
                    }}
                    prefix={<SearchOutlined style={{color: '#949494'}} />}
                  />
                </Space>
                <Typography
                  cursor="pointer"
                  name="Button 1"
                  color="#C6CDD5"
                  onClick={searchFilterForCustomer}
                >
                  Apply
                </Typography>
              </Space>
            }
            items={tabItems.map((tabItem: any, index: number) => ({
              key: `${index + 1}`,
              label: (
                <div>
                  <div>{tabItem?.label}</div>
                  <div
                    style={{
                      // eslint-disable-next-line eqeqeq
                      borderBottom:
                        // eslint-disable-next-line eqeqeq
                        activeTab == tabItem?.key ? '2px solid #1C3557' : '',
                      // marginTop: '3px',
                    }}
                  />
                </div>
              ),
              children: (
                <OsTable
                  key={tabItem?.key}
                  columns={AccountColumns}
                  dataSource={dataAddress}
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
        // loading={loading}
        body={
          <AddCustomer
            setShowModal={setShowModal}
            open={open}
            setOpen={setOpen}
          />
        }
        width={800}
        open={showModal}
        // onOk={() => addQuoteLineItem()}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
      />

      <OsModal
        // loading={loading}
        body={
          <Row style={{width: '100%', padding: '15px'}}>
            <Space style={{width: '100%'}} direction="vertical" align="center">
              <Typography name="Heading 3/Medium">Delete Account</Typography>
              <Typography name="Body 3/Regular">
                Are you sure you want to delete the selected accounts?
              </Typography>
              <Space size={12}>
                <OsButton
                  text={`Don't Delete`}
                  buttontype="SECONDARY"
                  clickHandler={() => {
                    setDeleteIds([]);
                    setShowModalDelete(false);
                  }}
                />
                <OsButton
                  text="Yes, Delete"
                  buttontype="PRIMARY"
                  clickHandler={deleteSelectedIds}
                />
              </Space>
            </Space>
          </Row>
        }
        width={600}
        open={showModalDelete}
        // onOk={() => addQuoteLineItem()}
        onCancel={() => {
          setShowModalDelete((p) => !p);
        }}
      />

      <OsDrawer
        title={<Typography name="Body 1/Regular">Customer Details</Typography>}
        placement="right"
        onClose={() => setOpen((p) => !p)}
        open={open}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            {' '}
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="UPDATE"
              clickHandler={updateCustomerDetails}
            />
          </Row>
        }
      >
        <AddCustomerInputVale
          drawer="drawer"
          setShowModal=""
          setFormValue={setFormValue}
          formValue={formValue}
          setCustomerValue={setCustomerValue}
          customerValue={customerValue}
          setOpen={setOpen}
        />
      </OsDrawer>
    </>
  );
};

export default CrmInformation;
