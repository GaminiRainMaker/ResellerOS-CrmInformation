/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsContactSelect from '@/app/components/common/os-contact-select';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import OsOpportunitySelect from '@/app/components/common/os-opportunity-select';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {
  getDealRegByOpportunityId,
  insertDealReg,
  queryDealReg,
} from '../../../../../redux/actions/dealReg';
import {getAllPartnerandProgramApprovedForOrganizationSalesForce} from '../../../../../redux/actions/partner';
import {
  createSalesforceDealreg,
  createSalesForcePartner,
  createSalesforcePartnerProgram,
} from '../../../../../redux/actions/salesForce';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {CollapseSpaceStyle} from '../dealRegDetail/styled-component';

const NewRegistrationForm: FC<any> = ({
  isDealRegDetail = false,
  setShowModal,
}) => {
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const getOpportunityId = Number(searchParams.get('opportunityId'));
  const getContactId = Number(searchParams.get('contactId'));
  const getCustomerId = Number(searchParams.get('customerId'));

  const salesForceUrl = searchParams.get('instance_url');
  const salesForceKey = searchParams.get('key');
  const salesForceOrganization = searchParams.get('org');
  const salesForceOppId = searchParams.get('oppId');
  const salesForceContactId = searchParams.get('contactId');
  const salesForceCustomerId = searchParams.get('customerId');
  const salesForceUserId = searchParams.get('user_id');

  let pathname = usePathname();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const [formStep, setFormStep] = useState<number>(0);
  const [customerValue, setCustomerValue] = useState<number>();
  const [registeredPartnerData, setRegisteredPartnerData] = useState<any>();
  const [addressData, setAddressData] = useState<any>();
  const [partnerProgramOptions, setPartnerProgrramOptions] = useState();
  const [partnerProgramOptionsForSelf, setPartnerProgrramOptionsForSelf] =
    useState();

  const [selefPartnerOptions, setSelfPartnerOptions] = useState<any>();
  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [choosenIdProgram, setChoosedIdProgram] = useState<any>();
  const [regesteriedPartner, setRegesteriedPartner] = useState<any>();
  const [selfRegesteriedPartner, setSelfRegesteriedPartner] = useState<any>();
  const [errorForAll, setErrorForAll] = useState<boolean>();

  const [allAddedPartnerProgramIDs, setAllAddedPartnerProgramIDs] =
    useState<any>();

  useEffect(() => {
    dispatch(
      getAllPartnerandProgramApprovedForOrganizationSalesForce({
        organization: salesForceOrganization
          ? salesForceOrganization
          : userInformation?.organization,
      }),
    )?.then((payload: any) => {
      setAllFilterPartnerData(payload?.payload);
    });
  }, []);

  useEffect(() => {
    if (isDealRegDetail) {
      dispatch(getAllCustomer({}));
    }
  }, [isDealRegDetail]);

  const dataForTheObjects = form.getFieldsValue();

  useEffect(() => {
    let partnerOptions: any = [];
    let selfPartnerOptions: any = [];

    allPartnerFilterData?.AllPartner?.map((partner: any) => {
      let newCheckArrForHaveProgrmIds: any = [];
      partner?.PartnerPrograms?.map((items: any) => {
        if (!allAddedPartnerProgramIDs?.includes(items?.id)) {
          newCheckArrForHaveProgrmIds?.push(items?.id);
        }
      });
      if (newCheckArrForHaveProgrmIds?.length > 0) {
        partnerOptions?.push({
          label: <CustomTextCapitalization text={partner?.partner} />,
          value: partner?.id,
        });
      }
    });
    allPartnerFilterData?.AllPartnerForSelf?.map((partner: any) => {
      let newCheckArrForHaveProgrmIds: any = [];
      partner?.PartnerPrograms?.map((items: any) => {
        if (!allAddedPartnerProgramIDs?.includes(items?.id)) {
          newCheckArrForHaveProgrmIds?.push(items?.id);
        }
      });
      if (newCheckArrForHaveProgrmIds?.length > 0) {
        selfPartnerOptions?.push({
          label: <CustomTextCapitalization text={partner?.partner} />,
          value: partner?.id,
        });
      }
    });

    setPartnerOptions(partnerOptions);
    setSelfPartnerOptions(selfPartnerOptions);
  }, [allPartnerFilterData, dataForTheObjects?.registeredPartners]);

  const findPartnerProgramsForSelfById = (chosenId: number) => {
    const filteredData = allPartnerFilterData?.AllPartnerForSelf?.filter(
      (item: any) => item?.id === chosenId,
    );

    if (filteredData) {
      let partnerPrograms: any = [];
      filteredData?.[0]?.PartnerPrograms?.map((program: any) => {
        if (!allAddedPartnerProgramIDs?.includes(program?.id)) {
          partnerPrograms?.push({
            label: <CustomTextCapitalization text={program?.partner_program} />,
            value: program?.id,
          });
        }
      });
      setPartnerProgrramOptionsForSelf(partnerPrograms);
    }
  };
  const onHitDeleteTheObjectForSelf = () => {
    findPartnerProgramsForSelfById(choosenIdProgram);
  };

  const findPartnerProgramsById = (chosenId: number) => {
    const filteredData = allPartnerFilterData?.AllPartner?.filter(
      (item: any) => item?.id === chosenId,
    );

    if (filteredData) {
      let partnerPrograms: any = [];
      filteredData?.[0]?.PartnerPrograms?.map((program: any) => {
        if (!allAddedPartnerProgramIDs?.includes(program?.id)) {
          partnerPrograms?.push({
            label: <CustomTextCapitalization text={program?.partner_program} />,
            value: program?.id,
          });
        }
      });
      setPartnerProgrramOptions(partnerPrograms);
    }
  };
  const deleteAddedRow = (index: number, typeOfReges: string) => {
    // selfRegesteriedPartner, setSelfRegesteriedPartner
    let newArr =
      typeOfReges === 'self'
        ? [...selfRegesteriedPartner]
        : [...regesteriedPartner];
    newArr?.splice(index, 1);
    if (typeOfReges === 'self') {
      setSelfRegesteriedPartner(newArr);
    } else {
      setRegesteriedPartner(newArr);
    }
  };

  const addNewPartnerFOrReg = (typeOfWorkFor: string) => {
    let checkIn =
      typeOfWorkFor === 'self' ? selfRegesteriedPartner : regesteriedPartner;
    let newArr = checkIn?.length > 0 ? [...checkIn] : [];
    let newObj = {
      partner_id: '',
      partner_program_id: '',
      partner_name: '',
      partner_program_name: '',
      type: 'regestered',
      optionsForProgram: [],
    };
    newArr?.push(newObj);
    if (typeOfWorkFor === 'self') {
      setSelfRegesteriedPartner(newArr);
    } else {
      setRegesteriedPartner(newArr);
    }
    // setRegesteriedPartner(newArr);
  };

  const AddThePartnerAndPaartnerProgram = (
    index: number,
    partner_id: any,
    partner_program_id: any,
    type: string,
    typeOfWorkFor: string,
    name: string,
  ) => {
    let valueType = type === 'partner' ? partner_id : partner_program_id;
    let typePort = type === 'partner' ? 'partner_id' : 'partner_program_id';
    let nameType = type === 'partner' ? 'partner_name' : 'partner_program_name';
    let checkIn =
      typeOfWorkFor === 'self' ? selfRegesteriedPartner : regesteriedPartner;
    // reges
    const newTempArr = checkIn.map((sectItem: any, sectioIndex: number) => {
      console.log('sectItem', sectItem);
      if (sectioIndex === index) {
        return {
          ...sectItem,
          [typePort]: valueType,
          [nameType]: name,
        };
      }
      return sectItem;
    });

    let newUpdatedArrr = [...newTempArr];

    if (type === 'partner' && typeOfWorkFor === 'reges') {
      const filteredData = allPartnerFilterData?.AllPartner?.filter(
        (item: any) => item?.id === newTempArr[index]?.partner_id,
      );

      let partnerPrograms: any = [];

      if (filteredData) {
        filteredData?.[0]?.PartnerPrograms?.map((program: any) => {
          if (!allAddedPartnerProgramIDs?.includes(program?.id)) {
            partnerPrograms?.push({
              label: (
                <CustomTextCapitalization text={program?.partner_program} />
              ),
              value: program?.id,
            });
          }
        });

        // setPartnerProgrramOptions(partnerPrograms);
        newUpdatedArrr = newTempArr.map(
          (sectItem: any, sectioIndex: number) => {
            if (sectioIndex === index) {
              return {
                ...sectItem,
                optionsForProgram: partnerPrograms,
              };
            }
            return sectItem;
          },
        );
      }
    }
    if (type === 'partner' && typeOfWorkFor === 'self') {
      const filteredData = allPartnerFilterData?.AllPartnerForSelf?.filter(
        (item: any) => item?.id === newTempArr[index]?.partner_id,
      );

      if (filteredData) {
        let partnerPrograms: any = [];
        filteredData?.[0]?.PartnerPrograms?.map((program: any) => {
          if (!allAddedPartnerProgramIDs?.includes(program?.id)) {
            partnerPrograms?.push({
              label: (
                <CustomTextCapitalization text={program?.partner_program} />
              ),
              value: program?.id,
            });
          }
        });

        // setPartnerProgrramOptions(partnerPrograms);
        newUpdatedArrr = newTempArr.map(
          (sectItem: any, sectioIndex: number) => {
            if (sectioIndex === index) {
              return {
                ...sectItem,
                optionsForProgram: partnerPrograms,
              };
            }
            return sectItem;
          },
        );
      }
    }

    if (typeOfWorkFor === 'self') {
      setSelfRegesteriedPartner(newUpdatedArrr);
    } else {
      setRegesteriedPartner(newUpdatedArrr);
    }

    // optionsForProgram
  };

  const registeredFormFinishCurrent = async () => {
    const dataForSelect = form.getFieldsValue();
    let countForNonAdded: number = 0;
    if (regesteriedPartner && regesteriedPartner?.length > 0) {
      regesteriedPartner?.map((items: any) => {
        if (items?.partner_id === '' || items?.partner_program_id === '') {
          countForNonAdded += 1;
        }
      });
    }
    if (selfRegesteriedPartner && selfRegesteriedPartner?.length > 0) {
      selfRegesteriedPartner?.map((items: any) => {
        if (items?.partner_id === '' || items?.partner_program_id === '') {
          countForNonAdded += 1;
        }
      });
    }
    if (countForNonAdded > 0) {
      setErrorForAll(true);
      return;
    } else {
      setErrorForAll(false);
    }

    if (
      regesteriedPartner?.length <= 0 &&
      selfRegesteriedPartner?.length <= 0 &&
      formStep === 0
    ) {
      notification?.open({
        message: 'Please add atleast one partner and partner program.',
        type: 'info',
      });
      return;
    }
    let combinedData: any = [];
    if (registeredPartnerData) {
      combinedData = [
        ...(registeredPartnerData.registeredPartners ?? [])?.map(
          (obj: any) => ({
            ...obj,
            type: 'registered',
          }),
        ),
        ...(registeredPartnerData.selfRegisteredPartners ?? [])?.map(
          (obj: any) => ({
            ...obj,
            type: 'self_registered',
          }),
        ),
      ];
    } else {
      combinedData = [
        ...(regesteriedPartner ?? [])?.map((obj: any) => ({
          ...obj,
          type: 'Registered',
        })),
        ...(selfRegesteriedPartner ?? [])?.map((obj: any) => ({
          ...obj,
          type: 'Self Registered',
        })),
      ];
    }

    let data = {
      selfRegisteredPartners: selfRegesteriedPartner,
      registeredPartners: regesteriedPartner,
    };
    if (formStep === 0 && !isDealRegDetail && !salesForceUrl) {
      setRegisteredPartnerData(data);
      setFormStep(1);
    } else if (
      (registeredPartnerData && formStep === 1) ||
      (data && isDealRegDetail) ||
      (data && salesForceUrl)
    ) {
      let newData: any;
      if (isDealRegDetail) {
        newData = combinedData?.map((obj: any) => ({
          ...obj,
          ...addressData,
          organization: userInformation?.organization,
          opportunity_id: getOpportunityId,
          contact_id: getContactId,
          customer_id: getCustomerId,
          status: 'New',
          user_id: userInformation?.id,
        }));
      } else if (salesForceUrl) {
        newData = combinedData?.map((obj: any) => ({
          ...obj,
        }));
      } else {
        newData = combinedData?.map((obj: any) => ({
          ...obj,
          ...dataForSelect,
          ...addressData,
          organization: userInformation?.organization,
          status: 'New',
          user_id: userInformation?.id,
        }));
      }
      if (salesForceUrl) {
        const dealRegArray = newData?.map((item: any) => ({
          rosdealregai__Opportunity__c: salesForceOppId,
          rosdealregai__Partner__r: {
            rosdealregai__External_Id__c: item?.partner_id,
          },
          rosdealregai__Partner_Program__r: {
            rosdealregai__External_Id__c: item?.partner_program_id,
          },
        }));
        try {
          const dealRegResponses = await Promise.all(
            dealRegArray?.map(async (dealreg: any) => {
              const response = await dispatch(
                createSalesforceDealreg({
                  baseURL: salesForceUrl,
                  token: salesForceKey,
                  data: dealreg,
                }),
              );
              return response;
            }),
          );

          // Check if any deal registration creation failed
          for (const response of dealRegResponses) {
            if (response.status === 400 && response.success === false) {
              notification.error({
                message: 'Error',
                description: `Error creating deal registration: ${response.errors.join(', ') || 'Unknown error'}`,
              });
              return; // Stop further execution
            }
          }
          // If all APIs succeed, show success notification and navigate
          notification.success({
            message: 'Success',
            description: 'Dealreg form created successfully.',
          });
          window.history.replaceState(
            null,
            '',
            `/dealRegDetail?opportunityId=${salesForceOppId}&instance_url=${salesForceUrl}&key=${salesForceKey}&customerId=${salesForceCustomerId}&contactId=${salesForceContactId}&user_id=${salesForceUserId}`,
          );
          location?.reload();
        } catch (error: any) {
          notification.error({
            message: 'Error',
            description: `Error creating entries: ${error.message}`,
          });
          console.error('Error creating entries:', error);
        }
      } else {
        await dispatch(insertDealReg(newData)).then((d: any) => {
          if (d?.payload) {
            if (pathname === '/dealReg') {
              router?.push(
                `/dealRegDetail?opportunityId=${d?.payload?.[0]?.opportunity_id}&customerId=${d?.payload?.[0]?.customer_id}&contactId=${d?.payload?.[0]?.contact_id}`,
              );
            }
            if (isDealRegDetail) {
              dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
            } else {
              dispatch(queryDealReg(''));
            }
          } else {
            notification?.open({
              message: 'This Combination already exists.',
              type: 'info',
            });
            dispatch(queryDealReg(''));
            dispatch(getDealRegByOpportunityId(Number(getOpportunityId)));
          }
        });
        setShowModal(false);
      }
      if (pathname === '/opportunityDetail') {
        location.reload();
      }
    }
  };

  return (
    <>
      <Form
        name="dynamic_form_nest_item"
        onFinish={registeredFormFinishCurrent}
        style={{maxWidth: 600}}
        form={form}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        {formStep === 0 ? (
          <>
            <CollapseSpaceStyle size={24} direction="vertical">
              <OsCollapseAdmin
                items={[
                  {
                    key: '1',
                    label: (
                      <Typography name="Body 2/Medium">
                        Registered Partners
                      </Typography>
                    ),
                    children: (
                      <>
                        <>
                          {regesteriedPartner?.map(
                            (items: any, index: number) => {
                              return (
                                <Row
                                  justify="space-between"
                                  align="middle"
                                  gutter={[16, 16]}
                                  key={index}
                                  style={{
                                    marginBottom: '8px',
                                  }}
                                >
                                  <Col span={10}>
                                    <Typography name="Body 4/Medium">
                                      Partner
                                    </Typography>
                                    <CommonSelect
                                      dropdownStyle={{marginBottom: '3px'}}
                                      value={items.partner_id}
                                      placeholder="Select"
                                      style={{
                                        width: '100%',
                                        height: '36px',
                                        marginBottom:
                                          !items?.partner_id && errorForAll
                                            ? ''
                                            : '24px',
                                      }}
                                      options={partnerOptions}
                                      onChange={(e, record: any) => {
                                        AddThePartnerAndPaartnerProgram(
                                          index,
                                          e,
                                          '',
                                          'partner',
                                          'reges',
                                          record?.label?.props?.text,
                                        );
                                      }}
                                    />
                                    {!items?.partner_id && errorForAll && (
                                      <div style={{color: '#ff4d4f'}}>
                                        Partner is required!
                                      </div>
                                    )}
                                  </Col>
                                  <Col span={10}>
                                    <Typography name="Body 4/Medium">
                                      Partner Program
                                    </Typography>

                                    <CommonSelect
                                      // dropdownStyle={{ marginBottom: "3px" }}
                                      placeholder="Select"
                                      value={items?.partner_program_id}
                                      options={items?.optionsForProgram}
                                      onChange={(e: any, record: any) => {
                                        AddThePartnerAndPaartnerProgram(
                                          index,
                                          '',
                                          e,
                                          'partnerprogram',
                                          'reges',
                                          record?.label?.props?.text,
                                        );

                                        let AllIds: any =
                                          allAddedPartnerProgramIDs?.length > 0
                                            ? [...allAddedPartnerProgramIDs]
                                            : [];
                                        AllIds?.push(e);
                                        setAllAddedPartnerProgramIDs(AllIds);
                                      }}
                                      style={{
                                        width: '100%',
                                        height: '36px',
                                        marginBottom:
                                          !items?.partner_program_id &&
                                          errorForAll
                                            ? ''
                                            : '24px',
                                      }}
                                    />
                                    {!items?.partner_program_id &&
                                      errorForAll && (
                                        <div style={{color: '#ff4d4f'}}>
                                          Partner Program is required!
                                        </div>
                                      )}
                                  </Col>
                                  <Col
                                    span={4}
                                    style={{
                                      paddingTop: '25px',
                                      marginBottom:
                                        !items?.partner_program_id &&
                                        errorForAll
                                          ? '24px'
                                          : '24px',
                                    }}
                                  >
                                    <TrashIcon
                                      width={25}
                                      color={token?.colorError}
                                      onClick={() => {
                                        let AllIds: any =
                                          allAddedPartnerProgramIDs?.length > 0
                                            ? [...allAddedPartnerProgramIDs]
                                            : [];
                                        let FindIndex = AllIds?.findIndex(
                                          (idIndex: any) =>
                                            idIndex ===
                                            items?.partner_program_id,
                                        );

                                        if (FindIndex >= 0) {
                                          AllIds?.splice(FindIndex, 1);
                                        }
                                        // AllIds?.push(e);
                                        setAllAddedPartnerProgramIDs(AllIds);
                                        deleteAddedRow(index, 'reges');
                                      }}
                                      cursor="pointer"
                                    />
                                  </Col>
                                </Row>
                              );
                            },
                          )}
                          <Form.Item>
                            <Space
                              size={4}
                              style={{
                                width: '100%',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                // add();
                                addNewPartnerFOrReg('reges');
                              }}
                            >
                              <PlusIcon
                                width={24}
                                color={token?.colorLink}
                                style={{marginTop: '5px'}}
                              />
                              <Typography
                                name="Body 3/Bold"
                                color={token?.colorLink}
                                cursor="pointer"
                              >
                                Add Partner and Partner Program
                              </Typography>
                            </Space>
                          </Form.Item>
                        </>
                      </>
                    ),
                  },
                ]}
              />
            </CollapseSpaceStyle>

            <CollapseSpaceStyle size={24} direction="vertical">
              <OsCollapseAdmin
                items={[
                  {
                    key: '1',
                    label: (
                      <Typography name="Body 2/Medium">
                        Self Registered Partners
                      </Typography>
                    ),
                    children: (
                      <>
                        <>
                          {selfRegesteriedPartner?.map(
                            (items: any, index: number) => {
                              return (
                                <Row
                                  justify="space-between"
                                  align="middle"
                                  gutter={[16, 16]}
                                  key={index}
                                  style={{
                                    marginBottom: '8px',
                                  }}
                                >
                                  <Col span={10}>
                                    <Typography name="Body 4/Medium">
                                      Partner
                                    </Typography>
                                    <CommonSelect
                                      dropdownStyle={{marginBottom: '3px'}}
                                      value={items.partner_id}
                                      placeholder="Select"
                                      style={{
                                        width: '100%',
                                        height: '36px',
                                        marginBottom:
                                          !items?.partner_id && errorForAll
                                            ? ''
                                            : '24px',
                                      }}
                                      options={selefPartnerOptions}
                                      onChange={(e, record: any) => {
                                        // findPartnerProgramsById(value);
                                        // setChoosedIdProgram(value);
                                        AddThePartnerAndPaartnerProgram(
                                          index,
                                          e,
                                          '',
                                          'partner',
                                          'self',
                                          record?.label?.props?.text,
                                        );
                                      }}
                                    />
                                    {!items?.partner_id && errorForAll && (
                                      <div style={{color: '#ff4d4f'}}>
                                        Partner is required!
                                      </div>
                                    )}
                                  </Col>
                                  <Col span={10}>
                                    <Typography name="Body 4/Medium">
                                      Partner Program
                                    </Typography>

                                    <CommonSelect
                                      dropdownStyle={{marginBottom: '3px'}}
                                      placeholder="Select"
                                      value={items?.partner_program_id}
                                      options={items?.optionsForProgram}
                                      onChange={(e: any, record: any) => {
                                        AddThePartnerAndPaartnerProgram(
                                          index,
                                          '',
                                          e,
                                          'partnerprogram',
                                          'self',
                                          record?.label?.props?.text,
                                        );

                                        let AllIds: any =
                                          allAddedPartnerProgramIDs?.length > 0
                                            ? [...allAddedPartnerProgramIDs]
                                            : [];
                                        AllIds?.push(e);
                                        setAllAddedPartnerProgramIDs(AllIds);
                                      }}
                                      style={{
                                        width: '100%',
                                        height: '36px',
                                        marginBottom:
                                          !items?.partner_program_id &&
                                          errorForAll
                                            ? ''
                                            : '24px',
                                      }}
                                    />
                                    {!items?.partner_program_id &&
                                      errorForAll && (
                                        <div style={{color: '#ff4d4f'}}>
                                          Partner Program is required!
                                        </div>
                                      )}
                                  </Col>
                                  <Col
                                    span={4}
                                    style={{
                                      paddingTop: '25px',
                                      marginBottom:
                                        !items?.partner_program_id &&
                                        errorForAll
                                          ? '24px'
                                          : '24px',
                                    }}
                                  >
                                    <TrashIcon
                                      width={25}
                                      color={token?.colorError}
                                      onClick={() => {
                                        let AllIds: any =
                                          allAddedPartnerProgramIDs?.length > 0
                                            ? [...allAddedPartnerProgramIDs]
                                            : [];
                                        let FindIndex = AllIds?.findIndex(
                                          (idIndex: any) =>
                                            idIndex ===
                                            items?.partner_program_id,
                                        );
                                        if (FindIndex >= 0) {
                                          AllIds?.splice(FindIndex, 1);
                                        }
                                        // AllIds?.push(e);
                                        setAllAddedPartnerProgramIDs(AllIds);
                                        deleteAddedRow(index, 'self');
                                      }}
                                      cursor="pointer"
                                    />
                                  </Col>
                                </Row>
                              );
                            },
                          )}
                          <Form.Item>
                            <Space
                              size={4}
                              style={{
                                width: '100%',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                // add();
                                addNewPartnerFOrReg('self');
                              }}
                            >
                              <PlusIcon
                                width={24}
                                color={token?.colorLink}
                                style={{marginTop: '5px'}}
                              />
                              <Typography
                                name="Body 3/Bold"
                                color={token?.colorLink}
                                cursor="pointer"
                              >
                                Add Partner and Partner Program
                              </Typography>
                            </Space>
                          </Form.Item>
                        </>
                      </>
                    ),
                  },
                ]}
              />
            </CollapseSpaceStyle>
          </>
        ) : (
          <>
            <Typography name="Body 2/Medium" color={token?.colorPrimaryText}>
              Fill Details
            </Typography>

            <Row justify="space-between">
              <Col span={24}>
                <OsCustomerSelect
                  setCustomerValue={setCustomerValue}
                  customerValue={customerValue}
                  isAddNewCustomer
                  isRequired
                />
              </Col>
              <Col span={24}>
                <OsContactSelect
                  customerValue={customerValue}
                  name="contact_id"
                  isAddNewContact
                  form={form}
                />
              </Col>

              <Col span={24}>
                <OsOpportunitySelect
                  form={form}
                  customerValue={customerValue}
                  isAddNewOpportunity
                />
              </Col>
            </Row>
          </>
        )}
      </Form>

      <Row justify={formStep === 1 ? 'space-between' : 'end'}>
        {formStep === 1 && (
          <OsButton
            text="Back"
            buttontype="SECONDARY"
            clickHandler={() => {
              setFormStep(0);
            }}
          />
        )}
        <OsButton
          text={
            formStep === 0 && !isDealRegDetail && !salesForceUrl
              ? 'Save & Next'
              : isDealRegDetail || salesForceUrl
                ? 'Save'
                : 'Save & Continue'
          }
          buttontype="PRIMARY"
          clickHandler={form.submit}
        />
      </Row>
    </>
  );
};

export default NewRegistrationForm;
