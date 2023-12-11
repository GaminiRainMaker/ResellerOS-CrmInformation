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
  PlusIcon,
  QueueListIcon,
  ReceiptPercentIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import TabPane from 'antd/es/tabs/TabPane';
import Image from 'next/image';
import {useDebugValue, useEffect, useState} from 'react';
import MoneyRecive from '../../../../../public/assets/static/money-recive.svg';
import MoneySend from '../../../../../public/assets/static/money-send.svg';
import {
  insertQuote,
  updateQuoteCompletedById,
  updateQuoteDraftById,
} from '../../../../../redux/actions/quote';
import {
  getQuoteLineItem,
  insertQuoteLineItem,
} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import UploadFile from './UploadFile';

interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined; // Define the inner object structure
  };
}

const GenerateQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [step, setStep] = useState<number>(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const {data: quoteData, loading} = useAppSelector((state) => state.quote);
  const {data: quoteLineItemData} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [amountData, setAmountData] = useState<any>();
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [getAllItemsQuoteId, setGetAllItemsQuoteId] = useState<React.Key[]>([]);
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

  const rowSelection = (e: any) => {
    // selectedRowKeys;
    // onSelectChange;
    console.log('selectedRowKe ', e);
  };

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

  useEffect(() => {
    dispatch(getQuoteLineItem());
  }, []);
  const markAsComplete = () => {
    if (getAllItemsQuoteId) {
      for (let i = 0; i < getAllItemsQuoteId?.length; i++) {
        const IDS = getAllItemsQuoteId[i];
        dispatch(updateQuoteCompletedById(parseInt(IDS as string, 10)));
      }
    }
    dispatch(getQuoteLineItem());
  };
  const SaveAsDraft = () => {
    if (getAllItemsQuoteId) {
      for (let i = 0; i < getAllItemsQuoteId?.length; i++) {
        const IDS = getAllItemsQuoteId[i];
        dispatch(updateQuoteDraftById(parseInt(IDS as string, 10)));
      }
    }
    dispatch(getQuoteLineItem());
  };

  const analyticsData = [
    {
      key: 1,
      primary: amountData?.Quantity,
      secondry: 'Line Items',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorPrimaryHover,
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

  const Quotecolumns = [
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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 187,
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
    },
  ];

  const addQuoteLineItem = () => {
    const labelOcrMap: any = [];
    let formattedArray: any = [];
    const formattedData: FormattedData = {};

    uploadFileData?.map((uploadFileDataItem: any) => {
      const tempLabelOcrMap: any = {};

      const arrayOfTableObjects =
        uploadFileDataItem?.data?.result?.[0]?.prediction?.filter(
          (item: any) => item.label === 'table',
        );
      arrayOfTableObjects?.[0]?.cells.forEach((item: any) => {
        const rowNum = item.row;
        if (!formattedData[rowNum]) {
          formattedData[rowNum] = {};
        }
        formattedData[rowNum][item.label?.toLowerCase()] = item.text;
      });
      formattedArray = Object.values(formattedData);
      <>
        {uploadFileDataItem?.data?.result?.[0]?.prediction?.forEach(
          (item: any) => {
            tempLabelOcrMap[item?.label?.toLowerCase()] = item?.ocr_text;
          },
        )}
      </>;
      labelOcrMap.push(tempLabelOcrMap);
    });

    if (labelOcrMap && uploadFileData.length > 0) {
      dispatch(insertQuote(labelOcrMap)).then((d) => {
        setShowModal(false);
        setUploadFileData([]);
        d?.payload?.data?.map((item: any) => {
          if (item?.id) {
            const lineitemData = formattedArray?.map((item1: any) => ({
              ...item1,
              qoute_id: item?.id,
            }));
            dispatch(insertQuoteLineItem(lineitemData));
          }
        });
      });
    }
  };

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        {step === 1 && (
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
        )}

        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Generated Quote
            </Typography>
          </Col>
          <Col>
            {step === 0 ? (
              <>ccccc</>
            ) : (
              <Space size={8} direction="horizontal">
                <OsButton
                  text="Save as Draft"
                  buttontype="SECONDARY"
                  clickHandler={SaveAsDraft}
                />
                <OsButton
                  text="Add Quote"
                  buttontype="PRIMARY"
                  icon={<PlusIcon />}
                  clickHandler={() => setShowModal((p) => !p)}
                />
                <OsButton
                  text=" Mark as Complete"
                  buttontype="PRIMARY"
                  clickHandler={markAsComplete}
                />

                <OsButton
                  buttontype="PRIMARY_ICON"
                  icon={<ArrowDownTrayIcon width={24} />}
                />
              </Space>
            )}
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
                  <OsButton
                    buttontype="PRIMARY_ICON"
                    icon={<EllipsisVerticalIcon width={24} />}
                  />
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
                  rowSelection={rowSelection}
                  columns={Quotecolumns}
                  dataSource={quoteLineItemData}
                  scroll
                />
              </TabPane>
            ))}
          </OsTabs>
        </Row>
      </Space>
      <OsModal
        loading={loading}
        body={
          <UploadFile
            setUploadFileData={setUploadFileData}
            uploadFileData={uploadFileData}
          />
        }
        width={900}
        primaryButtonText="Generate"
        secondaryButtonText="Save & Generate Individual Quotes"
        open={showModal}
        onOk={() => addQuoteLineItem()}
        onCancel={() => {
          setShowModal((p) => !p);
          setUploadFileData([]);
        }}
      />
    </>
  );
};

export default GenerateQuote;
