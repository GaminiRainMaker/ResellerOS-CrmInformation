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
import {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

import {Switch} from '@/app/components/common/antd/Switch';
import OsDrawer from '@/app/components/common/os-drawer';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import {
  deleteSalesForceCredentials,
  queryAddSalesForceCredentials,
  updateSalesForceCredentialsId,
} from '../../../../../redux/actions/salesForceCredentials';
import AddSalesForceCredentials, {
  AddSalesForceCredentialsRef,
} from './AddSalesForceCredentials';
import EditSalesForceCredentials from './EditSalesForceCredentials';

const AddUser = () => {
  const csvUploadRef = useRef<AddSalesForceCredentialsRef>(null);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const {data: salesForceCredentialsData, loading} = useAppSelector(
    (state) => state.salesForceCredentials,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const deleteSelectedIds = async () => {
    const dataa = {id: deleteIds};
    await dispatch(deleteSalesForceCredentials(dataa)).then((res) => {
      if (res?.payload) {
        dispatch(queryAddSalesForceCredentials(''));
      }
    });
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const UserColumns = [
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
          SalesForce Org ID
        </Typography>
      ),
      dataIndex: 'saleforce_org_Id',
      key: 'saleforce_org_Id',
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
          SSO Login
        </Typography>
      ),
      dataIndex: 'is_sso',
      key: 'is_sso',
      width: 173,
      render: (text: any, record: any) => (
        <Switch checked={record?.is_sso} size="default" disabled />
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
              setOpen(true);
              setUserData(record);
              form.setFieldsValue({
                username: record?.username,
                consumer_key: record?.consumer_key,
                consumer_secret: record?.consumer_secret,
                login_url: record?.login_url,
                saleforce_org_Id: record?.saleforce_org_Id,
                is_sso: record?.is_sso,
              });
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
    dispatch(queryAddSalesForceCredentials(''));
  }, []);

  const handleSaveClick = async () => {
    if (csvUploadRef.current) {
      try {
        await csvUploadRef.current.uploadToDatabase();
        message.success('Data successfully uploaded');
      } catch (error) {
        message.error('Failed to upload data');
      } finally {
      }
    }
  };

  const updateData = () => {
    const getformData = form.getFieldsValue();
    let obj = {
      ...getformData,
      id: userData?.id,
    };
    dispatch(updateSalesForceCredentialsId(obj)).then((res) => {
      if (res?.payload) {
        dispatch(queryAddSalesForceCredentials(''));
      }
      setOpen(false);
      form.resetFields();
    });
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
                setShowAddUserModal(true);
              }}
            />
          </Col>
        </Row>

        <OsTable
          columns={UserColumns}
          dataSource={salesForceCredentialsData}
          scroll
          loading={loading}
        />
      </Space>

      <OsModal
        title="Add SalesForce Credentials"
        loading={loading}
        body={
          <AddSalesForceCredentials
            ref={csvUploadRef}
            setShowAddUserModal={setShowAddUserModal}
          />
        }
        width={696}
        open={showAddUserModal}
        onCancel={() => {
          setShowAddUserModal((p) => !p);
        }}
        onOk={handleSaveClick}
        primaryButtonText="Save"
        bodyPadding={24}
      />
      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete SalesForce Credentials"
        description="Are you sure you want to delete this SalesForce Credentials?"
      />

      <OsDrawer
        title={
          <Typography name="Body 1/Regular">Update User Credentials</Typography>
        }
        placement="right"
        onClose={() => {
          setOpen(false);
          form.resetFields();
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
        <EditSalesForceCredentials onFinish={updateData} form={form} />
      </OsDrawer>
    </>
  );
};

export default AddUser;
