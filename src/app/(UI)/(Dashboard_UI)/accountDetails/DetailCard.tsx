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
  const [addressResults, setAddressResults] = useState<any>();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [activeKeyForTabs, setActiveKeyForTabs] = useState<any>('1');

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
    const addresses = customerData?.Addresses || [];
    if (addresses) {
      // Initialize separateAddress object to hold Shipping and Billing addresses
      let separateAddress = {
        ShippingAddress: {},
        BillingAddress: {},
      };

      // 1. Check if an address with "Both" type is default
      let defaultAddress = addresses.find(
        (address: any) =>
          address?.address_type === 'Both' && address?.is_default_address,
      );
      // 2. If no "Both" type is found, check for separate Shipping and Billing defaults
      if (!defaultAddress) {
        const defaultShipping = addresses.find(
          (address: any) =>
            address?.address_type === 'Shipping' && address?.is_default_address,
        );

        const defaultBilling = addresses.find(
          (address: any) =>
            address?.address_type === 'Billing' && address?.is_default_address,
        );

        // Assign defaultShipping or defaultBilling to separateAddress only if they are found
        if (defaultShipping) {
          separateAddress.ShippingAddress = defaultShipping;
        }

        if (defaultBilling) {
          separateAddress.BillingAddress = defaultBilling;
        }
      }

      if (
        !defaultAddress &&
        (Object.keys(separateAddress.ShippingAddress).length === 0 ||
          Object.keys(separateAddress.BillingAddress).length === 0)
      ) {
        const firstShipping = addresses.find(
          (address: any) => address?.address_type === 'Shipping',
        );
        const firstBilling = addresses.find(
          (address: any) => address?.address_type === 'Billing',
        );

        // Prioritize Shipping first, then Billing if Shipping is missing
        if (
          Object.keys(separateAddress.ShippingAddress).length === 0 &&
          firstShipping
        ) {
          separateAddress.ShippingAddress = firstShipping;
        }

        // Prioritize Billing second if Billing is missing
        if (
          Object.keys(separateAddress.BillingAddress).length === 0 &&
          firstBilling
        ) {
          separateAddress.BillingAddress = firstBilling;
        }
      }

      const result = {
        defaultAddress: defaultAddress || null,
        separateAddress: separateAddress,
      };
      if (result) {
        setAddressResults(result);
      }
    }
  }, [customerData]);


  const customerUpdatedData = {
    id: customerData?.id,
    name: customerData?.name,
    currency: customerData?.currency,
    BillingContacts: customerData?.BillingContacts,
    shiping_address_line:
      addressResults?.defaultAddress?.shiping_address_line ||
      addressResults?.separateAddress?.ShippingAddress?.shiping_address_line,
    shiping_city:
      addressResults?.defaultAddress?.shiping_city ||
      addressResults?.separateAddress?.ShippingAddress?.shiping_city,
    shiping_state:
      addressResults?.defaultAddress?.shiping_state ||
      addressResults?.separateAddress?.ShippingAddress?.shiping_state,
    shiping_pin_code:
      addressResults?.defaultAddress?.shiping_pin_code ||
      addressResults?.separateAddress?.ShippingAddress?.shiping_pin_code,
    shiping_country:
      addressResults?.defaultAddress?.shiping_country ||
      addressResults?.separateAddress?.ShippingAddress?.shiping_country,
    billing_address_line:
      addressResults?.defaultAddress?.shiping_address_line ||
      addressResults?.separateAddress?.BillingAddress?.shiping_address_line,
    billing_city:
      addressResults?.defaultAddress?.shiping_city ||
      addressResults?.separateAddress?.BillingAddress?.shiping_city,
    billing_state:
      addressResults?.defaultAddress?.shiping_state ||
      addressResults?.separateAddress?.BillingAddress?.shiping_state,
    billing_pin_code:
      addressResults?.defaultAddress?.shiping_pin_code ||
      addressResults?.separateAddress?.BillingAddress?.shiping_pin_code,
    billing_country:
      addressResults?.defaultAddress?.shiping_country ||
      addressResults?.separateAddress?.BillingAddress?.shiping_country,
  };

  const editCustomerFileds = (record: any) => {
    form.setFieldsValue({
      // billing_address_line: record?.Addresses?.[0]?.billing_address_line,
      // billing_city: record?.Addresses?.[0]?.billing_city,
      // billing_state: record?.Addresses?.[0]?.billing_state,
      // billing_pin_code: record?.Addresses?.[0]?.billing_pin_code,
      // billing_country: record?.Addresses?.[0]?.billing_country,
      // shiping_address_line: record?.Addresses?.[0]?.shiping_address_line,
      // shiping_city: record?.Addresses?.[0]?.shiping_city,
      // shiping_state: record?.Addresses?.[0]?.shiping_state,
      // shiping_pin_code: record?.Addresses?.[0]?.shiping_pin_code,
      // shiping_country: record?.Addresses?.[0]?.shiping_country,
      // shipping_id: record?.Addresses?.[0]?.id,
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
