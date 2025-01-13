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
import {Form, notification} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {updateAssignPartnerProgramById} from '../../../../../redux/actions/assignPartnerProgram';
import {
  deletePartner,
  getAllPartnerandProgramFilterDataForAdmin,
} from '../../../../../redux/actions/partner';
import {
  deletePartnerProgram,
  deletePartnerProgramTemplateData,
  getAllPartnerProgram,
  launchPlayWright,
  upadteToRequestPartnerandprogramfromAmin,
  updatePartnerProgramById,
} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddPartnerProgramScript from './AddPartnerProgramScript';
import SuperAdminPartnerAnalytics from './SuperAdminPartnerAnalytic';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';
import {Switch} from '@/app/components/common/antd/Switch';
import React from 'react';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import {Checkbox} from '@/app/components/common/antd/Checkbox';

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
  const [programLoginScriptForm] = Form.useForm();
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
  const [loginTemplateFormData, setLoginTemplateFormData] = useState<any>();
  const [showLoginTemplateModal, setShowLoginTemplateModal] = useState<any>();
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
  const [showLoginScriptModal, setShowLoginScriptModal] =
    useState<boolean>(false);
  const [superAdminPartnerAnalyticData, setSuperAdminPartnerAnalyticData] =
    useState<any>();
  const [selectPartnerProgramId, setSelectPartnerProgramId] = useState<any>();
  const [userId, setUserId] = useState<any>();
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<any>();
  const [rejectedRecord, setRejectedRecord] = useState<any>();

  useEffect(() => {
    dispatch(getUserByTokenAccess('')).then((res: any) => {
      if (res) {
        setUserId(res?.payload?.id);
      }
    });
  }, []);

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

  const updateLoginStep = async (id: number, value: boolean) => {
    let obj = {
      id: id,
      login_step: value,
    };
    await dispatch(updatePartnerProgramById(obj));
  };
  const updateRequest = async (
    type: boolean,
    id: number,
    requesId: number,
    partner_id: number,
    partner_program_id: number,
    partnerName: string,
    partnerProgramName: string,
  ) => {
    const Data = {
      id,
      is_approved: type,
      requested_by: requesId,
      partner_id,
      partner_program_id,
      partnerName: formatStatus(partnerName),
      partnerProgramName: formatStatus(partnerProgramName),
      rejection_reason: rejectReason,
      user_id: rejectedRecord?.user_id,
    };

    await dispatch(updateAssignPartnerProgramById(Data));
    setShowRejectModal(false);
    setRejectReason('');
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
    user_id: any,
    partnerName: string,
    partnerProgramName: string,
  ) => {
    let data = {
      partner_id: partner_id,
      partner_program_id: partner_program_id,
      type: typeOf,
      valueUpdate: value,
      rejection_reason: rejectReason,
      user_id,
      partnerName: formatStatus(partnerName),
      partnerProgramName: formatStatus(partnerProgramName),
      // user_id: rejectedRecord?.user_id,
      // partnerName: formatStatus(rejectedRecord?.Partner?.partner),
      // partnerProgramName: formatStatus(rejectedRecord?.partner_program),
    };

    await dispatch(upadteToRequestPartnerandprogramfromAmin(data));
    setShowRejectModal(false);
    setRejectReason('');
    getPartnerDataForSuperAdmin();

    // valueUpdate
  };
  const onFinsh = () => {
    if (!rejectedRecord?.AssignPartnerProgram) {
      updateTheAuthorization(
        true,
        rejectedRecord?.Partner?.id,
        rejectedRecord?.id,
        'delete',
        rejectedRecord?.user_id,
        formatStatus(rejectedRecord?.Partner?.partner),
        formatStatus(rejectedRecord?.partner_program),
      );
    } else {
      updateRequest(
        false,
        rejectedRecord?.AssignPartnerProgram?.id,
        rejectedRecord?.AssignPartnerProgram?.requested_by,
        rejectedRecord?.Partner?.id,
        rejectedRecord?.id,
        rejectedRecord?.Partner?.partner,
        rejectedRecord?.partner_program,
      );
    }
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

  const deletePartnerProgramTemplate = async (id: number, type: string) => {
    const obj = {
      id: id,
      type: type,
    };
    dispatch(deletePartnerProgramTemplateData(obj)).then((d) => {
      if (d?.payload) {
        setOpenPreviewModal(false);
        setShowLoginTemplateModal(false);
        getPartnerDataForSuperAdmin();
      }
    });
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
      width: 250,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Organization
        </Typography>
      ),
      dataIndex: 'organization',
      key: 'organization',
      render: (text: string, record: any) => (
        <Typography name="Body 4/Regular">
          {text ?? record?.Partner?.organization ?? '--'}
        </Typography>
      ),
      width: 200,
    },
    // {
    //   title: (
    //     <Typography name="Body 4/Medium" className="dragHandler">
    //       Organization
    //     </Typography>
    //   ),
    //   dataIndex: 'organization',
    //   key: 'organization',
    // },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Dealer Relationship
        </Typography>
      ),
      dataIndex: 'dealer_relationship',
      key: 'dealer_relationship',
      render: (text: boolean) => <Checkbox checked={text} disabled />,
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
          {record?.AssignPartnerProgram?.organization ??
            record?.Partner?.salesforce_username ??
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
                  record?.user_id,
                  formatStatus(record?.Partner?.partner),
                  formatStatus(record?.partner_program),
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
                    record?.Partner?.partner,
                    record?.partner_program,
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
              setShowRejectModal(true);
              setRejectedRecord(record);

              return;
              // if (!record?.AssignPartnerProgram) {
              //   updateTheAuthorization(
              //     true,
              //     record?.Partner?.id,
              //     record?.id,
              //     'delete',
              //   );
              // } else {
              //   updateRequest(
              //     false,
              //     record?.AssignPartnerProgram?.id,
              //     record?.AssignPartnerProgram?.requested_by,
              //     record?.Partner?.id,
              //     record?.id,
              //     record?.Partner?.partner,
              //     record?.partner_program,
              //   );
              // }
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
          Verfication Step
        </Typography>
      ),
      dataIndex: 'login_step',
      key: 'login_step',
      render: (text: any, record: any) => (
        <Switch
          defaultChecked={text}
          size="default"
          onChange={(e) => {
            updateLoginStep(record?.id, e);
          }}
        />
      ),
      width: 150,
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
          Login Template
        </Typography>
      ),
      dataIndex: 'login_template',
      key: 'login_template',
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Medium"
          hoverOnText
          color={token?.colorLink}
          onClick={() => {
            if (
              record?.login_template &&
              record?.login_template?.length > 0 &&
              !record?.login_template?.includes(null)
            ) {
              setShowLoginTemplateModal(true);
              setLoginTemplateFormData({
                formObject: JSON?.parse(record?.login_template),
                Id: record?.id,
              });
            } else {
              console.log('record', record);
              router?.push(`/formBuilder?id=${record?.id}&loginTemplate=true`);
            }
          }}
        >
          {record?.login_template?.length > 0 &&
          !record?.login_template?.includes(null)
            ? 'View Login Template'
            : 'Create Login Template'}
        </Typography>
      ),
      width: 200,
    },
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Login Script
        </Typography>
      ),
      dataIndex: 'login_script',
      key: 'login_script',
      render: (text: string, record: any) => (
        <Typography
          name="Body 4/Medium"
          hoverOnText
          color={token?.colorLink}
          onClick={() => {
            if (record?.login_script && !record?.login_script?.includes(null)) {
              programLoginScriptForm?.setFieldsValue({
                login_script: JSON.parse(record?.login_script),
              });
            } else {
              programLoginScriptForm?.resetFields();
            }
            setSelectPartnerProgramId(record?.id);
            setShowLoginScriptModal(true);
          }}
        >
          {record?.login_script?.length > 0 &&
          !record?.login_script?.includes(null)
            ? 'View Login Script'
            : 'Create Login Script'}
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
            const userData = {
              userID: userId,
            };
            console.log('userData', userId, userData);
            dispatch(launchPlayWright(userData));
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
          Dealer Relationship
        </Typography>
      ),
      dataIndex: 'dealer_relationship',
      key: 'dealer_relationship',

      render: (text: boolean) => <Checkbox checked={text} disabled />,
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
          loading={loading}
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
          loading={loading}
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
          columns={[
            ...PartnerColumnsData,
            {
              title: (
                <Typography name="Body 4/Medium" className="dragHandler">
                  Organization
                </Typography>
              ),
              dataIndex: 'organization',
              key: 'organization',
              render: (text: string) => (
                <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
              ),
              width: 200,
            },
          ]}
          expandable={{
            // eslint-disable-next-line react/no-unstable-nested-components
            expandedRowRender: (record: any) => (
              <OsTable
                columns={[
                  ...partnerProgramColumns,
                  {
                    title: (
                      <Typography name="Body 4/Medium" className="dragHandler">
                        Organization
                      </Typography>
                    ),
                    dataIndex: 'organization',
                    key: 'organization',

                    width: 200,
                  },

                  {
                    title: (
                      <Typography name="Body 4/Medium" className="dragHandler">
                        Rejection Reason
                      </Typography>
                    ),
                    dataIndex: 'organization',
                    key: 'organization',
                    render: (text: any, recordd: any) => (
                      console.log(
                        '3243242342',
                        recordd,
                        recordd?.AssignPartnerProgram?.rejection_reason,
                      ),
                      (
                        <Typography name="Body 4/Regular">
                          {recordd?.AssignPartnerProgram?.rejection_reason ??
                            '--'}
                        </Typography>
                      )
                    ),
                    width: 200,
                  },
                ]}
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
          dataSource={allPartnerData?.DeclinedData}
          scroll
          locale={locale}
          loading={loading}
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
                    record?.user_id,
                    formatStatus(record?.Partner?.partner),
                    formatStatus(record?.partner_program),
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
                      record?.Partner?.partner,
                      record?.partner_program,
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
                setShowRejectModal(true);
                setRejectedRecord(record);

                return;
                // if (!record?.AssignPartnerProgram) {
                //   updateTheAuthorization(
                //     true,
                //     record?.Partner?.id,
                //     record?.id,
                //     'delete',
                //   );
                // } else {
                //   updateRequest(
                //     false,
                //     record?.AssignPartnerProgram?.id,
                //     record?.AssignPartnerProgram?.requested_by,
                //     record?.Partner?.id,
                //     record?.id,
                //     record?.Partner?.partner,
                //     record?.partner_program,
                //   );
                // }
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
  }, [activeTab, userId]);

  const programScript = async () => {
    const programScriptData = programScriptForm?.getFieldsValue();
    const programLoginScriptData = programLoginScriptForm?.getFieldsValue();

    // Create an object with the required ID
    let obj: any = {id: selectPartnerProgramId};

    // Add `script` to the object only if it exists
    if (programScriptData?.script) {
      obj.script = [JSON.stringify(programScriptData.script)];
    }

    // Add `login_script` to the object only if it exists
    if (programLoginScriptData?.login_script) {
      obj.login_script = [JSON.stringify(programLoginScriptData.login_script)];
    }

    // Dispatch the update only if `script` or `login_script` exists
    if (obj.script || obj.login_script) {
      await dispatch(updatePartnerProgramById(obj)).then((d) => {
        getPartnerDataForSuperAdmin();
      });
    }

    // Reset states and forms
    setSelectPartnerProgramId('');
    programScriptForm?.resetFields();
    programLoginScriptForm?.resetFields();
    setShowScriptModal(false);
    setShowLoginScriptModal(false);
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
                  deletePartnerProgramTemplate(formData?.Id, 'form_data');
                }}
              />
              <OsButton
                buttontype="SECONDARY"
                text="EDIT"
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
        bodyPadding={22}
        loading={loading}
        body={
          <>
            {' '}
            <FormBuilderMain
              cartItems={loginTemplateFormData?.formObject}
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
                  deletePartnerProgramTemplate(
                    loginTemplateFormData?.Id,
                    'login_template',
                  );
                }}
              />
              <OsButton
                buttontype="SECONDARY"
                text="EDIT"
                clickHandler={() => {
                  router?.push(
                    `/formBuilder?id=${loginTemplateFormData?.Id}&loginTemplate=true`,
                  );
                }}
              />{' '}
            </Space>
          </>
        }
        width={900}
        open={showLoginTemplateModal}
        onCancel={() => {
          setShowLoginTemplateModal(false);
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
      <OsModal
        loading={insertProgramLoading}
        title="Add Login Script"
        bodyPadding={22}
        body={
          <AddPartnerProgramScript
            form={programLoginScriptForm}
            onFinish={programScript}
            loginScript
          />
        }
        width={583}
        open={showLoginScriptModal}
        onOk={programLoginScriptForm?.submit}
        onCancel={() => {
          setShowLoginScriptModal(false);
        }}
        primaryButtonText={'Save'}
      />

      <OsModal
        loading={loading}
        body={
          <div>
            <Space
              direction="vertical"
              size={12}
              style={{width: '100%', textAlign: 'center'}}
            >
              <Typography
                name="Heading 3/Medium"
                color={token?.colorPrimaryText}
              >
                {`Rejected  Partner Program`}
              </Typography>

              <Typography name="Body 3/Regular" color={token?.colorPrimaryText}>
                Are you sure you want to "Reject" this partner program?{' '}
              </Typography>
            </Space>

            <Form
              layout="vertical"
              onFinish={onFinsh}
              form={form}
              requiredMark={false}
            >
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Reason for Rejection{' '}
                  </Typography>
                }
                name="reason"
                rules={[
                  {
                    required: true,
                    message: 'This is required field!',
                  },
                ]}
              >
                <OsInput
                  value={rejectReason}
                  onChange={(e: any) => {
                    setRejectReason(e?.target?.value);
                  }}
                />
              </SelectFormItem>
            </Form>
            {/* <div style={{marginTop: '10px'}}>
              <Typography name="Body 4/Medium">
                Reason for Rejection{' '}
              </Typography>
              <OsInput
                value={rejectReason}
                onChange={(e: any) => {
                  setRejectReason(e?.target?.value);
                }}
              />
            </div> */}
          </div>
        }
        bodyPadding={40}
        width={511}
        open={showRejectModal}
        // open={true}
        onCancel={() => {
          setShowRejectModal(false);
        }}
        destroyOnClose
        secondaryButtonText="Cancel"
        primaryButtonText="Reject"
        onOk={form.submit}
        styleFooter
      />
    </>
  );
};

export default SuperAdminPartner;
