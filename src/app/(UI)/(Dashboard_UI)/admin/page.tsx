'use client';

import RolesAndPermission from '@/app/(UI)/(Dashboard_UI)/admin/users/rolesPermissions';
import CustomTabs from '@/app/components/common/os-custom-tab/AdminSectionTab';
import Products from '../../../components/common/os-add-products';
import Users from '../../../components/common/os-add-users';
import Configuration from './quote-AI/configuration';
import {useRouter} from 'next/navigation';

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
          route: `/admin?tab=Configuration`,
        },
        {
          key: 2,
          name: 'Add Products',
          superChild: <Products />,
          route: `/admin?tab=AddProducts`,
        },
      ],
    },
    // {
    //   key: 2,
    //   title: 'DealReg AI',
    //   childitem: [
    //     {key: 3, name: 'Standard Attributes'},
    // {key: 4, name: 'Common Fields'},
    //   ],
    // },
    // {
    //   key: 3,
    //   title: 'Subscription Management',
    //   childitem: [
    //     {key: 5, name: 'Subscriptions'},
    //     {key: 6, name: 'Invoices'},
    //   ],
    // },
    {
      key: 2,
      title: 'Users',
      childitem: [
        {
          key: 3,
          name: 'All users',
          superChild: <Users />,
          route: `/admin?tab=allUsers`,
        },
        {
          key: 4,
          name: 'Roles and Permissions',
          superChild: <RolesAndPermission />,
          route: `/admin?tab=rolesAndPermission`,
        },
      ],
    },
    // {
    //   key: 3,
    //   title: 'PDF Templates',
    //   childitem: [
    //     {
    //       key: 5,
    //       name: 'Formstack',
    //       superChild: <FormStack />,
    //       route: `/admin?tab=formstack`,
    //     },
    //   ],
    // },
  ];

  return (
    <div style={{height: '100%', position: 'relative'}}>
      <CustomTabs tabs={tabs} />
    </div>
  );
};

export default AdminPage;
