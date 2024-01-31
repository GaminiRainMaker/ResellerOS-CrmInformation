'use client';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import SearchInput from '@/app/components/common/os-input/SearchInput';
import {AvatarStyled} from '@/app/components/common/os-table/styled-components';
import Typography from '@/app/components/common/typography';
import {BellIcon, WrenchScrewdriverIcon} from '@heroicons/react/24/outline';
import {Layout} from 'antd';
import {MenuProps} from 'antd/es/menu';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import HeaderLogo from '../../../../../public/assets/static/headerLogo.svg';
import DownArrow from '../../../../../public/assets/static/iconsax-svg/Svg/All/bold/arrow-down.svg';
import SearchImg from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/search-normal-1.svg';
import UserIcon from '../../../../../public/assets/static/userIcon.svg';

const CustomHeader = () => {
  const [token] = useThemeToken();
  const router = useRouter();
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
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() => {
            Cookies.remove('token');
            Cookies.remove('id');
            router.push('/login');
          }}
        >
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
            <AvatarStyled
              background={token?.colorInfoBg}
              icon={
                <WrenchScrewdriverIcon
                  width={24}
                  color={token?.colorInfoBorder}
                />
              }
            />
            <AvatarStyled
              background={token?.colorInfoBg}
              icon={<BellIcon width={24} color={token?.colorInfoBorder} />}
            />
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
