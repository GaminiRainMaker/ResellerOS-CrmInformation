/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import ProfileCard from '@/app/components/common/os-profile-card';
import DetailAnalyticCard from '@/app/components/common/os-table/DetailAnalyticCard';
import Typography from '@/app/components/common/typography';
import {
  CheckCircleIcon,
  PencilSquareIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {CollapseSpaceStyle} from '../../dealRegDetail/DealRegDetailForm/styled-components';

const MyProfile = () => {
  const [token] = useThemeToken();

  const analyticsData = [
    {
      key: 1,
      primary: <div>{30}</div>,
      secondry: 'Completed DealReg',
      icon: <CheckCircleIcon width={36} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 2,
      primary: <div>{125}</div>,
      secondry: 'Completed Quotes',
      icon: <TagIcon width={36} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 3,
      primary: <div>{45}</div>,
      secondry: 'Completed Orders',
      icon: <CheckCircleIcon width={36} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
  ];

  const customerUpdatedData = {
    id: 1,
    name: 'gamini',
    currency: 'Dollar',
    shiping_address_line: '32-A',
    shiping_city: 'B2 Sebiz',
    shiping_state: 'California',
    shiping_pin_code: '4241421',
    shiping_country: 'California',
    billing_address_line: '32-A',
    billing_city: 'B2 Sebiz',
    billing_state: 'California',
    billing_pin_code: '4241421',
    billing_country: 'California',
    BillingContacts: '',
  };

  const headerButtons = (
    <OsButton
      text="Edit"
      buttontype="PRIMARY"
      icon={<PencilSquareIcon width={24} />}
    />
  );

  const ResponseDetailItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Change Password</Typography>,
      children: (
        <Form layout="vertical">
          <Row>
            <Col sm={24}>
              <Form.Item
                label={
                  <Typography name="Body 4/Medium">Old Password</Typography>
                }
                name="customer_id"
              >
                <OsInput placeholder="Write text here!" />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                label={
                  <Typography name="Body 4/Medium">New Password</Typography>
                }
                name="contact_id"
              >
                <OsInput placeholder="Write text here!" />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                label={
                  <Typography name="Body 4/Medium">Confirm Password</Typography>
                }
                name="industry_id"
              >
                <OsInput placeholder="Write text here!" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return (
    <Row justify="space-between" style={{width: '100%'}} gutter={[16, 16]}>
      <Col>
        <ProfileCard
          headerButtons={headerButtons}
          customerData={customerUpdatedData}
          myProfile
        />
      </Col>
      <Col span={17}>
        <Space
          direction="vertical"
          size={24}
          style={{width: '100%'}}
        >
          <Row gutter={[16, 16]} justify="center">
            {analyticsData?.map((item: any) => (
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
                <DetailAnalyticCard
                  primaryText={item?.primary}
                  secondaryText={item?.secondry}
                  fallbackIcon={item?.icon}
                  iconBg={item?.iconBg}
                />
              </Col>
            ))}
          </Row>
          <Row justify="center">
            <CollapseSpaceStyle size={24} direction="vertical">
              <OsCollapseAdmin items={ResponseDetailItem} />
            </CollapseSpaceStyle>
          </Row>
        </Space>
      </Col>
    </Row>
  );
};
export default MyProfile;
