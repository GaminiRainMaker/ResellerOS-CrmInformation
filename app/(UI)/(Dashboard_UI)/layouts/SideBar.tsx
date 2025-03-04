/* eslint-disable import/extensions */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable eqeqeq */

'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  AdjustmentsHorizontalIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Layout, MenuProps } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Typography from '@/app/components/common/typography';
import OsAvatar from '@/app/components/common/os-avatar';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import { Space } from '@/app/components/common/antd/Space';
import ActiveCrmIcon from '../../../../public/assets/static/activeCrmIcon.svg';
import InActiveCrmIcon from '../../../../public/assets/static/inActiveCrmIcon.svg';
import { checkQuoteAIAccess } from '../../../../redux/actions/license';
import { getUserByTokenAccess } from '../../../../redux/actions/user';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { setUserInformation } from '../../../../redux/slices/user';
import { LayoutMenuStyle } from './styled-components';
// import {
//   getAllCustomerOfCacheFlow,
//   getProposalForSubscription,
//   getSubsvriptionForCustomer,
// } from '../../../../../redux/actions/cacheFlow';

const { Sider } = Layout;

const SideBar = () => {
  const pathname = usePathname();
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [selectedKey, setSelectedKey] = useState<number>(1);
  const [crmChildKey, setCrmChildKey] = useState<number>(0);
  const { userInformation } = useAppSelector((state) => state.user);
  const { isCanvas } = useAppSelector((state) => state.canvas);
  const searchParams = useSearchParams()!;
  const salesForceUrl = searchParams.get('instance_url');

  type MenuItem = Required<MenuProps>['items'][number];


  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const isAdmin = userInformation?.Admin;
  const isQuoteAI = userInformation?.QuoteAI;
  const isDealReg = userInformation?.DealReg;
  const isOrderAI = userInformation?.OrderAI;
  const Role = userInformation?.Role;

  useEffect(() => {
    if (pathname === null) {
      // Handle the case where pathname is null
      setSelectedKey(0);
      return;
    }
    if (pathname?.includes('dashboard')) {
      setSelectedKey(1);
    } else if (pathname?.includes('unprocessedQuote')) {
      setSelectedKey(2);
    } else if (pathname?.includes('quoteConfiguration')) {
      setSelectedKey(3);
    } else if (pathname === '/contract') {
      setSelectedKey(4);
    } else if (pathname === '/contractProduct') {
      setSelectedKey(5);
    } else if (
      pathname?.includes('allQuote') ||
      pathname?.includes('generateQuote')
    ) {
      setSelectedKey(6);
    } else if (pathname?.includes('superAdminDealReg')) {
      setSelectedKey(81);
    } else if (pathname?.includes('dealReg')) {
      setSelectedKey(7);
    } else if (pathname?.includes('assertMapping')) {
      setSelectedKey(8);
    } else if (pathname?.includes('partners')) {
      setSelectedKey(10);
    } else if (pathname?.includes('superAdminPartner')) {
      setSelectedKey(11);
    } else if (pathname?.includes('Renewals and Upgrades')) {
      setSelectedKey(12);
    } else if (pathname?.includes('crmInAccount')) {
      setSelectedKey(13);
      setCrmChildKey(1);
    } else if (pathname?.includes('crmContact')) {
      setSelectedKey(14);
      setCrmChildKey(2);
    } else if (pathname?.includes('crmOpportunity')) {
      setSelectedKey(15);
      setCrmChildKey(3);
    } else if (pathname?.includes('admin')) {
      setSelectedKey(16);
    } else if (pathname?.includes('userManagement')) {
      setSelectedKey(17);
    } else if (pathname?.includes('superAdminPermissions')) {
      setSelectedKey(18);
    } else if (pathname?.includes('dealregSettings')) {
      setSelectedKey(89);
    } else if (
      ![
        'dashboard',
        'allQuote',
        'dealReg',
        'partners',
        'superAdminPartner',
        'crmInAccount',
        'accountDetails',
        'crmContact',
        'crmOpportunity',
        'admin',
        'userManagement',
        'superAdminPermissions',
      ]?.includes(pathname)
    ) {
      setSelectedKey(0);
    }
  }, [pathname]);


  const items: MenuItem[] = [
    getItem(
      <Typography
        cursor="pointer"
        onClick={() => {
          setSelectedKey(13);
        }}
        name="Button 1"
        color="#6b7280"
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <UserGroupIcon
                color={
                  selectedKey === 14 ||
                    selectedKey === 13 ||
                    selectedKey === 15
                    ? token?.colorLink
                    : '#6b7280'
                }
                width={24}
              />
            }
          />
          <Typography
            cursor="pointer"
            name="Button 1"
            style={{
              marginTop: '1px',
              marginRight: '60px',
            }}
            color={
              selectedKey === 14 || selectedKey === 13 || selectedKey === 15
                ? token?.colorLink
                : '#6b7280'
            }
          >
            CRM Information
          </Typography>
        </Space>
      </Typography>,
      '13',
      '',
      [
        getItem(
          <Space
            size={12}
            onClick={() => {
              setCrmChildKey(1);
              setSelectedKey(13);
              router?.push('/crmInAccount');
            }}
          >
            <OsAvatar
              icon={
                crmChildKey === 1 ? (
                  <Image
                    src={ActiveCrmIcon}
                    alt="ActiveCrmIcon"
                    style={{ width: '15px', height: '15px' }}
                  />
                ) : (
                  <Image
                    src={InActiveCrmIcon}
                    alt="InActiveCrmIcon"
                    style={{ width: '15px', height: '15px' }}
                  />
                )
              }
            />
            <Typography
              name="Button 1"
              cursor="pointer"
              color={
                crmChildKey === 1
                  ? token.colorPrimaryBorder
                  : '#6b7280'
              }
            >
              Accounts
            </Typography>
          </Space>,
          '13',
        ),
        getItem(
          <Space
            size={12}
            onClick={() => {
              setCrmChildKey(2);
              setSelectedKey(14);
              router?.push('/crmContact');
            }}
            color="#6b7280"
          >
            <OsAvatar
              icon={
                crmChildKey === 2 ? (
                  <Image
                    src={ActiveCrmIcon}
                    alt="ActiveCrmIcon"
                    style={{ width: '15px', height: '15px' }}
                  />
                ) : (
                  <Image
                    src={InActiveCrmIcon}
                    alt="InActiveCrmIcon"
                    style={{ width: '15px', height: '15px' }}
                  />
                )
              }
            />
            <Typography
              cursor="pointer"
              name="Button 1"
              color={
                crmChildKey === 2
                  ? token.colorPrimaryBorder
                  : '#6b7280'
              }
            >
              Contacts
            </Typography>
          </Space>,
          '14',
        ),
        getItem(
          <Space
            size={12}
            onClick={() => {
              setCrmChildKey(3);
              setSelectedKey(15);
              router?.push('/crmOpportunity');
            }}
            color="#6b7280"
          >
            <OsAvatar
              icon={
                crmChildKey === 3 ? (
                  <Image
                    src={ActiveCrmIcon}
                    alt="ActiveCrmIcon"
                    style={{ width: '15px', height: '15px' }}
                  />
                ) : (
                  <Image
                    src={InActiveCrmIcon}
                    alt="InActiveCrmIcon"
                    style={{ width: '15px', height: '15px' }}
                  />
                )
              }
            />
            <Typography
              cursor="pointer"
              name="Button 1"
              color={
                crmChildKey === 3
                  ? token.colorPrimaryBorder
                  : '#6b7280'
              }
            >
              Opportunity
            </Typography>
          </Space>,
          '15',
        ),
      ],
    ),]
  return (
    <Sider
      width={316}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed((p) => !p)}
      theme="light"
      defaultCollapsed
    >
      <LayoutMenuStyle
        theme="light"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
        expandIcon={
          <ChevronRightIcon
            className="sideBarMenuIcon"
            style={{
              width: '24px',
              color:
                //   selectedKey === 81
                //     ? // ||
                //       // selectedKey?.toString()?.includes('8') ||
                //       // selectedKey?.toString()?.includes('0') ||
                //       // selectedKey?.toString()?.includes('9')
                //       token?.colorLink
                '#6b7280',
            }}
          />
        }
      />
    </Sider>
  );
};

export default SideBar;
