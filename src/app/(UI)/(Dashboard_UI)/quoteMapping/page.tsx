'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OSDialog from '@/app/components/common/os-dialog';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {formatDate} from '@/app/utils/base';
import {Form, notification} from 'antd';
import {Option} from 'antd/es/mentions';
import {MenuProps} from 'antd/lib';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  queryLineItemSyncing,
  updateLineItemSyncing,
} from '../../../../../redux/actions/LineItemSyncing';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  approvedQuoteMappingColumns,
  newQuoteMappingColumns,
  rejectQuoteMappingColumns,
} from './quoteMappingColumns';

const QuoteMappings = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const router = useRouter();
  const {data: LineItemSyncingData, loading} = useAppSelector(
    (state) => state.LineItemSyncing,
  );
  const [activeTab, setActiveTab] = useState<number>(1);
  const [query, setQuery] = useState<{
    quote_name: string | null;
    pdf_header: string | null;
    quote_header: string | null;
  }>({
    quote_name: null,
    pdf_header: null,
    quote_header: null,
  });
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>([]);
  const [recordData, setRecordData] = useState<any>();
  const searchQuery = useDebounceHook(query, 500);

  useEffect(() => {
    dispatch(queryLineItemSyncing(searchQuery));
  }, [searchQuery]);

  const locale = {
    emptyText: <EmptyContainer title="No Users" />,
  };

  const uniqueQuoteName = Array?.from(
    new Set(
      LineItemSyncingData?.map(
        (item: any) =>
          item?.Quote?.file_name ??
          formatDate(item?.Quote?.createdAt, 'MM/DD/YYYY | HH:MM'),
      ),
    ),
  );
  const uniquePdfHeader = Array?.from(
    new Set(LineItemSyncingData?.map((item: any) => item?.pdf_header)),
  );
  const uniqueQuoteHeader = Array?.from(
    new Set(LineItemSyncingData?.map((item: any) => item?.quote_header)),
  );
  const QuoteMappingNewColumns = newQuoteMappingColumns(
    token,
    router,
    setShowApproveModal,
    setShowRejectModal,
    setSelectedId,
    setRecordData,
  );
  const QuoteMappingApprovedColumns = approvedQuoteMappingColumns(
    token,
    router,
    setShowRejectModal,
    setSelectedId,
    setRecordData,
  );
  const QuoteMappingRejectedColumns = rejectQuoteMappingColumns(
    token,
    router,
    setShowApproveModal,
    setSelectedId,
    setRecordData,
  );

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setSelectedId(selectedRowKeys);
    },
  };

  const superAdmintabItems = [
    {
      label: (
        <Typography
          onClick={() => {
            setActiveTab(1);
          }}
          cursor="pointer"
          name="Body 4/Regular"
        >
          New
        </Typography>
      ),
      key: '1',
      children: (
        <OsTable
          locale={locale}
          columns={QuoteMappingNewColumns}
          dataSource={LineItemSyncingData?.filter(
            (LineItemSyncingItem: any) =>
              LineItemSyncingItem?.status === 'Pending',
          )}
          scroll
          loading={loading}
          rowSelection={rowSelection}
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(2);
          }}
          name="Body 4/Regular"
        >
          Approved
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          locale={locale}
          columns={QuoteMappingApprovedColumns}
          dataSource={LineItemSyncingData?.filter(
            (LineItemSyncingItem: any) =>
              LineItemSyncingItem?.status === 'Approved',
          )}
          scroll
          loading={loading}
          rowSelection={rowSelection}
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(3);
          }}
          name="Body 4/Regular"
        >
          Rejected
        </Typography>
      ),
      key: '3',
      children: (
        <OsTable
          locale={locale}
          columns={QuoteMappingRejectedColumns}
          dataSource={LineItemSyncingData?.filter(
            (LineItemSyncingItem: any) =>
              LineItemSyncingItem?.status === 'Rejected',
          )}
          scroll
          loading={loading}
          rowSelection={rowSelection}
        />
      ),
    },
  ];

  const updateLineItemStatus = () => {
    const reason = form?.getFieldsValue()?.reason;
    if (selectedId?.length > 0) {
      const status = reason ? 'Rejected' : 'Approved';
      const obj = {
        id: selectedId,
        status: status,
        status_date: new Date(),
        ...(reason && {reason: reason}),
      };
      dispatch(updateLineItemSyncing(obj)).then((d) => {
        if (d?.payload) {
          dispatch(queryLineItemSyncing(searchQuery));
        }
      });
    }
    setSelectedId([]);
    setRecordData('');
    setShowApproveModal(false);
    setShowRejectModal(false);
    form.resetFields();
    // selectedRowKeys([]);
  };

  const handleApproveClick = () => {
    if (selectedId?.length <= 0) {
      notification?.open({
        message: 'Please select the Quote Mappings.',
        type: 'info',
      });
      return;
    }
    setShowApproveModal(true);
  };

  const handleRejectClick = () => {
    if (selectedId?.length <= 0) {
      notification?.open({
        message: 'Please select the Quote Mappings.',
        type: 'info',
      });
      return;
    }
    setShowRejectModal(true);
  };

  const dropDownItems: MenuProps['items'] = [
    ...(activeTab === 1 || activeTab === 3
      ? [
          {
            key: '1',
            label: (
              <Typography
                name="Body 3/Regular"
                cursor="pointer"
                onClick={() => {
                  handleApproveClick();
                }}
              >
                Approve Selected
              </Typography>
            ),
          },
        ]
      : []),
    ...(activeTab === 1 || activeTab === 2
      ? [
          {
            key: '2',
            label: (
              <Typography
                name="Body 3/Regular"
                cursor="pointer"
                onClick={() => {
                  handleRejectClick();
                }}
              >
                Reject Selected
              </Typography>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Quote Mappings
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
            tabBarExtraContent={
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">PDF Header</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        pdf_header: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        pdf_header: e,
                      });
                    }}
                    value={query?.pdf_header}
                  >
                    {uniquePdfHeader?.map((pdf_header: any) => (
                      <Option key={pdf_header} value={pdf_header}>
                        {pdf_header}
                      </Option>
                    ))}
                  </CommonSelect>
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">
                    Quote Line Item Header
                  </Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        quote_header: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        quote_header: e,
                      });
                    }}
                    value={query?.quote_header}
                  >
                    {uniqueQuoteHeader?.map((quote_header: any) => (
                      <Option key={quote_header} value={quote_header}>
                        {quote_header}
                      </Option>
                    ))}
                  </CommonSelect>
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">
                    Quote PDF Document
                  </Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        quote_name: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        quote_name: e,
                      });
                    }}
                    value={query?.quote_name}
                  >
                    {uniqueQuoteName?.map((quote_name: any) => (
                      <Option key={quote_name} value={quote_name}>
                        {quote_name}
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
                    color={
                      query?.quote_name ||
                      query?.pdf_header ||
                      query?.quote_header
                        ? '#0D0D0D'
                        : '#C6CDD5'
                    }
                    onClick={() => {
                      setQuery({
                        quote_name: null,
                        pdf_header: null,
                        quote_header: null,
                      });
                    }}
                  >
                    Reset
                  </Typography>
                </div>
              </Space>
            }
            items={superAdmintabItems}
          />
        </Row>
      </Space>

      <OsModal
        loading={loading}
        body={
          <OSDialog
            title="Approve Line Item"
            description="Are you sure, you want to mark the status to approve for the following line item:"
            thirdLineText={
              recordData
                ? `“${recordData?.pdf_header}” to “${recordData?.quote_header}”`
                : ''
            }
          />
        }
        bodyPadding={40}
        width={511}
        open={showApproveModal}
        onCancel={() => {
          setShowApproveModal(false);
          setRecordData('');
        }}
        destroyOnClose
        secondaryButtonText="Cancel"
        primaryButtonText="Approve"
        onOk={() => {
          updateLineItemStatus();
        }}
        styleFooter
      />
      <OsModal
        loading={loading}
        body={
          <OSDialog
            title="Change Status to “Reject”"
            description="Are you sure, you want to mark the status to approve for the following line item:"
            thirdLineText={
              recordData
                ? `“${recordData?.pdf_header}” to “${recordData?.quote_header}”`
                : ''
            }
            form={form}
            onFinish={updateLineItemStatus}
          />
        }
        bodyPadding={40}
        width={511}
        open={showRejectModal}
        onCancel={() => {
          setShowRejectModal(false);
          setRecordData('');
        }}
        destroyOnClose
        secondaryButtonText="Cancel"
        primaryButtonText="Reject"
        onOk={form.submit}
        styleFooter
      />
    </>
  );
};

export default QuoteMappings;
