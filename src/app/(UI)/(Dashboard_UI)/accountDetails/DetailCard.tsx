'use client';

import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {OsContactCard} from '@/app/components/common/os-card/OsContactCard';
import OsModal from '@/app/components/common/os-modal';
import ProfileCard from '@/app/components/common/os-profile-card';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';

const DetailCard = () => {
  const [token] = useThemeToken();
  const {data: customerData} = useAppSelector((state) => state.customer);
  const [showAllContactModal, setShowAllContactModal] =
    useState<boolean>(false);

  const headerIcons = [
    {
      key: 1,
      icon: <PencilSquareIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
  ];

  
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
    </>
  );
};

export default DetailCard;
