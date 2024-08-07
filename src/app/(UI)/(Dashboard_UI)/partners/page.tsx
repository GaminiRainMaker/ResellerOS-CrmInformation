/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import FormBuilderMain from '@/app/components/common/formBuilder/page';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import RequestPartner from '@/app/components/common/os-add-partner/RequestPartner';
import OsButton from '@/app/components/common/os-button';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsModal from '@/app/components/common/os-modal';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {formatDate, partnerProgramFilter} from '@/app/utils/base';
import {PlusIcon} from '@heroicons/react/24/outline';
import {Checkbox, Form} from 'antd';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import {insertAssignPartnerProgram} from '../../../../../redux/actions/assignPartnerProgram';
import {getAllPartnerandProgramFilterData} from '../../../../../redux/actions/partner';
import {getUnassignedProgram} from '../../../../../redux/actions/partnerProgram';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import PartnerAnalytics from './partnerAnalytics';
import OsInput from '@/app/components/common/os-input';
import useDebounceHook from '@/app/components/common/hooks/useDebounceHook';
import {getUserByTokenAccess} from '../../../../../redux/actions/user';
import {addNotificationFOrProgramRequest} from '../../../../../redux/actions/notifications';

const Partners: React.FC = () => {
  const [token] = useThemeToken();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [loadingForRequest, setLoadingForRequest] = useState<boolean>(false);

  const getTabId = searchParams.get('tab');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [allPartnerData, setAllPartnerData] = useState<any>();
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const [allPartnerAnalyticData, setAllAnalyticPartnerData] = useState<any>();
  const [formData, setformData] = useState<any>();
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
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
    setAllAnalyticPartnerData(newObj);
  };

  const addNotificationFortemplate = async (
    partner_program_id: number,
    name: string,
  ) => {
    let newObj = {
      title: 'Reseller Resuested Program Template',
      description: `Reseller reequest for ${name} partner program tenplate `,
      type_id: partner_program_id,
      type: 'formBuilder',
      partner_program_id: partner_program_id,
    };

    await dispatch(addNotificationFOrProgramRequest(newObj));
    getPartnerData();
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
            Action
          </Typography>
        ),
        dataIndex: 'Action',
        key: 'Action',
        render: (_: string, record: any) => (
          console.log('recordrecord', record),
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
                    ) : record?.AssignPartnerProgram?.is_approved === null ? (
                      'Requested For the Access'
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
          }}
          dataSource={allPartnerData?.AllPartner}
          scroll
          locale={locale}
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
          }}
          dataSource={allPartnerData?.approved}
          scroll
          locale={locale}
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
          locale={locale}
          loading={false}
          drag
        />
      ),
    },
  ];

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
                text="Request Partner"
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
          <OsTabs
            activeKey={activeTab?.toString()}
            items={tabItems}
            tabBarExtraContent={
              <Space size={12} align="center">
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Partner</Typography>
                  <OsInput
                    value={queryDataa?.partnerQuery}
                    onChange={(e: any) => {
                      setQueryData({
                        ...queryDataa,
                        partnerQuery: e?.target?.value,
                      });
                    }}
                  />
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography name="Body 4/Medium">Partner Program</Typography>
                  <OsInput
                    value={queryDataa?.partnerprogramQuery}
                    onChange={(e: any) => {
                      setQueryData({
                        ...queryDataa,
                        partnerprogramQuery: e?.target?.value,
                      });
                    }}
                  />
                </Space>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px',
                  }}
                >
                  <Typography
                    cursor="pointer"
                    name="Button 1"
                    style={{cursor: 'pointer'}}
                    color={token?.colorLink}
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
            }
          />
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
          />
        }
        width={800}
        open={showModal}
        onCancel={() => {
          setShowModal((p) => !p);
          form.resetFields();
        }}
        footer
        primaryButtonText="Request"
        onOk={form?.submit}
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
            {/* <Space
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
            </Space> */}
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
