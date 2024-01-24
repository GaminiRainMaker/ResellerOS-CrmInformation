'use client';

import {Layout} from 'antd';
import React from 'react';
import CustomHeader from './layouts/Header';
import SideBar from './layouts/SideBar';

const {Content} = Layout;
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout style={{minHeight: '95vh'}}>
        <CustomHeader />
        <Layout>
          <SideBar />
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
}
