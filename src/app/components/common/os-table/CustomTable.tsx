/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import {PaginationProps} from 'antd';
import {FC, useState} from 'react';
import useThemeToken from '../hooks/useThemeToken';
import GlobalLoader from '../os-global-loader';
import {CustomTable} from './styled-components';

const OsTableWithOutDrag: FC<any> = ({
  scrollx = 1000,
  paginationProps = true,
  tableInModal,
  rowSelection,
  cursor = 'default',
  tableSelectionType = 'checkbox',
  scrolly = 1000,
  tablePageSize = 100,
  showPagination,
  selectedRowsKeys = [],
  defaultPageSize,
  ...rest
}) => {
  const [token] = useThemeToken();
  const roundPageSize = (size: number) => {
    if (size <= 10) return 10;
    if (size <= 20) return 20;
    if (size <= 30) return 30;
    if (size <= 50) return 50;
    return 100;
  };
  const defaultPageSizeAdjusted = roundPageSize(defaultPageSize);

  const itemRender: PaginationProps['itemRender'] = (
    page,
    type,
    originalElement,
  ) => {
    if (type === 'jump-next' || type === 'jump-prev') return;
    if (type === 'prev' || type === 'next') {
      return <>{type === 'prev' ? 'Previous' : 'Next'}</>;
    }
    return originalElement;
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: defaultPageSizeAdjusted,
    total: 0,
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize,
    });
  };

  return (
    <CustomTable
      {...rest}
      cursor={cursor}
      tableInModal={tableInModal}
      token={token}
      rowKey={(record: any) => record?.id}
      rowSelection={
        rowSelection && {
          type: tableSelectionType,
          ...rowSelection,
          selectedRowKeys: selectedRowsKeys,
        }
      }
      bordered
      loading={{
        indicator: <GlobalLoader loading={rest.loading} />,
        spinning: rest.loading,
      }}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: handlePaginationChange,
        position: ['bottomRight'],
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30, 50, 100],
        // hideOnSinglePage: true,
      }}
      scroll={
        scrolly
          ? {y: scrolly as number}
          : scrollx
            ? {y: scrollx as number}
            : undefined
      }
      // paginationBorder={paginationProps}
    />
  );
};

export default OsTableWithOutDrag;
