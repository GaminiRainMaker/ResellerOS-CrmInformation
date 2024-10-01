'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapse from '@/app/components/common/os-collapse';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import { pricingMethod } from '@/app/utils/CONSTANTS';
import { currencyFormatter, getContractStatus } from '@/app/utils/base';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Badge, Form } from 'antd';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { getContractConfiguartion } from '../../../../../../redux/actions/contractConfiguration';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hook';
import { getAllContract } from '../../../../../../redux/actions/contract';
import { getContractProductByContractVehicle } from '../../../../../../redux/actions/contractProduct';
import { getAllValidationByQuoteId, updateValidationById } from '../../../../../../redux/actions/validation';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';

const Validation: FC<any> = ({
  tableColumnDataShow,
  selectedFilter,
  selectTedRowData,
  setSelectedRowData,
  setSelectedRowIds,
  selectTedRowIds,
  collapseActiveKeys,
  setCollapseActiveKeys,
}) => {
  const { abbreviate } = useAbbreviationHook(0);
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const getQuoteID = searchParams.get('id');
  const { data: ValidationData, loading } = useAppSelector(
    (state) => state.validation,
  );
  const { data: contractConfigurationData } = useAppSelector(
    (state) => state.contractConfiguration,
  );
  const [validationFinalData, setValidationFinalData] = useState<any>([]);
  const { userInformation } = useAppSelector((state) => state.user);
  const { data: contactData } = useAppSelector((state) => state.contract);
  const [keyPressed, setKeyPressed] = useState('');
  const [finalFieldData, setFinalFieldData] = useState<any>({});

  useEffect(() => {
    dispatch(getAllContract());
    dispatch(getAllValidationByQuoteId(Number(getQuoteID)));

  }, [])

  const contractVehicleOptions = contactData?.filter((item: any) => item?.organization === userInformation?.organization).map((option: any) => ({
    label: option?.contract_vehicle_name,
    value: option?.id
  }));

  const filterDataByValue = (data: any[], filterValue?: string) => {
    const groupedData: { [key: string]: any } = {};
    const arrayData: any[] = [];
    if (!data || data.length === 0) {
      setValidationFinalData([]);
      return;
    }


    const convertToTitleCase = (input: string) => {
      if (!input) return '';
      return input
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    data.forEach((item) => {
      let name: string | undefined;
      let description = '';
      const type = 'groups';

      if (filterValue) {
        switch (filterValue) {
          case 'Product Family':
            name = item?.Product?.product_family || 'Unassigned';
            break;
          case 'Pricing Method':
            name = item?.pricing_method || 'Unassigned';
            break;
          case 'File Name':
            name = item?.QuoteLineItem?.QuoteFile?.file_name;
            break;
          case 'Vendor/Disti':
            name =
              item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Distributor
                ?.distribu;
            break;
          case 'OEM':
            name = item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Oem?.oem;
            break;
          default:
            name = undefined;
        }
        if (!name) return;

        if (name.includes('_') || name === name.toLowerCase()) {
          name = convertToTitleCase(name);
        }



        if (!groupedData[name]) {
          groupedData[name] = {
            name,
            description,
            type,
            QuoteLineItem: [],
            totalExtendedPrice: 0,
            totalGrossProfit: 0,
            totalGrossProfitPercentage: 0,
            totalContractPrice: 0,

          };
        }

        const extendedPrice = item?.exit_price || 0;
        const grossProfit = item?.gross_profit || 0;
        const totalContractPrice = Number(item?.contract_price) || 0;
        groupedData[name].totalExtendedPrice += extendedPrice;
        groupedData[name].totalGrossProfit += grossProfit;
        groupedData[name].totalContractPrice += totalContractPrice;
        groupedData[name].totalGrossProfitPercentage =
          groupedData[name].totalExtendedPrice !== 0
            ? (groupedData[name].totalGrossProfit /
              groupedData[name].totalExtendedPrice) *
            100
            : 0;

        groupedData[name].QuoteLineItem.push(item);
      } else {
        arrayData.push(item);
      }
    });

    const finalData = [...Object.values(groupedData), ...arrayData];
    setValidationFinalData(finalData);
  };

  useEffect(() => {
    if (ValidationData && ValidationData?.length > 0) {
      filterDataByValue(ValidationData, selectedFilter);
    }
  }, [JSON.stringify(ValidationData), selectedFilter]);



  const renderEditableInput = (field: string) => {
    const editableField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (editableField?.is_editable) {
      return false;
    }
    return true;
  };


  const contractVehicleStatus = async (value: number, record: any) => {
    try {
      const productCode = record?.product_code;

      // Fetch the contract products for the given contract vehicle
      const response = await dispatch(getContractProductByContractVehicle(value));

      // Ensure res?.payload is an array, defaulting to an empty array if not
      const contractProducts = response?.payload || [];

      // Check if there's a product matching the current product code
      const matchedProduct = contractProducts.find(
        (item: any) => item.contract_product_name === productCode
      );

      // Initialize the object for the update
      let updateObject = {
        id: record?.id,
        contract_status: 'Reject', // Default to "Reject" if no matched product found
        contract_vehicle: value,
        contract_price: '',
      };

      // If we found a matched product, calculate the contract status
      if (matchedProduct) {
        const finalStatus = contractStatus(record, matchedProduct);
        if (finalStatus) {
          updateObject = {
            id: record?.id,
            contract_status: finalStatus,
            contract_vehicle: value,
            contract_price: matchedProduct?.contract_price || '', // Fallback to empty string if contract price is undefined
          };
        }
      }

      console.log('Update Object:', updateObject);

      // Dispatch to update the contract status
      const updateResponse = await dispatch(updateValidationById(updateObject));

      if (updateResponse?.payload) {
        // Fetch updated validation data for the current quote
        await dispatch(getAllValidationByQuoteId(Number(getQuoteID)));
      }
    } catch (error) {
      console.error('Error fetching or updating contract products:', error);
      // Handle errors appropriately, e.g., show an error message, log, or retry
    }
  };

  const handleFieldChange = (record: any,
    field: string,
    value: any,
    type: string,) => {
    const updatedRecord = { ...record, [field]: value };
    console.log('updatedRecord', updatedRecord)
    setFinalFieldData(updatedRecord)
  }


  const handleKeyDown = (e: any, record: any) => {
    if (e.key === 'Enter') {
      setKeyPressed(record?.id);
    }
  };

  const handleBlur = (record: any) => {
    setKeyPressed(record?.id);
  };


  useEffect(() => {
    if (
      keyPressed &&
      finalFieldData &&
      Object.keys(finalFieldData).length > 0 &&
      keyPressed === finalFieldData?.id
    ) {
      handleSave(finalFieldData);
    }
  }, [keyPressed, finalFieldData]);


  const handleSave = async (record: any) => {
    try {
      await dispatch(updateValidationById(record)).then((d: any) => {
        if (d?.payload) {
          dispatch(getAllValidationByQuoteId(Number(getQuoteID)));
        }
      });
      setKeyPressed('');
      setFinalFieldData({});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

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
          onChange={(v) => { }}
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
          style={{ width: '100%', height: '34px' }}
          placeholder="Select"
          defaultValue={text}
          onChange={(e) => { }}
          options={[]}
        />
      ),
    },
    {
      title: 'Contract',
      dataIndex: 'contract_vehicle',
      key: 'contract_vehicle',
      width: 200,
      render: (text: string, record: any) => (
        <CommonSelect
          allowClear
          style={{ width: '100%', height: '34px' }}
          placeholder="Select"
          defaultValue={text}
          options={contractVehicleOptions}
          onChange={(e) => {
            contractVehicleStatus(e, record)
          }}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
      width: 130,
      render: (text: string, record: any) => (
        <OsInputNumber
          min={0}
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          disabled={renderEditableInput('Amount')}
          style={{
            height: '36px',
            textAlignLast: 'center',
            width: '100%',
          }}
          precision={2}
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          // prefix={updateAmountValue(record?.pricing_method)}
          defaultValue={text ?? 0.0}
          onChange={(e) => {
            handleFieldChange(
              record,
              'line_amount',
              e,
              'input',
            );
          }}
        />
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
      render: (text: number, record: any) => {
        console.log('record', record)
        return <Typography name="Body 4/Medium">
          {text ? `$ ${abbreviate(text ?? 0)}` : 0}
        </Typography>
      }

    },
    {
      title: 'Contract Status',
      dataIndex: 'contract_status',
      key: 'contract_status',
      width: 180,
      render(text: string, record: any) {
        const status = record?.contract_status
        // const status = contractStatus(record);
        return {
          children: (
            <TableNameColumn
              fallbackIcon={
                status === 'success' ? (
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
              isNotification={false}
              iconBg={
                status === 'success'
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
  }, [tableColumnDataShow, contactData]);

  const rowSelection = () => { };

  const locale = {
    emptyText: <EmptyContainer title="There is no data for Validation." />,
  };


  useEffect(() => {
    dispatch(getContractConfiguartion({}));
  }, []);

  const contractStatus = (record: any, matchedProduct: any) => {
    let fieldName = '';
    let operator = '';
    let finalSecondValue = '';
    let status = '';
    const statuses = ['green', 'yellow'];

    for (let statusCheck of statuses) {
      const matchingObjects =
        contractConfigurationData?.filter(
          (item: any) => item?.contract_status === statusCheck,
        ) || [];


      if (matchingObjects.length > 0) {
        const finalData = matchingObjects?.[0]?.json && JSON?.parse(matchingObjects?.[0]?.json);
        fieldName = finalData?.[0]?.['fieldName'];
        operator = finalData?.[0]?.['operator'];

        // Handle formula valueType
        if (finalData?.[0]?.['valueType'] === 'formula') {
          finalSecondValue = finalData?.[0]?.['value']?.reduce(
            (acc: any, fieldName: any) => {
              const value1 = fieldName === 'contract_price' ? matchedProduct?.[fieldName] : record?.[fieldName];
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


        // Check if we can calculate status
        if (operator && record?.[fieldName] && finalSecondValue) {
          status = getContractStatus(
            Number(record?.[fieldName]),
            Number(finalSecondValue),
            operator,
          );
        }

        // Check the status and return accordingly
        if (status === 'Correct') {
          if (statusCheck === 'green') {
            return 'success'; // Return "success" if contract_status is green
          } else if (statusCheck === 'yellow') {
            return 'warning'; // Return "warning" if contract_status is yellow
          }
        }
      }
    }
    return status; // Return the final status if no match was found
  };

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        !selectedFilter ? (
          <div key={JSON.stringify(validationFinalData)}>
            <OsTableWithOutDrag
              loading={loading}
              columns={finalValidationTableCol}
              dataSource={validationFinalData}
              scroll
              locale={locale}
              rowSelection={rowSelection}
              selectedRowsKeys={selectTedRowIds}
              defaultPageSize={validationFinalData?.length}
            />
          </div>
        ) : (
          <>
            {selectedFilter && validationFinalData?.length > 0 ? (
              <>
                {validationFinalData?.map(
                  (finalDataItem: any, index: number) => {
                    return (
                      <OsCollapse
                        key={index}
                        activeKey={collapseActiveKeys}
                        onChange={(key: string | string[]) => {
                          setCollapseActiveKeys(key);
                        }}
                        items={[
                          {
                            key: index,
                            label: (
                              <Row
                                justify="space-between"
                                align="middle"
                                gutter={[8, 8]}
                              >
                                <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                                  <Badge
                                    count={finalDataItem?.QuoteLineItem?.length}
                                  >
                                    <Typography
                                      style={{ padding: '5px 8px 0px 0px' }}
                                      name="Body 4/Medium"
                                      color={token?.colorBgContainer}
                                      ellipsis
                                      tooltip
                                      as="div"
                                      maxWidth={240}
                                    >
                                      {finalDataItem?.name}
                                    </Typography>
                                  </Badge>
                                </Col>
                              </Row>
                            ),
                            children: (
                              <div
                                key={JSON.stringify(
                                  finalDataItem?.QuoteLineItem,
                                )}
                              >
                                <OsTableWithOutDrag
                                  loading={loading}
                                  columns={finalValidationTableCol}
                                  dataSource={finalDataItem?.QuoteLineItem}
                                  scroll
                                  locale={locale}
                                  rowSelection={rowSelection}
                                  selectedRowsKeys={selectTedRowIds}
                                  defaultPageSize={
                                    finalDataItem?.QuoteLineItem?.length
                                  }
                                />
                              </div>
                            ),
                          },
                        ]}
                      />
                    );
                  },
                )}
              </>
            ) : (
              <EmptyContainer
                title={`There is no data for ${selectedFilter}`}
              />
            )}
          </>
        )
      ) : (
        <EmptyContainer title="There Is No Validation Columns" />
      )}
    </>
  );
};

export default Validation;
