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
import {decrypt, encrypt} from '@/app/utils/base';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Form, TabsProps, notification} from 'antd';
import {useEffect, useState} from 'react';
import {
  deletePartnerPassword,
  insertPartnerPassword,
  queryPartnerPassword,
  updatePartnerPasswordById,
} from '../../../../../../redux/actions/partnerPassword';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import AddPartnerPassword from './AddPartnerPassword';
import DecryptedPassword from './DecryptedPassword';
import {getAllPartnerandProgramFilterData} from '../../../../../../redux/actions/partner';
import {getUserByTokenAccess} from '../../../../../../redux/actions/user';

const PartnerPassword = () => {
  const [token] = useThemeToken();
  const [partnerPasswordForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const {data: partnerPasswordData, loading} = useAppSelector(
    (state) => state.partnerPassword,
  );

  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const [activeKey, setActiveKey] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const [deleteIds, setDeleteIds] = useState<any>();

  const [partnerPasswordId, setPartnerPasswordId] = useState<any>();
  const [finalSharedPasswordData, setFinalSharedPasswordData] = useState<any>();
  const [finalMyPasswordData, setFinalMyPasswordData] = useState<any>();
  const [userInformation, setUserInformation] = useState<any>();
  const [sharedPassword, setSharedPassword] = useState<boolean>(false);
  const [partnerId, setPartnerId] = useState<any>();

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
  const [partnerDataa, setPartnerDataa] = useState<any>();

  useEffect(() => {
    dispatch(getAllPartnerandProgramFilterData({}))?.then((payload: any) => {
      setPartnerDataa(payload?.payload?.approved);
    });
    dispatch(getUserByTokenAccess(''))?.then((payload: any) => {
      setUserInformation(payload?.payload);
    });
  }, []);
  console.log('partnerDataapartnerDataa', partnerDataa);

  const MyPartnerColumns = [
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      width: 130,
      render: (text: string, record: any) => (
        <Typography hoverOnText name="Body 4/Regular">
          {formatStatus(record?.Partner?.partner) ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Username
        </Typography>
      ),
      dataIndex: 'username',
      key: 'username',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Email
        </Typography>
      ),
      dataIndex: 'email',
      key: 'email',
      width: 187,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography
          name="Body 4/Medium"
          className="dragHandler"
          color={token?.colorPrimaryText}
        >
          Password
        </Typography>
      ),
      dataIndex: 'password',
      key: 'password',
      width: 187,
      render: (text: string, record: any) => {
        return <DecryptedPassword password={record?.password} />;
      },
    },
  ];
  let ActionItem = {
    title: (
      <Typography
        name="Body 4/Medium"
        className="dragHandler"
        color={token?.colorPrimaryText}
      >
        Action
      </Typography>
    ),
    dataIndex: 'action',
    key: 'action',
    width: 187,
    render: (text: string, record: any) => (
      <Space size={18}>
        <PencilSquareIcon
          height={24}
          width={24}
          color={token.colorInfoBorder}
          style={{cursor: 'pointer'}}
          onClick={async () => {
            const [iv, encryptedData] = record?.password?.split(':');
            const decrypted = await decrypt(
              encryptedData,
              SECRET_KEY as string,
              iv,
            );

            let newObj = {
              created_by: record?.created_by,
              partner_program_id: record?.partner_program_id,
              email: record?.email,
              partner_id: record?.partner_id,
              username: record?.username,
              password: decrypted,
              shared_password: record?.shared_password,
              id: record?.id,
            };
            setPartnerId(record?.partner_id);
            setSharedPassword(record?.shared_password);
            partnerPasswordForm.setFieldsValue(newObj);
            setPartnerPasswordId(record?.id);
            setShowModal(true);
          }}
        />
        <TrashIcon
          height={24}
          width={24}
          color={token.colorError}
          style={{cursor: 'pointer'}}
          onClick={() => {
            setDeleteIds([record?.id]);
            setShowModalDelete(true);
          }}
        />
      </Space>
    ),
  };

  const FinalColumnData = [...MyPartnerColumns, ActionItem];

  useEffect(() => {
    dispatch(queryPartnerPassword(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    if (partnerPasswordData) {
      let filteredData = partnerPasswordData?.filter(
        (partnerPasswordDataItem: any) =>
          partnerPasswordDataItem?.created_by === userInformation?.id &&
          !partnerPasswordDataItem?.shared_password,
      );
      let filteredDataForShared = partnerPasswordData?.filter(
        (partnerPasswordDataItem: any) =>
          partnerPasswordDataItem?.shared_password,
      );
      setFinalMyPasswordData(filteredData);

      setFinalSharedPasswordData(filteredDataForShared);
    }
  }, [partnerPasswordData]);

  const locale = {
    emptyText: <EmptyContainer title="No Data" />,
  };

  const sharedPartnerPasswordOptions = finalSharedPasswordData?.map(
    (finalSharedPasswordDataItem: any) => ({
      value: finalSharedPasswordDataItem?.Partner?.partner,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {finalSharedPasswordDataItem?.Partner?.partner}
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
            setQuery({partner_name: ''});
          }}
        >
          Shared Passwords
        </Typography>
      ),
      key: '1',
      children: (
        <>
          {' '}
          {userInformation && (
            <OsTable
              columns={
                userInformation?.is_admin ? FinalColumnData : MyPartnerColumns
              }
              dataSource={finalSharedPasswordData}
              scroll
              loading={loading}
              locale={locale}
            />
          )}
        </>
      ),
    },
    {
      label: (
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            setActiveKey(2);
            setQuery({partner_name: ''});
          }}
        >
          My Passwords
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={FinalColumnData}
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
        partner_program_id: formData?.partner_program_id,
        email: formData?.email,
        partner_id: formData?.partner_id,
        username: formData?.username,
        password: `${iv}:${data}`,
        shared_password: sharedPassword,
        id: partnerPasswordId,
      };
      if (partnerPasswordId) {
        await dispatch(updatePartnerPasswordById(obj));
        dispatch(queryPartnerPassword(query));
        setShowModal(false);
        partnerPasswordForm.resetFields();
        setPartnerPasswordId('');
        return;
      } else {
        dispatch(insertPartnerPassword(obj)).then((d) => {
          if (d?.payload) {
            dispatch(queryPartnerPassword(query));
            setShowModal(false);
            partnerPasswordForm.resetFields();
          } else {
            notification?.open({
              message: 'Partner Password for this partner is already exist.',
              type: 'error',
            });
            setShowModal(false);
            partnerPasswordForm.resetFields();
            return;
          }
        });
      }
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
                partnerPasswordForm.resetFields();
                setPartnerPasswordId('');
                setSharedPassword(false);
                setPartnerId('');
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
            sharedPassword={sharedPassword}
            setSharedPassword={setSharedPassword}
            setPartnerId={setPartnerId}
            partnerId={partnerId}
            partnerData={partnerDataa}
          />
        }
        width={600}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          partnerPasswordForm.resetFields();
          setPartnerPasswordId('');
          setSharedPassword(false);
          setPartnerId('');
        }}
        onOk={partnerPasswordForm.submit}
        primaryButtonText={partnerPasswordId ? 'Update' : 'Save'}
        footerPadding={30}
      />

      <DeleteModal
        loading={loading}
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        description={
          activeKey === 1
            ? 'Are you sure you want to delete this shared partner Password ?'
            : 'Are you sure you want to delete this partner Password?'
        }
        heading="Delete Partner Password"
      />
    </>
  );
};

export default PartnerPassword;
