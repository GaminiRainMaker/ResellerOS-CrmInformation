'use client';

import RolesAndPermission from '@/app/(UI)/(Dashboard_UI)/admin/users/rolesPermissions';
import CustomTabs from '@/app/components/common/os-custom-tab/AdminSectionTab';
import Products from '../../../components/common/os-add-products';
import Users from '../../../components/common/os-add-users';
import Configuration from './quote-AI/configuration';

const AdminPage = () => {
  const tabs = [
    {
      key: 1,
      title: 'Quote AI',
      childitem: [
        {
          key: 1,
          name: 'Configuration',
          superChild: <Configuration />,
        },
        {key: 2, name: 'Add Products', superChild: <Products />},
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
        {key: 7, name: 'All users', superChild: <Users />},
        {
          key: 8,
          name: 'Roles and Permissions',
          superChild: <RolesAndPermission />,
        },
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

  return (
    <div style={{height: '100%', position: 'relative'}}>
      <CustomTabs tabs={tabs} />
    </div>
  );
};

export default AdminPage;
