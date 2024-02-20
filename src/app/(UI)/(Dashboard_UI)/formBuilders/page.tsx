/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

'use client';

import {Layout} from 'antd';
import React, {useState} from 'react';
import FieldCard from './FieldCard';


const {Sider, Content} = Layout;

const FormBuilder = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const contentStyle: React.CSSProperties = {
    margin: '24px 24px 24px 0px',
    backgroundColor: '#0958d9',
  };

  const layoutStyle = {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  };

  const siderStyle: React.CSSProperties = {
    padding: '12px',
    margin: '24px',
    borderRadius: 12,
  };

  return (
    <Layout style={layoutStyle}>
      <Sider width="300px" theme="light" style={siderStyle}>
        <FieldCard />
      </Sider>

      <Layout>
        <Content style={contentStyle}>
          <p
            onClick={() => {
              setCollapsed((p) => !p);
            }}
          >
            Button
          </p>
          Content
        </Content>
      </Layout>

      {collapsed && (
        <div
          style={{
            background: 'red',
            width: '20%',
          }}
        >
          dsfafd
        </div>
      )}
    </Layout>
  );
};

export default FormBuilder;
