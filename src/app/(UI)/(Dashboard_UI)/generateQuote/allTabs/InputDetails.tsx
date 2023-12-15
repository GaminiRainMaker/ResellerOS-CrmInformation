import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import {selectDataForProduct} from '@/app/utils/CONSTANTS';
import {FC, useState} from 'react';
import {useAppSelector} from '../../../../../../redux/hook';

const InputDetails: FC<any> = ({isEditable}) => {
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const {quoteLineItemByQuoteID, loading} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [quoteLineItemByQuoteData, setQuoteLineItemByQuoteData] = useState<any>(
    quoteLineItemByQuoteID,
  );

  const InputDetailsQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string, record: any) => (
        <OsInput
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setQuoteLineItemByQuoteData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, line_number: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 130,
    },
    {
      title: 'SKU',
      dataIndex: 'product_code',
      key: 'product_code',
      width: 187,
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: string, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
          value={text}
          onChange={(v) => {
            setQuoteLineItemByQuoteData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, quantity: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 187,
    },
    {
      title: 'MSRP',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      width: 187,
    },
    {
      title: 'Cost',
      dataIndex: 'list_price',
      key: 'list_price',
      width: 187,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 365,
    },
    {
      title: 'Product Family',
      dataIndex: 'product_family',
      key: 'product_family',
      width: 285,
      render: (text: string, record: any) => (
        <CommonSelect
          style={{width: '200px'}}
          placeholder="Select"
          value={record?.Product?.product_family}
          options={selectDataForProduct}
          //   onChange={(e) => {
          //     const data = {id: record?.product_id, product_family: e};
          //     dispatch(updateProductFamily(data));
          //   }}
        />
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowIds(selectedRowKeys);
    },
  };

  return (
    <OsTable
      loading={loading}
      rowSelection={rowSelection}
      columns={InputDetailsQuoteLineItemcolumns}
      dataSource={quoteLineItemByQuoteData || []}
      scroll
    />
  );
};

export default InputDetails;
