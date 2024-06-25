'use client';

import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {dummyValidationData, pricingMethod} from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  getContractStatus,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getContractConfiguartion} from '../../../../../../redux/actions/contractConfiguration';
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
  const {data: contractConfigurationData} = useAppSelector(
    (state) => state.contractConfiguration,
  );
  const {quoteById} = useAppSelector((state) => state.quote);
  const [validationDataData, setValidationDataData] =
    useState<any>(ValidationData);
  const [validationData, setValidationData] =
    useState<any>(dummyValidationData);
  const [contract, setContract] = useState<{
    type: string;
    record: any;
  }>({
    type: '',
    record: {},
  });

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

  const renderRequiredInput = (field: string) => {
    const requiredField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (requiredField?.is_required) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(getContractConfiguartion({}));
  }, []);

  const contractStatus = (record: any) => {
    let fieldName = '';
    let operator = '';
    let finalSecondValue = '';
    let status = '';
    const statuses = ['green', 'yellow', 'red'];

    for (let statusCheck of statuses) {
      const matchingObjects =
        contractConfigurationData &&
        contractConfigurationData?.filter(
          (item: any) => item?.contract_status === statusCheck,
        );

      if (matchingObjects.length > 0) {
        const finalData =
          matchingObjects?.[0]?.json && JSON?.parse(matchingObjects?.[0]?.json);
        fieldName = finalData?.[0]?.['fieldName'];
        operator = finalData?.[0]?.['operator'];

        if (finalData?.[0]?.['valueType'] === 'formula') {
          finalSecondValue = finalData?.[0]['value']?.reduce(
            (acc: any, fieldName: any) => {
              const value1 = record?.[fieldName];
              if (typeof value1 === 'number') {
                return acc + value1; // Add if it's a number
              } else if (typeof value1 === 'string') {
                return acc + value1; // Concatenate if it's a string
              }
              return acc; // Skip if it's neither number nor string
            },
            typeof record?.[finalData?.[0]['value']?.[0]] === 'number' ? 0 : '',
          );
        } else {
          finalSecondValue = finalData?.[0]?.['value'];
        }

        if (operator && record?.[fieldName] && finalSecondValue) {
          status = getContractStatus(
            Number(record?.[fieldName]),
            Number(finalSecondValue),
            operator,
          );
        }

        if (status === 'Correct') {
          break; // Exit loop if status is correct
        }
      }
    }
    return status;
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
      width: 200,
      render: (text: string, record: any) => (
        <CommonSelect
          allowClear
          disabled={renderEditableInput('Pricing Method')}
          style={{width: '100%', height: '34px'}}
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
      title: 'Contract',
      dataIndex: 'contract',
      key: 'contract',
      width: 200,
      render: (text: string, record: any) => (
        <CommonSelect
          allowClear
          style={{width: '100%', height: '34px'}}
          placeholder="Select"
          defaultValue={text}
          // onChange={(v) => {
          //   setValidationDataData((prev: any) =>
          //     prev.map((prevItem: any) => {
          //       if (prevItem.id === record?.id) {
          //         return {...prevItem, pricing_method: v};
          //       }
          //       return prevItem;
          //     }),
          //   );

          //   setValidationDataData((prev: any) =>
          //     prev.map((prevItem: any) => {
          //       if (record?.id === prevItem?.id) {
          //         const rowId = record?.id;
          //         const result: any = calculateProfitabilityData(
          //           useRemoveDollarAndCommahook(prevItem?.quantity),
          //           prevItem?.pricing_method,
          //           useRemoveDollarAndCommahook(prevItem?.line_amount),
          //           useRemoveDollarAndCommahook(prevItem?.list_price),
          //           20,
          //         );
          //         return {
          //           ...prevItem,
          //           unit_price: result.unitPrice,
          //           exit_price: result.exitPrice,
          //           rowId,
          //         };
          //       }
          //       return prevItem;
          //     }),
          //   );
          // }}
          // options={pricingMethod}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
      width: 130,
      render: (text: string, record: any) => (
        <Form.Item
          className="formmarginBottom"
          name={`line_amount ${record?.id}`}
          rules={[
            {
              required: renderRequiredInput('Amount'),
              message: 'This Field id Required',
            },
          ]}
          initialValue={text}
        >
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
        </Form.Item>
      ),
    },
    {
      title: 'Unit Price ($)',
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
      title: 'Extended Price ($)',
      dataIndex: 'exit_price',
      key: 'exit_price',
      width: 190,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Contract Price ($)',
      dataIndex: 'contract_price',
      key: 'contract_price',
      width: 150,
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
      width: 180,
      render(text: string, record: any) {
        const status = contractStatus(record);
        return {
          children: (
            <TableNameColumn
              fallbackIcon={
                status === 'Correct' ? (
                  <CheckCircleIcon width={24} color={token?.colorSuccess} />
                ) : status === 'Reject' ? (
                  <XCircleIcon width={24} color={token?.colorError} />
                ) : (
                  <ExclamationCircleIcon
                    width={24}
                    color={token?.colorWarning}
                  />
                )
              }
              iconBg={
                status === 'Correct'
                  ? token?.colorSuccessBg
                  : status === 'Reject'
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
      let contractPush = false;
      let contractTypePush = false;
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
      if (itemCol?.title === 'Contract') {
        contractPush = true;
      }
      if (contractPush) {
        newArr?.push(itemCol);
      }
      if (itemCol?.title === 'Contract Type') {
        contractTypePush = true;
      }
      if (contractTypePush) {
        newArr?.push(itemCol);
      }
    });
    setFinalValidationTableCol(newArr);
  }, [tableColumnDataShow]);

  useEffect(() => {
    validationDataData?.map((validationDataItem: any) => {
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
          // dataSource={validationDataData}
          dataSource={validationData}
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
