/* eslint-disable array-callback-return */
import OsInput from '@/app/components/common/os-input';
import {FC, useCallback, useEffect, useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from 'lodash/debounce';
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import EmptyContainer from '@/app/components/common/os-empty-container';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {pricingMethod} from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  rebateAmount,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {useSearchParams} from 'next/navigation';
import {
  getRebateQuoteLineItemByQuoteId,
  updateRebateQuoteLineItemById,
} from '../../../../../../redux/actions/rebateQuoteLineitem';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setRebate} from '../../../../../../redux/slices/rebate';
import {setRebateQuoteLineItem} from '../../../../../../redux/slices/rebateQuoteLineItem';

const Rebates: FC<any> = ({tableColumnDataShow}) => {
  const dispatch = useAppDispatch();
  const {abbreviate} = useAbbreviationHook(0);
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {data: RebateData, loading} = useAppSelector(
    (state) => state.rebateQuoteLineItem,
  );
  const [rebateData, setRebateData] = useState<any>(RebateData);
  const updateRebateQuoteLineItemData = (updatedData: any) => {
    dispatch(updateRebateQuoteLineItemById(updatedData));
  };

  const debouncedApiCall = useCallback(
    _debounce(updateRebateQuoteLineItemData, 500),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(setRebate(rebateData));
    }, 500);
  }, [rebateData]);

  const handleInputChange = (recordId: number, list_price: string) => {
    rebateData.map((prevItem: any) => {
      if (recordId === prevItem?.id) {
        const rebateAmountValue: any = rebateAmount(
          useRemoveDollarAndCommahook(list_price),
          prevItem?.quantity,
          prevItem?.percentage_payout,
        );
        const obj = {
          id: prevItem?.id,
          line_number: prevItem?.line_number,
          quantity: prevItem?.quantity,
          list_price,
          percentage_payout: prevItem?.percentage_payout,
          line_amount: prevItem?.line_amount,
          unit_price: prevItem?.unit_price,
          exit_price: prevItem?.exit_price,
          rebate_amount: rebateAmountValue,
          rebate_percentage: prevItem?.percentage_payout,
          rowId: recordId,
        };
        debouncedApiCall(obj);
      }
    });
  };

  useEffect(() => {
    dispatch(setRebateQuoteLineItem(rebateData));
  }, [JSON.stringify(RebateData)]);

  const renderEditableInput = (field: string) => {
    const editableField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (editableField?.is_editable) {
      return false;
    }
    return true;
  };

  const RebatesQuoteLineItemcolumns = [
    {
      title: '#Line',
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
      render: (text: string, record: any) => (
        <CommonSelect
          disabled={renderEditableInput('Pricing Method')}
          style={{width: '100%'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(v) => {
            setRebateData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, pricing_method: v};
                }
                return prevItem;
              }),
            );
            setRebateData((prev: any) =>
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
      width: 200,
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
          value={text}
          onChange={(v) => {
            setRebateData((prev: any) =>
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
      width: 152,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$ ${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Exit Price',
      dataIndex: 'exit_price',
      key: 'exit_price',
      width: 131,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$ ${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Rebate Amount',
      dataIndex: 'rebate_amount',
      key: 'rebate_amount',
      width: 135,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$ ${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Rebate %',
      dataIndex: 'rebate_percentage',
      key: 'rebate_percentage',
      width: 130,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `${abbreviate(text ?? 0)} %` : 0}
        </Typography>
      ),
    },
  ];

  useEffect(() => {
    rebateData.map((rebatesDataItem: any) => {
      if (rebatesDataItem?.rowId === rebatesDataItem?.id) {
        const obj = {
          id: rebatesDataItem?.id,
          line_number: rebatesDataItem?.line_number,
          quantity: rebatesDataItem?.quantity,
          list_price: rebatesDataItem?.list_price,
          line_amount: rebatesDataItem?.line_amount,
          percentage_payout: rebatesDataItem?.percentage_payout,
          unit_price: rebatesDataItem?.unit_price,
          exit_price: rebatesDataItem?.exit_price,
          rebate_amount: rebatesDataItem?.rebate_amount,
          rebate_percentage: rebatesDataItem?.percentage_payout,
          pricing_method: rebatesDataItem?.pricing_method,
        };

        dispatch(updateRebateQuoteLineItemById({...obj}));
      }
    });
    // for analytics tabss it is in pending
    // dispatch(setProfitability(profitabilityData));
  }, [rebateData]);

  const [finaRebateTableCol, setFinaRebateTableCol] = useState<any>();

  useEffect(() => {
    const newArr: any = [];
    RebatesQuoteLineItemcolumns?.map((itemCol: any) => {
      let shouldPush = false;
      tableColumnDataShow?.forEach((item: any) => {
        if (item?.field_name === itemCol?.title) {
          shouldPush = true;
        }
      });
      if (
        itemCol?.dataIndex === 'actions' ||
        itemCol?.dataIndex?.includes('actions.')
      ) {
        shouldPush = true;
      }
      if (shouldPush) {
        newArr?.push(itemCol);
      }
    });
    setFinaRebateTableCol(newArr);
  }, [tableColumnDataShow]);

  useEffect(() => {
    dispatch(getRebateQuoteLineItemByQuoteId(Number(getQuoteID))).then(
      (d: any) => {
        setRebateData(d?.payload);
      },
    );
  }, [getQuoteID]);

  return (
    <>
      {finaRebateTableCol && finaRebateTableCol?.length > 0 ? (
        <OsTableWithOutDrag
          loading={loading}
          columns={finaRebateTableCol}
          dataSource={rebateData}
          scroll
        />
      ) : (
        <EmptyContainer title="There Is No Columns" />
      )}
    </>
  );
};

export default Rebates;
