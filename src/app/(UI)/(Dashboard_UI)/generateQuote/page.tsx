/* eslint-disable no-restricted-globals */
/* eslint-disable no-sequences */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */

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
import {handleDate} from '@/app/utils/base';
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';
import {Badge, Form, MenuProps, notification} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import {useRouter, useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {getAllBundle} from '../../../../../redux/actions/bundle';
import {getAllContractSetting} from '../../../../../redux/actions/contractSetting';
import {
  getQuoteById,
  getQuoteByIdForEditQuoteHeader,
  getQuoteByIdForFormStack,
  updateQuoteById,
  updateQuoteStatusById,
} from '../../../../../redux/actions/quote';
import {
  getQuoteFileByQuoteId,
  getQuoteFileCount,
} from '../../../../../redux/actions/quoteFile';
import {getAllTableColumn} from '../../../../../redux/actions/tableColumn';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

import {getRebateQuoteLineItemByQuoteId} from '../../../../../redux/actions/rebateQuoteLineitem';
import {getAllValidationByQuoteId} from '../../../../../redux/actions/validation';
import {getAddressByCustomerId} from '../../../../../redux/actions/address';
import {getAllBillingContactByCustomerId} from '../../../../../redux/actions/billingContact';

const DownloadFile = dynamic(() => import('./DownloadFile'), {
  ssr: false,
});

const Metrics = dynamic(() => import('./allTabs/Metrics'), {
  ssr: false,
});
const ProfitabilityMain = dynamic(
  () => import('./allTabs/Profitability/index'),
  {
    ssr: false,
  },
);

const AttachmentDocument = dynamic(() => import('./allTabs/Attachment/index'), {
  ssr: false,
});
const ReviewQuotes = dynamic(() => import('./allTabs/ReviewQuotes'), {
  ssr: false,
});

const DrawerContent = dynamic(() => import('./DrawerContent'), {
  ssr: false,
});
const GenerateQuoteAnalytics = dynamic(() => import('./analytics'), {
  ssr: false,
});
// import DrawerContent from './DrawerContent';
// import GenerateQuoteAnalytics from './analytics';

const GenerateQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const [addDocForm] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [api, contextHolder] = notification.useNotification();
  const getQuoteID = searchParams.get('id');
  const isView = searchParams.get('isView');
  const [activeTab, setActiveTab] = useState<any>('1');

  const [validationTab, setValidationTab] = useState<boolean>(false);
  const {loading, quoteLineItem} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const {quoteById} = useAppSelector((state) => state.quote);
  const [quoteByIdData, setQuoteByIdData] = useState<any>();
  const [totalValues, setTotalValues] = useState<any>();

  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [selectTedRowData, setSelectedRowData] = useState<any>([]);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState<boolean>(false);
  const [isDeleteProfitabilityModal, setIsDeleteProfitabilityModal] =
    useState<boolean>(false);
  const [showRemoveBundleLineItemModal, setShowRemoveBundleLineItemModal] =
    useState<boolean>(false);
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('File Name');
  const {data: tableColumnData} = useAppSelector((state) => state.tableColumn);
  const {data: contractSettingData} = useAppSelector(
    (state) => state.contractSetting,
  );
  const [tableColumnDataShow, setTableColumnDataShow] = useState<[]>();
  const [statusValue, setStatusValue] = useState<string>('');
  const [statusUpdateLoading, setStatusUpdateLoading] =
    useState<boolean>(false);
  const {quoteFileUnverifiedById, getQuoteFileDataCount} = useAppSelector(
    (state) => state.quoteFile,
  );
  const [reviewFileCount, setReviewCountFile] = useState<any>();
  const [filesCount, setFilesCount] = useState<any>(0);
  const [showUpdateLineItemModal, setShowUpdateLineItemModal] =
    useState<boolean>(false);
  const [typeForAttachmentFilter, setTypeForAttachmentFilter] =
    useState<any>('all');
  const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false);
  const [objectForSyncingValues, setObjectForSyncingValues] = useState<any>([]);
  const [addNewCustomerQuote, setAddNewCustomerQuote] =
    useState<boolean>(false);

  useEffect(() => {
    if (getQuoteFileDataCount !== undefined && getQuoteFileDataCount !== null) {
      setFilesCount(Number(getQuoteFileDataCount));
    }
  }, [getQuoteFileDataCount]);
  useEffect(() => {
    if (getQuoteID) {
      dispatch(getQuoteFileCount(Number(getQuoteID)))?.then((payload: any) => {
        setReviewCountFile(payload?.payload);
      });
      dispatch(getQuoteById(Number(getQuoteID)));
      dispatch(getQuoteFileByQuoteId(Number(getQuoteID)));
      dispatch(getAllBundle(getQuoteID));
      dispatch(getRebateQuoteLineItemByQuoteId(Number(getQuoteID)));
      dispatch(getAllValidationByQuoteId(Number(getQuoteID)));
    }
  }, [getQuoteID]);

  useEffect(() => {
    dispatch(getAllTableColumn(''));
    dispatch(getAllContractSetting(''));
  }, []);

  const getAlllApisData = async () => {
    await dispatch(getQuoteByIdForEditQuoteHeader(Number(getQuoteID)))?.then(
      (payload: any) => {
        setQuoteByIdData(payload?.payload);
      },
    );
  };

  // console.log('32423432432', totalValues);
  useEffect(() => {
    getAlllApisData();
  }, [getQuoteID]);

  useEffect(() => {
    if (reviewFileCount == 0) {
      setActiveTab('2');
    }
  }, [reviewFileCount]);

  const getQuoteDetailById = async () => {
    dispatch(getQuoteByIdForFormStack(Number(getQuoteID)))?.then(
      (payload: any) => {
        dispatch(getAllBundle(Number(getQuoteID)))?.then(
          async (payloadBundle: any) => {
            if (payloadBundle?.payload?.length > 0) {
              const newBundleData: any = [];
              payloadBundle?.payload?.map((items: any) => {
                if (items?.Profitabilities?.length > 0) {
                  newBundleData?.push(items);
                }
              });
              const newObj = {
                bundleData: newBundleData,
                QuoteLineItems: payload?.payload?.Profitabilities,
                ...payload?.payload?.Customer,
                ...payload?.payload?.Opportunity,
                ...payload?.payload,
                customer_id: payload?.payload?.Customer?.id,
                opportunity_id: payload?.payload?.Opportunity?.id,
                quoute_line_item_id: payload?.payload?.Profitabilities?.id,
                quote_id: payload?.payload?.id,
              };
              // delete newObj?.Customer;
              delete newObj?.Opportunity;
              delete newObj?.Profitabilities;
              let addressAlll: any = [];
              await dispatch(
                getAddressByCustomerId(payload?.payload?.customer_id),
              )?.then((payload: any) => {
                addressAlll = payload?.payload;
              });
              const allContactDetails: any = [];
              await dispatch(
                getAllBillingContactByCustomerId(payload?.payload?.customer_id),
              )?.then((payload: any) => {
                if (payload?.payload && payload?.payload?.length > 0) {
                  payload?.payload?.map((itemsIn: any) => {
                    allContactDetails?.push(itemsIn);
                  });
                }
              });

              newObj.allContactDetails = allContactDetails;
              newObj.addressForAll = addressAlll;

              setObjectForSyncingValues(newObj);
              setObjectForSyncingValues(newObj);
            } else {
              const newObj = {
                ...payload?.payload?.Customer,
                ...payload?.payload?.Opportunity,
                ...payload?.payload,
                customer_id: payload?.payload?.Customer?.id,
                opportunity_id: payload?.payload?.Opportunity?.id,
                quoute_line_item_id: payload?.payload?.Profitabilities?.id,
                quote_id: payload?.payload?.id,
                QuoteLineItems: payload?.payload?.Profitabilities,
              };
              // delete newObj?.Customer;
              delete newObj?.Opportunity;
              delete newObj?.Profitabilities;
              const allContactDetails: any = [];
              await dispatch(
                getAllBillingContactByCustomerId(payload?.payload?.customer_id),
              )?.then((payload: any) => {
                if (payload?.payload && payload?.payload?.length > 0) {
                  payload?.payload?.map((itemsIn: any) => {
                    allContactDetails?.push(itemsIn);
                  });
                }
              });

              newObj.allContactDetails = allContactDetails;
              let addressAlll: any;
              await dispatch(
                getAddressByCustomerId(payload?.payload?.customer_id),
              )?.then((payload: any) => {
                addressAlll = payload?.payload;
              });
              newObj.addressForAll = addressAlll;
              setObjectForSyncingValues(newObj);
            }
          },
        );
      },
    );
  };

  useEffect(() => {
    getQuoteDetailById();
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
    if (tableColumnData && activeTab && tableColumnData?.length > 0) {
      filteredArray = tableColumnData?.filter((item: any) =>
        item?.table_name?.includes(tabsname),
      );
    }
    const filterRequired = filteredArray?.filter(
      (item: any) => item?.is_active,
    );
    setTableColumnDataShow(filterRequired);
  }, [activeTab, tableColumnData]);

  const commonUpdateCompleteAndDraftMethod = async (status: string) => {
    try {
      // setStatusUpdateLoading(true);
      if (getQuoteID) {
        api.info({
          message: 'Your changes have been saved.',
        });
        const obj = {
          ids: getQuoteID,
          status,
        };
        await dispatch(updateQuoteStatusById(obj)).then((d) => {
          if (d?.payload) {
            setStatusUpdateLoading(false);
          }
        });
        getAlllApisData();
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
            if (quoteFileUnverifiedById?.length > 0) {
              notification.open({
                message: 'Please verify all the files first.',
                type: 'info',
              });
            } else if (selectTedRowData?.length > 0) {
              const bundleCount = selectTedRowData.filter(
                (item: any) => item?.bundle_id,
              ).length;

              if (bundleCount > 0) {
                const message =
                  bundleCount === 1
                    ? 'For this Line item bundle is already created.'
                    : 'A bundle has already been created for these line items.';
                notification.open({
                  message,
                  type: 'info',
                });
              } else {
                setShowBundleModal(true);
              }
            } else {
              notification.open({
                message: 'Please select the Line items first.',
                type: 'info',
              });
            }
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
            if (quoteFileUnverifiedById?.length > 0) {
              notification.open({
                message: 'Please verify all the files first.',
                type: 'info',
              });
            } else if (selectTedRowData?.length > 0) {
              setShowUpdateLineItemModal(true);
            } else {
              notification.open({
                message: 'Please select the Line items first.',
                type: 'info',
              });
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
            if (quoteFileUnverifiedById?.length > 0) {
              notification.open({
                message: 'Please verify all the files first.',
                type: 'info',
              });
            } else if (selectTedRowData?.length > 0) {
              const bundleCount = selectTedRowData.filter(
                (item: any) => item?.bundle_id,
              ).length;
              if (bundleCount > 0) {
                setShowRemoveBundleLineItemModal(true);
              } else {
                setIsDeleteProfitabilityModal(true);
              }
            } else {
              notification.open({
                message: 'Please select the Line items first.',
                type: 'info',
              });
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
      key: '1',
      name: (
        <Badge count={!isNaN(filesCount) ? filesCount : 0}>
          <Typography
            style={{padding: '10px'}}
            name="Body 4/Regular"
            cursor="pointer"
            color={token?.colorTextBase}
            onClick={() => {
              setActiveTab('1');
              setValidationTab(false);
            }}
          >
            Review Quotes
          </Typography>
        </Badge>
      ),
      children: (
        <ReviewQuotes
          tableColumnDataShow={tableColumnDataShow}
          selectedFilter={selectedFilter}
          getQuoteDetailById={getQuoteDetailById}
          setActiveTab={setActiveTab}
        />
      ),
    },
    {
      key: '2',
      name: (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            setActiveTab('2');
            setValidationTab(false);
          }}
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
          setCollapseActiveKeys={setCollapseActiveKeys}
          collapseActiveKeys={collapseActiveKeys}
          setShowBundleModal={setShowBundleModal}
          selectTedRowIds={selectTedRowIds}
          setSelectedRowIds={setSelectedRowIds}
          showBundleModal={showBundleModal}
          isDeleteProfitabilityModal={isDeleteProfitabilityModal}
          setIsDeleteProfitabilityModal={setIsDeleteProfitabilityModal}
          showRemoveBundleLineItemModal={showRemoveBundleLineItemModal}
          setShowRemoveBundleLineItemModal={setShowRemoveBundleLineItemModal}
          validationTab={validationTab}
          activeTab={activeTab}
        />
      ),
    },
    contractSettingData?.show_validation_tab
      ? {
          key: '4',
          name: (
            <Typography
              name="Body 4/Regular"
              onClick={() => {
                setActiveTab('4');
                setValidationTab(true);
              }}
              cursor="pointer"
              color={token?.colorTextBase}
            >
              Validation
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
              setCollapseActiveKeys={setCollapseActiveKeys}
              collapseActiveKeys={collapseActiveKeys}
              setShowBundleModal={setShowBundleModal}
              selectTedRowIds={selectTedRowIds}
              setSelectedRowIds={setSelectedRowIds}
              showBundleModal={showBundleModal}
              isDeleteProfitabilityModal={isDeleteProfitabilityModal}
              setIsDeleteProfitabilityModal={setIsDeleteProfitabilityModal}
              showRemoveBundleLineItemModal={showRemoveBundleLineItemModal}
              setShowRemoveBundleLineItemModal={
                setShowRemoveBundleLineItemModal
              }
              validationTab={validationTab}
              activeTab={activeTab}
            />
          ),
        }
      : null, // Explicitly returning `null` if the condition fails
    {
      key: '5',
      name: (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            setActiveTab('5');
            setValidationTab(false);
          }}
          cursor="pointer"
          color={token?.colorTextBase}
        >
          Metrics
        </Typography>
      ),
      children: <Metrics selectedFilter={selectedFilter} />,
    },
    {
      key: '6',
      name: (
        <Typography
          name="Body 4/Regular"
          cursor="pointer"
          color={token?.colorTextBase}
          onClick={() => setActiveTab('6')}
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
  ].filter((item) => item !== null); // Remove `null` from the array, explicitly ensuring no `null` items in TabPaneData
  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            if (isView === 'true') {
              notification.open({
                message: "You can't navigate to 'All Quotes' in view mode.",
                type: 'info',
              });
            } else router?.push('/allQuote');
          }}
        >
          All Quotes
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          {quoteByIdData?.file_name ??
            (quoteByIdData?.date
              ? handleDate(quoteByIdData?.date, true)
              : '--')}
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
      await dispatch(updateQuoteById(obj)).then((d) => {
        dispatch(getQuoteById(Number(getQuoteID))).then((d) => {
          if (d?.payload) {
            setOpen(false);
          }
        });
      });
      getQuoteDetailById();
    } catch (error) {
      setOpen(false);
      console.error('Error:', error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {contextHolder}
      <Space size={12} direction="vertical" style={{width: '100%'}}>
        <GenerateQuoteAnalytics
          totalValues={totalValues}
          setTotalValues={setTotalValues}
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
                  if (isView === 'true') {
                    notification.open({
                      message: "You can't open setting in view mode.",
                      type: 'info',
                    });
                  } else if (quoteFileUnverifiedById?.length > 0) {
                    notification.open({
                      message: 'Please verify all the files first.',
                      type: 'info',
                    });
                  } else {
                    setOpen(true);
                  }
                }}
              />
              {isView === 'false' && (
                <>
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
                  {/* {quoteByIdData?.status !== 'Needs Review' && (
                    <OsButton
                      loading={
                        statusValue === 'Needs Review'
                          ? statusUpdateLoading
                          : false
                      }
                      text="Submit For Review"
                      buttontype="PRIMARY"
                      clickHandler={() => {
                        if (
                          quoteFileUnverifiedById &&
                          quoteFileUnverifiedById?.length > 0
                        ) {
                          notification?.open({
                            message:
                              'Please verify all the files first to mark as Complete this Quote',
                            type: 'info',
                          });
                          return;
                        }
                        setStatusValue('Needs Review');
                        commonUpdateCompleteAndDraftMethod('Needs Review');
                      }}
                    />
                  )} */}
                </>
              )}

              <OsButton
                buttontype="PRIMARY_ICON"
                clickHandler={() => {
                  if (isView === 'true') {
                    notification.open({
                      message: "You can't use in view mode.",
                      type: 'info',
                    });
                  } else setShowDocumentModal(true);
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
                {activeTab === '6' && isView === 'false' && (
                  <div style={{marginTop: '20px'}}>
                    <OsButton
                      text="Add Attachment"
                      buttontype="PRIMARY"
                      clickHandler={() => {
                        setAddNewCustomerQuote(true);
                      }}
                    />
                  </div>
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
                        defaultValue="all"
                      />
                    ) : (
                      <CommonSelect
                        key={2}
                        disabled={activeTab === '1'}
                        style={{width: '319px'}}
                        placeholder="Select Grouping here"
                        options={selectData}
                        onChange={(e) => {
                          setSelectedFilter(e);
                          setCollapseActiveKeys([]);
                        }}
                        allowClear
                        value={selectedFilter}
                      />
                    )}

                    {(activeTab === '2' || activeTab === '4') &&
                      isView === 'false' && (
                        <Space>
                          <OsDropdown menu={{items}} />
                        </Space>
                      )}
                  </Space>
                </Space>
              </Space>
            }
          >
            {TabPaneData &&
              TabPaneData.length > 0 &&
              TabPaneData.map((item, index) => {
                if (!item || !item.name || !item.children) return null; // Skip invalid items
                console.log('Rendering TabPane:', item);
                return (
                  <TabPane
                    key={item.key}
                    tab={
                      <Typography name="Body 4/Regular">{item.name}</Typography>
                    }
                  >
                    {item.children}
                  </TabPane>
                );
              })}
            {/* {TabPaneData &&
              TabPaneData?.length > 0 &&
              TabPaneData?.map((item: any, index: number) => {
                console.log('3432423423432', item, TabPaneData);
                return (
                  <>
                    <TabPane
                      key={index}
                      tab={
                        <Typography name="Body 4/Regular">
                          {item?.name}
                        </Typography>
                      }
                    >
                      {item?.children}
                    </TabPane>
                  </>
                );
              })} */}
          </OsTabs>
        </Row>
      </Space>

      <OsDrawer
        title={<Typography name="Body 1/Regular">Quote Settings</Typography>}
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={form.submit}
            />
          </Row>
        }
      >
        <DrawerContent
          form={form}
          onFinish={onFinish}
          totalValues={totalValues}
        />
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
    </Suspense>
  );
};

export default GenerateQuote;
