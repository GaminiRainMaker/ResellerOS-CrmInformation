'use client';

import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {Menu, MenuProps, Space, Layout} from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, {useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {CustomSider} from './styled-components';
import Category from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/category-2.svg';
import Coin from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/coin.svg';
import recipt from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/receipt-1.svg';
import Bag from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/bag-2.svg';
import People from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/people.svg';
import FlahCircle from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/flash-circle-1.svg';
import ReciptItem from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/receipt-item.svg';
import Eclipse18 from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/add-circle.svg';

const SideBar = () => {
  const [token] = useThemeToken();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [seleectedKey, setSelectedKey] = useState<number>();
  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(1);
          router?.push('/dashboard');
        }}
        name="Button 1"
        // color={token?.colorLink}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Image
            style={{paddingTop: '0px', marginRight: '3px'}}
            src={Category}
            alt="eyeIcon"
          />
          <div
            style={{
              marginTop: '1px',
              color:
                seleectedKey === 1
                  ? token?.colorLink
                  : token?.colorTextSecondary,
            }}
          >
            {' '}
            Dashboard
          </div>
        </div>
      </Typography>,
      '1',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(2);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Image
            style={{paddingTop: '0px', marginRight: '3px'}}
            src={Coin}
            alt="eyeIcon"
          />
          <div style={{marginTop: '1px'}}> Quote AI</div>
        </div>
      </Typography>,

      'Quote AI',
      '',
      [
        getItem(
          <Typography
            style={{padding: '16px 24px'}}
            onClick={() => {
              setSelectedKey(2);
              router?.push('/QuoteAI');
            }}
            name="Button 1"
            color={token?.colorTextSecondary}
          >
            <div
              style={{
                display: 'flex',
                padding: '16px 24px',
                alignItems: 'flexStart',

                gap: '16px',
                alignSelf: 'stretch',
              }}
            >
              <Image
                style={{paddingTop: '0px', marginRight: '3px'}}
                src={Eclipse18}
                alt="Eclipse18"
              />
              <div style={{marginTop: '1px'}}> Generate Quote</div>
            </div>
          </Typography>,
          '2',
        ),
        getItem(
          <Typography
            onClick={() => {
              setSelectedKey(3);
            }}
            name="Button 1"
            color={token?.colorTextSecondary}
          >
            <div
              style={{
                display: 'flex',
                padding: '16px 24px',
                alignItems: 'flexStart',

                gap: '16px',
                alignSelf: 'stretch',
              }}
            >
              <Image
                style={{paddingTop: '0px', marginRight: '3px'}}
                src={Eclipse18}
                alt="Eclipse18"
              />
              <div style={{marginTop: '1px'}}> Quotes</div>
            </div>
          </Typography>,
          '3',
        ),
      ],
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(4);
          router?.push('/DealReg');
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Image
            style={{paddingTop: '0px', marginRight: '3px'}}
            src={recipt}
            alt="recipt"
          />
          <div style={{marginTop: '1px'}}> DealReg AI</div>
        </div>
      </Typography>,
      '4',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(5);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Image
            style={{paddingTop: '0px', marginRight: '3px'}}
            src={Bag}
            alt="eyeIcon"
          />
          <div style={{marginTop: '1px'}}> Order AI</div>
        </div>
      </Typography>,
      '5',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(6);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Image
            style={{paddingTop: '0px', marginRight: '3px'}}
            src={People}
            alt="People"
          />
          <div style={{marginTop: '1px'}}> Vendors</div>
        </div>
      </Typography>,
      '6',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(7);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Image
            style={{paddingTop: '0px', marginRight: '3px'}}
            src={FlahCircle}
            alt="FlahCircle"
          />
          <div style={{marginTop: '1px'}}> Renewals and Upgrades</div>
        </div>
      </Typography>,
      '7',
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(8);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        <div
          style={{
            display: 'flex',
            padding: '16px 24px',
            alignItems: 'flexStart',

            gap: '16px',
            alignSelf: 'stretch',
          }}
        >
          <Image
            style={{paddingTop: '0px', marginRight: '3px'}}
            src={ReciptItem}
            alt="ReciptItem"
          />
          <div style={{marginTop: '1px'}}> CRM information</div>
        </div>
      </Typography>,
      '8',
    ),
  ];
  return (
    <Layout>
      <div>
        <CustomSider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            style={{
              height: '100vh',
              width: '',
              // color:
              //   seleectedKey === 1
              //     ? 'var(--foundation-secondary-21-secondary-21500, #3DA5D9)'
              //     : '',
            }}
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
          />
        </CustomSider>
      </div>
    </Layout>
  );
};

export default SideBar;
