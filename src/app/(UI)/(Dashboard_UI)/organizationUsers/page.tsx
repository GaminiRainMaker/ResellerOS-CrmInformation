/* eslint-disable no-nested-ternary */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import EmptyContainer from '@/app/components/common/os-empty-container';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {EyeIcon, PencilSquareIcon} from '@heroicons/react/24/outline';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Option} from 'antd/es/mentions';
import {queryAllUsers} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsModal from '@/app/components/common/os-modal';
import GrantLicense from './GrantLicense';
import {Form, message} from 'antd';
import dayjs from 'dayjs';
import {assignLicense} from '../../../../../redux/actions/license';

const OrganizationUsers = () => {
  const dispatch = useAppDispatch();
  const [licenseForm] = Form.useForm();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getOrganization = searchParams.get('organization');
  const router = useRouter();
  const {data: userData, loading} = useAppSelector((state) => state.user);
  const [showLicenseModal, setShowLicenseModal] = useState<boolean>(false);
  const [recordData, setRecordData] = useState<any>();

  const [query, setQuery] = useState<{
    organization: string | null;
    name: string | null;
  }>({
    organization: getOrganization,
    name: null,
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
      render: (text: string, record: any) => (
        <Typography
          color={token?.colorInfo}
          hoverOnText
          name="Body 4/Regular"
          onClick={() => {
            router.push(
              `/accountInfo?id=${record?.id}&organization=${getOrganization}&role=superAdmin`,
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
                `/accountInfo?id=${record?.id}&organization=${getOrganization}&role=superAdmin`,
              );
            }}
          />

          <PencilSquareIcon
            height={24}
            width={24}
            onClick={() => {
              setShowLicenseModal(true);
              setRecordData(record);
            }}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(queryAllUsers(searchQuery));
  }, [getOrganization, searchQuery]);

  const locale = {
    emptyText: <EmptyContainer title="No Users" />,
  };
  const menuItems = [
    {
      key: '1',
      title: (
        <Typography
          name="Body 2/Medium"
          color={token?.colorInfoBorder}
          cursor="pointer"
          onClick={() => {
            router?.push('/userManagement');
          }}
        >
          All Resellers
        </Typography>
      ),
    },
    {
      key: '2',
      title: (
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          {getOrganization}
        </Typography>
      ),
    },
  ];

  const uniqueUsername = Array?.from(
    new Set(
      userData?.map((record: any) =>
        record?.first_name && record?.last_name
          ? `${record.first_name} ${record.last_name}`
          : record?.first_name
            ? record.first_name
            : record?.user_name,
      ),
    ),
  );

  const licenseFormSubmit = () => {
    const licenseFormValue = licenseForm.getFieldsValue();
    const {licenseType, expirationTime, features} = licenseFormValue;

    // Validation logic
    if (!licenseType) {
      message.error('License Type is required!');
      return;
    }
    if (licenseType === 'Paid' && !expirationTime) {
      message.error('Expiration Time is required for Paid licenses!');
      return;
    }
    if (!features || features.length === 0) {
      message.error('At least one feature must be selected!');
      return;
    }

    // Calculate expiration date
    let expirationDate: Date | null = null;

    if (licenseType === 'Paid') {
      switch (expirationTime) {
        case '7 days':
          expirationDate = dayjs().add(7, 'day').toDate();
          break;
        case '15 days':
          expirationDate = dayjs().add(15, 'day').toDate();
          break;
        case '1 month':
          expirationDate = dayjs().add(1, 'month').toDate();
          break;
        case '6 months':
          expirationDate = dayjs().add(6, 'month').toDate();
          break;
        case '1 year':
          expirationDate = dayjs().add(1, 'year').toDate();
          break;
        default:
          message.error('Invalid expiration time selected!');
          return;
      }
    }

    // Transform licenseFeature array into separate objects
    const licenseObjects = features.map((feature: string) => ({
      license_type: licenseType,
      expiration_date: expirationDate,
      feature_name: feature,
      org_id: recordData.organization,
      user_id: recordData.id,
      status: 'active',
    }));
    if (licenseObjects) {
      dispatch(assignLicense(licenseObjects)).then((d: any) => {
        if (d?.payload) {
          setShowLicenseModal(false);
        }
      });
    }
  };

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <OsBreadCrumb items={menuItems} />
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
          <Row justify="space-between">
            <Col />
            <Col>
              {' '}
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">User Name</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e) => {
                      setQuery({
                        ...query,
                        name: e,
                      });
                    }}
                    onChange={(e) => {
                      setQuery({
                        ...query,
                        name: e,
                      });
                    }}
                    value={query?.name}
                  >
                    {uniqueUsername?.map((name: any) => (
                      <Option key={name} value={name}>
                        {name}
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
                    color={query?.name ? '#0D0D0D' : '#C6CDD5'}
                    onClick={() => {
                      setQuery({
                        organization: getOrganization,
                        name: null,
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
            dataSource={userData}
            scroll
            loading={loading}
          />
        </div>
      </Space>
      <OsModal
        loading={false}
        title="Grant Licenses"
        bodyPadding={22}
        body={<GrantLicense form={licenseForm} onFinish={licenseFormSubmit} />}
        width={583}
        open={showLicenseModal}
        onOk={licenseForm?.submit}
        onCancel={() => {
          setShowLicenseModal(false);
          licenseForm?.resetFields();
        }}
        primaryButtonText="Save"
      />
    </>
  );
};

export default OrganizationUsers;
