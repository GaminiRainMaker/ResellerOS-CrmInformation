import styled from '@emotion/styled';
import {Card} from '../antd/Card';

export const OsCardStyle = styled(Card)`
  border-radius: 12px;
`;
export const OsContactCardStyle = styled(Card)`
  background: #f6f7f8;
  border-radius: 12px;
  &.ant-card .ant-card-body {
    padding: 12px;
  }
  border: none;
  width: 100%;
  max-width: 333px;
`;
