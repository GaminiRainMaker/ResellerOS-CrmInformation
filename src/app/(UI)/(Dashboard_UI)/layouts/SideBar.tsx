/* eslint-disable no-extra-boolean-cast */
/* eslint-disable eqeqeq */

'use client';

import {Space} from '@/app/components/common/antd/Space';
// eslint-disable-next-line import/no-extraneous-dependencies
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsAvatar from '@/app/components/common/os-avatar';
import Typography from '@/app/components/common/typography';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
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
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import ActiveCrmIcon from '../../../../../public/assets/static/activeCrmIcon.svg';
import InActiveCrmIcon from '../../../../../public/assets/static/inActiveCrmIcon.svg';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setUserInformation} from '../../../../../redux/slices/user';
import {LayoutMenuStyle} from './styled-components';

const {Sider} = Layout;

const SideBar = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState<boolean>(true);
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
            MasterAdmin: payload?.payload?.master_admin,
            Role: payload?.payload?.role,
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
  const Role = userInformation?.Role;

  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes('dashboard')) {
      setSelectedKey(1);
    } else if (pathname?.includes('unprocessedQuote')) {
      setSelectedKey(2);
    } else if (pathname?.includes('quoteConfiguration')) {
      setSelectedKey(3);
    } else if (
      pathname?.includes('allQuote') ||
      pathname?.includes('generateQuote')
    ) {
      setSelectedKey(4);
    } else if (pathname?.includes('dealReg')) {
      setSelectedKey(5);
    } else if (pathname?.includes('superAdminDealReg')) {
      setSelectedKey(6);
    } else if (pathname?.includes(' Orders AI')) {
      setSelectedKey(7);
    } else if (pathname?.includes('partners')) {
      setSelectedKey(8);
    } else if (pathname?.includes('Renewals and Upgrades')) {
      setSelectedKey(9);
    } else if (pathname?.includes('crmInAccount')) {
      setSelectedKey(10);
      setCrmChildKey(1);
    } else if (pathname?.includes('crmContact')) {
      setSelectedKey(11);
      setCrmChildKey(2);
    } else if (pathname?.includes('crmOpportunity')) {
      setSelectedKey(12);
      setCrmChildKey(3);
    } else if (pathname?.includes('admin')) {
      setSelectedKey(13);
    } else if (pathname?.includes('userManagement')) {
      setSelectedKey(14);
    } else if (pathname?.includes('superAdminPermissions')) {
      setSelectedKey(15);
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
            cursor="pointer"
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
    isAdmin &&
      Role === 'superAdmin' &&
      getItem(
        <Typography
          cursor="pointer"
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
                    selectedKey?.toString()?.includes('2') ||
                    selectedKey?.toString()?.includes('3')
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
              style={{
                marginTop: '1px',
                marginRight: '60px',
              }}
              color={
                selectedKey?.toString()?.includes('2') ||
                selectedKey?.toString()?.includes('3')
                  ? token?.colorPrimary
                  : token?.colorTextSecondary
              }
            >
              Quote
            </Typography>
          </Space>
        </Typography>,
        '2',
        '',
        [
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(2);
                router?.push('/unprocessedQuote');
              }}
            >
              <OsAvatar
                icon={
                  selectedKey?.toString()?.includes('2') ? (
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
                  selectedKey?.toString()?.includes('2')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Edited Quotes
              </Typography>
            </Space>,
            '2',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(3);
                router?.push('/quoteConfiguration');
              }}
              color={token?.colorTextSecondary}
            >
              <OsAvatar
                icon={
                  selectedKey?.toString()?.includes('3') ? (
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
                  selectedKey?.toString()?.includes('3')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Super Admin Permissions
              </Typography>
            </Space>,
            '3',
          ),
        ],
      ),
    isQuoteAI &&
      Role === 'reseller' &&
      getItem(
        <Space
          size={12}
          onClick={() => {
            setSelectedKey(4);
            setCrmChildKey(0);
            router?.push('/allQuote');
          }}
          color={token?.colorTextSecondary}
        >
          <OsAvatar
            icon={
              <CurrencyDollarIcon
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
            cursor="pointer"
            name="Button 1"
            color={
              selectedKey?.toString()?.includes('4')
                ? token?.colorPrimary
                : token?.colorTextSecondary
            }
          >
            Quote AI
          </Typography>
        </Space>,

        '4',
      ),
    isDealReg &&
      Role === 'reseller' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(5);
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
                    selectedKey?.toString()?.includes('5')
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
              style={{
                marginTop: '1px',
              }}
              color={
                selectedKey?.toString()?.includes('5')
                  ? token?.colorPrimary
                  : token?.colorTextSecondary
              }
            >
              {' '}
              DealReg AI
            </Typography>
          </Space>
        </Typography>,
        '5',
      ),
    isDealReg &&
      Role === 'superAdmin' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(6);
            setCrmChildKey(0);
            router?.push('/superAdminDealReg');
          }}
          name="Button 1"
          color={token?.colorTextSecondary}
        >
          <Space size={12}>
            <OsAvatar
              icon={
                <ReceiptPercentIcon
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
              cursor="pointer"
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
              DealReg AI
            </Typography>
          </Space>
        </Typography>,
        '6',
      ),
    isOrderAI &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(7);
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
                    selectedKey?.toString()?.includes('7')
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
              style={{
                marginTop: '1px',
              }}
              color={
                selectedKey?.toString()?.includes('7')
                  ? token?.colorPrimary
                  : token?.colorTextSecondary
              }
            >
              {' '}
              Orders AI
            </Typography>
          </Space>
        </Typography>,
        '7',
      ),
    getItem(
      <Typography
        cursor="pointer"
        onClick={() => {
          setSelectedKey(8);
          setCrmChildKey(0);
          router?.push(
            isAdmin && Role === 'superAdmin'
              ? 'superAdminPartner'
              : '/partners',
          );
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <Space size={12}>
          <OsAvatar
            icon={
              <UsersIcon
                color={
                  selectedKey?.toString()?.includes('8')
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
            style={{
              marginTop: '1px',
            }}
            color={
              selectedKey?.toString()?.includes('8')
                ? token?.colorPrimary
                : token?.colorTextSecondary
            }
          >
            Partners & Partners Program
          </Typography>
        </Space>
      </Typography>,
      '8',
    ),
    !isAdmin &&
      Role === 'reseller' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(9);
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
                    selectedKey?.toString()?.includes('9')
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
              style={{
                marginTop: '1px',
              }}
              color={
                selectedKey?.toString()?.includes('9')
                  ? token?.colorPrimary
                  : token?.colorTextSecondary
              }
            >
              {' '}
              Renewals and Upgrades
            </Typography>
          </Space>
        </Typography>,
        '9',
      ),
    Role === 'reseller' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(10);
          }}
          name="Button 1"
          color={token?.colorTextSecondary}
        >
          <Space size={12}>
            <OsAvatar
              icon={
                <UserGroupIcon
                  color={
                    selectedKey?.toString()?.includes('10') ||
                    selectedKey?.toString()?.includes('11') ||
                    // selectedKey?.toString()?.includes('0') ||
                    selectedKey?.toString()?.includes('12')
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
              style={{
                marginTop: '1px',
                marginRight: '60px',
              }}
              color={
                selectedKey?.toString()?.includes('10') ||
                selectedKey?.toString()?.includes('11') ||
                // selectedKey?.toString()?.includes('0') ||
                selectedKey?.toString()?.includes('12')
                  ? token?.colorLink
                  : token?.colorTextSecondary
              }
            >
              CRM Information
            </Typography>
          </Space>
        </Typography>,
        '10',
        '',
        [
          getItem(
            <Space
              size={12}
              onClick={() => {
                setCrmChildKey(10);
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
            '10',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setCrmChildKey(2);
                setSelectedKey(11);
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
            '11',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setCrmChildKey(3);
                setSelectedKey(12);
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
            '12',
          ),
        ],
      ),
    isAdmin &&
      Role === 'reseller' &&
      getItem(
        <Space
          size={12}
          onClick={() => {
            setSelectedKey(13);
            setCrmChildKey(0);
            router?.push('/admin');
          }}
          color={token?.colorTextSecondary}
        >
          <OsAvatar
            icon={
              <AdjustmentsHorizontalIcon
                color={
                  selectedKey?.toString()?.includes('13')
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
              selectedKey?.toString()?.includes('13')
                ? `#1C3557 !important`
                : token?.colorTextSecondary
            }
          >
            Admin
          </Typography>
        </Space>,
        '13',
      ),
    isAdmin &&
      Role === 'superAdmin' &&
      getItem(
        <Space>
          <Typography
            cursor="pointer"
            onClick={() => {
              setSelectedKey(14);
              setCrmChildKey(0);
              router?.push('/userManagement');
            }}
            name="Button 1"
            color={token?.colorTextSecondary}
          >
            <OsAvatar
              icon={
                <UserGroupIcon
                  color={
                    selectedKey?.toString()?.includes('14') ||
                    selectedKey?.toString()?.includes('15')
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
                selectedKey?.toString()?.includes('14') ||
                selectedKey?.toString()?.includes('15')
                  ? token?.colorPrimary
                  : token?.colorTextSecondary
              }
              style={{marginLeft: '12px'}}
            >
              User Management
            </Typography>
          </Typography>
        </Space>,
        '14',
        '',
        [
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(14);
                router?.push('/userManagement');
              }}
            >
              <OsAvatar
                icon={
                  selectedKey?.toString()?.includes('12') ? (
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
                  selectedKey?.toString()?.includes('14')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                All Resellers
              </Typography>
            </Space>,
            '14',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(15);
                router?.push('/superAdminPermissions');
              }}
              color={token?.colorTextSecondary}
            >
              <OsAvatar
                icon={
                  selectedKey?.toString()?.includes('15') ? (
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
                  selectedKey?.toString()?.includes('15')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Super Admin Permissions
              </Typography>
            </Space>,
            '15',
          ),
        ],
      ),
  ];

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
