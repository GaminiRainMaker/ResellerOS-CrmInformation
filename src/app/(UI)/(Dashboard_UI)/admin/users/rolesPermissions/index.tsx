'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import DailogModal from '@/app/components/common/os-modal/DialogModal';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import {ShieldCheckIcon} from '@heroicons/react/20/solid';
import {InformationCircleIcon} from '@heroicons/react/24/outline';
import {Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {
  getUserByOrganization,
  updateUserById,
} from '../../../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hook';

const RolesAndPermission = () => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const {data, loading, userInformation} = useAppSelector(
    (state) => state.user,
  );
  const {cacheAvailableSeats, cacheTotalDealRegSeats, cacheTotalQuoteSeats} =
    useAppSelector((state) => state.cacheFLow);
  const [userRules, setUserRules] = useState<any>(data);
  const [showDailogModal, setShowDailogModal] = useState<boolean>(false);
  const [recordId, setRecordId] = useState<number>();

  const providePermissions = () => {
    setUserRules((prev: any) =>
      prev.map((prevItem: any) => {
        if (prevItem.id === recordId) {
          return {
            ...prevItem,
            is_admin: true,
            is_quote: true,
            is_dealReg: true,
            is_order: true,
          };
        }
        return prevItem;
      }),
    );
    setShowDailogModal(false);
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
          defaultChecked={text}
          onClick={(d: any) => {
            if (d?.target?.checked) {
              setShowDailogModal(true);
              setRecordId(record?.id);
            }
          }}
          onChange={(e) => {
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_admin: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
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
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_quote: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
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
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_dealReg: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
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
            setUserRules((prev: any) =>
              prev.map((prevItem: any) => {
                if (prevItem.id === record?.id) {
                  return {
                    ...prevItem,
                    is_order: e?.target?.checked,
                  };
                }
                return prevItem;
              }),
            );
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

  const onFinish = () => {
    for (let i = 0; i < userRules.length; i++) {
      const items = userRules[i];
      dispatch(updateUserById(items)).then((d: any) => {
        if (d?.payload) {
          dispatch(getUserByOrganization(userInformation?.organization));
          window.location.reload();
        }
      });
    }
  };

  const toolTipData = (
    <Space direction="vertical" size={6}>
      <Typography color={token?.colorBgContainer} name="Body 3/Medium">
        Limit Left
      </Typography>
      <span>
        <Typography
          color={token?.colorBgContainer}
          name="Body 3/Medium"
          as="div"
        >
          Quote AI:{' '}
          <Typography color={token?.colorBgContainer} name="Body 3/Bold">
            {' '}
            {cacheAvailableSeats?.QuoteAISeats}/{cacheTotalQuoteSeats?.TotalQuoteSeats}
          </Typography>
        </Typography>

        <Typography color={token?.colorBgContainer} name="Body 3/Medium">
          DealReg AI:{' '}
          <Typography color={token?.colorBgContainer} name="Body 3/Bold">
            {' '}
            {cacheAvailableSeats?.DealRegSeats}/{cacheTotalDealRegSeats?.TotalDealRegSeats}
          </Typography>
        </Typography>
      </span>
    </Space>
  );

  return (
    <>
      <Space direction="vertical" size={24} style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Roles and Permissions
            </Typography>
          </Col>

          <Col>
            <Space size={8}>
              <Tooltip
                placement="leftBottom"
                title={toolTipData}
                overlayInnerStyle={{
                  background: '#19304f',
                }}
              >
                <InformationCircleIcon
                  width={24}
                  cursor={'pointer'}
                  color={'#A0AAB8'}
                />
              </Tooltip>
              <OsButton text="CANCEL" buttontype="SECONDARY" />
              <OsButton
                text="SAVE"
                buttontype="PRIMARY"
                clickHandler={onFinish}
              />
            </Space>
          </Col>
        </Row>

        <OsTable
          columns={RolesAndPermissionsColumns}
          dataSource={userRules}
          scroll
          loading={loading}
        />
      </Space>

      <DailogModal
        setShowDailogModal={setShowDailogModal}
        showDailogModal={showDailogModal}
        title="Permissions"
        subTitle="Do you wish to grant full access to this administrator?"
        primaryButtonText="Yes"
        secondaryButtonText="No"
        icon={
          <ShieldCheckIcon width={35} height={35} color={token?.colorSuccess} />
        }
        onOk={providePermissions}
      />
    </>
  );
};

export default RolesAndPermission;
