/* eslint-disable consistent-return */
import {PaginationProps} from 'antd';
import {FC} from 'react';
import useThemeToken from '../hooks/useThemeToken';
import GlobalLoader from '../os-global-loader';
import {CustomTable} from './styled-components';

const OsTable: FC<any> = ({
  scrollx = 1200,
  paginationProps = true,
  tableInModal,
  rowSelection,
  cursor = 'default',
  type1 = 'checkbox',
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
      rowKey={(record: any) => record.id}
      rowSelection={{
        type: type1,
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
