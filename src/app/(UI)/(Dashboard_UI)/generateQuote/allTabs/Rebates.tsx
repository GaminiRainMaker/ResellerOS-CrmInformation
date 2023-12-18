import OsInput from '@/app/components/common/os-input';
import OsTable from '@/app/components/common/os-table';
import {FC, useEffect, useState} from 'react';

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import {rebateTableData} from '@/app/utils/CONSTANTS';
import {rebateAmount, useRemoveDollarAndCommahook} from '@/app/utils/base';
import {useSearchParams} from 'next/navigation';
import {Button} from 'antd';
import Typography from '@/app/components/common/typography';
import {getQuoteLineItemByQuoteId} from '../../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {getProfitabilityByQuoteId} from '../../../../../../redux/actions/profitability';

const Rebates: FC<any> = () => {
  const searchParams = useSearchParams();
  const getQuoteLineItemId = searchParams.get('id');
  const dispatch = useAppDispatch();
  const {abbreviate} = useAbbreviationHook(0);

  const {quoteLineItemByQuoteID} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  // const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [rebateData, setRebateData] = useState<any>([]);

  const pidToPayoutMap = new Map(
    rebateTableData.map((item) => [item.pid, item.percentage_payout]),
  );
  useEffect(() => {
    if (getQuoteLineItemId) {
      dispatch(getQuoteLineItemByQuoteId(Number(getQuoteLineItemId)));
      dispatch(getProfitabilityByQuoteId(Number(getQuoteLineItemId)));
    }
    const filteredDataWithPayout = quoteLineItemByQuoteID
      .map((item: any) => ({
        ...item,
        percentage_payout:
          pidToPayoutMap.get(item.product_code) ||
          pidToPayoutMap.get(item.product_id.toString()) ||
          null,
      }))
      .filter((item: any) => item.percentage_payout !== null);

    // const tempDataWithPayout = filteredDataWithPayout.map(
    //   (filteredDataWithPayoutItem: any) => {
    //     const result: any = rebateAmount(
    //       useRemoveDollarAndCommahook(filteredDataWithPayoutItem?.list_price),
    //       filteredDataWithPayoutItem?.quantity,
    //       filteredDataWithPayoutItem?.percentage_payout,
    //     );
    //     return {...filteredDataWithPayoutItem, rebate_amount: result};
    //   },
    // );

    setRebateData(filteredDataWithPayout);
  }, [getQuoteLineItemId]);

  const onClick = () => {
    const tempDataWithPayout = rebateData.map((rebateDataItem: any) => {
      const result: any = rebateAmount(
        useRemoveDollarAndCommahook(rebateDataItem?.list_price),
        rebateDataItem?.quantity,
        rebateDataItem?.percentage_payout,
      );
      return {...rebateDataItem, rebate_amount: result};
    });
    setRebateData(tempDataWithPayout);
  };

  const RebatesQuoteLineItemcolumns = [
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
            setRebateData((prev: any) =>
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
            setRebateData((prev: any) =>
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
      width: 353,
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
      dataIndex: 'percentage_payout',
      key: 'percentage_payout',
      width: 130,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `${abbreviate(text ?? 0)} %` : '--'}
        </Typography>
      ),
    },
  ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[]) => {
  //     setSelectedRowIds(selectedRowKeys);
  //   },
  // };

  return (
    <>
      <Button
        onClick={() => {
          onClick();
        }}
      >
        Save
      </Button>
      <OsTable
        loading={false}
        // rowSelection={{...rowSelection}}
        columns={RebatesQuoteLineItemcolumns}
        dataSource={rebateData}
        scroll
      />
    </>
  );
};

export default Rebates;
