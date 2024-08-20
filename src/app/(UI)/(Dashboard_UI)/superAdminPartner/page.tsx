/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import FormBuilderMain from '@/app/components/common/formBuilder/page';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import AddPartner from '@/app/components/common/os-add-partner';
import AddPartnerProgram from '@/app/components/common/os-add-partner-program';
import OsButton from '@/app/components/common/os-button';
import OsDrawer from '@/app/components/common/os-drawer';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import DeleteModal from '@/app/components/common/os-modal/DeleteModal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {
  MinusIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Checkbox, Form, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {updateAssignPartnerProgramById} from '../../../../../redux/actions/assignPartnerProgram';
import {
  deletePartner,
  getAllPartnerandProgramFilterDataForAdmin,
} from '../../../../../redux/actions/partner';
import {
  deletePartnerProgram,
  deletePartnerProgramFormData,
  getAllPartnerProgram,
  upadteToRequestPartnerandprogramfromAmin,
  updatePartnerProgramById,
} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddPartnerProgramScript from './AddPartnerProgramScript';
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
  const [programScriptForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const getTabId = searchParams && searchParams.get('tab');
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
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const [formData, setformData] = useState<any>();
  const [partnerProgramColumns, setPartnerProgramColumns] = useState<any>();
  const [queryDataa, setQueryData] = useState<any>();
  const [updateTheObject, setUpdateTheObject] = useState<any>();
  const {insertProgramLoading} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const [allPartnerData, setAllPartnerData] = useState<any>();
  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [partnerProgramOptions, setPartnerProgramOptions] = useState<any>();
  const [showScriptModal, setShowScriptModal] = useState<boolean>(false);
  const [superAdminPartnerAnalyticData, setSuperAdminPartnerAnalyticData] =
    useState<any>();
  const [selectPartnerProgramId, setSelectPartnerProgramId] = useState<any>();

  const getPartnerDataForSuperAdmin = async () => {
    dispatch(getAllPartnerandProgramFilterDataForAdmin({}))?.then(
      (payload: any) => {
        let countForActivePartnerProgram = 0;

        if (
          payload?.payload?.AllPartner?.length > 0 &&
          payload?.payload?.AllPartner
        ) {
          payload?.payload?.AllPartner?.map((items: any) => {
            countForActivePartnerProgram =
              countForActivePartnerProgram + items?.PartnerPrograms?.length;
          });
        }

        console.log(
          '43543543543',
          payload?.payload?.AllPartner,
          countForActivePartnerProgram,
        );
        let newObj = {
          requested: payload?.payload?.requested?.length,
          allPartner: payload?.payload?.AllPartner?.length,
          Declined: payload?.payload?.DeclinedData?.length,
          PartnerProgram: countForActivePartnerProgram,
        };
        setSuperAdminPartnerAnalyticData(newObj);
        let newArrOfPartner: any = [];
        let newArrOfPartnerProgram: any = [];

        payload?.payload?.AllPartner?.map((items: any) => {
          let newObjPatner = {
            label: formatStatus(items?.partner),
            value: items?.partner,
          };
          newArrOfPartner?.push(newObjPatner);
          if (items?.PartnerPrograms?.length) {
            items?.PartnerPrograms?.map((itemPro: any) => {
              let newObjPatnerPfro = {
                label: formatStatus(itemPro?.partner_program),
                value: itemPro?.partner_program,
              };
              newArrOfPartnerProgram?.push(newObjPatnerPfro);
            });
          }
        });
        setPartnerOptions(newArrOfPartner);
        setPartnerProgramOptions(newArrOfPartnerProgram);

        setAllPartnerData(payload?.payload);
      },
    );

    // setAllAnalyticPartnerData(newObj);
  };

  useEffect(() => {
    // dispatch(getAllPartnerandProgram(''));
    getPartnerDataForSuperAdmin();
  }, []);
  const searchQuery = useDebounceHook(queryDataa, 500);

  useEffect(() => {
    dispatch(getAllPartnerandProgramFilterDataForAdmin(searchQuery))?.then(
      (payload: any) => {
        let newArrOfPartner: any = [];
        let newArrOfPartnerProgram: any = [];

        payload?.payload?.AllPartner?.map((items: any) => {
          let newObjPatner = {
            label: formatStatus(items?.partner),
            value: items?.partner,
          };
          newArrOfPartner?.push(newObjPatner);
          if (items?.PartnerPrograms?.length) {
            items?.PartnerPrograms?.map((itemPro: any) => {
              let newObjPatnerPfro = {
                label: formatStatus(itemPro?.partner_program),
                value: itemPro?.partner_program,
              };
              newArrOfPartnerProgram?.push(newObjPatnerPfro);
            });
          }
        });
        setPartnerOptions(newArrOfPartner);
        setPartnerProgramOptions(newArrOfPartnerProgram);
        setAllPartnerData(payload?.payload);
      },
    );
  }, [searchQuery]);

  useEffect(() => {
    if (getTabId) {
      setActiveTab(Number(getTabId));
    }
  }, [getTabId]);

  useEffect(() => {
    if (getTabId) {
      setActiveTab(Number(getTabId));
    }
  }, [getTabId]);

  const updateRequest = async (
    type: boolean,
    id: number,
    requesId: number,
    partner_id: number,
    partner_program_id: number,
  ) => {
    const Data = {
      id,
      is_approved: type,
      requested_by: requesId,
      partner_id,
      partner_program_id,
    };
    await dispatch(updateAssignPartnerProgramById(Data));
    getPartnerDataForSuperAdmin();
  };

  const deleteSelectedPartnerProgramIds = async () => {
    const data = {id: deletePartnerProgramIds};
    await dispatch(deletePartnerProgram(data)).then(async () => {
      await getPartnerDataForSuperAdmin();
    });
    setDeletePartnerProgramIds([]);
    setShowPartnerProgramDeleteModal(false);
  };

  const updateTheAuthorization = async (
    value: boolean,
    partner_id: any,
    partner_program_id: any,
    typeOf: any,
  ) => {
    let data = {
      partner_id: partner_id,
      partner_program_id: partner_program_id,
      type: typeOf,
      valueUpdate: value,
    };

    await dispatch(upadteToRequestPartnerandprogramfromAmin(data));
    getPartnerDataForSuperAdmin();

    // valueUpdate
  };

  const deleteSelectedPartnerIds = async () => {
    const data = {id: deletePartnerIds};
    await dispatch(deletePartner(data)).then(async () => {
      await getPartnerDataForSuperAdmin();
      // dispatch(getAllPartnerandProgramFilterData({}))?.then((payload: any) => {
      //   setAllPartnerData(payload?.payload);
      // });
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
      render: (text: string, record: any) => (
        <CustomTextCapitalization text={record?.Partner?.partner} />
      ),
      width: 200,
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
          {record?.Partner?.email ?? '--'}
        </Typography>
      ),
      width: 200,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Program Name
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      render: (text: string) => <CustomTextCapitalization text={text} />,
      width: 200,
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
      width: 200,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          New Partner Program
        </Typography>
      ),
      dataIndex: 'description',
      key: 'description',
      render: (text: any, record: any) => (
        <Checkbox
          checked={
            record?.AssignPartnerProgram?.new_request
              ? true
              : !record?.AssignPartnerProgram
                ? true
                : false
          }
          disabled
        />
      ),
      width: 200,
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
          {record?.AssignPartnerProgram?.User?.user_name ??
            record?.organization}
        </Typography>
      ),
      width: 200,
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
            } else {
              router?.push(`/formBuilder?id=${record?.id}`);
            }
          }}
        >
          {record?.form_data?.length > 0 && !record?.form_data?.includes(null)
            ? 'View'
            : 'Create Template'}
        </Typography>
      ),
      width: 200,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Action
        </Typography>
      ),
      dataIndex: 'action',
      key: 'action',
      width: 300,
      render: (text: string, record: any) => (
        <Space direction="horizontal">
          {' '}
          <OsButton
            btnStyle={{height: '32px'}}
            buttontype="PRIMARY"
            text="Approve"
            clickHandler={() => {
              if (!record?.AssignPartnerProgram) {
                updateTheAuthorization(
                  true,
                  record?.Partner?.id,
                  record?.id,
                  'approve',
                );
              } else {
                if (
                  record?.form_data?.length > 0 &&
                  !record?.form_data?.includes(null)
                ) {
                  updateRequest(
                    true,
                    record?.AssignPartnerProgram?.id,
                    record?.AssignPartnerProgram?.requested_by,
                    record?.Partner?.id,
                    record?.id,
                  );
                } else {
                  notification?.open({
                    message:
                      'Please create a template for this partner program for approval.',
                    type: 'info',
                  });
                }
              }
            }}
          />{' '}
          <OsButton
            btnStyle={{height: '32px'}}
            buttontype="SECONDARY"
            text="Decline"
            clickHandler={() => {
              if (!record?.AssignPartnerProgram) {
                updateTheAuthorization(
                  true,
                  record?.Partner?.id,
                  record?.id,
                  'delete',
                );
              } else {
                updateRequest(
                  false,
                  record?.AssignPartnerProgram?.id,
                  record?.AssignPartnerProgram?.requested_by,
                  record?.Partner?.id,
                  record?.id,
                );
              }
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
      render: (text: string) => <CustomTextCapitalization text={text} />,
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
            if (
              record?.form_data &&
              record?.form_data?.length > 0 &&
              !record?.form_data?.includes(null)
            ) {
              setOpenPreviewModal(true);
              setformData({
                formObject: JSON?.parse(record?.form_data),
                Id: record?.id,
              });
            } else {
              router?.push(`/formBuilder?id=${record?.id}`);
            }
          }}
        >
          {record?.form_data?.length > 0 && !record?.form_data?.includes(null)
            ? 'View'
            : 'Create Template'}
        </Typography>
      ),
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Script
        </Typography>
      ),
      dataIndex: 'script',
      key: 'script',
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Medium"
          hoverOnText
          color={token?.colorLink}
          onClick={() => {
            if (record?.script && !record?.script?.includes(null)) {
              programScriptForm?.setFieldsValue({
                script: JSON.parse(record?.script),
              });
            } else {
              programScriptForm?.resetFields();
            }
            setSelectPartnerProgramId(record?.id);
            setShowScriptModal(true);
          }}
        >
          {record?.script?.length > 0 && !record?.script?.includes(null)
            ? 'View Script'
            : 'Create Script'}
        </Typography>
      ),
    },
  ];

  const PartnerColumnsData = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner',
      key: 'partner',
      render: (text: string) => <CustomTextCapitalization text={text} />,
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
        <Typography
          name="Body 4/Regular"
          onClick={() => {
            window.open(`http://${text}`);
          }}
          hoverOnText
        >
          {text ?? '--'}
        </Typography>
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
          columns={[
            ...PartnerColumnsData,
            {
              title: 'Action',
              dataIndex: 'actions',
              key: 'actions',
              render: (text: string, record: any, index: number) => (
                <Space size={18}>
                  <PencilSquareIcon
                    height={24}
                    width={24}
                    onClick={() => {
                      let newObj = {
                        partner: formatStatus(record?.partner),
                        industry: record?.industry,
                        email: record?.email,
                        website: record?.website,
                        id: record?.id,
                      };
                      setUpdateTheObject(newObj);

                      setShowPartnerDrawer(true);
                    }}
                    color={token.colorInfoBorder}
                    style={{cursor: 'pointer'}}
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
          ]}
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
            expandIcon: ({expanded, onExpand, record}: any) =>
              expanded ? (
                <MinusIcon
                  width={20}
                  onClick={(e: any) => onExpand(record, e)}
                />
              ) : (
                <PlusIcon
                  width={20}
                  onClick={(e: any) => onExpand(record, e)}
                />
              ),
          }}
          dataSource={allPartnerData?.AllPartner}
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
          dataSource={allPartnerData?.requested}
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
          columns={PartnerColumnsData}
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
            expandIcon: ({expanded, onExpand, record}: any) =>
              expanded ? (
                <MinusIcon
                  width={20}
                  onClick={(e: any) => onExpand(record, e)}
                />
              ) : (
                <PlusIcon
                  width={20}
                  onClick={(e: any) => onExpand(record, e)}
                />
              ),
          }}
          // dataSource={allApprovedObjects}
          dataSource={allPartnerData?.DeclinedData}
          scroll
          locale={locale}
          loading={false}
        />
      ),
    },
  ];

  useEffect(() => {
    if (activeTab === 1) {
      const newArrforTheProgram = [...PartnerProgramColumns];
      const newObj: any = {
        title: 'Action',
        dataIndex: 'actions',
        key: 'actions',
        render: (text: string, record: any, index: number) => (
          <Space size={18}>
            <PencilSquareIcon
              height={24}
              width={24}
              onClick={() => {
                let newObj = {
                  partner: record?.partner,
                  description: record?.description,
                  partner_program: formatStatus(record?.partner_program),
                  id: record?.id,
                };
                setUpdateTheObject(newObj);
                setShowPartnerProgramDrawer(true);
              }}
              color={token.colorInfoBorder}
              style={{cursor: 'pointer'}}
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
      };
      newArrforTheProgram?.push(newObj);
      setPartnerProgramColumns(newArrforTheProgram);
    } else if (activeTab === 2) {
      const newArr = [...PartnerProgramColumns];
      const newObj: any = {
        title: (
          <Typography name="Body 4/Medium" className="dragHandler">
            Action
          </Typography>
        ),
        dataIndex: 'action',
        key: 'action',
        render: (text: string, record: any) => (
          <Space direction="horizontal">
            {' '}
            <OsButton
              btnStyle={{height: '32px'}}
              buttontype="PRIMARY"
              text="Approve"
              clickHandler={() => {
                if (!record?.AssignPartnerProgram) {
                  updateTheAuthorization(
                    true,
                    record?.Partner?.id,
                    record?.id,
                    'approve',
                  );
                } else {
                  if (
                    record?.form_data?.length > 0 &&
                    !record?.form_data?.includes(null)
                  ) {
                    updateRequest(
                      true,
                      record?.AssignPartnerProgram?.id,
                      record?.AssignPartnerProgram?.requested_by,
                      record?.Partner?.id,
                      record?.id,
                    );
                  } else {
                    notification?.open({
                      message:
                        'Please create a template for this partner program for approval.',
                      type: 'info',
                    });
                  }
                }
              }}
            />{' '}
            <OsButton
              btnStyle={{height: '32px'}}
              buttontype="SECONDARY"
              text="Decline"
              clickHandler={() => {
                if (!record?.AssignPartnerProgram) {
                  updateTheAuthorization(
                    true,
                    record?.Partner?.id,
                    record?.id,
                    'delete',
                  );
                } else {
                  updateRequest(
                    false,
                    record?.AssignPartnerProgram?.id,
                    record?.AssignPartnerProgram?.requested_by,
                    record?.Partner?.id,
                    record?.id,
                  );
                }
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

  const programScript = async () => {
    const programScriptData = programScriptForm?.getFieldsValue();
    let obj = {
      id: selectPartnerProgramId,
      script: [JSON?.stringify(programScriptData?.script)],
    };
    await dispatch(updatePartnerProgramById(obj));
    setSelectPartnerProgramId('');
    programScriptForm?.resetFields();
    setShowScriptModal(false);
  };

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
                text="New Partner"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowAddPartnerModal((p) => !p)}
              />
              <OsButton
                icon={<PlusIcon color={token?.colorPrimary} />}
                text="New Partner Program"
                buttontype="SECONDARY"
                clickHandler={() => setShowAddProgramModal((p) => !p)}
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
            tabBarExtraContent={
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Partner</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    showSearch
                    options={partnerOptions}
                    onSearch={(e) => {
                      setQueryData({
                        ...queryDataa,
                        partnerQuery: e,
                      });
                    }}
                    onChange={(e) => {
                      setQueryData({
                        ...queryDataa,
                        partnerQuery: e,
                      });
                    }}
                    value={queryDataa?.partnerQuery}
                  />
                </Space>

                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium"> Partner Program</Typography>
                  <CommonSelect
                    style={{width: '200px'}}
                    placeholder="Search here"
                    options={partnerProgramOptions}
                    showSearch
                    onSearch={(e) => {
                      setQueryData({
                        ...queryDataa,
                        partnerprogramQuery: e,
                      });
                    }}
                    onChange={(e) => {
                      setQueryData({
                        ...queryDataa,
                        partnerprogramQuery: e,
                      });
                    }}
                    value={queryDataa?.partnerprogramQuery}
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
                    color={
                      queryDataa?.partnerQuery ||
                      queryDataa?.partnerprogramQuery
                        ? '#0D0D0D'
                        : '#C6CDD5'
                    }
                    onClick={() => {
                      setQueryData({
                        partnerQuery: '',
                        partnerprogramQuery: '',
                        size: 10,
                      });
                    }}
                  >
                    Reset
                  </Typography>
                </div>
              </Space>
              // <Space size={12} align="center">
              //   <Space direction="vertical" size={0}>
              //     <Typography name="Body 4/Medium">Partner</Typography>
              //     <OsInput
              //       value={queryDataa?.partnerQuery}
              //       onChange={(e: any) => {
              //         setQueryData({
              //           ...queryDataa,
              //           partnerQuery: e?.target?.value,
              //         });
              //       }}
              //     />
              //   </Space>
              //   <Space direction="vertical" size={0}>
              //     <Typography name="Body 4/Medium">Partner Program</Typography>
              //     <OsInput
              //       value={queryDataa?.partnerprogramQuery}
              //       onChange={(e: any) => {
              //         setQueryData({
              //           ...queryDataa,
              //           partnerprogramQuery: e?.target?.value,
              //         });
              //       }}
              //     />
              //   </Space>
              //   <div
              //     style={{
              //       display: 'flex',
              //       alignItems: 'center',
              //       justifyContent: 'center',
              //       marginTop: '20px',
              //     }}
              //   >
              //     <Typography
              //       cursor="pointer"
              //       name="Button 1"
              //       style={{cursor: 'pointer'}}
              //       color={token?.colorLink}
              //       onClick={() => {
              //         setQueryData({});
              //       }}
              //     >
              //       Reset
              //     </Typography>
              //   </div>
              // </Space>
            }
          />
        </Row>
      </Space>

      <OsModal
        loading={insertPartnerLoading}
        body={
          <AddPartner
            form={form}
            setOpen={setShowAddPartnerModal}
            setUpdateTheObject={setUpdateTheObject}
            updateTheObject={updateTheObject}
            getPartnerDataForSuperAdmin={getPartnerDataForSuperAdmin}
          />
        }
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
          <AddPartnerProgram
            form={form}
            setOpen={setShowAddProgramModal}
            partnerData={allPartnerData?.AllPartner}
            setUpdateTheObject={setUpdateTheObject}
            updateTheObject={updateTheObject}
            getPartnerDataForSuperAdmin={getPartnerDataForSuperAdmin}
          />
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
          setUpdateTheObject({});
          form?.resetFields();
        }}
        open={showPartnerDrawer}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={form?.submit}
            />
          </Row>
        }
      >
        <AddPartner
          form={form}
          setOpen={setShowPartnerDrawer}
          formPartnerData={formPartnerData}
          drawer={true}
          setUpdateTheObject={setUpdateTheObject}
          updateTheObject={updateTheObject}
          getPartnerDataForSuperAdmin={getPartnerDataForSuperAdmin}
        />
      </OsDrawer>

      <OsDrawer
        title={
          <Typography name="Body 1/Regular">Update Partner Program</Typography>
        }
        placement="right"
        onClose={() => {
          setShowPartnerProgramDrawer((p) => !p);
          setUpdateTheObject({});
          form?.resetFields();
        }}
        open={showPartnerProgramDrawer}
        width={450}
        footer={
          <Row style={{width: '100%', float: 'right'}}>
            <OsButton
              btnStyle={{width: '100%'}}
              buttontype="PRIMARY"
              text="Update Changes"
              clickHandler={form?.submit}
            />
          </Row>
        }
      >
        <AddPartnerProgram
          form={form}
          partnerData={allPartnerData?.AllPartner}
          setOpen={setShowPartnerProgramDrawer}
          formPartnerData={formPartnerProgramData}
          drawer
          setUpdateTheObject={setUpdateTheObject}
          updateTheObject={updateTheObject}
          getPartnerDataForSuperAdmin={getPartnerDataForSuperAdmin}
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
          programScriptForm?.resetFields();
        }}
      />

      <OsModal
        loading={insertProgramLoading}
        title="Add Script"
        bodyPadding={22}
        body={
          <AddPartnerProgramScript
            form={programScriptForm}
            onFinish={programScript}
          />
        }
        width={583}
        open={showScriptModal}
        onOk={programScriptForm?.submit}
        onCancel={() => {
          setShowScriptModal(false);
        }}
        primaryButtonText={'Save'}
      />
    </>
  );
};

export default SuperAdminPartner;
