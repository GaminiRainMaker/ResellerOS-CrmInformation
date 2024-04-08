'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {EyeIcon, UsersIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getAdminUserOfAllOrganization} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AssignPartnerProgram from './AssignPartnerProgram';
import {insertAssignPartnerProgram} from '../../../../../redux/actions/assignPartnerProgram';

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const [form] = Form.useForm();
  const {data: userData, loading} = useAppSelector((state) => state.user);
  const {loading: AssignPartnerProgramLoading} = useAppSelector(
    (state) => state.assignPartnerProgram,
  );
  const [query, setQuery] = useState<{
    organization: string | null;
  }>({
    organization: null,
  });
  const [showPartnerProgramAssignModal, setShowPartnerProgramAssignModal] =
    useState<boolean>(false);
  const [selectedRecordData, setSelectedRecordData] = useState<any>();

  const UserDataColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          User Name
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
          Organization
        </Typography>
      ),
      dataIndex: 'organization',
      key: 'organization',
      width: 173,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAdminUserOfAllOrganization(query));
  }, []);

  const locale = {
    emptyText: <EmptyContainer title="No Users" />,
  };

  const onFinish = () => {
    const Data = form?.getFieldsValue();

    const obj = {
      organization: selectedRecordData?.organization,
      partner_program_id: Data?.partner_program_id,
      is_approved: true,
    };
    dispatch(insertAssignPartnerProgram(obj)).then((d) => {
      if (d?.payload) {
        setShowPartnerProgramAssignModal(false);
        form.resetFields();
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
          <OsTable
            locale={locale}
            columns={UserDataColumns}
            dataSource={userData}
            scroll
            loading={loading}
          />
        </div>
      </Space>

      <OsModal
        loading={AssignPartnerProgramLoading}
        title='Assign Partner Program'
        body={<AssignPartnerProgram form={form} onFinish={onFinish} />}
        bodyPadding={40}
        width={638}
        open={showPartnerProgramAssignModal}
        onCancel={() => {
          setShowPartnerProgramAssignModal(false);
          form.resetFields();
        }}
        destroyOnClose
        primaryButtonText="Assign"
        onOk={() => {
          form?.submit();
        }}
      />
    </>
  );
};

export default UserManagement;
