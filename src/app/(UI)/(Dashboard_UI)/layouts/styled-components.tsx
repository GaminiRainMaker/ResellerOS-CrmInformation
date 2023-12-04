import styled from '@emotion/styled';
import {GlobalToken} from 'antd/es/theme/interface';
import {Row} from 'antd';
import {Space} from '../../../components/common/Space';
import {Sider} from '../../../components/common/Sider';

export const ContentSectionWrapper = styled(Space)`
  width: 458px;
  .ant-space-item {
    display: flex;
    justify-content: center;
  }

  .ant-form-vertical .ant-form-item-label {
    padding: 0px 0px 4px 0px;
  }
`;
export const CustomSider = styled(Sider)`
  display: inline-flex;
  //   height: 812px;
  padding: 36px 0px 24px 0px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;

  .ant-menu-light .ant-menu-item-selected {
    background-color: transparent !important;
  }

  .ant-menu-light:not(.ant-menu-horizontal) .ant-menu-submenu-title:hover {
    background-color: transparent !important;
  }
`;
export const CustomDiv = styled(Row)`
  display: flex;
  padding: 16px 24px;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
export const CustomDiv2 = styled(Row)`
  display: inline-flex;
  padding: 36px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  color: red;
`;
