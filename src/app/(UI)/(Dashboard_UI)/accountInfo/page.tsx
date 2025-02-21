'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import CustomTabs from '@/app/components/common/os-custom-tab/AdminSectionTab';
import Typography from '@/app/components/common/typography';
import {useRouter, useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useState} from 'react';
import MyProfile from './myProfile';
import MyTeam from './myTeam';
import PartnerPassword from './partnerPassword';
import MyCompany from './company';
import { useAppSelector } from '../../../../../redux/hook';

const AccountInfo = () => {
  const searchParams = useSearchParams();
  const [token] = useThemeToken();
  const router = useRouter();
  const getRole = searchParams.get('role');
  const getId = searchParams.get('id');
  const organization = searchParams.get('organization');
  const isSuperAdminProfile = searchParams.get('isSuperAdminProfile');
  const getOrganization = searchParams.get('organization');
  const {activeLicense} = useAppSelector((state) => state.license);
  const [isLicenseActivate, setIsLicenseActivate] = useState<boolean>(false);

  useEffect(() => {
    if (
      activeLicense[0]?.license_type === 'demo' ||
      activeLicense[0]?.license_type === 'trial'
    ) {
      setIsLicenseActivate(true);
    }
  }, [activeLicense]);

  const tabs = [
    {
      key: 1,
      title: 'Account',
      childitem: [
        {
          key: 1,
          name: 'My Profile',
          superChild: <MyProfile />,
          route: `/accountInfo?id=${getId}&organization=${organization}&tab=myProfile&isSuperAdminProfile=${isSuperAdminProfile}&self=true`,
        },
        {
          key: 2,
          name: 'My Team',
          superChild: isLicenseActivate ? (
            <Typography name="Body 3/Regular">
              You Not have permission to see the Team.
            </Typography>
          ) : (
            <MyTeam />
          ),
          route: `/accountInfo?id=${getId}&organization=${organization}&tab=myTeam&isSuperAdminProfile=${isSuperAdminProfile}`,
        },
        {
          key: 3,
          name: 'Company',
          superChild: <MyCompany />,
          route: `/accountInfo?id=${getId}&organization=${organization}&tab=myCompany&isSuperAdminProfile=${isSuperAdminProfile}`,
        },
      ],
    },
    {
      key: 2,
      title: 'Settings',
      childitem: [
        // {key: 7, name: 'General Settings', superChild: 'No Data'},
        {
          key: 4,
          name: 'Partner Passwords',
          superChild: isLicenseActivate ? (
            <Typography name="Body 3/Regular">
              You Not have permission to see the Partner Passwords.
            </Typography>
          ) : (
            <PartnerPassword />
          ),
          route: `/accountInfo?id=${getId}&organization=${organization}&tab=partnerPassword&isSuperAdminProfile=${isSuperAdminProfile}`,
        },
      ],
    },
    {
      key: 3,
      title: 'Support',
      childitem: [
        {
          key: 5,
          name: 'Help & Support',
          route: `/accountInfo?id=${getId}&organization=${organization}&tab=support&isSuperAdminProfile=${isSuperAdminProfile}`,
        },
        {
          key: 6,
          name: 'FAQ',
          route: `/accountInfo?id=${getId}&organization=${organization}&tab=faq&isSuperAdminProfile=${isSuperAdminProfile}`,
        },
      ],
    },
  ];

  useEffect(() => {
    setTabsData(tabs);
  }, [isLicenseActivate]);

  const [tabsData, setTabsData] = useState(tabs);

  useEffect(() => {
    if (isSuperAdminProfile === 'SuperAdminProfile') {
      setTabsData([
        {
          key: 1,
          title: 'Account',
          childitem: [
            {
              key: 1,
              name: 'My Profile',
              superChild: <MyProfile />,
              route: `/accountInfo?id=${getId}&organization=${organization}&tab=myProfile&isSuperAdminProfile=${isSuperAdminProfile}`,
            },
            {
              key: 2,
              name: 'My Team',
              superChild: <MyTeam />,
              route: `/accountInfo?id=${getId}&organization=${organization}&tab=myTeam&isSuperAdminProfile=${isSuperAdminProfile}`,
            },
          ],
        },
      ]);
    }
  }, [isSuperAdminProfile]);

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
    <Suspense fallback={<div>Loading...</div>}>
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
        <CustomTabs tabs={tabsData} isTrialActive={isLicenseActivate} />
      )}
    </Suspense>
  );
};

export default AccountInfo;
