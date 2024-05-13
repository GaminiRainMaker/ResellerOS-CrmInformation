/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-undef */
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
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import {Form} from 'antd';
import {Option} from 'antd/es/mentions';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  deleteQuoteById,
  queryAllManualQuotes,
} from '../../../../../redux/actions/quote';
import {queryQuoteFile} from '../../../../../redux/actions/quoteFile';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import EditedQuoteAnalytics from './editedQuoteAnalytic';
import {getSuperAdminQuoteColumns} from '../allQuote/tableColumns';
import ConcernDetail from './ConcernDetail';

const AllQuote: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const {loading, data} = useAppSelector((state) => state.quoteFile);
  const {userInformation} = useAppSelector((state) => state.user);
  const [deletedQuote, setDeletedQuote] = useState<React.Key[]>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showConcernDetailModal, setShowConcernDetailModal] = useState<{
    visible: boolean;
    quoteId?: string;
  }>();
  const [query, setQuery] = useState<{
    organizationName: string | null;
    createdBy: string | null;
  }>({
    organizationName: null,
    createdBy: null,
  });

  const searchQuery = useDebounceHook(query, 400);

  useEffect(() => {
    dispatch(queryQuoteFile(searchQuery));
  }, [searchQuery]);

  const filteredData = data?.filter((d: any) => d?.issue_type !== null);

  const deleteQuote = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteQuoteById(data));
    setTimeout(() => {
      dispatch(queryAllManualQuotes({}));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
    form.resetFields(['opportunity_id', 'customer_id']);
  };
  const actionEye = async (value: string) => {
    setShowConcernDetailModal({visible: true, quoteId: value});
  };

  const Quotecolumns = getSuperAdminQuoteColumns(token, actionEye);

  const uniqueCreatedBy = Array?.from(
    new Set(data?.map((dataItem: any) => dataItem?.Quote?.User?.user_name)),
  );
  const uniqueOrganization = Array?.from(
    new Set(data?.map((dataItem: any) => dataItem?.Quote?.organization)),
  );


  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <EditedQuoteAnalytics  />
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
                <Typography name="Body 4/Medium">
                  Reseller Organization
                </Typography>
                <CommonSelect
                  style={{width: '200px'}}
                  placeholder="Search here"
                  showSearch
                  onSearch={(e) => {
                    setQuery({
                      ...query,
                      organizationName: e,
                    });
                  }}
                  onChange={(e) => {
                    setQuery({
                      ...query,
                      organizationName: e,
                    });
                  }}
                  value={query?.organizationName}
                >
                  {uniqueOrganization?.map((customer: any) => (
                    <Option key={customer} value={customer}>
                      {customer}
                    </Option>
                  ))}
                </CommonSelect>
              </Space>
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">Created By</Typography>
                <CommonSelect
                  style={{width: '200px'}}
                  placeholder="Search here"
                  showSearch
                  optionFilterProp="children"
                  onSearch={(e) => {
                    setQuery({
                      ...query,
                      createdBy: e,
                    });
                  }}
                  onChange={(e) => {
                    setQuery({
                      ...query,
                      createdBy: e,
                    });
                  }}
                  value={query?.createdBy}
                >
                  {uniqueCreatedBy?.map((data: any) => (
                    <Option key={data} value={data}>
                      {data}
                    </Option>
                  ))}
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
                  onClick={() => {
                    setQuery({
                      organizationName: null,
                      createdBy: null,
                    });
                  }}
                >
                  Reset
                </Typography>
              </div>
            </Space>
          </Row>

          <OsTable
            columns={Quotecolumns}
            dataSource={filteredData}
            scroll
            loading={loading}
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
