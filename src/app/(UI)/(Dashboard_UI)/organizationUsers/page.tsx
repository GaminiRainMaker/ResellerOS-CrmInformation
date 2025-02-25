/* eslint-disable no-nested-ternary */

'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsBreadCrumb from '@/app/components/common/os-breadcrumb';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {handleDate} from '@/app/utils/base';
import {
  EyeIcon,
  MinusIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import {Form, message} from 'antd';
import {Option} from 'antd/es/mentions';
import dayjs from 'dayjs';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  assignLicenseToIndividualUser,
  revokeLicense,
} from '../../../../../redux/actions/license';
import {allocateLicensesToOrg} from '../../../../../redux/actions/orgLicenseAllocation';
import {queryAllUsers} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import GrantLicense from './GrantLicense';

const OrganizationUsers = () => {
  const dispatch = useAppDispatch();
  const [licenseForm] = Form.useForm();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getOrganization = searchParams.get('organization');
  const router = useRouter();
  const {data: userData, loading} = useAppSelector((state) => state.user);
  const {loading: LicenseLoading} = useAppSelector((state) => state.license);
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
          Org Admin
        </Typography>
      ),
      dataIndex: 'org_admin',
      key: 'org_admin',
      width: 173,
      render: (text: string, record: any) => (
        <Checkbox checked={record?.is_admin} disabled />
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

  const assignLicenseForm = async () => {
    try {
      const licenseFormValue = licenseForm.getFieldsValue();

      const {
        expirationTime,
        features,
        expirationTimeUnit,
        licenseCategory,
        quoteAISeats,
        dealRegAISeats,
        licenseType,
      } = licenseFormValue;

      // Validation logic
      if (!licenseCategory) {
        message.error('License Category is required!');
        return;
      }
      if (!licenseType) {
        message.error('License Type is required!');
        return;
      }
      if (
        licenseType === 'ExpirationTime' &&
        !expirationTime &&
        !expirationTimeUnit
      ) {
        message.error('Expiration Time is required for Paid licenses!');
        return;
      }
      if (!features || features.length === 0) {
        message.error('At least one feature must be selected!');
        return;
      }
      // if (!quoteAISeats || !dealRegAISeats) {
      //   message.error('At least one seat must be entered!');
      //   return;
      // }
      // Calculate expiration date
      let expirationDate: Date | null = null;
      if (licenseType === 'Lifetime') {
        // If the license type is "Lifetime", set expirationDate to 100 years from today
        expirationDate = dayjs().add(100, 'years').toDate();
      } else if (
        expirationTime &&
        ['days', 'month', 'year'].includes(expirationTimeUnit)
      ) {
        // If expiration time and unit are provided, calculate the expiration date
        expirationDate = dayjs()
          .add(expirationTime, expirationTimeUnit as dayjs.ManipulateType)
          .toDate();
      } else {
        // If invalid expiration time or unit, show error
        message.error('Invalid expiration time or unit selected!');
        return;
      }

      // Transform licenseFeature array into separate objects
      const licenseObjects = features.map((feature: string) => ({
        license_type: 'Paid',
        expiration_date: expirationDate,
        feature_name: feature,
        organization: recordData.organization,
        user_id: recordData.id,
        status: 'active',
        license_category: licenseCategory,
        total_licenses:
          feature === 'QuoteAI'
            ? quoteAISeats
            : feature === 'DealRegAI'
              ? dealRegAISeats
              : 0,
      }));

      // Dispatch API request for each license object
      if (licenseObjects.length > 0) {
        try {
          for (const license of licenseObjects) {
            const apiFunction =
              licenseCategory === 'Organization'
                ? allocateLicensesToOrg
                : assignLicenseToIndividualUser; // Choose API function
            const response: any = await dispatch(apiFunction(license)); // Call API per record

            if (response?.error) {
              console.error('API Error:', response.error);
              message.error(
                response.error.message ||
                  'Failed to assign some licenses. Please try again.',
              );
              continue; // Skip to the next record instead of stopping execution
            }
          }

          message.success('All licenses assigned successfully!');
          dispatch(queryAllUsers(searchQuery));
          setShowLicenseModal(false);
          licenseForm?.resetFields();
        } catch (error) {
          console.error('Unexpected Error:', error);
          message.error('Something went wrong. Please try again.');
          licenseForm?.resetFields();
        }
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      licenseForm?.resetFields();
      message.error('Something went wrong. Please try again later.');
    }
  };

  const revokeLicenseForm = async (record: any) => {
    try {
      const obj = {
        license_id: record?.id,
        user_id: record?.user_id,
      };

      if (!obj.license_id || !obj.user_id) {
        message.error('Invalid data. License ID and User ID are required.');
        return;
      }

      const response: any = await dispatch(revokeLicense(obj));

      if (response?.error) {
        console.error('API Error:', response.error);
        message.error(
          response.error.message ||
            'Failed to revoke license. Please try again.',
        );
        return;
      }

      message.success('License revoked successfully!');
      dispatch(queryAllUsers(searchQuery));
    } catch (error) {
      console.error('Unexpected Error:', error);
      message.error('Something went wrong. Please try again later.');
    }
  };

  const LicenseColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Feature Name
        </Typography>
      ),
      dataIndex: 'feature_name',
      key: 'feature_name',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: <Typography name="Body 4/Medium">License Type</Typography>,
      dataIndex: 'license_type',
      key: 'license_type',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: <Typography name="Body 4/Medium">License Category</Typography>,
      dataIndex: 'license_category',
      key: 'license_category',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: <Typography name="Body 4/Medium">Expiration Date</Typography>,
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {text ? handleDate(text, true) : '--'}
        </Typography>
      ),
    },
    {
      title: <Typography name="Body 4/Medium">Revoke License</Typography>,
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      render: (text: any, record: any) => (
        <OsButton
          clickHandler={() => {
            revokeLicenseForm(record);
          }}
          text="Revoke"
          buttontype="PRIMARY"
        />
      ),
    },
  ];

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
            expandable={{
              // eslint-disable-next-line react/no-unstable-nested-components
              expandedRowRender: (record: any) => (
                <OsTable
                  columns={LicenseColumns}
                  dataSource={record?.Licenses}
                  scroll
                  paginationProps={false}
                />
              ),
              rowExpandable: (record: any) => record.name !== 'Not Expandable',
              expandIcon: ({expanded, onExpand, record}: any) =>
                expanded ? (
                  <MinusIcon
                    width={20}
                    onClick={(e: any) => onExpand(record, e)}
                  />
                ) : (
                  <PlusIcon
                    width={20}
                    onClick={(e: any) => onExpand(record, e)}
                  />
                ),
            }}
          />
        </div>
      </Space>

      <OsModal
        destroyOnClose
        loading={LicenseLoading}
        title="Licenses Management"
        bodyPadding={22}
        body={<GrantLicense form={licenseForm} onFinish={assignLicenseForm} />}
        width={600}
        open={showLicenseModal}
        onOk={licenseForm?.submit}
        onCancel={() => {
          setShowLicenseModal(false);
          licenseForm?.resetFields();
        }}
        primaryButtonText={'Save'}
      />
    </>
  );
};

export default OrganizationUsers;
