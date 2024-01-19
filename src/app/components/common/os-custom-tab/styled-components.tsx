import styled from '@emotion/styled';
import {GlobalToken} from 'antd/es/theme/interface';
import {Col} from '../antd/Grid';
import {Tabs} from '../antd/Tabs';

export const DealRegCustomTabHeaderStyle = styled(Col)<{
  token: GlobalToken;
}>`
  display: flex;
  width: 228px;
  // height: 78px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 24px;
`;

export const CustmDealRegTab = styled(Tabs)<{
  token: GlobalToken;
}>`
  &.ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin: 0px;
    padding: 0px;
  }
  &.ant-tabs .ant-tabs-tab {
    padding: 0px;
  }
  &.ant-tabs-top > .ant-tabs-nav::before {
    border-bottom: none !important;
  }
  &.ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar {
    display: none;
  }
`;

export const CustomTabStyle = styled.div<{token: GlobalToken}>`
  display: flex;
  min-width: 292px;
  max-width: 292px;
  padding: 36px 24px;
  background: ${({token}) => token.colorBgContainer};
  border-radius: 12px;
`;
