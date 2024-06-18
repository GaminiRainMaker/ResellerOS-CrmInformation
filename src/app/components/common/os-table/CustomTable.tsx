/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import {PaginationProps} from 'antd';
import {FC} from 'react';
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
  tablePageSize = 10,
  pagination,
  ...rest
}) => {
  const [token] = useThemeToken();
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

  return (
    <CustomTable
      {...rest}
      cursor={cursor}
      selectedRowsKeys={[]}
      tableInModal={tableInModal}
      token={token}
      rowKey={(record: any) => record?.id}
      rowSelection={
        rowSelection && {
          type: tableSelectionType,
          ...rowSelection,
        }
      }
      bordered
      loading={{
        indicator: <GlobalLoader loading={rest.loading} />,
        spinning: rest.loading,
      }}
      // pagination={
      //   paginationProps
      //     ? {
      //         ...rest.pagination,
      //         pageSize: tablePageSize,
      //         itemRender,
      //         showQuickJumper: false,
      //       }
      //     : false
      // }
      pagination={pagination}
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
