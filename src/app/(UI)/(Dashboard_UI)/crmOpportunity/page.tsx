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
import {
  deleteCustomers,
  getAllCustomer,
} from '../../../../../redux/actions/customer';
import {useAppDispatch} from '../../../../../redux/hook';
import AddOpportunity from './AddOpportunity';
import {getAllOpportunity} from '../../../../../redux/actions/opportunity';

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
  // const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const [formValue, setFormValue] = useState<any>();

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteCustomers(data));
    setTimeout(() => {
      dispatch(getAllCustomer(''));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  useEffect(() => {
    dispatch(getAllOpportunity());
  }, []);
  const analyticsData = [
    {
      key: 1,
      primary: <div>{tableData?.length}</div>,
      secondry: 'Customers',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{tableData?.length}</div>,
      secondry: 'Opportunities',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <div>{tableData?.length}</div>,
      secondry: 'Contacts',
      icon: <PhoneIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <div>{tableData?.length}</div>,
      secondry: 'Recents',
      icon: <ClockIcon width={24} color={token?.colorWarning} />,
      iconBg: token?.colorWarningBg,
    },
    {
      key: 5,
      primary: <div>{deletedData?.length}</div>,
      secondry: 'Deleted',
      icon: <TrashIcon width={24} color={token?.colorError} />,
      iconBg: token?.colorErrorBg,
    },
  ];
  const OpportunityColumns = [
    {
      title: 'Opportunity',
      dataIndex: 'opportunity',
      key: 'opportunity',
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
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
      dataIndex: 'stage',
      key: 'stage',
      width: 130,
      render: (text: string) => (
        <CommonStageSelect options={StageValue} currentStage={text} />
      ),
    },
    {
      title: 'Quotes / Forms',
      dataIndex: 'quotesForms',
      key: 'quotesForms',
      width: 130,
      render: (text: string) => (
        <Typography color={token?.colorLink} name="Body 4/Bold">
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
      label: (
        <div>
          <div>All</div>
          <div style={{border: activeTab === 1 ? '1px solid #1C3557' : ''}} />
        </div>
      ),
      children: (
        <OsTable
          columns={OpportunityColumns}
          dataSource={opportunityDummyData}
          rowSelection={rowSelection}
          scroll
          loading={false}
        />
      ),
      key: '1',
    },
    {
      label: (
        <div>
          <div>Commit</div>
          <div style={{border: activeTab === 1 ? '1px solid #1C3557' : ''}} />
        </div>
      ),
      key: '2',
    },
    {
      label: (
        <div>
          <div>Develop</div>
          <div style={{border: activeTab === 1 ? '1px solid #1C3557' : ''}} />
        </div>
      ),
      key: '3',
    },
    {
      label: (
        <div>
          <div>Negotiate</div>
          <div style={{border: activeTab === 1 ? '1px solid #1C3557' : ''}} />
        </div>
      ),
      key: '4',
    },
    {
      label: (
        <div>
          <div>Qualify</div>
          <div style={{border: activeTab === 1 ? '1px solid #1C3557' : ''}} />
        </div>
      ),
      key: '5',
    },
    {
      label: (
        <div>
          <div>Prove</div>
          <div style={{border: activeTab === 1 ? '1px solid #1C3557' : ''}} />
        </div>
      ),
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
          onClick={deleteSelectedIds}
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
                  <CommonSelect
                    style={{width: '180px'}}
                    placeholder="Search Here"
                    options={tableData}
                    onChange={(e) => {
                      //   setBillingFilterSearch({
                      //     ...billingFilterSeach,
                      //     customer_id: e,
                      //   });
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
                      //   setBillingFilterSearch({
                      //     ...billingFilterSeach,
                      //     customer_id: e,
                      //   });
                    }}
                  />
                </Space>
                <Typography
                  cursor="pointer"
                  name="Button 1"
                  color="#C6CDD5"
                  //   onClick={searchBillingContacts}
                >
                  Apply
                </Typography>
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
              // clickHandler={updatebillDetails}
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
