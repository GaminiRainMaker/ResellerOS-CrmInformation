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
import {calculateProfitabilityData} from '@/app/utils/base';
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const filterDataByValue = (data: any, filterValue?: string) => {
    if (!filterValue) {
      setFinalData(Object.values(data));
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
      console.log('handleSave', record);
      // Update the state with the new data
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // const handleBulkUpdate = async (field: string, value: any) => {
  //   try {
  //     console.log('Data1234', field, value);

  //     // const response = await axios.post('/api/bulkUpdateProfitability', {
  //     //   ids: selectedRowKeys,
  //     //   field,
  //     //   value,
  //     // });
  //     // console.log('Bulk data saved successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error saving bulk data:', error);
  //   }
  // };

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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

  console.log('selectedFilter1234', selectedFilter);

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

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        !selectedFilter && finalProfitTableCol ? (
          <>
            <OsTableWithOutDrag
              loading={false}
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
    </>
  );
};

export default Profitability1;
