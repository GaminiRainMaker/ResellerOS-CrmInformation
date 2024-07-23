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
import {
  getQuoteById,
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
const Rebates = dynamic(() => import('./allTabs/Rebates'), {
  ssr: false,
});
const Validation = dynamic(() => import('./allTabs/Validation'), {
  ssr: false,
});
const AttachmentDocument = dynamic(() => import('./allTabs/Attachment/index'), {
  ssr: false,
});
const ReviewQuotes = dynamic(() => import('./allTabs/ReviewQuotes'), {
  ssr: false,
});

import dynamic from 'next/dynamic';
import {getRebateQuoteLineItemByQuoteId} from '../../../../../redux/actions/rebateQuoteLineitem';
import {getAllValidationByQuoteId} from '../../../../../redux/actions/validation';
import DrawerContent from './DrawerContent';
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
  const [activeTab, setActiveTab] = useState<any>('1');
  const {loading} = useAppSelector((state) => state.quoteLineItem);
  const {quoteById} = useAppSelector((state) => state.quote);
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
      dispatch(getQuoteFileCount(Number(getQuoteID)));
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

  useEffect(() => {
    if (getQuoteFileDataCount === 0) {
      setActiveTab('2');
    }
  }, [getQuoteFileDataCount]);

  const getQuoteDetailById = async () => {
    dispatch(getQuoteByIdForFormStack(Number(getQuoteID)))?.then(
      (payload: any) => {
        dispatch(getAllBundle(Number(getQuoteID)))?.then(
          (payloadBundle: any) => {
            if (payloadBundle?.payload?.length > 0) {
              const newBundleData: any = [];
              payloadBundle?.payload?.map((items: any) => {
                if (items?.Profitabilities?.length > 0) {
                  newBundleData?.push(items);
                }
              });
              let newObj = {
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
              delete newObj?.Customer;
              delete newObj?.Opportunity,
                delete newObj?.Profitabilities,
                setObjectForSyncingValues(newObj);
            } else {
              let newObj = {
                ...payload?.payload?.Customer,
                ...payload?.payload?.Opportunity,
                ...payload?.payload,
                customer_id: payload?.payload?.Customer?.id,
                opportunity_id: payload?.payload?.Opportunity?.id,
                quoute_line_item_id: payload?.payload?.Profitabilities?.id,
                quote_id: payload?.payload?.id,
                QuoteLineItems: payload?.payload?.Profitabilities,
              };
              delete newObj?.Customer;
              delete newObj?.Opportunity,
                delete newObj?.Profitabilities,
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
                    : 'For these Line items bundle is already created.';
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
              let bundleCount = selectTedRowData.filter(
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
          getQuoteDetailById={getQuoteDetailById}
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
      children: (
        <Rebates
          tableColumnDataShow={tableColumnDataShow}
          selectedFilter={selectedFilter}
          collapseActiveKeys={collapseActiveKeys}
          setCollapseActiveKeys={setCollapseActiveKeys}
        />
      ),
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
      children: (
        <Validation
          tableColumnDataShow={tableColumnDataShow}
          selectedFilter={selectedFilter}
          collapseActiveKeys={collapseActiveKeys}
          setCollapseActiveKeys={setCollapseActiveKeys}
        />
      ),
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
          {quoteById?.file_name ??
            formatDate(quoteById?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
    <>
      {contextHolder}
      <Space size={12} direction="vertical" style={{width: '100%'}}>
        <GenerateQuoteAnalytics />

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
                  if (quoteFileUnverifiedById?.length > 0) {
                    notification.open({
                      message: 'Please verify all the files first.',
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
                        defaultValue={'all'}
                      />
                    ) : (
                      <CommonSelect
                        key={2}
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
        <DrawerContent form={form} onFinish={onFinish} />
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
