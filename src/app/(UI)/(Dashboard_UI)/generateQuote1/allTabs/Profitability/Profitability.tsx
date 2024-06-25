'use client';

import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import OsCollapse from '@/app/components/common/os-collapse';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {pricingMethod, selectDataForProduct} from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hook';
import {
  getProfitabilityByQuoteId,
  updateProfitabilityById,
} from '../../../../../../../redux/actions/profitability';
import {useSearchParams} from 'next/navigation';
import OsModal from '@/app/components/common/os-modal';
import UpdatingLineItems from '../../UpdatingLineItems';
import {updateProductFamily} from '../../../../../../../redux/actions/product';
import {Col, Row} from '@/app/components/common/antd/Grid';

const Profitablity: FC<any> = ({
  tableColumnDataShow,
  selectedFilter,
  setShowUpdateLineItemModal,
  showUpdateLineItemModal,
  selectTedRowData,
  setSelectedRowData,
  setSelectedRowIds,
}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {data: profitabilityDataByQuoteId, loading} = useAppSelector(
    (state) => state.profitability,
  );
  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>();
  const {abbreviate} = useAbbreviationHook(0);
  const [finalData, setFinalData] = useState<any>();
  const [profabilityUpdationState, setProfabilityUpdationState] = useState<
    Array<{
      id: number;
      value: string | number;
      field: string | null;
      label: string;
    }>
  >([
    {
      id: 1,
      field: null,
      value: '',
      label: '',
    },
  ]);

  const filterDataByValue = (data: any, filterValue?: string) => {
    if (!filterValue) {
      setFinalData(data ? Object.values(data) : []);
      return;
    }

    const groupedData: any = {};
    data?.forEach((item: any) => {
      let name;
      if (filterValue === 'Product Family') {
        name = item?.Product?.product_family || 'Unassigned';
      } else if (filterValue === 'Pricing Method') {
        name = item?.pricing_method;
      } else if (filterValue === 'File Name') {
        name = item?.QuoteLineItem?.QuoteFile?.file_name;
      } else if (filterValue === 'Vendor/Disti') {
        name =
          item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Distributor
            ?.distribu;
      } else if (filterValue === 'OEM') {
        name = item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Oem?.oem;
      }

      if (name) {
        const convertToTitleCase = (input: string) => {
          return input
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char?.toUpperCase());
        };

        if (name?.includes('_') || name === name?.toLowerCase()) {
          name = convertToTitleCase(name);
        }

        if (!groupedData[name]) {
          groupedData[name] = {
            name: name,
            QuoteLineItem: [],
            totalExtendedPrice: 0,
            totalGrossProfit: 0,
            totalGrossProfitPercentage: 0,
          };
        }

        let extendedPrice = 0;
        let grossProfit = 0;

        if (item?.exit_price) {
          extendedPrice += item.exit_price ? item.exit_price : 0;
        }

        if (item?.gross_profit) {
          grossProfit += item.gross_profit ? item.gross_profit : 0;
        }

        const bundleQuantity = parseInt(item?.bundle?.quantity || '1', 10);
        groupedData[name].totalExtendedPrice += extendedPrice * bundleQuantity;
        groupedData[name].totalGrossProfit += grossProfit * bundleQuantity;

        let grossProfitPer = 0;
        if (
          groupedData[name].totalGrossProfit !== 0 &&
          groupedData[name].totalExtendedPrice !== 0
        ) {
          grossProfitPer =
            (groupedData[name].totalGrossProfit /
              groupedData[name].totalExtendedPrice) *
            100;
        }

        groupedData[name].totalGrossProfitPercentage = grossProfitPer;

        groupedData[name]?.QuoteLineItem?.push(item);
      }
    });

    setFinalData(Object.values(groupedData));
  };

  useEffect(() => {
    const withoutBundleData = profitabilityDataByQuoteId?.filter(
      (profitabilityDataByQuoteIdItem: any) =>
        !profitabilityDataByQuoteIdItem?.bundle_id,
    );
    filterDataByValue(withoutBundleData, selectedFilter);
  }, [profitabilityDataByQuoteId, selectedFilter]);

  const locale = {
    emptyText: <EmptyContainer title="There is no data for Profitability" />,
  };

  const updateAmountValue = (pricingMethods: string) => {
    if (['cost_percentage', 'list_percentage', 'gp'].includes(pricingMethods)) {
      return `%`;
    }
    return `$`;
  };

  const renderEditableInput = (field: string) => {
    const editableField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    return !editableField?.is_editable;
  };

  const handleKeyDown = (e: any, record: any) => {
    if (e.key === 'Enter') {
      handleSave(record);
    }
  };

  const handleBlur = (record: any) => {
    handleSave(record);
  };

  const handleSave = async (record: any) => {
    try {
      dispatch(updateProfitabilityById(record)).then((d: any) => {
        if (d?.payload) {
          dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
        }
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleFieldChange = (
    record: any,
    field: string,
    value: any,
    updatedSelectedFilter: string,
  ) => {
    const updatedRecord = {...record, [field]: value};
    const result: any = calculateProfitabilityData(
      updatedRecord?.quantity,
      updatedRecord?.pricing_method,
      updatedRecord?.line_amount,
      updatedRecord?.adjusted_price,
      updatedRecord?.list_price,
    );
    if (result) {
      updatedRecord.unit_price = result.unitPrice;
      updatedRecord.exit_price = result.exitPrice;
      updatedRecord.gross_profit = result.grossProfit;
      updatedRecord.gross_profit_percentage = result.grossProfitPercentage;
    }

    console.log('selectedFilter====', selectedFilter);
    if (!selectedFilter || selectedFilter === undefined) {
      setFinalData((prevData: any) => {
        const newData = prevData?.map((item: any) =>
          item.id === record.id ? updatedRecord : item,
        );
        return newData;
      });
    } else if (selectedFilter) {
      setFinalData((prevData: any) => {
        return prevData.map((data: any) => {
          if (data.QuoteLineItem) {
            const updatedQuotLine = data.QuoteLineItem.map((qla: any) => {
              if (qla.id === updatedRecord.id) {
                return updatedRecord;
              } else {
                return qla;
              }
            });
            return {
              ...data,
              QuoteLineItem: updatedQuotLine,
            };
          } else {
            return {...data};
          }
        });
      });
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, record: any) => {
      setSelectedRowData(record);
      setSelectedRowIds(selectedRowKeys);
    },
  };

  useEffect(() => {
    const newArr: any = [];
    ProfitabilityQuoteLineItemcolumns?.forEach((itemCol: any) => {
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
    setFinalProfitTableCol(newArr);
  }, [tableColumnDataShow]);

  const ProfitabilityQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string, record: any) => (
        <OsInput
          disabled={renderEditableInput('#Line')}
          style={{
            height: '36px',
          }}
          defaultValue={text}
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          onChange={(e) =>
            handleFieldChange(
              record,
              'line_number',
              e.target.value,
              selectedFilter,
            )
          }
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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a: any, b: any) => a.quantity - b.quantity,
      render: (text: string, record: any) => (
        <OsInputNumber
          defaultValue={text}
          disabled={renderEditableInput('Quantity')}
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          style={{
            height: '36px',
          }}
          type="number"
          min={1}
          onChange={(e) =>
            handleFieldChange(record, 'quantity', e, selectedFilter)
          }
        />
      ),
      width: 120,
    },
    {
      title: 'MSRP ($)',
      dataIndex: 'list_price',
      key: 'list_price',
      sorter: (a: any, b: any) => a.list_price - b.list_price,
      render: (text: string, record: any) => (
        <OsInputNumber
          min={0}
          type="number"
          disabled={renderEditableInput('MSRP ($)')}
          style={{
            height: '36px',
          }}
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          defaultValue={text}
          onChange={(e) =>
            handleFieldChange(record, 'list_price', e, selectedFilter)
          }
        />
      ),
      width: 150,
    },
    {
      title: 'Cost ($)',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price ',
      sorter: (a: any, b: any) => a.adjusted_price - b.adjusted_price,
      render: (text: string, record: any) => (
        <OsInputNumber
          min={0}
          style={{
            height: '36px',
          }}
          type="number"
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          disabled={renderEditableInput('Cost ($)')}
          defaultValue={text ?? 0.0}
          onChange={(e) =>
            handleFieldChange(record, 'adjusted_price', e, selectedFilter)
          }
        />
      ),
      width: 150,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 290,
      render: (text: number) => (
        <Typography name="Body 4/Medium" style={{color: '#0D0D0D'}}>
          {text}
        </Typography>
      ),
    },
    {
      title: 'Product Family',
      dataIndex: 'product_family',
      key: 'product_family',
      width: 285,
      render(text: any, record: any) {
        return {
          children: (
            <CommonSelect
              disabled={renderEditableInput('Product Family')}
              allowClear
              style={{width: '200px', height: '36px'}}
              placeholder="Select"
              defaultValue={text ?? record?.Product?.product_family}
              options={selectDataForProduct}
              onChange={(value) => {
                handleFieldChange(
                  record,
                  'product_family',
                  value,
                  selectedFilter,
                );
              }}
            />
          ),
        };
      },
    },
    {
      title: 'Pricing Method',
      dataIndex: 'pricing_method',
      key: 'pricing_method',
      width: 200,
      render: (text: string, record: any) => (
        <CommonSelect
          onBlur={(e) => handleBlur(record)}
          allowClear
          disabled={renderEditableInput('Pricing Method')}
          style={{width: '100%', height: '36px'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(value) => {
            handleFieldChange(record, 'pricing_method', value, selectedFilter);
          }}
          options={pricingMethod}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
      sorter: (a: any, b: any) => a.line_amount - b.line_amount,
      width: 150,
      render: (text: string, record: any) => (
        <OsInputNumber
          min={0}
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          disabled={renderEditableInput('Amount')}
          style={{
            height: '36px',
          }}
          type="number"
          prefix={updateAmountValue(record?.pricing_method)}
          defaultValue={text ? text : 0.0}
          onChange={(e) => {
            console.log('Dataaaa', selectedFilter);
            handleFieldChange(record, 'line_amount', e, selectedFilter);
          }}
        />
      ),
    },
    {
      title: 'Unit Price ($)',
      dataIndex: 'unit_price',
      key: 'unit_price',
      sorter: (a: any, b: any) => a.unit_price - b.unit_price,
      width: 150,
      render: (text: number, record: any) => (
        <Typography name="Body 4/Medium">{abbreviate(text ?? 0)}</Typography>
      ),
    },
    {
      title: 'Extended Price ($)',
      dataIndex: 'exit_price',
      key: 'exit_price',
      sorter: (a: any, b: any) => a.exit_price - b.exit_price,
      width: 190,
      render: (text: number, record: any) => (
        <Typography name="Body 4/Medium">${abbreviate(text) ?? 0}</Typography>
      ),
    },
    {
      title: 'Gross Profit ($)',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      sorter: (a: any, b: any) => a.gross_profit - b.gross_profit,
      width: 150,
      render: (text: number, record: any) => (
        <Typography name="Body 4/Medium">{abbreviate(text) ?? 0}</Typography>
      ),
    },
    {
      title: 'Gross Profit %',
      dataIndex: 'gross_profit_percentage',
      key: 'gross_profit_percentage',
      sorter: (a: any, b: any) =>
        a.gross_profit_percentage - b.gross_profit_percentage,
      width: 150,
      render: (text: number, record: any) => (
        <Typography name="Body 4/Medium">{abbreviate(text ?? 0)}</Typography>
      ),
    },
  ];

  const updateLineItems = async () => {
    const finalData = selectTedRowData?.map((obj: any) => {
      const newObj = {...obj};
      profabilityUpdationState?.forEach((update: any) => {
        if (newObj.hasOwnProperty(update?.field)) {
          newObj[update?.field] = update?.value;
        }
      });
      const profitabilityCalculationData = calculateProfitabilityData(
        newObj.quantity,
        newObj.pricing_method,
        useRemoveDollarAndCommahook(newObj?.line_amount),
        useRemoveDollarAndCommahook(newObj?.adjusted_price),
        useRemoveDollarAndCommahook(newObj?.list_price),
      );
      newObj.unit_price = profitabilityCalculationData?.unitPrice;
      newObj.exit_price = profitabilityCalculationData?.exitPrice;
      newObj.gross_profit = profitabilityCalculationData?.grossProfit;
      newObj.gross_profit_percentage =
        profitabilityCalculationData?.grossProfitPercentage;
      delete newObj?.profitabilityCalculationData;
      return newObj;
    });

    const ProductFamily = profabilityUpdationState?.find(
      (field: any) => field?.field === 'product_family',
    )?.value;
    if (finalData?.length > 0) {
      const ids = finalData?.map((item: any) => item?.product_id);
      let obj = {
        id: ids,
        product_family: ProductFamily,
      };
      await Promise.all(
        finalData?.map((item: any) => dispatch(updateProfitabilityById(item))),
      );
      // await dispatch(updateProfitabilityValueForBulk(updatedData));
      await dispatch(updateProductFamily(obj));
      setProfabilityUpdationState([
        {
          id: 1,
          field: null,
          value: '',
          label: '',
        },
      ]);
      setShowUpdateLineItemModal(false);
      const response = await dispatch(
        getProfitabilityByQuoteId(Number(getQuoteID)),
      );
      const d = response?.payload;
      // if (d) {
      //   setSelectedRowData([]);
      //   setSelectedRowIds([]);
      //   setProfitabilityData(d);
      //   dispatch(setProfitability(d));
      // }
      // setUpdateProfitabilityLoading(false);
    }
  };

  // useEffect(() => {
  //   try {
  //     const updateDataAndFetchProfitability = async () => {
  //       const ProductFamily = profabilityUpdationState?.find(
  //         (field: any) => field?.field === 'product_family',
  //       )?.value;
  //       if (updatedData?.length > 0) {
  //         setUpdateProfitabilityLoading(true);
  //         const ids = updatedData?.map((item: any) => item?.product_id);
  //         let obj = {
  //           id: ids,
  //           product_family: ProductFamily,
  //         };
  //         await Promise.all(
  //           updatedData?.map((item: any) =>
  //             dispatch(updateProfitabilityById(item)),
  //           ),
  //         );
  //         // await dispatch(updateProfitabilityValueForBulk(updatedData));
  //         await dispatch(updateProductFamily(obj));
  //         setProfabilityUpdationState([
  //           {
  //             id: 1,
  //             field: null,
  //             value: '',
  //             label: '',
  //           },
  //         ]);
  //         setShowUpdateLineItemModal(false);
  //         const response = await dispatch(
  //           getProfitabilityByQuoteId(Number(getQuoteID)),
  //         );
  //         const d = response?.payload;
  //         if (d) {
  //           setSelectedRowData([]);
  //           setSelectedRowIds([]);
  //           setProfitabilityData(d);
  //           dispatch(setProfitability(d));
  //         }
  //         setUpdateProfitabilityLoading(false);
  //       }
  //     };
  //     setTimeout(() => {
  //       dispatch(getAllBundle(getQuoteID));
  //     }, 2000);

  //     updateDataAndFetchProfitability();
  //   } catch (err) {
  //     setUpdateProfitabilityLoading(false);
  //     console.log('Error', err);
  //   }
  // }, [updatedData, dispatch, getQuoteID]);

  console.log('FinalDataa', finalData);

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        !selectedFilter && finalProfitTableCol ? (
          <>
            <OsTableWithOutDrag
              loading={loading}
              columns={finalProfitTableCol}
              dataSource={finalData}
              scroll
              locale={locale}
              rowSelection={rowSelection}
            />
          </>
        ) : (
          <>
            {selectedFilter && finalData?.length > 0 ? (
              <>
                {finalData?.map((finalDataItem: any, index: number) => {
                  return (
                    <OsCollapse
                      key={index}
                      items={[
                        {
                          key: index,
                          label: (
                            <Row justify="space-between">
                              <Col span={6}>
                                <p>{finalDataItem?.name}</p>
                              </Col>
                              <Col span={4}>
                                <p>
                                  Line Items:{' '}
                                  {finalDataItem?.QuoteLineItem?.length}
                                </p>
                              </Col>
                              <Col span={4}>
                                <p>
                                  Extended Price : ${' '}
                                  {abbreviate(
                                    Number(
                                      finalDataItem?.totalExtendedPrice ?? 0.0,
                                    ),
                                  )}
                                </p>
                              </Col>
                              <Col span={4}>
                                <p>
                                  Gross Profit : ${' '}
                                  {abbreviate(
                                    Number(
                                      finalDataItem?.totalGrossProfit ?? 0.0,
                                    ),
                                  )}
                                </p>
                              </Col>
                              <Col span={4}>
                                <p>
                                  Gross Profit % :{' '}
                                  {abbreviate(
                                    Number(
                                      finalDataItem?.totalGrossProfitPercentage ??
                                        0.0,
                                    ),
                                  )}
                                </p>
                              </Col>
                            </Row>
                          ),
                          children: (
                            <OsTableWithOutDrag
                              loading={loading}
                              columns={finalProfitTableCol}
                              dataSource={finalDataItem?.QuoteLineItem}
                              scroll
                              locale={locale}
                              rowSelection={rowSelection}
                            />
                          ),
                        },
                      ]}
                    />
                  );
                })}
              </>
            ) : (
              <EmptyContainer
                title={`There is no data for ${selectedFilter}`}
              />
            )}
          </>
        )
      ) : (
        <EmptyContainer
          title="There is no columns for Profitability"
          subTitle="Please Update from admin Configuration Tab or Request to admin to update the columns."
        />
      )}

      <OsModal
        title={'Update LineItems'}
        // loading={loading || updateProfitabilityLoading}
        body={
          <UpdatingLineItems
            profabilityUpdationState={profabilityUpdationState}
            setProfabilityUpdationState={setProfabilityUpdationState}
            tableColumnDataShow={tableColumnDataShow}
          />
        }
        width={700}
        open={showUpdateLineItemModal}
        onOk={() => {
          updateLineItems();
        }}
        onCancel={() => {
          setProfabilityUpdationState([
            {
              id: 1,
              field: null,
              value: '',
              label: '',
            },
          ]);
          setShowUpdateLineItemModal(false);
        }}
        bodyPadding={20}
        primaryButtonText={'Save'}
      />
    </>
  );
};

export default Profitablity;
