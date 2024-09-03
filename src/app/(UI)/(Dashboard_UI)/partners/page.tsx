/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import FormBuilderMain from '@/app/components/common/formBuilder/page';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import RequestPartner from '@/app/components/common/os-add-partner/RequestPartner';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {formatDate} from '@/app/utils/base';
import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline';
import {Checkbox, Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {
  insertAssignPartnerProgram,
  updateForTheResellerRequest,
} from '../../../../../redux/actions/assignPartnerProgram';
import {
  getAllPartnerandProgramFilterData,
  upadteRequestForOrgNewPartnerApproval,
} from '../../../../../redux/actions/partner';
import {getUnassignedProgram} from '../../../../../redux/actions/partnerProgram';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import PartnerAnalytics from './partnerAnalytics';

const Partners: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const [loadingForRequest, setLoadingForRequest] = useState<boolean>(false);
  const {userInformation} = useAppSelector((state) => state.user);
  const getTabId = searchParams.get('tab');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [allPartnerData, setAllPartnerData] = useState<any>();
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const [allPartnerAnalyticData, setAllAnalyticPartnerData] = useState<any>();
  const [formData, setformData] = useState<any>();
  const [partnerNewId, setPartnerNewId] = useState<any>();
  const [partnerProgramNewId, setPartnerProgramNewId] = useState<any>();
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);

  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [partnerProgramOptions, setPartnerProgramOptions] = useState<any>();

  const [queryDataa, setQueryData] = useState<{
    partnerQuery: string;
    partnerprogramQuery: string;
    size: number;
  }>({
    partnerQuery: '',
    partnerprogramQuery: '',
    size: 10,
  });
  const [requestPartnerLoading, setRequestPartnerLoading] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<any>();

  const getPartnerData = async () => {
    let allPartnerObj: any;
    await dispatch(getAllPartnerandProgramFilterData({}))?.then(
      (payload: any) => {
        allPartnerObj = payload?.payload;
        setAllPartnerData(payload?.payload);
      },
    );
    let countForActivePartnerProgram = 0;

    if (allPartnerObj?.approved?.length > 0 && allPartnerObj?.approved) {
      allPartnerObj?.approved?.map((items: any) => {
        countForActivePartnerProgram =
          countForActivePartnerProgram + items?.PartnerPrograms?.length;
      });
    }
    let newObj = {
      requested: allPartnerObj?.requested?.length,
      allPartner: allPartnerObj?.AllPartner?.length,
      activePartner: allPartnerObj?.approved?.length,
      ActivePartnerProgram: countForActivePartnerProgram,
    };

    let newArrOfPartner: any = [];
    let newArrOfPartnerProgram: any = [];

    allPartnerObj?.AllPartner?.map((items: any) => {
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

    setAllAnalyticPartnerData(newObj);
  };

  useEffect(() => {
    dispatch(getUnassignedProgram());
    dispatch(getUserByTokenAccess(''))?.then((payload: any) => {
      setUserData(payload?.payload);
    });
    getPartnerData();
  }, []);

  let organizationNameForRequest = userData?.organization;
  const searchQuery = useDebounceHook(queryDataa, 500);

  useEffect(() => {
    dispatch(getAllPartnerandProgramFilterData(searchQuery))?.then(
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
  // useEffect(() => {
  //   const FilterArrayDataa = partnerProgramFilter(
  //     'user',
  //     userData,
  //     allPartnerData,
  //     activeTab,
  //   );
  //   setAllAnalyticPartnerData(FilterArrayDataa);
  //   const newArrForTab3: any = [];
  //   if (activeTab === 3) {
  //     FilterArrayDataa?.filterData?.map((items: any) => {
  //       items?.PartnerPrograms?.map((itemInner: any) => {
  //         const newObj: any = {
  //           ...itemInner,
  //           partner_email: items?.email,
  //           partner_name: items?.partner,
  //         };
  //         newArrForTab3?.push(newObj);
  //       });
  //     });
  //   }
  //   if (activeTab === 3) {
  //     setAllFilterPartnerData(newArrForTab3);
  //   } else {
  //     setAllFilterPartnerData(FilterArrayDataa?.filterData);
  //   }
  // }, [allPartnerData, activeTab]);

  const locale = {
    emptyText: <EmptyContainer title="No Files" />,
  };
  const localeWithButton = {
    emptyText: (
      <EmptyContainer
        title="No Files"
        actionButton={activeTab === 1 ? 'Request Partner' : ''}
        onClick={() => setShowModal((p) => !p)}
      />
    ),
  };

  const [partnerProgramColumns, setPartnerProgramColumns] = useState<any>();

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
      width: 400,
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
              const formDataObject = record?.form_data
                ? JSON?.parse(record?.form_data)
                : '';
              setformData({formObject: formDataObject, Id: record?.id});
              // open modal to view form
            }
          }}
        >
          {record?.form_data && !record?.form_data?.includes(null)
            ? 'View'
            : 'No Template'}
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
      render: (text: string) => <CustomTextCapitalization text={text} />,
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
        <Typography name="Body 4/Regular">
          {formatDate(text, 'MM/DD/YYYY | HH:MM')}
        </Typography>
      ),
    },
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
        console.log('recordrecord', record),
        (<CustomTextCapitalization text={record?.Partner?.partner} />)
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
          {record?.Partner?.email ?? '--'}
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
      render: (text: string) => <CustomTextCapitalization text={text} />,
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
          New Partner Program
        </Typography>
      ),
      dataIndex: 'description',
      key: 'description',
      render: (text: any, record: any) => (
        <Checkbox
          checked={!record?.AssignPartnerProgram ? true : false}
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
      width: 400,
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
            }
          }}
        >
          {record?.form_data && !record?.form_data?.includes(null)
            ? 'View'
            : 'No Template'}
        </Typography>
      ),
    },
  ];

  const updateTheResellerequest = async (record: any, typeOn: any) => {
    let obj = {
      type: typeOn,
      id: record?.AssignPartnerProgram?.id,
    };
    return;
    await dispatch(updateForTheResellerRequest(obj));

    getPartnerData();
  };

  const updateTheResellerequestForPartnerNew = async (
    record: any,
    typeOn: any,
  ) => {
    let obj = {
      type: typeOn,
      partner_id: record?.Partner?.id,
      partner_program_id: record?.id,
    };

    await dispatch(upadteRequestForOrgNewPartnerApproval(obj));

    getPartnerData();
  };
  const PartnerProgramColumnsTab4 = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Partner Name
        </Typography>
      ),
      dataIndex: 'partner_program',
      key: 'partner_program',
      render: (text: string, record: any) => (
        console.log('recordrecord', record),
        (<CustomTextCapitalization text={record?.Partner?.partner} />)
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
          {record?.Partner?.email ?? '--'}
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
      render: (text: string) => <CustomTextCapitalization text={text} />,
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
              if (record?.AssignPartnerProgram) {
                updateTheResellerequest(record, 'admin_request');
              } else {
                updateTheResellerequestForPartnerNew(record, 'admin_request');
              }
            }}
          />{' '}
          <OsButton
            btnStyle={{height: '32px'}}
            buttontype="SECONDARY"
            text="Decline"
            clickHandler={() => {
              if (record?.AssignPartnerProgram) {
                updateTheResellerequest(record, 'is_deleted');
              } else {
                updateTheResellerequestForPartnerNew(record, 'admin_request');
              }
            }}
          />
        </Space>
      ),
    },
  ];

  // console.log('userInformationuserInformation', userData);
  const handleAddNewAssignedPartnerProgramRequest = async (
    id: number,
    userData: any,
  ) => {
    // setLoadingForRequest(true);
    const partnerObj = {
      organization: userData?.organization
        ? userData?.organization
        : organizationNameForRequest,
      requested_by: userData?.id,
      new_request: false,
      partner_program_id: id,
      userResquest: true,
      admin_request: userData?.is_admin ? true : false,
    };

    await dispatch(insertAssignPartnerProgram(partnerObj));
    getPartnerData();
    setLoadingForRequest(false);
  };

  useEffect(() => {
    if (activeTab === 1) {
      const newArr = [...PartnerProgramColumns];
      const newObj: any = {
        title: (
          <Typography name="Body 4/Medium" className="dragHandler">
            {activeTab === 1 ? 'Partner Program Status' : 'Action'}
          </Typography>
        ),
        dataIndex: 'Action',
        key: 'Action',
        render: (_: string, record: any) => (
          (
            <>
              {!record?.AssignPartnerProgram ? (
                <OsButton
                  buttontype="PRIMARY"
                  text="Request"
                  clickHandler={() => {
                    handleAddNewAssignedPartnerProgramRequest(
                      record?.id,
                      userData,
                    );
                  }}
                />
              ) : (
                <>
                  <Typography
                    name="Body 4/Medium"
                    hoverOnText
                    color={token?.colorLink}
                  >
                    {record?.AssignPartnerProgram?.is_approved ? (
                      'Appproved for your Organization'
                    ) : !record?.AssignPartnerProgram?.admin_request ? (
                      `'Sent for admin approval to request access from the Super Admin.`
                    ) : record?.AssignPartnerProgram?.is_approved === null ? (
                      'Requested for Access'
                    ) : (
                      <OsButton
                        buttontype="PRIMARY"
                        text="Request"
                        clickHandler={() => {
                          handleAddNewAssignedPartnerProgramRequest(
                            record?.id,
                            userData,
                          );
                        }}
                      />
                    )}
                  </Typography>
                </>
              )}
            </>
          )
        ),
      };
      newArr?.push(newObj);
      setPartnerProgramColumns(newArr);
    } else {
      setPartnerProgramColumns(PartnerProgramColumns);
    }
  }, [activeTab, userData]);

  console.log('allPartnerDataallPartnerData', allPartnerData);
  const [allTabItem, setAllTabItem] = useState<any>();
  const tabItems = [
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(1);
          }}
          name="Body 4/Regular"
        >
          All Partners
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
                loading={loadingForRequest}
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
          locale={activeTab === 1 ? locale : localeWithButton}
          loading={loadingForRequest}
          drag
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(2);
          }}
          name="Body 4/Regular"
        >
          Active Partners
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={PartnerColumns}
          drag
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
          dataSource={allPartnerData?.approved}
          scroll
          locale={activeTab === 1 ? locale : localeWithButton}
          loading={false}
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(3);
          }}
          name="Body 4/Regular"
        >
          Requested
        </Typography>
      ),
      key: '3',
      children: (
        <OsTable
          columns={PartnerProgramColumnsTab3}
          dataSource={allPartnerData?.requested}
          scroll
          locale={activeTab === 1 ? locale : localeWithButton}
          loading={false}
          drag
        />
      ),
    },
  ];
  const tabItemsAdmin = [
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(1);
          }}
          name="Body 4/Regular"
        >
          All Partners
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
                loading={loadingForRequest}
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
          locale={activeTab === 1 ? locale : localeWithButton}
          loading={loadingForRequest}
          drag
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(2);
          }}
          name="Body 4/Regular"
        >
          Active Partners
        </Typography>
      ),
      key: '2',
      children: (
        <OsTable
          columns={PartnerColumns}
          drag
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
          dataSource={allPartnerData?.approved}
          scroll
          locale={activeTab === 1 ? locale : localeWithButton}
          loading={false}
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(3);
          }}
          name="Body 4/Regular"
        >
          Requested
        </Typography>
      ),
      key: '3',
      children: (
        <OsTable
          columns={PartnerProgramColumnsTab3}
          dataSource={allPartnerData?.requested}
          scroll
          locale={activeTab === 1 ? locale : localeWithButton}
          loading={false}
          drag
        />
      ),
    },
    {
      label: (
        <Typography
          cursor="pointer"
          onClick={() => {
            setActiveTab(4);
          }}
          name="Body 4/Regular"
        >
          Organization Requests
        </Typography>
      ),
      key: '4',
      children: (
        <OsTable
          columns={PartnerProgramColumnsTab4}
          dataSource={allPartnerData?.RequestedRessellerData}
          scroll
          locale={activeTab === 1 ? locale : localeWithButton}
          loading={false}
          drag
        />
      ),
    },
  ];
  useEffect(() => {
    if (userInformation?.Admin) {
      setAllTabItem(tabItemsAdmin);
    } else {
      setAllTabItem(tabItems);
    }
  }, [userInformation, allPartnerData]);

  return (
    <>
      <Space size={24} direction="vertical" style={{width: '100%'}}>
        <PartnerAnalytics data={allPartnerAnalyticData} />
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              All Partners
            </Typography>
          </Col>

          {activeTab === 1 && (
            <Col style={{display: 'flex', alignItems: 'center'}}>
              <OsButton
                text="Request Partner and Partner Program"
                buttontype="PRIMARY"
                icon={<PlusIcon />}
                clickHandler={() => setShowModal((p) => !p)}
              />
            </Col>
          )}
        </Row>

        <Row
          style={{background: 'white', padding: '24px', borderRadius: '12px'}}
        >
          {userInformation && (
            <OsTabs
              activeKey={activeTab?.toString()}
              items={allTabItem}
              // items={userInformation?.Admin ? tabItemsAdmin : tabItems}
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
                    <Typography name="Body 4/Medium">
                      {' '}
                      Partner Program
                    </Typography>
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
                      color={'#C6CDD5'}
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
                //     <Typography name="Body 4/Medium">
                //       Partner Program
                //     </Typography>
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
                //         setQueryData({
                //           partnerQuery: '',
                //           partnerprogramQuery: '',
                //           size: 10,
                //         });
                //       }}
                //     >
                //       Reset
                //     </Typography>
                //   </div>
                // </Space>
              }
            />
          )}
        </Row>
      </Space>

      <OsModal
        loading={requestPartnerLoading}
        body={
          <RequestPartner
            form={form}
            setOpen={setShowModal}
            setRequestPartnerLoading={setRequestPartnerLoading}
            getPartnerData={getPartnerData}
            setPartnerNewId={setPartnerNewId}
            partnerNewId={partnerNewId}
            partnerProgramNewId={partnerProgramNewId}
            setPartnerProgramNewId={setPartnerProgramNewId}
            setShowModal={setShowModal}
          />
        }
        width={700}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
          setPartnerProgramNewId({});
          setPartnerNewId({});
          form.resetFields();
        }}
        footer
        footerPadding={30}
      />

      <OsModal
        bodyPadding={22}
        loading={false}
        body={
          <>
            {' '}
            <FormBuilderMain
              cartItems={formData?.formObject}
              form={form}
              // eslint-disable-next-line react/jsx-boolean-value
              previewFile
            />
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
  );
};
export default Partners;
