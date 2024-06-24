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
import {useRemoveDollarAndCommahook} from '@/app/utils/base';
import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';

const Profitability1: FC<any> = ({tableColumnDataShow, selectedFilter}) => {
  const dispatch = useAppDispatch();
  const {data: profitabilityDataByQuoteId} = useAppSelector(
    (state) => state.profitability,
  );
  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>();
  const {abbreviate} = useAbbreviationHook(0);
  const [finalData, setFinalData] = useState<any>();
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const filterDataByValue = (data: any, filterValue?: string) => {
    const groupedData: any = {};
    data?.forEach((item: any) => {
      let name;
      if (filterValue === 'Product Family') {
        name = item?.Product?.product_family || 'Unassigned';
      } else if (filterValue === 'Pricing Method') {
        name = item?.pricing_method;
      } else if (filterValue === 'File Name') {
        name = item?.QuoteLineItem?.QuoteFile?.file_name;
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
          groupedData[name] = {name: name, QuoteLineItem: []};
        }
        groupedData[name]?.QuoteLineItem?.push(item);
      }
    });
    setFinalData(Object.values(groupedData));
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

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setTriggerUpdate((prev) => !prev);
    }
  };

  const handleBlur = () => {
    setTriggerUpdate((prev) => !prev);
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
              // setProfitabilityData((prev: any) =>
              //   prev.map((prevItem: any) => {
              //     if (prevItem.id === record?.id) {
              //       return {...prevItem, quantity: v};
              //     }
              //     return prevItem;
              //   }),
              // );
              // setProfitabilityData((prev: any) =>
              //   prev.map((prevItem: any) => {
              //     if (record?.id === prevItem?.id) {
              //       const rowId = record?.id;
              //       const result: any = calculateProfitabilityData(
              //         prevItem?.quantity,
              //         prevItem?.pricing_method,
              //         useRemoveDollarAndCommahook(prevItem?.line_amount),
              //         useRemoveDollarAndCommahook(prevItem?.adjusted_price),
              //         useRemoveDollarAndCommahook(prevItem?.list_price),
              //       );
              //       return {
              //         ...prevItem,
              //         unit_price: result.unitPrice,
              //         exit_price: result.exitPrice,
              //         gross_profit: result.grossProfit,
              //         gross_profit_percentage: result.grossProfitPercentage,
              //         rowId,
              //       };
              //     }
              //     return prevItem;
              //   }),
              // );
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
              // setProfitabilityData((prev: any) =>
              //   prev.map((prevItem: any) => {
              //     if (prevItem.id === record?.id) {
              //       return {...prevItem, list_price: v.target.value};
              //     }
              //     return prevItem;
              //   }),
              // );
              // setProfitabilityData((prev: any) =>
              //   prev.map((prevItem: any) => {
              //     if (record?.id === prevItem?.id) {
              //       const rowId = record?.id;
              //       const result: any = calculateProfitabilityData(
              //         prevItem?.quantity,
              //         prevItem?.pricing_method,
              //         useRemoveDollarAndCommahook(prevItem?.line_amount),
              //         useRemoveDollarAndCommahook(prevItem?.adjusted_price),
              //         useRemoveDollarAndCommahook(prevItem?.list_price),
              //       );
              //       return {
              //         ...prevItem,
              //         unit_price: result.unitPrice,
              //         exit_price: result.exitPrice,
              //         gross_profit: result.grossProfit,
              //         gross_profit_percentage: result.grossProfitPercentage,
              //         rowId,
              //       };
              //     }
              //     return prevItem;
              //   }),
              // );
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
              // setProfitabilityData((prev: any) =>
              //   prev.map((prevItem: any) => {
              //     if (prevItem.id === record?.id) {
              //       return {...prevItem, adjusted_price: v.target.value};
              //     }
              //     return prevItem;
              //   }),
              // );
              // setProfitabilityData((prev: any) =>
              //   prev.map((prevItem: any) => {
              //     if (record?.id === prevItem?.id) {
              //       const rowId = record?.id;
              //       const result: any = calculateProfitabilityData(
              //         prevItem?.quantity,
              //         prevItem?.pricing_method,
              //         useRemoveDollarAndCommahook(prevItem?.line_amount),
              //         useRemoveDollarAndCommahook(prevItem?.adjusted_price),
              //         useRemoveDollarAndCommahook(prevItem?.list_price),
              //       );
              //       return {
              //         ...prevItem,
              //         unit_price: result.unitPrice,
              //         exit_price: result.exitPrice,
              //         gross_profit: result.grossProfit,
              //         gross_profit_percentage: result.grossProfitPercentage,
              //         rowId,
              //       };
              //     }
              //     return prevItem;
              //   }),
              // );
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
                //   setProfitabilityData((prev: any) =>
                //     prev?.map((prevItem: any) => {
                //       if (prevItem?.id === record?.id) {
                //         return {...prevItem, product_family: e};
                //       }
                //       return prevItem;
                //     }),
                //   );
                //   const data = {id: record?.product_id, product_family: e};
                //   dispatch(updateProductFamily(data));
                //   setTriggerUpdate((prev) => !prev);
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
            //   setProfitabilityData((prev: any) =>
            //     prev.map((prevItem: any) => {
            //       if (prevItem.id === record?.id) {
            //         return {...prevItem, pricing_method: v};
            //       }
            //       return prevItem;
            //     }),
            //   );
            //   setProfitabilityData((prev: any) =>
            //     prev.map((prevItem: any) => {
            //       if (record?.id === prevItem?.id) {
            //         const rowId = record?.id;
            //         const result: any = calculateProfitabilityData(
            //           prevItem?.quantity,
            //           prevItem?.pricing_method,
            //           useRemoveDollarAndCommahook(prevItem?.line_amount),
            //           useRemoveDollarAndCommahook(prevItem?.adjusted_price),
            //           useRemoveDollarAndCommahook(prevItem?.list_price),
            //         );
            //         return {
            //           ...prevItem,
            //           unit_price: result.unitPrice,
            //           exit_price: result.exitPrice,
            //           gross_profit: result.grossProfit,
            //           gross_profit_percentage: result.grossProfitPercentage,
            //           rowId,
            //         };
            //       }
            //       return prevItem;
            //     }),
            //   );
            //   setTriggerUpdate((prev) => !prev);
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
            //   setProfitabilityData((prev: any) =>
            //     prev.map((prevItem: any) => {
            //       if (prevItem.id === record?.id) {
            //         return {...prevItem, line_amount: v.target.value};
            //       }
            //       return prevItem;
            //     }),
            //   );
            //   setProfitabilityData((prev: any) =>
            //     prev.map((prevItem: any) => {
            //       if (record?.id === prevItem?.id) {
            //         const rowId = record?.id;
            //         const result: any = calculateProfitabilityData(
            //           prevItem?.quantity,
            //           prevItem?.pricing_method,
            //           useRemoveDollarAndCommahook(prevItem?.line_amount),
            //           useRemoveDollarAndCommahook(prevItem?.adjusted_price),
            //           useRemoveDollarAndCommahook(prevItem?.list_price),
            //         );
            //         return {
            //           ...prevItem,
            //           unit_price: result.unitPrice,
            //           exit_price: result.exitPrice,
            //           gross_profit: result.grossProfit,
            //           gross_profit_percentage: result.grossProfitPercentage,
            //           rowId,
            //         };
            //       }
            //       return prevItem;
            //     }),
            //   );
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

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        !selectedFilter && finalProfitTableCol ? (
          <>
            <OsTableWithOutDrag
              loading={false}
              columns={finalProfitTableCol}
              dataSource={profitabilityDataByQuoteId}
              scroll
              locale={locale}
            />
          </>
        ) : selectedFilter === 'Vendor/Disti' || selectedFilter === 'OEM' ? (
          <EmptyContainer title={`There is no data for ${selectedFilter}`} />
        ) : (
          <>
            {finalData?.map((finalDataItem: any, index: number) => {
              console.log('QuoteLineItem', finalDataItem);
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
                            justifyContent: 'start',
                          }}
                        >
                          <p>{finalDataItem?.name}</p>
                        </Space>
                      ),
                      children: (
                        <OsTableWithOutDrag
                          loading={false}
                          columns={finalProfitTableCol}
                          dataSource={finalDataItem?.QuoteLineItem}
                          scroll
                          locale={locale}
                          // rowSelection={rowSelection}
                        />
                      ),
                    },
                  ]}
                />
              );
            })}
          </>
        )
      ) : (
        <EmptyContainer
          title="There is no columns for Profitability"
          subTitle="Please Update from admin Configuration Tab or Request to admin to update the columns."
        />
      )}
    </>
  );
};

export default Profitability1;
