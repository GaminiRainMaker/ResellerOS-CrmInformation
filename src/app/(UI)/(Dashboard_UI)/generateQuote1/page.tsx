'use client';

import AddQuote from '@/app/components/common/addQuote';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {AttachmentOptions, selectData} from '@/app/utils/CONSTANTS';
import {formatDate} from '@/app/utils/base';
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';
import {Badge, Form, MenuProps, notification} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getAllBundle} from '../../../../../redux/actions/bundle';
import {getAllContractSetting} from '../../../../../redux/actions/contractSetting';
import {getProfitabilityByQuoteId} from '../../../../../redux/actions/profitability';
import {
  getQuoteById,
  updateQuoteById,
  updateQuoteStatusById,
} from '../../../../../redux/actions/quote';
import {
  getQuoteFileByQuoteId,
  getQuoteFileCount,
} from '../../../../../redux/actions/quoteFile';
import {getAllTableColumn} from '../../../../../redux/actions/tableColumn';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setProfitability} from '../../../../../redux/slices/profitability';
import DownloadFile from './DownloadFile';
import DrawerContent from './DrawerContent';
import Metrics from './allTabs/Metrics';
import ProfitabilityMain from './allTabs/Profitability/index';
import Rebates from './allTabs/Rebates';
import ReviewQuotes from './allTabs/ReviewQuotes';
import Validation from './allTabs/Validation';
import AttachmentDocument from './allTabs/attachmentDoc';
import GenerateQuoteAnalytics from './analytics';

const GenerateQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const [addDocForm] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [api, contextHolder] = notification.useNotification();
  const getQuoteID = searchParams.get('id');
  const [activeTab, setActiveTab] = useState<any>();
  const {quoteLineItemByQuoteID, loading} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [selectTedRowData, setSelectedRowData] = useState<React.Key[]>([]);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [amountData, setAmountData] = useState<any>();
  const [open, setOpen] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState<boolean>(false);
  const [isDeleteProfitabilityModal, setIsDeleteProfitabilityModal] =
    useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('File Name');

  const {data: tableColumnData} = useAppSelector((state) => state.tableColumn);
  const {data: contractSettingData} = useAppSelector(
    (state) => state.contractSetting,
  );
  const [tableColumnDataShow, setTableColumnDataShow] = useState<[]>();
  const [statusValue, setStatusValue] = useState<string>('');
  const [statusUpdateLoading, setStatusUpdateLoading] =
    useState<boolean>(false);
  const {data: quoteFileData, getQuoteFileDataCount} = useAppSelector(
    (state) => state.quoteFile,
  );
  const [showUpdateLineItemModal, setShowUpdateLineItemModal] =
    useState<boolean>(false);
  const [typeForAttachmentFilter, setTypeForAttachmentFilter] =
    useState<any>('all');
  const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false);
  const [objectForSyncingValues, setObjectForSyncingValues] = useState<any>([]);
  const [addNewCustomerQuote, setAddNewCustomerQuote] =
    useState<boolean>(false);

  useEffect(() => {
    if (getQuoteID) {
      dispatch(getProfitabilityByQuoteId(Number(getQuoteID))).then((d: any) => {
        if (d?.payload) {
          dispatch(setProfitability(d?.payload));
        }
      });
      dispatch(getAllBundle(getQuoteID));
      dispatch(getQuoteFileCount(Number(getQuoteID)));
      dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
    }
  }, [getQuoteID]);

  useEffect(() => {
    dispatch(getAllTableColumn(''));
    dispatch(getAllContractSetting(''));
  }, []);

  useEffect(() => {
    dispatch(getQuoteById(getQuoteID))?.then((payload: any) => {
      let newObj = {
        ...payload?.payload?.Customer,
        ...payload?.payload?.Opportunity,
        ...payload?.payload?.QuoteLineItems?.[0],
        ...payload?.payload,
      };
      delete newObj?.Customer;
      delete newObj?.Opportunity,
        delete newObj?.Profitabilities,
        delete newObj?.QuoteFiles,
        delete newObj?.QuoteLineItems,
        delete newObj?.RebatesQuoteLineItems,
        delete newObj?.User,
        delete newObj?.Validations,
        setObjectForSyncingValues(newObj);
    });
  }, []);

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
      filteredArray = tableColumnData?.filter((item: any) =>
        item?.table_name?.includes(tabsname),
      );
    }
    const filterRequired = filteredArray?.filter(
      (item: any) => item?.is_active,
    );
    setTableColumnDataShow(filterRequired);
  }, [activeTab, tableColumnData]);

  const commonUpdateCompleteAndDraftMethod = (status: string) => {
    try {
      setStatusUpdateLoading(true);
      if (getQuoteID) {
        api.info({
          message: 'Your changes have been saved.',
        });
        const obj = {
          ids: getQuoteID,
          status,
        };
        dispatch(updateQuoteStatusById(obj)).then((d) => {
          if (d?.payload) {
            setStatusUpdateLoading(false);
          }
        });
      }
    } catch (err) {
      setStatusUpdateLoading(false);
      console.log('Error:', err);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() => {
            // if (quoteFileData.length > 0) {
            //   notification.open({
            //     message: 'Please Verify All the Files first.',
            //     type: 'info',
            //   });
            // } else {
            setShowBundleModal(true);
            // }
          }}
        >
          Bundle Configuration
        </Typography>
      ),
    },
    {
      key: '2',
      label: (
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() => {
            // if (quoteFileData.length > 0) {
            //   notification.open({
            //     message: 'Please Verify All the Files first.',
            //     type: 'info',
            //   });
            // } else
            if (selectTedRowData?.length > 0) {
              setShowUpdateLineItemModal(true);
            }
          }}
        >
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
          cursor="pointer"
          onClick={() => {
            // if (quoteFileData.length > 0) {
            //   notification.open({
            //     message: 'Please Verify All the Files first.',
            //     type: 'info',
            //   });
            // } else
            if (selectTedRowData?.length > 0) {
              setIsDeleteProfitabilityModal(true);
            }
          }}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  const TabPaneData = [
    {
      key: 1,
      name: (
        <Badge count={getQuoteFileDataCount}>
          <Typography
            style={{padding: '10px'}}
            name="Body 4/Regular"
            cursor="pointer"
            color={token?.colorTextBase}
            onClick={() => setActiveTab('1')}
          >
            Review Quotes
          </Typography>
        </Badge>
      ),
      children: (
        <ReviewQuotes
          tableColumnDataShow={tableColumnDataShow}
          selectedFilter={selectedFilter}
          // setIsDeleteInputDetailModal={setIsDeleteInputDetailModal}
          // isDeleteInputDetailModal={isDeleteInputDetailModal}
          // setFinalInputColumn={setFinalInputColumn}
          // finalInputColumn={finalInputColumn}
          // selectedFilter={selectedFilter}
          // familyFilter={familyFilter}
          // setFamilyFilter={setFamilyFilter}
          // setSelectedRowIds={setSelectedRowIds}
          // selectTedRowIds={selectTedRowIds}
          // setQuoteLineItemExist={setQuoteLineItemExist}
          // setActiveTab={setActiveTab}
          // activeTab={activeTab}
          // setCountOFFiles={setCountOFFiles}
          // countOfFiles={countOfFiles}
        />
      ),
    },
    {
      key: 2,
      name: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setActiveTab('2')}
          cursor="pointer"
          color={token?.colorTextBase}
        >
          Profitability
        </Typography>
      ),
      children: (
        <ProfitabilityMain
          tableColumnDataShow={tableColumnDataShow}
          selectedFilter={selectedFilter}
          setShowUpdateLineItemModal={setShowUpdateLineItemModal}
          showUpdateLineItemModal={showUpdateLineItemModal}
          selectTedRowData={selectTedRowData}
          setSelectedRowData={setSelectedRowData}
          setShowBundleModal={setShowBundleModal}
          selectTedRowIds={selectTedRowIds}
          setSelectedRowIds={setSelectedRowIds}
          showBundleModal={showBundleModal}
        />
      ),
    },
    {
      key: 3,
      name: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setActiveTab('3')}
          cursor="pointer"
          color={token?.colorTextBase}
        >
          Rebates
        </Typography>
      ),
      children: <Rebates tableColumnDataShow={tableColumnDataShow} />,
    },
    contractSettingData?.show_validation_tab && {
      key: 4,
      name: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setActiveTab('4')}
          cursor="pointer"
          color={token?.colorTextBase}
        >
          Validation
        </Typography>
      ),
      children: <Validation tableColumnDataShow={tableColumnDataShow} />,
    },
    {
      key: 5,
      name: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setActiveTab('5')}
          cursor="pointer"
          color={token?.colorTextBase}
        >
          Metrics
        </Typography>
      ),
      children: <Metrics selectedFilter={selectedFilter} />,
    },
    {
      key: 6,
      name: (
        <Typography
          name="Body 4/Regular"
          cursor="pointer"
          color={token?.colorTextBase}
          onClick={() => setActiveTab('1')}
        >
          Attachments
        </Typography>
      ),
      children: (
        <AttachmentDocument
          typeForAttachmentFilter={typeForAttachmentFilter}
          addNewCustomerQuote={addNewCustomerQuote}
          setAddNewCustomerQuote={setAddNewCustomerQuote}
        />
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
          color={token?.colorPrimaryText}
          onClick={() => {
            router?.push(`/generateQuote?id=${getQuoteID}`);
          }}
        >
          {quoteLineItemByQuoteID?.[0]?.Quote?.file_name ??
            formatDate(
              quoteLineItemByQuoteID?.[0]?.Quote?.createdAt,
              'MM/DD/YYYY | HH:MM',
            )}
        </Typography>
      ),
    },
  ];

  const onFinish = async () => {
    const headerValue = form.getFieldsValue();
    try {
      const obj = {
        id: Number(getQuoteID),
        ...headerValue,
      };
      dispatch(updateQuoteById(obj));
      setOpen(false);
    } catch (error) {
      setOpen(false);
      console.error('Error:', error);
    }
  };

  return (
    <>
      {contextHolder}
      <Space size={12} direction="vertical" style={{width: '100%'}}>
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
                clickHandler={() => {
                  if (quoteFileData?.length > 0) {
                    notification.open({
                      message: 'Please Verify All the Files first.',
                      type: 'info',
                    });
                  } else {
                    setOpen(true);
                  }
                }}
              />
              <AddQuote
                loading={loading}
                buttonText="Add Quote"
                setUploadFileData={setUploadFileData}
                uploadFileData={uploadFileData}
                isGenerateQuote
                existingGenerateQuoteId={Number(getQuoteID)}
                quoteDetails={objectForSyncingValues}
                isGenerateQuotePage
              />
              <OsButton
                loading={
                  statusValue === 'Needs Review' ? statusUpdateLoading : false
                }
                text=" Mark as Complete"
                buttontype="PRIMARY"
                clickHandler={() => {
                  if (quoteFileData && quoteFileData?.length > 0) {
                    notification?.open({
                      message:
                        'Please Verify All the Pdf to mark as Complete this Quote',
                      type: 'error',
                    });
                    return;
                  }
                  setStatusValue('Needs Review');
                  commonUpdateCompleteAndDraftMethod('Needs Review');
                }}
              />

              <OsButton
                buttontype="PRIMARY_ICON"
                clickHandler={() => {
                  setShowDocumentModal(true);
                }}
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
              <Space>
                {' '}
                {activeTab === '6' && (
                  <OsButton
                    text="Add Attachment"
                    buttontype="PRIMARY"
                    clickHandler={() => {
                      setAddNewCustomerQuote(true);
                    }}
                  />
                )}
                <Space direction="vertical" size={0}>
                  <Typography
                    name="Body 4/Medium"
                    color={token?.colorPrimaryText}
                  >
                    {activeTab === '6' ? 'Select Type' : 'Select Grouping'}
                  </Typography>
                  <Space size={12}>
                    {activeTab === '6' ? (
                      <CommonSelect
                        key={1}
                        style={{width: '319px'}}
                        placeholder="Select Grouping here"
                        options={AttachmentOptions}
                        onChange={(e) => {
                          setTypeForAttachmentFilter(e);
                        }}
                        allowClear
                        defaultValue={'all'}
                      />
                    ) : (
                      <CommonSelect
                        key={2}
                        style={{width: '319px'}}
                        // disabled={
                        //   activeTab == '2' || activeTab == '5' ? false : true
                        // }
                        placeholder="Select Grouping here"
                        options={selectData}
                        onChange={(e) => {
                          setSelectedFilter(e);
                        }}
                        allowClear
                        defaultValue={'File Name'}
                      />
                    )}

                    {activeTab === '2' && (
                      <Space>
                        <OsDropdown menu={{items}} />
                      </Space>
                    )}
                  </Space>
                </Space>
              </Space>
            }
          >
            {TabPaneData?.map((item: any) => (
              <TabPane
                key={item?.key}
                tab={
                  <Typography name="Body 4/Regular">{item?.name}</Typography>
                }
              >
                {item?.children}
              </TabPane>
            ))}
          </OsTabs>
        </Row>
      </Space>
      <OsDrawer
        title={<Typography name="Body 1/Regular">Quote Settings</Typography>}
        placement="right"
        onClose={() => setOpen((p) => !p)}
        open={open}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={() => form.submit()}
            />
          </Row>
        }
      >
        <DrawerContent form={form} open={open} onFinish={onFinish} />
      </OsDrawer>

      <OsModal
        title="Add Template"
        bodyPadding={30}
        loading={loading}
        body={
          <DownloadFile
            form={addDocForm}
            objectForSyncingValues={objectForSyncingValues}
          />
        }
        width={900}
        open={showDocumentModal}
        onCancel={() => {
          setShowDocumentModal(false);
          addDocForm.resetFields();
        }}
      />
    </>
  );
};

