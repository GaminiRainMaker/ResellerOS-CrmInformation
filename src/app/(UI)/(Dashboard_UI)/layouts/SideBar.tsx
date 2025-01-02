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
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {Suspense, useEffect, useState} from 'react';
import ActiveCrmIcon from '../../../../../public/assets/static/activeCrmIcon.svg';
import InActiveCrmIcon from '../../../../../public/assets/static/inActiveCrmIcon.svg';
import {
  getOranizationSeats,
  getUserByTokenAccess,
} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setUserInformation} from '../../../../../redux/slices/user';
import {LayoutMenuStyle} from './styled-components';
import {
  getAllCustomerOfCacheFlow,
  getProposalForSubscription,
  getSubsvriptionForCustomer,
} from '../../../../../redux/actions/cacheFlow';
import {
  setCacheAvailableSeats,
  setIsSubscribed,
  setCacheTotalQuoteSeats,
  setCacheTotalDealRegSeats,
} from '../../../../../redux/slices/cacheFLow';

const {Sider} = Layout;

const SideBar = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [selectedKey, setSelectedKey] = useState<number>(1);
  const [crmChildKey, setCrmChildKey] = useState<number>(0);
  const {userInformation} = useAppSelector((state) => state.user);
  const {cacheAvailableSeats} = useAppSelector((state) => state.cacheFLow);
  const searchParams = useSearchParams()!;
  const salesForceUrl = searchParams.get('instance_url');

  type MenuItem = Required<MenuProps>['items'][number];

  useEffect(() => {
    if (!!userInformation && !salesForceUrl) {
      dispatch(getUserByTokenAccess('')).then((payload: any) => {
        const relevantData = {
          QuoteAI: payload?.payload?.is_quote,
          DealReg: payload?.payload?.is_dealReg,
        };

        localStorage.setItem('userInfo', JSON.stringify(relevantData));
        return dispatch(
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
            ProfileImage: payload?.payload?.profile_image,
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
      setSelectedKey(7);
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

  const getSubsCriptionForCustomer = async (SubId: any) => {
    try {
      let allSubscriptionForCustomer = await dispatch(
        getSubsvriptionForCustomer(SubId),
      )?.then((payload: any) => {
        return payload?.payload?.sucess;
      });
      if (allSubscriptionForCustomer) {
        dispatch(setIsSubscribed(true));
      }

      let activeSubscription = allSubscriptionForCustomer?.find(
        (item: any) => item?.status === 'active',
      );

      if (activeSubscription) {
        let allProposalData = await dispatch(
          getProposalForSubscription(activeSubscription?.id),
        )?.then((payload: any) => {
          return payload?.payload?.sucess;
        });

        if (allProposalData) {
          allProposalData?.[0]?.proposalItems?.map((items: any) => {
            if (items?.name === 'QuoteAI') {
              dispatch(
                setCacheTotalQuoteSeats({
                  TotalQuoteSeats: items?.quantity,
                }),
              );
            }
            if (items?.name === 'DealRegAI') {
              dispatch(
                setCacheTotalDealRegSeats({TotalDealRegSeats: items?.quantity}),
              );
            }
          });
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getAllCustomerByCache = async () => {
    try {
      let CustomerData = await dispatch(getAllCustomerOfCacheFlow(''))?.then(
        (customerPayload: any) => {
          if (customerPayload?.payload) {
            return customerPayload?.payload?.sucess;
          }
        },
      );

      let loggedInOrganization = CustomerData?.find(
        (items: any) =>
          items?.name
            ?.replace(/\s/g, '')
            ?.replace(/[^\w\s]/gi, '')
            ?.toLowerCase() == userInformation?.organization?.toLowerCase(),
      );

      if (loggedInOrganization) {
        getSubsCriptionForCustomer(loggedInOrganization?.id);
      } else if (!loggedInOrganization) {
        dispatch(setIsSubscribed(false));
      }
    } catch (error: any) {
      console.log('error', error.message);
    }
  };
  useEffect(() => {
    if (!salesForceUrl) {
      getAllCustomerByCache();
    }
  }, [userInformation]);

  useEffect(() => {
    if (!salesForceUrl) {
      dispatch(getOranizationSeats(''))?.then((payload: any) => {
        dispatch(
          setCacheAvailableSeats({
            ...cacheAvailableSeats,
            DealRegSeats: payload?.payload?.DealRegAIBundle,
            QuoteAISeats: payload?.payload?.QuoteAI,
          }),
        );
      });
    }
  }, []);

  const items: MenuItem[] = [
    Role !== 'superAdmin' &&
      !salesForceUrl &&
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
              }}
              color={
                selectedKey == 1 ? token?.colorLink : token?.colorTextSecondary
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
                    selectedKey === 2 ||
                    selectedKey === 3 ||
                    selectedKey === 4 ||
                    selectedKey === 5
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
                selectedKey === 2 ||
                selectedKey === 3 ||
                selectedKey === 4 ||
                selectedKey === 5
                  ? token?.colorLink
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
                  selectedKey === 2 ? (
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
                  selectedKey === 3 ? (
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
                Quotes Configuration
              </Typography>
            </Space>,
            '3',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(4);
                router?.push('/contract');
              }}
              color={token?.colorTextSecondary}
            >
              <OsAvatar
                icon={
                  selectedKey === 4 ? (
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
                  selectedKey?.toString()?.includes('4')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Contract
              </Typography>
            </Space>,
            '4',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(5);
                router?.push('/contractProduct');
              }}
              color={token?.colorTextSecondary}
            >
              <OsAvatar
                icon={
                  selectedKey === 5 ? (
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
                  selectedKey?.toString()?.includes('5')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Contract Product
              </Typography>
            </Space>,
            '5',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(6);
                router?.push('/quoteMapping');
              }}
              color={token?.colorTextSecondary}
            >
              <OsAvatar
                icon={
                  selectedKey === 6 ? (
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
                  selectedKey?.toString()?.includes('6')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Quote Mappings
              </Typography>
            </Space>,
            '6',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(7);
                router?.push('/formulas');
              }}
              color={token?.colorTextSecondary}
            >
              <OsAvatar
                icon={
                  selectedKey === 7 ? (
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
                  selectedKey?.toString()?.includes('6')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Stored Formulas
              </Typography>
            </Space>,
            '7',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(8);
                router?.push('/salesForceCredentials');
              }}
              color={token?.colorTextSecondary}
            >
              <OsAvatar
                icon={
                  selectedKey === 8 ? (
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
                  selectedKey?.toString()?.includes('8')
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                SalesForce Credentials
              </Typography>
            </Space>,
            '8',
          ),
        ],
      ),
    isQuoteAI &&
      Role === 'reseller' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(6);
            router?.push('/allQuote');
          }}
          name="Button 1"
          color={token?.colorTextSecondary}
        >
          <Space size={12}>
            <OsAvatar
              icon={
                <CurrencyDollarIcon
                  color={
                    selectedKey === 6
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
                selectedKey === 6 ? token?.colorLink : token?.colorTextSecondary
              }
            >
              Quote AI
            </Typography>
          </Space>
        </Typography>,
        '6',
        '',
      ),

    isDealReg &&
      Role === 'reseller' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(7);
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
                    selectedKey === 7
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
              }}
              color={
                selectedKey === 7 ? token?.colorLink : token?.colorTextSecondary
              }
            >
              {' '}
              DealRegAI
            </Typography>
          </Space>
        </Typography>,
        '7',
      ),
    isAdmin &&
      Role === 'superAdmin' &&
      getItem(
        <Space>
          <Typography
            cursor="pointer"
            onClick={() => {
              setSelectedKey(7);
              setCrmChildKey(0);
              router?.push('/assertMapping');
            }}
            name="Button 1"
            color={token?.colorTextSecondary}
          >
            {' '}
            <OsAvatar
              icon={
                <ShoppingBagIcon
                  color={
                    selectedKey === 8 || selectedKey === 7
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
                selectedKey === 8 || selectedKey === 7
                  ? token?.colorLink
                  : token?.colorTextSecondary
              }
              style={{marginLeft: '12px'}}
            >
              Order AI{' '}
            </Typography>
          </Typography>
        </Space>,
        '7',
        '',
        [
          // getItem(
          //   <Space
          //     size={12}
          //     onClick={() => {
          //       setSelectedKey(7);
          //       router?.push('/dealReg');
          //     }}
          //   >
          //     <OsAvatar
          //       icon={
          //         selectedKey === 7 ? (
          //           <Image
          //             src={ActiveCrmIcon}
          //             alt="ActiveCrmIcon"
          //             style={{width: '15px', height: '15px'}}
          //           />
          //         ) : (
          //           <Image
          //             src={InActiveCrmIcon}
          //             alt="InActiveCrmIcon"
          //             style={{width: '15px', height: '15px'}}
          //           />
          //         )
          //       }
          //     />
          //     <Typography
          //       name="Button 1"
          //       cursor="pointer"
          //       color={
          //         selectedKey === 7
          //           ? token.colorPrimaryBorder
          //           : token?.colorTextSecondary
          //       }
          //     >
          //       DealRegAI
          //     </Typography>
          //   </Space>,
          //   '7',
          // ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(8);
                router?.push('/assertMapping');
              }}
            >
              <OsAvatar
                icon={
                  selectedKey === 8 ? (
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
                  selectedKey === 8
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Asset Mappings
              </Typography>
            </Space>,
            '8',
          ),
        ],
      ),
    isDealReg &&
      Role === 'superAdmin' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(9);
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
                    selectedKey === 9
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
              }}
              color={
                selectedKey === 9 ? token?.colorLink : token?.colorTextSecondary
              }
            >
              {' '}
              DealRegAI
            </Typography>
          </Space>
        </Typography>,
        '9',
      ),
    // isOrderAI &&
    //   getItem(
    //     <Typography
    //       cursor="pointer"
    //       onClick={() => {
    //         setSelectedKey(9);
    //         setCrmChildKey(0);
    //       }}
    //       name="Button 1"
    //       color={token?.colorTextSecondary}
    //     >
    //       <Space size={12}>
    //         <OsAvatar
    //           icon={
    //             <ShoppingBagIcon
    //               color={
    //                  selectedKey ===9
    //                   ? token?.colorLink
    //                   : token?.colorTextSecondary
    //               }
    //               width={24}
    //             />
    //           }
    //         />

    //         <Typography
    //           cursor="pointer"
    //           name="Button 1"
    //           style={{
    //             marginTop: '1px',
    //           }}
    //           color={
    //              selectedKey ===9
    //               ? token?.colorLink
    //               : token?.colorTextSecondary
    //           }
    //         >
    //           {' '}
    //           Orders AI
    //         </Typography>
    //       </Space>
    //     </Typography>,
    //     '9',
    //   ),

    isDealReg &&
      Role === 'reseller' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(10);
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
                    selectedKey === 10
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
              }}
              color={
                selectedKey === 10
                  ? token?.colorLink
                  : token?.colorTextSecondary
              }
            >
              Partners & Partners Program
            </Typography>
          </Space>
        </Typography>,
        '10',
      ),
    isAdmin &&
      Role === 'superAdmin' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(11);
            setCrmChildKey(0);
            router?.push('superAdminPartner');
          }}
          name="Button 1"
          color={token?.colorTextSecondary}
        >
          <Space size={12}>
            <OsAvatar
              icon={
                <UsersIcon
                  color={
                    selectedKey === 11
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
              }}
              color={
                selectedKey === 11
                  ? token?.colorLink
                  : token?.colorTextSecondary
              }
            >
              Partners & Partners Program
            </Typography>
          </Space>
        </Typography>,
        '11',
      ),
    // !isAdmin &&
    //   Role === 'reseller' &&
    //   getItem(
    //     <Typography
    //       cursor="pointer"
    //       onClick={() => {
    //         setSelectedKey(12);
    //         setCrmChildKey(0);
    //       }}
    //       name="Button 1"
    //       color={token?.colorTextSecondary}
    //     >
    //       <Space size={12}>
    //         <OsAvatar
    //           icon={
    //             <BoltIcon
    //               color={
    //                 selectedKey === 12
    //                   ? token?.colorLink
    //                   : token?.colorTextSecondary
    //               }
    //               width={24}
    //             />
    //           }
    //         />
    //         <Typography
    //           cursor="pointer"
    //           name="Button 1"
    //           style={{
    //             marginTop: '1px',
    //           }}
    //           color={
    //             selectedKey === 12
    //               ? token?.colorLink
    //               : token?.colorTextSecondary
    //           }
    //         >
    //           {' '}
    //           Renewals and Upgrades
    //         </Typography>
    //       </Space>
    //     </Typography>,
    //     '12',
    //   ),
    (isQuoteAI || isDealReg) &&
      Role === 'reseller' &&
      getItem(
        <Typography
          cursor="pointer"
          onClick={() => {
            setSelectedKey(13);
          }}
          name="Button 1"
          color={token?.colorTextSecondary}
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
                selectedKey === 14 || selectedKey === 13 || selectedKey === 15
                  ? token?.colorLink
                  : token?.colorTextSecondary
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
            '15',
          ),
        ],
      ),
    isAdmin &&
      Role === 'reseller' &&
      getItem(
        <Space
          size={12}
          onClick={() => {
            setSelectedKey(16);
            setCrmChildKey(0);
            router?.push('/admin');
          }}
          color={token?.colorTextSecondary}
        >
          <OsAvatar
            icon={
              <AdjustmentsHorizontalIcon
                color={
                  selectedKey === 16
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
              selectedKey === 16 ? token?.colorLink : token?.colorTextSecondary
            }
          >
            Admin
          </Typography>
        </Space>,
        '16',
      ),
    isAdmin &&
      Role === 'superAdmin' &&
      getItem(
        <Space>
          <Typography
            cursor="pointer"
            onClick={() => {
              setSelectedKey(17);
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
                    selectedKey === 18 || selectedKey === 17
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
                selectedKey === 17 || selectedKey === 18
                  ? token?.colorLink
                  : token?.colorTextSecondary
              }
              style={{marginLeft: '12px'}}
            >
              User Management
            </Typography>
          </Typography>
        </Space>,
        '17',
        '',
        [
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(17);
                router?.push('/userManagement');
              }}
            >
              <OsAvatar
                icon={
                  selectedKey === 17 ? (
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
                  selectedKey === 17
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                All Resellers
              </Typography>
            </Space>,
            '17',
          ),
          getItem(
            <Space
              size={12}
              onClick={() => {
                setSelectedKey(18);
                router?.push('/superAdminPermissions');
              }}
              color={token?.colorTextSecondary}
            >
              <OsAvatar
                icon={
                  selectedKey === 18 ? (
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
                  selectedKey === 18
                    ? token.colorPrimaryBorder
                    : token?.colorTextSecondary
                }
              >
                Super Admin Permissions
              </Typography>
            </Space>,
            '18',
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
      <Suspense fallback={<div>Loading...</div>}>
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
                    ? token?.colorLink
                    : token?.colorTextSecondary,
              }}
            />
          }
        />
      </Suspense>
    </Sider>
  );
};

export default SideBar;
