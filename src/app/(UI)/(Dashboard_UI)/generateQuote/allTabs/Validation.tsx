import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import {dummyData, pricingMethod} from '@/app/utils/CONSTANTS';
import {FC} from 'react';

const Validation: FC = () => {
  const ValidationQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {}}
        />
      ),
      width: 111,
    },
    {
      title: 'SKU',
      dataIndex: 'product_code',
      key: 'product_code',
      width: 130,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 353,
    },
    {
      title: 'Pricing Method',
      dataIndex: 'pricing_method',
      key: 'pricing_method',
      width: 208,
      render: (text: string) => (
        <CommonSelect
          style={{width: '200px'}}
          placeholder="Select"
          options={pricingMethod}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      render: (text: string) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {}}
        />
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      width: 152,
    },
    {
      title: 'Exit Price',
      dataIndex: 'exit_price',
      key: 'exit_price',
      width: 152,
    },
    {
      title: 'Contract Price',
      dataIndex: 'contract_price',
      key: 'contract_price',
      width: 135,
    },
    {
      title: 'Contract Status',
      dataIndex: 'contract_status',
      key: 'contract_status',
      width: 135,
    },
  ];
  return (
    <OsTable
      loading={false}
      // rowSelection={rowSelection}
      columns={ValidationQuoteLineItemcolumns}
      dataSource={dummyData}
      scroll
    />
  );
};

export default Validation;
