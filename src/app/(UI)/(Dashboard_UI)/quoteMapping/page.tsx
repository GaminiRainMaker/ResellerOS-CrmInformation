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
import {Checkbox, Divider, Form, notification} from 'antd';
import {MenuProps} from 'antd/lib';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  addLineItemSyncingManualy,
  insertLineItemSyncingForSalesForce,
  queryLineItemSyncing,
  updateLineItemSyncing,
} from '../../../../../redux/actions/LineItemSyncing';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  approvedQuoteMappingColumns,
  newQuoteMappingColumns,
  rejectQuoteMappingColumns,
} from './quoteMappingColumns';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import {formatStatus, quoteLineItemColumnForSync} from '@/app/utils/CONSTANTS';
import CommonSelect from '@/app/components/common/os-select';
import { handleDate } from '@/app/utils/base';

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
    asserType: false,
  });
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>([]);
  const [recordData, setRecordData] = useState<any>();
  const searchQuery = useDebounceHook(query, 500);
  const [manualRecord, setManualRecord] = useState<any>();
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(queryLineItemSyncing(searchQuery));
  }, [searchQuery]);

  const locale = {
    emptyText: <EmptyContainer title="No Quote Mappings" />,
  };

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

  const addNewSyncingManually = async () => {
    let newObj = {...manualRecord};
    dispatch(addLineItemSyncingManualy(newObj))?.then((payload: any) => {
      setManualRecord({});
      setShowSyncModal(false);
      if (payload?.payload) {
        dispatch(queryLineItemSyncing(searchQuery));
      }
      setActiveTab(2);
    });
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
        quote_header: recordData?.quote_header,
        pdf_header: recordData?.pdf_header,
        id: selectedId,
        status: status,
        status_date: handleDate(),
        ...(reason && {reason: reason}),
      };

      dispatch(updateLineItemSyncing(obj)).then((d) => {
        if (d?.payload === undefined) {
          notification?.open({
            message: 'Combination already exist!',
            type: 'error',
          });
          return;
        }
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
      ?.split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

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
                <OsButton
                  buttontype="PRIMARY"
                  text="Add New Syncing"
                  clickHandler={() => {
                    setShowSyncModal(true);
                  }}
                />
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

      <OsModal
        // loading={loading}
        body={
          <>
            <GlobalLoader loading={false}>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '20px',
                }}
              >
                <Col>
                  <Row style={{marginTop: '6px'}}>
                    {' '}
                    <Typography
                      style={{marginLeft: '10px'}}
                      align="center"
                      name="Body 2/Medium"
                    >
                      Your Pdf Header Name
                    </Typography>
                  </Row>
                </Col>

                <Col>
                  <Row style={{marginTop: '6px'}}>
                    {' '}
                    <Typography
                      style={{marginLeft: '10px'}}
                      align="center"
                      name="Body 2/Medium"
                    >
                      Your Quote Header Name
                    </Typography>
                  </Row>
                </Col>
              </Row>
              <Row style={{marginLeft: '30px'}}>
                <Checkbox
                  style={{marginRight: '10px'}}
                  onChange={(e) => {
                    setManualRecord({
                      ...manualRecord,
                      is_salesforce: e.target.checked,
                    });
                  }}
                />{' '}
                <Typography name="Body 3/Regular">Is Salesforce</Typography>
              </Row>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '20px',
                }}
              >
                <Col>
                  <Row style={{marginTop: '6px'}}>
                    <OsInput
                      value={formatStatus(manualRecord?.pdf_header)}
                      onChange={(e: any) => {
                        setManualRecord({
                          ...manualRecord,
                          pdf_header: e?.target?.value,
                        });
                      }}
                    />
                  </Row>
                </Col>

                <Col>
                  <Row style={{marginTop: '6px'}}>
                    <CommonSelect
                      onChange={(e) => {
                        setManualRecord({...manualRecord, quote_header: e});
                      }}
                      allowClear
                      onClear={() => {
                        setManualRecord({
                          ...manualRecord,
                          quote_header: '',
                        });
                      }}
                      defaultValue={formatStatus(
                        manualRecord?.quote_header?.toString()?.toUpperCase(),
                      )}
                      // value={formatStatus(
                      //   newLabel?.label?.toString()?.toUpperCase(),
                      // )}
                      style={{width: '250px'}}
                      options={quoteLineItemColumnForSync}
                    />
                  </Row>
                </Col>
              </Row>

              <Row
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginRight: '40px',
                }}
              >
                <OsButton
                  text="Add"
                  buttontype="PRIMARY"
                  clickHandler={addNewSyncingManually}
                />
              </Row>
            </GlobalLoader>
          </>
        }
        width={600}
        open={showSyncModal}
        // open={true}
        onCancel={() => {
          setShowSyncModal((p) => !p);
        }}
      />
    </>
  );
};

export default QuoteMappings;
