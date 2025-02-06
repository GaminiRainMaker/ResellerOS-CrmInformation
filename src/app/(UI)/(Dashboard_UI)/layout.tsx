'use client';

import {Layout} from 'antd';
import React from 'react';
import {usePathname} from 'next/navigation';
import CustomHeader from './layouts/Header';
import SideBar from './layouts/SideBar';
import {useAppSelector} from '../../../../redux/hook';
import TrialBanner from '@/app/components/common/trialBanner/TrialBanner';

const {Content} = Layout;
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const {isCanvas} = useAppSelector((state) => state.canvas);

  return (
    <>
      <Layout style={{minHeight: '90vh'}}>
        {!isCanvas && <CustomHeader />}
        <Layout>
          {!isCanvas && <SideBar />}
          <Content
            style={{
              padding: pathname === '/formBuilder' ? '0px' : '12px',
              background: '#f5f5f5',
            }}
          >
            {!isCanvas && <TrialBanner />}
            <br />

            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
