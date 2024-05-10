/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */

'use client';

import AddQuote from '@/app/components/common/addQuote';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {
  deleteQuoteById,
  getQuotesByDateFilter,
  updateQuoteByQuery,
} from '../../../../../redux/actions/quote';

import {getAllSyncTable} from '../../../../../redux/actions/syncTable';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import QuoteAnalytics from './analytics';
import {tabItems} from './constants';
import {getColumns} from './tableColumns';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {loading, filteredByDate: filteredData} = useAppSelector(
    (state) => state.quote,
  );
  const router = useRouter();
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [quoteData, setQuoteData] = useState<React.Key[]>([]);
  const [deletedQuote, setDeletedQuote] = useState<React.Key[]>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);
  const [activeQuotes, setActiveQuotes] = useState<React.Key[]>([]);
  const [fromToDates, setFromToDates] = useState({
    beforeDays: null,
    afterDays: null,
  });
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteModalDescription, setDeleteModalDescription] =
    useState<string>('');
  const [deleteIds, setDeleteIds] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllSyncTable('QuoteLineItem'));
  }, []);

  useEffect(() => {
    if (Object.keys(fromToDates).length > 0) {
      dispatch(getQuotesByDateFilter(fromToDates));
    }
  }, [fromToDates]);

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
          ? quoteData?.filter((item: any) =>
              item?.status?.includes('In Progress'),
            )
          : activeTab === '5'
            ? quoteData?.filter((item: any) =>
                item?.status?.includes('In Review'),
              )
            : activeTab === '4'
              ? quoteData?.filter((item: any) =>
                  item?.status?.includes('Needs Review'),
                )
              : activeTab === '1'
                ? quoteData
                : activeTab === '6'
                  ? quoteData?.filter((item: any) =>
                      item?.status?.includes('Approved'),
                    )
                  : activeTab === '7'
                    ? quoteData?.filter((item: any) =>
                        item?.status?.includes('Rejected'),
                      )
                    : activeTab === '2'
                      ? quoteData?.filter((item: any) =>
                          item?.status?.includes('Drafts'),
                        )
                      : [];
      setActiveQuotes(quoteItems);
    } else {
      setActiveQuotes([]);
    }
  }, [activeTab, quoteData]);

  const statusWrapper = (item: any) => {
    const getStatus = () => {
      if (!item.is_completed && !item.is_drafted) {
        return 'Drafts';
      }
      if (item.is_drafted) {
        return 'In Progress';
      }
      if (item?.approver_id === userInformation?.id) {
        return 'In Review';
      }
      if (item?.rejected_request) {
        return 'Rejected';
      }
      if (item?.approved_request) {
        return 'Approved';
      }
      if (
        item.is_completed &&
        item?.approver_id !== userInformation?.id &&
        !item?.approved_request &&
        !item?.rejected_request
      ) {
        return 'Needs Review';
      }
      return '--';
    };

    return <OsStatusWrapper value={getStatus()} />;
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const editQuote = (quoteId: string) => {
    router.push(`/generateQuote?id=${quoteId}`);
  };
  const deleteQuote = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteQuoteById(data));
    setTimeout(() => {
      dispatch(getQuotesByDateFilter({}));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };
  const Quotecolumns = getColumns(
    token,
    statusWrapper,
    editQuote,
    setDeleteIds,
    setShowModalDelete,
  );

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
        buttonContainer={
          <AddQuote
            uploadFileData={uploadFileData}
            setUploadFileData={setUploadFileData}
            loading={loading}
            buttonText="Add Quote"
          />
        }
      />
    ),
  };

  const dropDownItems = [
    {
      key: '1',
      label: (
        <Typography name="Body 3/Regular" cursor="pointer">
          Download Selected
        </Typography>
      ),
    },
    {
      key: '2',
      label: (
        <Typography
          name="Body 3/Regular"
          color={token?.colorError}
          cursor="pointer"
          onClick={() => {
            if (deleteIds?.length > 1) {
              setDeleteModalDescription(
                `Are you sure you want to delete these Quote?`,
              );
            } else {
              setDeleteModalDescription(
                `Are you sure you want to delete this Quote?`,
              );
            }
            deleteIds?.length > 0 && setShowModalDelete(true);
          }}
        >
          Delete Selected
        </Typography>
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
              {activeTab === 3 && deleteIds && deleteIds?.length > 0 && (
                <OsButton
                  text="Mark as Complete"
                  buttontype="PRIMARY"
                  clickHandler={markAsComplete}
                />
              )}

              <AddQuote
                uploadFileData={uploadFileData}
                setUploadFileData={setUploadFileData}
                loading={loading}
                buttonText="Add Quote"
                setShowToggleTable={setShowToggleTable}
                showToggleTable={showToggleTable}
                Quotecolumns={Quotecolumns}
              />

              <Space>
                <OsDropdown menu={{items: dropDownItems}} />
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
                    value={fromToDates?.afterDays}
                    placeholder="MM-DD-YYYY"
                    format="MM-DD-YYYY"
                    onChange={(v: any) => {
                      const obj: any = {...fromToDates};
                      obj.afterDays = v;
                      setFromToDates(v);
                    }}
                  />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">To Date</Typography>
                  <CommonDatePicker
                    value={fromToDates?.beforeDays}
                    placeholder="MM-DD-YYYY"
                    format="MM-DD-YYYY"
                    onChange={(v: any) => {
                      const obj: any = {...fromToDates};
                      obj.beforeDays = v;
                      setFromToDates(v);
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
                    onClick={() => {
                      setFromToDates({beforeDays: null, afterDays: null});
                    }}
                  >
                    Reset
                  </Typography>
                </div>
              </Space>
            }
            items={
              tabItems &&
              tabItems?.map((tabItem: any, index: number) => ({
                key: `${index + 1}`,
                label: (
                  <Typography
                    name="Body 4/Medium"
                    cursor="pointer"
                    color={token?.colorTextBase}
                  >
                    {tabItem.label}
                  </Typography>
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
              }))
            }
          />
        </Row>
      </Space>
      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteQuote}
        heading="Delete Quote"
        description={deleteModalDescription}
      />
    </>
  );
};

export default AllQuote;
