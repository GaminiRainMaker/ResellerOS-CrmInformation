'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useAbbreviationHook from '@/app/components/common/hooks/useAbbreviationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
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
  currencyFormatter,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Badge, Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {
  updateBundleBulk,
  updateBundleQuantity,
} from '../../../../../../../redux/actions/bundle';
import {updateProductFamily} from '../../../../../../../redux/actions/product';
import {
  deleteProfitabilityById,
  getProfitabilityByQuoteId,
  removeBundleLineItems,
  updateProfitabilityById,
  updateProfitabilityValueForBulk,
} from '../../../../../../../redux/actions/profitability';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hook';
import BundleSection from '../../BundleSection';
import UpdatingLineItems from '../../UpdatingLineItems';
import OsDrawer from '@/app/components/common/os-drawer';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';

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
  setIsDeleteProfitabilityModal,
  isDeleteProfitabilityModal,
  showRemoveBundleLineItemModal,
  setShowRemoveBundleLineItemModal,
  collapseActiveKeys,
  setCollapseActiveKeys,
}) => {
  const dispatch = useAppDispatch();
  const [BundleForm] = Form.useForm();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const {data: profitabilityDataByQuoteId, loading} = useAppSelector(
    (state) => state.profitability,
  );
  const {loading: bundleLoading} = useAppSelector((state) => state.bundle);
  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>([]);
  const {abbreviate} = useAbbreviationHook(0);
  const [finalData, setFinalData] = useState<any>([]);
  const [finalFieldData, setFinalFieldData] = useState<any>({});
  const [keyPressed, setKeyPressed] = useState('');
  const [showBundleDrawer, setShowBundleDrawer] = useState<boolean>(false);
  const [bundleRecordId, setBundleRecordId] = useState<any>();
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
    const bundleData: any[] = [];
    data &&
      data.length > 0 &&
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
              name = item?.pricing_method || 'Unassigned';
            } else if (filterValue === 'File Name') {
              name = item?.QuoteLineItem?.QuoteFile?.file_name;
            } else if (filterValue === 'Vendor/Disti') {
              name =
                item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Distributor
                  ?.distribu;
            } else if (filterValue === 'OEM') {
              name =
                item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Oem?.oem;
            }
            type = 'groups';
          }
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
              extendedPrice += item.exit_price * (quantity || 1);
            }
            if (item?.gross_profit && item.quantity) {
              grossProfit += item.gross_profit * (quantity || 1);
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

          if (item?.bundle_id) {
            bundleData.push(groupedData[name]);
          }
        } else {
          arrayData.push(item);
        }
      });

    const finalData = [
      ...new Set(bundleData),
      ...Object.values(groupedData).filter(
        (group) => !bundleData.includes(group),
      ),
      ...arrayData,
    ];
    setFinalData(finalData);

    const uniqueBundleData = bundleData
      ?.filter(
        (item: any, index, self) =>
          index === self?.findIndex((t) => t?.bundleId === item?.bundleId),
      )
      ?.map((item) => ({
        id: item.bundleId,
        quantity: item.quantity,
        extended_price: item.totalExtendedPrice,
        gross_profit: item.totalGrossProfit,
        gross_profit_percentage: item.totalGrossProfitPercentage,
      }));

    if (bundleData?.length > 0 && uniqueBundleData) {
      dispatch(updateBundleBulk(uniqueBundleData));
    }
  };

  useEffect(() => {
    dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
  }, [getQuoteID]);

  useEffect(() => {
    if (profitabilityDataByQuoteId && profitabilityDataByQuoteId.length > 0) {
      filterDataByValue(profitabilityDataByQuoteId, selectedFilter);
    }
  }, [JSON.stringify(profitabilityDataByQuoteId), selectedFilter]);

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
    const data = {
      id: record?.product_id,
      product_family: record.product_family,
    };
    try {
      await dispatch(updateProductFamily(data));
      await dispatch(updateProfitabilityById(record)).then((d: any) => {
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
    type: string,
  ) => {
    const updatedRecord = {...record, [field]: value};
    const result: any = calculateProfitabilityData(
      Number(updatedRecord?.quantity),
      updatedRecord?.pricing_method,
      Number(updatedRecord?.line_amount) ?? 0,
      Number(updatedRecord?.adjusted_price) ?? 0,
      Number(updatedRecord?.list_price) ?? 0,
    );
    if (result) {
      updatedRecord.unit_price = result.unitPrice;
      updatedRecord.exit_price = result.exitPrice;
      updatedRecord.gross_profit = result.grossProfit;
      updatedRecord.gross_profit_percentage = result.grossProfitPercentage;
    }
    setFinalFieldData(updatedRecord);
    if (type === 'select') {
      handleSave(updatedRecord);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, record: any) => {
      setSelectedRowData(record);
      setSelectedRowIds(selectedRowKeys);
    },
  };

  useEffect(() => {
    if (tableColumnDataShow && tableColumnDataShow.length > 0) {
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
    }
  }, [JSON.stringify(tableColumnDataShow)]);

  const ActionColumn = {
    title: 'Action',
    render: (text: string, record: any) => {
      return (
        <TrashIcon
          height={24}
          width={24}
          color={token.colorError}
          style={{cursor: 'pointer'}}
          onClick={() => {
            setSelectedRowData([record]);
            setShowRemoveBundleLineItemModal(true);
          }}
        />
      );
    },
    width: 111,
  };

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
              'input',
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
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          defaultValue={text ?? 0.0}
          disabled={renderEditableInput('Quantity')}
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          style={{
            height: '36px',
            textAlignLast: 'right',
          }}
          min={1}
          onChange={(e) =>
            handleFieldChange(record, 'quantity', e, selectedFilter, 'input')
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
          precision={2}
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          disabled={renderEditableInput('MSRP ($)')}
          style={{
            height: '36px',
            textAlignLast: 'right',
            width: '100%',
          }}
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          defaultValue={text ?? 0.0}
          onChange={(e) =>
            handleFieldChange(record, 'list_price', e, selectedFilter, 'input')
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
          precision={2}
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          min={0}
          style={{
            height: '36px',
            textAlignLast: 'right',
            width: '100%',
          }}
          onKeyDown={(e) => handleKeyDown(e, record)}
          onBlur={(e) => handleBlur(record)}
          disabled={renderEditableInput('Cost ($)')}
          defaultValue={text ?? 0.0}
          onChange={(e) =>
            handleFieldChange(
              record,
              'adjusted_price',
              e,
              selectedFilter,
              'input',
            )
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
                  'select',
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
            handleFieldChange(
              record,
              'pricing_method',
              value,
              selectedFilter,
              'select',
            );
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
            textAlignLast: 'center',
            width: '100%',
          }}
          precision={2}
          formatter={currencyFormatter}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          prefix={updateAmountValue(record?.pricing_method)}
          defaultValue={text ?? 0.0}
          onChange={(e) => {
            handleFieldChange(
              record,
              'line_amount',
              e,
              selectedFilter,
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

  const deleteProfitabityData = () => {
    const Ids: any = selectTedRowData?.map((item: any) => item?.id);
    dispatch(deleteProfitabilityById({Ids: Ids})).then((d) => {
      if (d?.payload) {
        dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
        setIsDeleteProfitabilityModal(false);
        setSelectedRowData([]);
        setSelectedRowIds([]);
      }
    });
  };

  const removeBundleLineItemsFunction = () => {
    const Ids: any = selectTedRowData?.map((item: any) => item?.id);
    if (Ids) {
      dispatch(removeBundleLineItems({Ids: Ids})).then((d) => {
        if (d?.payload) {
          dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
          setShowRemoveBundleLineItemModal(false);
          setSelectedRowData([]);
          setSelectedRowIds([]);
        }
      });
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
            activeKey={collapseActiveKeys}
            onChange={(key: string | string[]) => {
              setCollapseActiveKeys(key);
            }}
            items={[
              {
                key: index,
                label: (
                  <Row justify="space-between" align="middle" gutter={[8, 8]}>
                    <Col xs={24} sm={12} md={12} lg={5} xl={5}>
                      <Badge count={finalDataItem?.QuoteLineItem?.length}>
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
                            Number(finalDataItem?.totalExtendedPrice ?? 0.0),
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
                            Number(finalDataItem?.totalGrossProfit ?? 0.0),
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
                              finalDataItem?.totalGrossProfitPercentage ?? 0.0,
                            ),
                          )}
                          %
                        </Typography>
                      </span>
                    </Col>
                    {finalDataItem?.type === 'bundle' && (
                      <>
                        <Col
                          style={{
                            display: 'flex',
                            justifyContent: 'end',
                          }}
                          xs={12}
                          sm={12}
                          md={12}
                          lg={3}
                          xl={3}
                        >
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              marginRight: '10px',
                            }}
                          >
                            Qty:
                            <OsInputNumber
                              defaultValue={finalDataItem?.quantity}
                              style={{
                                width: '60px',
                                marginLeft: '3px',
                                height: '36px',
                                textAlignLast: 'right',
                              }}
                              precision={2}
                              formatter={currencyFormatter}
                              parser={(value) =>
                                value!.replace(/\$\s?|(,*)/g, '')
                              }
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
                          <PencilSquareIcon
                            height={24}
                            width={24}
                            color={token.colorBgContainer}
                            style={{
                              cursor: 'pointer',
                              marginTop: '5px',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowBundleDrawer(true);
                              setBundleRecordId(finalDataItem?.bundleId);
                              BundleForm.setFieldsValue({
                                name: finalDataItem?.name,
                                quantity: finalDataItem?.quantity,
                                description: finalDataItem?.description,
                              });
                            }}
                          />
                        </Col>
                      </>
                    )}
                  </Row>
                ),
                children: (
                  <div key={JSON.stringify(finalDataItem?.QuoteLineItem)}>
                    <OsTableWithOutDrag
                      loading={loading}
                      columns={[...finalProfitTableCol, ActionColumn]}
                      dataSource={finalDataItem?.QuoteLineItem}
                      scroll
                      locale={locale}
                      rowSelection={rowSelection}
                      selectedRowsKeys={selectTedRowIds}
                      defaultPageSize={finalDataItem?.QuoteLineItem?.length}
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
            defaultPageSize={nonBundleData?.length}
          />
        )}
      </div>
    );
  };

  return (
    <GlobalLoader loading={finalData && finalData?.length <= 0}>
      {finalProfitTableCol && finalProfitTableCol?.length > 0 ? (
        !selectedFilter ? (
          <div key={JSON.stringify(finalData)}>{renderFinalData()}</div>
        ) : (
          <>
            {selectedFilter && finalData?.length > 0 ? (
              <>
                {finalData?.map((finalDataItem: any, index: number) => {
                  const isBundle =
                    Array.isArray(finalDataItem?.QuoteLineItem) &&
                    finalDataItem.QuoteLineItem.findIndex(
                      (item: any) => item?.bundle_id,
                    ) > -1;
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
                              {finalDataItem?.type === 'bundle' && (
                                <>
                                  <Col
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'end',
                                    }}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={3}
                                    xl={3}
                                  >
                                    <span
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginRight: '10px',
                                      }}
                                    >
                                      Qty:
                                      <OsInputNumber
                                        defaultValue={finalDataItem?.quantity}
                                        style={{
                                          width: '60px',
                                          marginLeft: '3px',
                                          height: '36px',
                                          textAlignLast: 'right',
                                        }}
                                        precision={2}
                                        formatter={currencyFormatter}
                                        parser={(value) =>
                                          value!.replace(/\$\s?|(,*)/g, '')
                                        }
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
                                    <PencilSquareIcon
                                      height={24}
                                      width={24}
                                      color={token.colorBgContainer}
                                      style={{
                                        cursor: 'pointer',
                                        marginTop: '5px',
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowBundleDrawer(true);
                                        setBundleRecordId(
                                          finalDataItem?.bundleId,
                                        );
                                        BundleForm.setFieldsValue({
                                          name: finalDataItem?.name,
                                          quantity: finalDataItem?.quantity,
                                          description:
                                            finalDataItem?.description,
                                        });
                                      }}
                                    />
                                  </Col>
                                </>
                              )}
                            </Row>
                          ),
                          children: (
                            <div
                              key={JSON.stringify(finalDataItem?.QuoteLineItem)}
                            >
                              <OsTableWithOutDrag
                                loading={loading}
                                columns={
                                  isBundle
                                    ? [...finalProfitTableCol, ActionColumn]
                                    : finalProfitTableCol
                                }
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
            form={BundleForm}
          />
        }
        width={700}
        open={showBundleModal}
        onCancel={() => {
          setShowBundleModal((p: boolean) => !p);
          BundleForm?.resetFields();
        }}
        primaryButtonText={'Save'}
        onOk={BundleForm.submit}
        footerPadding={20}
      />

      <OsDrawer
        title={
          <Typography name="Body 1/Regular" color="#0D0D0D">
            Update Bundle
          </Typography>
        }
        placement="right"
        onClose={() => {
          setShowBundleDrawer(false);
          BundleForm.resetFields();
          setBundleRecordId('');
        }}
        open={showBundleDrawer}
        width={450}
        footer={
          <OsButton
            loading={bundleLoading}
            btnStyle={{width: '100%'}}
            buttontype="PRIMARY"
            text="Update Changes"
            clickHandler={BundleForm.submit}
          />
        }
      >
        <BundleSection
          selectTedRowIds={selectTedRowIds}
          setShowBundleModal={setShowBundleModal}
          form={BundleForm}
          bundleId={bundleRecordId}
          setShowBundleDrawer={setShowBundleDrawer}
          drawer
          setSelectedRowData={setSelectedRowData}
          setSelectedRowIds={setSelectedRowIds}
        />
      </OsDrawer>

      <DeleteModal
        loading={loading}
        setShowModalDelete={setIsDeleteProfitabilityModal}
        setDeleteIds={setSelectedRowIds}
        showModalDelete={isDeleteProfitabilityModal}
        deleteSelectedIds={deleteProfitabityData}
        description="Are you sure you want to delete selected line items?"
        heading="Delete Line Item"
      />
      <DeleteModal
        loading={bundleLoading}
        setShowModalDelete={setShowRemoveBundleLineItemModal}
        setDeleteIds={setSelectedRowIds}
        showModalDelete={showRemoveBundleLineItemModal}
        deleteSelectedIds={removeBundleLineItemsFunction}
        description="Are you sure you want to delete lineItem from this Bundle?"
        heading="Delete LineItem from Bundle"
      />
    </GlobalLoader>
  );
};

export default Profitablity;
