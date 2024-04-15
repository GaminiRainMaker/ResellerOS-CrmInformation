/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getAllDealReg} from '../../../../../redux/actions/dealReg';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddRegistrationForm from './AddRegistrationForm';
import DealRegAnalytics from './dealRegAnalytics';

interface SeparatedData {
  [opportunityId: number]: {
    opportunity_id: number;
    dealReg_id: number;
    data: any[];
    title: string;
  };
}

const DealReg: React.FC = () => {
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const {data: DealRegData, loading: dealLoading} = useAppSelector(
    (state) => state.dealReg,
  );
  const [finalDealRegData, setFinalDealRegData] = useState<any>();

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
      render: () => <Typography name="Body 4/Regular">Registered</Typography>,
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
        <Typography name="Body 4/Regular">
          {record?.Partner?.partner ?? '--'}
        </Typography>
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
        <Typography name="Body 4/Regular">
          {record?.PartnerProgram?.partner_program ?? '--'}
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
      render: (text: string) => <OsStatusWrapper value={text} />,
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
      const opportunityId = item?.opportunity_id;
      const dealRegId = item?.id;
      const opportunityTitle = item?.Opportunity?.title;
      if (!separatedData[opportunityId]) {
        separatedData[opportunityId] = {
          opportunity_id: opportunityId,
          dealReg_id: dealRegId,
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
              defaultActiveKey={['1']}
              items={[
                {
                  key: '1',
                  label: (
                    <>
                      <Row justify="space-between">
                        <Col>
                          <p>{itemDeal?.title}</p>
                        </Col>
                        <Col>
                          <p
                            onClick={(e) => {
                              router?.push(
                                `/dealRegDetail?id=${itemDeal?.dealReg_id}&opportunityId=${itemDeal?.opportunity_id}`,
                              );
                              e?.stopPropagation();
                            }}
                          >
                            Deal Registration
                          </p>
                        </Col>
                      </Row>
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
      children: (
        <OsTable
          columns={DealRegColumns}
          dataSource={[]}
          rowSelection={rowSelection}
          scroll
          loading={dealLoading}
          locale={locale}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Completed</Typography>,
      key: '3',
      children: (
        <OsTable
          columns={DealRegColumns}
          dataSource={[]}
          rowSelection={rowSelection}
          scroll
          loading={dealLoading}
          locale={locale}
        />
      ),
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '2',
      label: <Typography name="Body 3/Regular">Edit Selected</Typography>,
    },
    {
      key: '3',
      label: <Typography name="Body 3/Regular">Download Selected</Typography>,
    },
    {
      key: '4',
      label: (
        <Typography name="Body 3/Regular" color={token?.colorError}>
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
            <OsButton
              text="New Registration Form"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
              clickHandler={() => setShowModal((p) => !p)}
            />
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
                  <OsInput style={{width: '180px'}} placeholder="Search Here" />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Customer Account</Typography>
                  <CommonSelect
                    style={{width: '180px'}}
                    placeholder="Search Here"
                  />
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

      <OsModal
        bodyPadding={22}
        body={<AddRegistrationForm setShowModal={setShowModal} />}
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
