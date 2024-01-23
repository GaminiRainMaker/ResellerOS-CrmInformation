/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Typography from '@/app/components/common/typography';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {MenuProps, TabsProps} from 'antd';
import {useEffect, useState} from 'react';
import OsModal from '@/app/components/common/os-modal';
import EmptyContainer from '@/app/components/common/os-empty-container';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import DealRegAnalytics from './dealRegAnalytics';
import AddRegistrationForm from './AddRegistrationForm';
import {getAllDealReg} from '../../../../../redux/actions/dealReg';

const DealReg: React.FC = () => {
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const {data: DealRegData, loading: dealLoading} = useAppSelector(
    (state) => state.dealReg,
  );

  const [tableData, setTableData] = useState<any>();

  const [billingFilterSeach, setBillingFilterSearch] = useState<any>();
  const [query, setQuery] = useState('');

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
  };

  const DealRegColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Registration Forms
        </Typography>
      ),
      dataIndex: 'title',
      key: 'title',
      width: 266,
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
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Opportunity
        </Typography>
      ),
      dataIndex: 'opportunity',
      key: 'opportunity',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.Opportunity?.title ?? '--'}
        </Typography>
      ),
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
        <Typography name="Body 4/Regular">
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
      dataIndex: 'partner',
      key: 'partner',
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
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          { '--'}
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
        <Typography name="Body 4/Regular">
          {'--'}
        </Typography>
      ),
    },
    {
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      width: 94,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setOpen(true);
              setFormValue(record);
            }}
          />

          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeleteIds([record?.id]);
              setShowModalDelete(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="New Registration Form"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Regular">All</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={DealRegColumns}
          dataSource={DealRegData}
          rowSelection={rowSelection}
          scroll
          loading={dealLoading}
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

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '2',
      label: (
        <Typography
          onClick={() => setShowModalEdit((p) => !p)}
          name="Body 3/Regular"
        >
          Edit Selected
        </Typography>
      ),
    },
    {
      key: '3',
      label: (
        <Typography
          onClick={() => setShowModalEdit((p) => !p)}
          name="Body 3/Regular"
        >
          Download Selected
        </Typography>
      ),
    },
    {
      key: '4',
      label: (
        <Typography
          name="Body 3/Regular"
          color={token?.colorError}
          onClick={() => setShowModalDelete(true)}
        >
          Delete Selected{' '}
        </Typography>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllDealReg());
  }, []);

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <DealRegAnalytics data={DealRegData} />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Registered Forms
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <Space size={12} style={{height: '48px'}}>
              <OsButton
                text="New Registration Form"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />

              <OsDropdown menu={{items: dropDownItemss}} />
            </Space>
          </Col>
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
                  <Typography name="Body 4/Medium">
                    Registration Form
                  </Typography>
                  <OsInput
                    style={{width: '180px'}}
                    placeholder="Search Here"
                    // options={bundleOptions}
                    onChange={(e) => {
                      setBillingFilterSearch({
                        ...billingFilterSeach,
                        name: e.target.value,
                      });
                      setQuery(e.target.value);
                    }}
                  />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Customer Account</Typography>
                  <CommonSelect
                    style={{width: '180px'}}
                    placeholder="Search Here"
                    options={tableData}
                    onChange={(e) => {
                      setBillingFilterSearch({
                        ...billingFilterSeach,
                        customer_id: e,
                      });
                      // setSelectedValue(e);
                    }}
                  />
                </Space>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15px',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color="#C6CDD5"
                    //   onClick={searchBillingContacts}
                  >
                    Apply
                  </Typography>
                </div>
              </Space>
            }
            items={tabItems}
          />
        </Row>
      </Space>

      <OsModal
        bodyPadding={22}
        body={<AddRegistrationForm />}
        width={583}
        open={showModal}
        onOk={() => {}}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
        footer={false}
      />
    </>
  );
};

export default DealReg;
