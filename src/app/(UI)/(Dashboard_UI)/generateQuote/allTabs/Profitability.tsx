import OsInput from '@/app/components/common/os-input';
import OsTable from '@/app/components/common/os-table';

const Profitability = ({quoteLineItemByQuoteID}: any) => {
  console.log('quoteLineItemByQuoteID', quoteLineItemByQuoteID);

  const QuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {}}
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
      render: (text: string) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {}}
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
  ];
  return (
    <OsTable
      //   loading={loading}
      columns={QuoteLineItemcolumns}
      //   dataSource={quoteLineItemByQuoteData}
      scroll
      //   rowSelection={rowSelection}
    />
  );
};

export default Profitability;
