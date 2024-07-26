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
import {setAllResellerRecord} from '../../../../../redux/slices/user';
import CommonSelect from '@/app/components/common/os-select';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import {Option} from 'antd/es/mentions';

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const [form] = Form.useForm();
  const {data: userData, loading} = useAppSelector((state) => state.user);
  const {loading: AssignPartnerProgramLoading} = useAppSelector(
    (state) => state.assignPartnerProgram,
  );
  const [showPartnerProgramAssignModal, setShowPartnerProgramAssignModal] =
    useState<boolean>(false);
  const [selectedRecordData, setSelectedRecordData] = useState<any>();
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
          Actions
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
          <Row justify={'space-between'}>
            <Col />
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
        body={<AssignPartnerProgram form={form} onFinish={onFinish} organizationCurrent ={ selectedRecordData?.organization}/>}
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
