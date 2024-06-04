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
import {encrypt} from '@/app/utils/base';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Form, TabsProps} from 'antd';
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
import {getMyPartnerColumns, getSharedPasswordColumns} from '../tableCloumn';
import AddPartnerPassword from './AddPartnerPassword';
import ShareCredential from './ShareCredential';

const PartnerPassword = () => {
  const [token] = useThemeToken();
  const [partnerPasswordForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const {data: partnerPasswordData, loading} = useAppSelector(
    (state) => state.partnerPassword,
  );
  const {loading: sharedPartnerPassword, data: sharedPasswordData} =
    useAppSelector((state) => state.sharedPartnerPassword);
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const [activeKey, setActiveKey] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showShareCredentialModal, setShowShareCredentialModal] =
    useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [partnerPasswordId, setPartnerPasswordId] = useState<any>();
  const [finalSharedPasswordData, setFinalSharedPasswordData] = useState<any>();
  const [finalMyPasswordData, setFinalMyPasswordData] = useState<any>();
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

  const MyPartnerColumns = getMyPartnerColumns(
    token,
    setShowShareCredentialModal,
    setPartnerPasswordId,
    setDeleteIds,
    setShowModalDelete,
  );
  const SharedPartnerColumns = getSharedPasswordColumns(token);

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

  useEffect(() => {
    if (partnerPasswordData) {
      let filteredData = partnerPasswordData?.filter(
        (partnerPasswordDataItem: any) =>
          partnerPasswordDataItem?.created_by === userInformation?.id,
      );
      setFinalMyPasswordData(filteredData);
    }
  }, [partnerPasswordData]);

  const locale = {
    emptyText: <EmptyContainer title="No Data" />,
  };

  const sharedPartnerPasswordOptions = finalSharedPasswordData?.map(
    (finalSharedPasswordDataItem: any) => ({
      value: finalSharedPasswordDataItem?.PartnerPassword?.Partner?.partner,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {finalSharedPasswordDataItem?.PartnerPassword?.Partner?.partner}
        </Typography>
      ),
    }),
  );

  const myPartnerPasswordOptions = finalMyPasswordData?.map(
    (finalMyPasswordDataItem: any) => ({
      value: finalMyPasswordDataItem?.Partner?.partner,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {finalMyPasswordDataItem?.Partner?.partner}
        </Typography>
      ),
    }),
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
          dataSource={finalMyPasswordData}
          scroll
          loading={loading}
          locale={locale}
        />
      ),
    },
  ];

  const onFinish = async () => {
    const formData = partnerPasswordForm.getFieldsValue();
    if (formData) {
      const {iv, data} = await encrypt(
        formData?.password,
        SECRET_KEY as string,
      );
      let obj = {
        created_by: userInformation?.id,
        email: formData?.email,
        partner_id: formData?.partner_id,
        username: formData?.username,
        password: `${iv}:${data}`,
      };
      dispatch(insertPartnerPassword(obj)).then((d) => {
        if (d?.payload) {
          dispatch(queryPartnerPassword(query));
          setShowModal(false);
        }
      });
    }
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
              text="Add New Credentials"
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
                    options={sharedPartnerPasswordOptions}
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
                    options={myPartnerPasswordOptions}
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
                      partner_name: null,
                    });
                    setSharedQuery({
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
