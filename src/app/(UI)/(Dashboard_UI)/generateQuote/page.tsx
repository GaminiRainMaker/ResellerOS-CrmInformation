/* eslint-disable react-hooks/rules-of-hooks */
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
import {selectData} from '@/app/utils/CONSTANTS';
import {formatDate, useRemoveDollarAndCommahook} from '@/app/utils/base';
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';
import {Form, MenuProps, notification} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getAllContractSetting} from '../../../../../redux/actions/contractSetting';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {
  updateQuoteById,
  updateQuoteStatusById,
} from '../../../../../redux/actions/quote';
import {getAllTableColumn} from '../../../../../redux/actions/tableColumn';
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
  const [form] = Form.useForm();
  const [updationForm] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getQuoteID = searchParams.get('id');
  const activeTabRoute = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<any>('1');
  const {quoteLineItemByQuoteID, loading} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [selectTedRowData, setSelectedRowData] = useState<React.Key[]>([]);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [amountData, setAmountData] = useState<any>();
  const [open, setOpen] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState<boolean>(false);
  const [isDeleteInputDetailModal, setIsDeleteInputDetailModal] =
    useState<boolean>(false);
  const [isDeleteProfitabilityModal, setIsDeleteProfitabilityModal] =
    useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('File Name');
  const [familyFilter, setFamilyFilter] = useState<any>([]);
  const [quoteLineItemByQuoteData, setQuoteLineItemByQuoteData] =
    useState<any>();
  const {data: tableColumnData} = useAppSelector((state) => state.tableColumn);
  const {data: contractSettingData} = useAppSelector(
    (state) => state.contractSetting,
  );
  const [tableColumnDataShow, setTableColumnDataShow] = useState<[]>();
  const [profitabilityData, setProfitabilityData] = useState<any>();
  const [finalInputColumn, setFinalInputColumn] = useState<any>();
  const [quoteLineItemExist, setQuoteLineItemExist] = useState<boolean>(false);
  const {data: quoteFileData} = useAppSelector((state) => state.quoteFile);
  const [showUpdateLineItemModal, setShowUpdateLineItemModal] =
    useState<boolean>(false);
  useEffect(() => {
    dispatch(getAllTableColumn(''));
    dispatch(getAllContractSetting(''));
  }, []);
  useEffect(() => {
    if (activeTabRoute === '2') {
      setActiveTab('2');
    }
  }, [activeTabRoute]);
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

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, [getQuoteID]);

  useEffect(() => {
    setQuoteLineItemByQuoteData(quoteLineItemByQuoteID);
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
          adjustPrice += useRemoveDollarAndCommahook(item?.adjusted_price);

          lineAmount += useRemoveDollarAndCommahook(item?.line_amount);

          listPrice += useRemoveDollarAndCommahook(item?.list_price);

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

  const commonUpdateCompleteAndDraftMethod = (status: string) => {
    // if (getQuoteID) {
    //   const data = {
    //     id: getQuoteID,
    //     query: queryItem,
    //   };
    //   dispatch(updateQuoteByQuery(data));
    // }
    // quoteLineItemByQuoteData?.map((prev: any) => {
    //   if (selectTedRowIds?.includes(prev?.id)) {
    //     const obj = {
    //       id: prev?.id,
    //       quantity: prev?.quantity,
    //     };
    //     return dispatch(UpdateQuoteLineItemQuantityById(obj));
    //   }
    // });

    if (getQuoteID) {
      const obj = {
        ids: getQuoteID,
        status,
      };
      dispatch(updateQuoteStatusById(obj));
    }
    router?.push('/allQuote');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          cursor="pointer"
          onClick={() => setShowBundleModal((p) => !p)}
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
            if (selectTedRowIds?.length > 0) {
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
        <Typography
          name="Body 4/Regular"
          cursor="pointer"
          color={token?.colorTextBase}
          onClick={() => setActiveTab('1')}
        >
          Review Quotes
        </Typography>
      ),
      children: (
        <InputDetails
          setIsDeleteInputDetailModal={setIsDeleteInputDetailModal}
          isDeleteInputDetailModal={isDeleteInputDetailModal}
          tableColumnDataShow={tableColumnDataShow}
          setFinalInputColumn={setFinalInputColumn}
          finalInputColumn={finalInputColumn}
          selectedFilter={selectedFilter}
          familyFilter={familyFilter}
          setFamilyFilter={setFamilyFilter}
          setSelectedRowIds={setSelectedRowIds}
          selectTedRowIds={selectTedRowIds}
          setQuoteLineItemExist={setQuoteLineItemExist}
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
        <Profitability
          profitabilityData={profitabilityData}
          setProfitabilityData={setProfitabilityData}
          tableColumnDataShow={tableColumnDataShow}
          setSelectedRowIds={setSelectedRowIds}
          selectTedRowIds={selectTedRowIds}
          selectedFilter={selectedFilter}
          setSelectedRowData={setSelectedRowData}
          setShowUpdateLineItemModal={setShowUpdateLineItemModal}
          showUpdateLineItemModal={showUpdateLineItemModal}
          selectTedRowData={selectTedRowData}
          isDeleteProfitabilityModal={isDeleteProfitabilityModal}
          setIsDeleteProfitabilityModal={setIsDeleteProfitabilityModal}
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
                clickHandler={() => {
                  setOpen(true);
                }}
              />
              <OsButton
                text="Save"
                buttontype="SECONDARY"
                clickHandler={() => {
                  commonUpdateCompleteAndDraftMethod('In Progress');
                }}
              />
              <AddQuote
                loading={loading}
                buttonText="Add Quote"
                setUploadFileData={setUploadFileData}
                uploadFileData={uploadFileData}
                isGenerateQuote
                existingGenerateQuoteId={Number(getQuoteID)}
              />
              <OsButton
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
                  commonUpdateCompleteAndDraftMethod('Needs Review');
                }}
              />

              <OsButton
                buttontype="PRIMARY_ICON"
                clickHandler={() => {
                  window?.open(quoteLineItemByQuoteData?.[0]?.Quote?.pdf_url);
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
                    disabled={activeTab !== '2'}
                    placeholder="Select Grouping here"
                    options={selectData}
                    onChange={(e) => {
                      setSelectedFilter(e);
                    }}
                    allowClear
                    defaultValue="File Name"
                  />
                  <Space>
                    <OsDropdown menu={{items}} />
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
