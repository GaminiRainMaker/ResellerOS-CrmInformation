'use client';

import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsAvatar from '@/app/components/common/os-avatar';
import Typography from '@/app/components/common/typography';
import {
  ArrowDownTrayIcon,
  BoltIcon,
  CircleStackIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {Layout, Menu, MenuProps} from 'antd';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
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
  const items: MenuItem[] = [
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(1);
          router?.push('/dashboard');
        }}
        name="Button 1"
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <Squares2X2Icon
                color={
                  seleectedKey?.toString()?.includes('1')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
          />
          <Typography
            name="Button 1"
            style={{
              marginTop: '1px',
            }}
            color={
              seleectedKey?.toString()?.includes('1')
                ? token?.colorLink
                : token?.colorTextSecondary
            }
          >
            Dashboard
          </Typography>
        </Space>
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
        <Space size={12}>
          <OsAvatar
            icon={
              <CurrencyDollarIcon
                color={
                  seleectedKey?.toString()?.includes('2')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
          />

          <Typography
            name="Button 1"
            style={{
              marginTop: '1px',
              display: 'flex',
              // width: '200px',
              justifyContent: 'space-between',
            }}
          >
            {' '}
            <Typography
              name="Button 1"
              style={{
                marginTop: '1px',
                marginRight: '80px',
              }}
              color={
                seleectedKey?.toString()?.includes('2') ||
                seleectedKey?.toString()?.includes('3')
                  ? token?.colorLink
                  : token?.colorTextSecondary
              }
            >
              Quote AI
            </Typography>{' '}
            <div>
              {' '}
              <OsAvatar
                icon={
                  <ArrowDownTrayIcon
                    color={
                      seleectedKey?.toString()?.includes('2') ||
                      seleectedKey?.toString()?.includes('3')
                        ? token?.colorLink
                        : token?.colorTextSecondary
                    }
                    width={24}
                  />
                }
              />
            </div>
          </Typography>
        </Space>
      </Typography>,

      'Quote AI',
      '',
      [
        getItem(
          <Space
            size={12}
            onClick={() => {
              setSelectedKey(2);
              router?.push('/generateQuote');
            }}
          >
            <OsAvatar
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
            />
            <Typography
              name="Button 1"
              cursor="pointer"
              color={
                seleectedKey?.toString()?.includes('2')
                  ? token.colorPrimaryBorder
                  : token?.colorTextSecondary
              }
            >
              Generate Quote
            </Typography>
          </Space>,
          '2',
        ),
        getItem(
          <Space
            size={12}
            onClick={() => {
              setSelectedKey(3);
              router?.push('/allQuote');
            }}
          >
            <OsAvatar
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
            />
            <Typography
              name="Button 1"
              cursor="pointer"
              color={
                seleectedKey?.toString()?.includes('3')
                  ? token.colorPrimaryBorder
                  : token?.colorTextSecondary
              }
            >
              Quotes
            </Typography>
          </Space>,
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
        <Space size={12}>
          <OsAvatar
            icon={
              <ReceiptPercentIcon
                color={
                  seleectedKey?.toString()?.includes('4')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
          />

          <Typography
            name="Button 1"
            style={{
              marginTop: '1px',
            }}
            color={
              seleectedKey?.toString()?.includes('4')
                ? token?.colorLink
                : token?.colorTextSecondary
            }
          >
            {' '}
            DealReg AI
          </Typography>
        </Space>
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
        <Space size={12}>
          <OsAvatar
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
          />

          <Typography
            name="Button 1"
            style={{
              marginTop: '1px',
            }}
            color={
              seleectedKey?.toString()?.includes('5')
                ? token?.colorLink
                : token?.colorTextSecondary
            }
          >
            {' '}
            Order AI
          </Typography>
        </Space>
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
        <Space size={12}>
          <OsAvatar
            icon={
              <UsersIcon
                color={
                  seleectedKey?.toString()?.includes('6')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
          />
          <Typography
            name="Button 1"
            style={{
              marginTop: '1px',
            }}
            color={
              seleectedKey?.toString()?.includes('6')
                ? token?.colorLink
                : token?.colorTextSecondary
            }
          >
            {' '}
            Vendors
          </Typography>
        </Space>
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
        <Space size={12}>
          <OsAvatar
            icon={
              <BoltIcon
                color={
                  seleectedKey?.toString()?.includes('7')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
          />
          <Typography
            name="Button 1"
            style={{
              marginTop: '1px',
            }}
            color={
              seleectedKey?.toString()?.includes('7')
                ? token?.colorLink
                : token?.colorTextSecondary
            }
          >
            {' '}
            Renewals and Upgrades
          </Typography>
        </Space>
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
        <Space size={12}>
          <OsAvatar
            icon={
              <UserGroupIcon
                color={
                  seleectedKey?.toString()?.includes('8')
                    ? token?.colorLink
                    : token?.colorTextSecondary
                }
                width={24}
              />
            }
          />
          <Typography
            name="Button 1"
            style={{
              marginTop: '1px',
            }}
            color={
              seleectedKey?.toString()?.includes('8')
                ? token?.colorLink
                : token?.colorTextSecondary
            }
          >
            {' '}
            CRM information
          </Typography>
        </Space>
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
