/* eslint-disable no-nested-ternary */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OpportunityAnalyticCard from '@/app/components/common/os-opportunity-analytic-card';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {formatDate} from '@/app/utils/base';
import {EyeIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import AddQuote from '@/app/components/common/addQuote';
import OsDrawer from '@/app/components/common/os-drawer';
import {Form} from 'antd';
import AddOpportunity from '@/app/components/common/os-add-opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {
  deleteOpportunity,
  getOpportunityById,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import {setStageValue} from '../../../../../redux/slices/opportunity';

const OpportunityDetails = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const opportunityId = searchParams.get('id');
  const {loading, opportunityById: opportunityData} = useAppSelector(
    (state) => state.Opportunity,
  );
  const [formValue, setFormValue] = useState<any>();
  const [showDrawer, setShowDrawer] = useState(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [uploadFileData, setUploadFileData] = useState<any>([]);
  const [showToggleTable, setShowToggleTable] = useState<boolean>(false);
  const [customerValue, setCustomerValue] = useState<number>();

  const {loading: QuoteLoading} = useAppSelector((state) => state.quote);
  useEffect(() => {
    dispatch(getOpportunityById(opportunityId));
  }, []);

  const OpportunityData = {
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
          {OpportunityData?.title}
        </Typography>
      ),
    },
  ];

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        buttonContainer={
          <AddQuote
            uploadFileData={uploadFileData}
            setUploadFileData={setUploadFileData}
            loading={QuoteLoading}
            buttonText="Add Quote"
          />
        }
      />
    ),
  };

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteOpportunity(data));
    router.push('/crmOpportunity');
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const Quotecolumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          File Name
        </Typography>
      ),
      dataIndex: 'file_name',
      key: 'file_name',
      width: 130,
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            router.push(`/generateQuote?id=${record.id}`);
          }}
          hoverOnText
        >
          {text ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {formatDate(text, 'MM/DD/YYYY | HH:MM')}
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
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {OpportunityData?.customer ?? '--'}
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
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <EyeIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              // router.push(`/generateQuote?id=${record?.id}`);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
          />
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      label: <Typography name="Body 4/Regular">All</Typography>,
      key: '1',
      children: (
        <>
          {OpportunityData?.customer && (
            <OsTable
              columns={Quotecolumns}
              dataSource={OpportunityData?.quotes}
              scroll
              loading={loading}
              locale={locale}
            />
          )}
        </>
      ),
    },
    {
      label: <Typography name="Body 4/Regular">In Progress</Typography>,
      key: '2',
    },
    {
      label: <Typography name="Body 4/Regular">Completed</Typography>,
      key: '3',
    },
  ];

  const updateOpportunityData = () => {
    const FormDAta = form.getFieldsValue();
    const finalData = {
      ...FormDAta,
      customer_id: customerValue,
      id: opportunityId,
    };
    dispatch(updateOpportunity(finalData))?.then((d: any) => {
      if (d?.payload) {
        dispatch(getOpportunityById(opportunityId));
        setShowDrawer(false);
        form.resetFields();
      }
    });
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <OsBreadCrumb items={menuItems} />

        <OpportunityAnalyticCard
          setFormValue={setFormValue}
          setOpen={setShowDrawer}
          OpportunityData={OpportunityData}
          setDeleteIds={setDeleteIds}
          setShowModalDelete={setShowModalDelete}
        />

        <Row justify="space-between">
          <Col>
            <Typography name="Heading 3/Medium">Quotes</Typography>
          </Col>
          <Col style={{float: 'right'}}>
            <AddQuote
              uploadFileData={uploadFileData}
              setUploadFileData={setUploadFileData}
              loading={QuoteLoading}
              buttonText="Add Quote"
              setShowToggleTable={setShowToggleTable}
              showToggleTable={showToggleTable}
              Quotecolumns={Quotecolumns}
            />
          </Col>
        </Row>
        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs items={tabItems} />
        </Row>
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
