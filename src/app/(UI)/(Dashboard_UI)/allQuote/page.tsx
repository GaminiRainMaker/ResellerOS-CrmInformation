/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */

'use client';

import AddQuote from '@/app/components/common/addQuote';
import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CancelIcon from '../../../../../public/assets/static/CancelIcon.svg';
import GreenCheckIcon from '../../../../../public/assets/static/greenCheckIcon.svg';

import {
  deleteQuoteById,
  getQuotesByDateFilter,
  updateQuoteByQuery,
  updateQuoteStatusById,
} from '../../../../../redux/actions/quote';

import DailogModal from '@/app/components/common/os-modal/DialogModal';
import { getAllSyncTable } from '../../../../../redux/actions/syncTable';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import QuoteAnalytics from './analytics';
import { tabItems } from './constants';
import { getColumns, getExistingQuoteColumns } from './tableColumns';
import { getResultedValue } from '@/app/utils/base';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const { loading, filteredByDate: filteredData } = useAppSelector(
    (state) => state.quote,
  );
  const { userInformation } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [quoteData, setQuoteData] = useState<React.Key[]>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);
  const [showApprovedDialogModal, setShowApprovedDialogModal] =
    useState<boolean>(false);
  const [showRejectDialogModal, setShowRejectDialogModal] =
    useState<boolean>(false);
  const [activeQuotes, setActiveQuotes] = useState<React.Key[]>([]);
  const [emptyContainer, setEmptyContainer] = useState<any>();
  const [fromToDates, setFromToDates] = useState({
    beforeDays: null,
    afterDays: null,
  });
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteModalDescription, setDeleteModalDescription] = useState<string>(
    'Are you sure you want to delete this Quote?',
  );
  const [deleteIds, setDeleteIds] = useState<any>();
  const [recordId, setRecordId] = useState<any>({
    ids: null,
    status: '',
  });

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
      setQuoteData(filteredData);
    } else {
      setQuoteData([]);
    }
  }, [filteredData]);

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
  const localeforOtherStatus = {
    emptyText: <EmptyContainer title="No Files" />,
  };

  useEffect(() => {
    if (activeTab && quoteData.length > 0) {
      const quoteItems =
        activeTab === '3'
          ? quoteData?.filter((item: any) =>
            userInformation?.Admin
              ? item?.status?.includes('In Progress')
              : userInformation?.id === item?.user_id &&
              item?.status?.includes('In Progress'),
          )
          : activeTab === '5'
            ? quoteData?.filter((item: any) =>
              userInformation?.Admin
                ? item?.status?.includes('Needs Review') &&
                item?.user_id !== userInformation?.id
                : item?.status?.includes('Needs Review') &&
                item?.approver_id === userInformation?.id,
            )
            : activeTab === '4'
              ? quoteData?.filter((item: any) =>
                userInformation?.Admin
                  ? item?.status?.includes('Needs Review')
                  : item?.status?.includes('Needs Review') &&
                  item?.completed_by === userInformation?.id,
              )
              : activeTab === '1'
                ? userInformation?.Admin
                  ? quoteData
                  : quoteData?.filter(
                    (item: any) =>
                      item?.user_id === userInformation?.id ||
                      item?.approver_id === userInformation?.id,
                  )
                : activeTab === '6'
                  ? quoteData?.filter((item: any) =>
                    userInformation?.Admin
                      ? item?.status?.includes('Approved')
                      : item?.status?.includes('Approved') &&
                      item?.user_id === userInformation?.id,
                  )
                  : activeTab === '7'
                    ? quoteData?.filter((item: any) =>
                      userInformation?.Admin
                        ? item?.status?.includes('Rejected')
                        : item?.status?.includes('Rejected') &&
                        item?.user_id === userInformation?.id,
                    )
                    : activeTab === '2'
                      ? quoteData?.filter((item: any) =>
                        userInformation?.Admin
                          ? item?.status?.includes('Drafts')
                          : userInformation?.id === item?.user_id &&
                          item?.status?.includes('Drafts'),
                      )
                      : [];
      let newArrr = [...quoteItems];
      let sortedArrr = newArrr?.sort((a: any, b: any) => {
        return b.id - a.id;
      });
      setActiveQuotes(sortedArrr);
      if (activeTab === '1' || activeTab === '2') {
        setEmptyContainer(locale);
      } else {
        setEmptyContainer(localeforOtherStatus);
      }
    } else {
      setActiveQuotes([]);
    }
  }, [activeTab, quoteData]);

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
    if (activeTab === '5') {
      router.push(`/generateQuote?id=${quoteId}&isView=${getResultedValue()}`);
    } else {
      router.push(`/generateQuote?id=${quoteId}&isView=${getResultedValue()}`);
    }
  };
  const quoteNameNavigation = (quoteId: string) => {
    window.open(`/generateQuote?id=${quoteId}&isView=${getResultedValue()}`);
  };

  const updateStatus = () => {
    if (recordId) {
      dispatch(updateQuoteStatusById(recordId)).then((d) => {
        if (d?.payload) {
          dispatch(getQuotesByDateFilter({}));
          setShowApprovedDialogModal(false);
          setShowRejectDialogModal(false);
        }
      });
    }
  };

  const deleteQuote = async () => {
    const data = { Ids: deleteIds };
    await dispatch(deleteQuoteById(data));
    setTimeout(() => {
      dispatch(getQuotesByDateFilter({}));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const Quotecolumns = getColumns(
    token,
    editQuote,
    setDeleteIds,
    setShowModalDelete,
    activeTab,
    userInformation,
    setShowApprovedDialogModal,
    setRecordId,
    setShowRejectDialogModal,
  );

  const ExitingQuotecolumns = getExistingQuoteColumns(
    token,
    quoteNameNavigation,
    setDeleteIds,
    setShowModalDelete,
    activeTab,
    updateStatus,
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

  const dropDownItems = [
    // {
    //   key: '1',
    //   label: (
    //     <Typography name="Body 3/Regular" cursor="pointer">
    //       Download Selected
    //     </Typography>
    //   ),
    // },
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
      <Space size={24} direction="vertical" style={{ width: '100%' }}>
        <QuoteAnalytics />
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
                Quotecolumns={ExitingQuotecolumns}
              />

              <Space>
                <OsDropdown menu={{ items: dropDownItems }} />
              </Space>
            </div>
          </Col>
        </Row>
        <Row
          style={{ background: 'white', padding: '24px', borderRadius: '12px' }}
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
                      const obj: any = { ...fromToDates };
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
                      const obj: any = { ...fromToDates };
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
                    style={{ cursor: 'pointer' }}
                    color={token?.colorLink}
                    onClick={() => {
                      setFromToDates({ beforeDays: null, afterDays: null });
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
                    locale={
                      activeTab?.includes('1') || activeTab?.includes('2')
                        ? locale
                        : localeforOtherStatus
                    }
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
        description={`Are you sure you want to delete ${deleteIds?.length > 1 ? 'these' : 'this'} Quote?`}
      />
      <DailogModal
        loading={loading}
        setShowDailogModal={setShowApprovedDialogModal}
        showDailogModal={showApprovedDialogModal}
        title="Quote Approve"
        subTitle="Are you sure you want to approve this quote?"
        primaryButtonText="Done"
        image={GreenCheckIcon}
        onOk={updateStatus}
      />
      <DailogModal
        loading={loading}
        setShowDailogModal={setShowRejectDialogModal}
        showDailogModal={showRejectDialogModal}
        title="Quote Reject"
        subTitle="Are you sure you want to reject this quote?"
        primaryButtonText="Done"
        onOk={updateStatus}
        image={CancelIcon}
      />
    </>
  );
};

export default AllQuote;
