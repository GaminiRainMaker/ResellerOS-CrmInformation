/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddPartner from '@/app/components/common/os-add-partner';
import AddPartnerProgram from '@/app/components/common/os-add-partner-program';
import OsButton from '@/app/components/common/os-button';
import OsCollapse from '@/app/components/common/os-collapse';
import OsDrawer from '@/app/components/common/os-drawer';
import OsDropdown from '@/app/components/common/os-dropdown';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Form, MenuProps, Modal} from 'antd';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import FormBuilderMain from '@/app/components/common/formBuilder/page';
import {
  deletePartner,
  getAllPartner,
  updatePartnerById,
} from '../../../../../redux/actions/partner';
import {
  deletePartnerProgram,
  deletePartnerProgramFormData,
  getAllPartnerProgram,
} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import PartnerAnalytics from '../partners/partnerAnalytics';

export interface SeparatedData {
  [partnerId: number]: {
    partner_id: number;
    data: any[];
    title: string;
  };
}

const SuperAdminPartner: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formPartnerData, setFormPartnerData] = useState<any>();
  const [formPartnerProgramData, setFormPartnerProgramData] = useState<any>();
  const [showAddPartnerModal, setShowAddPartnerModal] =
    useState<boolean>(false);
  const [showAddProgramModal, setShowAddProgramModal] =
    useState<boolean>(false);
  const [showPartnerDeleteModal, setShowPartnerDeleteModal] =
    useState<boolean>(false);
  const [showPartnerProgramDeleteModal, setShowPartnerProgramDeleteModal] =
    useState<boolean>(false);
  const [showPartnerDrawer, setShowPartnerDrawer] = useState<boolean>(false);
  const [showPartnerProgramDrawer, setShowPartnerProgramDrawer] =
    useState<boolean>(false);
  const [deletePartnerIds, setDeletePartnerIds] = useState<[]>();
  const [deletePartnerProgramIds, setDeletePartnerProgramIds] = useState<[]>();
  const [activeTab, setActiveTab] = useState<number>(1);
  const {data: PartnerData, loading} = useAppSelector((state) => state.partner);
  const {data: PartnerProgramData, loading: partnerProgramLoading} =
    useAppSelector((state) => state.partnerProgram);
  const [finalPartnerProgramData, setFinalPartnerProgramData] = useState<any>();
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [formData, setformData] = useState<any>();

  useEffect(() => {
    dispatch(getAllPartner());
    dispatch(getAllPartnerProgram());
  }, []);

  console.log('activeTab', activeTab);

  const onRowUpdate = (type: string, recordId: number, value: boolean) => {
    const updateField = type === 'Active' ? 'is_active' : 'is_approved';

    const partnerObj = {
      id: recordId,
      [updateField]: value,
    };
    dispatch(updatePartnerById(partnerObj)).then(() => {
      dispatch(getAllPartner());
    });
  };

  const deleteSelectedPartnerProgramIds = async () => {
    const data = {id: deletePartnerProgramIds};
    await dispatch(deletePartnerProgram(data)).then(() => {
      dispatch(getAllPartnerProgram());
    });
    setDeletePartnerProgramIds([]);
    setShowPartnerProgramDeleteModal(false);
  };

  const deleteSelectedPartnerIds = async () => {
    const data = {id: deletePartnerIds};
    await dispatch(deletePartner(data)).then(() => {
      dispatch(getAllPartner());
    });
    setDeletePartnerIds([]);
    setShowPartnerDeleteModal(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      if (activeTab === 1) {
        setDeletePartnerIds(selectedRowKeys);
      } else if (activeTab === 2) {
        setDeletePartnerProgramIds(selectedRowKeys);
      }
    },
  };
  const deletePartnerProgramFormDa = async (id: number) => {
    dispatch(deletePartnerProgramFormData(id));
    setOpenPreviewModal(false);
    setTimeout(() => {
      dispatch(getAllPartnerProgram());
    }, 1000);
  };

  useEffect(() => {
    const separatedData: SeparatedData = {};
    if (PartnerProgramData && PartnerProgramData?.length > 0) {
      PartnerProgramData?.forEach((item: any) => {
        const partnerId = item.partner;
        const partnerName = item.Partner?.partner;
        if (!separatedData[partnerId]) {
          separatedData[partnerId] = {
            partner_id: partnerId,
            title: partnerName,
            data: [],
          };
        }
        separatedData[partnerId]?.data.push(item);
      });
    }

    setFinalPartnerProgramData(Object.values(separatedData));
  }, [PartnerProgramData]);

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="Request Partner"
        // onClick={() => setShowModal((p) => !p)}
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
      render: (text: string, record: any) => (
        <Switch
          size="default"
          value={record?.is_active}
          onChange={(e) => {
            onRowUpdate('Active', record?.id, e);
          }}
        />
      ),
    },
  ];

  const secondSuperPartnerColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Approved
        </Typography>
      ),
      dataIndex: 'is_approved',
      key: 'is_approved',
      render: (text: string, record: any) => (
        <Switch
          size="default"
          value={record?.is_approved}
          onChange={(e) => {
            onRowUpdate('Approved', record?.id, e);
          }}
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Reject
        </Typography>
      ),
      dataIndex: 'is_approved',
      key: 'is_approved',
      render: (text: string, record: any) => (
        <Switch
          size="default"
          value={record?.is_approved}
          onChange={(e) => {
            onRowUpdate('Approved', record?.id, false);
          }}
        />
      ),
    },
  ];

  const thirdSuperPartnerColumns = [
    {
      title: ' ',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setShowPartnerDrawer(true);
              setFormPartnerData(record);
            }}
          />
          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeletePartnerIds(record?.id);
              setShowPartnerDeleteModal(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const allColumns = [
    ...SuperPartnerColumns,
    ...(activeTab === 3 ? secondSuperPartnerColumns : []),
    ...thirdSuperPartnerColumns,
  ];

  const PartnerProgramColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
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
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Program Type
        </Typography>
      ),
      dataIndex: 'program_type',
      key: 'program_type',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Approval ID
        </Typography>
      ),
      dataIndex: 'program_approval_id',
      key: 'program_approval_id',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Site Link
        </Typography>
      ),
      dataIndex: 'website',
      key: 'website',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Template
        </Typography>
      ),
      dataIndex: 'template',
      key: 'template',
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Medium"
          hoverOnText
          color={token?.colorLink}
          onClick={() => {
            if (record?.form_data) {
              setOpenPreviewModal(true);
              const formDataObject = JSON?.parse(record?.form_data);
              setformData({formObject: formDataObject, Id: record?.id});
              // open modal to view form
              // console.log(record?.form_data, 'formData');
            } else {
              router?.push(`/formBuilder?id=${record?.id}`);
            }
          }}
        >
          {record?.form_data ? 'View' : 'Create Template'}
        </Typography>
      ),
    },
    {
      title: ' ',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size={18}>
          <PencilSquareIcon
            height={24}
            width={24}
            color={token.colorInfoBorder}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setShowPartnerProgramDrawer(true);
              setFormPartnerProgramData(record);
            }}
          />

          <TrashIcon
            height={24}
            width={24}
            color={token.colorError}
            style={{cursor: 'pointer'}}
            onClick={() => {
              setDeletePartnerProgramIds(record?.id);
              setShowPartnerProgramDeleteModal(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const superAdmintabItems = [
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setActiveTab(1)}>
          Partners
        </Typography>
      ),
      key: '1',
      children: (
        <OsTable
          columns={allColumns}
          dataSource={PartnerData?.approved}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={loading}
        />
      ),
    },
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setActiveTab(2)}>
          Partner Programs
        </Typography>
      ),
      key: '2',
      children: (
        <>
          {finalPartnerProgramData && finalPartnerProgramData?.length > 0 ? (
            finalPartnerProgramData?.map((itemDeal: any) => (
              <OsCollapse
                items={[
                  {
                    key: '1',
                    label: <p>{itemDeal?.title}</p>,
                    children: (
                      <OsTable
                        columns={PartnerProgramColumns}
                        dataSource={itemDeal?.data}
                        rowSelection={rowSelection}
                        scroll
                        loading={partnerProgramLoading}
                        locale={locale}
                      />
                    ),
                  },
                ]}
              />
            ))
          ) : (
            <OsTable
              columns={PartnerProgramColumns}
              dataSource={[]}
              rowSelection={rowSelection}
              scroll
              loading={false}
              locale={locale}
            />
          )}
        </>
      ),
    },
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setActiveTab(3)}>
          In Request
        </Typography>
      ),
      key: '3',
      children: (
        <OsTable
          columns={allColumns}
          dataSource={PartnerData?.requested}
          rowSelection={rowSelection}
          scroll
          locale={locale}
          loading={loading}
        />
      ),
    },
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setActiveTab(4)}>
          Rejected
        </Typography>
      ),
      key: '4',
      children: (
        <OsTable
          columns={allColumns}
          dataSource={PartnerData?.rejected}
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
            console.log(
              'deletePartnerIds',
              deletePartnerIds,
              deletePartnerIds?.length,
              activeTab,
            );
            if (
              deletePartnerIds &&
              deletePartnerIds?.length > 0 &&
              activeTab === 1
            ) {
              setShowPartnerDeleteModal(true);
            } else if (
              deletePartnerProgramIds &&
              deletePartnerProgramIds?.length > 0 &&
              activeTab === 2
            ) {
              setShowPartnerProgramDeleteModal(true);
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
              <OsButton
                icon={<PlusIcon color={token?.colorPrimary} />}
                text="New Partner Program"
                buttontype="SECONDARY"
                clickHandler={() => setShowAddProgramModal((p) => !p)}
              />
              <OsButton
                text="New Partner"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowAddPartnerModal((p) => !p)}
              />
              <OsDropdown menu={{items: dropDownItemss}} />
            </Space>
          </Col>
        </Row>

        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            tabBarExtraContent={
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
            }
            items={superAdmintabItems}
          />
        </Row>
      </Space>

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

      <OsModal
        loading={loading}
        body={
          <AddPartnerProgram form={form} setOpen={setShowAddProgramModal} />
        }
        width={800}
        open={showAddProgramModal}
        onCancel={() => {
          setShowAddProgramModal((p) => !p);
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
          setShowPartnerDrawer((p) => !p);
        }}
        open={showPartnerDrawer}
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
          setOpen={setShowPartnerDrawer}
          formPartnerData={formPartnerData}
          drawer
        />
      </OsDrawer>

      <OsDrawer
        title={
          <Typography name="Body 1/Regular">Update Partner Program</Typography>
        }
        placement="right"
        onClose={() => {
          setShowPartnerProgramDrawer((p) => !p);
        }}
        open={showPartnerProgramDrawer}
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
        <AddPartnerProgram
          form={form}
          setOpen={setShowPartnerProgramDrawer}
          formPartnerData={formPartnerProgramData}
          drawer
        />
      </OsDrawer>

      <DeleteModal
        setShowModalDelete={setShowPartnerProgramDeleteModal}
        setDeleteIds={setDeletePartnerProgramIds}
        showModalDelete={showPartnerProgramDeleteModal}
        deleteSelectedIds={deleteSelectedPartnerProgramIds}
        heading="Delete Partner Program"
        description="Are you sure you want to delete this partner program?"
      />

      <DeleteModal
        setShowModalDelete={setShowPartnerDeleteModal}
        setDeleteIds={setDeletePartnerIds}
        showModalDelete={showPartnerDeleteModal}
        deleteSelectedIds={deleteSelectedPartnerIds}
        heading="Delete Partner"
        description="Are you sure you want to delete this partner?"
      />
      {openPreviewModal && (
        <>
          <OsModal
            bodyPadding={22}
            loading={loading}
            body={
              <>
                {' '}
                <FormBuilderMain
                  cartItems={formData?.formObject}
                  form={form}
                  // eslint-disable-next-line react/jsx-boolean-value
                  previewFile
                  // previewFile={true}
                />
                <Space
                  align="end"
                  size={8}
                  style={{display: 'flex', justifyContent: 'end'}}
                >
                  <OsButton
                    buttontype="PRIMARY"
                    text="Delete"
                    clickHandler={() => {
                      deletePartnerProgramFormDa(formData?.Id);
                    }}
                  />
                  <OsButton
                    buttontype="SECONDARY"
                    text="EDIT"
                    color="red"
                    clickHandler={() => {
                      router?.push(`/formBuilder?id=${formData?.Id}`);
                    }}
                  />{' '}
                </Space>
              </>
            }
            width={900}
            // primaryButtonText="Edit"
            open={openPreviewModal}
            // onOk={() => form.submit()}
            onCancel={() => {
              setOpenPreviewModal(false);
            }}
          />
        </>
      )}
    </>
  );
};

export default SuperAdminPartner;
