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
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {Button, MenuProps, TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {insertProduct} from '../../../../../redux/actions/product';
import {
  deleteQuoteById,
  getAllQuotesWithCompletedAndDraft,
  insertQuote,
  updateQuoteByQuery,
  updateQuoteWithNewlineItemAddByID,
} from '../../../../../redux/actions/quote';
import {insertQuoteLineItem} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import UploadFile from '../generateQuote/UploadFile';
import RecentSection from './RecentSection';
import QuoteAnalytics from './analytics';

interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined; // Define the inner object structure
  };
}
const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {data: quotes, loading} = useAppSelector((state) => state.quote);
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [existingQuoteId, setExistingQuoteId] = useState<number>();
  const [quoteData, setQuoteData] = useState<React.Key[]>([]);
  const [deletedQuote, setDeletedQuote] = useState<React.Key[]>([]);
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);
  const [activeQuotes, setActiveQuotes] = useState<React.Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    dispatch(getAllQuotesWithCompletedAndDraft());
  }, []);

  useEffect(() => {
    if (quotes && quotes?.length > 0) {
      const deleted = quotes?.filter((item: any) => item?.is_deleted);
      const notDeleted = quotes?.filter((item: any) => !item?.is_deleted);
      setQuoteData(notDeleted);
      setDeletedQuote(deleted);
    }
  }, [quotes]);

  useEffect(() => {
    if (activeTab && quoteData.length > 0) {
      const quoteItems =
        activeTab === '2'
          ? quoteData?.filter((item: any) => item?.is_drafted)
          : activeTab === '3'
          ? quoteData?.filter((item: any) => item?.is_completed)
          : activeTab == '1'
          ? quoteData
          : quoteData?.filter(
              (item: any) => !item?.is_completed && !item?.is_drafted,
            );

      setActiveQuotes(quoteItems);
    }
  }, [activeTab, quoteData]);

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRowIds(selectedRowKeys);
      setExistingQuoteId(Number(selectedRowKeys));
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const addQuoteLineItem = async () => {
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

    const newrrLineItems: any = [];
    if (labelOcrMap && uploadFileData.length > 0 && !existingQuoteId) {
      const response = await dispatch(insertQuote(labelOcrMap));
      for (let j = 0; j < response?.payload?.data.length; j++) {
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
                description: insertedProduct?.payload?.description,
              };
              newrrLineItems?.push(obj1);
            }
          }
        }
      }
    } else if (existingQuoteId) {
      console.log('existingQuoteId', existingQuoteId);
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
          };
          newrrLineItems?.push(obj1);
        }
      }
    }

    if (newrrLineItems && newrrLineItems.length > 0) {
      dispatch(insertQuoteLineItem(newrrLineItems));
    }

    dispatch(getAllQuotesWithCompletedAndDraft());
    setShowModal(false);
    setUploadFileData([]);
  };

  const Quotecolumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'line',
      width: 130,
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
            <Typography name="Body 4/Regular">{record?.createdAt}</Typography>
          ),
        };
      },
    },
    {
      title: 'Opportunity',
      dataIndex: 'Opportunity',
      key: 'Opportunity',
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
            <Typography name="Body 4/Regular">{record?.Opportunity}</Typography>
          ),
        };
      },
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
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
            <Typography name="Body 4/Regular">
              {record?.customer_name}
            </Typography>
          ),
        };
      },
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
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
            <Typography name="Body 4/Regular">
              {record?.is_completed
                ? 'Completed'
                : record?.is_drafted
                ? 'Drafted'
                : 'Recents'}
            </Typography>
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
            onClick={() => deleteQuote(record?.id)}
          />
        </Space>
      ),
    },
  ];

  const markAsComplete = async () => {
    if (activeQuotes && activeQuotes?.length > 0) {
      const IdsArr: any = [];
      activeQuotes?.map((item: any) => {
        IdsArr?.push(item?.id);
      });
      const data = {
        ids: IdsArr,
        query: 'completed',
      };
      await dispatch(updateQuoteByQuery(data));
      dispatch(getAllQuotesWithCompletedAndDraft());
      setActiveTab('3');
    }
  };
  const deleteQuote = async (id: number) => {
    if (id) {
      await dispatch(deleteQuoteById(id));
    }
  };
  const tabItems: TabsProps['items'] = [
    {
      label: 'All',
      key: '1',
    },
    {
      label: 'Drafts',
      key: '2',
    },
    {
      label: 'Completed',
      key: '3',
    },
    {
      label: 'Recent',
      key: '4',
      children: (
        <>
          {activeQuotes?.length > 0 ? (
            <OsTable
              columns={Quotecolumns}
              dataSource={activeQuotes}
              scroll
              loading={loading}
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
            />
          )}
        </>
      ),
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography name="Body 3/Regular">Bundle Configuration</Typography>
      ),
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
              {activeTab == 2 && (
                <OsButton
                  text="Mark as Complete"
                  buttontype="PRIMARY"
                  // icon={<PlusIcon />}
                  clickHandler={markAsComplete}
                />
              )}
              <OsButton
                text="Add Quote"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />
              <Dropdown
                trigger="click"
                menu={{items: dropDownItemss}}
                placement="bottomRight"
              >
                {/* <OsButton
                        buttontype="PRIMARY_ICON"
                        // clickHandler={deleteLineItems}
                        icon={<EllipsisVerticalIcon width={24} />}
                      /> */}
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
                  <CommonDatePicker placeholder="dd/mm/yyyy" />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">To Date</Typography>
                  <CommonDatePicker placeholder="dd/mm/yyyy" />
                </Space>
                <Typography name="Button 1" color="#C6CDD5">
                  Reset
                </Typography>
              </Space>
            }
            items={tabItems.map((tabItem: any, index: number) => ({
              key: `${index + 1}`,
              label: (
                <div>
                  <div>{tabItem?.label}</div>
                  <div
                    style={{
                      borderBottom:
                        activeTab == index + 1 ? '2px solid #1C3557' : '',
                    }}
                  />
                </div>
              ),
              children: (
                <OsTable
                  columns={Quotecolumns}
                  dataSource={activeQuotes}
                  scroll
                  loading={loading}
                />
              ),
              ...tabItem,
            }))}
          />
        </Row>
      </Space>

      <OsModal
        loading={loading}
        body={
          <UploadFile
            setUploadFileData={setUploadFileData}
            uploadFileData={uploadFileData}
            addInExistingQuote
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

export default AllQuote;
