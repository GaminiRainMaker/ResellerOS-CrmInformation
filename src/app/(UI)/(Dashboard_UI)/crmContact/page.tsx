/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Typography from '@/app/components/common/typography';
import {
  CheckBadgeIcon,
  ClockIcon,
  PencilSquareIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import OsTabs from '@/app/components/common/os-tabs';
import {MenuProps, TabsProps} from 'antd';
import {Option} from 'antd/es/mentions';
import {useEffect, useState} from 'react';
import {
  deleteBillingContact,
  queryContact,
  updateBillingContact,
} from '../../../../../redux/actions/billingContact';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddContact from './addContact';
import EditContactModal from './editContact';

const CrmAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<any>('1');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [deleteIds, setDeleteIds] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {loading, filteredData} = useAppSelector(
    (state) => state.billingContact,
  );
  const [deletedData, setDeletedData] = useState<any>();
  const [query, setQuery] = useState<{
    contact: string | null;
    customer: string | null;
  }>({
    contact: null,
    customer: null,
  });
  const searchQuery = useDebounceHook(query, 500);

  useEffect(() => {
    dispatch(queryContact(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    const deletedAll = filteredData?.filter((item: any) => item?.is_deleted);
    const setDeleted = deletedAll;
    setDeletedData(setDeleted);
  }, [filteredData, activeTab]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(queryContact(query));
    }, 1000);
  }, [showModal, open]);

  const updatebillDetails = async () => {
    dispatch(updateBillingContact(formValue));
    setOpen((p) => !p);
    setTimeout(() => {
      dispatch(getAllCustomer(''));
      dispatch(queryContact(''));
    }, 1000);
  };

  const deleteSelectedIds = async () => {
    const data = {Ids: deleteIds};
    await dispatch(deleteBillingContact(data));
    setDeleteIds([]);
    setShowModalDelete(false);
    setTimeout(() => {
      dispatch(getAllCustomer(''));
      dispatch(queryContact(''));
    }, 1000);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
  };

  const analyticsData = [
    {
      key: 1,
      primary: <div>{dataAddress.length}</div>,
      secondry: 'Customers',
      icon: <UserGroupIcon width={24} color={token?.colorInfo} />,
      iconBg: token?.colorInfoBgHover,
    },
    {
      key: 2,
      primary: <div>{0}</div>,
      secondry: 'Opportunities',
      icon: <CheckBadgeIcon width={24} color={token?.colorSuccess} />,
      iconBg: token?.colorSuccessBg,
    },
    {
      key: 3,
      primary: <div>{filteredData?.length}</div>,
      secondry: 'Contacts',
      icon: <PhoneIcon width={24} color={token?.colorLink} />,
      iconBg: token?.colorLinkActive,
    },
    {
      key: 4,
      primary: <div>--</div>,
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

  const ContactColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Contact Name
        </Typography>
      ),
      dataIndex: 'billing_first_name',
      key: 'billing_first_name',
      width: 130,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Role
        </Typography>
      ),
      dataIndex: 'billing_role',
      key: 'billing_role',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Email
        </Typography>
      ),
      dataIndex: 'billing_email',
      key: 'billing_email',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Customer Account
        </Typography>
      ),
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
          <div style={{border: activeTab === 1 ? '1px solid #1C3557' : ''}} />
        </div>
      ),
      key: '1',
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

  const uniqueContact = Array.from(
    new Set(filteredData.map((contact: any) => contact.billing_first_name)),
  );

  const uniqueCustomer = Array.from(
    new Set(filteredData.map((contact: any) => contact.Customer?.name)),
  );

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Data"
        actionButton="Add Customer"
        onClick={() => {
          setShowModal(true);
        }}
      />
    ),
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
              Contact
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
              <Space>
                <OsDropdown menu={{items: dropDownItemss}} />
              </Space>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            display: 'flex',
            gap: 12,
            flexDirection: 'column',
          }}
        >
          <Row justify="end" style={{width: '100%'}}>
            <Space size={12} align="center">
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">Customer Account</Typography>
                <CommonSelect
                  style={{width: '200px'}}
                  placeholder="Search here"
                  showSearch
                  onSearch={(e) => {
                    setQuery({
                      ...query,
                      customer: e,
                    });
                  }}
                  onChange={(e) => {
                    setQuery({
                      ...query,
                      customer: e,
                    });
                  }}
                  value={query?.customer}
                >
                  {uniqueCustomer?.map((customer: any) => (
                    <Option key={customer} value={customer}>
                      {customer}
                    </Option>
                  ))}
                </CommonSelect>
              </Space>
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">Contact Name</Typography>
                <CommonSelect
                  style={{width: '200px'}}
                  placeholder="Search here"
                  showSearch
                  onSearch={(e) => {
                    setQuery({
                      ...query,
                      contact: e,
                    });
                  }}
                  onChange={(e) => {
                    setQuery({
                      ...query,
                      contact: e,
                    });
                  }}
                  value={query?.contact}
                >
                  {uniqueContact?.map((contact: any) => (
                    <Option key={contact} value={contact}>
                      {contact}
                    </Option>
                  ))}
                </CommonSelect>
              </Space>

              <div style={{marginTop: '15px'}}>
                <Typography
                  cursor="pointer"
                  name="Button 1"
                  color="#C6CDD5"
                  onClick={() => {
                    setQuery({
                      contact: null,
                      customer: null,
                    });
                  }}
                >
                  Reset
                </Typography>
              </div>
            </Space>
          </Row>

          <OsTable
            columns={ContactColumns}
            dataSource={filteredData}
            rowSelection={rowSelection}
            scroll
            loading={loading}
            locale={locale}
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
        title={<Typography name="Body 1/Regular">Contact Details</Typography>}
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
          drawer="drawer"
        />
      </OsDrawer>
    </>
  );
};

export default CrmAccount;
