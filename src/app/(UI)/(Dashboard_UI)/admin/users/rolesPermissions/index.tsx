'use client';

import { Checkbox } from '@/app/components/common/antd/Checkbox';
import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import { Tag } from '@/app/components/common/antd/Tag';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import DailogModal from '@/app/components/common/os-modal/DialogModal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import { ShieldCheckIcon } from '@heroicons/react/20/solid';
import {
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Avatar, Tooltip } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import {
  getUserByOrganization,
  updateUserById,
} from '../../../../../../../redux/actions/user';
import { useAppDispatch, useAppSelector } from '../../../../../../../redux/hook';
import { checkAvailableLicenses } from '../../../../../../../redux/actions/orgLicenseAllocation';
import {
  assignLicenseToOrgUser,
  revokeLicense,
} from '../../../../../../../redux/actions/license';

interface UserRule {
  id: number;
  user_name: string;
  licenseCategory: boolean;
  is_admin: boolean;
  is_quote: boolean;
  is_dealReg: boolean;
  is_order: boolean;
  isQuoteDisabled: boolean;
  isDealRegDisabled: boolean;
  licenseCategoryType: string;
  Licenses?: {
    id: number;
    feature_name: string;
    license_category: string;
    license_type: string;
  }[];
}

const RolesAndPermission = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const { data, loading, userInformation } = useAppSelector(
    (state) => state.user,
  );
  const { loading: LicenseLoading } = useAppSelector((state) => state.license);
  const [userRules, setUserRules] = useState<UserRule[]>([]);
  const [licenseRecord, setLicenseRecord] = useState<any>();
  const [showDailogModal, setShowDailogModal] = useState<boolean>(false);
  const [recordId, setRecordId] = useState<number>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [isQuoteRecord, setIsQuoteRecord] = useState<any>();
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [showRevokeModal, setShowRevokeModal] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (userInformation?.organization) {
      dispatch(getUserByOrganization(userInformation.organization));
      dispatch(
        checkAvailableLicenses({ org_id: userInformation.organization }),
      ).then((license) => {
        if (license?.payload) {
          setLicenseRecord(license.payload.licenses);
        }
      });
    }
  }, [userInformation, dispatch]);

  useEffect(() => {
    if (data) {
      setUserRules(
        data.map((item: any) => ({
          ...item,
          isQuoteDisabled: false,
          isDealRegDisabled: false,
          licenseCategory:
            item?.Licenses?.[0]?.license_category !==
            userInformation?.LicenseCategory,
          licenseCategoryType:
            item?.Licenses?.[0]?.license_category
        })),
      );
    }
  }, [data, userInformation]);

  const providePermissions = async () => {
    try {
      setUserRules((prev) =>
        prev.map((prevItem) => {
          if (prevItem.id === recordId) {
            return { ...prevItem, is_admin: true };
          }
          return prevItem;
        }),
      );
      setShowDailogModal(false);
    } catch (error) {
      console.error('Failed to update permissions:', error);
    }
  };

  const updateLicenseState = async () => {
    try {
      await dispatch(getUserByOrganization(userInformation?.organization));
      const license = await dispatch(
        checkAvailableLicenses({ org_id: userInformation.organization }),
      );
      if (license?.payload) {
        setLicenseRecord(license.payload.licenses);
      }
    } catch (error) {
      console.error('Error updating license state:', error);
    }
  };

  const provideQuoteAILicense = async () => {
    if (!isQuoteRecord?.record) return;

    const obj = {
      org_id: isQuoteRecord?.record?.organization,
      feature_name: isQuoteRecord?.feature_type,
      user_id: isQuoteRecord.record.id,
    };

    try {
      const { payload } = await dispatch(assignLicenseToOrgUser(obj));
      if (payload) {
        await updateLicenseState();
      }
    } catch (error) {
      console.error('Error providing license:', error);
    } finally {
      setShowAssignModal(false);
      setIsQuoteRecord([])
    }
  };

  const revokeQuoteAILicense = async () => {
    if (!isQuoteRecord?.record) return;

    const licenseId = isQuoteRecord.record.Licenses?.find(
      (data: any) => data.feature_name === isQuoteRecord?.feature_type,
    )?.id;

    if (!licenseId) {
      console.warn('No QuoteAI or DealRegAI license found to revoke.');
      return;
    }

    const obj = { license_id: licenseId, user_id: isQuoteRecord.record.id };

    try {
      const { payload } = await dispatch(revokeLicense(obj));
      if (payload) {
        await updateLicenseState();
      }
    } catch (error) {
      console.error('Error revoking license:', error);
    } finally {
      setShowRevokeModal(false);
      setIsQuoteRecord([])
    }
  };

  const onFinish = async () => {
    try {
      for (const item of userRules) {
        await dispatch(updateUserById(item));
      }
      dispatch(getUserByOrganization(userInformation?.organization));
    } catch (error) {
      console.error('Failed to save permissions:', error);
    }
  };

  const toolTipData = (
    <Space direction="vertical" size={6}>
      <Typography color={token.colorBgContainer} name="Body 3/Medium">
        Limit Left
      </Typography>
      <span>
        {licenseRecord?.map(
          ({ feature_name, total_licenses, used_licenses }: any) => (
            <Typography
              key={feature_name}
              color={token.colorBgContainer}
              name="Body 3/Medium"
              as="div"
            >
              {feature_name}:{' '}
              <Typography color={token.colorBgContainer} name="Body 3/Bold">
                {used_licenses}/{total_licenses}
              </Typography>
            </Typography>
          ),
        )}
      </span>
    </Space>
  );

  const handleClose = () => {
    setVisible(false);
  };

  const RolesAndPermissionColumn = [
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
          License Category
        </Typography>
      ),
      dataIndex: 'license_category',
      key: 'license_category',
      width: 173,
      render: (text: string, record: UserRule) => (
        <Typography name="Body 4/Regular">
          {record?.Licenses?.[0]?.license_category ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          License Type
        </Typography>
      ),
      dataIndex: 'license_type',
      key: 'license_type',
      width: 173,
      render: (text: string, record: UserRule) => (
        <Typography name="Body 4/Regular">
          {record?.Licenses?.[0]?.license_type ?? '--'}
        </Typography>
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
      render: (text: boolean, record: UserRule) => {
        return (
          <Checkbox
            disabled={record?.licenseCategory}
            checked={text}
            onChange={(e) => {
              if (e.target.checked) {
                setShowDailogModal(true);
                setRecordId(record.id);
              }
              setUserRules((prev) =>
                prev.map((prevItem) => {
                  if (prevItem.id === record.id) {
                    return { ...prevItem, is_admin: e.target.checked };
                  }
                  return prevItem;
                }),
              );
            }}
          />
        );
      },
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
      render: (text: boolean, record: UserRule) => {
        return (
          <Checkbox
            disabled={record?.licenseCategory}
            checked={text}
            onChange={(e) => {
              setIsQuoteRecord({ record, value: e.target.checked, feature_type: "QuoteAI" });
              if (e.target.checked) {
                setShowAssignModal(true);
              } else {
                setShowRevokeModal(true);
              }
            }}
          />
        );
      },
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
      render: (text: boolean, record: UserRule) => {
        return (
          <Checkbox
            disabled={record?.licenseCategory}
            checked={text}
            onChange={(e) => {
              setIsQuoteRecord({ record, value: e.target.checked, feature_type: "DealRegAI" });
              if (e.target.checked) {
                setShowAssignModal(true);
              } else {
                setShowRevokeModal(true);
              }
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <GlobalLoader loading={loading || LicenseLoading}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography
                name="Heading 3/Medium"
                color={token.colorPrimaryText}
              >
                Roles and Permissions
              </Typography>
            </Col>
            {isSubscribed && (
              <Col>
                <Space size={8}>
                  <Tooltip
                    placement="leftBottom"
                    title={toolTipData}
                    overlayInnerStyle={{ background: '#19304f' }}
                  >
                    <InformationCircleIcon
                      width={24}
                      cursor="pointer"
                      color="#A0AAB8"
                    />
                  </Tooltip>
                  <OsButton
                    text="SAVE"
                    buttontype="PRIMARY"
                    clickHandler={onFinish}
                  />
                </Space>
              </Col>
            )}
          </Row>

          {isSubscribed ? (
            <OsTable
              columns={RolesAndPermissionColumn}
              dataSource={userRules}
              scroll
              loading={loading}
            />
          ) : (
            <Tag
              style={{
                display: 'flex',
                padding: '20px',
                borderRadius: '4px',
                border: `1px solid ${token.colorError}`,
              }}
              color="error"
            >
              <Row
                justify="space-between"
                style={{ width: '100%' }}
                align="middle"
              >
                <Col span={12}>
                  <Avatar
                    size={24}
                    style={{
                      marginTop: '-12px',
                      marginRight: '5px',
                      background: 'none',
                    }}
                    icon={
                      <InformationCircleIcon
                        width={24}
                        color={token.colorError}
                      />
                    }
                  />
                  <Space direction="vertical" size={0}>
                    <Typography color={token.colorError} name="Heading 3/Bold">
                      Unsubscribed User
                    </Typography>
                    <Typography
                      color={token.colorError}
                      name="Body 3/Medium"
                      as="span"
                    >
                      Unlock premium features and exclusive content by
                      subscribing to our web application today!
                    </Typography>
                  </Space>
                </Col>
                <Col
                  span={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    color={token.colorLink}
                    name="Button 1"
                    style={{ fontWeight: 700 }}
                    hoverOnText
                  >
                    Subscribe Now
                  </Typography>
                </Col>
              </Row>
            </Tag>
          )}
        </Space>
      </GlobalLoader>

      <DailogModal
        loading={LicenseLoading}
        setShowDailogModal={setShowAssignModal}
        showDailogModal={showAssignModal}
        title="Grant License"
        subTitle="Are you sure want to provide the license?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        icon={
          <ShieldCheckIcon width={35} height={35} color={token.colorSuccess} />
        }
        onOk={provideQuoteAILicense}
      />
      <DailogModal
        loading={LicenseLoading}
        setShowDailogModal={setShowRevokeModal}
        showDailogModal={showRevokeModal}
        title="Revoke License"
        subTitle="Are you sure want to revoke the license?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        icon={
          <ShieldCheckIcon width={35} height={35} color={token.colorSuccess} />
        }
        onOk={revokeQuoteAILicense}
      />
      <DailogModal
        setShowDailogModal={setShowDailogModal}
        showDailogModal={showDailogModal}
        title="Permissions"
        subTitle="Do you wish to grant full access to this administrator?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        icon={
          <ShieldCheckIcon width={35} height={35} color={token.colorSuccess} />
        }
        onOk={providePermissions}
      />
    </>
  );
};

export default RolesAndPermission;
