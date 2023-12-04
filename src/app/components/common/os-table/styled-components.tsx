import styled from '@emotion/styled';
import {GlobalToken} from 'antd/es/theme';
import {Table} from '../antd/Table';

interface ITableProps {
  token: GlobalToken;
  tableInModal?: boolean;
  paginationBorder?: boolean;
  cursor?: string;
}

export const CustomTable = styled(Table)<ITableProps>`
  width: ${({tableInModal}) => (tableInModal ? '381px' : '')};
  margin: ${({tableInModal}) => (tableInModal ? '24px' : '')};

  .ant-table-thead > tr {
    height: 32px;
  }
  .ant-table-thead > tr > th {
    padding: 8px 12px;
    font-weight: 500;
    color: ${(props) => props?.token?.colorPrimaryText};
    text-align: center;
    background: ${(props) => props.token.colorInfoBg};
    border-bottom: 1px solid ${(props) => props.token.colorBgElevated};
  }
  .ant-checkbox {
    border: 1px solid ${(props) => props.token.colorInfoBorder};
  }
`;
