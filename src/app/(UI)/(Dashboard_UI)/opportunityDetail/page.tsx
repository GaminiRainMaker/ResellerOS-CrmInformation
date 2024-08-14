/* eslint-disable no-nested-ternary */

'use client';

import AddQuote from '@/app/components/common/addQuote';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddOpportunity from '@/app/components/common/os-add-opportunity';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import EmptyContainer from '@/app/components/common/os-empty-container';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OpportunityAnalyticCard from '@/app/components/common/os-opportunity-analytic-card';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {formatDate, getResultedValue} from '@/app/utils/base';
import {Form} from 'antd';
import {TabsProps} from 'antd/lib';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  deleteOpportunity,
  getOpportunityById,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import {updateQuoteCustomerId} from '../../../../../redux/actions/quote';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {tabItems} from '../allQuote/constants';

const OpportunityDetails = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const opportunityId = searchParams.get('id');
  const {loading, opportunityById: opportunityData} = useAppSelector(
    (state) => state.Opportunity,
  );
  const {userInformation} = useAppSelector((state) => state.user);
  const [formValue, setFormValue] = useState<any>();
  const [showDrawer, setShowDrawer] = useState(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);
  const [customerValue, setCustomerValue] = useState<number>();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [activeQuotes, setActiveQuotes] = useState<React.Key[]>([]);
  const [finalDealRegData, setFinalDealRegData] = useState<React.Key[]>([]);
  const [statusValue, setStatusValue] = useState<string>('All');
  const isView = getResultedValue();
  const isDealReg = userInformation?.DealReg ?? false;

  const {loading: QuoteLoading} = useAppSelector((state) => state.quote);
  useEffect(() => {
    dispatch(getOpportunityById(opportunityId));
  }, []);

  const OpportunityObjectData = {
    id: opportunityData?.id,
    title: opportunityData?.title,
    amount: opportunityData?.amount,
    customer: opportunityData?.Customer?.name,
    quotes: opportunityData?.Quotes,
    stages: opportunityData?.stages,
    opportunity: opportunityData,
  };

  useEffect(() => {
    if (showDrawer) {
      form.setFieldsValue({
        stages: opportunityData?.stages,
        customer_id: opportunityData?.customer_id,
        title: opportunityData?.title,
        amount: opportunityData?.amount,
      });
    }
  }, [showDrawer]);

  useEffect(() => {
    if (
      activeTab &&
      opportunityData?.Quotes &&
      opportunityData?.Quotes.length > 0
    ) {
      const quoteItems =
        activeTab === '3'
          ? opportunityData?.Quotes?.filter((item: any) =>
              userInformation?.Admin
                ? item?.status?.includes('In Progress')
                : userInformation?.id === item?.user_id &&
                  item?.status?.includes('In Progress'),
            )
          : activeTab === '5'
            ? opportunityData?.Quotes?.filter((item: any) =>
                userInformation?.Admin
                  ? item?.status?.includes('Needs Review') &&
                    item?.user_id !== userInformation?.id
                  : item?.status?.includes('Needs Review') &&
                    item?.approver_id === userInformation?.id,
              )
            : activeTab === '4'
              ? opportunityData?.Quotes?.filter((item: any) =>
                  userInformation?.Admin
                    ? item?.status?.includes('Needs Review')
                    : item?.status?.includes('Needs Review') &&
                      item?.completed_by === userInformation?.id,
                )
              : activeTab === '1'
                ? userInformation?.Admin
                  ? opportunityData?.Quotes
                  : opportunityData?.Quotes?.filter(
                      (item: any) => item?.user_id === userInformation?.id,
                    )
                : activeTab === '6'
                  ? opportunityData?.Quotes?.filter((item: any) =>
                      userInformation?.Admin
                        ? item?.status?.includes('Approved')
                        : item?.status?.includes('Approved') &&
                          item?.user_id === userInformation?.id,
                    )
                  : activeTab === '7'
                    ? opportunityData?.Quotes?.filter((item: any) =>
                        userInformation?.Admin
                          ? item?.status?.includes('Rejected')
                          : item?.status?.includes('Rejected') &&
                            item?.user_id === userInformation?.id,
                      )
                    : activeTab === '2'
                      ? opportunityData?.Quotes?.filter((item: any) =>
                          userInformation?.Admin
                            ? item?.status?.includes('Drafts')
                            : userInformation?.id === item?.user_id &&
                              item?.status?.includes('Drafts'),
                        )
                      : [];
      setActiveQuotes(quoteItems);
    } else {
      setActiveQuotes([]);
    }
  }, [activeTab, opportunityData?.Quotes]);

  const processDealRegData = (dealRegData: any[], status: string) => {
    const finalData = userInformation?.Admin
      ? dealRegData
      : dealRegData?.filter(
          (dealRegDataItem: any) =>
            dealRegDataItem?.user_id === userInformation?.id,
        );

    const filteredDealRegData =
      status === 'All'
        ? finalData
        : finalData?.filter((item: any) => item?.status === status);

    return filteredDealRegData;
  };

  useEffect(() => {
    const separatedData = processDealRegData(
      opportunityData?.DealRegs,
      statusValue,
    );
    setFinalDealRegData(separatedData);
  }, [opportunityData?.DealRegs, statusValue]);

  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/crmOpportunity');
          }}
        >
          Opportunities
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography
          name="Heading 3/Medium"
          cursor="pointer"
          color={token?.colorPrimaryText}
          onClick={() => {}}
        >
          {OpportunityObjectData?.title}
        </Typography>
      ),
    },
  ];

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        buttonContainer={
          <>
            {activeTab === 1 && (
              <AddQuote
                uploadFileData={uploadFileData}
                setUploadFileData={setUploadFileData}
                loading={QuoteLoading}
                buttonText="Add Quote"
              />
            )}
          </>
        }
      />
    ),
  };

  const dealRegLocal = {
    emptyText: <EmptyContainer title="No Files" />,
  };

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteOpportunity(data));
    router.push('/crmOpportunity');
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  console.log('isView', isView, 'userInformation', userInformation);

  const Quotecolumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote Name
        </Typography>
      ),
      dataIndex: 'file_name',
      key: 'file_name',
      width: 130,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            router.push(
              `/generateQuote?id=${record.id}&isView=${getResultedValue()}`,
            );
          }}
          hoverOnText
          color={token?.colorInfo}
        >
          {record?.file_name ??
            formatDate(record?.createdAt, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Name
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.Customer?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string, record: any) => (
        <span style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={text} />
        </span>
      ),
    },
  ];

  const updateOpportunityData = async () => {
    const FormDAta = form.getFieldsValue();
    const finalData = {
      ...FormDAta,
      id: opportunityId,
    };
    const result = {
      customer_id: finalData?.customer_id,
      id: opportunityData?.Quotes?.map((item: any) => item.id),
    };
    if (result?.id?.length > 0) await dispatch(updateQuoteCustomerId(result));
    await dispatch(updateOpportunity(finalData))?.then((d: any) => {
      if (d?.payload) {
        dispatch(getOpportunityById(opportunityId));
        setShowDrawer(false);
        form.resetFields();
      }
    });
  };

  const dealRegFormColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          style={{cursor: 'pointer'}}
          hoverOnText
          color={token?.colorInfo}
          onClick={() => {
            router.push(
              `/dealRegDetail?id=${record.id}&opportunityId=${record.opportunity_id}&customerId=${record.customer_id}&contactId=${record.contact_id}`,
            );
          }}
        >
          {formatDate(text, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Type
        </Typography>
      ),
      dataIndex: 'type',
      key: 'type',
      width: 187,
      render: (text: string) => <CustomTextCapitalization text={text} />,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Account
        </Typography>
      ),
      dataIndex: 'account',
      key: 'account',
      width: 187,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`/accountDetails?id=${record?.Customer?.id}`);
          }}
          hoverOnText
        >
          {record?.Customer?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner
        </Typography>
      ),
      dataIndex: 'partner_id',
      key: 'partner_id',
      width: 187,
      render: (text: string, record: any) => (
        <CustomTextCapitalization text={record?.Partner?.partner} />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program_id',
      key: 'partner_program_id',
      width: 187,
      render: (text: string, record: any) => (
        <CustomTextCapitalization
          text={record?.PartnerProgram?.partner_program}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Created By
        </Typography>
      ),
      dataIndex: 'created_by',
      key: 'created_by',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.User?.first_name && record?.User?.last_name
            ? `${record.User?.first_name} ${record.User?.last_name}`
            : record?.User?.first_name
              ? record.User?.first_name
              : record?.User?.user_name}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 187,
      render: (text: string) => (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <OsStatusWrapper value={text} />
        </div>
      ),
    },
  ];

  const dealRegTabItems: TabsProps['items'] = [
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setStatusValue('All')}>
          All
        </Typography>
      ),
      key: '1',
      children: (
        <OsTable
          columns={dealRegFormColumns}
          dataSource={finalDealRegData}
          scroll
          loading={false}
          paginationProps={false}
          scrolly={200}
          locale={dealRegLocal}
        />
      ),
    },
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setStatusValue('New')}>
          New
        </Typography>
      ),
      key: '9',
      children: (
        <OsTable
          columns={dealRegFormColumns}
          dataSource={finalDealRegData}
          scroll
          loading={false}
          paginationProps={false}
          scrolly={200}
          locale={dealRegLocal}
        />
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('In Progress')}
        >
          In Progress
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={dealRegFormColumns}
          dataSource={finalDealRegData}
          scroll
          loading={false}
          paginationProps={false}
          scrolly={200}
          locale={dealRegLocal}
        />
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Submitted')}
        >
          Submitted
        </Typography>
      ),
      key: '3',
      children: (
        <OsTable
          columns={dealRegFormColumns}
          dataSource={finalDealRegData}
          scroll
          loading={false}
          paginationProps={false}
          scrolly={200}
          locale={dealRegLocal}
        />
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Approved')}
        >
          Approved
        </Typography>
      ),
      key: '4',
      children: (
        <OsTable
          columns={dealRegFormColumns}
          dataSource={finalDealRegData}
          scroll
          loading={false}
          paginationProps={false}
          scrolly={200}
          locale={dealRegLocal}
        />
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Rejected')}
        >
          Rejected
        </Typography>
      ),
      key: '5',
      children: (
        <OsTable
          columns={dealRegFormColumns}
          dataSource={finalDealRegData}
          scroll
          loading={false}
          paginationProps={false}
          scrolly={200}
          locale={dealRegLocal}
        />
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => setStatusValue('Expired')}
        >
          Expired
        </Typography>
      ),
      key: '6',
      children: (
        <OsTable
          columns={dealRegFormColumns}
          dataSource={finalDealRegData}
          scroll
          loading={false}
          paginationProps={false}
          scrolly={200}
          locale={dealRegLocal}
        />
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" size={12} style={{width: '100%'}}>
        <OsBreadCrumb items={menuItems} />

        <OpportunityAnalyticCard
          setFormValue={setFormValue}
          setOpen={setShowDrawer}
          OpportunityData={OpportunityObjectData}
          setDeleteIds={setDeleteIds}
          setShowModalDelete={setShowModalDelete}
        />
        <Row justify="space-between" align="middle" style={{marginTop: '10px'}}>
          <Col>
            <Typography name="Heading 3/Medium">All Quotes</Typography>
          </Col>
          {!isDealReg && (
            <Col style={{float: 'right'}}>
              <AddQuote
                uploadFileData={uploadFileData}
                setUploadFileData={setUploadFileData}
                loading={QuoteLoading}
                buttonText="Add Quote"
                setShowToggleTable={setShowToggleTable}
                showToggleTable={showToggleTable}
                Quotecolumns={Quotecolumns}
                opportunityId={opportunityData?.id}
                customerId={opportunityData?.customer_id}
              />
            </Col>
          )}
        </Row>
        <Row
          style={{
            background: 'white',
            padding: '8px 12px',
            borderRadius: '12px',
          }}
        >
          <OsTabs
            style={{margin: '0px'}}
            onChange={(e) => {
              setActiveTab(e);
            }}
            activeKey={activeTab}
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
                    scrolly={200}
                  />
                ),
                ...tabItem,
              }))
            }
          />
        </Row>
        {isDealReg && (
          <>
            <Row
              justify="space-between"
              align="middle"
              style={{marginTop: '10px'}}
            >
              <Col>
                <Typography name="Heading 3/Medium">All DealReg</Typography>
              </Col>
            </Row>
            <Row
              style={{
                background: 'white',
                padding: '8px 12px',
                borderRadius: '12px',
              }}
            >
              <OsTabs style={{margin: '0px'}} items={dealRegTabItems} />
            </Row>
          </>
        )}
      </Space>

      <OsDrawer
        title={
          <Typography name="Body 1/Regular">Opportunity Details</Typography>
        }
        placement="right"
        onClose={() => {
          setShowDrawer(false);
          form.resetFields();
        }}
        open={showDrawer}
        width={450}
        footer={
          <OsButton
            loading={loading}
            btnStyle={{width: '100%'}}
            buttontype="PRIMARY"
            text="Update Changes"
            clickHandler={form.submit}
          />
        }
      >
        <AddOpportunity
          form={form}
          onFinish={updateOpportunityData}
          setCustomerValue={setCustomerValue}
          customerValue={customerValue}
          drawer
          stageValue={opportunityData?.stages}
        />
      </OsDrawer>

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        description="Are you sure you want to delete this opportunity?"
        heading="Delete Opportunity"
      />
    </>
  );
};

export default OpportunityDetails;
