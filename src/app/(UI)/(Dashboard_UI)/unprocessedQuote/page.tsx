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

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {SearchOutlined} from '@ant-design/icons';
import {Form, TabsProps} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  deleteQuoteById,
  getQuoteByMaunalUpdated,
} from '../../../../../redux/actions/quote';

import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import QuoteAnalytics from '../allQuote/analytics';
import getColumns from '../allQuote/tableColumns';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const {loading, filteredByDate: filteredData} = useAppSelector(
    (state) => state.quote,
  );
  const router = useRouter();
  const [quoteData, setQuoteData] = useState<React.Key[]>([]);
  const [deletedQuote, setDeletedQuote] = useState<React.Key[]>([]);
  const [activeQuotes, setActiveQuotes] = useState<React.Key[]>([]);

  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getQuoteByMaunalUpdated(''));
  }, []);

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
    setActiveQuotes(quoteData);
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
      dispatch(getQuoteByMaunalUpdated(''));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
    form.resetFields(['opportunity_id', 'customer_id']);
  };
  const Quotecolumns = getColumns(
    token,
    statusWrapper,
    editQuote,
    setDeleteIds,
    setShowModalDelete,
  );

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <Typography
          name="Body 4/Medium"
          cursor="pointer"
          color={token?.colorTextBase}
        >
          All
        </Typography>
      ),
      key: '1',
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <QuoteAnalytics quoteData={quoteData} deletedQuote={deletedQuote} />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Un Processed Quotes
            </Typography>
          </Col>
          {/* <Col>
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
              <OsButton
                text="Add Quote"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => {
                  setShowModal((p) => !p);
                }}
              />

              <Space>
                <OsDropdown menu={{items: dropDownItems}} />
              </Space>
            </div>
          </Col> */}
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
                  <Typography name="Body 4/Medium">Reseller</Typography>
                  <OsInput
                    style={{width: '200px'}}
                    placeholder="Search here"
                    // onChange={(e) => {
                    //   setSearchCustomerData({
                    //     ...searchCustomerData,
                    //     title: e.target.value,
                    //   });
                    //   // setQuery(e.target.value);
                    // }}
                    prefix={<SearchOutlined style={{color: '#949494'}} />}
                  />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Quote Name</Typography>
                  <OsInput
                    style={{width: '200px'}}
                    placeholder="Search here"
                    // onChange={(e) => {
                    //   setSearchCustomerData({
                    //     ...searchCustomerData,
                    //     name: e.target.value,
                    //   });
                    // }}
                    prefix={<SearchOutlined style={{color: '#949494'}} />}
                  />
                </Space>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px',
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color="#C6CDD5"
                    // onClick={searchOpportunity}
                  >
                    Apply
                  </Typography>
                </div>
              </Space>
            }
            items={tabItems.map((tabItem: any, index: number) => ({
              key: `${index + 1}`,
              label: tabItem?.label,
              children: (
                <OsTable
                  key={tabItem?.key}
                  columns={Quotecolumns}
                  dataSource={activeQuotes}
                  scroll
                  loading={loading}
                  locale=""
                  rowSelection={rowSelection}
                />
              ),
              ...tabItem,
            }))}
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
