/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-cycle */
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
import styled from '@emotion/styled';
import {usePathname} from 'next/navigation';

import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Badge,
  Layout,
  Upload,
  Input,
  message,
  notification,
} from 'antd';
import {MenuProps} from 'antd/es/menu';
import Cookies from 'js-cookie';
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {QuestionOutlined} from '@ant-design/icons';
import OsModal from '@/app/components/common/os-modal';
import {
  OSDraggerStyle,
  OSDraggerStyleForSupport,
} from '@/app/components/common/os-upload/styled-components';
import OsInput from '@/app/components/common/os-input';
import {convertFileToBase64} from '@/app/utils/base';
import creditCard from '../../../../../public/assets/static/card-pos.svg';
import HeaderLogo from '../../../../../public/assets/static/headerLogo.svg';
import DownArrow from '../../../../../public/assets/static/iconsax-svg/Svg/All/bold/arrow-down.svg';
import SearchImg from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/search-normal-1.svg';
import {getCountOfNotification} from '../../../../../redux/actions/notifications';
import {getGloabalySearchDataa} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  uploadExcelFileToAws,
  uploadToAws,
  uploadDocumentOnAzure,
  uploalImageonAzure,
} from '../../../../../redux/actions/upload';
import {sendEmailForSuport} from '../../../../../redux/actions/auth';

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
  const router = useRouter();
  const {TextArea} = Input;
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const loginAccount = searchParams.get('self');
  const {userInformation, searchDataa, loginUserInformation} = useAppSelector(
    (state) => state.user,
  );
  const {
    notificationCount,
    data: notificationData,
    loading: notificationLoading,
  } = useAppSelector((state) => state.notification);
  const {isCanvas} = useAppSelector((state) => state.canvas);
  const salesForceUrl = searchParams.get('instance_url');

  const [userRole, setUserRole] = useState<string>('');
  const [searchFinalData, setSearchFinalData] = useState<any>();
  const [profileImg, setProfileImg] = useState<any>();
  const [openSupportModal, setOpenSupportModel] = useState<boolean>(false);
  const [uploadedData, setUpoadedData] = useState<any>();
  const [addIssueToSupport, SetAddIssueToSupport] = useState<any>();
  const [loadingSpin, setLoadingSpin] = useState<boolean>(false);
  const [query, setQuery] = useState<{
    searchText: string | null;
  }>({
    searchText: null,
  });

  const searchQuery = useDebounceHook(query, 400);
  useEffect(() => {
    if (searchQuery && searchQuery?.length > 0) {
      dispatch(getGloabalySearchDataa(searchQuery));
    }
  }, [searchQuery]);
  const [notificationCounts, setNotificationCounts] = useState<number>(0);
  const [errorForSupport, setErrorForSupport] = useState<boolean>(false);

  useEffect(() => {
    if (!isCanvas && !salesForceUrl) {
      dispatch(getCountOfNotification(''))?.then((payload: any) => {
        setNotificationCounts(payload?.payload?.length);
      });
    }
  }, []);

  useEffect(() => {
    if (!isCanvas && !salesForceUrl) {
      setNotificationCounts(0);
    }
  }, [notificationData]);

  const isSuperAdminProfile =
    userInformation?.MasterAdmin && userInformation?.Role === 'superAdmin'
      ? 'SuperAdminProfile'
      : 'reseller';

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() => {
            window.open(
              `/accountInfo?id=${userInformation?.id}&organization=${userInformation?.organization}&tab=myProfile&isSuperAdminProfile=${isSuperAdminProfile}&self=true`,
            );
          }}
        >
          My Settings
        </Typography>
      ),
    },
    // {
    //   key: '2',
    //   label: (
    //     <Typography
    //       name="Body 3/Regular"
    //       cursor="pointer"
    //       onClick={() =>
    //         window.open(
    //           `/accountInfo?id=${userInformation?.id}&organization=${userInformation?.organization}&tab=myProfile&isSuperAdminProfile=${isSuperAdminProfile}&self=true`,
    //         )
    //       }
    //     >
    //       Settings{' '}
    //     </Typography>
    //   ),
    // },
    {
      key: '3',
      label: (
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() =>
            window.open(
              `/accountInfo?id=${userInformation?.id}&organization=${userInformation?.organization}&tab=support&isSuperAdminProfile=${isSuperAdminProfile}`,
            )
          }
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

  const dropDownStyle: any = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: token.boxShadowSecondary,
    padding: '12px',
    width: '450px',
    maxHeight: '50vh',
    overflowY: 'scroll',
    scrollbarWidth: 'thin', // For Firefox
    scrollbarColor: 'rgba(0, 0, 0, 0.5) rgba(345, 543, 533, 0.2)', // For Firefox
    WebkitOverflowScrolling: 'touch', // For iOS momentum scrolling

    // Type assertion to avoid TypeScript error
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'red',
      borderRadius: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '12px',
    },
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
    setProfileImg(userInformation?.ProfileImage);
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
    } else if (typeRoute === 'quoteMapping') {
      router?.push('/quoteMapping');
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
  useEffect(() => {
    if (loginAccount) {
      setProfileImg(loginUserInformation?.profile_image);
    }
  }, [loginUserInformation]);

  const setDataFunc = (namess: string, location: any) => {
    // Using the functional setState to access the latest state
    setUpoadedData((prevData: any) => {
      // Ensure prevData is always an array
      const validPrevData = Array.isArray(prevData) ? prevData : [];

      // Create a new array with the updated data
      const newArr = [...validPrevData, {name: namess, urlAdded: location}];

      // Log the updated array before setting the state

      // Return the updated array to be set as the new state
      return newArr;
    });
  };

  const beforeUpload = async (file: File) => {
    const obj: any = {...file};
    setLoadingSpin(true);
    const pathUsedToUpload = file?.type?.split('.')?.includes('document')
      ? uploadDocumentOnAzure
      : file?.type?.split('.')?.includes('image/jpeg') ||
          file?.type?.split('/')?.includes('image')
        ? uploalImageonAzure
        : uploadToAws;

    convertFileToBase64(file)
      .then(async (base64String: string) => {
        obj.base64 = base64String;
        obj.name = file?.name;

        await dispatch(pathUsedToUpload({document: base64String})).then(
          (payload: any) => {
            setDataFunc(file?.name, payload?.payload?.data);
          },
        );

        setLoadingSpin(false);
      })
      .catch((error: any) => {
        message.error('Error converting file to base64', error);
      });
  };

  useEffect(() => {
    if (addIssueToSupport && addIssueToSupport?.length > 0) {
      setErrorForSupport(false);
    }
  }, [addIssueToSupport]);

  const sendEmailTOSupport = async () => {
    if (!addIssueToSupport) {
      setErrorForSupport(true);

      return;
    }
    setLoadingSpin(true);
    const newArrForUploadded: any = [];

    if (uploadedData && uploadedData?.length > 0) {
      uploadedData?.map((items: any) => {
        newArrForUploadded?.push(items?.urlAdded);
      });
    }

    const newObj = {
      issue: addIssueToSupport,
      attach: newArrForUploadded,
      // organizationName: userInformation?.organization,
      organizationName: userInformation?.organization,
      userName: userInformation?.username,
      userEmail: userInformation?.email,
      tab: pathname,
    };

    await dispatch(sendEmailForSuport(newObj))?.then((payload: any) => {
      notification?.open({
        message: 'Your request has been successfully submitted!',
        type: 'success',
      });
    });
    setLoadingSpin(false);
    setOpenSupportModel(false);
    SetAddIssueToSupport('');
    setUpoadedData([]);
  };
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
        gutter={[0, 16]}
      >
        <Col span={12}>
          <Row justify="space-between" gutter={[0, 16]}>
            <Col>
              <Image src={HeaderLogo} alt="HeaderLogo" />
            </Col>
            {!isCanvas && !salesForceUrl && (
              <Col span={15}>
                <SearchSelect
                  onSearch={(e: any) => {
                    setQuery(e);
                  }}
                  showSearch
                  value={query?.searchText}
                  style={{width: '100%'}}
                  placeholder="Search"
                  allowClear
                  prefixIcon={<Image src={SearchImg} alt="SearchImg" />}
                  options={searchFinalData}
                />
              </Col>
            )}
          </Row>
        </Col>

        <Col>
          {!isCanvas && !salesForceUrl && (
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
              <AvatarStyled
                background={token?.colorInfoBg}
                icon={
                  <QuestionOutlined
                    style={{color: 'grey'}}
                    onClick={() => {
                      setOpenSupportModel(true);
                    }}
                    width={24}
                    color={token?.colorInfoBorder}
                  />
                }
              />

              <Dropdown
                trigger={['click']}
                overlayStyle={{
                  marginLeft: 200,
                  marginTop: 20,
                }}
                menu={{items}}
                dropdownRender={() => (
                  <div style={dropDownStyle}>
                    {notificationCount?.length > 0 ? (
                      <GlobalLoader loading={notificationLoading}>
                        {notificationCount?.map((notificationDataItem: any) => {
                          let fallBackIconsss;
                          let fallBackBg;
                          if (notificationDataItem?.type === 'quote') {
                            fallBackIconsss = (
                              <ExclamationCircleIcon
                                color={token?.colorError}
                                width={24}
                              />
                            );
                            fallBackBg = token?.colorErrorBg;
                          } else if (
                            notificationDataItem?.type === 'subscription'
                          ) {
                            fallBackIconsss = (
                              <Image
                                src={creditCard}
                                alt="creditCard"
                                style={{
                                  cursor: 'pointer',
                                  width: '24px',
                                  height: '24px',
                                }}
                              />
                            );
                            fallBackBg = ' #E6E7EE';
                          } else if (notificationDataItem?.type === 'partner') {
                            fallBackIconsss = (
                              <UsersIcon color={token?.colorInfo} width={24} />
                            );
                            fallBackBg = token?.colorInfoBgHover;
                          }
                          return (
                            <TableNameColumn
                              key={notificationDataItem?.id}
                              primaryText={notificationDataItem?.title}
                              secondaryText={notificationDataItem?.description}
                              primaryTextTypography="Body 1/Medium"
                              logo={
                                notificationDataItem?.type === 'subscription' ||
                                notificationDataItem?.type === 'quote'
                                  ? null
                                  : notificationDataItem?.User?.profile_image
                              }
                              fallbackIcon={fallBackIconsss}
                              iconBg={fallBackBg}
                              cursor="pointer"
                              secondaryEllipsis
                              onClick={() => {
                                router.push(
                                  userInformation?.Admin
                                    ? `/superAdminPartner?tab=2`
                                    : '/partners?tab=2',
                                );
                              }}
                              justifyContent="start"
                              maxWidth={320}
                              marginBottom={10}
                              isNotification
                            />
                          );
                        })}
                      </GlobalLoader>
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
                        }}
                      />
                    </div>
                  </div>
                )}
              >
                <Badge count={notificationCounts}>
                  <AvatarStyled
                    background={token?.colorInfoBg}
                    icon={
                      <BellIcon width={24} color={token?.colorInfoBorder} />
                    }
                  />
                </Badge>
              </Dropdown>

              <Dropdown
                menu={{items}}
                dropdownRender={(menu: any) => (
                  <div style={contentStyle}>
                    <Space>
                      <Avatar
                        src={profileImg}
                        icon={<UserCircleIcon />}
                        shape="circle"
                        size="large"
                      />
                      <Space direction="vertical" size={0}>
                        <Typography name="Body 3/Regular">
                          {userInformation?.username || 'Josh Walker'}
                        </Typography>
                        <Typography
                          name="Body 4/Medium"
                          color={token?.colorInfo}
                        >
                          {userInformation?.email || 'josh.walker@email.com'}
                        </Typography>
                      </Space>
                    </Space>
                    <Divider />
                    <Typography name="Body 2/Medium">Account Info</Typography>
                    {React.cloneElement(menu as React.ReactElement<any>, {
                      style: {
                        ...(menu as React.ReactElement<any>).props.style,
                        ...menuStyle,
                      },
                    })}
                    <Divider />
                    <Space
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        localStorage.removeItem('userInfo');
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
                      icon={<UserCircleIcon />}
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
          )}
        </Col>
      </Row>
      <OsModal
        // title={<Typography name="Body 1/Medium">Report an Issue</Typography>}
        bodyPadding={15}
        loading={loadingSpin}
        width={800}
        body={
          <>
            <GlobalLoader loading={loadingSpin}>
              <Typography name="Body 2/Medium">Report an Issue</Typography>
              <Divider />
              <Space
                content="center"
                style={{display: 'flex', justifyContent: 'center'}}
              >
                <Typography name="Body 2/Medium">
                  Please provide detail for your issue.
                </Typography>
              </Space>
              <Space
                content="center"
                direction="vertical"
                style={{width: '100%', marginTop: '20px'}}
                // style={{display: 'flex', justifyContent: 'center'}}
              >
                <Typography name="Body 3/Medium">Issue Details:</Typography>
                <TextArea
                  style={{
                    width: '100%',
                    height: '100px',
                    border: errorForSupport ? '1px solid red' : '',
                  }}
                  value={addIssueToSupport}
                  onChange={(e: any) => {
                    SetAddIssueToSupport(e?.target?.value);
                  }}
                />
                {errorForSupport && (
                  <div style={{color: 'red'}}>Issue details is required!</div>
                )}
                <div>
                  <Row>
                    {uploadedData &&
                      uploadedData?.length > 0 &&
                      uploadedData?.map((items: any) => (
                        <Col
                          span={6}
                          style={{
                            width: '300px',
                            height: '100px',
                            background:
                              'var(--foundation-n-pri-2-n-30, #f0f4f7)',
                            margin: '5px',
                            borderRadius: '5px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            padding: '10px',
                            border: ' 1px solid #3da5d9',
                            borderStyle: 'dashed',
                          }}
                          onClick={() => {
                            window?.open(items?.urlAdded);
                          }}
                        >
                          {items?.name?.toString()?.slice(0, 30)}
                        </Col>
                      ))}
                  </Row>
                </div>
                <div style={{width: '200px'}}>
                  {' '}
                  <OSDraggerStyleForSupport
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.docx,.pdf"
                  >
                    {' '}
                    <span style={{color: '#3da5d9'}}>Upload a file</span>
                  </OSDraggerStyleForSupport>
                </div>
              </Space>
              <div style={{display: 'flex', justifyContent: 'right'}}>
                <OsButton
                  buttontype="PRIMARY"
                  text="Submit"
                  clickHandler={sendEmailTOSupport}
                />
              </div>
            </GlobalLoader>
          </>
        }
        open={openSupportModal}
        onCancel={() => {
          setOpenSupportModel(false);
          setLoadingSpin(false);
          setOpenSupportModel(false);
          SetAddIssueToSupport('');
          setUpoadedData([]);
        }}
        // open={true}
      />
    </Layout>
  );
};

export default CustomHeader;
