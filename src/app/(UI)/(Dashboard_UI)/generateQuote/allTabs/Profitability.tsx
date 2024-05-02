/* eslint-disable arrow-body-style */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import CommonSelect from '@/app/components/common/os-select';
import OsCollapse from '@/app/components/common/os-collapse';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {pricingMethod, selectDataForProduct} from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {Space} from '@/app/components/common/antd/Space';
import {
  getAllBundle,
  updateBundleQuantity,
} from '../../../../../../redux/actions/bundle';
import {updateProductFamily} from '../../../../../../redux/actions/product';
import {
  getProfitabilityByQuoteId,
  updateProfitabilityById,
} from '../../../../../../redux/actions/profitability';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setProfitability} from '../../../../../../redux/slices/profitability';

const Profitability: FC<any> = ({tableColumnDataShow, setSelectedRowIds}) => {
  const dispatch = useAppDispatch();
  const {abbreviate} = useAbbreviationHook(0);
  const {data: bundleData} = useAppSelector((state) => state.bundle);
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {data: profitabilityDataByQuoteId, loading} = useAppSelector(
    (state) => state.profitability,
  );
  const [profitabilityData, setProfitabilityData] = useState<any>();
  const locale = {
    emptyText: <EmptyContainer title="There is no data for Profitability" />,
  };

  useEffect(() => {
    const filteredDataa = profitabilityDataByQuoteId?.filter(
      (item: any) => item?.bundle_id === null,
    );

    setProfitabilityData(filteredDataa);
  }, [profitabilityDataByQuoteId]);

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
    dispatch(getAllBundle(getQuoteID));
  }, [getQuoteID]);

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
    onChange: (selectedRowKeys: any) => {
      setSelectedRowIds(selectedRowKeys);
    },
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

  const ProfitabilityQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string) => (
        <OsInput
          disabled={renderEditableInput('#Line')}
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
      width: 120,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: string, record: any) => (
        <Form.Item
          className="formmarginBottom"
          name={`quantity ${record?.id}`}
          rules={[
            {
              required: renderRequiredInput('Quantity'),
              message: 'This Field id Required',
            },
          ]}
          initialValue={text}
        >
          <OsInputNumber
            disabled={renderEditableInput('Quantity')}
            style={{
              height: '36px',
            }}
            type="number"
            min={1}
            value={text}
            onChange={(v) => {
              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (prevItem.id === record?.id) {
                    return {...prevItem, quantity: v};
                  }
                  return prevItem;
                }),
              );
            }}
          />
        </Form.Item>
      ),
      width: 120,
    },
    {
      title: 'MSRP',
      dataIndex: 'list_price',
      key: 'list_price',
      render: (text: string, record: any) => (
        <Form.Item
          className="formmarginBottom"
          name={`list_price ${record?.id}`}
          rules={[
            {
              required: renderRequiredInput('MSRP'),
              message: 'This Field id Required',
            },
          ]}
          initialValue={text}
        >
          <OsInput
            // type="number"
            disabled={renderEditableInput('MSRP')}
            style={{
              height: '36px',
              borderRadius: '10px',
            }}
            value={text}
            onChange={(v) => {
              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (prevItem.id === record?.id) {
                    return {...prevItem, list_price: v.target.value};
                  }
                  return prevItem;
                }),
              );
            }}
          />
        </Form.Item>
      ),
      width: 120,
    },
    {
      title: 'Cost',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price ',
      render: (text: string, record: any) => (
        <Form.Item
          className="formmarginBottom"
          name={`adjusted_price ${record?.id}`}
          rules={[
            {
              required: renderRequiredInput('Cost'),
              message: 'This Field id Required',
            },
          ]}
          initialValue={text}
        >
          <OsInput
            style={{
              height: '36px',
            }}
            // type="number"
            disabled={renderEditableInput('Cost')}
            value={text ?? 0.0}
            onChange={(v) => {
              setProfitabilityData((prev: any) =>
                prev.map((prevItem: any) => {
                  if (prevItem.id === record?.id) {
                    return {...prevItem, adjusted_price: v.target.value};
                  }
                  return prevItem;
                }),
              );
            }}
          />
        </Form.Item>
      ),
      width: 150,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 277,
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
          // props: {
          //   style: {
          //     background: selectTedRowIds?.includes(record?.id)
          //       ? '#E8EBEE'
          //       : ' ',
          //   },
          // },
          children: (
            <Form.Item
              className="formmarginBottom"
              name={`product_family ${record?.id}`}
              rules={[
                {
                  required: renderRequiredInput('Product Family'),
                  message: 'This Field id Required',
                },
              ]}
              initialValue={text}
            >
              <CommonSelect
                disabled={renderEditableInput('Product Family')}
                allowClear
                style={{width: '200px'}}
                placeholder="Select"
                defaultValue={record?.Product?.product_family}
                options={selectDataForProduct}
                onChange={(e) => {
                  const data = {id: record?.product_id, product_family: e};
                  dispatch(updateProductFamily(data));
                }}
              />
            </Form.Item>
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
        <Form.Item
          className="formmarginBottom"
          name={`pricing_method ${record?.id}`}
          rules={[
            {
              required: renderRequiredInput('Pricing Method'),
              message: 'This Field id Required',
            },
          ]}
          initialValue={text}
        >
          <CommonSelect
            allowClear
            disabled={renderEditableInput('Pricing Method')}
            style={{width: '100%'}}
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
            }}
            options={pricingMethod}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
      width: 150,
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
            // type="number"
            prefix={updateAmountValue(record?.pricing_method)}
            value={text ? useRemoveDollarAndCommahook(text) : 0}
            onChange={(v) => {
              setProfitabilityData((prev: any) =>
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
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      width: 130,
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
      width: 130,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Gross Profit',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      width: 130,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$${abbreviate(text ?? '--')}` : '--'}
        </Typography>
      ),
    },
    {
      title: 'Gross Profit %',
      dataIndex: 'gross_profit_percentage',
      key: 'gross_profit_percentage',
      width: 120,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `${abbreviate(text ?? '--')} %` : '--'}
        </Typography>
      ),
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
    profitabilityData?.map((profitabilityDataItem: any) => {
      if (profitabilityDataItem?.rowId === profitabilityDataItem?.id) {
        const obj = {
          id: profitabilityDataItem?.id,
          line_number: profitabilityDataItem?.line_number,
          quantity: profitabilityDataItem?.quantity,
          // adjusted_price: profitabilityDataItem?.adjusted_price,
          pricing_method: profitabilityDataItem?.pricing_method,
          line_amount: profitabilityDataItem?.line_amount,
          list_price: profitabilityDataItem?.list_price,
          unit_price: profitabilityDataItem?.unit_price,
          exit_price: profitabilityDataItem?.exit_price,
          gross_profit: profitabilityDataItem?.adjusted_price,
          gross_profit_percentage:
            profitabilityDataItem?.gross_profit_percentage,
          adjusted_price: profitabilityDataItem?.adjusted_price,
        };
        dispatch(updateProfitabilityById({...obj}));
      }
    });
    dispatch(setProfitability(profitabilityData));
  }, [profitabilityData]);

  useEffect(() => {
    dispatch(getProfitabilityByQuoteId(Number(getQuoteID))).then((d: any) => {
      setProfitabilityData(d?.payload);
    });
  }, [getQuoteID]);
  console.log('bundleData', bundleData);
  return (
    <>
      {bundleData?.map((item: any) => (
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
                    <p>Lines:{item?.QuoteLineItems?.length}</p>
                    <p>Desc: {item?.description}</p>
                    <p>
                      Quantity:
                      <OsInput
                        defaultValue={item?.quantity}
                        style={{width: '60px'}}
                        onChange={(e: any) => {
                          const data = {
                            id: item?.id,
                            quantity: e.target.value,
                          };
                          updateBundleQuantityData(data);
                        }}
                      />
                    </p>
                  </Space>
                </>
              ),
              // children: item?.children,
              children: (
                <OsTableWithOutDrag
                  loading={loading}
                  // rowSelection={rowSelection}
                  columns={finalProfitTableCol}
                  dataSource={item?.Profitabilities || []}
                  scroll
                  rowSelection={rowSelection}
                  locale={locale}
                />
              ),
            },
          ]}
        />
      ))}{' '}
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        <>
          {/* <Button
            onClick={() => {
              const textResult = convertDataToText(
                ProfitabilityQuoteLineItemcolumns,
                profitabilityData,
              );
              if (textResult) {
                navigator.clipboard.writeText(textResult);
              }
            }}
          >
            Copy Data
          </Button> */}
          <Form>
            <OsTableWithOutDrag
              loading={loading}
              columns={finalProfitTableCol}
              dataSource={profitabilityData?.filter(
                (item: any) => !item?.bundle_id,
              )}
              scroll
              rowSelection={rowSelection}
              locale={locale}
            />
          </Form>
        </>
      ) : (
        <EmptyContainer
          title="There is no columns for Profitability"
          subTitle="Please Update from admin Configuration Tab or Request to admin to update the columns."
        />
      )}
    </>
  );
};

export default Profitability;
