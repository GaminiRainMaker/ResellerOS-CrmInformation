/* eslint-disable @typescript-eslint/indent */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  ArrowDownTrayIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  QueueListIcon,
  ReceiptPercentIcon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import {Breadcrumb} from '@/app/components/common/antd/BreadCrumb';
import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {PopConfirm} from '@/app/components/common/antd/PopConfirm';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
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
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import MoneyRecive from '../../../../../public/assets/static/money-recive.svg';
import MoneySend from '../../../../../public/assets/static/money-send.svg';
import {getAllBundle} from '../../../../../redux/actions/bundle';
import {updateProductFamily} from '../../../../../redux/actions/product';
import {updateQuoteByQuery} from '../../../../../redux/actions/quote';
import {
  DeleteQuoteLineItemQuantityById,
  UpdateQuoteLineItemQuantityById,
  getQuoteLineItemByQuoteId,
  getQuoteLineItemByQuoteIdandBundleIdNull,
} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import DrawerContent from './DrawerContent';
import InputDetails from './allTabs/InputDetails';
import Profitability from './allTabs/Profitability';
import Rebates from './allTabs/Rebates';
import Validation from './allTabs/Validation';
import BundleSection from './bundleSection';

const GenerateQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');

  const [activeTab, setActiveTab] = useState<any>('1');
  const [inputData, setInputData] = useState<any>({});
  const debouncedValue = useDebounceHook(inputData, 500);

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

  useEffect(() => {
    setQuoteLineItemByQuoteData(quoteLineItemByQuoteID);
  }, [quoteLineItemByQuoteID]);

  useEffect(() => {
    if (selectedFilter == 'Product Family') {
      const finalFamilyArr: any = [];
      let productsArr: any = [];
      let professionalServiceArr: any = [];
      let maintenanceArr: any = [];
      let subscriptionArr: any = [];
      let unassignedArr: any = [];

      if (dataNullForBundle?.[0] && dataNullForBundle?.[0]?.length > 0) {
        productsArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family == 'Products',
        );
        professionalServiceArr = dataNullForBundle?.[0]?.filter(
          (item: any) =>
            item?.Product?.product_family == 'Professional Services',
        );
        maintenanceArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family == 'Maintenance',
        );
        subscriptionArr = dataNullForBundle?.[0]?.filter(
          (item: any) => item?.Product?.product_family == 'Subscriptions',
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
    const allIdsArray: [] = [];
    if (quoteLineItemByQuoteID && quoteLineItemByQuoteID?.length > 0) {
      quoteLineItemByQuoteID?.map((item: string) => {
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
        // console.log('345435345', bundleObj, lineItem?.Bundle?.id, lineItem);
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

  const deleteQuote = async (id: number) => {
    if (id) {
      // await dispatch(deleteQuoteById(id));
    }
  };

  const analyticsData = [
    {
      key: 1,
      primary: quoteLineItemByQuoteID?.length,
      secondry: 'Line Items',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: `$${amountData?.AdjustPrice}`,
      secondry: 'Quote Total',
      icon: <TagIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: `$${amountData?.LineAmount}`,
      secondry: 'Total Cost',
      icon: <CurrencyDollarIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: '$0.00',
      secondry: 'Total GP',
      icon: (
        <Image
          src={MoneyRecive}
          alt="MoneyRecive"
          style={{cursor: 'pointer', height: '24px', width: '24px'}}
        />
      ),
      iconBg: token?.colorErrorBg,
    },
    {
      key: 5,
      primary: '0%',
      secondry: 'Total GP%',
      icon: <ReceiptPercentIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 6,
      primary: '$21,966.00',
      secondry: 'Rebate Total',
      icon: (
        <Image
          src={MoneySend}
          alt="MoneySend"
          style={{cursor: 'pointer', height: '24px', width: '24px'}}
        />
      ),
      iconBg: token?.colorInfoHover,
    },
  ];

  const QuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line_number',
      key: 'line_number',
      render: (text: string, record: any) => (
        <OsInput
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
          style={{
            height: '36px',
          }}
          value={text}
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
      render: (text: string, record: any) => (
        <OsInput
          style={{
            height: '36px',
          }}
          disabled={isEditable ? !selectTedRowIds?.includes(record?.id) : true}
          value={text}
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
    },
    {
      title: 'Cost',
      dataIndex: 'list_price',
      key: 'list_price',
      width: 187,
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
            onConfirm={() => deleteQuote(record?.id)}
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

  const TabPaneData = [
    {
      key: 1,
      name: 'Input Details',
      children: <InputDetails isEditable={isEditable} />,
    },
    {
      key: 2,
      name: 'Profitability',
      children: <Profitability isEditable={isEditable} />,
    },
    {
      key: 3,
      name: 'Rebates',
      children: <Rebates />,
    },
    {
      key: 4,
      name: 'Validation',
      children: <Validation />,
    },
    {
      key: 5,
      name: 'Matrix',
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row
          justify="space-between"
          style={{
            padding: '36px 24px',
            background: token?.colorBgContainer,
            borderRadius: '12px',
          }}
          gutter={[0, 16]}
        >
          {analyticsData?.map((item) => (
            <Col>
              <TableNameColumn
                primaryText={item?.primary}
                secondaryText={item?.secondry}
                fallbackIcon={item?.icon}
                iconBg={item?.iconBg}
              />
            </Col>
          ))}
        </Row>

        <Row justify="space-between" align="middle">
          <Col>
            <Breadcrumb
              separator={
                <ChevronRightIcon
                  width={24}
                  height={24}
                  color={token?.colorInfoBorder}
                />
              }
              items={menuItems}
            />
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
            {TabPaneData?.map((item) => (
              <TabPane
                tab={
                  <Typography
                    name="Body 4/Regular"
                    color={
                      activeTab === item?.key ? token?.colorPrimary : '#666666'
                    }
                  >
                    {item?.name}
                    <div
                      style={{
                        // eslint-disable-next-line eqeqeq
                        borderBottom:
                          // eslint-disable-next-line eqeqeq
                          activeTab == item?.key ? '2px solid #1C3557' : '',
                        marginTop: '3px',
                      }}
                    />
                  </Typography>
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
                                    <p>Lines:{item?.quoteLineItems?.length}</p>
                                    <p>Desc: {item?.description}</p>
                                    <p>Quantity: {item?.quantity}</p>
                                  </Space>
                                </>
                              ),
                              children: (
                                <OsTable
                                  loading={loading}
                                  // rowSelection={rowSelection}
                                  columns={QuoteLineItemcolumns}
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
                                      columns={QuoteLineItemcolumns}
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
                                        columns={QuoteLineItemcolumns}
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
                      {' '}
                      <OsTable
                        loading={loading}
                        columns={QuoteLineItemcolumns}
                        dataSource={
                          (showTableDataa && quoteLineItemByQuoteData) || []
                        }
                        scroll
                        rowSelection={rowSelection}
                      />
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
