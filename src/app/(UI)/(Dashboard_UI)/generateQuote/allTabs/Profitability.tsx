/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {pricingMethod} from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {
  getProfitabilityByQuoteId,
  updateProfitabilityById,
} from '../../../../../../redux/actions/profitability';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setProfitability} from '../../../../../../redux/slices/profitability';

const Profitability: FC<any> = ({tableColumnDataShow}) => {
  const dispatch = useAppDispatch();
  const {abbreviate} = useAbbreviationHook(0);
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {data: profitabilityDataByQuoteId, loading} = useAppSelector(
    (state) => state.profitability,
  );
  const [profitabilityData, setProfitabilityData] = useState<any>(
    profitabilityDataByQuoteId,
  );

  const locale = {
    emptyText: <EmptyContainer title="There is no data for Profitability" />,
  };

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

  const renderEditableInput = (field: string) => {
    const editableField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (editableField?.is_editable) {
      return false;
    }
    return true;
  };

  const ProfitabilityQuoteLineItemcolumns = [
    {
      title: 'Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string) => (
        <OsInput
          disabled={renderEditableInput('Line')}
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
          disabled={renderEditableInput('Qty')}
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
      dataIndex: 'adjusted_price',
      key: 'adjusted_price ',
      render: (text: string, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          disabled={renderEditableInput('Cost')}
          value={text}
          onChange={(v) => {
            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, adjusted_price: v.target.value};
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
      width: 120,
      render: (text: string, record: any) => (
        <CommonSelect
          disabled={renderEditableInput('Pricing Method')}
          style={{width: '150px'}}
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
                    useRemoveDollarAndCommahook(prevItem?.adjusted_price),
                    useRemoveDollarAndCommahook(prevItem?.list_price),
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
          disabled={renderEditableInput('Amount')}
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

  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>();

  useEffect(() => {
    const newArr: any = [];
    ProfitabilityQuoteLineItemcolumns?.map((itemCol: any) => {
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
  }, [tableColumnDataShow]);

  useEffect(() => {
    profitabilityData.map((profitabilityDataItem: any) => {
      if (profitabilityDataItem?.rowId === profitabilityDataItem?.id) {
        const obj = {
          id: profitabilityDataItem?.id,
          line_number: profitabilityDataItem?.line_number,
          quantity: profitabilityDataItem?.quantity,
          adjusted_price: profitabilityDataItem?.adjusted_price,
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

  useEffect(() => {
    dispatch(getProfitabilityByQuoteId(Number(getQuoteID))).then((d: any) => {
      setProfitabilityData(d?.payload);
    });
  }, [getQuoteID]);

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        <OsTableWithOutDrag
          loading={loading}
          columns={finalProfitTableCol}
          dataSource={profitabilityData}
          scroll
          locale={locale}
        />
      ) : (
        <EmptyContainer
          title="There is no columns for Profitability"
          subTitle="Please Update from admin Configuration Tab or Request to admin to update the columns."
        />
      )}
    </>
  );
};

export default Profitability;
