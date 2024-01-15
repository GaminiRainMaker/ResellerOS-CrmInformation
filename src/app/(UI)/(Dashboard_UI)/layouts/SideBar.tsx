/* eslint-disable eqeqeq */

'use client';

import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsAvatar from '@/app/components/common/os-avatar';
import Typography from '@/app/components/common/typography';
import {LifebuoyIcon} from '@heroicons/react/20/solid';
import {
  AdjustmentsHorizontalIcon,
  BoltIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
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
                  seleectedKey == 1
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
              seleectedKey == 1 ? token?.colorLink : token?.colorTextSecondary
            }
          >
            Dashboard
          </Typography>
        </Space>
      </Typography>,
      '1',
    ),
    getItem(
      <Space
        size={12}
        onClick={() => {
          setSelectedKey(2);
          router?.push('/allQuote');
        }}
        color={token?.colorTextSecondary}
      >
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
          cursor="pointer"
          name="Button 1"
          color={
            seleectedKey?.toString()?.includes('2')
              ? token?.colorLink
              : token?.colorTextSecondary
          }
        >
          Quote AI
        </Typography>
      </Space>,
      '2',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(3);
          router?.push('/dealReg');
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <ReceiptPercentIcon
                color={
                  seleectedKey?.toString()?.includes('3')
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
              seleectedKey?.toString()?.includes('3')
                ? token?.colorLink
                : token?.colorTextSecondary
            }
          >
            {' '}
            DealReg AI
          </Typography>
        </Space>
      </Typography>,
      '3',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(4);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <ShoppingBagIcon
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
            Order AI
          </Typography>
        </Space>
      </Typography>,
      '4',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(5);
          router?.push('/partners');
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <UsersIcon
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
            Partners
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
              <BoltIcon
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
            Renewals and Upgrades
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
              <CurrencyDollarIcon
                color={
                  seleectedKey?.toString()?.includes('7') ||
                  seleectedKey?.toString()?.includes('8') ||
                  seleectedKey?.toString()?.includes('0') ||
                  seleectedKey?.toString()?.includes('9')
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
                marginRight: '60px',
              }}
              color={
                seleectedKey?.toString()?.includes('7') ||
                seleectedKey?.toString()?.includes('8') ||
                seleectedKey?.toString()?.includes('0') ||
                seleectedKey?.toString()?.includes('9')
                  ? token?.colorLink
                  : token?.colorTextSecondary
              }
            >
              CRM information
            </Typography>{' '}
            <div>
              {' '}
              <OsAvatar
                icon={
                  <ChevronDownIcon
                    color={
                      seleectedKey?.toString()?.includes('7') ||
                      seleectedKey?.toString()?.includes('8') ||
                      seleectedKey?.toString()?.includes('0') ||
                      seleectedKey?.toString()?.includes('9')
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

      'CRM information',
      '',
      [
        getItem(
          <Space
            size={12}
            onClick={() => {
              setSelectedKey(8);
              router?.push('/crmInAccount');
            }}
          >
            <OsAvatar
              icon={
                <LifebuoyIcon
                  color={
                    seleectedKey?.toString()?.includes('8')
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
                seleectedKey?.toString()?.includes('8')
                  ? token.colorPrimaryBorder
                  : token?.colorTextSecondary
              }
            >
              Accounts
            </Typography>
          </Space>,
          '8',
        ),
        getItem(
          <Space
            size={12}
            onClick={() => {
              setSelectedKey(9);
              router?.push('/crmContact');
            }}
            color={token?.colorTextSecondary}
          >
            <OsAvatar
              icon={
                <LifebuoyIcon
                  color={
                    seleectedKey?.toString()?.includes('9')
                      ? token.colorPrimaryBorder
                      : token?.colorTextSecondary
                  }
                  width={24}
                />
              }
            />
            <Typography
              cursor="pointer"
              name="Button 1"
              color={
                seleectedKey?.toString()?.includes('9')
                  ? token.colorPrimaryBorder
                  : token?.colorTextSecondary
              }
            >
              Contacts
            </Typography>
          </Space>,
          '9',
        ),

        getItem(
          <Space
            size={12}
            onClick={() => {
              setSelectedKey(0);
              router?.push('/crmOpportunity');
            }}
            color={token?.colorTextSecondary}
          >
            <OsAvatar
              icon={
                <LifebuoyIcon
                  color={
                    seleectedKey?.toString() === '0'
                      ? token.colorPrimaryBorder
                      : token?.colorTextSecondary
                  }
                  width={24}
                />
              }
            />
            <Typography
              cursor="pointer"
              name="Button 1"
              color={
                seleectedKey?.toString() === '0'
                  ? token.colorPrimaryBorder
                  : token?.colorTextSecondary
              }
            >
              Opportunity
            </Typography>
          </Space>,
          '0',
        ),
      ],
    ),
    getItem(
      <Space
        size={12}
        onClick={() => {
          setSelectedKey(11);
          router?.push('/admin');
        }}
        color={token?.colorTextSecondary}
      >
        <OsAvatar
          icon={
            <AdjustmentsHorizontalIcon
              color={
                seleectedKey?.toString()?.includes('11')
                  ? token?.colorLink
                  : token?.colorTextSecondary
              }
              width={24}
            />
          }
        />
        <Typography
          cursor="pointer"
          name="Button 1"
          color={
            seleectedKey?.toString()?.includes('11')
              ? token?.colorLink
              : token?.colorTextSecondary
          }
        >
          Admin
        </Typography>
      </Space>,
      '11',
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
