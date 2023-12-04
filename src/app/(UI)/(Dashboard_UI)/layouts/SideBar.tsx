'use client';

import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {Menu, MenuProps} from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, {useState} from 'react';
import {CustomSider} from './styled-components';

const SideBar = () => {
  const [token] = useThemeToken();

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
        }}
        name="Button 1"
        color={token?.colorLink}
      >
        <div> Dashboard</div>
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
        Quote AI
      </Typography>,

      'Quote AI',
      '',
      [
        getItem(
          <Typography
            onClick={() => {
              setSelectedKey(2);
            }}
            name="Button 1"
            color={token?.colorTextSecondary}
          >
            Generate Quote
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
            Quotes
          </Typography>,
          '3',
        ),
      ],
    ),
    getItem(
      <Typography
        onClick={() => {
          setSelectedKey(4);
        }}
        name="Button 1"
        color={token?.colorTextSecondary}
      >
        DealReg AI
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
        Order AI
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
        Vendors
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
        Renewals and Upgrades
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
        CRM information
      </Typography>,
      '8',
    ),
  ];
  return (
    <div>
      <CustomSider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          style={{
            // height: '100%',
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
  );
};

export default SideBar;
