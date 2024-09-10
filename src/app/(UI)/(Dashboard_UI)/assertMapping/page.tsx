'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OSDialog from '@/app/components/common/os-dialog';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Form, notification} from 'antd';
import {MenuProps} from 'antd/lib';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  queryLineItemSyncing,
  updateLineItemSyncing,
} from '../../../../../redux/actions/LineItemSyncing';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  approvedAssertMappingColumns,
  newAssertMappingColumns,
  rejectAssertMappingColumns,
} from './assertMapping';

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
    searchValue: string;
    asserType: boolean;
  }>({
    searchValue: '',
    asserType: true,
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
    emptyText: <EmptyContainer title="No Quote Mappings" />,
  };

  const QuoteMappingNewColumns = newAssertMappingColumns(
    token,
    router,
    setShowApproveModal,
    setShowRejectModal,
    setSelectedId,
    setRecordData,
  );
  const QuoteMappingApprovedColumns = approvedAssertMappingColumns(
    token,
    router,
    setShowRejectModal,
    setSelectedId,
    setRecordData,
  );
  const QuoteMappingRejectedColumns = rejectAssertMappingColumns(
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
    if (selectedId?.length > 0) {
      setShowApproveModal(true);
    } else {
      notification?.open({
        message: 'Please select the Quote Mappings.',
        type: 'info',
      });
    }
  };

  const handleRejectClick = () => {
    if (selectedId?.length > 0) {
      setShowRejectModal(true);
    } else {
      notification?.open({
        message: 'Please select the Quote Mappings.',
        type: 'info',
      });
    }
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

  const formatHeader = (text: string) => {
    return text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Assest Mappings
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
            // tabBarExtraContent={
            //   <Space size={12} align="center">
            //     <Space direction="vertical" size={0}>
            //       <Typography name="Body 4/Medium">Search here</Typography>
            //       <OsInput
            //         style={{width: '250px'}}
            //         placeholder="Search here"
            //         onChange={(e) => {
            //           setQuery({
            //             ...query,
            //             searchValue: e?.target?.value,
            //           });
            //         }}
            //         value={query?.searchValue}
            //       />
            //     </Space>
            //     <div
            //       style={{
            //         marginTop: '15px',
            //       }}
            //     >
            //       <Typography
            //         cursor="pointer"
            //         name="Button 1"
            //         color={query?.searchValue ? '#0D0D0D' : '#C6CDD5'}
            //         onClick={() => {
            //           setQuery({
            //             searchValue: '',
            //           });
            //         }}
            //       >
            //         Reset
            //       </Typography>
            //     </div>
            //   </Space>
            // }
            items={superAdmintabItems}
          />
        </Row>
      </Space>

      <OsModal
        loading={loading}
        body={
          <OSDialog
            title="Change Status to"
            description={`Are you sure you want to mark the status to "Approve" for the following mapping?`}
            thirdLineText={
              recordData
                ? `“${recordData?.pdf_header}” to  “${formatHeader(recordData?.quote_header)}”`
                : ''
            }
            statusText={'“Approved”'}
          />
        }
        bodyPadding={40}
        width={511}
        open={showApproveModal}
        onCancel={() => {
          setShowApproveModal(false);
          setRecordData('');
          form.resetFields();
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
            title="Change Status to"
            description={`Are you sure you want to mark the status to "Rejected" for the following mapping?`}
            thirdLineText={
              recordData
                ? `“${recordData?.pdf_header}” to  “${formatHeader(recordData?.quote_header)}”`
                : ''
            }
            form={form}
            onFinish={updateLineItemStatus}
            statusText={'“Rejected”'}
          />
        }
        bodyPadding={40}
        width={511}
        open={showRejectModal}
        onCancel={() => {
          setShowRejectModal(false);
          setRecordData('');
          form.resetFields();
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
