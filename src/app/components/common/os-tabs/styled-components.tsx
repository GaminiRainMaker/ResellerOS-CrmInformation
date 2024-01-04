/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import {Tabs} from '../antd/Tabs';

export const TabsStyled = styled(Tabs)`
  width: 100%;
  margin-top: 24px;
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
    // background-color: white;
    height: 30px;
    border-bottom: none !important;
  }
  .ant-tabs-top > .ant-tabs-nav {
    margin: 9px 0 22px 0;
    // border-bottom: none !important;
  }
  .ant-tabs-nav {
    border-bottom: none;
    .ant-tabs-extra-content {
      margin-top: -31px;
    }
  }
`;
