'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
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
import {sendNewUserEmail} from '../../../../../redux/actions/auth';
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
import {useRouter} from 'next/navigation';

const AddUser = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [token] = useThemeToken();
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const {
    data: UsersData,
    loading,
    userInformation,
  } = useAppSelector((state) => state.user);
  const [showDailogModal, setShowDailogModal] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [form] = Form.useForm();
  const [addUserType, setAddUserType] = useState<string>('');
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

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
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Regular"
          hoverOnText
          onClick={() => {
            router.push(
              `/accountInfo?id=${record?.id}&organization=${record?.organization}&role=admin`,
            );
          }}
        >
          {text ?? '--'}
        </Typography>
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
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 173,
      render: (text: string, record: any) => (
        <OsStatusWrapper
          value={record?.is_email_invite ? 'Invite Sent' : 'Verified'}
        />
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
    if (userInformation?.organization) {
      dispatch(getUserByOrganization(userInformation?.organization));
    }
  }, [userInformation?.organization]);

  const onFinish = () => {
    const userNewData = form.getFieldsValue();

    const userDataobj: any = {
      ...userNewData,
      organization: userInformation?.organization,
      role: 'reseller',
      password: `${userNewData?.first_name}@123`,
    };
    if (userNewData) {
      if (addUserType === 'insert') {
        dispatch(createUser({...userDataobj, is_email_invite: true})).then(
          (d: any) => {
            if (d?.payload) {
              const obj = {
                id: d?.payload?.id,
                // for Testing Purpose
                // recipientEmail: 'yesip63374@idsho.com',
                recipientEmail: d?.payload?.email,
                username: d?.payload?.user_name,
                password: d?.payload?.password,
              };
              dispatch(sendNewUserEmail(obj));
            }
            setShowAddUserModal(false);
            setShowDailogModal(true);
          },
        );
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
            <OsButton
              text="Add New User"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
              clickHandler={() => {
                setAddUserType('insert');
                setShowAddUserModal((p) => !p);
              }}
            />
          </Col>
        </Row>

        <OsTable
          columns={UserColumns}
          dataSource={UsersData}
          scroll
          loading={loading}
        />
      </Space>

      <OsModal
        loading={loading}
        body={<AddUsers form={form} onFinish={onFinish} />}
        width={696}
        open={showAddUserModal}
        onCancel={() => {
          setShowAddUserModal((p) => !p);
        }}
        onOk={form.submit}
        primaryButtonText="Save & Send Invite"
        footerPadding={24}
      />

      <DailogModal
        setShowDailogModal={setShowDailogModal}
        showDailogModal={showDailogModal}
        title="Invite Sent"
        subTitle="Invite has been sent on email with auto-generated password"
        primaryButtonText="Done"
        icon={
          <CheckCircleIcon width={35} height={35} color={token?.colorSuccess} />
        }
        onOk={() => {
          window.location.reload();
          setShowDailogModal(false);
        }}
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
        title={<Typography name="Body 1/Regular">User Settings</Typography>}
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
              text="Update"
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
