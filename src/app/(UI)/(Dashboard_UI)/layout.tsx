'use client';

import {Layout} from 'antd';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import CustomHeader from './layouts/Header';
import SideBar from './layouts/SideBar';

const {Content, Sider, Header} = Layout;
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [token] = useThemeToken();
  return (
    <Layout>
      {/* <Header> */}
      <CustomHeader />
      {/* </Header> */}
      <Layout>
        <Sider>
          <SideBar />
        </Sider>
        <Layout>
          <Content style={{background: token?.colorBgLayout}}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
