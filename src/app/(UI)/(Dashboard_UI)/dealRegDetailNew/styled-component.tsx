import {Collapse} from '@/app/components/common/antd/Collapse';
import styled from '@emotion/styled';

export const ChildCollapse = styled(Collapse)`
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0px;
  }

  .ant-collapse-item .ant-collapse-header-text {
    padding: 0px;
  }
`;
