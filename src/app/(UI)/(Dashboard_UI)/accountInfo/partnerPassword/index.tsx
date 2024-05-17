import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {PlusIcon} from '@heroicons/react/24/outline';
import {TabsProps} from 'antd';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {queryAllUsers} from '../../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {getMyPasswordColumns, getSharedPartnerColumns} from '../tableCloumn';

const PartnerPassword = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getOrganization = searchParams.get('organization');
  const {data: userData, loading} = useAppSelector((state) => state.user);
  const [activeKey, setActiveKey] = useState<number>(1);
  const [query, setQuery] = useState<{
    organization: string | null;
    partner_name: string | null;
  }>({
    organization: getOrganization,
    partner_name: '',
  });
  const searchQuery = useDebounceHook(query, 500);

  const isShared = () => {};
  const deleteData = () => {};
  const SharedPartnerColumns = getSharedPartnerColumns(
    token,
    deleteData,
    isShared,
  );
  const MyPartnerColumns = getMyPasswordColumns(token, deleteData, isShared);

  useEffect(() => {
    dispatch(queryAllUsers(searchQuery));
  }, [searchQuery]);

  const locale = {
    emptyText: <EmptyContainer title="No Data" />,
  };

  //   const nameAdminOptions = userData?.reduce(
  //     (accumulator: any, userDataItem: any) => {
  //       if (userDataItem?.is_admin === true) {
  //         accumulator.push({
  //           label: userDataItem?.user_name,
  //           value: userDataItem?.user_name,
  //         });
  //       }
  //       return accumulator;
  //     },
  //     [],
  //   );

  //   const nameOptions = userData?.reduce(
  //     (accumulator: any, userDataItem: any) => {
  //       if (userDataItem?.is_admin !== true) {
  //         accumulator.push({
  //           label: userDataItem?.user_name,
  //           value: userDataItem?.user_name,
  //         });
  //       }
  //       return accumulator;
  //     },
  //     [],
  //   );

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            setActiveKey(1);
          }}
        >
          Shared Passwords
        </Typography>
      ),
      key: '1',
      children: (
        <OsTable
          columns={SharedPartnerColumns}
          dataSource={[]}
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
          My Passwords
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={MyPartnerColumns}
          dataSource={[]}
          scroll
          loading={loading}
          locale={locale}
        />
      ),
    },
  ];

  return (
    <Space size={5} direction="vertical" style={{width: '100%'}}>
      <Row justify="space-between" align="middle">
        <Col>
          <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
            Partner Passwords
          </Typography>
        </Col>
        <Col>
          <OsButton
            text="Add new credentials"
            buttontype="PRIMARY"
            icon={<PlusIcon />}
            //   clickHandler={markAsComplete}
          />
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
              <Typography name="Body 4/Medium">Partner Name</Typography>
              <CommonSelect
                style={{width: '200px'}}
                placeholder="Search here"
                showSearch
                onSearch={(e: any) => {
                  setQuery({
                    ...query,
                    partner_name: e,
                  });
                }}
                onChange={(e: any) => {
                  setQuery({
                    ...query,
                    partner_name: e,
                  });
                }}
                value={query?.partner_name}
                // options={activeKey === 1 ? nameOptions : nameAdminOptions}
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
                color={query?.partner_name ? '#0D0D0D' : '#C6CDD5'}
                onClick={() => {
                  setQuery({
                    ...query,
                    partner_name: null,
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
  );
};

export default PartnerPassword;
