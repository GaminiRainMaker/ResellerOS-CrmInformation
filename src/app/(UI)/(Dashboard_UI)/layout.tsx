'use client';

import {Layout} from 'antd';
import React from 'react';
import {usePathname} from 'next/navigation';
import CustomHeader from './layouts/Header';
import SideBar from './layouts/SideBar';

const {Content} = Layout;
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <Layout style={{minHeight: '90vh'}}>
        <CustomHeader />
        <Layout>
          <SideBar />
          <Content
            style={{padding: pathname === '/formBuilder' ? '0px' : '24px'}}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
