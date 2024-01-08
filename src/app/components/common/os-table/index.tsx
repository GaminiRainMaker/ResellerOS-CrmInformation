/* eslint-disable consistent-return */
import {PaginationProps} from 'antd';
import {FC} from 'react';
import useThemeToken from '../hooks/useThemeToken';
import GlobalLoader from '../os-global-loader';
import {CustomTable} from './styled-components';

const OsTable: FC<any> = ({
  scrollx = 1000,
  paginationProps = true,
  tableInModal,
  rowSelection,
  cursor = 'default',
  tableSelectionType = 'checkbox',
  loading = false,
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
      rowSelection={{
        type: tableSelectionType,
        ...rowSelection,
      }}
      bordered
      loading={{
        indicator: <GlobalLoader loading={loading} />,
        spinning: loading,
      }}
      scroll={scrollx ? {x: scrollx as number} : undefined}
      pagination={
        paginationProps
          ? {...rest.pagination, ...rest?.pageSize, itemRender, showQuickJumper: false}
          : false
      }
      paginationBorder={paginationProps}
    />
  );
};

export default OsTable;
