import React, {FC, useEffect, useState} from 'react';
import {Col, Row} from '../antd/Grid';
import {MyProfileCardStyle} from './styled-components';
import {Space} from '../antd/Space';
import {
  BriefcaseIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import Typography from '../typography';
import useThemeToken from '../hooks/useThemeToken';
import {AvatarStyled} from '../os-table/styled-components';

const MyProfileCard: FC<any> = ({data}) => {
  const [token] = useThemeToken();
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

  return (
    <MyProfileCardStyle
      justify="space-between"
      align="middle"
      style={{width: '100%'}}
      gutter={[8, 16]}
    >
      <Col xs={24} sm={24} md={12} lg={12} xl={7}>
        <Space size={10}>
          <AvatarStyled
            src={data?.profile_image}
            icon={`${
              data?.user_name?.toString()?.charAt(0)?.toUpperCase() ??
              data?.user_name?.toString()?.charAt(0)?.toUpperCase()
            }`}
            background={data?.profile_image ? '' : '#1EB159'}
            size={94}
          />
          <Space direction="vertical" size={5}>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              {data?.user_name ?? '--'}
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
            md={12}
            lg={12}
            xl={5}
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
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                  ellipsis
                  maxWidth={20}
                >
                  {proileDetailDataItem?.data}
                </Typography>
              </Space>
            </Space>
          </Col>
        );
      })}
    </MyProfileCardStyle>
  );
};

export default MyProfileCard;
