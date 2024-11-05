import {Collapse} from '@/app/components/common/antd/Collapse';
import {Space} from '@/app/components/common/antd/Space';
import styled from '@emotion/styled';
import {Row} from 'antd';

export const ChildCollapse = styled(Collapse)`
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0px;
  }

  .ant-collapse-item .ant-collapse-header-text {
    padding: 0px;
  }
`;

export const CollapseSpaceStyle = styled(Space)`
  width: 100%;
  background: white;
  padding: 24px;
  border-radius: 12px;
`;
export const CollapseSpaceStyleForDepenent = styled(Row)`
  width: 100%;
  background: white;
  padding: 2px;
  border-radius: 12px;
`;

export const CollapseSpaceStyleForInnerOptions = styled(Space)`
  width: 100%;
  background: #f5f5f5;
  padding: 4px;
  border-radius: 2px;
`;
