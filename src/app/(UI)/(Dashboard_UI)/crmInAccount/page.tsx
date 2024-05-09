/* eslint-disable @typescript-eslint/no-unused-expressions */
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
// eslint-disable-next-line import/no-extraneous-dependencies

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddCustomer from '@/app/components/common/os-add-customer';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import {Form, MenuProps} from 'antd';
import {Option} from 'antd/es/mentions';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  insertAddAddress,
  updateAddress,
} from '../../../../../redux/actions/address';
import {
  insertbillingContact,
  queryContact,
} from '../../../../../redux/actions/billingContact';
import {
  deleteCustomers,
  insertCustomer,
  queryCustomer,
  updateCustomer,
} from '../../../../../redux/actions/customer';
import {queryOpportunity} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setBillingContact} from '../../../../../redux/slices/billingAddress';
import {setCustomerProfile} from '../../../../../redux/slices/customer';

const CrmInformation: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const {abbreviate} = useAbbreviationHook(0);
  const [activeTab, setActiveTab] = useState<any>('1');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [objectValuesForContact, setObjectValueForContact] = useState<any>();
  const [contactDetail, setContactDetail] = useState<any>();
  const [shipppingAddress, setShippingAddress] = useState<any>();

  const {loading, filteredData, customerProfile} = useAppSelector(
    (state) => state.customer,
  );
  const {filteredData: billingData} = useAppSelector(
    (state) => state.billingContact,
  );
  const {data: OpportunityData} = useAppSelector((state) => state.Opportunity);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deletedData, setDeletedData] = useState<any>();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [editRecordData, setEditRecordData] = useState<any>();
  const [query, setQuery] = useState<{
    customer: string | null;
    contact: string | null;
  }>({
    customer: null,
    contact: null,
  });
  const searchQuery = useDebounceHook(query, 500);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(queryCustomer(searchQuery));
    dispatch(queryOpportunity(''));
    dispatch(queryContact(''));
  }, [searchQuery]);

  useEffect(() => {
    const deletedAll = billingData?.filter((item: any) => item?.is_deleted);
    const setDeleted = deletedAll;
    setDeletedData(setDeleted);
  }, [billingData, activeTab]);

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
    form.setFieldsValue({
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
      name: record?.name,
      currency: record?.currency,
      industry: record?.industry,
      website: record?.website,
    });
    dispatch(
      setBillingContact({
        BillingContacts: record?.BillingContacts,
        name: record?.name,
        image: record?.profile_image,
        id: record?.id,
      }),
    );
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
      primary: <div>{OpportunityData?.length}</div>,
      secondry: 'Opportunities',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <div>{billingData?.length}</div>,
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
            router.push(`/accountDetails?id=${record?.id}`);
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
          Action
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
              setContactDetail(record?.BillingContacts);
              setShippingAddress(record?.Addresses?.[0]);
              console.log('setContactDetail', record);
              setShowDrawer(true);
              editCustomerFileds(record);
              setEditRecordData(record);
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

  const dropDownItemss: MenuProps['items'] = [
    deleteIds &&
      deleteIds.length > 0 && {
        key: '1',
        label: (
          <Typography
            name="Body 3/Regular"
            color="#EB445A"
            onClick={() => {
              deleteIds && deleteIds?.length > 0 && setShowModalDelete(true);
            }}
          >
            Delete Selected
          </Typography>
        ),
      },
  ];

  const uniqueCustomer = Array.from(
    new Set(filteredData?.map((customer: any) => customer.name)),
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

  const onFinish = () => {
    const FormData = form.getFieldsValue();
    try {
      dispatch(
        insertCustomer({...FormData, profile_image: customerProfile}),
      ).then((data) => {
        const newAddressObj: any = {
          ...FormData,
          customer_id: data?.payload?.id,
        };
        const newBillingObject: any = {
          ...objectValuesForContact,
          customer_id: data?.payload?.id,
        };
        if (newAddressObj) {
          dispatch(insertAddAddress(newAddressObj));
        }
        if (newAddressObj) {
          dispatch(insertbillingContact(newBillingObject));
        }
        dispatch(setCustomerProfile(''));
      });
      dispatch(queryCustomer(searchQuery));
      form.resetFields();
      setShowModal(false);
    } catch (error) {
      console.log(error);
      form.resetFields();
      setShowModal(false);
    }
  };

  const updateCustomerDetails = async () => {
    const FormData = form.getFieldsValue();

    await dispatch(
      updateAddress({...FormData, shipping_id: shipppingAddress?.id}),
    );
    await dispatch(updateCustomer({...FormData, id: editRecordData?.id}));
    dispatch(
      queryCustomer({
        customer: null,
        contact: null,
      }),
    );
    setShowDrawer(false);
    dispatch(setBillingContact({}));
    form.resetFields();
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
                text="Add Customer Account"
                buttontype="PRIMARY"
                icon={<PlusIcon width={25} />}
                clickHandler={() => setShowModal((p) => !p)}
              />
              <Space>
                <OsDropdown menu={{items: dropDownItemss}} />
              </Space>
            </div>
          </Col>
        </Row>

        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Row justify="end">
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
                      contact: null,
                    });
                  }}
                >
                  Reset
                </Typography>
              </div>
            </Space>
          </Row>

          <OsTable
            locale={locale}
            columns={AccountColumns}
            dataSource={filteredData}
            rowSelection={rowSelection}
            scroll
            loading={loading}
          />
        </div>
      </Space>

      <OsModal
        body={
          <AddCustomer
            form={form}
            onFinish={onFinish}
            objectValuesForContact={objectValuesForContact}
            setObjectValueForContact={setObjectValueForContact}
            contactDetail={contactDetail}
            setContactDetail={setContactDetail}
            shipppingAddress={shipppingAddress}
            setShippingAddress={setShippingAddress}
          />
        }
        width={700}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
          form.resetFields();
        }}
        onOk={form.submit}
        primaryButtonText="Save"
        footerPadding={20}
      />

      <OsDrawer
        title={<Typography name="Body 1/Regular">Customer Details</Typography>}
        placement="right"
        onClose={() => {
          setShowDrawer((p: boolean) => !p);
          form.resetFields();
          dispatch(setBillingContact({}));
        }}
        open={showDrawer}
        width={450}
        footer={
          <OsButton
            btnStyle={{width: '100%'}}
            buttontype="PRIMARY"
            text="UPDATE"
            clickHandler={form.submit}
          />
        }
      >
        <AddCustomer
          form={form}
          onFinish={updateCustomerDetails}
          drawer
          objectValuesForContact={objectValuesForContact}
          setObjectValueForContact={setObjectValueForContact}
          contactDetail={contactDetail}
          setContactDetail={setContactDetail}
          shipppingAddress={shipppingAddress}
          setShippingAddress={setShippingAddress}
        />
      </OsDrawer>

      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete Account"
        description="Are you sure you want to delete this account?"
      />
    </>
  );
};

export default CrmInformation;
