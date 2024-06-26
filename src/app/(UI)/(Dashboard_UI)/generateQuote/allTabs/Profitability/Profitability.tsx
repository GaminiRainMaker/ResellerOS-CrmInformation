'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import OsCollapse from '@/app/components/common/os-collapse';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {pricingMethod, selectDataForProduct} from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {updateBundleQuantity} from '../../../../../../../redux/actions/bundle';
import {updateProductFamily} from '../../../../../../../redux/actions/product';
import {
  getProfitabilityByQuoteId,
  updateProfitabilityById,
  updateProfitabilityValueForBulk,
} from '../../../../../../../redux/actions/profitability';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hook';
import UpdatingLineItems from '../../UpdatingLineItems';
import BundleSection from '../../bundleSection';

const Profitablity: FC<any> = ({
  tableColumnDataShow,
  selectedFilter,
  setShowUpdateLineItemModal,
  showUpdateLineItemModal,
  selectTedRowData,
  setSelectedRowData,
  setSelectedRowIds,
  selectTedRowIds,
  setShowBundleModal,
  showBundleModal,
}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {data: profitabilityDataByQuoteId, loading} = useAppSelector(
    (state) => state.profitability,
  );
  const {loading: bundleLoading} = useAppSelector((state) => state.bundle);
  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>();
  const {abbreviate} = useAbbreviationHook(0);
  const [finalData, setFinalData] = useState<any>([]);
  const [finalFieldData, setFinalFieldData] = useState<any>({});
  const [keyPressed, setKeyPressed] = useState('');
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
    const groupedData: any = {};
    const arrayData: any[] = [];
    data?.forEach((item: any) => {
      let name, description, type, quantity, bundleId;
      if (item?.bundle_id || filterValue) {
        if (item?.bundle_id) {
          bundleId = item?.bundle_id;
          name = item?.Bundle?.name;
          description = item?.Bundle?.description;
          quantity = item?.Bundle?.quantity;
          type = 'bundle';
        } else {
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
          type = 'groups';
        }

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
            bundleId: bundleId || null,
            name: name,
            description: description || '',
            quantity: quantity || '',
            type: type,
            QuoteLineItem: [],
            totalExtendedPrice: 0,
            totalGrossProfit: 0,
            totalGrossProfitPercentage: 0,
          };
        }
        if (item?.bundle_id) {
          let extendedPrice = 0;
          let grossProfit = 0;

          if (item?.exit_price) {
            extendedPrice += item.exit_price * quantity || 1;
          }
          if (item?.gross_profit && item.quantity) {
            grossProfit += item.gross_profit * quantity || 1;
          }

          groupedData[name].totalExtendedPrice += extendedPrice;
          groupedData[name].totalGrossProfit += grossProfit;

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
        } else {
          let extendedPrice = 0;
          let grossProfit = 0;

          if (item?.exit_price) {
            extendedPrice += item.exit_price;
          }
          if (item?.gross_profit) {
            grossProfit += item.gross_profit;
          }

          groupedData[name].totalExtendedPrice += extendedPrice;
          groupedData[name].totalGrossProfit += grossProfit;

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
        }
        groupedData[name]?.QuoteLineItem?.push(item);
      } else {
        arrayData.push(item);
      }
    });
    setFinalData([...Object.values(groupedData), ...arrayData]);
  };

  useEffect(() => {
    filterDataByValue(profitabilityDataByQuoteId, selectedFilter);
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

  const handleKeyDown = (e: any, record: any) => {
    if (e.key === 'Enter') {
      setKeyPressed(record?.id);
    }
  };

  const handleBlur = (record: any) => {
    setKeyPressed(record?.id);
  };

  const handleSave = async (record: any) => {
    try {
      dispatch(updateProfitabilityById(record)).then((d: any) => {
        if (d?.payload) {
          dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
        }
      });
      setKeyPressed('');
      setFinalFieldData({});
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
      updatedRecord?.line_amount ?? 0,
      updatedRecord?.adjusted_price ?? 0,
      updatedRecord?.list_price ?? 0,
    );
    if (result) {
      updatedRecord.unit_price = result.unitPrice;
      updatedRecord.exit_price = result.exitPrice;
      updatedRecord.gross_profit = result.grossProfit;
      updatedRecord.gross_profit_percentage = result.grossProfitPercentage;
    }
    setFinalFieldData(updatedRecord);
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
      dataIndex: 'serial_number',
      key: 'serial_number',
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
              'serial_number',
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
          defaultValue={text ?? 0.0}
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
          defaultValue={text ?? 0.0}
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
          defaultValue={text ?? 0.0}
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
      if (ProductFamily) {
        const ids = finalData?.map((item: any) => item?.product_id);
        let obj = {
          id: ids,
          product_family: ProductFamily,
        };
        await dispatch(updateProductFamily(obj));
      }
      await dispatch(updateProfitabilityValueForBulk(finalData));
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
      if (response.payload) {
        setSelectedRowData([]);
        setSelectedRowIds([]);
      }
    }
  };

  const handleBundleKeyDown = (e: any, record: any) => {
    if (e.key === 'Enter') {
      handleBundleSave(e, record);
    }
  };

  const handleBundleBlur = (e: any, record: any) => {
    handleBundleSave(e, record);
  };

  const handleBundleSave = async (e: any, record: any) => {
    let quantity = parseInt(e.target.value, 10);
    let extendedPriceUnit = record?.totalExtendedPrice / record?.quantity;
    let grossProfitUnit = record?.totalGrossProfit / record?.quantity;
    let updatedExtendedPrice = extendedPriceUnit * quantity;
    let updatedGrossProfit = grossProfitUnit * quantity;
    let grossProfitPer = 0;
    if (updatedGrossProfit !== 0 && updatedExtendedPrice !== 0) {
      grossProfitPer = (updatedGrossProfit / updatedExtendedPrice) * 100;
    }
    let obj = {
      id: record?.bundleId,
      quantity: quantity,
      extended_price: updatedExtendedPrice,
      gross_profit: updatedGrossProfit,
      gross_profit_percentage: grossProfitPer,
    };
    if (obj) {
      await dispatch(updateBundleQuantity(obj));
      dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
    }
  };

  const renderFinalData = () => {
    const bundleData = finalData.filter((item: any) => item.type === 'bundle');
    const nonBundleData = finalData.filter(
      (item: any) => item.type !== 'bundle',
    );
    return (
      <div>
        {bundleData.map((finalDataItem: any, index: number) => (
          <OsCollapse
            key={index}
            items={[
              {
                key: index,
                label: (
                  <Row justify="space-between">
                    <Col>
                      <p>{finalDataItem?.name}</p>
                    </Col>
                    <Col>
                      <p>Line Items: {finalDataItem?.QuoteLineItem?.length}</p>
                    </Col>
                    {finalDataItem?.description && (
                      <Col>
                        <p>Desc: {finalDataItem?.description}</p>
                      </Col>
                    )}
                    <Col>
                      <p>
                        Extended Price: $
                        {abbreviate(
                          Number(finalDataItem?.totalExtendedPrice ?? 0.0),
                        )}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        Gross Profit: $
                        {abbreviate(
                          Number(finalDataItem?.totalGrossProfit ?? 0.0),
                        )}
                      </p>
                    </Col>
                    <Col>
                      <p>
                        Gross Profit %:{' '}
                        {abbreviate(
                          Number(
                            finalDataItem?.totalGrossProfitPercentage ?? 0.0,
                          ),
                        )}
                      </p>
                    </Col>
                    {finalDataItem?.type === 'bundle' && (
                      <Col>
                        <span style={{display: 'flex', alignItems: 'center'}}>
                          Qty:
                          <OsInputNumber
                            defaultValue={finalDataItem?.quantity}
                            style={{
                              width: '60px',
                              marginLeft: '3px',
                              height: '36px',
                            }}
                            type="number"
                            min={1}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                              handleBundleKeyDown(e, finalDataItem);
                            }}
                            onBlur={(e) => {
                              e.stopPropagation();
                              handleBundleBlur(e, finalDataItem);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          />
                        </span>
                      </Col>
                    )}
                  </Row>
                ),
                children: (
                  <div key={JSON.stringify(finalDataItem?.QuoteLineItem)}>
                    <OsTableWithOutDrag
                      loading={loading}
                      columns={finalProfitTableCol}
                      dataSource={finalDataItem?.QuoteLineItem}
                      scroll
                      locale={locale}
                      rowSelection={rowSelection}
                      selectedRowsKeys={selectTedRowIds}
                    />
                  </div>
                ),
              },
            ]}
          />
        ))}
        {nonBundleData.length > 0 && (
          <OsTableWithOutDrag
            loading={loading}
            columns={finalProfitTableCol}
            dataSource={nonBundleData}
            scroll
            locale={locale}
            rowSelection={rowSelection}
            selectedRowsKeys={selectTedRowIds}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        !selectedFilter && finalProfitTableCol ? (
          <div key={JSON.stringify(finalData)}>{renderFinalData()}</div>
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
                              <Col>
                                <p>{finalDataItem?.name}</p>
                              </Col>
                              <Col>
                                <p>
                                  Line Items:{' '}
                                  {finalDataItem?.QuoteLineItem?.length}
                                </p>
                              </Col>
                              {finalDataItem?.description && (
                                <Col>
                                  <p>Desc: {finalDataItem?.description}</p>
                                </Col>
                              )}
                              <Col>
                                <p>
                                  Extended Price : ${' '}
                                  {abbreviate(
                                    Number(
                                      finalDataItem?.totalExtendedPrice ?? 0.0,
                                    ),
                                  )}
                                </p>
                              </Col>
                              <Col>
                                <p>
                                  Gross Profit : ${' '}
                                  {abbreviate(
                                    Number(
                                      finalDataItem?.totalGrossProfit ?? 0.0,
                                    ),
                                  )}
                                </p>
                              </Col>
                              <Col>
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
                              {finalDataItem?.type === 'bundle' && (
                                <Col>
                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    Qty:
                                    <OsInputNumber
                                      defaultValue={finalDataItem?.quantity}
                                      style={{
                                        width: '60px',
                                        marginLeft: '3px',
                                        height: '36px',
                                      }}
                                      type="number"
                                      min={1}
                                      onKeyDown={(e) => {
                                        e.stopPropagation();
                                        handleBundleKeyDown(e, finalDataItem);
                                      }}
                                      onBlur={(e) => {
                                        e.stopPropagation();
                                        handleBundleBlur(e, finalDataItem);
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    />
                                  </span>
                                </Col>
                              )}
                            </Row>
                          ),
                          children: (
                            <div
                              key={JSON.stringify(finalDataItem?.QuoteLineItem)}
                            >
                              <OsTableWithOutDrag
                                loading={loading}
                                columns={finalProfitTableCol}
                                dataSource={finalDataItem?.QuoteLineItem}
                                scroll
                                locale={locale}
                                rowSelection={rowSelection}
                                selectedRowsKeys={selectTedRowIds}
                              />
                            </div>
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
        loading={loading}
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

      <OsModal
        loading={bundleLoading}
        body={
          <BundleSection
            selectTedRowIds={selectTedRowIds}
            setShowBundleModal={setShowBundleModal}
          />
        }
        width={700}
        open={showBundleModal}
        onCancel={() => {
          setShowBundleModal((p: boolean) => !p);
        }}
      />
    </>
  );
};

export default Profitablity;
