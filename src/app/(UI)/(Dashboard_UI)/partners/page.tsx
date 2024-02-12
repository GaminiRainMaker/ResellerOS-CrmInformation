/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddPartner from '@/app/components/common/os-add-partner';
import RequestPartner from '@/app/components/common/os-add-partner/RequestPartner';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Form, MenuProps} from 'antd';
import {useEffect, useState} from 'react';
import OsDrawer from '@/app/components/common/os-drawer';
import {
  deletePartner,
  getAllPartner,
  updatePartnerById,
} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import PartnerAnalytics from './partnerAnalytics';

const Partners: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAddPartnerModal, setShowAddPartnerModal] =
    useState<boolean>(false);
  const [deleteIds, setDeleteIds] = useState<any>();
  const [formPartnerData, setFormPartnerData] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const {data: PartnerData, loading} = useAppSelector((state) => state.partner);
  const {userInformation} = useAppSelector((state) => state.user);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(
    userInformation?.SuperAdmin,
  );

  useEffect(() => {
    setIsSuperAdmin(userInformation?.SuperAdmin);
  }, [JSON.stringify(userInformation?.SuperAdmin)]);

  useEffect(() => {
    dispatch(getAllPartner());
  }, []);

  const onActiveControl = (is_active: boolean, recordId: number) => {
    const partnerObj = {
      is_active,
      id: recordId,
    };
    dispatch(updatePartnerById(partnerObj)).then(() => {
      dispatch(getAllPartner());
    });
  };

  const deleteSelectedIds = async () => {
    const data = {id: deleteIds};
    await dispatch(deletePartner(data)).then(() => {
      dispatch(getAllPartner());
    });
    setDeleteIds([]);
    setShowModalDelete(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
  };

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="Request Partner"
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const SuperPartnerColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },

    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Created Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Industry
        </Typography>
      ),
      dataIndex: 'industry',
      key: 'industry',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
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
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Website
        </Typography>
      ),
      dataIndex: 'website',
      key: 'website',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Active
        </Typography>
      ),
      dataIndex: 'is_active',
      key: 'is_active',
      width: 295,
      render: (text: string, record: any) => (
        <Switch
          size="default"
          value={record?.is_active}
          onChange={(e) => {
            onActiveControl(e, record?.id);
          }}
        />
      ),
    },
    {
      title: ' ',
      dataIndex: 'action',
      key: 'action',
      width: 295,
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setShowDrawer(true);
              setFormPartnerData(record);
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
    },
  ];

  const superAdmintabItems = [
    {
      label: <Typography name="Body 4/Regular">Partners</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={SuperPartnerColumns}
          dataSource={PartnerData}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={loading}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Partner Programs</Typography>,
      key: '2',
      children: (
        <OsTable
          columns={SuperPartnerColumns}
          dataSource={[]}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
  ];

  const PartnerColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Generated Date
        </Typography>
      ),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 295,
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Type
        </Typography>
      ),
      dataIndex: 'type',
      key: 'type',
      width: 295,
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Status
        </Typography>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 295,
      render: (text: string, record: any) => <OsStatusWrapper value="Active" />,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Template
        </Typography>
      ),
      dataIndex: 'template',
      key: 'template',
      width: 295,
      render: () => (
        <Typography name="Body 4/Bold" color={token?.colorLink}>
          View
        </Typography>
      ),
    },
  ];

  const tabItems = [
    {
      label: <Typography name="Body 4/Regular">Partners</Typography>,
      key: '1',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={[]}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Partner Programs</Typography>,
      key: '2',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={[]}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
    {
      label: <Typography name="Body 4/Regular">Requested</Typography>,
      key: '3',
      children: (
        <OsTable
          columns={PartnerColumns}
          dataSource={PartnerData}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={loading}
        />
      ),
    },
  ];

  const dropDownItemss: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography name="Body 3/Regular">Download Selected</Typography>,
    },
    {
      key: '2',
      label: (
        <Typography
          name="Body 3/Regular"
          color={token?.colorError}
          onClick={() => {
            if (deleteIds && deleteIds?.length > 0) {
              setShowModalDelete(true);
            }
          }}
        >
          Delete Selected
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <PartnerAnalytics />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Partners
            </Typography>
          </Col>
          <Col style={{display: 'flex', alignItems: 'center'}}>
            <Space size={12} style={{height: '48px'}}>
              {isSuperAdmin ? (
                <>
                  <OsButton
                    icon={<PlusIcon color={token?.colorPrimary} />}
                    text="New Partner Program"
                    buttontype="SECONDARY"
                    // clickHandler={showDrawer}
                  />
                  <OsButton
                    text="New Partner"
                    buttontype="PRIMARY"
                    icon={<PlusIcon />}
                    clickHandler={() => setShowAddPartnerModal((p) => !p)}
                  />
                  <OsDropdown menu={{items: dropDownItemss}} />
                </>
              ) : (
                <>
                  <OsButton
                    text="Request Partner"
                    buttontype="PRIMARY"
                    icon={<PlusIcon />}
                    clickHandler={() => setShowModal((p) => !p)}
                  />
                  <OsDropdown menu={{items: dropDownItemss}} />
                </>
              )}
            </Space>
          </Col>
        </Row>

        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            tabBarExtraContent={
              isSuperAdmin ? (
                <Form layout="vertical">
                  <Space size={12}>
                    <Form.Item label="Order Filter">
                      <CommonSelect
                        style={{width: '180px'}}
                        placeholder="Search Here"
                      />
                    </Form.Item>

                    <Form.Item label="Order Filter">
                      <CommonSelect
                        style={{width: '180px'}}
                        placeholder="Search Here"
                      />
                    </Form.Item>

                    <Form.Item label="Order Filter">
                      <CommonSelect
                        style={{width: '180px'}}
                        placeholder="Search Here"
                      />
                    </Form.Item>
                  </Space>
                </Form>
              ) : (
                <Space size={12} align="center">
                  <Space direction="vertical" size={0}>
                    <Typography name="Body 4/Medium">Partner Name</Typography>
                    <OsInput
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Space>
                  <Space direction="vertical" size={0}>
                    <Typography name="Body 4/Medium">
                      Partner Programs
                    </Typography>
                    <CommonSelect
                      style={{width: '180px'}}
                      placeholder="Search Here"
                    />
                  </Space>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '15px',
                    }}
                  >
                    <Typography
                      cursor="pointer"
                      name="Button 1"
                      color="#C6CDD5"
                      //   onClick={searchBillingContacts}
                    >
                      Apply
                    </Typography>
                  </div>
                </Space>
              )
            }
            items={isSuperAdmin ? superAdmintabItems : tabItems}
          />
        </Row>
      </Space>

      <OsModal
        loading={loading}
        body={<RequestPartner form={form} setOpen={setShowModal} />}
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
        }}
        footer
        primaryButtonText="Request"
        onOk={form?.submit}
        footerPadding={30}
      />

      <OsModal
        loading={loading}
        body={<AddPartner form={form} setOpen={setShowAddPartnerModal} />}
        width={800}
        open={showAddPartnerModal}
        onCancel={() => {
          setShowAddPartnerModal((p) => !p);
        }}
        footer
        primaryButtonText="Create"
        onOk={form?.submit}
        footerPadding={30}
      />

      <OsDrawer
        title={<Typography name="Body 1/Regular">Update Partner</Typography>}
        placement="right"
        onClose={() => {
          setShowDrawer((p) => !p);
        }}
        open={showDrawer}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="UPDATE CHANGES"
              clickHandler={form?.submit}
            />
          </Row>
        }
      >
        <AddPartner
          form={form}
          setOpen={setShowDrawer}
          formPartnerData={formPartnerData}
          drawer
        />
      </OsDrawer>

      <DeleteModal
        setShowModalDelete={setShowModalDelete}
        setDeleteIds={setDeleteIds}
        showModalDelete={showModalDelete}
        deleteSelectedIds={deleteSelectedIds}
        heading="Delete Partner"
        description="Are you sure you want to delete this partner?"
      />
    </>
  );
};

export default Partners;
