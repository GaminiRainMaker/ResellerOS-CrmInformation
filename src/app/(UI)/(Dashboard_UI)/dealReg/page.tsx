/* eslint-disable import/no-named-as-default */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Typography from '@/app/components/common/typography';
import {PlusIcon} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapse from '@/app/components/common/os-collapse';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {MenuProps, TabsProps} from 'antd';
import {useEffect, useState} from 'react';
import {getAllDealReg} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddRegistrationForm from './AddRegistrationForm';
import DealRegAnalytics from './dealRegAnalytics';

interface SeparatedData {
  [opportunityId: number]: {
    opportunity_id: number;
    data: any[];
    title: string;
  };
}

const DealReg: React.FC = () => {
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const {data: DealRegData, loading: dealLoading} = useAppSelector(
    (state) => state.dealReg,
  );

  const [tableData, setTableData] = useState<any>();

  const [billingFilterSeach, setBillingFilterSearch] = useState<any>();
  const [finalDealRegData, setFinalDealRegData] = useState<any>();
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
          Type
        </Typography>
      ),
      dataIndex: 'type',
      key: 'type',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">{'Registered'}</Typography>
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
      dataIndex: 'partner_id',
      key: 'partner_id',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
      render: (text: string, record: any) => <OsStatusWrapper value={text} />,
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

  useEffect(() => {
    const separatedData: SeparatedData = {};
    DealRegData?.forEach((item: any) => {
      const opportunityId = item.opportunity_id;
      const opportunityTitle = item.Opportunity?.title;
      if (!separatedData[opportunityId]) {
        separatedData[opportunityId] = {
          opportunity_id: opportunityId,
          title: opportunityTitle,
          data: [],
        };
      }
      separatedData[opportunityId]?.data.push(item);
    });
    setFinalDealRegData(Object.values(separatedData));
  }, [DealRegData]);

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Regular">All</Typography>,
      key: '1',
      children: (
        <>
          {finalDealRegData?.map((itemDeal: any) => (
            <OsCollapse
              items={[
                {
                  key: '2',
                  label: (
                    <>
                      <Space
                        style={{
                          display: 'flex',
                          justifyContent: 'start',
                        }}
                      >
                        <p>{itemDeal?.title}</p>
                      </Space>
                    </>
                  ),
                  children: (
                    <OsTable
                      columns={DealRegColumns}
                      dataSource={itemDeal?.data}
                      rowSelection={rowSelection}
                      scroll
                      loading={dealLoading}
                      locale={locale}
                    />
                  ),
                },
              ]}
            />
          ))}
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
