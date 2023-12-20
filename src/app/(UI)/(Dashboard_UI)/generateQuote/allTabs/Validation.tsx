/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {pricingMethod} from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import {FC, useEffect, useState} from 'react';
import {updateValidationById} from '../../../../../../redux/actions/validation';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';

const Validation: FC = () => {
  const {abbreviate} = useAbbreviationHook(0);
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {data: ValidationData, loading} = useAppSelector(
    (state) => state.validation,
  );
  const [validationDataData, setValidationDataData] =
    useState<any>(ValidationData);

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
      render: (text: string, record: any) => (
        <CommonSelect
          style={{width: '200px'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(v) => {
            setValidationDataData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, pricing_method: v};
                }
                return prevItem;
              }),
            );

            setValidationDataData((prev: any) =>
              prev.map((prevItem: any) => {
                if (record?.id === prevItem?.id) {
                  console.log(
                    'prevItem',
                    prevItem?.quantity,
                    prevItem?.pricing_method,
                    prevItem?.line_amount,
                    prevItem?.list_price,
                  );
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
      width: 130,
      render: (text: string, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => {
            setValidationDataData((prev: any) =>
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
          {text ? `$${abbreviate(text ?? 0)}` : '--'}
        </Typography>
      ),
    },
    {
      title: 'Exit Price',
      dataIndex: 'exit_price',
      key: 'exit_price',
      width: 152,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$${abbreviate(text ?? 0)}` : '--'}
        </Typography>
      ),
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
      render: (text: string, record: any) => {
        if (record?.status === 'success') {
          return (
            <TableNameColumn
              fallbackIcon={
                <CheckCircleIcon width={24} color={token?.colorSuccess} />
              }
              iconBg={token?.colorSuccessBg}
            />
          );
        }
        if (record?.status === 'reject') {
          return (
            <TableNameColumn
              fallbackIcon={
                <XCircleIcon width={24} color={token?.colorError} />
              }
              iconBg={token?.colorErrorBg}
            />
          );
        }
        if (record?.status === 'warning') {
          return (
            <TableNameColumn
              fallbackIcon={
                <ExclamationCircleIcon width={24} color={token?.colorWarning} />
              }
              iconBg={token?.colorWarningBg}
            />
          );
        }
      },
    },
  ];

  useEffect(() => {
    validationDataData.map((validationDataItem: any) => {
      if (validationDataItem?.rowId === validationDataItem?.id) {
        const obj = {
          id: validationDataItem?.id,
          line_number: validationDataItem?.line_number,
          list_price: validationDataItem?.list_price,
          pricing_method: validationDataItem?.pricing_method,
          line_amount: validationDataItem?.line_amount,
          unit_price: validationDataItem?.unit_price,
          exit_price: validationDataItem?.exit_price,
        };
        dispatch(updateValidationById({...obj}));
      }
    });
  }, [validationDataData]);

  return (
    <OsTable
      loading={loading}
      columns={ValidationQuoteLineItemcolumns}
      dataSource={validationDataData}
      scroll
    />
  );
};

export default Validation;
