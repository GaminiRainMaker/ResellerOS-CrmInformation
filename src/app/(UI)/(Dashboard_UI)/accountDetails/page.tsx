/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import {OsCard} from '@/app/components/common/os-card';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import DetailAnalyticCard from '@/app/components/common/os-table/DetailAnalyticCard';
import Typography from '@/app/components/common/typography';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import AddAddress from '@/app/components/common/os-add-address';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import EditAddress from '@/app/components/common/os-edit-address';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import {
  formatDate,
  getResultedValue,
  transformAddressData,
  transformExistAddressData,
} from '@/app/utils/base';
import {Form, message, Radio} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  deleteAddress,
  insertAddAddress,
} from '../../../../../redux/actions/address';
import {getCustomerBYId} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setBillingContact} from '../../../../../redux/slices/billingAddress';
import DetailCard from './DetailCard';

const AccountDetails = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const {abbreviate} = useAbbreviationHook(0);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [isSaveAndCreate, setIsSaveAndCreate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [activeKey, setActiveKey] = useState<string>('1');
  const [recordId, setRecordId] = useState<any>();
  const [recordData, setRecordData] = useState<any>();
  const [form] = Form.useForm();
  const {loading, customerDataById: customerData} = useAppSelector(
    (state) => state.customer,
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const getCustomerID = searchParams && searchParams.get('id');

  const quotes =
    customerData &&
    customerData?.Opportunities?.flatMap(
      (opportunity: any) => opportunity?.Quotes,
    );
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
      primary: <div>{quotes?.length ?? 0}</div>,
      secondry: 'Total Quotes',
      icon: <TagIcon width={36} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 3,
      primary: (
        <div>
          {quotes?.filter((item: any) => item.status === 'Approved').length ??
            0}
        </div>
      ),
      secondry: 'Approved Quotes',
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
          Quote Name
        </Typography>
      ),
      dataIndex: 'file_name',
      key: 'file_name',
      width: 250,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          name="Body 4/Regular"
          color={token?.colorInfo}
          onClick={() => {
            router.push(
              `/generateQuote?id=${record?.id}&isView=${getResultedValue()}`,
            );
          }}
        >
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
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          name="Body 4/Regular"
          color={token?.colorInfo}
          onClick={() => {
            router.push(`/opportunityDetail?id=${record?.id}`);
          }}
        >
          {text ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Amount ($)
        </Typography>
      ),
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {text ? abbreviate(Number(text)) : '--'}
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
      render: (text: string) => (
        <span style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={text} />
        </span>
      ),
    },
  ];

  const locale = {
    emptyText: <EmptyContainer title="No Data" />,
  };

  const Addresscolumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Address Line
        </Typography>
      ),
      dataIndex: 'shiping_address_line',
      key: 'shiping_address_line',
      width: 250,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          City
        </Typography>
      ),
      dataIndex: 'shiping_city',
      key: 'shiping_city',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          State
        </Typography>
      ),
      dataIndex: 'shiping_state',
      key: 'shiping_state',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Zip Code
        </Typography>
      ),
      dataIndex: 'shiping_pin_code',
      key: 'shiping_pin_code',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Country
        </Typography>
      ),
      dataIndex: 'shiping_country',
      key: 'shiping_country',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Shipping
        </Typography>
      ),
      dataIndex: 'address_type',
      key: 'address_type',
      width: 90,
      render: (text: string, record: any) => {
        let AddressType =
          record?.address_type === 'Both'
            ? true
            : record?.address_type === 'Shipping'
              ? true
              : false;
        return <Checkbox checked={AddressType} disabled />;
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Billing
        </Typography>
      ),
      dataIndex: 'address_type',
      key: 'address_type',
      width: 80,
      render: (text: string, record: any) => {
        let AddressType =
          record?.address_type === 'Both'
            ? true
            : record?.address_type === 'Billing'
              ? true
              : false;
        return <Checkbox checked={AddressType} disabled />;
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Primary Shipping
        </Typography>
      ),
      dataIndex: 'primary_shipping',
      key: 'primary_shipping',
      width: 150,
      render: (text: boolean) => {
        return <Radio checked={text} disabled />;
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Primary Billing
        </Typography>
      ),
      dataIndex: 'primary_billing',
      key: 'primary_billing',
      width: 150,
      render: (text: boolean) => {
        return <Radio checked={text} disabled />;
      },
    },
    {
      title: 'Actions',
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
              setRecordId(record?.id);
              setRecordData(record);
              form.setFieldsValue({
                billing_address_line: record?.shiping_address_line,
                billing_city: record?.shiping_city,
                billing_state: record?.shiping_state,
                billing_pin_code: record?.shiping_pin_code,
                billing_country: record?.shiping_country,
                shiping_address_line: record?.shiping_address_line,
                shiping_city: record?.shiping_city,
                shiping_state: record?.shiping_state,
                shiping_pin_code: record?.shiping_pin_code,
                shiping_country: record?.shiping_country,
                shipping_id: record?.id,
                primary_shipping: record?.primary_shipping,
                primary_billing: record?.primary_billing,
              });
              setShowDrawer(true);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setShowModalDelete(true);
              setDeleteIds(record?.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const onFinish = () => {
    const addressData = form.getFieldsValue();
    if (activeKey < '2' && showAddressModal) {
      setActiveKey((Number(activeKey) + 1)?.toString());
      return;
    }

    const isAllFieldsUndefined = Object.entries(addressData)
      .filter(([key]) => !['is_same_shipping_address'].includes(key))
      .every(([_, value]) => value === undefined || value === '');

    if (isAllFieldsUndefined) {
      message.error(
        'Empty record: The address fields cannot be saved with undefined values.',
      );
      return;
    }

    // Transform the data

    let formattedAddresses;
    if (recordData) {
      formattedAddresses = transformExistAddressData(addressData, recordData);
    } else {
      formattedAddresses = transformAddressData(addressData);
    }

    if (formattedAddresses) {
      const addressPromises = formattedAddresses?.map(
        async (addressObj: any) => {
          const newAddressObj: any = {
            ...addressObj,
            customer_id: getCustomerID,
            id: recordId,
          };
          return dispatch(insertAddAddress(newAddressObj));
        },
      );

      // Wait for all insert API calls to complete
      Promise.all(addressPromises).then((results) => {
        // Check if at least one insert was successful
        if (results.some((res) => res?.payload)) {
          dispatch(getCustomerBYId(getCustomerID));

          if (!isSaveAndCreate) {
            setShowAddressModal(false);
          }

          form.resetFields();
          setActiveKey('1');
          setShowDrawer(false);
          setRecordId('');
        }
      });
    }
  };

  const deleteSelectedIds = async () => {
    dispatch(deleteAddress({id: deleteIds})).then((res) => {
      if (res?.payload) {
        dispatch(getCustomerBYId(getCustomerID));
      }
    });
    setDeleteIds([]);
    setShowModalDelete(false);
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

            <Row justify="space-between" align="middle">
              <Col>
                <Typography name="Heading 3/Medium">Address</Typography>
              </Col>
              <Col>
                <OsButton
                  text="Add Address"
                  buttontype="PRIMARY"
                  clickHandler={() => setShowAddressModal(true)}
                />
              </Col>
            </Row>

            <OsCard>
              <OsTable
                loading={loading}
                columns={Addresscolumns}
                dataSource={customerData?.Addresses}
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

            <Row justify="start">
              <Typography name="Heading 3/Medium">Quotes</Typography>
            </Row>

            <OsCard>
              <OsTable
                loading={loading}
                columns={Quotecolumns}
                dataSource={quotes}
                scroll
                locale={locale}
              />
            </OsCard>
          </div>
        </Col>
      </Row>

      <OsModal
        loading={loading}
        thirdLoading={loading}
        title="Create Address"
        destroyOnClose
        body={
          <AddAddress
            form={form}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            onFinish={onFinish}
          />
        }
        width={800}
        open={showAddressModal}
        onCancel={() => {
          setShowAddressModal(false);
          form.resetFields();
          setActiveKey('1');
        }}
        primaryButtonText={activeKey === '2' ? 'Save' : 'Next'}
        thirdButtonText={activeKey === '2' ? 'Save & New' : ''}
        onOk={() => {
          form.submit();
          setIsSaveAndCreate(false);
        }}
        thirdButtonfunction={() => {
          form.submit();
          setIsSaveAndCreate(true);
        }}
        bodyPadding={30}
      />

      <OsDrawer
        loading={loading}
        title={
          <Typography name="Body 1/Regular" color="#0D0D0D">
            Update Address
          </Typography>
        }
        placement="right"
        onClose={() => {
          setShowDrawer(false);
          form.resetFields();
          setActiveKey('1');
        }}
        open={showDrawer}
        width={450}
        footer={
          <OsButton
            btnStyle={{width: '100%'}}
            buttontype="PRIMARY"
            text="Update Changes"
            clickHandler={form.submit}
          />
        }
      >
        <EditAddress
          form={form}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          onFinish={onFinish}
          drawer
          recordData={recordData}
        />
      </OsDrawer>

      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete Address?"
        description={'Are you sure you want to delete this address?'}
      />
    </>
  );
};
export default AccountDetails;
