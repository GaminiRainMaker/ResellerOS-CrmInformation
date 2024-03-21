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
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTableWithOutDrag from '@/app/components/common/os-table/CustomTable';
import {Form} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  deleteQuoteById,
  getQuoteByManualUpdated,
} from '../../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import QuoteAnalytics from '../allQuote/analytics';
import {getSuperAdminQuoteColumns} from '../allQuote/tableColumns';
import ConcernDetail from './ConcernDetail';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const {loading, data} = useAppSelector((state) => state.quote);
  const {userInformation} = useAppSelector((state) => state.user);
  const [deletedQuote, setDeletedQuote] = useState<React.Key[]>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showConcernDetailModal, setShowConcernDetailModal] = useState<{
    visible: boolean;
    quoteId?: string;
  }>();

  useEffect(() => {
    dispatch(getQuoteByManualUpdated());
  }, []);

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
      dispatch(getQuoteByManualUpdated());
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
    form.resetFields(['opportunity_id', 'customer_id']);
  };
  const actionEye = async (value: string) => {
    setShowConcernDetailModal({visible: true, quoteId: value});
  };

  const Quotecolumns = getSuperAdminQuoteColumns(
    token,
    statusWrapper,
    editQuote,
    setDeleteIds,
    setShowModalDelete,
    actionEye,
  );

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <QuoteAnalytics quoteData={data} deletedQuote={deletedQuote} />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Edited Quotes
            </Typography>
          </Col>
        </Row>
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Row justify="end">
            <Space size={12} align="center">
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">Reseller</Typography>
                <CommonSelect
                  style={{width: '200px'}}
                  placeholder="Search here"
                  showSearch
                  // onSearch={(e) => {
                  //   setQuery({
                  //     ...query,
                  //     customer: e,
                  //   });
                  // }}
                  // onChange={(e) => {
                  //   setQuery({
                  //     ...query,
                  //     customer: e,
                  //   });
                  // }}
                  // value={query?.customer}
                >
                  {/* {uniqueCustomer?.map((customer: any) => (
                    <Option key={customer} value={customer}>
                      {customer}
                    </Option>
                  ))} */}
                </CommonSelect>
              </Space>
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">Quote Name</Typography>
                <CommonSelect
                  style={{width: '200px'}}
                  placeholder="Search here"
                  showSearch
                  optionFilterProp="children"
                  // onSearch={(e) => {
                  //   setQuery({
                  //     ...query,
                  //     contact: e,
                  //   });
                  // }}
                  // onChange={(e) => {
                  //   setQuery({
                  //     ...query,
                  //     contact: e,
                  //   });
                  // }}
                  // value={query?.contact}
                >
                  {/* {uniqueBillingNames?.map((billingName: any) => (
                    <Option key={billingName} value={billingName}>
                      {billingName}
                    </Option>
                  ))} */}
                </CommonSelect>
              </Space>
              <div
                style={{
                  marginTop: '15px',
                }}
              >
                <Typography
                  cursor="pointer"
                  name="Button 1"
                  color="#C6CDD5"
                  // onClick={() => {
                  //   setQuery({
                  //     customer: null,
                  //     contact: null,
                  //   });
                  // }}
                >
                  Reset
                </Typography>
              </div>
            </Space>
          </Row>
          <OsTableWithOutDrag
            columns={Quotecolumns}
            dataSource={data}
            scroll
            loading={loading}
            locale=""
            rowSelection={rowSelection}
          />
        </div>
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

      <OsModal
        width={700}
        bodyPadding={40}
        open={showConcernDetailModal?.visible}
        onCancel={() => {
          setShowConcernDetailModal({visible: false});
        }}
        title="Concern & Documents"
        body={<ConcernDetail showConcernDetailModal={showConcernDetailModal} />}
      />
    </>
  );
};

export default AllQuote;
