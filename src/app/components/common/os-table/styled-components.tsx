import styled from '@emotion/styled';
import {GlobalToken} from 'antd/es/theme';
import {Table} from '../antd/Table';
import {Avatar} from '../antd/Avatar';

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
  color: white !important;
  .ant-table-thead > tr > th {
    padding: 8px 12px;
    font-weight: 500;
    span {
      color: white !important;
    }
    color: white !important;
    text-align: center;
    background: #457B9D;
    border-bottom: 1px solid #8592a4;
  }
  .ant-table-cell {
    text-align: center;
  }
  .ant-pagination .ant-pagination-item-active {
    background: ${(props) => props.token.colorPrimary};
    a {
      color: white;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
    }
  }
  // .ant-pagination .ant-pagination-item {
  //   background: ${(props) => props.token.colorInfoBg};
  // }
  .ant-table-cell .ant-table-cell-roe-hover:hover {
    background: green;
    span {
      color: green;
    }
  }

  &.ant-table-wrapper
    .ant-table-tbody
    .ant-table-row.ant-table-row
    > .ant-table-cell-row-hover {
    background: #f6f7f8;
    cursor: pointer;
    // span {
    //   color: red;
    // }
  }

  &.ant-table-wrapper
    .ant-table-tbody
    .ant-table-row.ant-table-row-selected
    > .ant-table-cell-row {
    background: red;
    cursor: pointer;
  }
  &.ant-table-wrapper .ant-table-tbody > tr > td {
    padding: 12px;
  }

  .ant-table-expanded-row-fixed {
    padding: 0px;
  }
`;

export const AvatarStyled = styled(Avatar)<{
  background?: string;
  cursor?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background: ${(props) => `${props?.background}`};
  cursor: ${(props) => (props?.cursor ? `${props?.cursor}` : 'pointer')};
`;
export const DetailAnalyticAvatarStyled = styled(Avatar)<{background?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  width: 72px;
  background: ${(props) => `${props?.background}`};
  cursor: pointer;
`;
