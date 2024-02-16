/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
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
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {
  getAllValidationByQuoteId,
  updateValidationById,
} from '../../../../../../redux/actions/validation';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';

const Validation: FC<any> = ({tableColumnDataShow}) => {
  const {abbreviate} = useAbbreviationHook(0);
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {data: ValidationData, loading} = useAppSelector(
    (state) => state.validation,
  );
  const {data: ContractSettingData} = useAppSelector(
    (state) => state.contractSetting,
  );
  const {quoteById} = useAppSelector((state) => state.quote);
  const [validationDataData, setValidationDataData] =
    useState<any>(ValidationData);

  const locale = {
    emptyText: <EmptyContainer title="There is no data for Validation Data" />,
  };

  const contractStatusCheck = (record: any) => {
    const matchingField = ContractSettingData.matching_filed;

    const value =
      ContractSettingData.object_name === 'quote'
        ? quoteById?.[matchingField]
        : ContractSettingData.object_name === 'opportunity'
          ? quoteById?.Opportunity?.[matchingField]
          : ContractSettingData.object_name === 'quote_line_item'
            ? record?.[matchingField]
            : null;

    if (value) {
      const result = record?.product_code === value ? 'success' : 'reject';
      return result;
    }
    if (!value) {
      return 'reject';
    }
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

  const ValidationQuoteLineItemcolumns = [
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
      width: 208,
      render: (text: string, record: any) => (
        <CommonSelect
          disabled={renderEditableInput('Pricing Method')}
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
          disabled={renderEditableInput('Amount')}
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
          {text ? `$${abbreviate(text ?? 0)}` : 0}
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
          {text ? `$${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Contract Price',
      dataIndex: 'contract_price',
      key: 'contract_price',
      width: 135,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$ ${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Contract Status',
      dataIndex: 'contract_status',
      key: 'contract_status',
      width: 135,
      render(text: string, record: any) {
        const status = contractStatusCheck(record);
        return {
          children: (
            <TableNameColumn
              fallbackIcon={
                status === 'success' ? (
                  <CheckCircleIcon width={24} color={token?.colorSuccess} />
                ) : status === 'reject' ? (
                  <XCircleIcon width={24} color={token?.colorError} />
                ) : (
                  <ExclamationCircleIcon
                    width={24}
                    color={token?.colorWarning}
                  />
                )
              }
              iconBg={
                status === 'success'
                  ? token?.colorSuccessBg
                  : status === 'reject'
                    ? token?.colorErrorBg
                    : token?.colorWarningBg
              }
            />
          ),
        };
      },
    },
  ];

  const [finalValidationTableCol, setFinalValidationTableCol] = useState<any>();

  useEffect(() => {
    const newArr: any = [];
    ValidationQuoteLineItemcolumns?.map((itemCol: any) => {
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
    setFinalValidationTableCol(newArr);
  }, [tableColumnDataShow]);

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

  useEffect(() => {
    dispatch(getAllValidationByQuoteId(Number(getQuoteID))).then((d: any) => {
      setValidationDataData(d?.payload);
    });
  }, [getQuoteID]);

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        <OsTableWithOutDrag
          loading={loading}
          columns={finalValidationTableCol}
          dataSource={validationDataData}
          scroll
          locale={locale}
        />
      ) : (
        <EmptyContainer title="There Is No Validation Columns" />
      )}
    </>
  );
};

export default Validation;
