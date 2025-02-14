/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import RequestPartner from '@/app/components/common/os-add-partner/RequestPartner';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsContactSelect from '@/app/components/common/os-contact-select';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import OsModal from '@/app/components/common/os-modal';
import OsOpportunitySelect from '@/app/components/common/os-opportunity-select';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {formatMailString, handleDate} from '@/app/utils/base';
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
import {
  getAllPartnerandProgramApprovedForOrganization,
  getAllPartnerandProgramApprovedForOrganizationSalesForce,
  insertPartner,
} from '../../../../../redux/actions/partner';
import {insertPartnerProgram} from '../../../../../redux/actions/partnerProgram';
import {
  createSalesforceDealreg,
  getSalesForceActivePartners,
  updatePartnersandProgramIdFromFS,
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

  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const {userInformation} = useAppSelector((state) => state.user);
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const [formStep, setFormStep] = useState<number>(0);
  const [customerValue, setCustomerValue] = useState<number>();
  const [registeredPartnerData, setRegisteredPartnerData] = useState<any>();
  const [addressData, setAddressData] = useState<any>();
  const [selefPartnerOptions, setSelfPartnerOptions] = useState<any>();
  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [regesteriedPartner, setRegesteriedPartner] = useState<any>();
  const [selfRegesteriedPartner, setSelfRegesteriedPartner] = useState<any>();
  const [salesForceSelfRegisteredPartner, setSalesForceSelfRegisteredPartner] =
    useState<any>();
  const [
    salesForceSelfRegisteredPartnerOption,
    setSalesForceSelfRegisteredPartnerOption,
  ] = useState<any>();
  const [errorForAll, setErrorForAll] = useState<boolean>();
  const [allAddedPartnerProgramIDs, setAllAddedPartnerProgramIDs] =
    useState<any>();
  const [openReponseModal, setOpenReponseModal] = useState<boolean>(false);
  const [requestPartnerLoading, setRequestPartnerLoading] =
    useState<boolean>(false);
  const [partnerNewId, setPartnerNewId] = useState<any>();
  const [partnerProgramNewId, setPartnerProgramNewId] = useState<any>();
  const {isCanvas, isDecryptedRecord} = useAppSelector((state) => state.canvas);
  // Initialize variables with default values
  let salesForceinstanceUrl: string | undefined;
  let salesForceToken: string | undefined;
  let salesForceOpportunityId: string | undefined;
  let salesForceOrganizationId: string | undefined;
  let salesForceOrganizationName: string | undefined;
  let salesForceUserId: string | undefined;

  if (isDecryptedRecord) {
    const {client, context} = isDecryptedRecord as any;
    salesForceinstanceUrl = client?.instanceUrl;
    salesForceToken = client?.oauthToken;

    const {environment, organization, user} = context || {};
    const {parameters} = environment || {};
    salesForceOpportunityId = parameters?.recordId;
    salesForceOrganizationId = organization?.organizationId;
    salesForceOrganizationName = organization?.name;
    salesForceUserId = user?.userId;
  }

  useEffect(() => {
    if (isCanvas) {
      dispatch(
        getAllPartnerandProgramApprovedForOrganizationSalesForce({
          org_id: salesForceOrganizationId,
        }),
      )?.then((payload: any) => {
        setAllFilterPartnerData(payload?.payload);
      });
      dispatch(
        getSalesForceActivePartners({
          baseURL: salesForceinstanceUrl,
          token: salesForceToken,
        }),
      ).then((res) => {
        if (res?.payload?.PartnerPrograms) {
          console.log({res});

          const transformedData = Object.values(
            res?.payload?.PartnerPrograms?.reduce((acc: any, item: any) => {
              const {
                Partner_Name,
                Partner_ExternalId,
                Partner_Id,
                Partner_Program_Name,
                Partner_Program_ExternalId,
                Partner_Program_Id,
              } = item;

              if (!acc[Partner_Id]) {
                acc[Partner_Id] = {
                  Partner_Name,
                  Partner_ExternalId,
                  Partner_Id,
                  PartnerPrograms: [],
                };
              }

              acc[Partner_Id].PartnerPrograms.push({
                Partner_Program_Name,
                Partner_Program_ExternalId,
                Partner_Program_Id,
              });

              return acc;
            }, {}),
          );
          if (transformedData)
            setSalesForceSelfRegisteredPartner(transformedData);
        }
      });
    } else {
      dispatch(
        getAllPartnerandProgramApprovedForOrganization({
          organization: userInformation?.organization,
        }),
      )?.then((payload: any) => {
        setAllFilterPartnerData(payload?.payload);
      });
    }
  }, []);

  useEffect(() => {
    if (isDealRegDetail) {
      dispatch(getAllCustomer({}));
    }
  }, [isDealRegDetail]);

  const dataForTheObjects = form.getFieldsValue();

  useEffect(() => {
    const partnerOptions: any = [];
    const selfPartnerOptions: any = [];
    let finalPartnerData: any = [];
    if (
      salesForceSelfRegisteredPartner &&
      salesForceSelfRegisteredPartner?.length > 0 &&
      isCanvas
    ) {
      finalPartnerData =
        allPartnerFilterData?.AllPartner?.filter((fullstackItem: any) =>
          salesForceSelfRegisteredPartner?.some(
            (salesforceItem: any) =>
              salesforceItem?.Partner_Name === fullstackItem?.partner,
          ),
        ) || [];
    } else if (!isCanvas) {
      // Default to all partners if `salesForceSelfRegisteredPartner` is not present
      finalPartnerData = allPartnerFilterData?.AllPartner || [];
    }

    finalPartnerData &&
      finalPartnerData?.length > 0 &&
      finalPartnerData?.map((partner: any) => {
        const newCheckArrForHaveProgrmIds: any = [];
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
      const newCheckArrForHaveProgrmIds: any = [];
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
  }, [
    allPartnerFilterData,
    dataForTheObjects?.registeredPartners,
    salesForceSelfRegisteredPartner,
  ]);

  useEffect(() => {
    if (salesForceSelfRegisteredPartner) {
      const selfPartnerOptions: any = [];
      salesForceSelfRegisteredPartner?.map((partner: any) => {
        selfPartnerOptions?.push({
          label: <CustomTextCapitalization text={partner?.Partner_Name} />,
          value: partner?.Partner_Id,
        });
      });
      setSalesForceSelfRegisteredPartnerOption(selfPartnerOptions);
    }
  }, [salesForceSelfRegisteredPartner]);

  const deleteAddedRow = (index: number, typeOfReges: string) => {
    // selfRegesteriedPartner, setSelfRegesteriedPartner
    const newArr =
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
    const checkIn =
      typeOfWorkFor === 'self' ? selfRegesteriedPartner : regesteriedPartner;
    const newArr = checkIn?.length > 0 ? [...checkIn] : [];
    const newObj = {
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
    const valueType = type === 'partner' ? partner_id : partner_program_id;
    const typePort = type === 'partner' ? 'partner_id' : 'partner_program_id';
    const nameType =
      type === 'partner' ? 'partner_name' : 'partner_program_name';
    const checkIn =
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

      const partnerPrograms: any = [];

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
      let filteredData;
      if (isCanvas) {
        filteredData = salesForceSelfRegisteredPartner?.filter(
          (item: any) => item?.Partner_Id === newTempArr[index]?.partner_id,
        );
      } else {
        filteredData = allPartnerFilterData?.AllPartnerForSelf?.filter(
          (item: any) => item?.id === newTempArr[index]?.partner_id,
        );
      }

      if (filteredData) {
        const partnerPrograms: any = [];
        filteredData?.[0]?.PartnerPrograms?.map((program: any) => {
          if (!allAddedPartnerProgramIDs?.includes(program?.id) && !isCanvas) {
            partnerPrograms?.push({
              label: (
                <CustomTextCapitalization text={program?.partner_program} />
              ),
              value: program?.id,
            });
          } else {
            partnerPrograms?.push({
              label: (
                <CustomTextCapitalization
                  text={program?.Partner_Program_Name}
                />
              ),
              value: program?.Partner_Program_Id,
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
    }
    setErrorForAll(false);

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
          type: 'registered',
        })),
        ...(selfRegesteriedPartner ?? [])?.map((obj: any) => ({
          ...obj,
          type: 'self_registered',
        })),
      ];
    }

    const data = {
      selfRegisteredPartners: selfRegesteriedPartner,
      registeredPartners: regesteriedPartner,
    };
    if (formStep === 0 && !isDealRegDetail && !isCanvas) {
      setRegisteredPartnerData(data);
      setFormStep(1);
    } else if (
      (registeredPartnerData && formStep === 1) ||
      (data && isDealRegDetail) ||
      (data && isCanvas)
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
          date: handleDate(),
        }));
      } else if (isCanvas) {
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
          date: handleDate(),
        }));
      }
      if (isCanvas) {
        const createPartnerAndProgramOnFS = newData
          ?.filter((item: any) => item?.type === 'self_registered')
          .map((item: any) => ({
            Partner: {
              partner: item?.partner_name,
              organization: salesForceOrganizationName,
              admin_approved: true,
              Id: item?.partner_id,
            },
            Partner_Program: {
              partner_program: item?.partner_program_name,
              admin_approved: true,
              Id: item?.partner_program_id,
            },
          }));

        if (createPartnerAndProgramOnFS?.length > 0) {
          for (const partner of createPartnerAndProgramOnFS) {
            try {
              const res = await dispatch(insertPartner(partner?.Partner));
              // Check the request status to handle success or failure
              if (res?.payload) {
                const partnerId = res?.payload?.id;
                if (partnerId) {
                  partner.Partner.rosdealregai__External_Id__c =
                    String(partnerId);
                  const partnerProgramPayload = {
                    ...partner?.Partner_Program,
                    partner: partnerId, // Include the partner ID in the Partner_Program payload
                  };
                  const programRes = await dispatch(
                    insertPartnerProgram(partnerProgramPayload),
                  );
                  if (programRes?.payload) {
                    // Update Partner_Program object with partner_program_new_id
                    partner.Partner_Program.rosdealregai__External_Id__c =
                      String(programRes.payload?.id);
                  } else if (programRes.meta.requestStatus === 'rejected') {
                    // Handle Partner Program creation failure
                    notification.error({
                      message: 'Error Creating Partner Program',
                      description: `Failed to create partner program for Partner ID ${partnerId}: ${
                        programRes || 'Unknown error'
                      }`,
                    });
                  }
                } else {
                  notification.error({
                    message: 'Error Creating Partner',
                    description: `Partner creation did not return an ID.`,
                  });
                }
              } else {
                // Handle Partner creation failure
                notification.error({
                  message: 'Error Creating Partner',
                  description: `Failed to create partner: ${
                    res || 'Unknown error'
                  }`,
                });
              }
            } catch (error: any) {
              // Handle unexpected errors
              notification.error({
                message: 'Unexpected Error',
                description: `An unexpected error occurred: ${error.message}`,
              });
            }
          }

          // Collect responses individually with enhanced error handling
          const partnerRes: any[] = [];
          for (const partner of createPartnerAndProgramOnFS) {
            try {
              const response = await dispatch(
                updatePartnersandProgramIdFromFS({
                  baseURL: salesForceinstanceUrl,
                  token: salesForceToken,
                  data: partner,
                }),
              );
              partnerRes.push(response);
            } catch (error: any) {
              notification.error({
                message: 'Error Creating Partner',
                description: `Failed to create partner or partner program: ${error.message}`,
              });
              // Optionally break out if needed
              // break;
            }
          }

          // Check if any response contains an error message
          const errorResponse = partnerRes.find(
            (res: any) => res?.payload?.ErrorMessage,
          );
          if (errorResponse) {
            notification.error({
              message: 'Create Partner and Partner Program Error',
              description: errorResponse.payload.ErrorMessage,
            });
            return; // Stop execution on error
          }
        }
        const dealRegArray = newData?.map((item: any) => {
          // Find matching data in createPartnerAndProgramOnFS
          const matchedFSData = createPartnerAndProgramOnFS?.find(
            (fsItem: any) =>
              fsItem?.Partner?.partner === item?.partner_name &&
              fsItem?.Partner_Program?.partner_program ===
                item?.partner_program_name,
          );

          // Extract source data, defaulting to item if no match is found
          const sourceData = matchedFSData
            ? {
                partner_id: Number(
                  matchedFSData?.Partner?.rosdealregai__External_Id__c ?? 0,
                ),
                partner_program_id: Number(
                  matchedFSData?.Partner_Program
                    ?.rosdealregai__External_Id__c ?? 0,
                ),
                partner_name: matchedFSData?.Partner?.partner ?? '',
                partner_program_name:
                  matchedFSData?.Partner_Program?.partner_program ?? '',
              }
            : {
                partner_id: Number(item?.partner_id ?? 0),
                partner_program_id: Number(item?.partner_program_id ?? 0),
                partner_name: item?.partner_name ?? '',
                partner_program_name: item?.partner_program_name ?? '',
              };

          // Return the transformed object
          return {
            rosdealregai__Partner__c: sourceData.partner_id,
            rosdealregai__Partner_Program__c: sourceData.partner_program_id,
            rosdealregai__Registration_Type__c: item?.type
              ? item.type.toLowerCase().replace(/\s+/g, '_')
              : '',
            Name: `${formatMailString(sourceData.partner_name)} - ${formatMailString(
              sourceData.partner_program_name,
            )}`,
          };
        });

        try {
          // Call the API with the entire array instead of individual objects
          const response: any = await dispatch(
            createSalesforceDealreg({
              baseURL: isDecryptedRecord?.client?.instanceUrl,
              token: isDecryptedRecord?.client?.oauthToken,
              data: dealRegArray,
              opportunity_id: salesForceOpportunityId,
            }),
          );
          // Check if the API failed
          if (response?.payload?.error) {
            notification.error({
              message: 'Error',
              description: `Error creating entries: ${response?.payload?.error}`,
            });
            return;
          }

          // Handle unique registrations
          if (response?.payload?.UniqueRegistrations?.length) {
            notification.success({
              message: 'Success',
              description: `Dealreg form created successfully for: ${response?.payload?.UniqueRegistrations.join(', ')}`,
            });
          }

          // Handle duplicate registrations
          if (response?.payload?.DuplicatePartnerRegistrations?.length) {
            notification.info({
              message: 'Form is already created',
              description: `These forms already exist: ${response?.payload?.DuplicatePartnerRegistrations.join(
                ', ',
              )}`,
            });
          }

          // Navigate after showing notifications
          if (response?.payload?.UniqueRegistrations?.length) {
            router.replace('/dealRegDetail');
          }
        } catch (error: unknown) {
          // Handle any unexpected errors
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
          notification.error({
            message: 'Error',
            description: `Error creating entries: ${errorMessage}`,
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
                            (items: any, index: number) => (
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

                                      const AllIds: any =
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
                                      !items?.partner_program_id && errorForAll
                                        ? '24px'
                                        : '24px',
                                  }}
                                >
                                  <TrashIcon
                                    width={25}
                                    color={token?.colorError}
                                    onClick={() => {
                                      const AllIds: any =
                                        allAddedPartnerProgramIDs?.length > 0
                                          ? [...allAddedPartnerProgramIDs]
                                          : [];
                                      const FindIndex = AllIds?.findIndex(
                                        (idIndex: any) =>
                                          idIndex === items?.partner_program_id,
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
                            ),
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
                            (items: any, index: number) => (
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
                                    options={
                                      isCanvas
                                        ? salesForceSelfRegisteredPartnerOption
                                        : selefPartnerOptions
                                    }
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

                                      const AllIds: any =
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
                                      !items?.partner_program_id && errorForAll
                                        ? '24px'
                                        : '24px',
                                  }}
                                >
                                  <TrashIcon
                                    width={25}
                                    color={token?.colorError}
                                    onClick={() => {
                                      const AllIds: any =
                                        allAddedPartnerProgramIDs?.length > 0
                                          ? [...allAddedPartnerProgramIDs]
                                          : [];
                                      const FindIndex = AllIds?.findIndex(
                                        (idIndex: any) =>
                                          idIndex === items?.partner_program_id,
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
                            ),
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
        <Space size={20}>
          <OsButton
            text={
              formStep === 0 && !isDealRegDetail && !isCanvas
                ? 'Save & Next'
                : isDealRegDetail || isCanvas
                  ? 'Save'
                  : 'Save & Continue'
            }
            buttontype="PRIMARY"
            clickHandler={form.submit}
          />
          {isCanvas && (
            <OsButton
              text="Request Partner"
              buttontype="SECONDARY"
              clickHandler={() => {
                setOpenReponseModal(true);
              }}
            />
          )}
        </Space>
      </Row>

      <OsModal
        loading={requestPartnerLoading}
        body={
          <RequestPartner
            form={form}
            setOpen={setOpenReponseModal}
            setRequestPartnerLoading={setRequestPartnerLoading}
            setPartnerNewId={setPartnerNewId}
            partnerNewId={partnerNewId}
            partnerProgramNewId={partnerProgramNewId}
            setPartnerProgramNewId={setPartnerProgramNewId}
            setShowModal={setOpenReponseModal}
          />
        }
        width={700}
        open={openReponseModal}
        onCancel={() => {
          setOpenReponseModal((p) => !p);
          setPartnerProgramNewId({});
          setPartnerNewId({});
        }}
        footer
        footerPadding={30}
      />
    </>
  );
};

export default NewRegistrationForm;
