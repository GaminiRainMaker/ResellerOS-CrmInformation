'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {CheckCircleIcon} from '@heroicons/react/20/solid';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useEffect, useState} from 'react';
import {
  createUser,
  deleteUser,
  getUserByOrganization,
  updateUserById,
} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsDrawer from '../os-drawer';
import OsModal from '../os-modal';
import DeleteModal from '../os-modal/DeleteModal';
import DailogModal from '../os-modal/DialogModal';
import OsStatusWrapper from '../os-status';
import AddUsers from './AddUser';

const AddUser = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const {data, loading, userInformation} = useAppSelector(
    (state) => state.user,
  );
  const [showDailogModal, setShowDailogModal] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [form] = Form.useForm();
  const [addUserType, setAddUserType] = useState<string>('');
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const dropDownItemss = [
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
          // onClick={deleteSelectedIds}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];
  const deleteSelectedIds = async () => {
    const dataa = {id: deleteIds};
    await dispatch(deleteUser(dataa));
    setTimeout(() => {
      dispatch(getUserByOrganization(userInformation?.organization));
    }, 1000);
    setDeleteIds([]);
    setShowModalDelete(false);
  };
  const UserColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Name
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Contact No.
        </Typography>
      ),
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Job Title
        </Typography>
      ),
      dataIndex: 'job_title',
      key: 'job_title',
      width: 173,
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
      dataIndex: 'email',
      key: 'email',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          One Time Password
        </Typography>
      ),
      dataIndex: 'one_time_password',
      key: 'one_time_password',
      width: 173,
      render: (text: string) => (
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
      width: 173,
      render: (text: string, record: any) => (
        <OsStatusWrapper value={text ?? 'Invite Sent'} />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          {' '}
        </Typography>
      ),
      dataIndex: 'actions',
      key: 'actions',
      width: 101,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setOpen(true);
              setAddUserType('update');
              setUserData(record);
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

  useEffect(() => {
    dispatch(getUserByOrganization(userInformation?.organization));
  }, []);

  const onFinish = () => {
    const userNewData = form.getFieldsValue();
    const userDataobj: any = {
      ...userNewData,
      organization: localStorage.getItem('organization'),
    };
    if (userNewData) {
      if (addUserType === 'insert') {
        dispatch(createUser(userDataobj)).then(() => {
          setShowAddUserModal(false);
          setShowDailogModal(true);
        });
      } else if (addUserType === 'update') {
        const obj: any = {
          id: userData?.id,
          ...userDataobj,
        };
        dispatch(updateUserById(obj)).then(() => {
          setOpen(false);
        });
      }
    }
    setTimeout(() => {
      dispatch(getUserByOrganization(userInformation?.organization));
    }, 1000);
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Users
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
                text="Add New User"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => {
                  setAddUserType('insert');
                  setShowAddUserModal((p) => !p);
                }}
              />
              <Space>
                <OsDropdown menu={{items: dropDownItemss}} />
              </Space>
            </div>
          </Col>
        </Row>

        <OsTable
          columns={UserColumns}
          dataSource={data}
          scroll
          loading={loading}
        />
      </Space>

      <OsModal
        loading={loading}
        body={<AddUsers form={form} />}
        width={696}
        open={showAddUserModal}
        onCancel={() => {
          setShowAddUserModal((p) => !p);
        }}
        onOk={onFinish}
        primaryButtonText="Save & Send Invite"
        footerPadding={24}
      />

      <DailogModal
        setShowDailogModal={setShowDailogModal}
        showDailogModal={showDailogModal}
        title="Invite Sent"
        subTitle="Invite has been sent on email with auto-generated password"
        primaryButtonText="Send Again"
        icon={
          <CheckCircleIcon width={35} height={35} color={token?.colorSuccess} />
        }
      />
      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete User"
        description="Are you sure you want to delete this user?"
      />

      <OsDrawer
        title={<Typography name="Body 1/Regular">Update User</Typography>}
        placement="right"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="UPDATE"
              clickHandler={() => form.submit()}
            />
          </Row>
        }
      >
        <AddUsers
          isDrawer
          userData={userData}
          onFinish={onFinish}
          form={form}
        />
      </OsDrawer>
    </>
  );
};

export default AddUser;
