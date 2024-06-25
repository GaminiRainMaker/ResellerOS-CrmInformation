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
import BundleSection from '../../bundleSection';
import {
  getAllBundle,
  updateBundleQuantity,
} from '../../../../../../../redux/actions/bundle';

const Bundle: FC<any> = ({
  tableColumnDataShow,
  selectedFilter,
  setShowUpdateLineItemModal,
  showUpdateLineItemModal,
  selectTedRowData,
  setSelectedRowData,
  showBundleModal,
  setShowBundleModal,
  selectTedRowIds,
}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {data: bundleApiData, loading: bundleLoading} = useAppSelector(
    (state) => state.bundle,
  );
  const {loading: profitabilityLoading} = useAppSelector(
    (state) => state.profitability,
  );
  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>();
  const {abbreviate} = useAbbreviationHook(0);
  const [bundleData, setbundleData] = useState<any>();
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

  const updateBundleData = (data: any) => {
    const groupedData = data?.map((bundle: any) => {
      let extendedPrice = 0;
      let grossProft = 0;

      bundle.Profitabilities.forEach((items: any) => {
        if (items?.exit_price) {
          extendedPrice += items.exit_price ? items.exit_price : 0;
        }

        if (items?.gross_profit) {
          grossProft += items.gross_profit ? items.gross_profit : 0;
        }
      });

      let grossProfitPer = 0;
      if (grossProft !== 0 && extendedPrice !== 0) {
        grossProfitPer = (grossProft / extendedPrice) * 100;
      }

      return {
        ...bundle,
        extended_price: extendedPrice * parseInt(bundle.quantity, 10),
        gross_profit: grossProft * parseInt(bundle.quantity, 10),
        gross_profit_percentage: grossProfitPer,
      };
    });

    if (groupedData && typeof groupedData === 'object') {
      setbundleData(Object.values(groupedData));
    }
  };

  useEffect(() => {
    updateBundleData(bundleApiData);
  }, [bundleApiData]);

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

  const rowSelection = {
    onChange: (selectedRowKeys: any, record: any) => {
      setSelectedRowData(record);
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

  const handleFieldChange = (record: any, field: string, value: any) => {
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
    setbundleData((prevData: any) => {
      return prevData.map((data: any) => {
        if (data.Profitabilities) {
          const updatedQuotLine = data.Profitabilities.map((qla: any) => {
            if (qla.id === updatedRecord.id) {
              return updatedRecord;
            } else {
              return qla;
            }
          });
          return {
            ...data,
            Profitabilities: updatedQuotLine,
          };
        } else {
          return {...data};
        }
      });
    });
  };

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
            handleFieldChange(record, 'line_number', e.target.value)
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
          onChange={(e) => handleFieldChange(record, 'quantity', e)}
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
          onChange={(e) => handleFieldChange(record, 'list_price', e)}
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
          onChange={(e) => handleFieldChange(record, 'adjusted_price', e)}
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
                handleFieldChange(record, 'product_family', value);
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
            handleFieldChange(record, 'pricing_method', value);
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
            handleFieldChange(record, 'line_amount', e);
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
    const bundleData = selectTedRowData?.map((obj: any) => {
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

    console.log('bundleDatabundleData', bundleData);

    const ProductFamily = profabilityUpdationState?.find(
      (field: any) => field?.field === 'product_family',
    )?.value;
    if (bundleData?.length > 0) {
      const ids = bundleData?.map((item: any) => item?.product_id);
      let obj = {
        id: ids,
        product_family: ProductFamily,
      };
      await Promise.all(
        bundleData?.map((item: any) => dispatch(updateProfitabilityById(item))),
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
    let extendedPriceUnit = record?.extended_price / record?.quantity;
    let grossProfitUnit = record?.gross_profit / record?.quantity;

    let updatedExtendedPrice = extendedPriceUnit * quantity;
    let updatedGrossProfit = grossProfitUnit * quantity;

    let grossProfitPer = 0;
    if (updatedGrossProfit !== 0 && updatedExtendedPrice !== 0) {
      grossProfitPer = (updatedGrossProfit / updatedExtendedPrice) * 100;
    }

    let obj = {
      id: record?.id,
      quantity: quantity,
      extended_price: updatedExtendedPrice,
      gross_profit: updatedGrossProfit,
      gross_profit_percentage: grossProfitPer,
    };
    if (obj) {
      await dispatch(updateBundleQuantity(obj));
      dispatch(getAllBundle(getQuoteID));
    }
  };

  return (
    <>
      {bundleData?.map((bundleDataItem: any, index: number) => {
        return (
          <OsCollapse
            key={index}
            items={[
              {
                key: index,
                label: (
                  <Space
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p>{bundleDataItem?.name}</p>
                    <p>Lines:{bundleDataItem?.Profitabilities?.length}</p>
                    <p>Desc: {bundleDataItem?.description}</p>
                    <p>
                      Extended Price : ${' '}
                      {abbreviate(bundleDataItem?.extended_price ?? 0.0)}
                    </p>
                    <p>
                      Gross Profit : ${' '}
                      {abbreviate(bundleDataItem?.gross_profit ?? 0.0)}
                    </p>
                    <p>
                      Gross Profit % :{' '}
                      {abbreviate(
                        bundleDataItem?.gross_profit_percentage ?? 0.0,
                      )}
                    </p>
                    <p>
                      Quantity:
                      <OsInputNumber
                        defaultValue={bundleDataItem?.quantity}
                        style={{
                          width: '60px',
                          marginLeft: '3px',
                          height: '36px',
                        }}
                        onKeyDown={(e) => {
                          e.stopPropagation();
                          handleBundleKeyDown(e, bundleDataItem);
                        }}
                        onBlur={(e) => {
                          e.stopPropagation();
                          handleBundleBlur(e, bundleDataItem);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    </p>
                  </Space>
                ),
                children: (
                  <OsTableWithOutDrag
                    loading={bundleLoading || profitabilityLoading}
                    columns={finalProfitTableCol}
                    dataSource={bundleDataItem?.Profitabilities}
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

export default Bundle;
