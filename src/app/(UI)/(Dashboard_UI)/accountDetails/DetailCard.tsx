'use client';

import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddCustomer from '@/app/components/common/os-add-customer';
import OsButton from '@/app/components/common/os-button';
import {OsContactCard} from '@/app/components/common/os-card/OsContactCard';
import OsDrawer from '@/app/components/common/os-drawer';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import ProfileCard from '@/app/components/common/os-profile-card';
import Typography from '@/app/components/common/typography';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import {updateAddress} from '../../../../../redux/actions/address';
import {
  deleteCustomers,
  getCustomerBYId,
  updateCustomer,
} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setBillingContact} from '../../../../../redux/slices/billingAddress';

const DetailCard = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getCustomerID = searchParams.get('id');
  const [form] = Form.useForm();
  const {data: customerData} = useAppSelector((state) => state.customer);
  const [showAllContactModal, setShowAllContactModal] =
    useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const router = useRouter();
  const [objectValuesForContact, setObjectValueForContact] = useState<any>();
  const [contactDetail, setContactDetail] = useState<any>();
  const [shipppingAddress, setShippingAddress] = useState<any>();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const contactCardData = [
    {
      name: customerData?.BillingContacts?.[0]?.billing_first_name,
      last_name: customerData?.BillingContacts?.[0]?.billing_last_name,
      email: customerData?.BillingContacts?.[0]?.billing_email,
      role: customerData?.BillingContacts?.[0]?.billing_role,
      iconBg: '#1EB159',
    },
  ];

  const customerUpdatedData = {
    id: customerData?.id,
    name: customerData?.name,
    currency: customerData?.currency,
    shiping_address_line: customerData?.Addresses?.[0]?.shiping_address_line,
    shiping_city: customerData?.Addresses?.[0]?.shiping_city,
    shiping_state: customerData?.Addresses?.[0]?.shiping_state,
    shiping_pin_code: customerData?.Addresses?.[0]?.shiping_pin_code,
    shiping_country: customerData?.Addresses?.[0]?.shiping_country,
    billing_address_line: customerData?.Addresses?.[0]?.billing_address_line,
    billing_city: customerData?.Addresses?.[0]?.billing_city,
    billing_state: customerData?.Addresses?.[0]?.billing_state,
    billing_pin_code: customerData?.Addresses?.[0]?.billing_pin_code,
    billing_country: customerData?.Addresses?.[0]?.billing_country,
    BillingContacts: customerData?.BillingContacts,
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
  };

  const headerIcons = [
    {
      key: 1,
      icon: <PencilSquareIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
      id: customerData?.id,
      onClick: () => {
        setShowDrawer(true);
        editCustomerFileds(customerData);
        setContactDetail(customerData?.BillingContacts);
        setShippingAddress(customerData?.Addresses?.[0]);
      },
    },
    {
      key: 2,
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
      id: customerData?.id,
      onClick: () => {
        setDeleteIds([customerData?.id]);
        setShowModalDelete(true);
      },
    },
  ];

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteCustomers(data));
    router.push(`/crmInAccount`);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const updateCustomerDetails = async () => {
    const FormData = form.getFieldsValue();
    await dispatch(
      updateAddress({...FormData, shipping_id: shipppingAddress?.id}),
    );
    await dispatch(updateCustomer({...FormData, id: getCustomerID}));
    dispatch(getCustomerBYId(getCustomerID));

    setShowDrawer(false);
    dispatch(setBillingContact({}));
    form.resetFields();
  };

  return (
    <>
      <ProfileCard
        contactCardData={contactCardData}
        headerIcons={headerIcons}
        customerData={customerUpdatedData}
      />
      <OsModal
        width={1115}
        open={showAllContactModal}
        onCancel={() => {
          setShowAllContactModal((p) => !p);
        }}
        bodyPadding={40}
        title="All Contacts"
        body={<OsContactCard data={customerData?.BillingContacts} />}
      />
      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete Account"
        description="Are you sure you want to delete this account?"
      />

      <OsDrawer
        title={<Typography name="Body 1/Regular">Customer Details</Typography>}
        placement="right"
        onClose={() => {
          setShowDrawer(false);
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
    </>
  );
};

export default DetailCard;
