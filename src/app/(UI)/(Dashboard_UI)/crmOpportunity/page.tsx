/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsTabs from '@/app/components/common/os-tabs';
import {StageValue, opportunityDummyData} from '@/app/utils/CONSTANTS';
import {Button, MenuProps, TabsProps} from 'antd';
import {useEffect, useState} from 'react';
import OsInput from '@/app/components/common/os-input';
import {SearchOutlined} from '@ant-design/icons';
import {
  deleteCustomers,
  getAllCustomer,
} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddOpportunity from './AddOpportunity';
import {
  deleteOpportunity,
  getAllOpportunity,
  getdeleteOpportunity,
  queryOpportunity,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';

const CrmOpportunity: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>();
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const [deletedData, setDeletedData] = useState<any>();
  const [open, setOpen] = useState(false);
  const [searchCustomerData, setSearchCustomerData] = useState<any>();
  const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const [formValue, setFormValue] = useState<any>();
  const [opportunityValueData, setOpportunityValueData] = useState<any>();

  const searchOpportunity = async () => {
    dispatch(queryOpportunity(searchCustomerData));
  };

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteOpportunity(data));
    setTimeout(() => {
      dispatch(getAllOpportunity());
      // dispatch(getdeleteOpportunity(''));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const updateOpportunityData = async () => {
    await dispatch(updateOpportunity(formValue));
    dispatch(getAllOpportunity());
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getAllOpportunity());
    // dispatch(getdeleteOpportunity(''));
  }, []);
  useEffect(() => {
    setOpportunityValueData(opportunityData);
  }, [opportunityData]);
  const analyticsData = [
    {
      key: 1,
      primary: <div>{opportunityData?.length}</div>,
      secondry: 'Customers',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{opportunityData?.length}</div>,
      secondry: 'Opportunities',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <div>{opportunityData?.length}</div>,
      secondry: 'Contacts',
      icon: <PhoneIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <div>{opportunityData?.length}</div>,
      secondry: 'Recents',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: <div>{opportunityData?.length}</div>,
      secondry: 'Deleted',
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
  ];
  const OpportunityColumns = [
    {
      title: 'Opportunity',
      dataIndex: 'title',
      key: 'title',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '-d-'}</Typography>
      ),
    },
    {
      title: 'Customer Account',
      dataIndex: 'customer_name',
      key: 'customer_name',
      width: 187,
      render: (record: any, text: any) => (
        <Typography name="Body 4/Regular">
          {text?.Customer?.name ?? '--'}
        </Typography>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'stages',
      key: 'stages',
      width: 130,
      render: (text: string, record: any) => (
        <CommonStageSelect
          options={StageValue}
          // value={text}
          onChange={(e: any) => {
            console.log('345435', e);
            const dataa = {id: record?.id, stages: e};
            dispatch(updateOpportunity(dataa));
            setTimeout(() => {
              dispatch(getAllOpportunity());
              // dispatch(getdeleteOpportunity(''));
            }, 1000);
          }}
          currentStage={text}
        />
      ),
    },
    {
      title: 'Quotes / Forms',
      dataIndex: 'quotesForms',
      key: 'quotesForms',
      width: 130,
      render: () => (
        <Typography
          color={token?.colorLink}
          name="Body 4/Bold"
          cursor="pointer"
        >
          View All
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

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const tabItems: TabsProps['items'] = [
    {
      label: <Typography name="Body 4/Regular">All</Typography>,
      children: (
        <OsTable
          columns={OpportunityColumns}
          dataSource={opportunityValueData}
          rowSelection={rowSelection}
          scroll
          loading={false}
        />
      ),
      key: '1',
    },
    {
      label: <Typography name="Body 4/Regular">Commit</Typography>,
      key: '2',
    },
    {
      label: <Typography name="Body 4/Regular">Develop</Typography>,
      key: '3',
    },
    {
      label: <Typography name="Body 4/Regular">Negotiate</Typography>,
      key: '4',
    },
    {
      label: <Typography name="Body 4/Regular">Qualify</Typography>,
      key: '5',
    },
    {
      label: <Typography name="Body 4/Regular">Prove</Typography>,
      key: '6',
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Select All</Typography>,
    },
    {
      key: '1',
      label: (
        <Typography
          name="Body 3/Regular"
          color="#EB445A"
          onClick={() => {
            setShowModalDelete(true);
          }}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <Row
          justify="space-between"
          style={{
            padding: '36px 24px',
            background: token?.colorBgContainer,
            borderRadius: '12px',
          }}
          gutter={[0, 16]}
        >
          {analyticsData?.map((item) => (
            <Col>
              <TableNameColumn
                primaryText={item?.primary}
                secondaryText={item?.secondry}
                fallbackIcon={item?.icon}
                iconBg={item?.iconBg}
              />
            </Col>
          ))}
        </Row>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Opportunities
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
              <OsButton
                text="Add Opportunity"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />
              <Dropdown
                // trigger="click"
                menu={{items: dropDownItemss}}
                placement="bottomRight"
              >
                <Button
                  style={{
                    background: '#14263E',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                  }}
                >
                  <EllipsisVerticalIcon width={24} color="white" />
                </Button>
              </Dropdown>
            </div>
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
                  <Typography name="Body 4/Medium">Opportunity</Typography>
                  <OsInput
                    style={{width: '200px'}}
                    placeholder="Search here"
                    onChange={(e) => {
                      setSearchCustomerData({
                        ...searchCustomerData,
                        title: e.target.value,
                      });
                      // setQuery(e.target.value);
                    }}
                    prefix={<SearchOutlined style={{color: '#949494'}} />}
                  />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Customer Account</Typography>
                  <OsInput
                    style={{width: '200px'}}
                    placeholder="Search here"
                    onChange={(e) => {
                      setSearchCustomerData({
                        ...searchCustomerData,
                        name: e.target.value,
                      });
                    }}
                    prefix={<SearchOutlined style={{color: '#949494'}} />}
                  />
                </Space>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px',
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color="#C6CDD5"
                    onClick={searchOpportunity}
                  >
                    Apply
                  </Typography>
                </div>
              </Space>
            }
            items={tabItems.map((tabItem: any, index: number) => ({
              key: `${index + 1}`,
              label: (
                <div>
                  <div>{tabItem?.label}</div>
                  <div
                    style={{
                      // eslint-disable-next-line eqeqeq
                      borderBottom:
                        // eslint-disable-next-line eqeqeq
                        activeTab == tabItem?.key ? '2px solid #1C3557' : '',
                      // marginTop: '3px',
                    }}
                  />
                </div>
              ),
              ...tabItem,
            }))}
          />
        </Row>
      </Space>

      <OsModal
        // loading={loading}
        body={
          <AddOpportunity
            setFormValue={setFormValue}
            formValue={formValue}
            setShowModal={setShowModal}
            tableData={tableData}
          />
        }
        width={600}
        open={showModal}
        // onOk={() => addQuoteLineItem()}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
      />

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        description="Are you sure you want to delete this contact?"
        heading="Delete Contact"
      />

      <OsDrawer
        title={
          <Typography name="Body 1/Regular">Opportunity Details</Typography>
        }
        placement="right"
        onClose={() => setOpen((p) => !p)}
        open={open}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            {' '}
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="UPDATE CHANGES"
              clickHandler={updateOpportunityData}
            />
          </Row>
        }
      >
        <AddOpportunity
          setFormValue={setFormValue}
          formValue={formValue}
          setShowModal={setShowModal}
          tableData={tableData}
          drawer="drawer"
        />
      </OsDrawer>
    </>
  );
};

export default CrmOpportunity;
