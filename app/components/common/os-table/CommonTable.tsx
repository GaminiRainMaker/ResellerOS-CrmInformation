/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import {FC, useCallback, useState} from 'react';
import ReactDragListView from 'react-drag-listview';
import {Resizable} from 'react-resizable';
import useThemeToken from '../hooks/useThemeToken';
import GlobalLoader from '../os-global-loader';
import {CustomTable} from './styled-components';

const ResizableTitle = (props: any) => {
  const {onResize, width, ...restProps} = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{enableUserSelectHack: false}}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const CommonTable: FC<any> = ({
  scrollx = 1000,
  tableInModal,
  rowSelection,
  cursor = 'default',
  tableSelectionType = 'checkbox',
  loading = false,
  scrolly = 1000,
  drag,
  ...rest
}) => {
  const [token] = useThemeToken();
  const [columns, setColumns] = useState(rest?.columns);

  const dragProps = {
    onDragEnd: useCallback(
      (fromIndex: any, toIndex: any) => {
        const updatedColumns = [...columns];
        const item = updatedColumns.splice(
          drag || rowSelection ? fromIndex - 1 : fromIndex,
          1,
        )[0];
        updatedColumns.splice(
          drag || rowSelection ? toIndex - 1 : toIndex,
          0,
          item,
        );
        setColumns(updatedColumns);
      },
      [columns],
    ),
    nodeSelector: 'th',
    handleSelector: '.dragHandler',
    ignoreSelector: 'react-resizable-handle',
  };

  const handleResize = useCallback(
    (index: any) =>
      (e: any, {size}: any) => {
        setColumns((prevColumns: any) => {
          const nextColumns = [...prevColumns];
          nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
          };
          return nextColumns;
        });
      },
    [],
  );

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const updatedColumns: any = columns?.map((col: any, index: any) => ({
    ...col,
    onHeaderCell: (column: any) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <ReactDragListView.DragColumn {...dragProps}>
      <CustomTable
        components={components}
        bordered
        {...rest}
        columns={updatedColumns}
        token={token}
        cursor={cursor}
        selectedRowsKeys={[]}
        tableInModal={tableInModal}
        rowKey={(record: any) => record?.id}
        rowSelection={
          rowSelection && {
            type: tableSelectionType,
            ...rowSelection,
          }
        }
        loading={{
          indicator: <GlobalLoader loading={loading} />,
          spinning: loading,
        }}
        scroll={
          scrolly
            ? {y: scrolly as number}
            : scrollx
              ? {y: scrollx as number}
              : undefined
        }
      />
    </ReactDragListView.DragColumn>
  );
};

export default CommonTable;
