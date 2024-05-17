'use client';

import CustomTabs from '@/app/components/common/os-custom-tab/AdminSectionTab';
import MyProfile from './myProfile';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

const AccountInfo = () => {
  const searchParams = useSearchParams();
  const getRole = searchParams.get('role');
  console.log('getRole', getRole);

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
        {key: 7, name: 'General Settings', superChild: 'fsfdasdfasdf'},
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

  const [tabsData, setTabsData] = useState(tabs);

  useEffect(() => {
    if (getRole === 'admin') {
      setTabsData([
        {
          key: 1,
          title: 'Account',
          childitem: [{key: 1, name: 'My Profile', superChild: <MyProfile />}],
        },
      ]);
    }
  }, [getRole]);

  return <CustomTabs tabs={tabsData} />;
};

export default AccountInfo;
