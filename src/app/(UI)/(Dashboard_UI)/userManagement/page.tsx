'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {EyeIcon, PencilSquareIcon} from '@heroicons/react/24/outline';
import {Option} from 'antd/es/mentions';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {queryAllUsers} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const router = useRouter();
  const {data: userData, loading} = useAppSelector((state) => state.user);
  const [query, setQuery] = useState<{
    organization: string | null;
  }>({
    organization: null,
  });
  const searchQuery = useDebounceHook(query, 500);
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
          Contact
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
              router.push(`/accountInfo?id=${record?.id}`);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(queryAllUsers(searchQuery));
  }, [searchQuery]);

  const uniqueUserData = Array.from(
    new Set(
      Array.isArray(userData) ? userData.map((user) => user?.organization) : [],
    ),
  );

  const locale = {
    emptyText: <EmptyContainer title="No Users" />,
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
          <Row justify="end">
            <Space direction="vertical" size={2}>
              <Typography name="Body 4/Medium">Organization</Typography>
              <CommonSelect
                allowClear
                style={{width: '250px'}}
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
                {uniqueUserData?.map((organization: any) => (
                  <Option key={organization} value={organization}>
                    {organization}
                  </Option>
                ))}
              </CommonSelect>
            </Space>
          </Row>

          <OsTable
            locale={locale}
            columns={UserDataColumns}
            dataSource={userData}
            // rowSelection={rowSelection}
            scroll
            loading={loading}
          />
        </div>
      </Space>
    </>
  );
};

export default UserManagement;
