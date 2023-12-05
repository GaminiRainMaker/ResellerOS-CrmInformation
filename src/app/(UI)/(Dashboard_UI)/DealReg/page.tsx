/* eslint-disable prettier/prettier */

'use client';

import styled from '@emotion/styled';
import {Select, Tabs} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, {useState} from 'react';
import {
  CaretDownOutlined,
  MoreOutlined,
  PlusOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import {ButtonStyled} from '@/app/components/common/os-button/styled-components';
import Typography from '@/app/components/common/typography';
import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton, {ButtonType} from '@/app/components/common/os-button';
// import {CustomDiv2} from '../layouts/styled-components';
const CustomTab = styled(Tabs)`
  .ant-tabs-ink-bar {
    border-bottom: 2px solid #1c3557 !important;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 9px 0 22px 0;
  }
  .ant-tabs-nav {
    border-bottom: none;
  }
`;
const CustomSelect = styled(Select)`
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    // eslint-disable-next-line prettier/prettier
    border: 1px solid #a3a3a3;
    width: 310px;
    height: 48px;
    border-radius: 15px;
  }
  .ant-select-selection-item {
    color: #bfbfbf;
  }
`;
const DealReg = () => {
  const [activeTab, setActiveTab] = useState<any>('1');
  const [token] = useThemeToken();

  console.log('');
  return (
    <div>
      {/* <div>
        <ButtonStyled icon={<MoreOutlined />} />
      </div> */}
      <CustomTab
        onChange={(e) => {
          setActiveTab(e);
        }}
        activeKey={activeTab}
        tabBarExtraContent={
          <Row style={{marginRight: '40px', width: '400px'}}>
            <Col>
              <Row
                style={{
                  fontWeight: '500',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#0D0D0D',
                  marginLeft: '25px',
                  marginBottom: '3px',
                }}
              >
                Select Grouping
              </Row>
              <Row>
                <Col style={{marginLeft: '170px'}}>
                  <ButtonStyled
                    icon={<MoreOutlined />}
                    style={{
                      width: '48px',
                      background: '#1c3557',
                      color: 'white',
                      height: '40px',
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        }
      >
        <TabPane
          tab={
            // eslint-disable-next-line eqeqeq
            <Typography name="Body 4/Regular"> Input Details</Typography>
          }
          key="1"
        >
          Input Details content
        </TabPane>
        <TabPane
          tab={
            // eslint-disable-next-line eqeqeq
            <Typography name="Body 4/Regular">Profitability</Typography>
          }
          key="2"
        >
          Profitability Content
        </TabPane>
        <TabPane
          tab={
            // eslint-disable-next-line eqeqeq
            <Typography name="Body 4/Regular"> Rebates</Typography>
          }
          key="3"
        >
          Rebates Content
        </TabPane>
        <TabPane
          tab={
            // eslint-disable-next-line eqeqeq

            <Typography name="Body 4/Regular"> Validation</Typography>
          }
          key="4"
        >
          Validation Content
        </TabPane>
        <TabPane
          tab={
            <Typography name="Body 4/Regular"> Matrix</Typography>
            // eslint-disable-next-line eqeqeq
          }
          key="5"
        >
          Matrix Content
        </TabPane>
      </CustomTab>
    </div>
  );
};

export default DealReg;
