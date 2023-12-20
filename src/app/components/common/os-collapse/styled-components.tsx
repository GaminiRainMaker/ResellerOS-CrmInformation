import styled from '@emotion/styled';
import {Collapse} from '../antd/Collapse';

export const OsCollapseStyle = styled(Collapse)`
  &.ant-collapse > .ant-collapse-item {
    margin-bottom: 16px;
    .ant-collapse-header {
      padding: 12px;
    }
  }
  .ant-collapse-header {
      background-color: #F0F4F7;
  }
  .ant-collapse-item-active {
    .ant-collapse-header {
        background-color: #457B9D; 
        color: white;
  }
  .ant-collapse-content-box {
    padding: 0px ;
  }
`;
