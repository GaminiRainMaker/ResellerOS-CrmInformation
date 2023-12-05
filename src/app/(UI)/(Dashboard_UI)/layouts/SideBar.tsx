'use client';

import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {Menu, MenuProps, Space, Layout, Avatar} from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, {useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {
  DocumentTextIcon,
  ArrowsPointingOutIcon,
  CogIcon,
  CircleStackIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  EllipsisHorizontalCircleIcon,
  ReceiptRefundIcon,
} from '@heroicons/react/24/outline';
import {CustomSider} from './styled-components';

const SideBar = () => {
  const [token] = useThemeToken();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [seleectedKey, setSelectedKey] = useState<number>(1);
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
  console.log('seleectedKey', seleectedKey?.toString()?.includes('1'));
  const items: MenuItem[] = [
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(1);
          router?.push('/dashboard');
        }}
        name="Button 1"
        // color={token?.colorLink}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Avatar
            shape="square"
            style={{background: 'none'}}
            icon={
              <ArrowsPointingOutIcon
                color={
                  seleectedKey?.toString()?.includes('1')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
            alt="eyeIcon"
          />
          <div
            style={{
              marginTop: '1px',
              color:
                // eslint-disable-next-line eqeqeq
                seleectedKey?.toString()?.includes('1')
                  ? token?.colorLink
                  : token?.colorTextSecondary,
            }}
          >
            {' '}
            Dashboard
          </div>
        </div>
      </Typography>,
      '1',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(2);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Avatar
            shape="square"
            style={{background: 'none'}}
            icon={
              <CogIcon
                color={
                  seleectedKey?.toString()?.includes('2')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
            alt="eyeIcon"
          />

          <div
            style={{
              marginTop: '1px',
              color:
                // eslint-disable-next-line eqeqeq
                seleectedKey?.toString()?.includes('2') ||
                seleectedKey?.toString()?.includes('3')
                  ? token?.colorLink
                  : token?.colorTextSecondary,
            }}
          >
            {' '}
            Quote AI
          </div>
        </div>
      </Typography>,

      'Quote AI',
      '',
      [
        getItem(
          <Typography
            style={{padding: '16px 24px'}}
            onClick={() => {
              setSelectedKey(2);
              router?.push('/QuoteAI');
            }}
            name="Button 1"
            color={token?.colorTextSecondary}
          >
            <div
              style={{
                display: 'flex',
                padding: '16px 24px',
                alignItems: 'flexStart',

                gap: '16px',
                alignSelf: 'stretch',
              }}
            >
              <Avatar
                shape="square"
                style={{background: 'none'}}
                icon={
                  <CircleStackIcon
                    color={
                      seleectedKey?.toString()?.includes('2')
                        ? token.colorPrimaryBorder
                        : token?.colorTextSecondary
                    }
                    width={24}
                  />
                }
                alt="eyeIcon"
              />
              <div
                style={{
                  marginTop: '1px',
                  color:
                    // eslint-disable-next-line eqeqeq
                    seleectedKey?.toString()?.includes('2')
                      ? token.colorPrimaryBorder
                      : token?.colorTextSecondary,
                }}
              >
                {' '}
                Generate Quote
              </div>
            </div>
          </Typography>,
          '2',
        ),
        getItem(
          <Typography
            onClick={() => {
              setSelectedKey(3);
            }}
            name="Button 1"
            color={token?.colorTextSecondary}
          >
            <div
              style={{
                display: 'flex',
                padding: '16px 24px',
                alignItems: 'flexStart',

                gap: '16px',
                alignSelf: 'stretch',
              }}
            >
              <Avatar
                shape="square"
                style={{background: 'none'}}
                icon={
                  <CircleStackIcon
                    color={
                      seleectedKey?.toString()?.includes('3')
                        ? token.colorPrimaryBorder
                        : token?.colorTextSecondary
                    }
                    width={24}
                  />
                }
                alt="eyeIcon"
              />
              <div
                style={{
                  marginTop: '1px',
                  color:
                    // eslint-disable-next-line eqeqeq
                    seleectedKey?.toString()?.includes('3')
                      ? token.colorPrimaryBorder
                      : token?.colorTextSecondary,
                }}
              >
                {' '}
                Quotes
              </div>
            </div>
          </Typography>,
          '3',
        ),
      ],
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(4);
          router?.push('/DealReg');
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Avatar
            shape="square"
            style={{background: 'none'}}
            icon={
              <DocumentTextIcon
                color={
                  seleectedKey?.toString()?.includes('4')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
            alt="eyeIcon"
          />
          <div
            style={{
              marginTop: '1px',
              color:
                // eslint-disable-next-line eqeqeq
                seleectedKey?.toString()?.includes('4')
                  ? token?.colorLink
                  : token?.colorTextSecondary,
            }}
          >
            {' '}
            DealReg AI
          </div>
        </div>
      </Typography>,
      '4',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(5);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Avatar
            shape="square"
            style={{background: 'none'}}
            icon={
              <ShoppingBagIcon
                color={
                  seleectedKey?.toString()?.includes('5')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
            alt="eyeIcon"
          />
          <div
            style={{
              marginTop: '1px',
              color:
                // eslint-disable-next-line eqeqeq
                seleectedKey?.toString()?.includes('5')
                  ? token?.colorLink
                  : token?.colorTextSecondary,
            }}
          >
            {' '}
            Order AI
          </div>
        </div>
      </Typography>,
      '5',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(6);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Avatar
            shape="square"
            style={{background: 'none'}}
            icon={
              <UserGroupIcon
                color={
                  seleectedKey?.toString()?.includes('6')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
            alt="eyeIcon"
          />
          <div
            style={{
              marginTop: '1px',
              color:
                // eslint-disable-next-line eqeqeq
                seleectedKey?.toString()?.includes('6')
                  ? token?.colorLink
                  : token?.colorTextSecondary,
            }}
          >
            {' '}
            Vendors
          </div>
        </div>
      </Typography>,
      '6',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(7);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Avatar
            shape="square"
            style={{background: 'none'}}
            icon={
              <EllipsisHorizontalCircleIcon
                color={
                  seleectedKey?.toString()?.includes('7')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
            alt="eyeIcon"
          />
          <div
            style={{
              marginTop: '1px',
              color:
                // eslint-disable-next-line eqeqeq
                seleectedKey?.toString()?.includes('7')
                  ? token?.colorLink
                  : token?.colorTextSecondary,
            }}
          >
            {' '}
            Renewals and Upgrades
          </div>
        </div>
      </Typography>,
      '7',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(8);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Avatar
            shape="square"
            style={{background: 'none'}}
            icon={
              <ReceiptRefundIcon
                color={
                  seleectedKey?.toString()?.includes('8')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
            alt="eyeIcon"
          />
          <div
            style={{
              marginTop: '1px',
              color: seleectedKey?.toString()?.includes('8')
                ? token?.colorLink
                : token?.colorTextSecondary,
            }}
          >
            {' '}
            CRM information
          </div>
        </div>
      </Typography>,
      '8',
    ),
  ];
  return (
    <Layout>
      <div>
        <CustomSider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            style={{
              //   height: '100vh',
              width: '',
              // color:
              //   seleectedKey === 1
              //     ? 'var(--foundation-secondary-21-secondary-21500, #3DA5D9)'
              //     : '',
            }}
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
        </CustomSider>
      </div>
    </Layout>
  );
};

export default SideBar;
