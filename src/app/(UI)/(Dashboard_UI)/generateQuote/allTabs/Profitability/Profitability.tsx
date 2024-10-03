'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
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
import { pricingMethod, selectDataForProduct } from '@/app/utils/CONSTANTS';
import {
  calculateProfitabilityData,
  currencyFormatter,
  getContractStatus,
  useRemoveDollarAndCommahook,
} from '@/app/utils/base';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Badge, Form, notification } from 'antd';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import {
  updateBundleBulk,
  updateBundleQuantity,
} from '../../../../../../../redux/actions/bundle';
import { updateProductFamily } from '../../../../../../../redux/actions/product';
import {
  deleteProfitabilityById,
  getProfitabilityByQuoteId,
  removeBundleLineItems,
  updateProfitabilityById,
  updateProfitabilityValueForBulk,
} from '../../../../../../../redux/actions/profitability';
import { useAppDispatch, useAppSelector } from '../../../../../../../redux/hook';
import BundleSection from '../../BundleSection';
import UpdatingLineItems from '../../UpdatingLineItems';
import OsDrawer from '@/app/components/common/os-drawer';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import { getContractProductByContractVehicle } from '../../../../../../../redux/actions/contractProduct';
import { getAllContract } from '../../../../../../../redux/actions/contract';
import { getContractConfiguartion } from '../../../../../../../redux/actions/contractConfiguration';

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
  validationTab,
}) => {
  const dispatch = useAppDispatch();
  const [BundleForm] = Form.useForm();
  const [token] = useThemeToken();
  const searchParams = useSearchParams()!;
  const getQuoteID = searchParams.get('id');
  const isView = searchParams.get('isView');
  const { data: profitabilityDataByQuoteId, loading } = useAppSelector(
    (state) => state.profitability,
  );

  const [profitibilityDataa, setProfitibilityDataa] = useState<any>()

  const { loading: bundleLoading } = useAppSelector((state) => state.bundle);
  const [finalProfitTableCol, setFinalProfitTableCol] = useState<any>([]);
  const { abbreviate } = useAbbreviationHook(0);
  const [finalData, setFinalData] = useState<any>([]);
  const [finalFieldData, setFinalFieldData] = useState<any>({});
  const [keyPressed, setKeyPressed] = useState('');
  const [showBundleDrawer, setShowBundleDrawer] = useState<boolean>(false);
  const [bundleRecordId, setBundleRecordId] = useState<any>();
  const [pageChange, setPageChange] = useState<any>();
  const { data: contractConfigurationData } = useAppSelector(
    (state) => state.contractConfiguration,
  );
  const { userInformation } = useAppSelector((state) => state.user);
  const { data: contactData } = useAppSelector((state) => state.contract);
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
                  ?.distribu ??
                item?.QuoteLineItem?.QuoteFile?.distributor_name;
            } else if (filterValue === 'OEM') {
              name =
                item?.QuoteLineItem?.QuoteFile?.QuoteConfiguration?.Oem?.oem ??
                item?.QuoteLineItem?.QuoteFile?.oem_name;
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
    let newArrForPaggination: any = [];

    finalData?.map((items: any) => {
      newArrForPaggination?.push({
        name: items?.name,
        current: 1,
        pageSize:
          items?.QuoteLineItem?.length < 11
            ? 10
            : items?.QuoteLineItem?.length < 21
              ? 20
              : items?.QuoteLineItem?.length < 31
                ? 30
                : items?.QuoteLineItem?.length < 31 ||
                  items?.QuoteLineItem?.length < 51
                  ? 50
                  : 100,

        total: 0,
      });
    });
    setPageChange(newArrForPaggination);
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
      dispatch(updateBundleBulk(uniqueBundleData))?.then((payload: any) => {
        if (payload?.payload) {
          dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));

        }
      })

    }
  };

  useEffect(() => {
    dispatch(getAllContract());
    dispatch(getContractConfiguartion({}));
  }, []);

  useEffect(() => {
    dispatch(getProfitabilityByQuoteId(Number(getQuoteID)))?.then((payload: any) => {
      if (payload?.payload) {
        setProfitibilityDataa(payload?.payload)
      }
    })
  }, [getQuoteID]);

  useEffect(() => {
    if (profitibilityDataa && profitibilityDataa.length > 0) {
      filterDataByValue(profitibilityDataa, selectedFilter);
    }
  }, [JSON.stringify(profitibilityDataa), selectedFilter]);

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
    if (isView === 'true') {
      return true;
    } else {
      const editableField = tableColumnDataShow.find(
        (item: any) => item.field_name === field,
      );
      return !editableField?.is_editable;
    }
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
          dispatch(getProfitabilityByQuoteId(Number(getQuoteID)))?.then((payload: any) => {
            if (payload?.payload) {
              setProfitibilityDataa(payload?.payload)
            }
          })
        }
      });
      setKeyPressed('');
      setFinalFieldData({});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleFieldChange = async (
    record: any,
    field: string,
    value: any,
    updatedSelectedFilter: string,
    type: string,
  ) => {
    const updatedRecord = { ...record, [field]: value };
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
    const response: any = await contractVehicleStatus(updatedRecord);

    // Update `updatedRecord` with new bits from the response
    if (response) {
      updatedRecord.contract_price = response.contract_price;
      updatedRecord.contract_status = response.contract_status;
      updatedRecord.contract_vehicle = response.contract_vehicle;
    }

    console.log('updateddata12', response, updatedRecord);

    setFinalFieldData(updatedRecord);
    if (type === 'select') {
      handleSave(updatedRecord);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any, record: any, defaultPageSize: any) => {
      setSelectedRowData(record);
      setSelectedRowIds(selectedRowKeys);
    },
  };

  const [contractVehicleOptions, setContractVehicleOptions] = useState<any>();
  useEffect(() => {
    const contractVehicleOption = contactData
      ?.filter(
        (item: any) => item?.organization === userInformation?.organization,
      )
      .map((option: any) => ({
        label: option?.contract_vehicle_name,
        value: option?.id,
      }));
    setContractVehicleOptions(contractVehicleOption);
  }, [contactData, JSON?.stringify(contactData)]);

  useEffect(() => {
    if (tableColumnDataShow && tableColumnDataShow.length > 0) {

      let validationArr: any = [
        {
          title: 'Contract Vehicle',
          dataIndex: 'contract_vehicle',
          key: 'contract_vehicle',
          width: 200,
          render: (text: string, record: any) => {
            let valueForVeh = text ? Number(text) : null
            return (
              <CommonSelect
                allowClear
                disabled={renderEditableInput('Contract Vehicle')}
                style={{ width: '100%', height: '34px' }}
                placeholder="Select"
                defaultValue={valueForVeh}
                options={contractVehicleOptions}
                onChange={(value) => {
                  handleFieldChange(
                    record,
                    'contract_vehicle',
                    value,
                    selectedFilter,
                    'select',
                  );
                }}
              />

            )
          },
        },
        {
          title: 'Contract Price ($)',
          dataIndex: 'contract_price',
          key: 'contract_price',
          width: 150,
          render: (text: number, record: any) => {
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
            return {
              children: (
                <TableNameColumn
                  fallbackIcon={
                    status === 'success' ? (
                      <CheckCircleIcon width={24} color={token?.colorSuccess} />
                    ) : status === 'warning' ? (
                      <ExclamationCircleIcon width={24} color={token?.colorWarning} />
                    ) : (
                      <XCircleIcon width={24} color={token?.colorError} />
                    )
                  }
                  isNotification={false}
                  iconBg={
                    status === 'success'
                      ? token?.colorSuccessBg
                      : status === 'warning'
                        ? token?.colorWarningBg
                        : token?.colorErrorBg
                  }
                />
              ),
            };
          },
        }
      ]


      const newArr: any = [];
      let newArrForComparision = [...ProfitabilityQuoteLineItemcolumns]
      if (validationTab) {
        validationArr?.map((item: any) => {
          newArrForComparision.push(item)
        })
      }
      newArrForComparision?.forEach((itemCol: any) => {

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
  }, [
    JSON.stringify(tableColumnDataShow),
    contractVehicleOptions,
    contactData,
    finalData,
  ]);

  const ActionColumn = {
    title: 'Action',
    render: (text: string, record: any) => {
      return (
        <TrashIcon
          height={24}
          width={24}
          color={token.colorError}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (isView === 'true') {
              notification.open({
                message: "You can't delete bundle in view mode.",
                type: 'info',
              });
            } else {
              setSelectedRowData([record]);
              setShowRemoveBundleLineItemModal(true);
            }
          }}
        />
      );
    },
    width: 111,
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
        <Typography name="Body 4/Medium" style={{ color: '#0D0D0D' }}>
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
              onClear={() => {
                handleFieldChange(
                  record,
                  'product_family',
                  '',
                  selectedFilter,
                  'select',
                );
              }}
              style={{ width: '200px', height: '36px' }}
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
          style={{ width: '100%', height: '36px' }}
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
        <Typography
          name="Body 4/Medium"
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          {abbreviate(text ?? 0)}
        </Typography>
      ),
    },
    {
      title: 'Extended Price ($)',
      dataIndex: 'exit_price',
      key: 'exit_price',
      sorter: (a: any, b: any) => a.exit_price - b.exit_price,
      width: 190,
      render: (text: number, record: any) => (
        <Typography
          name="Body 4/Medium"
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          ${abbreviate(text) ?? 0}
        </Typography>
      ),
    },
    {
      title: 'Gross Profit ($)',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      sorter: (a: any, b: any) => a.gross_profit - b.gross_profit,
      width: 150,
      render: (text: number, record: any) => (
        <Typography
          name="Body 4/Medium"
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          {abbreviate(text) ?? 0}
        </Typography>
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
        <Typography
          name="Body 4/Medium"
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          {abbreviate(text ?? 0)}
        </Typography>
      ),
    },
  ];

  const updateLineItems = async () => {
    const finalData = selectTedRowData?.map((obj: any) => {
      const newObj = { ...obj };
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
        getProfitabilityByQuoteId(Number(getQuoteID))
      )?.then((payload: any) => {
        if (payload?.payload) {
          setProfitibilityDataa(payload?.payload)
        }
        setSelectedRowData([]);
        setSelectedRowIds([]);
      })
      // if (response.payload) {
      //   setSelectedRowData([]);
      //   setSelectedRowIds([]);
      // }
    }
  };


  const updateLineItems1 = async () => {
    const finalData = selectTedRowData?.map(async (obj: any) => {
      const newObj = JSON.parse(JSON.stringify(obj));      
      console.log('newObj', newObj)

      // Update fields based on profabilityUpdationState
      profabilityUpdationState?.forEach((update: any) => {
        if (newObj.hasOwnProperty(update?.field)) {
          newObj[update?.field] = update?.value;
        }
      });

      // Calculate profitability data
      const profitabilityCalculationData = calculateProfitabilityData(
        newObj.quantity,
        newObj.pricing_method,
        useRemoveDollarAndCommahook(newObj?.line_amount),
        useRemoveDollarAndCommahook(newObj?.adjusted_price),
        useRemoveDollarAndCommahook(newObj?.list_price),
      );

      // Update profitability fields
      newObj.unit_price = profitabilityCalculationData?.unitPrice;
      newObj.exit_price = profitabilityCalculationData?.exitPrice;
      newObj.gross_profit = profitabilityCalculationData?.grossProfit;
      newObj.gross_profit_percentage = profitabilityCalculationData?.grossProfitPercentage;

      // Remove unwanted field
      delete newObj?.profitabilityCalculationData;

      // Call contractVehicleStatus API and update newObj with response values
      const response: any = await contractVehicleStatus(newObj);

      // Update newObj with the response values
      newObj.contract_price = response.contract_price;
      newObj.contract_status = response.contract_status;
      newObj.contract_vehicle = response.contract_vehicle;
      return newObj; // Return the updated object
    });

    // Wait for all promises to resolve
    const resolvedFinalData = await Promise.all(finalData);

    console.log('resolvedFinalData', resolvedFinalData)

    // Find the product family from profabilityUpdationState
    const ProductFamily = profabilityUpdationState?.find(
      (field: any) => field?.field === 'product_family',
    )?.value;

    if (resolvedFinalData?.length > 0) {
      // if (ProductFamily) {
      //   const ids = resolvedFinalData?.map((item: any) => item?.product_id);
      //   let obj = {
      //     id: ids,
      //     product_family: ProductFamily,
      //   };
      //   await dispatch(updateProductFamily(obj));
      // }
      // await dispatch(updateProfitabilityValueForBulk(resolvedFinalData));

      // // Reset state
      // setProfabilityUpdationState([
      //   {
      //     id: 1,
      //     field: null,
      //     value: '',
      //     label: '',
      //   },
      // ]);
      // setShowUpdateLineItemModal(false);

      // // Fetch updated profitability data
      // const response = await dispatch(
      //   getProfitabilityByQuoteId(Number(getQuoteID)),
      // );

      // if (response.payload) {
      //   setSelectedRowData([]);
      //   setSelectedRowIds([]);
      // }
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
      dispatch(getProfitabilityByQuoteId(Number(getQuoteID)))?.then((payload: any) => {
        if (payload?.payload) {
          setProfitibilityDataa(payload?.payload)
        }
      })
    }
  };

  const deleteProfitabityData = () => {
    const Ids: any = selectTedRowData?.map((item: any) => item?.id);
    dispatch(deleteProfitabilityById({ Ids: Ids })).then((d) => {
      if (d?.payload) {
        dispatch(getProfitabilityByQuoteId(Number(getQuoteID)))?.then((payload: any) => {
          if (payload?.payload) {
            setProfitibilityDataa(payload?.payload)
          }
        })
        setIsDeleteProfitabilityModal(false);
        setSelectedRowData([]);
        setSelectedRowIds([]);
      }
    });
  };

  const removeBundleLineItemsFunction = () => {
    const Ids: any = selectTedRowData?.map((item: any) => item?.id);
    if (Ids) {
      dispatch(removeBundleLineItems({ Ids: Ids })).then((d) => {
        if (d?.payload) {
          dispatch(getProfitabilityByQuoteId(Number(getQuoteID)))?.then((payload: any) => {
            if (payload?.payload) {
              setProfitibilityDataa(payload?.payload)
            }
          })
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
                      <Badge
                        count={finalDataItem?.QuoteLineItem?.length}
                        overflowCount={2000}
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
                          style={{ marginLeft: '2px' }}
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
                          style={{ marginLeft: '2px' }}
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
                          style={{ marginLeft: '2px' }}
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
                              disabled={isView === 'true' ? true : false}
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
                              if (isView === 'true') {
                                notification.open({
                                  message:
                                    "You can't edit bundle in view mode.",
                                  type: 'info',
                                });
                              } else {
                                setShowBundleDrawer(true);
                                setBundleRecordId(finalDataItem?.bundleId);
                                BundleForm.setFieldsValue({
                                  name: finalDataItem?.name,
                                  quantity: finalDataItem?.quantity,
                                  description: finalDataItem?.description,
                                });
                              }
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
                      setPageChange={setPageChange}
                      pageChange={pageChange}
                      uniqueId={finalDataItem?.name}
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
            setPageChange={setPageChange}
            pageChange={pageChange}
            uniqueId={nonBundleData?.name}
          />
        )}
      </div>
    );
  };





  const contractVehicleStatus = async (record: any) => {
    try {
      const productCode = record?.product_code;
      const value = record?.contract_vehicle; // Get value from record

      // Initialize the default update object with correct typing for contract_vehicle
      let updateObject: {
        id: number;
        contract_status: string;
        contract_vehicle: number | null;
        contract_price: string;
      } = {
        id: record?.id,
        contract_status: 'Reject', // Default contract status
        contract_vehicle: null,
        contract_price: '',
      };

      // Check if the value is null or undefined and return the updateObject accordingly
      if (value === null || value === undefined) {
        return updateObject; // Exit early and return the default object
      }

      // Fetch the contract products for the given contract vehicle
      const response = await dispatch(
        getContractProductByContractVehicle(value),
      );
      console.log('response', response);

      // Ensure response?.payload is an array, defaulting to an empty array if not
      const contractProducts = response?.payload || [];

      // Check if there's a product matching the current product code
      const matchedProduct = contractProducts.find(
        (item: any) => item.Product?.product_code === productCode,
      );

      console.log('matchedProduct', matchedProduct, contractProducts);

      // If we found a matched product, calculate the contract status
      if (matchedProduct) {
        const finalStatus = contractStatus(record, matchedProduct);
        console.log('finalStatus', finalStatus);

        if (finalStatus) {
          // Update the object with matched product and status
          updateObject = {
            id: record?.id,
            contract_status: finalStatus,
            contract_vehicle: value, // Assigning the number value
            contract_price: matchedProduct?.contract_price || '', // Fallback to empty string if contract price is undefined
          };
        }
      } else {
        // No matched product found, updateObject remains 'Reject' by default
        updateObject = {
          ...updateObject,
          contract_vehicle: value, // Assigning the number value
        };
      }

      console.log('Update Object:', updateObject);

      // Return the final updateObject without making any API calls
      return updateObject;
    } catch (error) {
      console.error('Error fetching contract products:', error);
      // Handle errors if needed, e.g., show an error message or log the error
      return null; // Optionally return null in case of error
    }
  };

  const contractStatus = (record: any, matchedProduct: any) => {
    let fieldName = '';
    let operator = '';
    let finalSecondValue = '';
    let status = '';
    const statuses = ['green', 'yellow'];

    console.log('dasdsad', record, matchedProduct);

    for (let statusCheck of statuses) {
      const matchingObjects =
        contractConfigurationData?.filter(
          (item: any) => item?.contract_status === statusCheck,
        ) || [];

      console.log('dfsdfsdf', matchingObjects, contractConfigurationData);

      if (matchingObjects.length > 0) {
        const finalData =
          matchingObjects?.[0]?.json && JSON?.parse(matchingObjects?.[0]?.json);
        fieldName = finalData?.[0]?.['fieldName'];
        operator = finalData?.[0]?.['operator'];

        // Handle formula valueType
        if (finalData?.[0]?.['valueType'] === 'formula') {
          finalSecondValue = finalData?.[0]?.['value']?.reduce(
            (acc: any, fieldName: any) => {
              const value1 =
                fieldName === 'contract_price'
                  ? matchedProduct?.[fieldName]
                  : record?.[fieldName];
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

        // Check if we can calculate status
        if (operator && record?.[fieldName] && finalSecondValue) {
          status = getContractStatus(
            Number(record?.[fieldName]),
            Number(finalSecondValue),
            operator,
          );
        }

        // Check the status and return accordingly
        if (status === 'Correct') {
          if (statusCheck === 'green') {
            return 'success'; // Return "success" if contract_status is green
          } else if (statusCheck === 'yellow') {
            return 'warning'; // Return "warning" if contract_status is yellow
          }
        }
      }
    }
    console.log('FInalStatus', status);
    return status; // Return the final status if no match was found
  };

  return (
    <GlobalLoader loading={profitibilityDataa?.length < 0}>
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
                                  overflowCount={2000}
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
                                    style={{ marginLeft: '2px' }}
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
                                    style={{ marginLeft: '2px' }}
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
                                    style={{ marginLeft: '2px' }}
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
                                        disabled={
                                          isView === 'true' ? true : false
                                        }
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
                                        if (isView === 'true') {
                                          notification.open({
                                            message:
                                              "You can't edit bundle in view mode.",
                                            type: 'info',
                                          });
                                        } else {
                                          setBundleRecordId(
                                            finalDataItem?.bundleId,
                                          );
                                          BundleForm.setFieldsValue({
                                            name: finalDataItem?.name,
                                            quantity: finalDataItem?.quantity,
                                            description:
                                              finalDataItem?.description,
                                          });
                                          setShowBundleDrawer(true);
                                        }
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
                                setPageChange={setPageChange}
                                pageChange={pageChange}
                                uniqueId={finalDataItem?.name}
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
          subTitle="Please update the columns from the Admin Configuration Tab or request the admin to do so."
        />
      )}

      <OsModal
        title={'Update Line Items'}
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
            setSelectedRowData={setSelectedRowData}
            setShowBundleModal={setShowBundleModal}
            form={BundleForm}
            setSelectedRowIds={setSelectedRowIds}
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
            btnStyle={{ width: '100%' }}
            buttontype="PRIMARY"
            text="Update Changes"
            clickHandler={BundleForm.submit}
          />
        }
      >
        <BundleSection
          selectTedRowIds={selectTedRowIds}
          setSelectedRowData={setSelectedRowData}
          setShowBundleModal={setShowBundleModal}
          form={BundleForm}
          bundleId={bundleRecordId}
          drawer
          setShowBundleDrawer={setShowBundleDrawer}
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
        description="Are you sure you want to delete line item from this Bundle?"
        heading="Delete Line Item from Bundle"
      />
    </GlobalLoader>
  );
};

export default Profitablity;
