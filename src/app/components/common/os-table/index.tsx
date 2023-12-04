import React, {FC} from 'react';
import {CustomTable} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';

const OsTable: FC<any> = ({
  scrollx = 1200,
  paginationProps = true,
  tableInModal,
  cursor = 'default',
  ...rest
}) => {
  const [token] = useThemeToken();
  //   const itemRender: PaginationProps['itemRender'] = (
  //     page,
  //     type,
  //     originalElement,
  //   ) => {
  //     if (type === 'jump-next' || type === 'jump-prev') return;
  //     if (type === 'prev' || type === 'next') {
  //       return <>{type === 'prev' ? 'Previous' : 'Next'}</>;
  //     }
  //     return originalElement;
  //   };

  return (
    <CustomTable
      {...rest}
      cursor={cursor}
      tableInModal={tableInModal}
      token={token}
      //   loading={{indicator: <Indicator />, spinning: rest.loading}}
      scroll={scrollx ? {x: scrollx as number} : undefined}
      //   pagination={
      //     paginationProps
      //       ? {...rest.pagination, itemRender, showQuickJumper: false}
      //       : false
      //   }
      paginationBorder={paginationProps}
    />
  );
};

export default OsTable;
