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
  PhoneArrowDownLeftIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {Layout, MenuProps} from 'antd';
import {usePathname, useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {LayoutMenuStyle} from './styled-components';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';
import {setUserInformation} from '../../../../../redux/slices/user';
import InActiveCrmIcon from '../../../../../public/assets/static/inActiveCrmIcon.svg';
import ActiveCrmIcon from '../../../../../public/assets/static/activeCrmIcon.svg';

const {Sider} = Layout;

const SideBar = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<number>(1);

  const [crmChildKey, setCrmChildKey] = useState<number>(0);
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
  const isSuperAdmin = userInformation?.SuperAdmin;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes('dashboard')) {
      setSelectedKey(1);
    } else if (pathname?.includes('allQuote')) {
      setSelectedKey(2);
    } else if (pathname?.includes('dealReg')) {
      setSelectedKey(3);
    } else if (pathname?.includes('partners')) {
      setSelectedKey(5);
    } else if (
      pathname?.includes('crmInAccount') ||
      pathname?.includes('accountDetails')
    ) {
      setSelectedKey(7);
      setCrmChildKey(1);
    } else if (pathname?.includes('crmContact')) {
      setSelectedKey(7);
      setCrmChildKey(2);
    } else if (pathname?.includes('crmOpportunity')) {
      setSelectedKey(7);
      setCrmChildKey(3);
    } else if (pathname?.includes('admin')) {
      setSelectedKey(11);
    }
  }, []);

  const items: MenuItem[] = [
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(1);
          setCrmChildKey(0);
          router?.push('/dashboard');
        }}
        name="Button 1"
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <Squares2X2Icon
                color={
                  selectedKey == 1
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
              selectedKey == 1 ? token?.colorPrimary : token?.colorTextSecondary
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
                  selectedKey?.toString()?.includes('7') ||
                  selectedKey?.toString()?.includes('8') ||
                  selectedKey?.toString()?.includes('0') ||
                  selectedKey?.toString()?.includes('9')
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
              selectedKey?.toString()?.includes('7') ||
              selectedKey?.toString()?.includes('8') ||
              selectedKey?.toString()?.includes('0') ||
              selectedKey?.toString()?.includes('9')
                ? token?.colorPrimary
                : token?.colorTextSecondary
            }
          >
            Quote
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
              router?.push('/unprocessedQuote');
            }}
          >
            <OsAvatar
              icon={
                selectedKey?.toString()?.includes('8') ? (
                  <Image
                    src={ActiveCrmIcon}
                    alt="ActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
                  />
                ) : (
                  <Image
                    src={InActiveCrmIcon}
                    alt="InActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
                  />
                )
              }
            />
            <Typography
              name="Button 1"
              cursor="pointer"
              color={
                selectedKey?.toString()?.includes('8')
                  ? token.colorPrimaryBorder
                  : token?.colorTextSecondary
              }
            >
              UnProcessed Quote
            </Typography>
          </Space>,
          '8',
        ),
        getItem(
          <Space
            size={12}
            onClick={() => {
              setSelectedKey(9);
              router?.push('/quoteConfiguration');
            }}
            color={token?.colorTextSecondary}
          >
            <OsAvatar
              icon={
                selectedKey?.toString()?.includes('9') ? (
                  <Image
                    src={ActiveCrmIcon}
                    alt="ActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
                  />
                ) : (
                  <Image
                    src={InActiveCrmIcon}
                    alt="InActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
                  />
                )
              }
            />
            <Typography
              cursor="pointer"
              name="Button 1"
              color={
                selectedKey?.toString()?.includes('9')
                  ? token.colorPrimaryBorder
                  : token?.colorTextSecondary
              }
            >
              Quote Configuration
            </Typography>
          </Space>,
          '9',
        ),
      ],
    ),
    isQuoteAI &&
      getItem(
        <Space
          size={12}
          onClick={() => {
            setSelectedKey(2);
            setCrmChildKey(0);
            router?.push('/allQuote');
          }}
          color={token?.colorTextSecondary}
        >
          <OsAvatar
            icon={
              <CurrencyDollarIcon
                color={
                  selectedKey?.toString()?.includes('2')
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
              selectedKey?.toString()?.includes('2')
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
            setCrmChildKey(0);
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
                    selectedKey?.toString()?.includes('3')
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
                selectedKey?.toString()?.includes('3')
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
            setCrmChildKey(0);
          }}
          name="Button 1"
          color={token?.colorTextSecondary}
        >
          <Space size={12}>
            <OsAvatar
              icon={
                <ShoppingBagIcon
                  color={
                    selectedKey?.toString()?.includes('4')
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
                selectedKey?.toString()?.includes('4')
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
          setCrmChildKey(0);
          router?.push(isSuperAdmin ? 'superAdminPartner' : '/partners');
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <UsersIcon
                color={
                  selectedKey?.toString()?.includes('5')
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
              selectedKey?.toString()?.includes('5')
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
          setCrmChildKey(0);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <BoltIcon
                color={
                  selectedKey?.toString()?.includes('6')
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
              selectedKey?.toString()?.includes('6')
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
                  selectedKey?.toString()?.includes('7') ||
                  selectedKey?.toString()?.includes('8') ||
                  selectedKey?.toString()?.includes('0') ||
                  selectedKey?.toString()?.includes('9')
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
              marginRight: '60px',
            }}
            color={
              selectedKey?.toString()?.includes('7') ||
              selectedKey?.toString()?.includes('8') ||
              selectedKey?.toString()?.includes('0') ||
              selectedKey?.toString()?.includes('9')
                ? token?.colorLink
                : token?.colorTextSecondary
            }
          >
            CRM Information
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
              setCrmChildKey(1);
              setSelectedKey(7);
              router?.push('/crmInAccount');
            }}
          >
            <OsAvatar
              icon={
                crmChildKey === 1 ? (
                  <Image
                    src={ActiveCrmIcon}
                    alt="ActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
                  />
                ) : (
                  <Image
                    src={InActiveCrmIcon}
                    alt="InActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
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
              setCrmChildKey(2);
              setSelectedKey(7);
              router?.push('/crmContact');
            }}
            color={token?.colorTextSecondary}
          >
            <OsAvatar
              icon={
                crmChildKey === 2 ? (
                  <Image
                    src={ActiveCrmIcon}
                    alt="ActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
                  />
                ) : (
                  <Image
                    src={InActiveCrmIcon}
                    alt="InActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
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
              setCrmChildKey(3);
              setSelectedKey(7);
              router?.push('/crmOpportunity');
            }}
            color={token?.colorTextSecondary}
          >
            <OsAvatar
              icon={
                crmChildKey === 3 ? (
                  <Image
                    src={ActiveCrmIcon}
                    alt="ActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
                  />
                ) : (
                  <Image
                    src={InActiveCrmIcon}
                    alt="InActiveCrmIcon"
                    style={{width: '15px', height: '15px'}}
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
            setCrmChildKey(0);
            router?.push('/admin');
          }}
          color={token?.colorTextSecondary}
        >
          <OsAvatar
            icon={
              <AdjustmentsHorizontalIcon
                color={
                  selectedKey?.toString()?.includes('11')
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
              selectedKey?.toString()?.includes('11')
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
                selectedKey?.toString()?.includes('7') ||
                selectedKey?.toString()?.includes('8') ||
                selectedKey?.toString()?.includes('0') ||
                selectedKey?.toString()?.includes('9')
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
