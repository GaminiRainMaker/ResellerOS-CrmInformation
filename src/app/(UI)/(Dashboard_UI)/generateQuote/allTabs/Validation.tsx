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
import { getContractStatus } from '@/app/utils/base';
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
  const { data: contractProductData } = useAppSelector((state) => state.contractProduct);

  useEffect(() => {
    dispatch(getAllContract());
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
      console.log('value', value, record);
      const productCode = record?.product_code;

      // Await the dispatch to get the contract product
      const res = await dispatch(getContractProductByContractVehicle(value));

      // Ensure res?.payload is an array
      const contractProducts = res?.payload || [];
      let obj: { id: number; contract_status: string, contract_vehicle: number, contract_price: string };

      // Find the matched product by contract_product_name
      const matchedProduct = contractProducts.find((item: any) => item.contract_product_name === productCode);
      console.log('contractProductData', matchedProduct, productCode);
      console.log('matchedProduct', matchedProduct)
      // Set contract status based on the matched product
      if (matchedProduct) {
        obj = {
          id: record?.id,
          contract_status: 'Correct',
          contract_vehicle: value,
          contract_price: matchedProduct?.contract_price
        };
      } else {
        obj = {
          id: record?.id,
          contract_status: 'Reject',
          contract_vehicle: value,
          contract_price: ''
        };
      }
      console.log('objobjobj', obj);

      // Dispatch the updated contract status
      const updateRes = await dispatch(updateValidationById(obj));

      if (updateRes?.payload) {
        // Dispatch to get all validation data by quote ID
        await dispatch(getAllValidationByQuoteId(Number(getQuoteID)));
      }
    } catch (error) {
      console.error('Error fetching or updating contract products:', error);
      // Handle the error appropriately (e.g., show error message, retry, etc.)
    }
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

        <OsInput
          disabled={renderEditableInput('Amount')}
          style={{
            height: '36px',
          }}
          value={text}
          onChange={(v) => { }}
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
              isNotification={false}
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

  console.log('contractVehicleOptions', contractVehicleOptions, 'contactData', contactData)

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
