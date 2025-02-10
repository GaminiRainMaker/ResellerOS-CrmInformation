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
import {useEffect, useState} from 'react';
import {updateAddress} from '../../../../../redux/actions/address';
import {
  deleteCustomers,
  getCustomerBYId,
  updateCustomer,
} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setBillingContact} from '../../../../../redux/slices/billingAddress';

interface Address {
  id: string;
  address_type: 'Both' | 'Shipping' | 'Billing';
  primary_shipping?: boolean;
  primary_billing?: boolean;
  created_at: string;
  [key: string]: any; // For additional fields
}

interface CustomerData {
  Addresses?: Address[];
}

const DetailCard = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const getCustomerID = searchParams && searchParams.get('id');
  const [form] = Form.useForm();
  const {customerDataById: customerData} = useAppSelector(
    (state) => state.customer,
  );
  const [showAllContactModal, setShowAllContactModal] =
    useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const router = useRouter();
  const [objectValuesForContact, setObjectValueForContact] = useState<any>();
  const [contactDetail, setContactDetail] = useState<any>();
  const [shipppingAddress, setShippingAddress] = useState<any>();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [activeKeyForTabs, setActiveKeyForTabs] = useState<any>('1');
  const [shippingNewAddress, setShippingNewAddress] = useState<Address | null>(
    null,
  );
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);

  const contactCardData = [
    {
      name: customerData?.BillingContacts?.[0]?.billing_first_name,
      last_name: customerData?.BillingContacts?.[0]?.billing_last_name,
      email: customerData?.BillingContacts?.[0]?.billing_email,
      role: customerData?.BillingContacts?.[0]?.billing_role,
      iconBg: '#1EB159',
    },
  ];

  useEffect(() => {
    if (!customerData?.Addresses?.length) return;

    const addresses = customerData.Addresses;

    // Find primary shipping & billing addresses
    const primaryShipping = addresses.find(
      (addr: any) => addr.primary_shipping,
    );
    const primaryBilling = addresses.find((addr: any) => addr.primary_billing);

    // Fallback to first created addresses
    const fallbackShipping =
      addresses
        .filter(
          (addr: any) =>
            addr.address_type === 'Both' || addr.address_type === 'Shipping',
        )
        .sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )[0] || null;

    const fallbackBilling =
      addresses
        .filter(
          (addr: any) =>
            addr.address_type === 'Both' || addr.address_type === 'Billing',
        )
        .sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )[0] || null;

    // Set state with priority
    setShippingNewAddress(primaryShipping || fallbackShipping);
    setBillingAddress(primaryBilling || fallbackBilling);
  }, [customerData]);

  const customerUpdatedData = {
    id: customerData?.id,
    name: customerData?.name,
    currency: customerData?.currency,
    BillingContacts: customerData?.BillingContacts,
    shiping_address_line: shippingNewAddress?.shiping_address_line,
    shiping_city: shippingNewAddress?.shiping_city,
    shiping_state: shippingNewAddress?.shiping_state,
    shiping_pin_code: shippingNewAddress?.shiping_pin_code,
    shiping_country: shippingNewAddress?.shiping_country,
    billing_address_line: billingAddress?.shiping_address_line,
    billing_city: billingAddress?.shiping_city,
    billing_state: billingAddress?.shiping_state,
    billing_pin_code: billingAddress?.shiping_pin_code,
    billing_country: billingAddress?.shiping_country,
  };

  const editCustomerFileds = (record: any) => {
    form.setFieldsValue({
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
  const getCustomer = () => {
    dispatch(getCustomerBYId(getCustomerID));
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
          setObjectValueForContact({});
          setActiveKeyForTabs('1');
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
        <AddCustomer
          form={form}
          onFinish={updateCustomerDetails}
          drawer
          setActiveKeyForTabs={setActiveKeyForTabs}
          activeKeyForTabs={activeKeyForTabs}
          contactDetail={contactDetail}
          customerData={customerData}
          setContactDetail={setContactDetail}
        />
      </OsDrawer>
    </>
  );
};

export default DetailCard;
