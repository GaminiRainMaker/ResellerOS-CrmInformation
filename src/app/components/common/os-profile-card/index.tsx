/* eslint-disable @typescript-eslint/indent */

'use client';

import { Avatar } from '@/app/components/common/antd/Avatar';
import { Divider } from '@/app/components/common/antd/Divider';
import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import { OsContactCard } from '@/app/components/common/os-card/OsContactCard';
import OsModal from '@/app/components/common/os-modal';
import { AvatarStyled } from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {
  BriefcaseIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { Badge } from 'antd';
import { FC, useState } from 'react';
import { OSProfileInterface } from './os-profile.interface';
import { DetailCardStyle } from './styled-components';

const ProfileCard: FC<OSProfileInterface> = ({
  contactCardData,
  headerButtons,
  customerData,
  myProfile = false,
  headerIcons,
}) => {
  const [token] = useThemeToken();
  const [showAllContactModal, setShowAllContactModal] =
    useState<boolean>(false);

  console.log('contactCardData', contactCardData);

  return (
    <>
      <DetailCardStyle>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            paddingBottom: '45px',
          }}
        >
          <Space direction="vertical" align="center" size={16}>
            <Avatar
              style={{
                backgroundColor: token?.colorInfo,
                height: '94px',
                width: '94px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography name="Heading 3/Medium" color="white">
                IT
              </Typography>
            </Avatar>
            <Typography name="Heading 3/Medium" style={{textAlign: 'center'}}>
              {(customerData?.user_name || customerData?.name) ?? '--'}
              <Typography
                name="Body 4/Bold"
                style={{textAlign: 'center'}}
                as="div"
                color={token?.colorInfo}
              >
                ID {customerData?.id ?? '--'}
              </Typography>
            </Typography>
          </Space>

          <Space size={15} style={{paddingTop: '35px'}}>
            {headerIcons &&
              headerIcons?.map((item: any) => (
                <AvatarStyled
                  key={item?.key}
                  background={item?.iconBg}
                  icon={item?.icon}
                  onClick={item?.onClick}
                />
              ))}
            {headerButtons && headerButtons}
          </Space>

          <Divider
            style={{
              border: '1px solid #C7CDD5',
              margin: '40px 0px',
              width: '100%',
            }}
          />
          {myProfile ? (
            <Row gutter={[16, 16]} style={{width: '100%'}}>
              <Col span={24}>
                <Space size={12}>
                  <AvatarStyled
                    size={30}
                    background={token?.colorInfoHover}
                    icon={
                      <EnvelopeIcon
                        width={16}
                        height={16}
                        color={token?.colorLinkHover}
                      />
                    }
                  />
                  <Typography name="Body 3/Regular">
                    {customerData?.email ?? '--'}
                  </Typography>
                </Space>
              </Col>
              <Col span={24}>
                <Space size={12}>
                  <AvatarStyled
                    size={30}
                    background={token?.colorInfoHover}
                    icon={
                      <PhoneIcon
                        width={16}
                        height={16}
                        color={token?.colorLinkHover}
                      />
                    }
                  />
                  <Typography name="Body 3/Regular">
                    {customerData?.phone_number ?? '--'}
                  </Typography>
                </Space>
              </Col>
              <Col span={24}>
                <Space size={12}>
                  <AvatarStyled
                    size={30}
                    background={token?.colorInfoHover}
                    icon={
                      <BriefcaseIcon
                        width={16}
                        height={16}
                        color={token?.colorLinkHover}
                      />
                    }
                  />
                  <Typography name="Body 3/Regular">
                    {customerData?.job_title ?? '--'}
                  </Typography>
                </Space>
              </Col>
            </Row>
          ) : (
            <Row gutter={[16, 16]} style={{width: '100%'}}>
              {/* <Col span={12}>
                <Space direction="vertical">
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorLinkHover}
                  >
                    ID
                  </Typography>
                  <Typography name="Body 3/Regular">
                    {customerData?.id ?? '--'}
                  </Typography>
                </Space>
              </Col> */}
              <Col span={12}>
                <Space direction="vertical">
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorLinkHover}
                  >
                    Default Currency
                  </Typography>
                  <Typography name="Body 3/Regular">
                    {customerData?.currency ?? '--'}
                  </Typography>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorLinkHover}
                  >
                    Legal name
                  </Typography>
                  <Typography name="Body 3/Regular">
                    {customerData?.name ?? '--'}
                  </Typography>
                </Space>
              </Col>
            </Row>
          )}
          <Divider
            style={{
              border: '1px solid #C7CDD5',
              margin: '40px 0px',
              width: '100%',
            }}
          />

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction="vertical">
                <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
                  Shipping Address
                </Typography>
                <Typography name="Body 3/Regular">
                  {customerData.shiping_address_line}
                  {customerData.shiping_city &&
                    `, ${customerData.shiping_city}`}
                  {customerData.shiping_state &&
                    `, ${customerData.shiping_state}`}
                  {customerData.shiping_pin_code &&
                    `, ${customerData.shiping_pin_code}`}
                  {customerData.shiping_country &&
                    `, ${customerData.shiping_country}`}
                </Typography>
              </Space>
            </Col>
            <Col span={24}>
              <Space direction="vertical">
                <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
                  Billing Address
                </Typography>
                <Typography name="Body 3/Regular">
                  {customerData.billing_address_line}
                  {customerData.billing_city &&
                    `, ${customerData.billing_city}`}
                  {customerData.billing_state &&
                    `, ${customerData.billing_state}`}
                  {customerData.billing_pin_code &&
                    `, ${customerData.billing_pin_code}`}
                  {customerData.billing_country &&
                    `, ${customerData.billing_country}`}
                </Typography>
              </Space>
            </Col>

            {contactCardData && (
              <Col span={24}>
                <Space direction="vertical" style={{width: '100%'}}>
                  <Space
                    align="center"
                    style={{display: 'flex', justifyContent: 'space-between'}}
                  >
                    <Typography
                      name="Body 4/Medium"
                      color={token?.colorLinkHover}
                    >
                      Contacts{' '}
                    </Typography>

                    <Badge
                      count={
                        customerData?.BillingContacts?.length > 1
                          ? // eslint-disable-next-line no-unsafe-optional-chaining
                            customerData?.BillingContacts?.length - 1
                          : ''
                      }
                      style={{backgroundColor: '#1EB159'}}
                    >
                      <Typography
                        name="Body 4/Bold"
                        onClick={() => setShowAllContactModal((p) => !p)}
                        color={token?.colorLink}
                        cursor="pointer"
                      >
                        View all{' '}
                      </Typography>
                    </Badge>
                  </Space>
                  <OsContactCard data={contactCardData} />
                </Space>
              </Col>
            )}
          </Row>
        </div>
      </DetailCardStyle>

      <OsModal
        width={1115}
        open={showAllContactModal}
        onCancel={() => {
          setShowAllContactModal((p) => !p);
        }}
        bodyPadding={40}
        title="All Contacts"
        body={<OsContactCard data={customerData?.BillingContacts} />}
      />
    </>
  );
};

export default ProfileCard;
