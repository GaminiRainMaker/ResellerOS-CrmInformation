'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import SearchInput from '@/app/components/common/os-input/SearchInput';
import Image from 'next/image';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {MenuProps} from 'antd/es/menu';
import Typography from '@/app/components/common/typography';
import {Layout} from 'antd';
import SearchImg from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/search-normal-1.svg';
import HeaderLogo from '../../../../../public/assets/static/headerLogo.svg';
import HeadphoneImg from '../../../../../public/assets/static/headphoneIcon.svg';
import NotificationImg from '../../../../../public/assets/static/notificationIcon.svg';
import DownArrow from '../../../../../public/assets/static/iconsax-svg/Svg/All/bold/arrow-down.svg';
import UserIcon from '../../../../../public/assets/static/userIcon.svg';

const CustomHeader = () => {
  const [token] = useThemeToken();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography name="Body 3/Regular" cursor="pointer">
          View Profile
        </Typography>
      ),
    },
    {
      key: '2',
      label: (
        <Typography name="Body 3/Regular" cursor="pointer">
          Sign Out
        </Typography>
      ),
    },
  ];

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

            <SearchInput
              style={{width: '550px'}}
              placeholder="Search"
              allowClear
              prefix={<Image src={SearchImg} alt="SearchImg" />}
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
            <Image src={HeadphoneImg} alt="HeadphoneImg" />
            <Image src={NotificationImg} alt="NotificationImg" />
            <Dropdown menu={{items}}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Image
                    src={UserIcon}
                    alt="UserIcon"
                    style={{cursor: 'pointer'}}
                  />
                  <Typography name="Body 3/Regular">Josh Walker</Typography>
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