export default GenerateQuote;

[
  {
    id: 69,
    is_deleted: false,
    customer_id: null,
    user_id: null,
    organization: 'cloudanalogy',
    name: 'test',
    description: 'demo',
    quantity: '3',
    quote_id: 55,
    gross_profit_percentage: null,
    extended_price: null,
    gross_profit: null,
    createdAt: '2024-06-25T05:35:59.709Z',
    updatedAt: '2024-06-25T05:35:59.709Z',
    Profitabilities: [
      {
        id: 881,
        is_deleted: false,
        customer_id: null,
        user_id: null,
        organization: 'cloudanalogy',
        quote_id: 55,
        bundle_id: 69,
        line_number: '10',
        adjusted_price: '41',
        product_code: '556-BBCD',
        line_amount: '45',
        list_price: '457',
        description: 'No Mobile Broadband Card',
        quantity: '8',
        pricing_method: 'list_percentage',
        unit_price: 251.35,
        exit_price: 2010.8,
        gross_profit: 1682.8,
        gross_profit_percentage: 83.68808434453948,
        quoteline_item_id: 1697,
        serial_number: '10',
        createdAt: '2024-06-25T05:25:55.525Z',
        updatedAt: '2024-06-25T05:37:26.719Z',
        product_id: 3458,
      },
      {
        id: 880,
        is_deleted: false,
        customer_id: null,
        user_id: null,
        organization: 'cloudanalogy',
        quote_id: 55,
        bundle_id: 69,
        line_number: '9',
        adjusted_price: '0',
        product_code: '451-BDDW',
        line_amount: null,
        list_price: '0',
        description: '93 Wh, 6 Cell, Lithium Ion Polymer',
        quantity: '8',
        pricing_method: null,
        unit_price: null,
        exit_price: null,
        gross_profit: null,
        gross_profit_percentage: null,
        quoteline_item_id: 1696,
        serial_number: '9',
        createdAt: '2024-06-25T05:25:55.525Z',
        updatedAt: '2024-06-25T05:36:00.489Z',
        product_id: 3457,
      },
      {
        id: 879,
        is_deleted: false,
        customer_id: null,
        user_id: null,
        organization: 'cloudanalogy',
        quote_id: 55,
        bundle_id: 69,
        line_number: '8',
        adjusted_price: '0',
        product_code: '619-ARSB',
        line_amount: null,
        list_price: '0',
        description:
          'Windows 11 Pro, English, Spanish, French, Brazilian Portuguese',
        quantity: '8',
        pricing_method: null,
        unit_price: null,
        exit_price: null,
        gross_profit: null,
        gross_profit_percentage: null,
        quoteline_item_id: 1695,
        serial_number: '8',
        createdAt: '2024-06-25T05:25:55.525Z',
        updatedAt: '2024-06-25T05:36:00.489Z',
        product_id: 3456,
      },
    ],
  },
];
