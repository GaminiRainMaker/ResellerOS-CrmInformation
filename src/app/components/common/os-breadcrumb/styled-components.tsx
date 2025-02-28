import styled from '@emotion/styled';
import {Breadcrumb} from '../antd/BreadCrumb';

export const OsBreadCrumbStyle = styled(Breadcrumb)`
  display: flex;
  margin: 0px;
  padding: 0px;
  height: 52px;
  &.ant-breadcrumb .ant-breadcrumb-separator {
    margin-top: 8px;
  }
  &.ant-breadcrumb ol {
    align-items: center;
  }
`;
