'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import EmptyContainer from '@/app/components/common/os-empty-container';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {TabsProps} from 'antd';
import {useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useState} from 'react';
import {queryAllUsers} from '../../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {getMyTeamAdminColumns, getMyTeamColumns} from '../tableCloumn';

const MyTeam = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const MyTeamColumns = getMyTeamColumns(token);
  const MyTeamAdminColumns = getMyTeamAdminColumns(token);
  const searchParams = useSearchParams();
  const getOrganization = searchParams.get('organization');
  const {data: userData, loading} = useAppSelector((state) => state.user);
  const [activeKey, setActiveKey] = useState<number>(1);

  const [query, setQuery] = useState<{
    organization: string | null;
    name: string | null;
  }>({
    organization: getOrganization,
    name: '',
  });
  const searchQuery = useDebounceHook(query, 500);

  useEffect(() => {
    dispatch(queryAllUsers(searchQuery));
  }, [searchQuery]);

  const locale = {
    emptyText: <EmptyContainer title="No Data" />,
  };

  const nameAdminOptions = userData?.reduce(
    (accumulator: any, userDataItem: any) => {
      if (userDataItem?.is_admin === true) {
        accumulator.push({
          label: userDataItem?.user_name,
          value: userDataItem?.user_name,
        });
      }
      return accumulator;
    },
    [],
  );

  const nameOptions = userData?.reduce(
    (accumulator: any, userDataItem: any) => {
      if (userDataItem?.is_admin !== true) {
        accumulator.push({
          label: userDataItem?.user_name,
          value: userDataItem?.user_name,
        });
      }
      return accumulator;
    },
    [],
  );

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            setActiveKey(1);
          }}
        >
          All Resellers
        </Typography>
      ),
      key: '1',
      children: (
        <OsTable
          columns={MyTeamColumns}
          dataSource={userData?.filter(
            (userDataItem: any) => userDataItem?.is_admin !== true,
          )}
          scroll
          loading={loading}
          locale={locale}
        />
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            setActiveKey(2);
          }}
        >
          Admin
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={MyTeamAdminColumns}
          dataSource={userData?.filter(
            (userDataItem: any) => userDataItem?.is_admin === true,
          )}
          scroll
          loading={loading}
          locale={locale}
        />
      ),
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Space size={5} direction="vertical" style={{width: '100%'}}>
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              My Team
            </Typography>
          </Col>
        </Row>

        <OsTabs
          style={{
            background: 'white',
            padding: '24px',
            paddingTop: '56px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
          }}
          tabBarExtraContent={
            <Space size={12} align="center">
              <Space direction="vertical" size={0}>
                <Typography name="Body 4/Medium">Username</Typography>
                <CommonSelect
                  style={{width: '200px'}}
                  placeholder="Search here"
                  showSearch
                  onSearch={(e: any) => {
                    setQuery({
                      ...query,
                      name: e,
                    });
                  }}
                  onChange={(e: any) => {
                    setQuery({
                      ...query,
                      name: e,
                    });
                  }}
                  value={query?.name}
                  options={activeKey === 1 ? nameOptions : nameAdminOptions}
                />
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
                      ...query,
                      name: null,
                    });
                  }}
                >
                  Reset
                </Typography>
              </div>
            </Space>
          }
          items={tabItems}
        />
      </Space>
    </Suspense>
  );
};

export default MyTeam;
