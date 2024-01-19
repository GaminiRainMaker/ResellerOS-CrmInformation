'use client';

import CustomTabs from '@/app/components/common/os-custom-tab/AdminSectionTab';

const AdminPage = () => {
  const tabs = [
    {
      key: 1,
      title: 'Quote AI',
      childitem: [
        {key: 1, name: 'Configuration'},
        {key: 2, name: 'Add Products'},
      ],
    },
    {
      key: 2,
      title: 'DealReg AI',
      childitem: [
        {key: 3, name: 'Standard Attributes'},
        {key: 4, name: 'Common Fields'},
      ],
    },
    {
      key: 3,
      title: 'Subscription Management',
      childitem: [
        {key: 5, name: 'Subscriptions'},
        {key: 6, name: 'Invoices'},
      ],
    },
    {
      key: 4,
      title: 'Users',
      childitem: [
        {key: 7, name: 'All users'},
        {key: 8, name: 'Roles and Permissions'},
      ],
    },
    {
      key: 5,
      title: 'Account',
      childitem: [
        {key: 9, name: 'Profiles'},
        {key: 10, name: 'Settings'},
      ],
    },
  ];

  return <CustomTabs tabs={tabs} />;
};

export default AdminPage;
