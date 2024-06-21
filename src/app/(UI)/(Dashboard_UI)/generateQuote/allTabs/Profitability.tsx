/* eslint-disable arrow-body-style */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import {Space} from '@/app/components/common/antd/Space';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import OsCollapse from '@/app/components/common/os-collapse';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
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
import {
  getAllBundle,
  updateBundleQuantity,
} from '../../../../../../redux/actions/bundle';
import {updateProductFamily} from '../../../../../../redux/actions/product';
import {
  deleteProfitabilityById,
  getProfitabilityByQuoteId,
  updateProfitabilityById,
} from '../../../../../../redux/actions/profitability';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setProfitability} from '../../../../../../redux/slices/profitability';
import UpdatingLineItems from '../UpdatingLineItems';
import {Input, Pagination} from 'antd';

const Profitability: FC<any> = ({
  tableColumnDataShow,
  setSelectedRowIds,
  selectedFilter,
  setSelectedRowData,
  setIsDeleteProfitabilityModal,
  isDeleteProfitabilityModal,
  selectTedRowIds,
  profitabilityData,
  setProfitabilityData,
  setShowUpdateLineItemModal,
  showUpdateLineItemModal,
  selectTedRowData,
  activeTab,
  familyFilter,
  setFamilyFilter,
}) => {
  const dispatch = useAppDispatch();
  const {abbreviate} = useAbbreviationHook(0);
  const {data: bundleData} = useAppSelector((state) => state.bundle);
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  // const [familyFilter, setFamilyFilter] = useState<any>([]);
  const {data: profitabilityDataByQuoteId, loading} = useAppSelector(
    (state) => state.profitability,
  );
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [newDataForProfit, setNewDataForProfit] = useState<any>([]);
  const [newDataForBundle, setNewDataForBundle] = useState<any>([]);
  const [getTheBundle, setGetTheBundle] = useState<boolean>(false);
  const [updateProfitabilityLoading, setUpdateProfitabilityLoading] =
    useState<boolean>(false);

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
  const [updatedData, setUpdatedData] = useState<any>([]);

  const locale = {
    emptyText: <EmptyContainer title="There is no data for Profitability" />,
  };
  useEffect(() => {
    if (profitabilityData && profitabilityData?.length > 0) {
      let newArrr: any = [...profitabilityData];
      let newSortedValue = newArrr?.sort((a: any, b: any) => {
        return a.id - b.id;
      });
      let FIlteredData = newSortedValue?.filter(
        (item: any) => !item?.bundle_id,
      );

      let newArrForSerialAdd: any = [];
      FIlteredData?.map((items: any, index: number) => {
        newArrForSerialAdd?.push({...items, serialNumber: index + 1});
      });
      setNewDataForProfit(newArrForSerialAdd);
    }
  }, [profitabilityData]);
  useEffect(() => {
    if (bundleData && bundleData?.length > 0) {
      let newArrForBun: any = [];
      let newBundleData = [...bundleData];
      newBundleData?.map((items: any) => {
        let newSortedValue;
        let newObj = {...items};
        if (items?.Profitabilities && items?.Profitabilities?.length > 0) {
          let newSort = [...items?.Profitabilities];

          newSortedValue = newSort?.sort((a: any, b: any) => {
            return a.id - b.id;
          });
          let newArrForSerialAdd: any = [];
          newSort?.map((items: any, index: number) => {
            newArrForSerialAdd?.push({...items, serialNumber: index + 1});
          });
          delete newObj.Profitabilities;
          // For Extended Price
          let extendedPrice: any = 0;
          newSortedValue?.forEach((items) => {
            if (items?.exit_price) {
              extendedPrice += items?.exit_price ? items?.exit_price : 0;
            }
          });
          newObj.extendedPrice = extendedPrice * newObj.quantity;
          // for Gross Profit
          let grossProft: any = 0;
          newSortedValue?.forEach((items) => {
            if (items?.gross_profit) {
              grossProft += items?.gross_profit ? items?.gross_profit : 0;
            }
          });
          console.log('grossProftgrossProft', grossProft, extendedPrice);
          let grossProfitPer: any = 0;
          if (grossProft !== 0 && extendedPrice !== 0) {
            grossProfitPer = (grossProft / extendedPrice) * 100;
          }

          newObj.extendedPrice = extendedPrice * newObj.quantity;
          newObj.grossProfit = grossProft * newObj.quantity;
          newObj.grossPercentage = grossProfitPer;

          newObj.Profitabilities = newArrForSerialAdd;
        }

        newArrForBun?.push(newObj);
      });

      setNewDataForBundle(newArrForBun);
    }
    // Profitabilities
  }, [bundleData]);

  useEffect(() => {
    if (
      activeTab === '2' &&
      profitabilityDataByQuoteId &&
      profitabilityDataByQuoteId?.length > 0
    ) {
      const filteredDataa = profitabilityDataByQuoteId?.filter(
        (item: any) => item?.bundle_id === null,
      );

      setProfitabilityData(filteredDataa);
    }
    dispatch(setProfitability(profitabilityDataByQuoteId));
  }, [profitabilityDataByQuoteId, activeTab]);

  useEffect(() => {
    if (selectedFilter === 'Product Family') {
      const finalFamilyArr: any = [];
      let productsArr: any = [];
      let professionalServiceArr: any = [];
      let maintenanceArr: any = [];
      let subscriptionArr: any = [];
      let unassignedArr: any = [];
      let newArrrExcludedBundle = profitabilityDataByQuoteId?.filter(
        (itemss: any) => !itemss?.bundle_id,
      );
      if (newArrrExcludedBundle && newArrrExcludedBundle?.length > 0) {
        productsArr = newArrrExcludedBundle?.filter(
          (item: any) => item?.Product?.product_family === 'Products',
        );
        professionalServiceArr = newArrrExcludedBundle?.filter(
          (item: any) =>
            item?.Product?.product_family === 'Professional Services',
        );
        maintenanceArr = newArrrExcludedBundle?.filter(
          (item: any) => item?.Product?.product_family === 'Maintenance',
        );
        subscriptionArr = newArrrExcludedBundle?.filter(
          (item: any) => item?.Product?.product_family === 'Subscriptions',
        );
        unassignedArr = newArrrExcludedBundle?.filter(
          (item: any) => item?.Product?.product_family == null,
        );
      }

      if (productsArr && productsArr?.length > 0) {
        const obj: any = {
          name: 'Products',
          QuoteLineItem: productsArr,
        };
        finalFamilyArr?.push(obj);
      }
      if (professionalServiceArr && professionalServiceArr?.length > 0) {
        const obj: any = {
          name: 'Professional Services',
          QuoteLineItem: professionalServiceArr,
        };
        finalFamilyArr?.push(obj);
      }
      if (maintenanceArr && maintenanceArr?.length > 0) {
        const obj: any = {
          name: 'Maintenances',
          QuoteLineItem: maintenanceArr,
        };
        finalFamilyArr?.push(obj);
      }
      if (unassignedArr && subscriptionArr?.length > 0) {
        const obj: any = {
          name: 'Subscriptions',
          QuoteLineItem: subscriptionArr,
        };
        finalFamilyArr?.push(obj);
      }
      if (unassignedArr && unassignedArr?.length > 0) {
        const obj: any = {
          name: 'Unassigned',
          QuoteLineItem: unassignedArr,
        };
        finalFamilyArr?.push(obj);
      }

      setFamilyFilter(finalFamilyArr);
    }
  }, [selectedFilter, profitabilityDataByQuoteId]);

  const updateAmountValue = (pricingMethods: string) => {
    if (
      pricingMethods === 'cost_percentage' ||
      pricingMethods === 'list_percentage' ||
      pricingMethods === 'gp'
    ) {
      return `%`;
    }
    return `$`;
  };

  useEffect(() => {
    if (activeTab === '2') {
      dispatch(getAllBundle(getQuoteID));
    }
  }, [getQuoteID, activeTab]);

  const renderEditableInput = (field: string) => {
    const editableField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (editableField?.is_editable) {
      return false;
    }
    return true;
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, record: any) => {
      setSelectedRowData(record);
      setSelectedRowIds(selectedRowKeys);
    },
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setTriggerUpdate((prev) => !prev);
    }
  };

  const handleBlur = () => {
    setTriggerUpdate((prev) => !prev);
  };

  useEffect(() => {
    profitabilityData?.map((profitabilityDataItem: any) => {
      if (profitabilityDataItem?.rowId === profitabilityDataItem?.id) {
        const obj = {
          id: profitabilityDataItem?.id,
          line_number: profitabilityDataItem?.line_number,
          quantity: profitabilityDataItem?.quantity,
          pricing_method: profitabilityDataItem?.pricing_method,
          line_amount: profitabilityDataItem?.line_amount,
          list_price: profitabilityDataItem?.list_price,
          unit_price: profitabilityDataItem?.unit_price,
          exit_price: profitabilityDataItem?.exit_price,
          gross_profit: profitabilityDataItem?.gross_profit,
          gross_profit_percentage:
            profitabilityDataItem?.gross_profit_percentage,
          adjusted_price: profitabilityDataItem?.adjusted_price,
        };
        dispatch(updateProfitabilityById({...obj})).then((d: any) => {
          if (d?.payload) {
            dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
          }
        });
      }
    });

    dispatch(setProfitability(profitabilityData));
  }, [triggerUpdate]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllBundle(getQuoteID));
      setGetTheBundle(false);
    }, 2000);
  }, [getTheBundle]);

  const ProfitabilityQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'serial_number',
      key: 'serial_number',
      render: (text: string, record: any, index: number) => (
        <OsInput
          disabled={renderEditableInput('#Line')}
          style={{
            height: '36px',
          }}
          value={text}
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

      render: (text: string, record: any) => {
        return (
          <OsInputNumber
            defaultValue={text}
            disabled={renderEditableInput('Quantity')}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            style={{
              height: '36px',
            }}
            // type="number"
            min={1}
            onChange={(v) => {
              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (prevItem.id === record?.id) {
                    return {...prevItem, quantity: v};
                  }
                  return prevItem;
                }),
              );

              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (record?.id === prevItem?.id) {
                    const rowId = record?.id;
                    const result: any = calculateProfitabilityData(
                      prevItem?.quantity,
                      prevItem?.pricing_method,
                      useRemoveDollarAndCommahook(prevItem?.line_amount),
                      useRemoveDollarAndCommahook(prevItem?.adjusted_price),
                      useRemoveDollarAndCommahook(prevItem?.list_price),
                    );
                    return {
                      ...prevItem,
                      unit_price: result.unitPrice,
                      exit_price: result.exitPrice,
                      gross_profit: result.grossProfit,
                      gross_profit_percentage: result.grossProfitPercentage,
                      rowId,
                    };
                  }
                  return prevItem;
                }),
              );
            }}
          />
        );
      },
      width: 120,
    },
    {
      title: 'MSRP ($)',
      dataIndex: 'list_price',
      key: 'list_price',
      sorter: (a: any, b: any) => a.list_price - b.list_price,

      render: (text: string, record: any) => {
        return (
          <OsInput
            // type="number"
            disabled={renderEditableInput('MSRP ($)')}
            style={{
              height: '36px',
              borderRadius: '10px',
            }}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            defaultValue={text}
            onChange={(v) => {
              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (prevItem.id === record?.id) {
                    return {...prevItem, list_price: v.target.value};
                  }
                  return prevItem;
                }),
              );

              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (record?.id === prevItem?.id) {
                    const rowId = record?.id;
                    const result: any = calculateProfitabilityData(
                      prevItem?.quantity,
                      prevItem?.pricing_method,
                      useRemoveDollarAndCommahook(prevItem?.line_amount),
                      useRemoveDollarAndCommahook(prevItem?.adjusted_price),
                      useRemoveDollarAndCommahook(prevItem?.list_price),
                    );
                    return {
                      ...prevItem,
                      unit_price: result.unitPrice,
                      exit_price: result.exitPrice,
                      gross_profit: result.grossProfit,
                      gross_profit_percentage: result.grossProfitPercentage,
                      rowId,
                    };
                  }
                  return prevItem;
                }),
              );
            }}
          />
        );
      },
      width: 150,
    },
    {
      title: 'Cost ($)',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price ',
      sorter: (a: any, b: any) => a.adjusted_price - b.adjusted_price,
      render: (text: string, record: any) => {
        return (
          <OsInput
            style={{
              height: '36px',
            }}
            // type="number"
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={renderEditableInput('Cost ($)')}
            defaultValue={text ?? 0.0}
            onChange={(v) => {
              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (prevItem.id === record?.id) {
                    return {...prevItem, adjusted_price: v.target.value};
                  }
                  return prevItem;
                }),
              );

              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (record?.id === prevItem?.id) {
                    const rowId = record?.id;
                    const result: any = calculateProfitabilityData(
                      prevItem?.quantity,
                      prevItem?.pricing_method,
                      useRemoveDollarAndCommahook(prevItem?.line_amount),
                      useRemoveDollarAndCommahook(prevItem?.adjusted_price),
                      useRemoveDollarAndCommahook(prevItem?.list_price),
                    );
                    return {
                      ...prevItem,
                      unit_price: result.unitPrice,
                      exit_price: result.exitPrice,
                      gross_profit: result.grossProfit,
                      gross_profit_percentage: result.grossProfitPercentage,
                      rowId,
                    };
                  }
                  return prevItem;
                }),
              );
            }}
          />
        );
      },
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
              onChange={(e) => {
                setProfitabilityData((prev: any) =>
                  prev?.map((prevItem: any) => {
                    if (prevItem?.id === record?.id) {
                      return {...prevItem, product_family: e};
                    }
                    return prevItem;
                  }),
                );

                const data = {id: record?.product_id, product_family: e};
                dispatch(updateProductFamily(data));
                setTriggerUpdate((prev) => !prev);
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
          onBlur={handleBlur}
          allowClear
          disabled={renderEditableInput('Pricing Method')}
          style={{width: '100%', height: '36px'}}
          placeholder="Select"
          defaultValue={text}
          onChange={(v) => {
            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, pricing_method: v};
                }
                return prevItem;
              }),
            );

            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (record?.id === prevItem?.id) {
                  const rowId = record?.id;
                  const result: any = calculateProfitabilityData(
                    prevItem?.quantity,
                    prevItem?.pricing_method,
                    useRemoveDollarAndCommahook(prevItem?.line_amount),
                    useRemoveDollarAndCommahook(prevItem?.adjusted_price),
                    useRemoveDollarAndCommahook(prevItem?.list_price),
                  );
                  return {
                    ...prevItem,
                    unit_price: result.unitPrice,
                    exit_price: result.exitPrice,
                    gross_profit: result.grossProfit,
                    gross_profit_percentage: result.grossProfitPercentage,
                    rowId,
                  };
                }
                return prevItem;
              }),
            );
            setTriggerUpdate((prev) => !prev);
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
        <OsInput
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={renderEditableInput('Amount')}
          style={{
            height: '36px',
          }}
          // type="number"
          prefix={updateAmountValue(record?.pricing_method)}
          defaultValue={text ? useRemoveDollarAndCommahook(text) : 0.0}
          onChange={(v) => {
            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, line_amount: v.target.value};
                }
                return prevItem;
              }),
            );
            setProfitabilityData((prev: any) =>
              prev.map((prevItem: any) => {
                if (record?.id === prevItem?.id) {
                  const rowId = record?.id;
                  const result: any = calculateProfitabilityData(
                    prevItem?.quantity,
                    prevItem?.pricing_method,
                    useRemoveDollarAndCommahook(prevItem?.line_amount),
                    useRemoveDollarAndCommahook(prevItem?.adjusted_price),
                    useRemoveDollarAndCommahook(prevItem?.list_price),
                  );
                  return {
                    ...prevItem,
                    unit_price: result.unitPrice,
                    exit_price: result.exitPrice,
                    gross_profit: result.grossProfit,
                    gross_profit_percentage: result.grossProfitPercentage,
                    rowId,
                  };
                }
                return prevItem;
              }),
            );
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
      render: (text: number, record: any) => {
        return (
          <Typography name="Body 4/Medium">{abbreviate(text ?? 0)}</Typography>
        );
      },
    },
    {
      title: 'Extended Price ($)',
      dataIndex: 'exit_price',
      key: 'exit_price',
      sorter: (a: any, b: any) => a.exit_price - b.exit_price,
      width: 190,
      render: (text: number, record: any) => {
        return (
          <Typography name="Body 4/Medium">${abbreviate(text) ?? 0}</Typography>
        );
      },
    },
    {
      title: 'Gross Profit ($)',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      sorter: (a: any, b: any) => a.gross_profit - b.gross_profit,
      width: 150,
      render: (text: number, record: any) => {
        return (
          <Typography name="Body 4/Medium">{abbreviate(text) ?? 0}</Typography>
        );
      },
    },
    {
      title: 'Gross Profit %',
      dataIndex: 'gross_profit_percentage',
      key: 'gross_profit_percentage',
      sorter: (a: any, b: any) =>
        a.gross_profit_percentage - b.gross_profit_percentage,
      width: 150,
      render: (text: number, record: any) => {
        return (
          <Typography name="Body 4/Medium">{abbreviate(text ?? 0)}</Typography>
        );
      },
    },
  ];

  const updateBundleQuantityData = async (data: any) => {
    await dispatch(updateBundleQuantity(data));
    dispatch(getAllBundle(getQuoteID));
  };

  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>();

  useEffect(() => {
    const newArr: any = [];
    ProfitabilityQuoteLineItemcolumns?.map((itemCol: any) => {
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

  useEffect(() => {
    if (bundleData && bundleData?.length > 0) {
      const newArr: any = [];
      ProfitabilityQuoteLineItemcolumns?.map((itemCol: any) => {
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
    }
  }, [newDataForBundle, newDataForProfit]);

  useEffect(() => {
    if (activeTab === '2') {
      dispatch(getProfitabilityByQuoteId(Number(getQuoteID))).then((d: any) => {
        if (d?.payload) {
          // const filteredDataa = d?.payload?.filter(
          //   (item: any) => item?.bundle_id === null,
          // );

          setProfitabilityData(d?.payload);
        }
      });
    }
  }, [getQuoteID, activeTab]);

  const deleteProfitabityData = () => {
    dispatch(deleteProfitabilityById({Ids: selectTedRowIds})).then((d) => {
      if (d?.payload) {
        dispatch(getProfitabilityByQuoteId(Number(getQuoteID))).then(
          (d: any) => {
            if (d?.payload) {
              const filteredDataa = d?.payload?.filter(
                (item: any) => item?.bundle_id === null,
              );

              setProfitabilityData(filteredDataa);
            }
            setIsDeleteProfitabilityModal(false);
          },
        );
      }
    });
  };

  const updateLineItems = () => {
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
    setGetTheBundle(true);
    setSelectedRowData('');
    setSelectedRowIds('');
    setUpdatedData(finalData);
  };

  useEffect(() => {
    try {
      const updateDataAndFetchProfitability = async () => {
        const ProductFamily = profabilityUpdationState?.find(
          (field: any) => field?.field === 'product_family',
        )?.value;
        if (updatedData?.length > 0) {
          setUpdateProfitabilityLoading(true);
          const ids = updatedData?.map((item: any) => item?.product_id);
          let obj = {
            id: ids,
            product_family: ProductFamily,
          };
          // console.log('updatedData', updatedData, 'obj', obj);
          await Promise.all(
            updatedData?.map((item: any) =>
              dispatch(updateProfitabilityById(item)),
            ),
          );
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
          if (d) {
            setSelectedRowData([]);
            setSelectedRowIds([]);
            setProfitabilityData(d);
            dispatch(setProfitability(d));
          }
          setUpdateProfitabilityLoading(false);
        }
      };
      setTimeout(() => {
        dispatch(getAllBundle(getQuoteID));
      }, 2000);

      // dispatch(getAllBundle(getQuoteID));

      updateDataAndFetchProfitability();
    } catch (err) {
      setUpdateProfitabilityLoading(false);
      console.log('Error', err);
    }
  }, [updatedData, dispatch, getQuoteID]);

  return (
    <>
      {newDataForBundle?.length > 0 &&
        newDataForBundle?.map((item: any) => (
          <OsCollapse
            key={item?.id}
            items={[
              {
                key: '1',
                label: (
                  <>
                    <Space
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>{item?.name}</p>
                      <p>Lines:{item?.Profitabilities?.length}</p>
                      <p>Desc: {item?.description}</p>
                      <p>Extended Price : {abbreviate(item?.extendedPrice)}</p>
                      <p>Gross Profit : {abbreviate(item?.grossProfit)}</p>
                      <p>
                        Gross Profit % : {abbreviate(item?.grossPercentage)}
                      </p>
                      <p>
                        Quantity:
                        <Input
                          defaultValue={item?.quantity}
                          style={{width: '60px', marginLeft: '3px'}}
                          onChange={(e: any) => {
                            const data = {
                              id: item?.id,
                              quantity: e.target.value,
                              gross_profit: item?.grossProfit,
                              gross_profit_percentage: item?.grossPercentage,
                              extended_price: item?.extendedPrice,
                            };
                            console.log(
                              '324324324424',
                              item?.grossProfit,
                              item?.grossPercentage,
                              item?.extendedPrice,
                              data,
                            );

                            setTimeout(() => {
                              updateBundleQuantityData(data);
                            }, 1000);
                          }}
                        />
                      </p>
                    </Space>
                  </>
                ),
                children: (
                  <OsTableWithOutDrag
                    loading={loading}
                    columns={finalProfitTableCol}
                    dataSource={item?.Profitabilities || []}
                    scroll
                    rowSelection={rowSelection}
                    locale={locale}
                    pagination={{
                      total: item?.Profitabilities?.length,
                      defaultPageSize: 10,
                      defaultCurrent: 1,
                    }}
                  />
                ),
              },
            ]}
          />
        ))}{' '}
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        <>
          {selectedFilter === 'Product Family' ? (
            <>
              {familyFilter?.map((item: any, index: any) => (
                <OsCollapse
                  key={item?.id || index}
                  items={[
                    {
                      key: item.id,
                      label: (
                        <>
                          <Space
                            style={{
                              display: 'flex',
                              justifyContent: 'start',
                            }}
                          >
                            <p>{item?.name}</p>
                          </Space>
                        </>
                      ),
                      children: (
                        <OsTableWithOutDrag
                          loading={loading}
                          columns={finalProfitTableCol}
                          dataSource={
                            item?.QuoteLineItem?.filter(
                              (itemss: any) => !itemss?.bundle_id,
                            ) || []
                          }
                          scroll
                          rowSelection={rowSelection}
                          locale={locale}
                        />
                      ),
                    },
                  ]}
                />
              ))}
            </>
          ) : (
            <>
              {/* {showTable && ( */}
              <OsTableWithOutDrag
                loading={loading}
                columns={finalProfitTableCol}
                dataSource={newDataForProfit || []}
                scroll
                rowSelection={{
                  ...rowSelection,
                  selectedRowKeys: selectTedRowIds, // Ensure selectedRowKeys is set to selectedRowIds
                }}
                locale={locale}
              />
              {/* )} */}
            </>
          )}
        </>
      ) : (
        <EmptyContainer
          title="There is no columns for Profitability"
          subTitle="Please Update from admin Configuration Tab or Request to admin to update the columns."
        />
      )}
      <DeleteModal
        setShowModalDelete={setIsDeleteProfitabilityModal}
        setDeleteIds={setSelectedRowIds}
        showModalDelete={isDeleteProfitabilityModal}
        deleteSelectedIds={deleteProfitabityData}
        description="Are you sure you want to delete this Profitability?"
        heading="Delete Profitability"
      />
      <OsModal
        title={'Update LineItems'}
        loading={loading || updateProfitabilityLoading}
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

export default Profitability;
