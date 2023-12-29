'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import {OsCard} from '@/app/components/common/os-card';
import OsTable from '@/app/components/common/os-table';
import DetailAnalyticCard from '@/app/components/common/os-table/DetailAnalyticCard';
import Typography from '@/app/components/common/typography';
import {CheckCircleIcon, TagIcon} from '@heroicons/react/24/outline';
import {Space} from 'antd';
import DetailCard from './DetailCard';

const AccountDetails = () => {
  const [token] = useThemeToken();

  const analyticsData = [
    {
      key: 1,
      primary: <div>{21}</div>,
      secondry: 'Total Opportunities',
      icon: <CheckCircleIcon width={36} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 2,
      primary: <div>{0}</div>,
      secondry: 'Total Quotes',
      icon: <TagIcon width={36} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 3,
      primary: <div>{41}</div>,
      secondry: 'Completed Quotes',
      icon: <CheckCircleIcon width={36} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
  ];

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            // router?.push('/allQuote');
          }}
        >
          Accounts
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography
          name="Heading 3/Medium"
          cursor="pointer"
          color={token?.colorPrimaryText}
          onClick={() => {
            // router?.push(`/accountDetails?id=${getQuoteID}`);
          }}
        >
          Impres Technologies
        </Typography>
      ),
    },
  ];

  return (
    <>
      <OsBreadCrumb items={menuItems} />

      <Row justify="space-between" style={{width: '100%'}} gutter={[16, 16]}>
        <Col>
          <DetailCard />
        </Col>
        <Col span={18}>
          <Space direction="vertical" size={24} style={{width: '100%'}}>
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

            <Row justify="space-between">
              <Col>
                <Typography name="Heading 3/Medium">Quotes</Typography>
              </Col>
              <Col style={{float: 'right'}}>
                <OsButton
                  buttontype="PRIMARY"
                  clickHandler={() => {}}
                  text="View all"
                />
              </Col>
            </Row>

            <OsCard>
              <OsTable loading={false} />
            </OsCard>

            <Row justify="space-between">
              <Col>
                <Typography name="Heading 3/Medium">Opportunities</Typography>
              </Col>
              <Col style={{float: 'right'}}>
                <OsButton
                  buttontype="PRIMARY"
                  clickHandler={() => {}}
                  text="View all"
                />
              </Col>
            </Row>

            <OsCard>
              <OsTable loading={false} />
            </OsCard>
          </Space>
        </Col>
      </Row>
    </>
  );
};
export default AccountDetails;
