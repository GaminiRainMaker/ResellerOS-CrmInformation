'use client';

import {Content} from 'antd/es/layout/layout';
import {FC} from 'react';
import Image from 'next/image';
import {Col, Row} from '../../common/antd/Grid';
import ContentSection from './ContentSection';
import authBg from '../../../../../public/assets/static/authBg.svg';
import {AuthLayoutInterface} from './authLayout.interface';

const AuthLayout: FC<AuthLayoutInterface> = ({
  heading,
  description,
  email,
  password,
  username,
  alreadyAmember,
  registerNow,
  rememberPassword,
}) => {
  console.log('fsfd');
  return (
    <Row justify="center" style={{height: '100%'}}>
      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100%',
          }}
        >
          <ContentSection
            heading={heading}
            description={description}
            email={email}
            password={password}
            username={username}
            alreadyAmember={alreadyAmember}
            registerNow={registerNow}
            rememberPassword={rememberPassword}
          />
          {/* <Outlet /> */}
        </Content>
      </Col>
      <Col xxl={12} xl={12} lg={12} md={0} sm={0} xs={0}>
        <Image src={authBg} alt="authBg" />
      </Col>
    </Row>
  );
};

export default AuthLayout;
