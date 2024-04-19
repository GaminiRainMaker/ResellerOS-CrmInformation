/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import FormBuilderMain from '@/app/components/common/formBuilder/page';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddPartner from '@/app/components/common/os-add-partner';
import AddPartnerProgram from '@/app/components/common/os-add-partner-program';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {partnerProgramFilter} from '@/app/utils/base';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Checkbox, Form} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {updateAssignPartnerProgramById} from '../../../../../redux/actions/assignPartnerProgram';
import {
  deletePartner,
  getAllPartnerandProgram,
} from '../../../../../redux/actions/partner';
import {
  deletePartnerProgram,
  deletePartnerProgramFormData,
  getAllPartnerProgram,
} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import SuperAdminPartnerAnalytics from './SuperAdminPartnerAnalytic';

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
  const {
    loading,
    insertPartnerLoading,
    data: PartnerData,
  } = useAppSelector((state) => state.partner);
  const searchParams = useSearchParams();
  const getTabId = searchParams.get('tab');
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [formData, setformData] = useState<any>();
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const [partnerProgramColumns, setPartnerProgramColumns] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);
  const {insertProgramLoading} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const [superAdminPartnerAnalyticData, setSuperAdminPartnerAnalyticData] =
    useState<any>();

  useEffect(() => {
    dispatch(getAllPartnerandProgram(''));
  }, []);

  useEffect(() => {
    if (getTabId) {
      setActiveTab(Number(getTabId));
    }
  }, [getTabId]);

  useEffect(() => {
    const FilterArrayDataa = partnerProgramFilter(
      'super',
      userInformation,
      PartnerData,
      activeTab,
    );
    setSuperAdminPartnerAnalyticData(FilterArrayDataa);
    const newArrForTab3: any = [];
    if (activeTab === 2) {
      FilterArrayDataa?.filterData?.map((items: any) => {
        items?.PartnerPrograms?.map((itemInner: any) => {
          const newObj: any = {
            ...itemInner,
            partner_email: items?.email,
            partner_name: items?.partner,
          };
          newArrForTab3?.push(newObj);
        });
      });
    }
    if (activeTab === 2) {
      setAllFilterPartnerData(newArrForTab3);
    } else {
      setAllFilterPartnerData(FilterArrayDataa?.filterData);
    }
  }, [JSON.stringify(PartnerData), activeTab]);

  const updateRequest = async (type: boolean, id: number, requesId: number) => {
    const Data = {
      id,
      is_approved: type,
      requested_by: requesId,
    };
    await dispatch(updateAssignPartnerProgramById(Data));
    dispatch(getAllPartnerandProgram(''));
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
      dispatch(getAllPartnerandProgram(''));
    });
    setDeletePartnerIds([]);
    setShowPartnerDeleteModal(false);
  };

  const deletePartnerProgramFormDa = async (id: number) => {
    dispatch(deletePartnerProgramFormData(id));
    setOpenPreviewModal(false);
    setTimeout(() => {
      dispatch(getAllPartnerProgram());
    }, 1000);
  };

  const locale = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton="New Partner"
        onClick={() => setShowAddPartnerModal((p) => !p)}
      />
    ),
  };

  const PartnerProgramColumnsTab3 = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      render: (text: any, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.partner_name ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Email
        </Typography>
      ),
      dataIndex: 'description',
      key: 'description',
      render: (text: any, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.partner_email ?? '--'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program Name
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
          Partner Program Description
        </Typography>
      ),
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program New
        </Typography>
      ),
      dataIndex: 'description',
      key: 'description',
      render: (text: any, record: any) => (
        <Checkbox
          checked={record?.AssignPartnerProgram?.new_request}
          disabled
        />
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Requested User
        </Typography>
      ),
      dataIndex: 'description',
      key: 'description',
      render: (text: any, record: any) => (
        <Typography name="Body 4/Regular">
          {record?.AssignPartnerProgram?.User?.user_name ?? '--'}
        </Typography>
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
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Action
        </Typography>
      ),
      dataIndex: 'website',
      key: 'website',
      render: (text: string, record: any) => (
        <Space direction="horizontal">
          {' '}
          <OsButton
            buttontype="PRIMARY"
            text="Approve"
            clickHandler={() => {
              updateRequest(
                true,
                record?.AssignPartnerProgram?.id,
                record?.AssignPartnerProgram?.requested_by,
              );
            }}
          />{' '}
          <OsButton
            buttontype="SECONDARY"
            text="Decline"
            clickHandler={() => {
              updateRequest(
                false,
                record?.AssignPartnerProgram?.id,
                record?.AssignPartnerProgram?.requested_by,
              );
            }}
          />
        </Space>
      ),
    },
  ];

  const PartnerProgramColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program Name
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
          Description
        </Typography>
      ),
      dataIndex: 'description',
      key: 'description',
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
          columns={PartnerColumns}
          expandable={{
            // eslint-disable-next-line react/no-unstable-nested-components
            expandedRowRender: (record: any) => (
              <OsTable
                columns={partnerProgramColumns}
                dataSource={record?.PartnerPrograms}
                scroll
                loading={false}
                paginationProps={false}
              />
            ),
            rowExpandable: (record: any) => record.name !== 'Not Expandable',
          }}
          dataSource={allPartnerFilterData}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setActiveTab(2)}>
          In Request
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={PartnerProgramColumnsTab3}
          dataSource={allPartnerFilterData}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
    {
      label: (
        <Typography name="Body 4/Regular" onClick={() => setActiveTab(3)}>
          Rejected
        </Typography>
      ),
      key: '3',
      children: (
        <OsTable
          columns={PartnerColumns}
          expandable={{
            // eslint-disable-next-line react/no-unstable-nested-components
            expandedRowRender: (record: any) => (
              <OsTable
                columns={partnerProgramColumns}
                // dataSource={allApprovedObjects}
                dataSource={record?.PartnerPrograms}
                scroll
                loading={false}
              />
            ),
            rowExpandable: (record: any) => record.name !== 'Not Expandable',
          }}
          // dataSource={allApprovedObjects}
          dataSource={allPartnerFilterData}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
  ];

  useEffect(() => {
    if (activeTab === 2) {
      const newArr = [...PartnerProgramColumns];
      const newObj: any = {
        title: (
          <Typography name="Body 4/Medium" className="dragHandler">
            Action
          </Typography>
        ),
        dataIndex: 'website',
        key: 'website',
        render: (text: string, record: any) => (
          <Space direction="horizontal">
            {' '}
            <OsButton
              buttontype="PRIMARY"
              text="Approve"
              clickHandler={() => {
                updateRequest(
                  true,
                  record?.AssignPartnerProgram?.id,
                  record?.AssignPartnerProgram?.requested_by,
                );
              }}
            />{' '}
            <OsButton
              buttontype="SECONDARY"
              text="Decline"
              clickHandler={() => {
                updateRequest(
                  false,
                  record?.AssignPartnerProgram?.id,
                  record?.AssignPartnerProgram?.requested_by,
                );
              }}
            />
          </Space>
        ),
      };
      newArr?.push(newObj);
      setPartnerProgramColumns(newArr);
    } else {
      setPartnerProgramColumns(PartnerProgramColumns);
    }
  }, [activeTab]);

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <SuperAdminPartnerAnalytics data={superAdminPartnerAnalyticData} />
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
            </Space>
          </Col>
        </Row>

        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          <OsTabs
            activeKey={activeTab?.toString()}
            items={superAdmintabItems}
          />
        </Row>
      </Space>

      <OsModal
        loading={insertPartnerLoading}
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
        loading={insertProgramLoading}
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
            open={openPreviewModal}
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
