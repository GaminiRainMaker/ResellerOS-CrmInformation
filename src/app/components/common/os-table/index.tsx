/* eslint-disable consistent-return */
import React, {FC, useState} from 'react';
import {PaginationProps} from 'antd';
import {CustomTable} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';
import GlobalLoader from '../os-global-loader';

const OsTable: FC<any> = ({
  scrollx = 1200,
  paginationProps = true,
  tableInModal,
  cursor = 'default',
  ...rest
}) => {
  const [token] = useThemeToken();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRowKeys(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <CustomTable
      {...rest}
      cursor={cursor}
      selectedRowsKeys={[]}
      tableInModal={tableInModal}
      token={token}
      rowKey={(record: any) => record.id}
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      bordered
      loading={{
        indicator: <GlobalLoader loading={rest.loading} />,
        spinning: rest.loading,
      }}
      scroll={scrollx ? {x: scrollx as number} : undefined}
      pagination={
        paginationProps
          ? {...rest.pagination, itemRender, showQuickJumper: false}
          : false
      }
      paginationBorder={paginationProps}
    />
  );
};

export default OsTable;
