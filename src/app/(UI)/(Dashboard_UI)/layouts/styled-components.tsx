import styled from '@emotion/styled';
import {Row, Menu} from 'antd';
import {Space} from '../../../components/common/antd/Space';

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
export const CustomDiv3 = styled(Row)`
  display: inline-flex;
  padding: 16px 4px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  alignself: stretch;
`;
export const LayoutMenuStyle = styled(Menu)`
  &.ant-menu-light .ant-menu-item-selected {
    background: none;
  }
`;
