/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import {Tabs} from '../antd/Tabs';

export const TabsStyled = styled(Tabs)`

width: 100%;
margin-top:20px;
.ant-tabs-ink-bar {
  border-bottom: 2px solid #1c3557 !important;
}
.ant-tabs-top > .ant-tabs-nav {
  margin: 9px 0 22px 0;
}
.ant-tabs-nav {
  border-bottom: none;
  padding-bottom: 22px;
  .ant-tabs-extra-content{
    margin-top: -31px;
  }
`;
