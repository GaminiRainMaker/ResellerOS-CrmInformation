/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */

'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import CustomTextCapitalization from '@/app/components/common/hooks/CustomTextCapitalizationHook';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsContactSelect from '@/app/components/common/os-contact-select';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import { SelectFormItem } from '@/app/components/common/os-oem-select/oem-select-styled';
import OsOpportunitySelect from '@/app/components/common/os-opportunity-select';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Form, notification } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { getAllCustomer } from '../../../../../redux/actions/customer';
import {
  getDealRegByOpportunityId,
  insertDealReg,
  queryDealReg,
} from '../../../../../redux/actions/dealReg';
import { getAllPartnerandProgramApprovedForOrganization } from '../../../../../redux/actions/partner';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { CollapseSpaceStyle } from '../dealRegDetail/styled-component';

const NewRegistrationForm: FC<any> = ({
  isDealRegDetail = false,
  setShowModal,
}) => {
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const searchParams = useSearchParams()!;
  const getOpportunityId = Number(searchParams.get('opportunityId'));
  const getContactId = Number(searchParams.get('contactId'));
  const getCustomerId = Number(searchParams.get('customerId'));
  let pathname = usePathname()
  const dispatch = useAppDispatch();
  const { data: dataAddress } = useAppSelector((state) => state.customer);
  const { userInformation } = useAppSelector((state) => state.user);
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const [allSeldPartnerFilterData, setAllSelfFilterPartnerData] =
    useState<any>();

  const [formStep, setFormStep] = useState<number>(0);
  const [customerValue, setCustomerValue] = useState<number>();
  const [registeredPartnerData, setRegisteredPartnerData] = useState<any>();
  const [addressData, setAddressData] = useState<any>();
  const [partnerProgramOptions, setPartnerProgrramOptions] = useState();
  const [partnerProgramOptionsForSelf, setPartnerProgrramOptionsForSelf] =
    useState();

  const [selefPartnerOptions, setSelfPartnerOptions] = useState<any>();
  const [partnerOptions, setPartnerOptions] = useState<any>();
  const [allAddedSelfPartnerProgramIDs, setAllAddedSelfPartnerProgramIDs] =
    useState<any>();
  const [choosenIdProgram, setChoosedIdProgram] = useState<any>();
  const [regesteriedPartner, setRegesteriedPartner] = useState<any>()
  const [selfRegesteriedPartner, setSelfRegesteriedPartner] = useState<any>()

  const [allAddedPartnerProgramIDs, setAllAddedPartnerProgramIDs] =
    useState<any>();

  useEffect(() => {
    dispatch(getAllPartnerandProgramApprovedForOrganization({}))?.then(
      (payload: any) => {
        setAllFilterPartnerData(payload?.payload);
      },
    );
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
  const onHitDeleteTheObject = () => {
    findPartnerProgramsById(choosenIdProgram);
  };

  const registeredFormFinish = async () => {
    const data = form.getFieldsValue();


    if (
      (data?.registeredPartners === undefined ||
        data?.registeredPartners?.length <= 0) &&
      (data?.selfRegisteredPartners === undefined ||
        data?.selfRegisteredPartners?.length <= 0) &&
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
        ...(data?.registeredPartners ?? [])?.map((obj: any) => ({
          ...obj,
          type: 'Registered',
        })),
        ...(data?.selfRegisteredPartners ?? [])?.map((obj: any) => ({
          ...obj,
          type: 'Self Registered',
        })),
      ];
    }

    if (formStep === 0 && !isDealRegDetail) {
      setRegisteredPartnerData(data);
      setFormStep(1);
    } else if (
      (registeredPartnerData && formStep === 1) ||
      (data && isDealRegDetail)
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
      } else {
        newData = combinedData?.map((obj: any) => ({
          ...obj,
          ...data,
          ...addressData,
          organization: userInformation?.organization,
          status: 'New',
          user_id: userInformation?.id,
        }));
      }

      await dispatch(insertDealReg(newData)).then((d: any) => {
        if (d?.payload) {
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
      if (pathname === '/opportunityDetail') {
        location.reload()
      }
    }
  };

  const addNewPartnerFOrReg = () => {
    let newArr = regesteriedPartner?.length > 0  ? [...regesteriedPartner] : []
    let newObj = {
      partner_id : '',
      partner_program_id : '',
      type : 'regestered',
      optionsForProgram : []
    }

  }

    // setRegesteriedPartner
  
  return (
    <>
      <Form
        name="dynamic_form_nest_item"
        onFinish={registeredFormFinish}
        style={{ maxWidth: 600 }}
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
                      <Form.List name="registeredPartners">
                        {(fields, { add, remove }) => (
                          <>
                            {fields?.map(
                              ({ key, name, ...restField }) => (
                                console.log('43543534534', key, name),
                                (
                                  <Row
                                    justify="space-between"
                                    align="middle"
                                    gutter={[16, 16]}
                                    key={key}
                                    style={{
                                      marginBottom: '8px',
                                    }}
                                  >
                                    <Col span={10}>
                                      <SelectFormItem
                                        label={
                                          <Typography name="Body 4/Medium">
                                            Partner
                                          </Typography>
                                        }
                                        {...restField}
                                        name={[name, 'partner_id']}
                                        rules={[
                                          {
                                            required: true,
                                            message: 'Partner is required!',
                                          },
                                        ]}
                                      >
                                        <CommonSelect
                                          placeholder="Select"
                                          style={{
                                            width: '100%',
                                            height: '36px',
                                          }}
                                          options={partnerOptions}
                                          onChange={(value) => {
                                            findPartnerProgramsById(value);
                                            setChoosedIdProgram(value);
                                          }}
                                        />
                                      </SelectFormItem>
                                    </Col>
                                    <Col span={10}>
                                      <SelectFormItem
                                        label={
                                          <Typography name="Body 4/Medium">
                                            Partner Program
                                          </Typography>
                                        }
                                        {...restField}
                                        name={[name, 'partner_program_id']}
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              'Partner Program is required!',
                                          },
                                        ]}
                                      >
                                        <CommonSelect
                                          placeholder="Select"
                                          options={partnerProgramOptions}
                                          onChange={(e: any) => {
                                            let AllIds: any =
                                              allAddedPartnerProgramIDs?.length >
                                                0
                                                ? [...allAddedPartnerProgramIDs]
                                                : [];
                                            AllIds?.push(e);
                                            setAllAddedPartnerProgramIDs(
                                              AllIds,
                                            );
                                          }}
                                          style={{
                                            width: '100%',
                                            height: '36px',
                                          }}
                                        />
                                      </SelectFormItem>
                                    </Col>
                                    <Col
                                      span={4}
                                      style={{
                                        paddingTop: '25px',
                                      }}
                                    >
                                      <TrashIcon
                                        width={25}
                                        color={token?.colorError}
                                        onClick={
                                          () => {
                                            let dataa = form.getFieldsValue();

                                            if (
                                              dataa?.registeredPartners[name]
                                            ) {
                                              let newArrr: any =
                                                allAddedPartnerProgramIDs?.length >
                                                  0
                                                  ? [
                                                    ...allAddedPartnerProgramIDs,
                                                  ]
                                                  : [];

                                              let findIndexOfId =
                                                newArrr.findIndex(
                                                  (item: number) =>
                                                    item ===
                                                    dataa?.registeredPartners[
                                                      name
                                                    ]?.partner_program_id,
                                                );
                                              newArrr.splice(findIndexOfId, 1);
                                              setAllAddedPartnerProgramIDs(
                                                newArrr,
                                              );
                                            }
                                            remove(name);
                                            onHitDeleteTheObject();
                                          }

                                          // remove(name)
                                        }
                                        cursor="pointer"
                                      />
                                    </Col>
                                  </Row>
                                )
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
                                  add();
                                }}
                              >
                                <PlusIcon
                                  width={24}
                                  color={token?.colorLink}
                                  style={{ marginTop: '5px' }}
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
                        )}
                      </Form.List>
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
                      <Form.List name="selfRegisteredPartners">
                        {(fields, { add, remove }) => (
                          <>
                            {fields?.map(({ key, name, ...restField }) => (
                              <Row
                                justify="space-between"
                                align="middle"
                                gutter={[16, 16]}
                                key={key}
                                style={{
                                  marginBottom: '8px',
                                }}
                              >
                                <Col span={10}>
                                  <SelectFormItem
                                    label={
                                      <Typography name="Body 4/Medium">
                                        Partner
                                      </Typography>
                                    }
                                    {...restField}
                                    name={[name, 'partner_id']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Partner is required!',
                                      },
                                    ]}
                                  >
                                    <CommonSelect
                                      placeholder="Select"
                                      style={{ width: '100%', height: '36px' }}
                                      options={selefPartnerOptions}
                                      onChange={(value) => {
                                        findPartnerProgramsForSelfById(value);
                                      }}
                                    />
                                  </SelectFormItem>
                                </Col>
                                <Col span={10}>
                                  <SelectFormItem
                                    label={
                                      <Typography name="Body 4/Medium">
                                        Partner Program
                                      </Typography>
                                    }
                                    {...restField}
                                    name={[name, 'partner_program_id']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Partner Program is required!',
                                      },
                                    ]}
                                  >
                                    <CommonSelect
                                      placeholder="Select"
                                      options={partnerProgramOptionsForSelf}
                                      onChange={(e: any) => {
                                        let AllIds: any =
                                          allAddedPartnerProgramIDs?.length > 0
                                            ? [...allAddedPartnerProgramIDs]
                                            : [];
                                        AllIds?.push(e);
                                        setAllAddedPartnerProgramIDs(AllIds);
                                      }}
                                      style={{ width: '100%', height: '36px' }}
                                    />
                                  </SelectFormItem>
                                </Col>
                                <Col
                                  span={4}
                                  style={{
                                    paddingTop: '25px',
                                  }}
                                >
                                  <TrashIcon
                                    width={25}
                                    color={token?.colorError}
                                    onClick={() => remove(name)}
                                    cursor="pointer"
                                  />
                                </Col>
                              </Row>
                            ))}
                            <Form.Item>
                              <Space
                                size={4}
                                style={{
                                  width: '100%',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  add();
                                }}
                              >
                                <PlusIcon
                                  width={24}
                                  color={token?.colorLink}
                                  style={{ marginTop: '5px' }}
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
                        )}
                      </Form.List>
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
            formStep === 0 && !isDealRegDetail
              ? 'Save & Next'
              : isDealRegDetail
                ? 'Save'
                : 'Save'
          }
          buttontype="PRIMARY"
          clickHandler={form.submit}
        />
      </Row>
    </>
  );
};

export default NewRegistrationForm;
