'use client';

import CustomTabs from '@/app/components/common/os-custom-tab/AdminSectionTab';
import MyProfile from './myProfile';

const AccountInfo = () => {
  const tabs = [
    {
      key: 1,
      title: 'Account',
      childitem: [
        {key: 1, name: 'My Profile', superChild: <MyProfile />},
        {key: 2, name: 'My Team', superChild: 'No Data'},
      ],
    },
    {
      key: 2,
      title: 'Settings',
      childitem: [
        {key: 7, name: 'Change Password'},
        {key: 4, name: 'Partner Passwords'},
      ],
    },
    {
      key: 3,
      title: 'Support',
      childitem: [
        {key: 5, name: 'Help & Support'},
        {key: 6, name: 'FAQ'},
      ],
    },
  ];

  return <CustomTabs tabs={tabs} />;
};

export default AccountInfo;
