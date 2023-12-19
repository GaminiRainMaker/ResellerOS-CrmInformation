'use client';

import {Layout} from 'antd';
import CustomHeader from './layouts/Header';
import SideBar from './layouts/SideBar';

const {Content, Sider} = Layout;

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        {/* <Header> */}
        <CustomHeader />
        {/* </Header> */}
        <Layout>
          <Sider>
            <SideBar />
          </Sider>
          <Layout>
            <Content style={{background: '#F5F5F5'}}>{children}</Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
