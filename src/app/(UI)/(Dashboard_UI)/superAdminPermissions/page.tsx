'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {useEffect, useState} from 'react';
import {
  getUserByOrganization,
  updateUserById,
} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const SuperAdminRolesAndPermission = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const {data, loading} = useAppSelector((state) => state.user);
  const {userInformation} = useAppSelector((state) => state.user);
  const [userRules, setUserRules] = useState<any>(data);

  const onUpdate = (record: any, type: string, value: boolean) => {
    const obj = {
      id: record?.id,
      [type]: value,
    };
    dispatch(updateUserById(obj)).then((d) => {
      if (d?.payload) {
        dispatch(getUserByOrganization(userInformation?.organization));
      }
    });
  };

  const RolesAndPermissionsColumns = [
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
          Admin Access
        </Typography>
      ),
      dataIndex: 'is_admin',
      key: 'is_admin',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          checked={text}
          onChange={(e) => {
            onUpdate(record, 'is_admin', e?.target?.checked);
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Quote AI
        </Typography>
      ),
      dataIndex: 'is_quote',
      key: 'is_quote',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          checked={text}
          onChange={(e) => {
            onUpdate(record, 'is_quote', e?.target?.checked);
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Deal Reg
        </Typography>
      ),
      dataIndex: 'is_dealReg',
      key: 'is_dealReg',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          checked={text}
          onChange={(e) => {
            onUpdate(record, 'is_dealReg', e?.target?.checked);
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Orders AI
        </Typography>
      ),
      dataIndex: 'is_order',
      key: 'is_order',
      width: 173,
      render: (text: any, record: any) => (
        <Checkbox
          checked={text}
          onChange={(e) => {
            onUpdate(record, 'is_order', e?.target?.checked);
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    setUserRules(data);
  }, [data]);

  useEffect(() => {
    dispatch(getUserByOrganization(userInformation?.organization));
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys: any, record: any) => {
      console.log('selectedRowKeys', selectedRowKeys, record);
    },
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Super Admin Roles and Permissions
            </Typography>
          </Col>
        </Row>

        <OsTable
          columns={RolesAndPermissionsColumns}
          dataSource={userRules}
          scroll
          loading={loading}
          rowSelection={rowSelection}
        />
      </Space>
    </>
  );
};

export default SuperAdminRolesAndPermission;
