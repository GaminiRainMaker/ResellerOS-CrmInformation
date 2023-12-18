/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import {pricingMethod} from '@/app/utils/CONSTANTS';
import useRemoveDollarAndCommahook, {
  calculateProfitabilityData,
} from '@/app/utils/base';
import {Button} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import Typography from '@/app/components/common/typography';
import {getQuoteLineItemByQuoteId} from '../../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';

const Profitability: FC<any> = ({isEditable}) => {
  const searchParams = useSearchParams();
  const getQuoteLineItemId = searchParams.get('id');
  const dispatch = useAppDispatch();
  const {quoteLineItemByQuoteID} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [profitabilityData, setProfitabilityData] = useState<any>(
    quoteLineItemByQuoteID,
  );
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);

  useEffect(() => {
    if (getQuoteLineItemId)
      dispatch(getQuoteLineItemByQuoteId(Number(getQuoteLineItemId)));
  }, [getQuoteLineItemId]);

  const ProfitabilityQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
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
      width: 120,
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
            // setCalculationData((prev) => ({...prev, Qty: v.target.value}));
            setProfitabilityData((prev: any) =>
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
      width: 120,
    },
    {
      title: 'Cost',
      dataIndex: 'list_price',
      key: 'list_price',
      render: (text: string, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
          onChange={(v) => {
            // setCalculationData((prev) => ({...prev, Cost: v.target.value}));
            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, list_price: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 115,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 277,
    },
    {
      title: 'Pricing Method',
      dataIndex: 'pricing_method',
      key: 'pricing_method',
      width: 160,
      render: (text: string, record: any) => (
        <CommonSelect
          style={{width: '200px'}}
          placeholder="Select"
          onChange={(v) => {
            // setCalculationData((prev) => ({...prev, PriceMethod: v}));
            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, pricing_method: v};
                }
                return prevItem;
              }),
            );

            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (selectTedRowIds?.includes(prevItem?.id)) {
                  const result: any = calculateProfitabilityData(
                    useRemoveDollarAndCommahook(prevItem?.quantity),
                    prevItem?.pricing_method,
                    useRemoveDollarAndCommahook(prevItem?.line_amount),
                    useRemoveDollarAndCommahook(prevItem?.list_price),
                    20,
                  );
                  return {
                    ...prevItem,
                    unit_price: result.unitPrice,
                    exit_price: result.exitPrice,
                    gross_profit: result.grossProfit,
                    gross_profit_percentage: result.grossProfitPercentage,
                  };
                }
                return prevItem;
              }),
            );
          }}
          options={pricingMethod}
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
      width: 121,
      render: (text: string, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
          value={text}
          onChange={(v) => {
            // setCalculationData((prev) => ({...prev, Amount: v.target.value}));
            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, line_amount: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      width: 121,
    },
    {
      title: 'Exit Price',
      dataIndex: 'exit_price',
      key: 'exit_price',
      width: 121,
    },
    {
      title: 'Gross Profit',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      width: 121,
    },
    {
      title: 'Gross Profit %',
      dataIndex: 'gross_profit_percentage',
      key: 'gross_profit_percentage',
      width: 200,
      render: (text: string) => (
        <Typography name="Body 4/Medium">
          {text}
          {text ? ' %' : ''}
        </Typography>
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
      loading={false}
      rowSelection={{...rowSelection}}
      columns={ProfitabilityQuoteLineItemcolumns}
      dataSource={profitabilityData}
      scroll
    />
  );
};

export default Profitability;
