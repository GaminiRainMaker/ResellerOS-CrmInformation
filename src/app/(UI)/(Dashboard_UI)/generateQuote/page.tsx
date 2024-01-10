/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

'use client';

import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsCollapse from '@/app/components/common/os-collapse';
import OsDrawer from '@/app/components/common/os-drawer';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import {selectData, selectDataForProduct} from '@/app/utils/CONSTANTS';
import {Button, MenuProps} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  getAllBundle,
  updateBundleQuantity,
} from '../../../../../redux/actions/bundle';
import {getAllContractSetting} from '../../../../../redux/actions/contractSetting';
import {updateProductFamily} from '../../../../../redux/actions/product';
import {getProfitabilityByQuoteId} from '../../../../../redux/actions/profitability';
import {
  getQuoteById,
  updateQuoteByQuery,
} from '../../../../../redux/actions/quote';
import {
  DeleteQuoteLineItemQuantityById,
  UpdateQuoteLineItemQuantityById,
  getQuoteLineItemByQuoteId,
  getQuoteLineItemByQuoteIdandBundleIdNull,
  updateQuoteLineItemForBundleId,
} from '../../../../../redux/actions/quotelineitem';
import {getRebateQuoteLineItemByQuoteId} from '../../../../../redux/actions/rebateQuoteLineitem';
import {getAllTableColumn} from '../../../../../redux/actions/tableColumn';
import {getAllValidationByQuoteId} from '../../../../../redux/actions/validation';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import DrawerContent from './DrawerContent';
import InputDetails from './allTabs/InputDetails';
import Metrics from './allTabs/Metrics';
import Profitability from './allTabs/Profitability';
import Rebates from './allTabs/Rebates';
import Validation from './allTabs/Validation';
import GenerateQuoteAnalytics from './analytics';
import BundleSection from './bundleSection';

const GenerateQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const [activeTab, setActiveTab] = useState<any>('1');
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const {
    quoteLineItemByQuoteID,
    data: dataNullForBundle,
    loading,
  } = useAppSelector((state) => state.quoteLineItem);
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>();
  const [amountData, setAmountData] = useState<any>();
  const [getAllItemsQuoteId, setGetAllItemsQuoteId] = useState<React.Key[]>([]);
  const [open, setOpen] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState<boolean>(false);

  const [showTableDataa, setShowTableDataa] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<String>();
  const {data: bundleData} = useAppSelector((state) => state.bundle);
  const [familyFilter, setFamilyFilter] = useState<any>([]);
  const [quoteLineItemByQuoteData, setQuoteLineItemByQuoteData] =
    useState<any>();
  const {data: tableColumnData} = useAppSelector((state) => state.tableColumn);

  const {data: contractSettingData} = useAppSelector(
    (state) => state.contractSetting,
  );

  const [tableColumnDataShow, setTableColumnDataShow] = useState<[]>();

  const [finalInputColumn, setFinalInputColumn] = useState<any>();

  useEffect(() => {
    dispatch(getAllTableColumn(''));
    dispatch(getAllContractSetting(''));
  }, []);

  const deleteQuote = async (id: number) => {
    if (id) {
      const data = {
        Ids: [id],
        bundle_id: null,
      };
      await dispatch(updateQuoteLineItemForBundleId(data));
      dispatch(getQuoteLineItemByQuoteIdandBundleIdNull(Number(getQuoteID)));
      dispatch(getAllBundle(getQuoteID));
    }
  };

  const QuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: any, record: any) => (
        <OsInput
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
          style={{
            height: '36px',
          }}
          placeholder={text}
          value={
            !selectTedRowIds?.includes(record?.id)
              ? text * (record?.Bundle?.quantity ? record?.Bundle?.quantity : 1)
              : quoteLineItemByQuoteData?.line_number
          }
          onChange={(v) => {
            setQuoteLineItemByQuoteData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, line_number: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 130,
    },
    {
      title: 'SKU',
      dataIndex: 'product_code',
      key: 'product_code',
      width: 187,
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: any, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
          // value={
          //   // eslint-disable-next-line no-unsafe-optional-chaining
          //   text *
          //   (!isEditable && record?.Bundle?.quantity
          //     ? record?.Bundle?.quantity
          //     : 1)
          // }
          placeholder={text}
          value={
            !selectTedRowIds?.includes(record?.id)
              ? text * (record?.Bundle?.quantity ? record?.Bundle?.quantity : 1)
              : quoteLineItemByQuoteData?.quantity
          }
          onChange={(v) => {
            setQuoteLineItemByQuoteData((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {...prevItem, quantity: v.target.value};
                }
                return prevItem;
              }),
            );
          }}
        />
      ),
      width: 187,
    },
    {
      title: 'MSRP',
      dataIndex: 'adjusted_price',
      key: 'adjusted_price',
      width: 187,
      render: (text: any, record: any) => {
        let doubleVal: any;

        return <>{record?.Bundle?.quantity ? record?.Bundle?.quantity : 1}</>;
      },
    },
    {
      title: 'Cost',
      dataIndex: 'list_price',
      key: 'list_price',
      width: 187,
      render: (text: any, record: any) => {
        const totalAddedPrice = record?.Product?.list_price
          ?.slice(1, record?.Product?.list_price?.length)
          .replace(',', '');
        // eslint-disable-next-line no-unsafe-optional-chaining
        const ExactPriceForOne = totalAddedPrice / record?.Product?.quantity;
        let bundleQuantity: any = 1;
        bundleQuantity = record?.Bundle ? record?.Bundle?.quantity : 1;
        const totalQuantity = record?.quantity * bundleQuantity;
        const TotalPrice = totalQuantity * ExactPriceForOne;

        return <>${TotalPrice}</>;
      },
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 365,
    },
    {
      title: 'Product Family',
      dataIndex: 'product_family',
      key: 'product_family',
      width: 285,
      render(text: any, record: any) {
        return {
          props: {
            style: {
              background: selectTedRowIds?.includes(record?.id)
                ? '#E8EBEE'
                : ' ',
            },
          },
          children: (
            <CommonSelect
              style={{width: '200px'}}
              placeholder="Select"
              defaultValue={record?.Product?.product_family}
              options={selectDataForProduct}
              onChange={(e) => {
                const data = {id: record?.product_id, product_family: e};
                dispatch(updateProductFamily(data));
              }}
            />
          ),
        };
      },
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PopConfirm
            placement="top"
            title=""
            description="Are you sure to delete this Quote Line Item?"
            onConfirm={() => {
              deleteQuote(record?.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <TrashIcon
              height={24}
              width={24}
              color={token.colorError}
              style={{cursor: 'pointer'}}
            />
          </PopConfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    let tabsname: any;
    if (activeTab == '1') {
      tabsname = 'Input Details';
    } else if (activeTab == '2') {
      tabsname = 'Profitability';
    } else if (activeTab == '3') {
      tabsname = 'Rebates';
    } else if (activeTab == '4') {
      tabsname = 'Validation';
    } else {
      tabsname = 'Input Details';
    }
    let filteredArray: any = [];
    if (tableColumnData && activeTab) {
      filteredArray = tableColumnData?.filter(
        (item: any) => item?.table_name?.includes(tabsname),
      );
    }
    const filterRequired = filteredArray?.filter(
      (item: any) => item?.is_required,
    );
    setTableColumnDataShow(filterRequired);
  }, [activeTab, tableColumnData]);

  // const renderEditableInput = (field: string) => {
  //   const editableField = tableColumnDataShow.find(
  //     (item: any) => item.field_name === field,
  //   );
  //   if (editableField?.is_editable) {
  //     return false;
  //   }
  //   return true;
  // };

  useEffect(() => {
    const newArr: any = [];
    QuoteLineItemcolumns?.map((itemCol: any) => {
      tableColumnDataShow?.filter((item: any) => {
        if (item?.field_name?.includes(itemCol?.title)) {
          newArr?.push(itemCol);
        }
        // else if (itemCol?.dataIndex == 'action') {
        //   newArr?.push(itemCol);
        // }
      });
    });
    // actions
    const finalArr = newArr?.splice(newArr?.length - 1, 1);
    setFinalInputColumn(newArr);
  }, [tableColumnDataShow]);

  useEffect(() => {
    setQuoteLineItemByQuoteData(quoteLineItemByQuoteID);
  }, [quoteLineItemByQuoteID]);

  useEffect(() => {
    if (selectedFilter === 'Product Family') {
      const finalFamilyArr: any = [];
      let productsArr: any = [];
      let professionalServiceArr: any = [];
      let maintenanceArr: any = [];
      let subscriptionArr: any = [];
      let unassignedArr: any = [];

      if (dataNullForBundle?.[0] && dataNullForBundle?.[0]?.length > 0) {
        productsArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family === 'Products',
        );
        professionalServiceArr = dataNullForBundle?.[0]?.filter(
          (item: any) =>
            item?.Product?.product_family === 'Professional Services',
        );
        maintenanceArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family === 'Maintenance',
        );
        subscriptionArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family === 'Subscriptions',
        );
        unassignedArr = dataNullForBundle?.[0]?.filter(
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
  }, [selectedFilter]);

  useEffect(() => {
    if (getQuoteID) dispatch(getQuoteLineItemByQuoteId(Number(getQuoteID)));
    dispatch(getQuoteLineItemByQuoteIdandBundleIdNull(Number(getQuoteID)));
    dispatch(getProfitabilityByQuoteId(Number(getQuoteID)));
    dispatch(getRebateQuoteLineItemByQuoteId(Number(getQuoteID)));
    dispatch(getAllValidationByQuoteId(Number(getQuoteID)));
    dispatch(getQuoteById(Number(getQuoteID)));
  }, [getQuoteID]);

  useEffect(() => {
    dispatch(getAllBundle(getQuoteID));
  }, []);

  useEffect(() => {
    let newObj: any = {};
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let adjustPrice: number = 0;
    let lineAmount: number = 0;
    let quantity: number = 0;
    let listPrice: number = 0;

    if (quoteLineItemByQuoteID && quoteLineItemByQuoteID?.length > 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      quoteLineItemByQuoteID?.map((item: any, index: any) => {
        if (item?.adjusted_price) {
          adjustPrice += parseFloat(
            item?.adjusted_price
              ?.slice(1, item?.adjusted_price?.length)
              .replace(/,/g, ''),
          );
          lineAmount += parseFloat(
            item?.line_amount
              ?.slice(1, item?.line_amount?.length)
              .replace(/,/g, ''),
          );
          listPrice += parseFloat(
            item?.list_price
              ?.slice(1, item?.list_price?.length)
              .replace(/,/g, ''),
          );
          quantity += parseInt(item?.quantity, 10);
        }
      });
    }

    newObj = {
      Quantity: quantity,
      ListPirce: listPrice,
      AdjustPrice: adjustPrice,
      LineAmount: lineAmount,
    };
    setAmountData(newObj);
  }, [quoteLineItemByQuoteID]);

  useEffect(() => {
    const allIdsArray: any = [];
    if (quoteLineItemByQuoteID && quoteLineItemByQuoteID?.length > 0) {
      quoteLineItemByQuoteID?.map((item: any) => {
        if (!allIdsArray?.includes(item?.Quote?.id)) {
          allIdsArray?.push(parseInt(item?.Quote?.id));
        }
      });
    }
    setGetAllItemsQuoteId(allIdsArray);
  }, [quoteLineItemByQuoteID]);

  useEffect(() => {
    let isExist: any;
    const bundleData: any = [];
    const UnAssigned: any = [];
    if (quoteLineItemByQuoteID && quoteLineItemByQuoteID?.length > 0) {
      isExist = quoteLineItemByQuoteID?.find((item: any) => item?.Bundle);
    }

    if (isExist) {
      quoteLineItemByQuoteID?.map((lineItem: any) => {
        let bundleObj: any;
        if (lineItem?.Bundle) {
          if (bundleObj) {
            bundleObj = {
              name: bundleObj.name,
              description: bundleObj.description,
              quantity: bundleObj.quantity,
              quoteLieItem: [...bundleObj.quoteLieItem, ...lineItem],
              bundleId: lineItem?.Bundle.id,
              id: lineItem.id,
            };
          } else {
            bundleObj = {
              name: lineItem?.Bundle?.name,
              description: lineItem?.Bundle?.description,
              quantity: lineItem?.Bundle?.quantity,
              quoteLieItem: [lineItem],
              bundleId: lineItem?.Bundle?.id,
              id: lineItem?.id,
            };
            bundleData?.push(bundleObj);
          }
        } else {
          UnAssigned?.push(lineItem);
        }
      });
    }
  }, [quoteLineItemByQuoteID]);

  const commonUpdateCompleteAndDraftMethod = (queryItem: string) => {
    if (getQuoteID) {
      const data = {
        ids: getQuoteID,
        query: queryItem,
      };
      dispatch(updateQuoteByQuery(data));
    }
    quoteLineItemByQuoteData?.map((prev: any) => {
      if (selectTedRowIds?.includes(prev?.id)) {
        const obj = {
          id: prev?.id,
          quantity: prev?.quantity,
        };
        return dispatch(UpdateQuoteLineItemQuantityById(obj));
      }
    });
    router?.push('/allQuote');
  };

  // const saveUpdate = (queryItem: string) => {
  //   quoteLineItemByQuoteData?.map((prev: any) => {
  //     if (selectTedRowIds?.includes(prev?.id)) {
  //       const obj = {
  //         id: prev?.id,
  //         quantity: prev?.quantity,
  //       };
  //       return dispatch(UpdateQuoteLineItemQuantityById(obj));
  //     }
  //   });
  // };

  const deleteLineItems = () => {
    if (selectTedRowIds) {
      dispatch(DeleteQuoteLineItemQuantityById(selectTedRowIds));
      setSelectedRowIds([]);
      setTimeout(() => {
        dispatch(getQuoteLineItemByQuoteId(Number(getQuoteID)));
      }, 500);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          onClick={() => setShowBundleModal((p) => !p)}
        >
          Bundle Configuration
        </Typography>
      ),
    },
    {
      key: '2',
      label: (
        <Typography name="Body 3/Regular" onClick={() => setIsEditable(true)}>
          Edit Selected
        </Typography>
      ),
    },
    {
      key: '3',
      label: (
        <Typography
          name="Body 3/Regular"
          color={token?.colorError}
          onClick={deleteLineItems}
        >
          Delete
        </Typography>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], data: any) => {
      setSelectedRowKeys(data);
      setSelectedRowIds(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const updateBundleQuantityData = async (data: any) => {
    await dispatch(updateBundleQuantity(data));
    dispatch(getAllBundle(getQuoteID));
  };

  const TabPaneData = [
    {
      key: 1,
      name: 'Input Details',
      children: <InputDetails isEditable={isEditable} />,
    },
    {
      key: 2,
      name: 'Profitability',
      children: (
        <Profitability
          isEditable={isEditable}
          tableColumnDataShow={tableColumnDataShow}
        />
      ),
    },
    {
      key: 3,
      name: 'Rebates',
      children: <Rebates tableColumnDataShow={tableColumnDataShow} />,
    },
    contractSettingData?.show_validation_tab && {
      key: 4,
      name: 'Validation',
      children: <Validation tableColumnDataShow={tableColumnDataShow} />,
    },
    {
      key: 5,
      name: 'Metrics',
      children: (
        <Metrics familyFilter={familyFilter} selectedFilter={selectedFilter} />
      ),
    },
  ].filter(Boolean);

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/allQuote');
          }}
        >
          All Quotes
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography
          name="Heading 3/Medium"
          cursor="pointer"
          color={token?.colorPrimaryText}
          onClick={() => {
            router?.push(`/generateQuote?id=${getQuoteID}`);
          }}
        >
          {quoteLineItemByQuoteID?.[0]?.Quote?.createdAt ?? ''}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <GenerateQuoteAnalytics
          quoteLineItemByQuoteID={quoteLineItemByQuoteID}
          amountData={amountData}
        />

        <Row justify="space-between" align="middle">
          <Col>
            <OsBreadCrumb items={menuItems} />
          </Col>
          <Col>
            <Space size={8} direction="horizontal">
              <OsButton
                text="Edit Quote Header"
                buttontype="SECONDARY"
                clickHandler={showDrawer}
              />
              <OsButton
                text="Save"
                buttontype="SECONDARY"
                clickHandler={() => {
                  commonUpdateCompleteAndDraftMethod('drafted');
                }}
              />
              <OsButton
                text="Add Quote"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                // clickHandler={() => setShowModal((p) => !p)}
              />
              <OsButton
                text=" Mark as Complete"
                buttontype="PRIMARY"
                clickHandler={() => {
                  commonUpdateCompleteAndDraftMethod('completed');
                }}
              />

              <OsButton
                buttontype="PRIMARY_ICON"
                icon={<ArrowDownTrayIcon width={24} />}
              />
            </Space>
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            onChange={(e) => {
              setActiveTab(e);
            }}
            activeKey={activeTab}
            tabBarExtraContent={
              <Space direction="vertical" size={0}>
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                >
                  Select Grouping
                </Typography>
                <Space size={12}>
                  <CommonSelect
                    style={{width: '319px'}}
                    placeholder="Select Grouping here"
                    options={selectData}
                    onChange={(e) => {
                      setSelectedFilter(e);
                    }}
                  />

                  <Dropdown
                    menu={{items}}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Button
                      style={{
                        background: '#14263E',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        border: 'none',
                      }}
                    >
                      <EllipsisVerticalIcon width={24} color="white" />
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            }
          >
            {TabPaneData?.map((item: any) => (
              <TabPane
                tab={
                  <Typography name="Body 4/Regular">{item?.name}</Typography>
                }
                key={item?.key}
              >
                {activeTab === '1' ? (
                  bundleData && bundleData?.length > 0 ? (
                    <>
                      {' '}
                      {bundleData?.map((item: any, index: any) => (
                        <OsCollapse
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
                              children: (
                                <OsTable
                                  loading={loading}
                                  // rowSelection={rowSelection}
                                  columns={finalInputColumn}
                                  dataSource={
                                    (showTableDataa && item?.QuoteLineItems) ||
                                    []
                                  }
                                  scroll
                                  rowSelection={rowSelection}
                                />
                              ),
                            },
                          ]}
                        />
                      ))}{' '}
                      {selectedFilter ? (
                        <>
                          {familyFilter?.map((item: any, index: any) => (
                            <OsCollapse
                              items={[
                                {
                                  key: index,
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
                                    <OsTable
                                      loading={loading}
                                      columns={finalInputColumn}
                                      dataSource={item?.QuoteLineItem || []}
                                      scroll
                                      rowSelection={rowSelection}
                                    />
                                  ),
                                },
                              ]}
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          {dataNullForBundle?.[0]?.length > 0 &&
                            dataNullForBundle?.[0] && (
                              <OsCollapse
                                items={[
                                  {
                                    key: '2',
                                    label: (
                                      <>
                                        <Space
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                          }}
                                        >
                                          <p>Unassigned</p>
                                        </Space>
                                      </>
                                    ),
                                    children: (
                                      <OsTable
                                        loading={loading}
                                        columns={finalInputColumn}
                                        dataSource={
                                          dataNullForBundle?.[0] || []
                                        }
                                        scroll
                                        rowSelection={rowSelection}
                                      />
                                    ),
                                  },
                                ]}
                              />
                            )}
                        </>
                      )}{' '}
                    </>
                  ) : (
                    <>
                      {selectedFilter ? (
                        <>
                          {' '}
                          {familyFilter?.map((item: any, index: any) => (
                            <OsCollapse
                              items={[
                                {
                                  key: index,
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
                                    <OsTable
                                      loading={loading}
                                      columns={finalInputColumn}
                                      dataSource={item?.QuoteLineItem || []}
                                      scroll
                                      rowSelection={rowSelection}
                                    />
                                  ),
                                },
                              ]}
                            />
                          ))}
                        </>
                      ) : (
                        <OsTable
                          loading={loading}
                          columns={finalInputColumn}
                          dataSource={
                            (showTableDataa && quoteLineItemByQuoteData) || []
                          }
                          scroll
                          rowSelection={rowSelection}
                        />
                      )}{' '}
                    </>
                  )
                ) : (
                  item?.children
                )}
              </TabPane>
            ))}
          </OsTabs>
        </Row>
      </Space>
      <OsDrawer
        title={<Typography name="Body 1/Regular">Quote Settings</Typography>}
        placement="right"
        onClose={onClose}
        open={open}
        width={450}
      >
        <DrawerContent setOpen={setOpen} />
      </OsDrawer>

      {selectTedRowIds?.length > 0 && (
        <OsModal
          loading={loading}
          body={
            <BundleSection
              selectTedRowIds={selectTedRowIds}
              setShowBundleModal={setShowBundleModal}
            />
          }
          width={700}
          open={showBundleModal}
          onCancel={() => {
            setShowBundleModal((p) => !p);
          }}
        />
      )}
    </>
  );
};

export default GenerateQuote;
