/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import Typography from '@/app/components/common/typography';
import {
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  UserGroupIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

import {Dropdown} from '@/app/components/common/antd/DropDown';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {PopConfirm} from '@/app/components/common/antd/PopConfirm';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import {Button, MenuProps, TabsProps, Upload} from 'antd';
import {useRouter} from 'next/navigation';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import {useEffect, useState} from 'react';
import CommonSelect from '@/app/components/common/os-select';
import OsDrawer from '@/app/components/common/os-drawer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import EditContactModal from './editContact';
import AddContact from './addContact';
import {
  deleteCustomers,
  getAllCustomer,
} from '../../../../../redux/actions/customer';
import {
  deleteBillingContact,
  getAllbillingContact,
  getBillingContactBySearch,
  updateBillingContact,
} from '../../../../../redux/actions/billingContact';

const CrmAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<Boolean>(false);
  const [open, setOpen] = useState(false);
  const {data: dataAddress, loading} = useAppSelector(
    (state) => state.customer,
  );
  const {data: billingData} = useAppSelector((state) => state.billingContact);
  const [tableData, setTableData] = useState<any>();
  const [tableDataforBillContact, setTableDataforBillContact] = useState<any>();
  const [billingDataTable, setBillingDataTable] = useState<any>();

  const [deletedData, setDeletedData] = useState<any>();
  const [searchValue, setSearchValue] = useState<any>();

  const searchBillingContacts = async () => {
    dispatch(getBillingContactBySearch(searchValue));
  };
  useEffect(() => {
    const deletedAll = billingData?.filter((item: any) => item?.is_deleted);
    const onLive = billingData?.filter((item: any) => !item?.is_deleted);
    setTableDataforBillContact(onLive);
    const bilingOnly = onLive?.filter((item: any) => item?.billing);
    const deletedBill = bilingOnly?.filter((item: any) => item?.is_deleted);

    setBillingDataTable(bilingOnly);
    const setDeleted = activeTab == 1 ? deletedAll : deletedBill;
    setDeletedData(setDeleted);
  }, [billingData, activeTab]);
  useEffect(() => {}, [dataAddress]);

  useEffect(() => {
    dispatch(getAllCustomer(''));
    dispatch(getAllbillingContact(''));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllCustomer(''));
      dispatch(getAllbillingContact(''));
    }, 1000);
  }, [showModal]);
  useEffect(() => {
    const optionValues: any = [];
    if (dataAddress) {
      const liveOn = dataAddress?.filter((item: any) => !item?.is_deleted);
      liveOn?.map((item: any) => {
        optionValues?.push({label: item?.name, value: item?.id});
      });
    }
    setTableData(optionValues);
  }, [dataAddress]);

  const updatebillDetails = async () => {
    dispatch(updateBillingContact(formValue));
    setOpen((p) => !p);
    setTimeout(() => {
      dispatch(getAllCustomer(''));
      dispatch(getAllbillingContact(''));
    }, 1000);
  };

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteBillingContact(data));
    setDeleteIds([]);
    setShowModalDelete(false);
    setTimeout(() => {
      dispatch(getAllCustomer(''));
      dispatch(getAllbillingContact(''));
    }, 1000);
  };
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      console.log('rowSelection', selectedRowKeys);
      setDeleteIds(selectedRowKeys);
    },
  };
  const analyticsData = [
    {
      key: 1,
      primary: (
        <div>
          {activeTab == 1
            ? tableDataforBillContact?.length
            : billingDataTable?.length}
        </div>
      ),
      secondry: 'Customers',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: (
        <div>
          {activeTab == 1
            ? tableDataforBillContact?.length
            : billingDataTable?.length}
        </div>
      ),
      secondry: 'Opportunities',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: (
        <div>
          {activeTab == 1
            ? tableDataforBillContact?.length
            : billingDataTable?.length}
        </div>
      ),
      secondry: 'Contacts',
      icon: <PhoneIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: (
        <div>
          {activeTab == 1
            ? tableDataforBillContact?.length
            : billingDataTable?.length}
        </div>
      ),
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
  const Quotecolumns = [
    {
      title: 'Conatct Name',
      dataIndex: 'billing_first_name',
      key: 'billing_first_name',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'billing_role',
      key: 'billing_role',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'billing_email',
      key: 'billing_email',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: 'Customer Account',
      dataIndex: 'Account',
      key: 'Account',
      width: 187,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.Customer?.name ?? '--'}
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

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <div>
          <div>All</div>
          {/* <div style={{border: activeTab == 1 ? '1px solid #1C3557' : ''}} /> */}
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <div>
          <div>Billing Contacts</div>
          {/* <div style={{border: activeTab == 2 ? '1px solid #1C3557' : ''}} /> */}
        </div>
      ),
      key: '2',
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
          Edit
        </Typography>
      ),
    },
    {
      key: '3',
      label: (
        <Typography
          name="Body 3/Regular"
          color="#EB445A"
          onClick={() => setShowModalDelete(true)}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];
  const handleFileChange = (file: any) => {
    console.log('43543545', file);
  };
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
              Contact{' '}
              {/* <div>
                <Upload
                  onChange={(e: any) => {
                    console.log('435435435', e.fileList[0]?.originFileObj);
                    Papa.parse(e.fileList[0]?.originFileObj, {
                      header: true,
                      skipEmptyLines: true,
                      complete(results: any) {
                        console.log(results.data);
                      },
                    });
                  }}
                  accept=".txt, .csv"
                >
                  CSV
                </Upload>
              </div> */}
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
                text="Add Contact"
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
                  <Typography name="Body 4/Medium">Contact Name</Typography>
                  <CommonSelect
                    style={{width: '180px'}}
                    placeholder="Search Here"
                    // options={bundleOptions}
                  />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Customer Account</Typography>
                  <CommonSelect
                    style={{width: '180px'}}
                    placeholder="Search Here"
                    options={tableData}
                  />
                </Space>
                <Typography
                  cursor="pointer"
                  name="Button 1"
                  color="#C6CDD5"
                  onClick={searchBillingContacts}
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
              children: (
                <OsTable
                  key={tabItem?.key}
                  columns={Quotecolumns}
                  dataSource={
                    activeTab == 1 ? tableDataforBillContact : billingDataTable
                  }
                  rowSelection={rowSelection}
                  scroll
                  loading={false}
                />
              ),
              ...tabItem,
            }))}
          />
        </Row>
      </Space>

      <OsModal
        // loading={loading}
        body={<EditContactModal />}
        width={1110}
        open={showModalEdit}
        // onOk={() => addQuoteLineItem()}
        onCancel={() => {
          setShowModalEdit((p) => !p);
        }}
      />
      <OsModal
        // loading={loading}
        body={
          <AddContact
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

      <OsModal
        // loading={loading}
        body={
          <Row style={{width: '100%', padding: '15px'}}>
            <Space style={{width: '100%'}} direction="vertical" align="center">
              <Typography name="Heading 3/Medium">Delete Account</Typography>
              <Typography name="Body 3/Regular">
                Are you sure you want to delete the selected accounts?
              </Typography>
              <Space size={12}>
                <OsButton
                  text={`Don't Delete`}
                  buttontype="SECONDARY"
                  clickHandler={() => {
                    setDeleteIds([]);
                    setShowModalDelete(false);
                  }}
                />
                <OsButton
                  text="Yes, Delete"
                  buttontype="PRIMARY"
                  clickHandler={deleteSelectedIds}
                />
              </Space>
            </Space>
          </Row>
        }
        width={600}
        open={showModalDelete}
        // onOk={() => addQuoteLineItem()}
        onCancel={() => {
          setShowModalDelete((p) => !p);
        }}
      />

      <OsDrawer
        title={<Typography name="Body 1/Regular">Customer Details</Typography>}
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
              clickHandler={updatebillDetails}
            />
          </Row>
        }
      >
        <AddContact
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

export default CrmAccount;
