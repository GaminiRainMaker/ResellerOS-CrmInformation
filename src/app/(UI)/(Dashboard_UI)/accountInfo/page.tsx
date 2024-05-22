'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import CustomTabs from '@/app/components/common/os-custom-tab/AdminSectionTab';
import Typography from '@/app/components/common/typography';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import MyProfile from './myProfile';
import MyTeam from './myTeam';
import PartnerPassword from './partnerPassword';

const AccountInfo = () => {
  const searchParams = useSearchParams();
  const [token] = useThemeToken();
  const router = useRouter();
  const getRole = searchParams.get('role');
  const isSuperAdminProfile = searchParams.get('isSuperAdminProfile');
  const getOrganization = searchParams.get('organization');

  const tabs = [
    {
      key: 1,
      title: 'Account',
      childitem: [
        {key: 1, name: 'My Profile', superChild: <MyProfile />},
        {key: 2, name: 'My Team', superChild: <MyTeam />},
      ],
    },
    {
      key: 2,
      title: 'Settings',
      childitem: [
        // {key: 7, name: 'General Settings', superChild: 'No Data'},
        {key: 4, name: 'Partner Passwords', superChild: <PartnerPassword />},
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
    if (isSuperAdminProfile === 'SuperAdminProfile') {
      setTabsData([
        {
          key: 1,
          title: 'Account',
          childitem: [
            {key: 1, name: 'My Profile', superChild: <MyProfile />},
            {key: 2, name: 'My Team', superChild: <MyTeam />},
          ],
        },
      ]);
    }
  }, [isSuperAdminProfile]);

  // Resellers

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            if (getRole === 'admin') {
              router?.push('/admin');
            } else {
              router?.push(
                `/organizationUsers?organization=${getOrganization}`,
              );
            }
          }}
        >
          {getRole === 'admin' ? 'All Users' : 'All Resellers'}
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          {getOrganization}
        </Typography>
      ),
    },
  ];

  return (
    <>
      {getRole === 'admin' || getRole === 'superAdmin' ? (
        <>
          <Row justify="space-between" align="middle">
            <Col>
              <OsBreadCrumb items={menuItems} />
            </Col>
          </Row>
          <MyProfile />
        </>
      ) : (
        <CustomTabs tabs={tabsData} />
      )}
    </>
  );
};

export default AccountInfo;
