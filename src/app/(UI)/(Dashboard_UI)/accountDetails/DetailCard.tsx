'use client';

import {Avatar} from '@/app/components/common/antd/Avatar';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Divider} from '@/app/components/common/antd/Divider';
import {OsContactCard} from '@/app/components/common/os-card/OsContactCard';
import OsModal from '@/app/components/common/os-modal';
import {useState} from 'react';
import {DetailCardStyle} from './styled-components';

const contactCardData = [
  {
    name: 'Billie',
    last_name: 'John',
    role: 'Sr. Project Manager',
    email: 'billiejohn@info.com',
    iconBg: '#1EB159',
  },
];

const contactCardData2 = [
  {
    key: 1,
    name: 'Billie',
    last_name: 'John',
    role: 'Sr. Project Manager',
    email: 'billiejohn@info.com',
    iconBg: '#1EB159',
  },
  {
    key: 2,
    name: 'Steve',
    last_name: 'Smith',
    role: 'Content Writer',
    email: 'stevesmith@info.com',
    iconBg: '#2364AA',
  },
  {
    key: 3,
    name: 'Kim',
    last_name: 'Blake',
    role: 'Graphic Designer',
    email: 'kimblake@info.com',
    iconBg: '#EB445A',
  },
  {
    key: 4,
    name: 'Marie',
    last_name: 'Watson',
    role: 'Developer',
    email: 'mariewatson@info.com',
    iconBg: '#ECB816',
  },
  {
    key: 5,
    name: 'Bryan',
    last_name: 'Roller',
    role: 'Sr. Developer',
    email: 'bryanroller@info.com',
    iconBg: '#457B9D',
  },
];

const DetailCard = () => {
  const [token] = useThemeToken();
  const [showAllContactModal, setShowAllContactModal] =
    useState<boolean>(false);

  const data = [
    {
      key: 1,
      icon: <PencilSquareIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,

      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
  ];

  return (
    <>
      <DetailCardStyle>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
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
            <Typography name="Heading 3/Medium">
              Impres Technologies
              <Typography
                name="Body 4/Bold"
                style={{textAlign: 'center'}}
                as="div"
                color={token?.colorInfo}
              >
                ID 59afd544
              </Typography>
            </Typography>
          </Space>

          <Space size={15} style={{paddingTop: '25px'}}>
            {data?.map((item: any) => (
              <AvatarStyled
                key={item?.key}
                background={item?.iconBg}
                icon={item?.icon}
              />
            ))}
          </Space>

          <Divider style={{border: '1px solid #C7CDD5', width: '100%'}} />

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Space direction="vertical">
                <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
                  ID
                </Typography>
                <Typography name="Body 3/Regular">59afd544</Typography>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical">
                <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
                  Default Currency
                </Typography>
                <Typography name="Body 3/Regular">USD</Typography>
              </Space>
            </Col>
            <Col span={12}>
              <Space direction="vertical">
                <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
                  Legal name
                </Typography>
                <Typography name="Body 3/Regular">
                  Impres Technologies
                </Typography>
              </Space>
            </Col>
          </Row>
          <Divider style={{border: '1px solid #C7CDD5', width: '100%'}} />

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction="vertical">
                <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
                  Shipping Address
                </Typography>
                <Typography name="Body 3/Regular">
                  19 Washington Square N, New York, NY 10011, USA
                </Typography>
              </Space>
            </Col>
            <Col span={24}>
              <Space direction="vertical">
                <Typography name="Body 4/Medium" color={token?.colorLinkHover}>
                  Billing Address
                </Typography>
                <Typography name="Body 3/Regular">
                  19 Washington Square N, New York, NY 10011, USA
                </Typography>
              </Space>
            </Col>

            <Col span={24}>
              <Space direction="vertical">
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
                  <Typography
                    name="Body 4/Bold"
                    color={token?.colorLink}
                    onClick={() => setShowAllContactModal((p) => !p)}
                    style={{cursor: 'pointer'}}
                  >
                    View all{' '}
                  </Typography>
                </Space>
                <OsContactCard data={contactCardData} />
              </Space>
            </Col>
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
        body={<OsContactCard data={contactCardData2} />}
      />
    </>
  );
};

export default DetailCard;
