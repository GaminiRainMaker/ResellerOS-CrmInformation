/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
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
// eslint-disable-next-line import/no-extraneous-dependencies

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
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {
  deleteQuoteById,
  getQuotesByDateFilter,
  updateQuoteByQuery,
} from '../../../../../redux/actions/quote';

import {getAllSyncTable} from '../../../../../redux/actions/syncTable';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import RecentSection from './RecentSection';
import QuoteAnalytics from './analytics';
import {dropDownItems, tabItems} from './constants';
import getColumns from './tableColumns';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {loading, filteredByDate: filteredData} = useAppSelector(
    (state) => state.quote,
  );
  const router = useRouter();
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [existingQuoteId, setExistingQuoteId] = useState<number>();
  const [quoteData, setQuoteData] = useState<React.Key[]>([]);
  const [deletedQuote, setDeletedQuote] = useState<React.Key[]>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);
  const [activeQuotes, setActiveQuotes] = useState<React.Key[]>([]);
  const [fromToDates, setFromToDates] = useState({
    beforeDays: null,
    afterDays: null,
  });
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
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
          ? quoteData?.filter((item: any) => item?.is_drafted)
          : activeTab === '5'
            ? quoteData?.filter(
                (item: any) => item?.approver_id === userInformation?.id,
              )
            : activeTab === '4'
              ? quoteData?.filter(
                  (item: any) =>
                    item.is_completed &&
                    item?.approver_id !== userInformation?.id &&
                    !item?.approved_request &&
                    !item?.rejected_request,
                )
              : activeTab == '1'
                ? quoteData
                : activeTab === '6'
                  ? quoteData?.filter((item: any) => item?.approved_request)
                  : activeTab === '7'
                    ? quoteData?.filter((item: any) => item?.rejected_request)
                    : quoteData?.filter(
                        (item: any) => !item?.is_completed && !item?.is_drafted,
                      );
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
      setExistingQuoteId(Number(selectedRowKeys));
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
            existingQuoteId={existingQuoteId}
            buttonText="Add Quote"
          />
        }
      />
    ),
  };

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
              {activeTab == 3 && deleteIds && deleteIds?.length > 0 && (
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
                existingQuoteId={existingQuoteId}
                buttonText="Add Quote"
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
                    placeholder="MM/DD/YYYY"
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
                    placeholder="MM/DD/YYYY"
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
              tabItems.map((tabItem: any, index: number) => ({
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
                  <>
                    {tabItem.label === 'Drafts' ? (
                      activeQuotes?.length > 0 ? (
                        <OsTable
                          columns={Quotecolumns}
                          dataSource={activeQuotes}
                          scroll
                          loading={loading}
                          locale={locale}
                          rowSelection={rowSelection}
                        />
                      ) : (
                        <RecentSection
                          uploadFileData={uploadFileData}
                          setUploadFileData={setUploadFileData}
                          Quotecolumns={Quotecolumns}
                          setShowToggleTable={setShowToggleTable}
                          showToggleTable={showToggleTable}
                          rowSelection={rowSelection}
                        />
                      )
                    ) : (
                      <OsTable
                        key={tabItem?.key}
                        columns={Quotecolumns}
                        dataSource={activeQuotes}
                        scroll
                        loading={loading}
                        locale={locale}
                        rowSelection={rowSelection}
                      />
                    )}
                  </>
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
        description="Are you sure you want to delete this Quote?"
      />
    </>
  );
};

export default AllQuote;
