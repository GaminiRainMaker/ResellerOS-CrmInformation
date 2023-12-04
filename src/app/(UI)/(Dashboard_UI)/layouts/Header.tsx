'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import SearchInput from '@/app/components/common/os-input/SearchInput';
import Image from 'next/image';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {MenuProps} from 'antd/es/menu';
import Typography from '@/app/components/common/typography';
import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Space} from '@/app/components/common/antd/Space';
import SearchImg from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/search-normal-1.svg';
import HeaderLogo from '../../../../../public/assets/static/headerLogo.svg';
import HeadphoneImg from '../../../../../public/assets/static/headphoneIcon.svg';
import NotificationImg from '../../../../../public/assets/static/notificationIcon.svg';
import DownArrow from '../../../../../public/assets/static/iconsax-svg/Svg/All/bold/arrow-down.svg';
import UserIcon from '../../../../../public/assets/static/userIcon.svg';

const Header = () => {
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
    <Row
      justify="space-between"
      style={{
        padding: '24px',
        borderBottom: `1px solid  ${token?.colorBorder}`,
      }}
      align="middle"
      gutter={[0, 8]}
    >
      <Col md={24} lg={12} xxl={12}>
        <Row justify="space-between" gutter={[0, 8]}>
          <Col>
            <Image src={HeaderLogo} alt="HeaderLogo" />
          </Col>
          <Col>
            <SearchInput
              style={{width: '550px'}}
              placeholder="Search"
              allowClear
              prefix={<Image src={SearchImg} alt="SearchImg" />}
            />
          </Col>
        </Row>
      </Col>

      <Col>
        <Space
          direction="horizontal"
          size={24}
          style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}
        >
          <Image
            src={HeadphoneImg}
            alt="HeadphoneImg"
            style={{cursor: 'pointer'}}
          />
          <Image
            src={NotificationImg}
            alt="NotificationImg"
            style={{cursor: 'pointer'}}
          />
          <Dropdown menu={{items}}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Image src={UserIcon} alt="UserIcon" />
                <Typography name="Body 3/Regular">Josh Walker</Typography>
                <Image src={DownArrow} alt="DownArrow" />
              </Space>
            </a>
          </Dropdown>
        </Space>
      </Col>
    </Row>
  );
};

export default Header;
