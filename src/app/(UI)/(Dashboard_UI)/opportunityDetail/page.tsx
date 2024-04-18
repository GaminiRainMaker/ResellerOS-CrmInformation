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
import {EyeIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  deleteOpportunity,
  getOpportunityById,
} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import EditOpportunity from '../crmOpportunity/EditOpportunity';

const OpportunityDetails = () => {
  const [token] = useThemeToken();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const opportunityId = searchParams.get('id');
  const {loading, data: opportunityData} = useAppSelector(
    (state) => state.Opportunity,
  );
  const [formValue, setFormValue] = useState<any>();
  const [open, setOpen] = useState(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getOpportunityById(opportunityId));
  }, []);

  const OpportunityData = {
    id: opportunityData?.[0]?.id,
    title: opportunityData?.[0]?.title,
    amount: opportunityData?.[0]?.amount,
    customer: opportunityData?.[0]?.Customer?.name,
    quotes: opportunityData?.[0]?.Quotes,
    stages: opportunityData?.[0]?.stages,
    opportunity: opportunityData,
  };

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

  const Quotecolumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          File Name
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer
        </Typography>
      ),
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {opportunityData?.customer ?? '--'}
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
      render: (text: string, record: any) => {
        const statusValue = record.is_completed
          ? 'Completed'
          : record?.is_drafted
            ? 'In Progress'
            : 'Drafts';
        return <OsStatusWrapper value={statusValue} />;
      },
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

  const locale = {
    emptyText: <EmptyContainer title="No Files" actionButton="Add Quote" />,
  };

  const tabItems = [
    {
      label: <Typography name="Body 4/Regular">All</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={Quotecolumns}
          dataSource={OpportunityData?.quotes}
          scroll
          loading={loading}
          locale={locale}
        />
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

  const dropDownItemss = [
    {
      key: '1',
      label: (
        <Typography name="Body 3/Regular">Bundle Configuration</Typography>
      ),
    },
  ];

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteOpportunity(data));
    // setTimeout(() => {
    //   dispatch(getAllOpportunity());
    //   dispatch(getdeleteOpportunity(''));
    // }, 1000);
    router.push('/crmOpportunity');
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <OsBreadCrumb items={menuItems} />

        <OpportunityAnalyticCard
          setFormValue={setFormValue}
          setOpen={setOpen}
          OpportunityData={OpportunityData}
          setDeleteIds={setDeleteIds}
          setShowModalDelete={setShowModalDelete}
        />

        <Row justify="space-between">
          <Col>
            <Typography name="Heading 3/Medium">Quotes</Typography>
          </Col>
          <Col style={{float: 'right'}}>
            <div
              style={{
                display: 'flex',
                width: '40%',
                gap: '8px',
              }}
            >
              <OsButton
                text="Add Quote"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
              />
              <Space>
                <OsDropdown menu={{items: dropDownItemss}} />
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
                  <Typography name="Body 4/Medium">
                    Registration Form
                  </Typography>
                  <OsInput style={{width: '180px'}} placeholder="Search Here" />
                </Space>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15px',
                  }}
                >
                  <Typography cursor="pointer" name="Button 1" color="#C6CDD5">
                    Apply
                  </Typography>
                </div>
              </Space>
            }
            items={tabItems}
          />
        </Row>
      </Space>

      <EditOpportunity
        setFormValue={setFormValue}
        formValue={formValue}
        open={open}
        setOpen={setOpen}
      />

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
