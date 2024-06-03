'use client';

import {Content} from 'antd/es/layout/layout';
import Image from 'next/image';
import {FC} from 'react';
import loginAvatar from '../../../../../public/assets/static/AvatarFullImg.svg';
import {Col, Row} from '../../common/antd/Grid';
import {Space} from '../../common/antd/Space';
import useThemeToken from '../../common/hooks/useThemeToken';
import Typography from '../../common/typography';
import ContentSection from './ContentSection';
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
  buttonText,
  form,
  onClick,
  inputFields,
}) => {
  const [token] = useThemeToken();
  return (
    <Row justify="center" style={{height: '100%'}} gutter={[16, 16]}>
      <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100%',
            background: token?.colorBgLayout,
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
            buttonText={buttonText}
            form={form}
            onClick={onClick}
            inputFields={inputFields}
          />
        </Content>
      </Col>
      <Col
        xxl={12}
        xl={12}
        lg={24}
        md={0}
        sm={0}
        xs={0}
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: token?.colorPrimary,
            borderTopLeftRadius: '50px',
            borderBottomLeftRadius: '50px',
            height: '100vh',
          }}
        >
          <div
            style={{
              height: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <Space
              direction="vertical"
              size={32}
              style={{padding: '50px', paddingLeft: '80px'}}
            >
              <Typography
                name="Display 2/Extra Bold"
                color={token?.colorBgLayout}
              >
                A Next Generation Revenue
                <Typography
                  name="Display 2/Extra Bold"
                  color={token?.colorInfoActive}
                >
                  {' '}
                  Operating System for
                </Typography>{' '}
                IT Value Added
                <Typography
                  name="Display 2/Extra Bold"
                  color={token?.colorInfoActive}
                >
                  {' '}
                  Resellers
                </Typography>
              </Typography>
              <div style={{width: '610px'}}>
                <Typography name="Body 2/Regular" color={token?.colorBgLayout}>
                  ResellerOS enables technology resellers to sell and service
                  customers faster than ever before, while protecting deals and
                  capturing more vendor incentives.
                </Typography>
              </div>
            </Space>
          </div>
          <div style={{height: '50vh'}}>
            <div
              style={{
                position: 'relative',
                height: '100%',
              }}
            >
              <Image
                src={loginAvatar}
                alt="loginAvatar"
                style={{
                  position: 'absolute',
                  bottom: '0px',
                  left: '-20%',
                  height: '100%',
                  width: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AuthLayout;
