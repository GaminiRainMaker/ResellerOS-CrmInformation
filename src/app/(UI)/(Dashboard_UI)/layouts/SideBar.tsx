/* eslint-disable no-extra-boolean-cast */
/* eslint-disable eqeqeq */

'use client';

import {Space} from '@/app/components/common/antd/Space';
// eslint-disable-next-line import/no-extraneous-dependencies
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsAvatar from '@/app/components/common/os-avatar';
import Typography from '@/app/components/common/typography';
import {ChevronRightIcon, LifebuoyIcon} from '@heroicons/react/20/solid';
import {
  AdjustmentsHorizontalIcon,
  BoltIcon,
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {Layout, MenuProps} from 'antd';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {LayoutMenuStyle} from './styled-components';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';
import {setUserInformation} from '../../../../../redux/slices/user';

const {Sider} = Layout;

const SideBar = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [seleectedKey, setSelectedKey] = useState<number>(1);
  const {userInformation} = useAppSelector((state) => state.user);
  type MenuItem = Required<MenuProps>['items'][number];

  useEffect(() => {
    if (!!userInformation) {
      dispatch(getUserByTokenAccess('')).then((payload: any) => {
        dispatch(
          setUserInformation({
            id: payload?.payload?.id,
            organization: payload?.payload?.organization,
            Admin: payload?.payload?.is_admin,
            QuoteAI: payload?.payload?.is_quote,
            DealReg: payload?.payload?.is_dealReg,
            OrderAI: payload?.payload?.is_order,
            username: payload?.payload?.user_name,
            email: payload?.payload?.email,
            SuperAdmin: payload?.payload?.super_admin,
          }),
        );
      });
    }
  }, []);

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
                    ? token?.colorPrimary
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
              seleectedKey == 1
                ? token?.colorPrimary
                : token?.colorTextSecondary
            }
          >
            Dashboard
          </Typography>
        </Space>
      </Typography>,
      '1',
    ),
    isQuoteAI &&
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
                    ? token?.colorPrimary
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
                ? token?.colorPrimary
                : token?.colorTextSecondary
            }
          >
            Quote AI
          </Typography>
        </Space>,

        '2',
      ),
    isDealReg &&
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
                      ? token?.colorPrimary
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
                  ? token?.colorPrimary
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
    isOrderAI &&
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
                      ? token?.colorPrimary
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
                  ? token?.colorPrimary
                  : token?.colorTextSecondary
              }
            >
              {' '}
              Orders AI
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
                    ? token?.colorPrimary
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
                ? token?.colorPrimary
                : token?.colorTextSecondary
            }
          >
            Partners & Partners Program
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
                    ? token?.colorPrimary
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
                ? token?.colorPrimary
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
              <UserGroupIcon
                color={
                  seleectedKey?.toString()?.includes('7') ||
                  seleectedKey?.toString()?.includes('8') ||
                  seleectedKey?.toString()?.includes('0') ||
                  seleectedKey?.toString()?.includes('9')
                    ? token?.colorPrimary
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
              marginRight: '60px',
            }}
            color={
              seleectedKey?.toString()?.includes('7') ||
              seleectedKey?.toString()?.includes('8') ||
              seleectedKey?.toString()?.includes('0') ||
              seleectedKey?.toString()?.includes('9')
                ? token?.colorPrimary
                : token?.colorTextSecondary
            }
          >
            CRM information
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
    isAdmin &&
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
                    ? token?.colorPrimary
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
                ? token?.colorPrimary
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
    <Sider
      width={316}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
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
                seleectedKey?.toString()?.includes('7') ||
                seleectedKey?.toString()?.includes('8') ||
                seleectedKey?.toString()?.includes('0') ||
                seleectedKey?.toString()?.includes('9')
                  ? token?.colorPrimary
                  : token?.colorTextSecondary,
            }}
          />
        }
      />
    </Sider>
  );
};

export default SideBar;
