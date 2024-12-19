'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {
  EyeIcon,
  PencilSquareIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {Option} from 'antd/es/mentions';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {insertAssignPartnerProgram} from '../../../../../redux/actions/assignPartnerProgram';
import {createSalesForcePartner} from '../../../../../redux/actions/salesForce';
import {
  getSalesForceAccessToken,
  getSalesForceCrendenialsByOrgId,
} from '../../../../../redux/actions/salesForceCredentials';
import {
  createNewOrganization,
  getAdminUserOfAllOrganization,
  updateUserById,
} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setAllResellerRecord} from '../../../../../redux/slices/user';
import AddNewOrganization from './AddNewOrganization';
import AssignPartnerProgram from './AssignPartnerProgram';
import OsDrawer from '@/app/components/common/os-drawer';
import EditOrgDetail from './EditOrgDetail';

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const [form] = Form.useForm();
  const [editOrgForm] = Form.useForm();
  const [newOrganizationFormData] = Form.useForm();
  const {data: userData, loading} = useAppSelector((state) => state.user);
  const {loading: AssignPartnerProgramLoading} = useAppSelector(
    (state) => state.assignPartnerProgram,
  );
  const [showPartnerProgramAssignModal, setShowPartnerProgramAssignModal] =
    useState<boolean>(false);
  const [showEditDrawer, setShowEditDrawer] = useState<boolean>(false);
  const [editRecordData, setEditRecordData] = useState<any>();
  const [activeKey, setActiveKey] = useState<string>('1');
  const [selectedRecordData, setSelectedRecordData] = useState<any>();
  const [showNewOrganizationModal, setShowNewOrganizationModal] =
    useState<boolean>(false);
  const updatedResellerData = userData?.filter(
    (d: any) => d?.organization !== 'rainmakercloud',
  );
  const [query, setQuery] = useState<{
    organization: string | null;
    user_name: string | null;
  }>({
    organization: null,
    user_name: null,
  });
  const searchQuery = useDebounceHook(query, 500);

  const UserDataColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Organization
        </Typography>
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            router.push(
              `/organizationUsers?organization=${record?.organization}`,
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
          Master Admin Name
        </Typography>
      ),
      dataIndex: 'user_name',
      key: 'user_name',
      width: 173,
      render: (text: string, record: any) => (
        <Typography
          hoverOnText
          color={token?.colorInfo}
          name="Body 4/Regular"
          onClick={() => {
            router.push(
              `/accountInfo?id=${record?.id}&organization=${record?.organization}&role=superAdmin`,
            );
          }}
        >
          {record?.first_name && record?.last_name
            ? `${record.first_name} ${record.last_name}`
            : record?.first_name
              ? record.first_name
              : record?.user_name}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Master Email
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
          Organization ID
        </Typography>
      ),
      dataIndex: 'org_id',
      key: 'org_id',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Salesforce Account
        </Typography>
      ),
      dataIndex: 'is_salesforce',
      key: 'is_salesforce',
      width: 173,
      render: (text: any, record: any) => {
        return <Checkbox checked={text} />;
      },
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Actions
        </Typography>
      ),
      dataIndex: 'actions',
      key: 'actions',
      width: 250,
      render: (text: string, record: any) => (
        <Space size={30}>
          <PencilSquareIcon
            height={24}
            width={24}
            onClick={() => {
              setShowEditDrawer(true);
              setEditRecordData(record);
              editOrgForm.setFieldsValue({
                org_id: record?.org_id,
                organization: record?.organization,
                email: record?.email,
                user_name: record?.user_name,
              });
            }}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
          />
          <EyeIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              router.push(
                `/organizationUsers?organization=${record?.organization}`,
              );
            }}
          />
          <UsersIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setSelectedRecordData(record);
              setShowPartnerProgramAssignModal(true);
              dispatch(setAllResellerRecord(record));
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(getAdminUserOfAllOrganization(searchQuery));
  }, [searchQuery]);

  const locale = {
    emptyText: <EmptyContainer title="No Users" />,
  };

  const fetchSalesForceKey = async (
    record: any,
    obj: any,
    partnersData: any,
  ) => {
    try {
      const res = await dispatch(
        getSalesForceCrendenialsByOrgId({org_id: record?.org_id}),
      );
      if (res?.payload) {
        const credentials = {
          login_url: res.payload.login_url,
          consumer_key: process.env.NEXT_PUBLIC_APP_SALESFORCE_CONSUMER_KEY,
          consumer_secret: process.env.NEXT_PUBLIC_APP_SALESFORCE_SECRET,
          username: res.payload.username,
          password: res.payload.password,
        };

        const accessTokenRes = await dispatch(
          getSalesForceAccessToken(credentials),
        );
        if (accessTokenRes?.payload) {
          const partnerAndProgramObj = {
            data: {
              Partner: {
                Name: partnersData?.partner_name,
                rosdealregai__External_Id__c: String(partnersData?.partner_id),
              },
              Partner_Program: {
                Name: partnersData?.partner_program_name,
                rosdealregai__External_Id__c: String(
                  partnersData?.partner_program_id,
                ),
                rosdealregai__Partner_LR__c: String(partnersData?.partner_id),
              },
            },
            baseURL: accessTokenRes?.payload?.instance_url,
            token: accessTokenRes?.payload?.access_token,
          };
          const partnerRes: any = await dispatch(
            createSalesForcePartner(partnerAndProgramObj),
          );

          // Show notification if an error message exists
          if (partnerRes?.payload?.ErrorMessage) {
            notification.open({
              message: 'Create Partner and Partner Program Error',
              description: partnerRes?.payload?.ErrorMessage,
              type: 'error',
            });
            return;
          }
          const assignPartnerProgramRes = await dispatch(
            insertAssignPartnerProgram(obj),
          );
          if (assignPartnerProgramRes?.payload) {
            setShowPartnerProgramAssignModal(false);
            form.resetFields();
          }
        } else {
          notification.open({
            message: 'Failed to get Salesforce access token',
            type: 'error',
          });
        }
      } else {
        notification.open({
          message: 'Salesforce credentials not found for the specified Org ID',
          type: 'info',
        });
        setShowPartnerProgramAssignModal(false);
        form.resetFields();
      }
    } catch (error) {
      console.error('Error in fetchSalesForceKey:', error);
      notification.open({
        message: 'An error occurred while processing Salesforce data',
        type: 'error',
      });
      setShowPartnerProgramAssignModal(false);
      form.resetFields();
    }
  };

  const onFinish = () => {
    const Data = form?.getFieldsValue();
    const Data2 = JSON.parse(Data?.partner_program_id);

    const finalData = {
      partner_id: Data2?.partner?.id,
      partner_name: Data2?.partner?.name,
      partner_program_id: Data2?.program?.id,
      partner_program_name: Data2?.program?.name,
    };
    if (finalData) {
      const obj = {
        organization: selectedRecordData?.is_salesforce
          ? selectedRecordData?.org_id
          : selectedRecordData?.organization,
        org_id: selectedRecordData?.org_id,
        partner_program_id: finalData?.partner_program_id,
        is_approved: true,
      };

      if (selectedRecordData?.is_salesforce) {
        fetchSalesForceKey(selectedRecordData, obj, finalData);
      } else {
        dispatch(insertAssignPartnerProgram(obj))?.then((d) => {
          if (d?.payload) {
            setShowPartnerProgramAssignModal(false);
            form.resetFields();
          }
        });
      }
    }
  };

  const uniqueOrganization = Array?.from(
    new Set(
      updatedResellerData?.map(
        (organization: any) => organization?.organization,
      ),
    ),
  );

  const uniqueUsername = Array?.from(
    new Set(
      updatedResellerData?.map((record: any) =>
        record?.first_name && record?.last_name
          ? `${record.first_name} ${record.last_name}`
          : record?.first_name
            ? record.first_name
            : record?.user_name,
      ),
    ),
  );

  const createNewOrganizationUser = () => {
    const dataa = newOrganizationFormData.getFieldsValue();
    const stringIn = dataa?.org_id
      ? dataa?.salesforce_email?.split('@')
      : dataa?.email?.split('@');
    const newcheck = stringIn?.[1]?.split('.');
    const checkss = [
      'gmail',
      'yahoo',
      'yahoo',
      'hotmail',
      'aol',
      'live',
      'outlook',
    ];
    const organizationValue = newcheck?.[0];

    if (checkss?.includes(newcheck?.[0])) {
      notification?.open({
        message: 'Please enter vaild organization email',
        type: 'error',
      });
      return;
    }
    let obj = {
      ...dataa,
      organization: organizationValue,
      password: `${dataa?.user_name}@123`,
      is_admin: true,
      master_admin: true,
    };
    if (dataa?.org_id) {
      obj = {
        organization: organizationValue,
        password: `${dataa?.salesforce_user_name}@123`,
        is_admin: true,
        master_admin: true,
        is_salesforce: true,
        org_id: dataa?.org_id,
        org_name: dataa?.org_name,
        email: dataa?.salesforce_email,
        user_name: dataa?.salesforce_user_name,
      };
    }
    dispatch(createNewOrganization(obj))?.then((res) => {
      if (res?.payload) {
        dispatch(getAdminUserOfAllOrganization(searchQuery));
      } else {
        notification?.open({
          message: `This organization is already exist.`,
          type: 'info',
        });
      }
      setShowNewOrganizationModal(false);
      newOrganizationFormData.resetFields();
    });
  };
  const updateData = () => {
    const orgData = editOrgForm.getFieldsValue();
    let finalUpdateData = {
      ...orgData,
      id: editRecordData?.id,
    };
    dispatch(updateUserById(finalUpdateData))?.then((res) => {
      if (res?.payload) {
        dispatch(getAdminUserOfAllOrganization(searchQuery));
        setShowEditDrawer(false);
        editOrgForm?.resetFields();
      }
    });
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Resellers
            </Typography>
          </Col>
        </Row>
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Row justify={'end'} style={{display: 'flex', alignItems: 'center'}}>
            <Col style={{marginRight: '10px', marginTop: '18px'}}>
              <OsButton
                text="Add Organization"
                buttontype="PRIMARY"
                clickHandler={() => {
                  setShowNewOrganizationModal(true);
                }}
              />
            </Col>
            <Col>
              {' '}
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Organization</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        organization: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        organization: e,
                      });
                    }}
                    value={query?.organization}
                  >
                    {uniqueOrganization?.map((organization: any) => (
                      <Option key={organization} value={organization}>
                        {organization}
                      </Option>
                    ))}
                  </CommonSelect>
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">
                    Master Admin Name
                  </Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        user_name: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        user_name: e,
                      });
                    }}
                    value={query?.user_name}
                  >
                    {uniqueUsername?.map((user_name: any) => (
                      <Option key={user_name} value={user_name}>
                        {user_name}
                      </Option>
                    ))}
                  </CommonSelect>
                </Space>

                <div
                  style={{
                    marginTop: '15px',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    color={
                      query?.organization || query?.user_name
                        ? '#0D0D0D'
                        : '#C6CDD5'
                    }
                    onClick={() => {
                      setQuery({
                        organization: null,
                        user_name: null,
                      });
                    }}
                  >
                    Reset
                  </Typography>
                </div>
              </Space>
            </Col>
          </Row>

          <OsTable
            locale={locale}
            columns={UserDataColumns}
            dataSource={updatedResellerData}
            scroll
            loading={loading}
          />
        </div>
      </Space>

      <OsModal
        loading={AssignPartnerProgramLoading}
        title="Assign Partner Program"
        body={
          <AssignPartnerProgram
            form={form}
            onFinish={onFinish}
            selectedRowRecord={selectedRecordData}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          />
        }
        bodyPadding={40}
        width={638}
        open={showPartnerProgramAssignModal}
        onCancel={() => {
          setShowPartnerProgramAssignModal(false);
          form.resetFields();
        }}
        destroyOnClose
        primaryButtonText={activeKey === '1' ? 'Assign' : ''}
        onOk={() => {
          form?.submit();
        }}
      />

      <OsModal
        loading={loading}
        title="Create New Organization"
        body={
          <AddNewOrganization
            form={newOrganizationFormData}
            onFinish={createNewOrganizationUser}
          />
        }
        bodyPadding={40}
        width={638}
        open={showNewOrganizationModal}
        onCancel={() => {
          setShowNewOrganizationModal(false);
          newOrganizationFormData.resetFields();
        }}
        destroyOnClose
        primaryButtonText="Save"
        onOk={() => {
          newOrganizationFormData?.submit();
        }}
      />

      <OsDrawer
        title={
          <Typography name="Body 1/Regular">
            Update User Organization
          </Typography>
        }
        placement="right"
        onClose={() => {
          setShowEditDrawer(false);
          editOrgForm.resetFields();
        }}
        open={showEditDrawer}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={() => editOrgForm.submit()}
            />
          </Row>
        }
      >
        <EditOrgDetail
          onFinish={updateData}
          form={editOrgForm}
          drawer
          editRecordData={editRecordData}
        />
      </OsDrawer>
    </>
  );
};

export default UserManagement;
