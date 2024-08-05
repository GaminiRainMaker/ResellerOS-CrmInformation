import {Collapse} from '@/app/components/common/antd/Collapse';
import {Space} from '@/app/components/common/antd/Space';
import styled from '@emotion/styled';

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
