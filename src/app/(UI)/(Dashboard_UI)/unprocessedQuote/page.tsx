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
  getQuoteByManualUpdated,
} from '../../../../../redux/actions/quote';

import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import QuoteAnalytics from '../allQuote/analytics';
import getColumns from '../allQuote/tableColumns';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const {loading, data} = useAppSelector((state) => state.quote);
  const router = useRouter();
  const [quoteData, setQuoteData] = useState<React.Key[]>([]);
  const [deletedQuote, setDeletedQuote] = useState<React.Key[]>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getQuoteByManualUpdated());
  }, []);

  console.log('datadata', data);

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
  
  const Quotecolumns = getColumns(
    token,
    statusWrapper,
    editQuote,
    setDeleteIds,
    setShowModalDelete,
  );

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
        </Row>
        <div
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTable
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
    </>
  );
};

export default AllQuote;
