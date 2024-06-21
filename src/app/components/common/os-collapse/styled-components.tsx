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
    background-color: #457B9D; 
    color: white !important;
  }
  .ant-collapse-item-active {
    .ant-collapse-header {
        background-color: #1C3557;
        color: white;
  }
  .ant-collapse-content-box {
    padding: 0px ;
  }
.ant-collapse-content-box{
  padding: 0px !important;
}
`;
export const OsCollapseStyleForAdmin = styled(Collapse)`
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0px;
  }
  &.ant-collapse .ant-collapse-content > .ant-collapse-content-box {
    padding: 16px 0px;
  }
  &.ant-collapse .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px;
  }
  .ant-collapse-item-active {
    .ant-collapse-header-text {
      padding-bottom: 22px;
    }
  }
`;
