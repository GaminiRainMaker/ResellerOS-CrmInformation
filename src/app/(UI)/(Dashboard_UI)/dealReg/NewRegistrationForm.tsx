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
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import OsOpportunitySelect from '@/app/components/common/os-opportunity-select';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {partnerProgramFilter} from '@/app/utils/base';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {
  getAllDealReg,
  getDealRegByOpportunityId,
  insertDealReg,
} from '../../../../../redux/actions/dealReg';
import {insertDealRegAddress} from '../../../../../redux/actions/dealRegAddress';
import {getAllPartnerandProgram} from '../../../../../redux/actions/partner';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {CollapseSpaceStyle} from '../dealRegDetail/DealRegDetailForm/styled-components';

const NewRegistrationForm: FC<any> = ({
  isDealRegDetail = false,
  setShowModal,
}) => {
  const [form] = Form.useForm();
  const [token] = useThemeToken();
  const searchParams = useSearchParams();
  const getOpportunityId = Number(searchParams.get('opportunityId'));
  const getContactId = Number(searchParams.get('contactId'));
  const getCustomerId = Number(searchParams.get('customerId'));
  const dispatch = useAppDispatch();
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {data: partnerData} = useAppSelector((state) => state.partner);
  const {userInformation} = useAppSelector((state) => state.user);
  const [allPartnerFilterData, setAllFilterPartnerData] = useState<any>();
  const [partnerProgramOptions, setPartnerProgrramOptions] = useState();
  const [formStep, setFormStep] = useState<number>(0);
  const [customerValue, setCustomerValue] = useState<number>();
  const [registeredPartnerData, setRegisteredPartnerData] = useState<any>();
  const [addressData, setAddressData] = useState<any>();

  useEffect(() => {
    dispatch(getAllPartnerandProgram(''));
  }, []);

  useEffect(() => {
    if (isDealRegDetail) {
      dispatch(getAllCustomer({}));
    }
  }, [isDealRegDetail]);

  useEffect(() => {
    const FilterArrayDataa = partnerProgramFilter(
      'user',
      userInformation,
      partnerData,
      2,
      true,
    );

    setAllFilterPartnerData(FilterArrayDataa?.filterData);
  }, []);

  const partnerOptions = allPartnerFilterData?.map((partner: any) => ({
    label: <CustomTextCapitalization text={partner?.partner} />,
    value: partner?.id,
  }));

  const findPartnerProgramsById = (chosenId: number) => {
    const filteredData = allPartnerFilterData?.filter(
      (item: any) => item?.id === chosenId,
    );

    if (filteredData) {
      const partnerPrograms = filteredData?.[0]?.PartnerPrograms?.map(
        (program: any) => ({
          label: <CustomTextCapitalization text={program?.partner_program} />,
          value: program?.id,
        }),
      );
      setPartnerProgrramOptions(partnerPrograms);
    }
  };

  useEffect(() => {
    const customerWithAddresses = dataAddress?.find((customer: any) =>
      customer?.id === !isDealRegDetail ? customerValue : getCustomerId,
    );
    const addresses = customerWithAddresses?.Addresses;
    const {
      billing_address_line,
      billing_city,
      billing_country,
      billing_pin_code,
      billing_state,
    } = addresses?.[0] ?? {};
    setAddressData({
      street_1: billing_address_line,
      street_2: billing_address_line,
      city: billing_city,
      state: billing_state,
      country: billing_country,
      zip_code: billing_pin_code,
    });
  }, [customerValue || getCustomerId]);

  const registeredFormFinish = () => {
    const data = form.getFieldsValue();

    if (formStep === 0 && !isDealRegDetail) {
      setRegisteredPartnerData(data);
      setFormStep(1);
    } else if (
      (registeredPartnerData && formStep === 1) ||
      (data && isDealRegDetail)
    ) {
      const dataArray = isDealRegDetail
        ? [data]?.[0]?.registeredPartners
        : [registeredPartnerData]?.[0]?.registeredPartners;
      let newData: any;
      if (isDealRegDetail) {
        newData = dataArray?.map((obj: any) => ({
          ...obj,
          ...addressData,
          organization: userInformation?.organization,
          opportunity_id: getOpportunityId,
          contact_id: getContactId,
          customer_id: getCustomerId,
        }));
      } else {
        newData = dataArray?.map((obj: any) => ({
          ...obj,
          ...data,
          ...addressData,
          organization: userInformation?.organization,
        }));
      }
      dispatch(insertDealReg(newData)).then((d: any) => {
        if (d?.payload) {
          d?.payload?.map(async (DataItem: any) => {
            if (DataItem?.id) {
              const obj12 = {
                dealRegId: DataItem?.id,
                ...newData[0],
              };
              // eslint-disable-next-line @typescript-eslint/no-shadow
              await dispatch(insertDealRegAddress(obj12)).then((d: any) => {
                if (d) {
                  setShowModal(false);
                  if (isDealRegDetail) {
                    dispatch(
                      getDealRegByOpportunityId(Number(getOpportunityId)),
                    );
                  } else {
                    dispatch(getAllDealReg());
                  }
                }
              });
            }
          });
        }
      });
    }
  };

  return (
    <>
      <Form
        name="dynamic_form_nest_item"
        onFinish={registeredFormFinish}
        style={{maxWidth: 600}}
        form={form}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        {formStep === 0 ? (
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
                    <Form.List name="registeredPartners" initialValue={[{}]}>
                      {(fields, {add, remove}) => (
                        <>
                          {fields?.map(({key, name, ...restField}) => (
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
                                    style={{width: '100%'}}
                                    options={partnerOptions}
                                    onChange={(value) => {
                                      findPartnerProgramsById(value);
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
                                    options={partnerProgramOptions}
                                    style={{width: '100%'}}
                                  />
                                </SelectFormItem>
                              </Col>
                              <Col span={4}>
                                <TrashIcon
                                  width={25}
                                  color={token?.colorError}
                                  onClick={() => remove(name)}
                                  style={{paddingTop: '10px'}}
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
                                style={{marginTop: '5px'}}
                              />
                              <Typography
                                name="Body 3/Bold"
                                color={token?.colorLink}
                                cursor="pointer"
                              >
                                Add Partner
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
