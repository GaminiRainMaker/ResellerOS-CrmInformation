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
  CurrencyDollarIcon,
  EllipsisVerticalIcon,
  QueueListIcon,
  ReceiptPercentIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import {Breadcrumb, Button, MenuProps} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import OsModal from '@/app/components/common/os-modal';
import MoneyRecive from '../../../../../public/assets/static/money-recive.svg';
import MoneySend from '../../../../../public/assets/static/money-send.svg';
import {updateQuoteByQuery} from '../../../../../redux/actions/quote';
import {
  DeleteQuoteLineItemQuantityById,
  UpdateQuoteLineItemQuantityById,
  getQuoteLineItem,
  getQuoteLineItemByQuoteId,
} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import DrawerContent from './DrawerContent';
import BundleSection from './bundleSection';

const GenerateQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteLineItemId = searchParams.get('id');

  const [activeTab, setActiveTab] = useState<any>('1');
  const [inputData, setInputData] = useState<any>({});
  const debouncedValue = useDebounceHook(inputData, 500);

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const {
    data: quoteLineItemData,
    quoteLineItemByQuoteID,
    loading,
  } = useAppSelector((state) => state.quoteLineItem);
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [amountData, setAmountData] = useState<any>();
  const [getAllItemsQuoteId, setGetAllItemsQuoteId] = useState<React.Key[]>([]);
  const [open, setOpen] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    // if (debouncedValue && debouncedValue?.length > 0) {
    dispatch(UpdateQuoteLineItemQuantityById(debouncedValue));
    setTimeout(() => {
      dispatch(getQuoteLineItem());
      setSelectedRowIds([]);
      setIsEditable(false);
    }, 500);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  useEffect(() => {
    if (getQuoteLineItemId)
      dispatch(getQuoteLineItemByQuoteId(Number(getQuoteLineItemId)));
  }, [getQuoteLineItemId]);

  useEffect(() => {
    let newObj: any = {};
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let adjustPrice: number = 0;
    let lineAmount: number = 0;
    let quantity: number = 0;
    let listPrice: number = 0;

    if (quoteLineItemData && quoteLineItemData?.length > 0) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      quoteLineItemData?.map((item: any, index: any) => {
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
  }, [quoteLineItemData]);

  useEffect(() => {
    const allIdsArray: [] = [];
    if (quoteLineItemData && quoteLineItemData?.length > 0) {
      quoteLineItemData?.map((item: string) => {
        if (!allIdsArray?.includes(item?.Quote?.id)) {
          allIdsArray?.push(parseInt(item?.Quote?.id));
        }
      });
    }
    setGetAllItemsQuoteId(allIdsArray);
  }, [quoteLineItemData]);

  const commonUpdateCompleteAndDraftMethod = (queryItem: string) => {
    if (getQuoteLineItemId) {
      const data = {
        ids: getQuoteLineItemId,
        query: queryItem,
      };
      dispatch(updateQuoteByQuery(data));
    }
    router?.push('/allQuote');
  };

  const deleteLineItems = () => {
    if (selectTedRowIds) {
      dispatch(DeleteQuoteLineItemQuantityById(selectTedRowIds));
      setSelectedRowIds([]);
      setTimeout(() => {
        dispatch(getQuoteLineItem());
      }, 500);
    }
  };

  const analyticsData = [
    {
      key: 1,
      primary: quoteLineItemData?.length,
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

  const TabPaneData = [
    {
      key: 1,
      name: 'Input Details',
      // tableData: s
    },
    {
      key: 2,
      name: 'Profitability',
    },
    {
      key: 3,
      name: 'Rebates',
    },
    {
      key: 4,
      name: 'Validation',
    },
    {
      key: 5,
      name: 'Matrix',
    },
  ];

  const selectData = [
    {value: 'item 1', label: 'Item 1'},
    {value: 'item 2', label: 'Item 2'},
    {value: 'item 3', label: 'Item 3'},
    {value: 'item 4', label: 'Item 4'},
  ];

  const QuoteLineItemcolumns = [
    {
      title: '#Line',
      dataIndex: 'line',
      key: 'line',
      width: 130,
    },
    {
      title: 'SKU',
      dataIndex: 'product_code',
      key: 'product_code',
      width: 187,
    },
    {
      title: 'List Price',
      dataIndex: 'list_price',
      key: 'list_price',
      width: 187,
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
            <OsInput
              disabled={
                isEditable ? !selectTedRowIds?.includes(record?.id) : true
              }
              value={record?.list_price}
              style={{width: '100px'}}
              onChange={(e: any) => {
                setInputData({id: record?.id, list_price: e.target.value});
              }}
            />
          ),
        };
      },
    },
    {
      title: 'MSRP',
      dataIndex: 'MSRP',
      key: 'MSRP',
      width: 187,
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: 187,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
      width: 365,
    },
    {
      title: 'Product Select',
      dataIndex: 'productselect',
      key: 'productselect',
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
              style={{width: '319px'}}
              placeholder="Product"
              options={selectData}
            />
          ),
        };
      },
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
          name="Heading 3/Medium"
          color={token?.colorPrimaryText}
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
            router?.push(`/generateQuote?id=${getQuoteLineItemId}`);
          }}
        >
          Generate Quotes
        </Typography>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRowIds(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

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
            <Breadcrumb separator=">" items={menuItems} />
          </Col>
          <Col>
            <Space size={8} direction="horizontal">
              <OsButton
                text="Save as Draft"
                buttontype="SECONDARY"
                clickHandler={() => {
                  commonUpdateCompleteAndDraftMethod('drafted');
                }}
              />
              <OsButton
                text="Edit Header"
                buttontype="PRIMARY"
                clickHandler={showDrawer}
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
                  />

                  <Dropdown
                    trigger="click"
                    menu={{items}}
                    placement="bottomRight"
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
                <OsTable
                  loading={loading}
                  // rowSelection={rowSelection}
                  columns={QuoteLineItemcolumns}
                  dataSource={quoteLineItemByQuoteID || []}
                  scroll
                  rowSelection={rowSelection}
                />
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
        // footer={
        //   <div style={{textAlign: 'right'}}>
        //     <OsButton
        //       text="Update Changes"
        //       buttontype="PRIMARY"
        //       clickHandler={() => form.submit()}
        //     />
        //   </div>
        // }
      >
        <DrawerContent setOpen={setOpen} />
      </OsDrawer>

      <OsModal
        loading={loading}
        body={<BundleSection />}
        width={700}
        open={showBundleModal}
        onCancel={() => {
          setShowBundleModal((p) => !p);
        }}
      />
    </>
  );
};

export default GenerateQuote;
