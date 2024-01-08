/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {pricingMethod} from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {FC, useEffect, useState} from 'react';
import {updateProfitabilityById} from '../../../../../../redux/actions/profitability';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setProfitability} from '../../../../../../redux/slices/profitability';

const Profitability: FC<any> = ({tableColumnDataShow}) => {
  const dispatch = useAppDispatch();
  const {abbreviate} = useAbbreviationHook(0);

  const {data: profitabilityDataByQuoteId, loading} = useAppSelector(
    (state) => state.profitability,
  );
  const [profitabilityData, setProfitabilityData] = useState<any>(
    profitabilityDataByQuoteId,
  );

  const updateAmountValue = (value: any, pricingMethods: string) => {
    const val = useRemoveDollarAndCommahook(value);
    if (
      pricingMethods === 'cost_percentage' ||
      pricingMethods === 'list_percentage' ||
      pricingMethods === 'gp'
    ) {
      return `% ${String(val)}`;
    }
    return `$ ${String(val)}`;
  };

  const ProfitabilityQuoteLineItemcolumns = [
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
          value={text}
          onChange={(v) => {
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
          onChange={(v) => {
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
          defaultValue={text}
          onChange={(v) => {
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
                if (record?.id === prevItem?.id) {
                  const rowId = record?.id;
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
                    rowId,
                  };
                }
                return prevItem;
              }),
            );
          }}
          options={pricingMethod}
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
          value={updateAmountValue(text, record?.pricing_method)}
          onChange={(v) => {
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
      width: 150,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$${abbreviate(text ?? 0)}` : '--'}
        </Typography>
      ),
    },
    {
      title: 'Exit Price',
      dataIndex: 'exit_price',
      key: 'exit_price',
      width: 150,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$${abbreviate(text ?? 0)}` : '--'}
        </Typography>
      ),
    },
    {
      title: 'Gross Profit',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      width: 150,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$${abbreviate(text ?? 0)}` : '--'}
        </Typography>
      ),
    },
    {
      title: 'Gross Profit %',
      dataIndex: 'gross_profit_percentage',
      key: 'gross_profit_percentage',
      width: 200,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `${abbreviate(text ?? 0)} %` : '--'}
        </Typography>
      ),
    },
  ];

  const [profitTableCol, setProfitTableCol] = useState<any>(
    ProfitabilityQuoteLineItemcolumns,
  );
  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>(
    ProfitabilityQuoteLineItemcolumns,
  );

  useEffect(() => {
    const newArr: any = [];
    profitTableCol?.map((itemCol: any) => {
      tableColumnDataShow?.filter((item: any) => {
        if (item?.field_name?.includes(itemCol?.title)) {
          newArr?.push(itemCol);
        }
      });
      if (itemCol?.dataIndex?.includes('actions')) {
        newArr?.push(itemCol);
      }
    });
    // actions
    setFinalProfitTableCol(newArr);
  }, [profitTableCol, tableColumnDataShow]);

  useEffect(() => {
    profitabilityData.map((profitabilityDataItem: any) => {
      if (profitabilityDataItem?.rowId === profitabilityDataItem?.id) {
        const obj = {
          id: profitabilityDataItem?.id,
          line_number: profitabilityDataItem?.line_number,
          quantity: profitabilityDataItem?.quantity,
          list_price: profitabilityDataItem?.list_price,
          pricing_method: profitabilityDataItem?.pricing_method,
          line_amount: profitabilityDataItem?.line_amount,
          unit_price: profitabilityDataItem?.unit_price,
          exit_price: profitabilityDataItem?.exit_price,
          gross_profit: profitabilityDataItem?.gross_profit,
          gross_profit_percentage:
            profitabilityDataItem?.gross_profit_percentage,
        };
        dispatch(updateProfitabilityById({...obj}));
      }
    });
    dispatch(setProfitability(profitabilityData));
  }, [profitabilityData]);

  return (
    <OsTable
      loading={loading}
      columns={finalProfitTableCol}
      dataSource={profitabilityData}
      scroll
    />
  );
};

export default Profitability;
