/* eslint-disable array-callback-return */
import OsInput from '@/app/components/common/os-input';
import OsTable from '@/app/components/common/os-table';
import {FC, useCallback, useEffect, useState} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from 'lodash/debounce';
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import EmptyContainer from '@/app/components/common/os-empty-container';
import Typography from '@/app/components/common/typography';
import {rebateAmount, useRemoveDollarAndCommahook} from '@/app/utils/base';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {useSearchParams} from 'next/navigation';
import {getRebateQuoteLineItemByQuoteId, updateRebateQuoteLineItemById} from '../../../../../../redux/actions/rebateQuoteLineitem';
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
            setRebateData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem?.id === record?.id) {
                  return {...prevItem, quantity: v?.target?.value};
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
          disabled={renderEditableInput('Cost')}
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(e) => {
            setRebateData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem?.id === record?.id) {
                  return {...prevItem, list_price: e?.target?.value};
                }
                return prevItem;
              }),
            );

            handleInputChange(record?.id, e.target.value);
          }}
        />
      ),
      width: 115,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 353,
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
    },
    {
      title: 'Percentage Payout',
      dataIndex: 'percentage_payout',
      key: 'percentage_payout',
      width: 152,
    },
    {
      title: 'Exit Price',
      dataIndex: 'exit_price',
      key: 'exit_price',
      width: 131,
    },
    {
      title: 'Rebate Amount',
      dataIndex: 'rebate_amount',
      key: 'rebate_amount',
      width: 135,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$ ${abbreviate(text ?? 0)}` : '--'}
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
          {text ? `${abbreviate(text ?? 0)} %` : '--'}
        </Typography>
      ),
    },
  ];

  const [finaRebateTableCol, setFinaRebateTableCol] = useState<any>();

  useEffect(() => {
    const newArr: any = [];
    RebatesQuoteLineItemcolumns?.map((itemCol: any) => {
      tableColumnDataShow?.filter((item: any) => {
        if (item?.field_name?.includes(itemCol?.title)) {
          newArr?.push(itemCol);
        }
      });
    });
    setFinaRebateTableCol(newArr);
  }, [tableColumnDataShow]);

  useEffect(() => {
    dispatch(getRebateQuoteLineItemByQuoteId(Number(getQuoteID))).then((d: any) => {
      setRebateData(d?.payload);
    });
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
