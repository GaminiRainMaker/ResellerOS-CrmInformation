import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form, TabsProps, message} from 'antd';
import {useEffect, useState} from 'react';
import {
  deletePartnerPassword,
  insertPartnerPassword,
  queryPartnerPassword,
} from '../../../../../../redux/actions/partnerPassword';
import {
  insertSharedPartnerPassword,
  querySharedPartnerPassword,
} from '../../../../../../redux/actions/sharedPartnerPassword';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import AddPartnerPassword from './AddPartnerPassword';
import ShareCredential from './ShareCredential';
import {getMyPartnerColumns, getSharedPasswordColumns} from '../tableCloumn';

const PartnerPassword = () => {
  const [token] = useThemeToken();
  const [partnerPasswordForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const {data: partnerPasswordData, loading} = useAppSelector(
    (state) => state.partnerPassword,
  );
  const {loading: sharedPartnerPassword, data: sharedPasswordData} =
    useAppSelector((state) => state.sharedPartnerPassword);
  const [activeKey, setActiveKey] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showShareCredentialModal, setShowShareCredentialModal] =
    useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [partnerPasswordId, setPartnerPasswordId] = useState<any>();
  const [finalSharedPasswordData, setFinalSharedPasswordData] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const [shareCredentialsIds, setShareCredentialsIds] = useState<
    {shareBy: number; shareWith: number}[]
  >([]);
  const [query, setQuery] = useState<{
    partner_name: string | null;
  }>({
    partner_name: '',
  });
  const [sharedQuery, setSharedQuery] = useState<{
    partner_name: string | null;
  }>({
    partner_name: '',
  });
  const sharedSearchQuery = useDebounceHook(sharedQuery, 500);
  const searchQuery = useDebounceHook(query, 500);

  const deleteSelectedIds = () => {
    const data = {Ids: deleteIds};
    dispatch(deletePartnerPassword(data)).then((d) => {
      if (d?.payload) {
        dispatch(queryPartnerPassword(searchQuery));
        setDeleteIds([]);
        setShowModalDelete(false);
      }
    });
  };

  const [copiedPassword, setCopiedPassword] = useState('');

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    message.success('Password copied to clipboard');
  };

  const MyPartnerColumns = getMyPartnerColumns(
    token,
    setShowShareCredentialModal,
    setPartnerPasswordId,
    setDeleteIds,
    setShowModalDelete,
  );
  const SharedPartnerColumns = getSharedPasswordColumns(
    token,
    handleCopyPassword,
  );

  useEffect(() => {
    dispatch(queryPartnerPassword(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    dispatch(querySharedPartnerPassword(sharedSearchQuery));
  }, [sharedSearchQuery]);

  useEffect(() => {
    if (sharedPasswordData) {
      let filteredData = sharedPasswordData?.filter(
        (sharedPasswordDataItem: any) =>
          sharedPasswordDataItem?.shared_with === userInformation?.id,
      );
      setFinalSharedPasswordData(filteredData);
    }
  }, [sharedPasswordData]);

  const locale = {
    emptyText: <EmptyContainer title="No Data" />,
  };

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
          dataSource={finalSharedPasswordData}
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
          dataSource={partnerPasswordData}
          scroll
          loading={loading}
          locale={locale}
        />
      ),
    },
  ];

  const onFinish = () => {
    const formData = partnerPasswordForm.getFieldsValue();
    if (formData) {
      let obj = {
        ...formData,
        created_by: userInformation?.id,
      };
      dispatch(insertPartnerPassword(obj)).then((d) => {
        if (d?.payload) {
          dispatch(queryPartnerPassword(query));
          setShowModal(false);
        }
      });
    }
    console.log('formDataformData', formData);
  };

  const shareCredential = () => {
    if (shareCredentialsIds) {
      dispatch(insertSharedPartnerPassword(shareCredentialsIds)).then((d) => {
        if (d?.payload) {
          dispatch(querySharedPartnerPassword(sharedSearchQuery));
          setShareCredentialsIds([]);
          setPartnerPasswordId([]);
          setShowShareCredentialModal(false);
        }
      });
    }
  };

  return (
    <>
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
              clickHandler={() => {
                setShowModal(true);
              }}
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
                {activeKey === 1 ? (
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    onSearch={(e: any) => {
                      setSharedQuery({
                        ...sharedQuery,
                        partner_name: e,
                      });
                    }}
                    onChange={(e: any) => {
                      setSharedQuery({
                        ...sharedQuery,
                        partner_name: e,
                      });
                    }}
                    value={sharedQuery?.partner_name}
                  />
                ) : (
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
                )}
              </Space>
              <div
                style={{
                  marginTop: '15px',
                }}
              >
                <Typography
                  cursor="pointer"
                  name="Button 1"
                  color={sharedQuery?.partner_name ? '#0D0D0D' : '#C6CDD5'}
                  onClick={() => {
                    setQuery({
                      ...query,
                      ...sharedQuery,
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

      <OsModal
        loading={loading}
        body={
          <AddPartnerPassword
            partnerPasswordForm={partnerPasswordForm}
            onFinish={onFinish}
          />
        }
        width={600}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          partnerPasswordForm.resetFields();
        }}
        onOk={partnerPasswordForm.submit}
        primaryButtonText="Save"
        footerPadding={30}
      />
      <OsModal
        title={'Share Credentials in Team'}
        loading={sharedPartnerPassword}
        body={
          <ShareCredential
            setShareCredentialsIds={setShareCredentialsIds}
            shareCredentialsIds={shareCredentialsIds}
            partnerPasswordId={partnerPasswordId}
          />
        }
        width={1100}
        open={showShareCredentialModal}
        onCancel={() => {
          setShowShareCredentialModal(false);
        }}
        onOk={shareCredential}
        primaryButtonText="Share"
        bodyPadding={40}
      />

      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        description="Are you sure you want to delete this partner Password?"
        heading="Delete Partner Password"
      />
    </>
  );
};

export default PartnerPassword;
