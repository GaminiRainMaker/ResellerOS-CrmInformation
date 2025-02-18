/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import {CustomUpload} from '@/app/(UI)/(Dashboard_UI)/layouts/Header';
import {convertFileToBase64} from '@/app/utils/base';
import {
  BriefcaseIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import {message, notification} from 'antd';
import ImgCrop from 'antd-img-crop';
import _debounce from 'lodash/debounce';
import {useSearchParams} from 'next/navigation';
import {FC, Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {uploalImageonAzure} from '../../../../../redux/actions/upload';
import {useAppDispatch} from '../../../../../redux/hook';
import {Col} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import {AvatarStyled} from '../os-table/styled-components';
import Typography from '../typography';
import {MyProfileCardStyle} from './styled-components';
import {getUserByIdLogin} from '../../../../../redux/actions/user';
import {getCompanyByUserId} from '../../../../../redux/actions/company';

const MyProfileCard: FC<any> = ({data, isCompanyData}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [userRole, setUserRole] = useState<string>('');
  const searchParams = useSearchParams();
  const getUserID = searchParams.get('id');
  const loginAccount = searchParams.get('self');
  const propsDataRef = useRef<any>(null);

  useEffect(() => {
    propsDataRef.current = data;
    setUserRole(
      data?.master_admin && data?.role === 'superAdmin'
        ? 'Master Super Admin'
        : data?.role === 'superAdmin'
          ? 'Super Admin'
          : data?.is_admin && data?.role === 'reseller'
            ? 'Reseller Admin'
            : data?.role === 'reseller'
              ? 'Reseller'
              : '',
    );
  }, [data]);

  const proileDetailData = [
    {
      key: 1,
      title: 'Email',
      data: `${data?.email ?? '--'}`,
      icon: <EnvelopeIcon width={20} color={token?.colorLinkHover} />,
    },
    {
      key: 2,
      title: 'Contact No.',
      data: `${data?.phone_number ?? '--'}`,
      icon: <PhoneIcon width={20} color={token?.colorLinkHover} />,
    },
    {
      key: 3,
      title: 'Job Title',
      data: `${data?.job_title ?? '--'}`,
      icon: <BriefcaseIcon width={20} color={token?.colorLinkHover} />,
    },
  ];

  const uploadImagesToBackend = async (newFileList: any, index: any) => {
    if (newFileList) {
      notification.open({
        message: `Image is uploading. Please wait`,
        type: 'info',
      });
    }
    let UpdatedData: any = {};
    const latestData = propsDataRef.current; // Use the latest data from ref

    if (latestData) {
      convertFileToBase64(newFileList)
        .then(async (base64String: string) => {
          if (isCompanyData) {
            UpdatedData = {
              document: base64String,
              userType: 'company',
              id: latestData?.company_id,
            };
          } else {
            UpdatedData = {
              document: base64String,
              userType: 'user',
              id: getUserID,
            };
          }
          await dispatch(uploalImageonAzure(UpdatedData)).then(
            (payload: any) => {
              if (payload?.payload) {
                if (UpdatedData?.userType === 'user') {
                  dispatch(getUserByIdLogin(getUserID));
                } else if (UpdatedData?.userType === 'company') {
                  dispatch(getCompanyByUserId({user_id: getUserID}));
                }
              }
            },
          );
        })
        .catch((error: any) => {
          message.error('Error converting file to base64', error);
        });
    }
  };

  const handleNotification = (list: any) => {
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

  const debounceFn = useCallback(_debounce(handleNotification, 500), []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyProfileCardStyle
        justify="space-between"
        align="middle"
        style={{width: '100%'}}
        gutter={[0, 16]}
      >
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={isCompanyData ? 12 : 7}
          xxl={isCompanyData ? 12 : 7}
        >
          <Space size={20}>
            <span style={{position: 'relative'}}>
              <AvatarStyled
                cursor="unset"
                src={data?.profile_image || data?.company_logo}
                icon={`${
                  data?.user_name?.toString()?.charAt(0)?.toUpperCase() ??
                  data?.user_name?.toString()?.charAt(0)?.toUpperCase() ??
                  data?.company_name?.toString()?.charAt(0)?.toUpperCase()
                }`}
                background={
                  data?.profile_image || data?.company_logo ? '' : '#1EB159'
                }
                size={94}
              />
              {(loginAccount || isCompanyData) && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -5,
                  }}
                >
                  <ImgCrop
                    onModalOk={(list: any) => {
                      debounceFn(list);
                    }}
                  >
                    <CustomUpload showUploadList={false}>
                      <AvatarStyled
                        icon={
                          <CameraIcon
                            width={20}
                            color={token?.colorLinkHover}
                          />
                        }
                        background={token?.colorInfoHover}
                        size={36}
                      />
                    </CustomUpload>
                  </ImgCrop>
                </span>
              )}
            </span>
            <Space direction="vertical" size={5}>
              <Typography
                name="Heading 3/Medium"
                color={token?.colorPrimaryText}
              >
                {isCompanyData
                  ? data?.company_name
                  : data?.first_name && data?.last_name
                    ? `${data.first_name} ${data.last_name}`
                    : data?.first_name
                      ? data.first_name
                      : data?.user_name}
              </Typography>
              {!isCompanyData && (
                <>
                  <Typography name="Body 4/Bold" color={token?.colorInfo}>
                    {data?.job_title ?? ''}
                  </Typography>

                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '50px',
                      background: token?.colorInfoHover,
                    }}
                  >
                    <Typography
                      name="Body 3/Regular"
                      color={token?.colorLinkHover}
                    >
                      {userRole ?? ''}
                    </Typography>
                  </span>
                </>
              )}
            </Space>
          </Space>
        </Col>

        {!isCompanyData &&
          proileDetailData?.map((proileDetailDataItem) => (
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={5}
              xxl={5}
              key={proileDetailDataItem?.key}
            >
              <Space direction="vertical" size={4}>
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                >
                  {proileDetailDataItem?.title}
                </Typography>
                <Space align="center">
                  <AvatarStyled
                    icon={proileDetailDataItem?.icon}
                    background={token?.colorInfoHover}
                    size={36}
                  />

                  <Typography
                    key={proileDetailDataItem?.key}
                    name="Body 4/Medium"
                    color={token?.colorPrimaryText}
                    ellipsis
                    maxWidth={190}
                    as="div"
                    tooltip
                  >
                    {proileDetailDataItem?.data}
                  </Typography>
                </Space>
              </Space>
            </Col>
          ))}
      </MyProfileCardStyle>
    </Suspense>
  );
};

export default MyProfileCard;
