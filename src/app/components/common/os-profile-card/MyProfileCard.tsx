import {CustomUpload} from '@/app/(UI)/(Dashboard_UI)/layouts/Header';
import {getBase64} from '@/app/utils/upload';
import {
  BriefcaseIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import {notification} from 'antd';
import ImgCrop from 'antd-img-crop';
import _debounce from 'lodash/debounce';
import {FC, useCallback, useEffect, useState} from 'react';
import {uploadToAwsForUserImage} from '../../../../../redux/actions/upload';
import {getUserProfileData} from '../../../../../redux/actions/user';
import {useAppDispatch} from '../../../../../redux/hook';
import {Col} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import {AvatarStyled} from '../os-table/styled-components';
import Typography from '../typography';
import {MyProfileCardStyle} from './styled-components';
import {setUserProfile} from '../../../../../redux/slices/user';

const MyProfileCard: FC<any> = ({data}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
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
      title: 'Phone No.',
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
    const datas = await getBase64(newFileList);
    const mediaType = newFileList?.type.split('/')[0];

    const UpdatedData = {
      base64: datas,
      type: mediaType,
      file: newFileList,
      userTypes: 'user',
      userIds: data?.id,
    };
    dispatch(uploadToAwsForUserImage(UpdatedData)).then((d: any) => {
      if (d?.payload) {
        dispatch(getUserProfileData(''))?.then((payload: any) => {
          dispatch(setUserProfile(payload?.payload?.profile_image));
        });
      }
    });
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
    <>
      <MyProfileCardStyle
        justify="space-between"
        align="middle"
        style={{width: '100%'}}
        gutter={[0, 16]}
      >
        <Col xs={24} sm={24} md={24} lg={12} xl={7} xxl={7}>
          <Space size={20}>
            <span style={{position: 'relative'}}>
              <AvatarStyled
                src={data?.profile_image}
                icon={`${
                  data?.user_name?.toString()?.charAt(0)?.toUpperCase() ??
                  data?.user_name?.toString()?.charAt(0)?.toUpperCase()
                }`}
                background={data?.profile_image ? '' : '#1EB159'}
                size={94}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -5,
                }}
              >
                <ImgCrop
                  onModalOk={(list: any) => {
                    // debounceFn(list);
                  }}
                >
                  <CustomUpload showUploadList={false}>
                    <AvatarStyled
                      icon={
                        <CameraIcon width={20} color={token?.colorLinkHover} />
                      }
                      background={token?.colorInfoHover}
                      size={36}
                    />
                  </CustomUpload>
                </ImgCrop>
              </span>
            </span>
            <Space direction="vertical" size={5}>
              <Typography
                name="Heading 3/Medium"
                color={token?.colorPrimaryText}
              >
                {data?.first_name && data?.last_name
                  ? `${data.first_name} ${data.last_name}`
                  : data?.first_name
                    ? data.first_name
                    : data?.user_name}
              </Typography>
              <Typography name="Body 4/Bold" color={token?.colorInfo}>
                {data?.job_title ?? '--'}
              </Typography>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: '50px',
                  background: token?.colorInfoHover,
                }}
              >
                <Typography name="Body 3/Regular" color={token?.colorLinkHover}>
                  {userRole ?? '--'}
                </Typography>
              </span>
            </Space>
          </Space>
        </Col>

        {proileDetailData?.map((proileDetailDataItem) => {
          return (
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
                <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
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
          );
        })}
      </MyProfileCardStyle>
    </>
  );
};

export default MyProfileCard;
