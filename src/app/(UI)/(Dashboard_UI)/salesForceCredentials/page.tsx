'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Form, message} from 'antd';
import {useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

import {Switch} from '@/app/components/common/antd/Switch';
import {useRouter} from 'next/navigation';
import OsModal from '@/app/components/common/os-modal';
import AddSalesForceCredentials, { AddSalesForceCredentialsRef } from './AddSalesForceCredentials';

const AddUser = () => {
  const csvUploadRef = useRef<AddSalesForceCredentialsRef>(null);
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
  const [addUserType, setAddUserType] = useState<string>('');
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  //   const deleteSelectedIds = async () => {
  //     const dataa = {id: deleteIds};
  //     await dispatch(deleteUser(dataa));
  //     setTimeout(() => {
  //       dispatch(getUserByOrganization(userInformation?.organization));
  //     }, 1000);
  //     setDeleteIds([]);
  //     setShowModalDelete(false);
  //     location?.reload();
  //   };

  const UserColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          SalesForce Org ID
        </Typography>
      ),
      dataIndex: 'salesforce_org_id',
      key: 'salesforce_org_id',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular" hoverOnText>
          {text ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Username
        </Typography>
      ),
      dataIndex: 'username',
      key: 'username',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          SSO Login
        </Typography>
      ),
      dataIndex: 'is_sso',
      key: 'is_sso',
      width: 173,
      render: (text: any, record: any) => (
        <Switch
          defaultChecked={text}
          size="default"
          onChange={(e) => {
            // updateLoginStep(record?.id, e);
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Action
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
              //   setOpen(true);
              //   setAddUserType('update');
              //   setUserData(record);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              //   setDeleteIds([record?.id]);
              //   setShowModalDelete(true);
            }}
          />
        </Space>
      ),
    },
  ];

  //   useEffect(() => {
  //     if (userInformation?.organization) {
  //       dispatch(getUserByOrganization(userInformation?.organization));
  //     }
  //   }, [userInformation?.organization]);

  const handleSaveClick = async () => {
    if (csvUploadRef.current) {
      // setLoading(true); // Set loading state when save button is clicked
      try {
        await csvUploadRef.current.uploadToDatabase(); // Trigger child function
        message.success('Data successfully uploaded');
        // setShowAddUserModal(false); // Close modal on success
      } catch (error) {
        message.error('Failed to upload data');
      } finally {
        // setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              SalesForce Credentials
            </Typography>
          </Col>
          <Col>
            <OsButton
              text="Upload File"
              buttontype="PRIMARY"
              icon={<PlusIcon />}
              clickHandler={() => {
                // setAddUserType('insert');
                setShowAddUserModal(true);
              }}
            />
          </Col>
        </Row>

        <OsTable
          columns={UserColumns}
          dataSource={[]}
          scroll
          loading={loading}
        />
      </Space>

      <OsModal
        title="Add SalesForce Credentials"
        loading={loading}
        body={<AddSalesForceCredentials ref={csvUploadRef} />}
        width={696}
        open={showAddUserModal}
        onCancel={() => {
          setShowAddUserModal((p) => !p);
        }}
        onOk={handleSaveClick}
        primaryButtonText="Save"
        // footerPadding={24}
        bodyPadding={24}
      />

      {/* <DailogModal
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
      /> */}
      {/* <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete User"
        description="Are you sure you want to delete this user?"
      /> */}
      {/* 
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
              text="Update Changes"
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
      </OsDrawer> */}
    </>
  );
};

export default AddUser;
