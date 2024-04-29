/* eslint-disable import/no-extraneous-dependencies */
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
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import SearchSelect from '@/app/components/common/os-select/SearchSelect';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {getBase64, uploadImage} from '@/app/utils/upload';
import styled from '@emotion/styled';
import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import {Avatar, Badge, Layout, Select, Upload, notification} from 'antd';
import ImgCrop from 'antd-img-crop';
import {MenuProps} from 'antd/es/menu';
import Cookies from 'js-cookie';
import _debounce from 'lodash/debounce';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderLogo from '../../../../../public/assets/static/headerLogo.svg';
import DownArrow from '../../../../../public/assets/static/iconsax-svg/Svg/All/bold/arrow-down.svg';
import SearchImg from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/search-normal-1.svg';
import UserIcon from '../../../../../public/assets/static/userIcon.svg';
import {
  ReadNotificationById,
  getAllNewNotification,
  getCountOfNotification,
} from '../../../../../redux/actions/notifications';
import {
  getGloabalySearchDataa,
  getUserProfileData,
} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

export const CustomUpload = styled(Upload)`
  .ant-upload-list-text {
    display: none;
  }
  .ant-upload.ant-upload-select-picture-card {
    border-radius: 0px;
  }
  &.ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload.ant-upload-select {
    border-top: none;
    border-bottom: none;
    border-left: none;
    border-right: none;
    background-color: transparent;
    width: 100%;
    height: fit-content;
  }
  .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item {
    height: 0px;
    border-top: none;
    border-bottom: none;
    border-left: none;
    border-right: none;
    visibility: hidden;
    background-color: red;
    display: none;
  }
  &.ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item {
    height: 0px;
  }
  &.ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item-container {
    height: 0px;
  }
`;

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
  const [profileImg, setProfileImg] = useState<any>();
  const [query, setQuery] = useState<{
    searchText: string | null;
  }>({
    searchText: null,
  });
  const searchQuery = useDebounceHook(query, 400);
  useEffect(() => {
    console.log('searchQuery', searchQuery);
    if (searchQuery && searchQuery?.length > 0) {
      dispatch(getGloabalySearchDataa(searchQuery));
    }
  }, [searchQuery]);
  const [notificationCounts, setNotificationCounts] = useState<number>(0);

  const readAllNotifications = async () => {
    await dispatch(ReadNotificationById(''));
    dispatch(getAllNewNotification(''));
    setNotificationCounts(0);
    // dispatch(getCountOfNotification(''));
  };

  useEffect(() => {
    dispatch(getCountOfNotification(''))?.then((payload) => {
      setNotificationCounts(payload?.payload?.length);
    });
    dispatch(getUserProfileData(''))?.then((payload: any) => {
      setProfileImg(payload?.payload?.profile_image);
    });
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

  const uploadImagesToBackend = async (newFileList: any, index: any) => {
    //     console.log("435433",newFileList)
    // return
    if (newFileList) {
      notification.open({
        message: `Image is uploading. Please wait`,
        type: 'info',
      });
    }
    console.log('newFileListnewFileList', newFileList);
    const data = await getBase64(newFileList);

    const mediaType = newFileList?.type.split('/')[0];

    const loaction = await uploadImage(data, mediaType, newFileList);

    dispatch(getUserProfileData(''))?.then((payload: any) => {
      setProfileImg(payload?.payload?.profile_image);
    });
  };

  const handleNotification = (list: any) => {
    console.log('435435345', list);
    let count = 0;
    if (count === 1) {
      return;
    }
    if (
      list?.file?.size > 100000000 &&
      (list?.file?.originFileObj?.name?.includes('webm') ||
        list?.file?.originFileObj?.name?.includes('WEBM') ||
        list?.file?.originFileObj?.name?.includes('mp4') ||
        list?.file?.originFileObj?.name?.includes('MP4') ||
        list?.file?.originFileObj?.name?.includes('mov') ||
        list?.file?.originFileObj?.name?.includes('MOV') ||
        list?.file?.originFileObj?.name?.includes('avchd') ||
        list?.file?.originFileObj?.name?.includes('AVCHD') ||
        list?.file?.originFileObj?.name?.includes('avi') ||
        list?.file?.originFileObj?.name?.includes('AVI') ||
        list?.file?.originFileObj?.name?.includes('flv') ||
        list?.file?.originFileObj?.name?.includes('FLV') ||
        list?.file?.originFileObj?.name?.includes('wmv') ||
        list?.file?.originFileObj?.name?.includes('WMV'))
    ) {
      count += 1;
      notification.open({
        message: `Video exceeded size limit. Please upload an Video less than 100MB/100000KB`,
      });
    } else if (
      list?.file?.size > 5000000 &&
      !list?.file?.originFileObj?.name?.includes('webm') &&
      !list?.file?.originFileObj?.name?.includes('WEBM') &&
      !list?.file?.originFileObj?.name?.includes('mp4') &&
      !list?.file?.originFileObj?.name?.includes('MP4') &&
      !list?.file?.originFileObj?.name?.includes('mov') &&
      !list?.file?.originFileObj?.name?.includes('MOV') &&
      !list?.file?.originFileObj?.name?.includes('avchd') &&
      !list?.file?.originFileObj?.name?.includes('AVCHD') &&
      !list?.file?.originFileObj?.name?.includes('avi') &&
      !list?.file?.originFileObj?.name?.includes('AVI') &&
      !list?.file?.originFileObj?.name?.includes('flv') &&
      !list?.file?.originFileObj?.name?.includes('FLV') &&
      !list?.file?.originFileObj?.name?.includes('wmv') &&
      !list?.file?.originFileObj?.name?.includes('WMV')
    ) {
      count += 1;
      notification.open({
        message: `Image exceeded size limit. Please upload an image less than 5MB/500KB`,
      });
    } else {
      uploadImagesToBackend(list, '');
    }
  };

  console.log('profileImg', profileImg);

  const debounceFn = useCallback(_debounce(handleNotification, 500), []);

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
                  {notificationCount?.length > 0 ? (
                    <>
                      {notificationCount?.map((notificationDataItem: any) => (
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
                                userInformation?.Admin
                                  ? `/superAdminPartner?tab=2`
                                  : '/partners?tab=2',
                              );
                            }}
                            maxWidth={300}
                          />
                        </GlobalLoader>
                      ))}
                    </>
                  ) : (
                    <Typography
                      name="Body 3/Medium"
                      style={{display: 'flex', justifyContent: 'center'}}
                    >
                      No New Notifications
                    </Typography>
                  )}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    {' '}
                    <OsButton
                      text="See All"
                      buttontype="PRIMARY"
                      clickHandler={() => {
                        router?.push('/notification');
                        setOpenNotifications(false);
                      }}
                    />
                  </div>
                </div>
              )}
            >
              <Badge count={notificationCounts}>
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
                    <ImgCrop
                      onModalOk={(list: any) => {
                        debounceFn(list);
                      }}
                    >
                      <CustomUpload showUploadList={false}>
                        <Avatar
                          src={profileImg}
                          icon={
                            <Image
                              src={UserIcon}
                              alt="UserIcon"
                              style={{cursor: 'pointer'}}
                            />
                          }
                          shape="circle"
                          size="large"
                          style={{
                            background: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        />
                      </CustomUpload>
                    </ImgCrop>
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
                  <Avatar
                    src={profileImg}
                    icon={
                      <Image
                        src={UserIcon}
                        alt="UserIcon"
                        style={{cursor: 'pointer'}}
                      />
                    }
                    shape="circle"
                    size="large"
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
