'use client';

import CustomTabs from '@/app/components/common/os-custom-tab';

const AdminPage = () => {
  const tabs = [
    {
      key: 1,
      title: 'Configuration',
      childitem: [
        {key: 1, name: 'Quote AI'},
        {key: 2, name: 'DealReg AI'},
      ],
    },
    {
      key: 2,
      title: 'Subscription Management',
      childitem: [
        {key: 3, name: 'Subscriptions'},
        {key: 4, name: 'Invoices'},
      ],
    },
    {
      key: 3,
      title: 'Users',
      childitem: [
        {key: 5, name: 'All users'},
        {key: 6, name: 'Roles and Permissions'},
      ],
    },
    {
      key: 4,
      title: 'Integration',
      childitem: [
        {key: 7, name: 'Subscriptions'},
        {key: 8, name: 'CRM accounts'},
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
