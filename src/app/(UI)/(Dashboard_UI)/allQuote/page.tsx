/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Typography from '@/app/components/common/typography';
import {EyeIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
// eslint-disable-next-line import/no-extraneous-dependencies

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {Form, MenuProps, TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {getContractProductByProductCode} from '../../../../../redux/actions/contractProduct';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {insertOpportunityLineItem} from '../../../../../redux/actions/opportunityLineItem';
import {insertProduct} from '../../../../../redux/actions/product';
import {insertProfitability} from '../../../../../redux/actions/profitability';
import {
  deleteQuoteById,
  getQuotesByDateFilter,
  insertQuote,
  updateQuoteByQuery,
  updateQuoteWithNewlineItemAddByID,
} from '../../../../../redux/actions/quote';
import {insertQuoteLineItem} from '../../../../../redux/actions/quotelineitem';
import {getRebatesByProductCode} from '../../../../../redux/actions/rebate';
import {insertRebateQuoteLineItem} from '../../../../../redux/actions/rebateQuoteLineitem';
import {getAllSyncTable} from '../../../../../redux/actions/syncTable';
import {insertValidation} from '../../../../../redux/actions/validation';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import UploadFile from '../generateQuote/UploadFile';
import RecentSection from './RecentSection';
import QuoteAnalytics from './analytics';

interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined;
  };
}
const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {loading, filteredByDate: filteredData} = useAppSelector(
    (state) => state.quote,
  );
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [existingQuoteId, setExistingQuoteId] = useState<number>();
  const [quoteData, setQuoteData] = useState<React.Key[]>([]);
  const [deletedQuote, setDeletedQuote] = useState<React.Key[]>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);
  const [activeQuotes, setActiveQuotes] = useState<React.Key[]>([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const [customerValue, setCustomerValue] = useState<any>();
  const {data: generalSettingData} = useAppSelector(
    (state) => state.gereralSetting,
  );
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);

  const {data: syncTableData} = useAppSelector((state) => state.syncTable);

  useEffect(() => {
    dispatch(getAllSyncTable('QuoteLineItem'));
  }, []);

  useEffect(() => {
    let obj = {};
    if (toDate && fromDate) {
      obj = {
        beforeDays: toDate,
        afterDays: fromDate,
      };
    }
    dispatch(getQuotesByDateFilter(obj));
  }, [fromDate, toDate]);

  const handleReset = () => {
    setFromDate(null);
    setToDate(null);
  };

  useEffect(() => {
    if (filteredData && filteredData?.length > 0) {
      const deleted = filteredData?.filter((item: any) => item?.is_deleted);
      const notDeleted = filteredData?.filter((item: any) => !item?.is_deleted);
      setQuoteData(notDeleted);
      setDeletedQuote(deleted);
    } else {
      setQuoteData([]);
      setDeletedQuote([]);
    }
  }, [filteredData]);

  useEffect(() => {
    if (activeTab && quoteData.length > 0) {
      const quoteItems =
        activeTab === '3'
          ? quoteData?.filter((item: any) => item?.is_drafted)
          : activeTab === '4'
            ? quoteData?.filter((item: any) => item?.is_completed)
            : activeTab == '1'
              ? quoteData
              : quoteData?.filter(
                  (item: any) => !item?.is_completed && !item?.is_drafted,
                );
      setActiveQuotes(quoteItems);
    } else {
      setActiveQuotes([]);
    }
  }, [activeTab, quoteData]);

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setExistingQuoteId(Number(selectedRowKeys));
      setDeleteIds(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const addQuoteLineItem = async (
    customerId?: string,
    opportunityId?: string,
  ) => {
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
      labelOcrMap?.push({
        ...tempLabelOcrMap,
        pdf_url: uploadFileDataItem?.pdf_url,
        customer_id: customerId,
        opportunity_id: opportunityId,
        organization: userInformation.organization,
      });
    });
    const newrrLineItems: any = [];
    const rebateDataArray: any = [];
    const contractProductArray: any = [];
    if (labelOcrMap && uploadFileData.length > 0 && !existingQuoteId) {
      const response = await dispatch(insertQuote(labelOcrMap));
      setCustomerValue('');
      form.resetFields(['customer_id']);
      for (let j = 0; j < response?.payload?.data?.length; j++) {
        const item = response?.payload?.data[j];
        if (item?.id) {
          for (let i = 0; i < formattedArray?.length; i++) {
            const items = formattedArray[i];
            const insertedProduct = await dispatch(insertProduct(items));
            if (insertedProduct?.payload?.id) {
              const obj1: any = {
                quote_id: item?.id,
                product_id: insertedProduct?.payload?.id,
                product_code: insertedProduct?.payload?.product_code,
                line_amount: insertedProduct?.payload?.line_amount,
                list_price: insertedProduct?.payload?.list_price,
                adjusted_price: insertedProduct?.payload?.adjusted_price,
                description: insertedProduct?.payload?.description,
                quantity: insertedProduct?.payload?.quantity,
                line_number: insertedProduct?.payload?.line_number,
                pdf_url:
                  generalSettingData?.attach_doc_type === 'quote_line_item'
                    ? item?.pdf_url
                    : null,
              };
              const RebatesByProductCodData = await dispatch(
                getRebatesByProductCode(insertedProduct?.payload?.product_code),
              );
              if (RebatesByProductCodData?.payload?.id) {
                rebateDataArray?.push({
                  ...obj1,
                  rebate_id: RebatesByProductCodData?.payload?.id,
                  percentage_payout:
                    RebatesByProductCodData?.payload?.percentage_payout,
                });
              }
              const contractProductByProductCode = await dispatch(
                getContractProductByProductCode(
                  insertedProduct?.payload?.product_code,
                ),
              );
              if (contractProductByProductCode?.payload?.id) {
                contractProductArray?.push({
                  ...obj1,
                  contract_product_id:
                    contractProductByProductCode?.payload?.id,
                });
              }
              newrrLineItems?.push(obj1);
            }
          }
        }
      }
    }
    else if (existingQuoteId) {
      await dispatch(updateQuoteWithNewlineItemAddByID(existingQuoteId));
      for (let i = 0; i < formattedArray?.length; i++) {
        const items = formattedArray[i];
        const insertedProduct = await dispatch(insertProduct(items));
        if (insertedProduct?.payload?.id) {
          const obj1: any = {
            quote_id: existingQuoteId,
            product_id: insertedProduct?.payload?.id,
            product_code: insertedProduct?.payload?.product_code,
            line_amount: insertedProduct?.payload?.line_amount,
            list_price: insertedProduct?.payload?.list_price,
            description: insertedProduct?.payload?.description,
            quantity: insertedProduct?.payload?.quantity,
            adjusted_price: insertedProduct?.payload?.adjusted_price,
            line_number: insertedProduct?.payload?.line_number,
          };
          const RebatesByProductCodData = await dispatch(
            getRebatesByProductCode(insertedProduct?.payload?.product_code),
          );
          if (RebatesByProductCodData?.payload?.id) {
            rebateDataArray?.push({
              ...obj1,
              rebate_id: RebatesByProductCodData?.payload?.id,
              percentage_payout:
                RebatesByProductCodData?.payload?.percentage_payout,
            });
          }
          const contractProductByProductCode = await dispatch(
            getContractProductByProductCode(
              insertedProduct?.payload?.product_code,
            ),
          );
          if (contractProductByProductCode?.payload?.id) {
            contractProductArray?.push({
              ...obj1,
              contract_product_id: contractProductByProductCode?.payload?.id,
            });
          }
          newrrLineItems?.push(obj1);
        }
      }
    }
    if (rebateDataArray && rebateDataArray.length > 0) {
      dispatch(insertRebateQuoteLineItem(rebateDataArray));
    }
    if (contractProductArray && contractProductArray.length > 0) {
      dispatch(insertValidation(contractProductArray));
    }
    const finalOpportunityArray: any = [];
    if (newrrLineItems && syncTableData?.length > 0) {
      const newRequiredArray: any = [];
      syncTableData?.map((item: any) => {
        if (item?.is_required) {
          newRequiredArray?.push({
            sender: item?.sender_table_col,
            reciver: item?.reciver_table_col,
          });
        }
      });
      const newArrayForOpporQuoteLineItem: any = [];
      for (let i = 0; i < newrrLineItems?.length; i++) {
        const itemsss: any = newrrLineItems[i];
        newRequiredArray?.map((itemsRe: any) => {
          newArrayForOpporQuoteLineItem?.push({
            key: itemsRe?.reciver,
            value: itemsss?.[itemsRe?.sender],
          });
        });
      }

      const resultArrForAllArr: any = [];
      const checkValue = syncTableData?.length;

      newArrayForOpporQuoteLineItem.forEach((item: any, index: number) => {
        if (index % checkValue === 0) {
          resultArrForAllArr.push(
            newArrayForOpporQuoteLineItem.slice(index, index + checkValue),
          );
        }
      });

      resultArrForAllArr?.map((itemss: any) => {
        const singleObjects = itemss.reduce(
          (obj: any, item: any) => Object.assign(obj, {[item.key]: item.value}),
          {},
        );
        finalOpportunityArray?.push(singleObjects);
      });
    }
    if (newrrLineItems && newrrLineItems.length > 0) {
      dispatch(insertQuoteLineItem(newrrLineItems));
      dispatch(insertProfitability(newrrLineItems));
    }
    if (finalOpportunityArray && syncTableData?.length > 0) {
      dispatch(insertOpportunityLineItem(finalOpportunityArray));
    }

    dispatch(getQuotesByDateFilter({}));
    setShowModal(false);
    setUploadFileData([]);
  };

  const deleteQuote = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteQuoteById(data));
    setTimeout(() => {
      dispatch(getQuotesByDateFilter({}));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
    form.resetFields(['opportunity_id', 'customer_id']);
  };
  const Quotecolumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          File Name
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {moment(text).format('MM/DD/YYYY') ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Opportunity
        </Typography>
      ),
      dataIndex: 'opportunity',
      key: 'opportunity',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/opportunityDetail?id=${record?.Opportunity?.id}`);
          }}
          hoverOnText
        >
          {record?.Opportunity?.title ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Name
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/accountDetails?id=${record?.Customer?.id}`);
          }}
          hoverOnText
        >
          {record?.Customer?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string, record: any) => {
        const statusValue = record.is_completed
          ? 'Completed'
          : record?.is_drafted
            ? 'In Progress'
            : 'Drafts';
        return <OsStatusWrapper value={statusValue} />;
      },
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <EyeIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              router.push(`/generateQuote?id=${record?.id}`);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeleteIds([record?.id]);
              setShowModalDelete(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const markAsComplete = async () => {
    if (deleteIds && deleteIds?.length > 0) {
      const data = {
        ids: deleteIds,
        query: 'completed',
      };
      await dispatch(updateQuoteByQuery(data));
      dispatch(getQuotesByDateFilter({}));
      setActiveTab('4');
    }
  };

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Medium">All</Typography>,
      key: '1',
    },
    {
      label: <Typography name="Body 4/Medium">Drafts</Typography>,
      key: '2',
      children: (
        <>
          {activeQuotes?.length > 0 ? (
            <OsTable
              columns={Quotecolumns}
              dataSource={activeQuotes}
              scroll
              loading={loading}
              locale={locale}
            />
          ) : (
            <RecentSection
              uploadFileData={uploadFileData}
              setUploadFileData={setUploadFileData}
              Quotecolumns={Quotecolumns}
              addQuoteLineItem={addQuoteLineItem}
              setShowToggleTable={setShowToggleTable}
              showToggleTable={showToggleTable}
              rowSelection={rowSelection}
              form={form}
            />
          )}
        </>
      ),
    },

    {
      label: <Typography name="Body 4/Medium">In Progress</Typography>,
      key: '3',
    },
    {
      label: <Typography name="Body 4/Medium">Completed</Typography>,
      key: '4',
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '2',
      label: <Typography name="Body 3/Regular">Download Selected</Typography>,
    },
    {
      key: '3',
      label: <Typography name="Body 3/Regular">Delete Selected</Typography>,
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <QuoteAnalytics quoteData={quoteData} deletedQuote={deletedQuote} />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Quotes
            </Typography>
          </Col>
          <Col>
            <div
              style={{
                display: 'flex',
                width: '40%',
                gap: '8px',
              }}
            >
              {activeTab == 3 && (
                <OsButton
                  text="Mark as Complete"
                  buttontype="PRIMARY"
                  clickHandler={markAsComplete}
                />
              )}
              <OsButton
                text="Add Quote"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => {
                  setShowModal((p) => !p);
                  setCustomerValue('');
                }}
              />

              <Space>
                <OsDropdown menu={{items: dropDownItemss}} />
              </Space>
            </div>
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
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">From Date</Typography>
                  <CommonDatePicker
                    value={fromDate}
                    placeholder="MM/DD/YYYY"
                    onChange={(v: any) => {
                      setFromDate(v);
                    }}
                  />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">To Date</Typography>
                  <CommonDatePicker
                    value={toDate}
                    placeholder="MM/DD/YYYY"
                    onChange={(v: any) => {
                      setToDate(v);
                    }}
                  />
                </Space>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    style={{cursor: 'pointer'}}
                    color={token?.colorLink}
                    onClick={handleReset}
                  >
                    Reset
                  </Typography>
                </div>
              </Space>
            }
            items={tabItems.map((tabItem: any, index: number) => ({
              key: `${index + 1}`,
              label: (
                <div>
                  <div>{tabItem?.label}</div>
                  <div
                    style={{
                      // eslint-disable-next-line eqeqeq
                      borderBottom:
                        // eslint-disable-next-line eqeqeq
                        activeTab == tabItem?.key ? '2px solid #1C3557' : '',
                      // marginTop: '3px',
                    }}
                  />
                </div>
              ),
              children: (
                <OsTable
                  key={tabItem?.key}
                  columns={Quotecolumns}
                  dataSource={activeQuotes}
                  scroll
                  loading={loading}
                  locale={locale}
                  rowSelection={rowSelection}
                />
              ),
              ...tabItem,
            }))}
          />
        </Row>
      </Space>

      <OsModal
        bodyPadding={22}
        loading={loading}
        disabledButton={!(uploadFileData?.length > 0)}
        body={
          <UploadFile
            setUploadFileData={setUploadFileData}
            uploadFileData={uploadFileData}
            addInExistingQuote
            addQuoteLineItem={addQuoteLineItem}
            form={form}
            setCustomerValue={setCustomerValue}
            customerValue={customerValue}
          />
        }
        width={900}
        primaryButtonText="Generate Single Quote"
        secondaryButtonText="Save & Generate Individual Quotes"
        open={showModal}
        onOk={() => form.submit()}
        onCancel={() => {
          setShowModal((p) => !p);
          setUploadFileData([]);
          form.resetFields(['customer_id']);
        }}
      />

      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteQuote}
        heading="Delete Quote"
        description="Are you sure you want to delete this Quote?"
      />
    </>
  );
};

export default AllQuote;
