/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */

'use client';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Divider} from '@/app/components/common/antd/Divider';
import {Space} from '@/app/components/common/antd/Space';
// eslint-disable-next-line import/no-extraneous-dependencies

import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import GlobalLoader from '@/app/components/common/os-global-loader';
import SearchSelect from '@/app/components/common/os-select/SearchSelect';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import {Badge, Layout, Select} from 'antd';
import {MenuProps} from 'antd/es/menu';
import Cookies from 'js-cookie';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import HeaderLogo from '../../../../../public/assets/static/headerLogo.svg';
import DownArrow from '../../../../../public/assets/static/iconsax-svg/Svg/All/bold/arrow-down.svg';
import SearchImg from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/search-normal-1.svg';
import UserIcon from '../../../../../public/assets/static/userIcon.svg';
import {
  ReadNotificationById,
  getAllNewNotification,
  getCountOfNotification,
} from '../../../../../redux/actions/notifications';
import {getGloabalySearchDataa} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const CustomHeader = () => {
  const [token] = useThemeToken();
  const {Option} = Select;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {userInformation, searchDataa} = useAppSelector((state) => state.user);
  const {
    notificationCount,
    data: notificationData,
    loading: notificationLoading,
  } = useAppSelector((state) => state.notification);
  const [openNotifications, setOpenNotifications] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const [searchFinalData, setSearchFinalData] = useState<any>();
  const [query, setQuery] = useState<{
    searchText: string | null;
  }>({
    searchText: null,
  });
  const searchQuery = useDebounceHook(query, 400);
  useEffect(() => {
    dispatch(getGloabalySearchDataa(searchQuery));
  }, [searchQuery]);

  const readAllNotifications = async () => {
    await dispatch(ReadNotificationById(''));
    dispatch(getAllNewNotification(''));
    dispatch(getCountOfNotification(''));
  };

  useEffect(() => {
    dispatch(getCountOfNotification(''));
  }, []);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() => router.push(`/accountInfo`)}
        >
          My Account{' '}
        </Typography>
      ),
    },
    {
      key: '2',
      label: (
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() => router.push(`/accountInfo`)}
        >
          Settings{' '}
        </Typography>
      ),
    },
    {
      key: '3',
      label: (
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() => router.push(`/accountInfo`)}
        >
          Help & Support{' '}
        </Typography>
      ),
    },
  ];

  const contentStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: token.boxShadowSecondary,
    padding: '12px',
  };
  const dropDownStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: token.boxShadowSecondary,
    padding: '12px',
    width: '450px',
  };
  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
    padding: '0px',
    margin: '0px',
  };

  useEffect(() => {
    setUserRole(
      userInformation?.MasterAdmin && userInformation?.Role === 'superAdmin'
        ? 'Master Super Admin'
        : userInformation?.Role === 'superAdmin'
          ? 'Super Admin'
          : userInformation?.Admin && userInformation?.Role === 'reseller'
            ? 'Reseller Admin'
            : userInformation?.Role === 'reseller'
              ? 'Reseller'
              : '',
    );
  }, [userInformation]);

  const handleOptionClick = (typeRoute: string) => {
    console.log('typeRoute', typeRoute);
    // Redirect based on the typeRoute value
    // Example redirection logic
    if (typeRoute === 'Account') {
      // Redirect to account route
      router?.push('/crmInAccount');
    } else if (typeRoute === 'Partner') {
      // Redirect to another route
      router?.push('/partners');
    } else if (typeRoute === 'Contact') {
      router?.push('/crmContact');
    } else if (typeRoute === 'Opportunity') {
      router?.push('/crmOpportunity');
    }
  };

  useEffect(() => {
    if (searchDataa) {
      const allDataArr: any = [];
      const optionsForSearch: any = [];
      searchDataa?.data?.map((itemGlob: any) => {
        const newObj = {...itemGlob, typeRoute: searchDataa?.type};

        const optionObj = {
          label: (
            <div
              onClick={() => {
                handleOptionClick(searchDataa?.type);
              }}
            >
              {itemGlob?.name
                ? itemGlob?.name
                : itemGlob?.partner
                  ? itemGlob?.partner
                  : itemGlob?.billing_first_name
                    ? itemGlob?.billing_first_name
                    : itemGlob?.title
                      ? itemGlob?.title
                      : searchDataa?.type}
            </div>
          ),
          value: <div>{searchDataa?.type}</div>,
        };
        optionsForSearch?.push(optionObj);
        allDataArr?.push(newObj);
      });

      setSearchFinalData(optionsForSearch);
    }
  }, [searchDataa]);

  // const searchDataOptions = searchFinalData?.map((dataItem: any)=>{
  //   label: dataItem?.name;
  //   key: dataItem?.id,
  // })

  return (
    <Layout>
      <Row
        justify="space-between"
        style={{
          padding: '24px',
          borderBottom: '1px solid  #C7CDD5',
          background: 'white',
        }}
        align="middle"
      >
        <Col>
          <Space size={136} direction="horizontal">
            <Image src={HeaderLogo} alt="HeaderLogo" />
            <SearchSelect
              onSearch={(e: any) => {
                setQuery(e);
              }}
              showSearch
              value={query?.searchText}
              style={{width: '550px'}}
              placeholder="Search"
              allowClear
              prefixIcon={<Image src={SearchImg} alt="SearchImg" />}
              options={searchFinalData}
            >
              {/* {searchFinalData?.map((item: any) => (
                <Option key={item?.id}>
                  <div onClick={() => handleOptionClick(item?.typeRoute)}>
                    {' '}
                    {item?.name}
                  </div>
                </Option>
              ))} */}
            </SearchSelect>
          </Space>
        </Col>
        <Col>
          <Space
            direction="horizontal"
            size={24}
            style={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            {/* <AvatarStyled
              background={token?.colorInfoBg}
              icon={
                <WrenchScrewdriverIcon
                  width={24}
                  color={token?.colorInfoBorder}
                />
              }
            /> */}

            <Dropdown
              trigger={['click']}
              overlayStyle={{
                marginLeft: 200,
                marginTop: 20,
              }}
              open={openNotifications}
              menu={{items}}
              // eslint-disable-next-line react/no-unstable-nested-components
              dropdownRender={() => (
                <div style={dropDownStyle}>
                  {notificationData?.map((notificationDataItem: any) => (
                    <GlobalLoader loading={notificationLoading}>
                      <TableNameColumn
                        key={notificationDataItem?.id}
                        primaryText={notificationDataItem?.title}
                        secondaryText={notificationDataItem?.description}
                        primaryTextTypography="Body 1/Medium"
                        // logo={UserIcon}
                        cursor="pointer"
                        secondaryEllipsis
                        onClick={() => {
                          setOpenNotifications(false);
                          router.push(
                            userInformation?.Role === 'superAdmin'
                              ? `/superAdminPartner?tab=2`
                              : '/partners?tab=2',
                          );
                        }}
                        maxWidth={300}
                      />
                    </GlobalLoader>
                  ))}
                </div>
              )}
            >
              <Badge count={notificationCount}>
                <AvatarStyled
                  onClick={() => {
                    setOpenNotifications(!openNotifications);
                    readAllNotifications();
                  }}
                  background={token?.colorInfoBg}
                  icon={<BellIcon width={24} color={token?.colorInfoBorder} />}
                />
              </Badge>
            </Dropdown>

            <Dropdown
              menu={{items}}
              // eslint-disable-next-line react/no-unstable-nested-components
              dropdownRender={(menu: any) => (
                <div style={contentStyle}>
                  <Space>
                    <Image
                      src={UserIcon}
                      alt="UserIcon"
                      style={{cursor: 'pointer'}}
                    />
                    <Space direction="vertical" size={0}>
                      <Typography name="Body 3/Regular">
                        {userInformation?.username || 'Josh Walker'}
                      </Typography>
                      <Typography name="Body 4/Medium" color={token?.colorInfo}>
                        {userInformation?.email || 'josh.walker@email.com'}
                      </Typography>
                    </Space>
                  </Space>
                  <Divider />
                  <Typography name="Body 2/Medium">Account Info</Typography>
                  {React.cloneElement(menu as React.ReactElement, {
                    style: menuStyle,
                  })}
                  <Divider />
                  <Space
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      Cookies.remove('token');
                      Cookies.remove('id');
                      router.push('/login');
                    }}
                  >
                    <ArrowLeftStartOnRectangleIcon
                      width={24}
                      style={{marginTop: '5px'}}
                      color={token?.colorError}
                    />
                    <Typography name="Body 3/Regular" cursor="pointer">
                      Logout
                    </Typography>
                  </Space>
                </div>
              )}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Image
                    src={UserIcon}
                    alt="UserIcon"
                    style={{cursor: 'pointer'}}
                  />
                  <Space direction="vertical" size={0}>
                    <Typography
                      name="Body 3/Regular"
                      color={token?.colorPrimaryText}
                    >
                      {userInformation?.username || '--'}
                    </Typography>
                    <Typography name="Body 3/Bold" color={token?.colorLink}>
                      {userRole || '--'}
                    </Typography>
                  </Space>
                  <Image
                    src={DownArrow}
                    alt="DownArrow"
                    style={{cursor: 'pointer'}}
                  />
                </Space>
              </a>
            </Dropdown>
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};

export default CustomHeader;
