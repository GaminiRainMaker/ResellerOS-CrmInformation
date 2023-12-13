/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PlusIcon,
  QueueListIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {
  getProductByPartNo,
  insertProduct,
} from '../../../../../redux/actions/product';
import {
  getAllQuotesWithCompletedAndDraft,
  insertQuote,
  updateQuoteByQuery,
  updateQuoteWithNewlineItemAddByID,
} from '../../../../../redux/actions/quote';
import {insertQuoteLineItem} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import UploadFile from '../generateQuote/UploadFile';
import RecentSection from './RecentSection';

interface FormattedData {
  [key: string]: {
    [key: string]: string | undefined; // Define the inner object structure
  };
}
const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {data: quoteData, loading} = useAppSelector((state) => state.quote);
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [existingQuoteId, setExistingQuoteId] = useState<number>();
  const [completedQuote, setCompletedQuote] = useState<React.Key[]>([]);
  const [draftedQuote, setDraftedQuote] = useState<React.Key[]>([]);
  const [recentQuote, setRecentQuote] = useState<React.Key[]>([]);
  const [selectTedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllQuotesWithCompletedAndDraft());
  }, []);

  useEffect(() => {
    const Completed: any = [];
    const Draft: any = [];
    const Recent: any = [];

    if (quoteData && quoteData?.length > 0) {
      quoteData?.filter((item: any) => {
        if (item?.is_completed) {
          Completed?.push(item);
        } else if (item?.is_drafted && !item?.is_completed) {
          Draft?.push(item);
        } else if (!item?.iscompleted && !item?.is_drafted) {
          Recent?.push(item);
        }
      });
    }
    setCompletedQuote(Completed);
    setDraftedQuote(Draft);
    setRecentQuote(Recent);
  }, [quoteData]);

  const addQuoteLineItem = () => {
    // setExistingQuoteId()
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

    if (labelOcrMap && uploadFileData.length > 0 && !existingQuoteId) {
      dispatch(insertQuote(labelOcrMap)).then((d) => {
        d?.payload?.data?.map((item: any) => {
          const newrrLineItems: any = [];
          if (item?.id) {
            for (let i = 0; i < formattedArray?.length; i++) {
              const items = formattedArray[i];
              dispatch(getProductByPartNo(items?.product_code)).then(
                (productData) => {
                  if (productData?.payload?.id) {
                    const obj123: any = {
                      quote_id: item?.id,
                      product_id: productData?.payload?.id,
                    };
                    newrrLineItems?.push(obj123);
                  } else {
                    dispatch(insertProduct(items)).then((insertedProduct) => {
                      if (insertedProduct?.payload?.data?.id) {
                        const obj1: any = {
                          quote_id: item?.id,
                          product_id: insertedProduct?.payload?.data?.id,
                        };
                        newrrLineItems?.push(obj1);
                      }
                    });
                  }
                },
              );
              console.log('newrrLineItems', newrrLineItems);
              if (newrrLineItems && newrrLineItems.length > 0) {
                console.log('newrrLineItems=====', newrrLineItems);
                dispatch(insertQuoteLineItem(newrrLineItems));
              }
            }
          }
        });
      });
    } else if (existingQuoteId) {
      dispatch(updateQuoteWithNewlineItemAddByID(existingQuoteId));
      const newrrLineItems: any = [];
      for (let i = 0; i < formattedArray?.length; i++) {
        const items = formattedArray[i];
        dispatch(getProductByPartNo(items?.product_code)).then(
          (productData) => {
            if (productData?.payload?.id) {
              const obj123: any = {
                quote_id: existingQuoteId,
                product_id: productData?.payload?.id,
              };
              newrrLineItems?.push(obj123);
            } else {
              dispatch(insertProduct(items)).then((insertedProduct) => {
                if (insertedProduct?.payload?.data?.id) {
                  const obj1: any = {
                    quote_id: existingQuoteId,
                    product_id: insertedProduct?.payload?.data?.id,
                  };
                  newrrLineItems?.push(obj1);
                }
              });
            }
          },
        );
        console.log('newrrLineItems', newrrLineItems);
        if (newrrLineItems && newrrLineItems.length > 0) {
          console.log('newrrLineItems=====', newrrLineItems);
          dispatch(insertQuoteLineItem(newrrLineItems));
        }
      }
    }
    // router.push('/generateQuote');
    setShowModal(false);
    setUploadFileData([]);
  };

  const Quotecolumns = [
    {
      title: (
        <Checkbox
        // checked={selectTedRowIds?.length === quoteLineItemData?.length}
        // onChange={(e: any) => {
        //   let newArrVlaue: any = [];
        //   if (e.target.checked) {
        //     quoteLineItemData?.map((item: any) => {
        //       newArrVlaue?.push(item?.id);
        //     });
        //   } else {
        //     newArrVlaue = [];
        //   }
        //   setSelectedRowIds(newArrVlaue);
        // }}
        />
      ),
      dataIndex: 'Name',
      key: 'filename',
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
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Checkbox
                checked={selectTedRowIds?.includes(record?.id)}
                onChange={(e: any) => {
                  const newArrVlaue: any = showToggleTable
                    ? []
                    : [...selectTedRowIds];
                  if (
                    e.target.checked &&
                    !selectTedRowIds?.includes(record?.id)
                  ) {
                    newArrVlaue?.push(record?.id);
                  } else if (selectTedRowIds?.includes(record?.id)) {
                    // newArrVlaue?.pop(record?.id);
                    const index = newArrVlaue?.indexOf(record?.id);
                    newArrVlaue?.splice(index, 1);
                  }
                  setSelectedRowIds(newArrVlaue);
                }}
              />
            </div>
          ),
        };
      },
    },
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
            <Typography name="Body 4/Regular">{record?.Status}</Typography>
          ),
        };
      },
    },
  ];

  const markAsComplete = () => {
    // let data ={
    //   id :
    // }
    if (draftedQuote && draftedQuote?.length > 0) {
      for (let i = 0; i < draftedQuote?.length; i++) {
        const itemss = draftedQuote[i];

        const data = {
          id: itemss?.id,
          query: 'completed',
        };
        dispatch(updateQuoteByQuery(data));
      }
    }
  };
  const analyticsData = [
    {
      key: 1,
      primary: <div>{quoteData?.length}</div>,
      secondry: 'Total Quotes',
      icon: <QueueListIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{completedQuote?.length}</div>,
      secondry: 'Completed',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <div>{draftedQuote?.length}</div>,
      secondry: 'Drafts',
      icon: <ClipboardDocumentCheckIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <div>{recentQuote?.length}</div>,
      secondry: 'Recents',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: '0',
      secondry: 'Deleted',
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          <div>All</div>
          <div
            style={{borderBottom: activeTab == 1 ? '2px solid #1C3557' : ''}}
          />
        </div>
      ),
      children: (
        <OsTable
          columns={Quotecolumns}
          dataSource={quoteData}
          scroll
          loading={loading}
        />
      ),
    },
    {
      key: '2',
      label: (
        <div>
          <div>Drafts</div>
          <div
            style={{borderBottom: activeTab == 2 ? '2px solid #1C3557' : ''}}
          />
        </div>
      ),
      children: (
        <OsTable
          columns={Quotecolumns}
          dataSource={draftedQuote}
          scroll
          loading={loading}
        />
      ),
    },
    {
      key: '3',
      label: (
        <div>
          <div>Completed</div>
          <div
            style={{borderBottom: activeTab == 3 ? '2px solid #1C3557' : ''}}
          />
        </div>
      ),
      children: (
        <OsTable
          columns={Quotecolumns}
          dataSource={completedQuote}
          scroll
          loading={loading}
        />
      ),
    },
    {
      key: '4',
      label: (
        <div>
          <div>Recent</div>
          <div
            style={{borderBottom: activeTab == 4 ? '2px solid #1C3557' : ''}}
          />
        </div>
      ),
      children: (
        <>
          {/* {recentQuote?.length > 0 ? (
            <OsTable
              columns={Quotecolumns}
              dataSource={recentQuote}
              scroll
              loading={loading}
            />
          ) : ( */}
          <RecentSection
            uploadFileData={uploadFileData}
            setUploadFileData={setUploadFileData}
            Quotecolumns={Quotecolumns}
            addQuoteLineItem={addQuoteLineItem}
            setShowToggleTable={setShowToggleTable}
            showToggleTable={showToggleTable}
          />
          {/* )} */}
        </>
      ),
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
              {' '}
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
              <OsButton
                buttontype="PRIMARY_ICON"
                icon={<EllipsisVerticalIcon />}
              />
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
            items={items}
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
