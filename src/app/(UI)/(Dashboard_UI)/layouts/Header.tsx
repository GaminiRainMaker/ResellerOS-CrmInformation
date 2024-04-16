/* eslint-disable no-nested-ternary */

'use client';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Divider} from '@/app/components/common/antd/Divider';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import SearchInput from '@/app/components/common/os-input/SearchInput';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import {Badge, Layout} from 'antd';
import {MenuProps} from 'antd/es/menu';
import Cookies from 'js-cookie';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import SearchSelect from '@/app/components/common/os-select/SearchSelect';
import HeaderLogo from '../../../../../public/assets/static/headerLogo.svg';
import DownArrow from '../../../../../public/assets/static/iconsax-svg/Svg/All/bold/arrow-down.svg';
import SearchImg from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/search-normal-1.svg';
import UserIcon from '../../../../../public/assets/static/userIcon.svg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  ReadNotificationById,
  getAllNewNotification,
  getCountOfNotification,
} from '../../../../../redux/actions/notifications';

const CustomHeader = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const {loading, userInformation} = useAppSelector((state) => state.user);
  const [userRole, setUserRole] = useState<string>('');
  const dispatch = useAppDispatch();
  const [allNewNotification, setAllNewNotifications] = useState<any>();
  const [newNotificationsCount, setNewNotificationCount] = useState<number>();
  const getAllNewNotifications = async () => {
    dispatch(getAllNewNotification('')).then((payload) => {
      setAllNewNotifications(payload?.payload?.data);
    });
  };
  const readAllNotifications = async () => {
    await dispatch(ReadNotificationById(''));
    setNewNotificationCount(0);

    getAllNewNotifications();
  };

  useEffect(() => {
    dispatch(getCountOfNotification(''))?.then((payload) => {
      setNewNotificationCount(payload?.payload?.data);
    });
  }, []);

  console.log('allNewNotificationallNewNotification', allNewNotification);

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
              showSearch
              style={{width: '550px'}}
              placeholder="Search"
              allowClear
              prefixIcon={<Image src={SearchImg} alt="SearchImg" />}
            />
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
            <Badge count={newNotificationsCount}>
              <AvatarStyled
                onClick={readAllNotifications}
                background={token?.colorInfoBg}
                icon={<BellIcon width={24} color={token?.colorInfoBorder} />}
              />
            </Badge>

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
