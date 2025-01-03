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
  updateSalesForceSSOLogin,
} from '../../../../../redux/actions/salesForceCredentials';
import AddSalesForceCredentials, {
  AddSalesForceCredentialsRef,
} from './AddSalesForceCredentials';
import EditSalesForceCredentials from './EditSalesForceCredentials';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsCollapse from '@/app/components/common/os-collapse';
import {getSalesForceUserDetails} from '../../../../../redux/actions/user';
import {formatStatus} from '@/app/utils/CONSTANTS';

const AddUser = () => {
  const csvUploadRef = useRef<AddSalesForceCredentialsRef>(null);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [showAddSingleUserModal, setShowAddSingleUserModal] =
    useState<boolean>(false);
  const {data: salesForceCredentials, loading} = useAppSelector(
    (state) => state.salesForceCredentials,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [userData, setUserData] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [salesDetailOptions, setSalesDetailOptions] = useState<any>();

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

  const getSalesForceCredentialsData = async () => {
    await dispatch(getSalesForceUserDetails(''))?.then((payload: any) => {
      let newArr: any = [];
      payload?.payload?.map((items: any) => {
        newArr?.push({
          label: formatStatus(items?.org_name),
          value: items?.org_id,
        });
      });

      // Sort by the 'name' property in alphabetical order
      newArr.sort((a: any, b: any) => {
        if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
        if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
        return 0;
      });

      console.log(newArr);

      setSalesDetailOptions(newArr);
    });
  };

  useEffect(() => {
    getSalesForceCredentialsData();
  }, []);
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
                instance_url: record?.instance_url,
                password: record?.password,
                salesforce_org_name: record?.salesforce_org_name,
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
    let orgName = salesDetailOptions?.find(
      (item: any) => item?.value === getformData?.saleforce_org_Id,
    );
    let obj = {
      ...getformData,
      id: userData?.id,
      login_url: getformData?.login_url,
      instance_url: getformData?.instance_url,
      salesforce_org_name: orgName?.label,
    };

    dispatch(updateSalesForceCredentialsId(obj)).then((res) => {
      if (res?.payload) {
        dispatch(queryAddSalesForceCredentials(''));
      }
      setOpen(false);
      setShowAddSingleUserModal(false);
      setUserData('');
      form.resetFields();
    });
  };
  const locale = {
    emptyText: <EmptyContainer title="No data." />,
  };

  const groupedData = salesForceCredentials?.reduce((acc: any, item: any) => {
    const existingGroup = acc?.find(
      (group: any) => group?.OrganizationId === item?.saleforce_org_Id,
    );
    if (existingGroup) {
      existingGroup?.credentialsData?.push(item);
    } else {
      acc.push({
        OrganizationId: item?.saleforce_org_Id,
        OrganizationName: item?.salesforce_org_name,
        is_sso: item?.is_sso,
        credentialsData: [item],
      });
    }
    return acc;
  }, []);

  const updateSSOLogin = (value: boolean, orgId: string) => {
    let obj = {
      is_sso: value,
      saleforce_org_Id: orgId,
    };
    if (obj) {
      dispatch(updateSalesForceSSOLogin(obj)).then((res) => {
        if (res?.payload) {
          dispatch(queryAddSalesForceCredentials(''));
        }
      });
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
            <Space size={20}>
              <OsButton
                text="Add User Credentials"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => {
                  setShowAddSingleUserModal(true);
                }}
              />
              <OsButton
                text="Upload Credentials File"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => {
                  setShowAddUserModal(true);
                }}
              />
            </Space>
          </Col>
        </Row>
        <div
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          {groupedData?.map((finalDataItem: any, index: number) => {
            return (
              <OsCollapse
                key={index}
                items={[
                  {
                    key: index,
                    label: (
                      <Row
                        justify="space-between"
                        align="middle"
                        gutter={[8, 8]}
                      >
                        <Col>
                          <Typography
                            style={{padding: '5px 8px 0px 0px'}}
                            name="Body 4/Medium"
                            color={token?.colorBgContainer}
                            ellipsis
                            tooltip
                            as="div"
                            maxWidth={240}
                          >
                            Org Name: {finalDataItem?.OrganizationName}
                          </Typography>
                        </Col>
                        <Col>
                          <Typography
                            style={{padding: '5px 8px 0px 0px'}}
                            name="Body 4/Medium"
                            color={token?.colorBgContainer}
                            ellipsis
                            tooltip
                            as="div"
                            maxWidth={240}
                          >
                            Org Id: {finalDataItem?.OrganizationId}
                          </Typography>
                        </Col>
                        <Col>
                          <span
                            onClick={(e: any) => {
                              e.stopPropagation();
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            SSO Login:{' '}
                            <Switch
                              checked={finalDataItem?.is_sso}
                              onClick={(e) => {
                                updateSSOLogin(
                                  e,
                                  finalDataItem?.OrganizationId,
                                );
                              }}
                            />
                          </span>
                        </Col>
                      </Row>
                    ),
                    children: (
                      <div key={JSON.stringify(finalDataItem?.QuoteLineItem)}>
                        <OsTable
                          columns={UserColumns}
                          dataSource={finalDataItem?.credentialsData}
                          scroll
                          loading={loading}
                          locale={locale}
                        />
                      </div>
                    ),
                  },
                ]}
              />
            );
          })}
        </div>
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
          setUserData('');
        }}
        onOk={handleSaveClick}
        primaryButtonText="Save"
        bodyPadding={24}
      />

      <OsModal
        title="Add SalesForce Credentials"
        loading={loading}
        body={
          <EditSalesForceCredentials
            onFinish={updateData}
            form={form}
            salesDetailOptions={salesDetailOptions}
          />
        }
        width={696}
        open={showAddSingleUserModal}
        onCancel={() => {
          setShowAddSingleUserModal((p) => !p);
          form.resetFields();
          setUserData('');
        }}
        onOk={form.submit}
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
          setUserData('');
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
        <EditSalesForceCredentials
          onFinish={updateData}
          form={form}
          drawer
          salesDetailOptions={salesDetailOptions}
        />
      </OsDrawer>
    </>
  );
};

export default AddUser;
