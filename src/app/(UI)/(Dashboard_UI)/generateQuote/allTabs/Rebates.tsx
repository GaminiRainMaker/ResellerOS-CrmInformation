'use client';
import {Col, Row} from '@/app/components/common/antd/Grid';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapse from '@/app/components/common/os-collapse';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import CommonSelect from '@/app/components/common/os-select';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import Typography from '@/app/components/common/typography';
import {pricingMethod} from '@/app/utils/CONSTANTS';
import {currencyFormatter} from '@/app/utils/base';
import {Badge} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../../redux/hook';

const Rebates: FC<any> = ({
  tableColumnDataShow,
  selectedFilter,
  selectTedRowData,
  setSelectedRowData,
  setSelectedRowIds,
  selectTedRowIds,
}) => {
  const [token] = useThemeToken();
  const {abbreviate} = useAbbreviationHook(0);
  const {data: RebateData, loading} = useAppSelector(
    (state) => state.rebateQuoteLineItem,
  );
  const [rebateFinalData, setRebateFinalData] = useState<any>([]);

  const filterDataByValue = (data: any, filterValue?: string) => {
    const groupedData: any = {};
    const arrayData: any[] = [];
    data &&
      data.length > 0 &&
      data?.forEach((item: any) => {
        let name, description, type;
        if (filterValue) {
          if (filterValue === 'Product Family') {
            name = item?.Product?.product_family || 'Unassigned';
          } else if (filterValue === 'Pricing Method') {
            name = item?.pricing_method || 'Unassigned';
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

          if (!name) {
            return;
          }
          const convertToTitleCase = (input: string) => {
            if (!input) {
              return '';
            }
            return input
              .toLowerCase()
              .replace(/_/g, ' ')
              .replace(/\b\w/g, (char) => char.toUpperCase());
          };
          if (name.includes('_') || name === name.toLowerCase()) {
            name = convertToTitleCase(name);
          }

          if (!groupedData[name]) {
            groupedData[name] = {
              name: name,
              description: description || '',
              type: type,
              QuoteLineItem: [],
              totalExtendedPrice: 0,
              totalGrossProfit: 0,
              totalGrossProfitPercentage: 0,
            };
          }
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
          groupedData[name]?.QuoteLineItem?.push(item);
        } else {
          arrayData.push(item);
        }
      });
    setRebateFinalData(groupedData);
  };

  useEffect(() => {
    if (RebateData && RebateData.length > 0) {
      filterDataByValue(RebateData, selectedFilter);
    }
  }, [JSON.stringify(RebateData), selectedFilter]);

  const renderEditableInput = (field: string) => {
    const editableField = tableColumnDataShow.find(
      (item: any) => item.field_name === field,
    );
    if (editableField?.is_editable) {
      return false;
    }
    return true;
  };

  const RebatesQuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string) => (
        <OsInput
          disabled
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
      render: (text: string, record: any) => (
        <CommonSelect
          disabled
          style={{width: '100%'}}
          placeholder="Select"
          defaultValue={text}
          options={pricingMethod}
        />
      ),
      width: 200,
    },
    {
      title: 'Amount',
      dataIndex: 'line_amount',
      key: 'line_amount',
      width: 121,
      render: (text: string, record: any) => (
        <OsInputNumber
          min={0}
          // onKeyDown={(e) => handleKeyDown(e, record)}
          // onBlur={(e) => handleBlur(record)}
          disabled={renderEditableInput('Amount')}
          style={{
            height: '36px',
            textAlignLast: 'center',
            width: '100%',
          }}
          precision={2}
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          defaultValue={text ?? 0.0}
          onChange={(e) => {
            // handleFieldChange(
            //   record,
            //   'line_amount',
            //   e,
            //   selectedFilter,
            //   'input',
            // );
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
          {text ? `$ ${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Extended Price ($)',
      dataIndex: 'exit_price',
      key: 'exit_price',
      width: 150,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$ ${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Rebate Amount ($)',
      dataIndex: 'rebate_amount',
      key: 'rebate_amount',
      width: 150,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `$ ${abbreviate(text ?? 0)}` : 0}
        </Typography>
      ),
    },
    {
      title: 'Rebate %',
      dataIndex: 'rebate_percentage',
      key: 'rebate_percentage',
      width: 130,
      render: (text: number) => (
        <Typography name="Body 4/Medium">
          {text ? `${abbreviate(text ?? '--')} %` : '--'}
        </Typography>
      ),
    },
  ];

  const [finaRebateTableCol, setFinaRebateTableCol] = useState<any>();

  useEffect(() => {
    const newArr: any = [];
    RebatesQuoteLineItemcolumns?.map((itemCol: any) => {
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
    setFinaRebateTableCol(newArr);
  }, [tableColumnDataShow]);

  const rowSelection = () => {};

  const locale = {
    emptyText: <EmptyContainer title="There is no data for Rebates" />,
  };

  return (
    <>
      {tableColumnDataShow && tableColumnDataShow?.length > 0 ? (
        !selectedFilter ? (
          <div key={JSON.stringify(rebateFinalData)}>
            <OsTableWithOutDrag
              loading={loading}
              columns={finaRebateTableCol}
              dataSource={rebateFinalData}
              scroll
              locale={locale}
              rowSelection={rowSelection}
              selectedRowsKeys={selectTedRowIds}
              defaultPageSize={rebateFinalData?.length}
            />
          </div>
        ) : (
          <>
            {selectedFilter && rebateFinalData?.length > 0 ? (
              <>
                {rebateFinalData?.map((finalDataItem: any, index: number) => {
                  return (
                    <OsCollapse
                      key={index}
                      // activeKey={collapseActiveKeys}
                      onChange={(key: string | string[]) => {
                        // setCollapseActiveKeys(key);
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
                                    style={{padding: '5px 8px 0px 0px'}}
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
                              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <span
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  Ext Price:{' '}
                                  <Typography
                                    name="Body 4/Medium"
                                    color={token?.colorBgContainer}
                                    ellipsis
                                    tooltip
                                    as="div"
                                    style={{marginLeft: '2px'}}
                                  >
                                    $
                                    {abbreviate(
                                      Number(
                                        finalDataItem?.totalExtendedPrice ??
                                          0.0,
                                      ),
                                    )}
                                  </Typography>
                                </span>
                              </Col>
                              <Col xs={24} sm={12} md={12} lg={4} xl={4}>
                                <span
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  GP:{' '}
                                  <Typography
                                    name="Body 4/Medium"
                                    color={token?.colorBgContainer}
                                    ellipsis
                                    tooltip
                                    as="div"
                                    style={{marginLeft: '2px'}}
                                  >
                                    $
                                    {abbreviate(
                                      Number(
                                        finalDataItem?.totalGrossProfit ?? 0.0,
                                      ),
                                    )}
                                  </Typography>
                                </span>
                              </Col>
                              <Col xs={24} sm={10} md={12} lg={4} xl={4}>
                                <span
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  GP%:{' '}
                                  <Typography
                                    name="Body 4/Medium"
                                    color={token?.colorBgContainer}
                                    ellipsis
                                    tooltip
                                    as="div"
                                    style={{marginLeft: '2px'}}
                                  >
                                    {' '}
                                    {abbreviate(
                                      Number(
                                        finalDataItem?.totalGrossProfitPercentage ??
                                          0.0,
                                      ),
                                    )}
                                    %
                                  </Typography>
                                </span>
                              </Col>
                            </Row>
                          ),
                          children: (
                            <div
                              key={JSON.stringify(finalDataItem?.QuoteLineItem)}
                            >
                              <OsTableWithOutDrag
                                loading={loading}
                                columns={finaRebateTableCol}
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
                })}
              </>
            ) : (
              <OsTableWithOutDrag
                loading={loading}
                columns={finaRebateTableCol}
                dataSource={[]}
                scroll
                locale={locale}
                rowSelection={rowSelection}
                selectedRowsKeys={selectTedRowIds}
              />
            )}
          </>
        )
      ) : (
        <EmptyContainer
          title="There is no columns for Rebates"
          subTitle="Please Update from admin Configuration Tab or Request to admin to update the columns."
        />
      )}
    </>
  );
};

export default Rebates;
