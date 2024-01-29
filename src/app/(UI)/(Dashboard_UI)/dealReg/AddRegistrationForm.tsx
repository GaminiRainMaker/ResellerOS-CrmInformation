/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsModal from '@/app/components/common/os-modal';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';

import {partnerOptions} from '@/app/utils/CONSTANTS';
import {PlusIcon} from '@heroicons/react/24/outline';
import {useEffect, useState} from 'react';
import {getProgramOptions} from '@/app/utils/base';
import {useRouter} from 'next/navigation';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {getAllOpportunity} from '../../../../../redux/actions/opportunity';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddCustomer from '../crmInAccount/addCustomer';
import {CollapseSpaceStyle} from '../dealRegDetail/DealRegDetailForm/styled-components';
import {insertDealReg} from '../../../../../redux/actions/dealReg';
import {insertDealRegAddress} from '../../../../../redux/actions/dealRegAddress';

const AddRegistrationForm = () => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const {loading} = useAppSelector((state) => state.dealReg);

  const [toggle, setToggle] = useState(false);
  const [customerValue, setCustomerValue] = useState<number>(0);
  const [billingOptionsData, setBillingOptionData] = useState<any>();
  const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false);
  const [updatedDealRegData, setUpdatedDealRegData] = useState<any>();
  const [opportunityFilterOption, setOpportunityFilterOption] = useState<any>();

  const [dealRegFormData, setDealRegFormData] = useState([
    {
      id: 1,
      partnername: 'Partner',
      partner_id: '',
      partnerOptions,
      partnerProgramName: 'Partner Program',
      partner_program_id: '',
      partnerProgramOptions: [],
      customer_id: '',
      contact_id: '',
      opportunity_id: '',
      title: '',
      street_1: '',
      street_2: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
    },
  ]);

  const RegisteredPartnersItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Registered Partners</Typography>,
      children: (
        <Space
          size={12}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          {dealRegFormData?.map((dealRegFormDataItem) => (
            <Row
              justify="space-between"
              gutter={[24, 24]}
              key={dealRegFormDataItem?.id}
            >
              <Col sm={24} md={12}>
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">
                    {dealRegFormDataItem?.partnername}
                  </Typography>
                  <CommonSelect
                    placeholder="Select"
                    options={dealRegFormDataItem?.partnerOptions}
                    style={{width: '100%'}}
                    onChange={(value) => {
                      setDealRegFormData((prev: any) =>
                        prev.map((prevItem: any) => {
                          if (prevItem.id === dealRegFormDataItem.id) {
                            return {
                              ...prevItem,
                              partner_id: value,
                              partnerProgramOptions: getProgramOptions(value),
                            };
                          }
                          return prevItem;
                        }),
                      );
                    }}
                  />
                </Space>
              </Col>
              <Col sm={24} md={12}>
                <Space
                  size={4}
                  direction="vertical"
                  style={{
                    width: '100%',
                  }}
                >
                  <Typography name="Body 4/Medium">
                    {dealRegFormDataItem?.partnerProgramName}
                  </Typography>
                  <CommonSelect
                    placeholder="Select"
                    options={dealRegFormDataItem?.partnerProgramOptions}
                    style={{width: '100%'}}
                    onChange={(value) => {
                      setDealRegFormData((prev) =>
                        prev.map((prevItem) => {
                          if (prevItem.id === dealRegFormDataItem.id) {
                            return {
                              ...prevItem,
                              partner_program_id: value,
                            };
                          }
                          return prevItem;
                        }),
                      );
                    }}
                  />
                </Space>
              </Col>
            </Row>
          ))}

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const tempData = [
                    {
                      id: dealRegFormData.length + 1,
                      partnername: 'Partner',
                      partner_id: '',
                      partnerOptions,
                      partnerProgramName: 'Partner Program',
                      partner_program_id: '',
                      partnerProgramOptions: [],
                      customer_id: '',
                      contact_id: '',
                      opportunity_id: '',
                      title: '',
                      street_1: '',
                      street_2: '',
                      city: '',
                      state: '',
                      country: '',
                      zip_code: '',
                    },
                  ];
                  setDealRegFormData([...dealRegFormData, ...tempData]);
                }}
              >
                <PlusIcon
                  width={24}
                  color={token?.colorLink}
                  style={{marginTop: '5px'}}
                />
                <Typography name="Body 3/Bold" color={token?.colorLink}>
                  Add Partner
                </Typography>
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  const SelfRegisteredItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Self Registered</Typography>,
      children: (
        <Space
          size={12}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner</Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner Programm</Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                <PlusIcon
                  width={24}
                  color={token?.colorLink}
                  style={{marginTop: '5px'}}
                />
                <Typography name="Body 3/Bold" color={token?.colorLink}>
                  Add Partner
                </Typography>
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllCustomer({}));
    dispatch(getAllOpportunity());
  }, [toggle]);

  const customerOptions = dataAddress.map((dataAddressItem: any) => ({
    value: dataAddressItem.id,
    label: (
      <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
        {dataAddressItem.name}
      </Typography>
    ),
  }));

  useEffect(() => {
    const filterUsers = opportunityData?.filter((item: any) =>
      item?.customer_id?.toString()?.includes(customerValue),
    );
    const opportunityOptions = filterUsers.map((opportunity: any) => ({
      value: opportunity.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {opportunity.title}
        </Typography>
      ),
    }));

    setOpportunityFilterOption(opportunityOptions);
  }, [customerValue]);

  useEffect(() => {
    const updatedAllBillingContact: any = [];
    if (dataAddress) {
      dataAddress.forEach((item: any) => {
        if (item.BillingContacts) {
          if (item.id === customerValue) {
            item.BillingContacts.forEach((itemss: any) => {
              updatedAllBillingContact.push({
                label: `${itemss.billing_first_name} ${itemss.billing_last_name}`,
                value: itemss.id,
              });
            });
          }
        }
      });
    }
    setBillingOptionData(updatedAllBillingContact);
  }, [dataAddress, customerValue]);

  useEffect(() => {
    const customerWithAddresses = dataAddress?.find(
      (customer: any) => customer?.id === customerValue,
    );
    const addresses = customerWithAddresses?.Addresses;
    const {
      billing_address_line,
      billing_city,
      billing_country,
      billing_pin_code,
      billing_state,
    } = addresses?.[0] ?? {};
    setDealRegFormData((prevData) =>
      prevData.map((item) => ({
        ...item,
        street_1: billing_address_line,
        street_2: billing_address_line,
        city: billing_city,
        state: billing_state,
        country: billing_country,
        zip_code: billing_pin_code,
      })),
    );
  }, [customerValue]);

  const insertDealRegData = () => {
    const newarr: any = [];
    if (toggle) {
      dealRegFormData?.forEach(async (dealRegFormDataItem) => {
        const obj = {
          contact_id: dealRegFormDataItem?.contact_id || null,
          customer_id: dealRegFormDataItem?.customer_id || null,
          opportunity_id: dealRegFormDataItem?.opportunity_id || null,
          partner_id: dealRegFormDataItem?.partner_id || null,
          partner_program_id: dealRegFormDataItem?.partner_program_id || null,
          street_1: dealRegFormDataItem?.street_1 || null,
          street_2: dealRegFormDataItem?.street_2 || null,
          city: dealRegFormDataItem?.city || null,
          state: dealRegFormDataItem?.state || null,
          country: dealRegFormDataItem?.country || null,
          zip_code: dealRegFormDataItem?.zip_code || null,
          title:
            String(dealRegFormDataItem?.partner_id) === '1'
              ? 'CISCO'
              : String(dealRegFormDataItem?.partner_id) === '2'
                ? 'DELL'
                : String(dealRegFormDataItem?.partner_id) === '3'
                  ? 'AMAZON'
                  : null,
        };
        newarr.push(obj);
      });
      setUpdatedDealRegData(newarr);
    }
  };

  useEffect(() => {
    dispatch(insertDealReg(updatedDealRegData)).then((d: any) => {
      if (d?.payload) {
        console.log('DataItem', d?.payload);
        d?.payload?.map(async (DataItem: any) => {
          console.log('payloadpayload', DataItem);
          if (DataItem?.id) {
            const obj12 = {
              dealRegId: DataItem?.id,
              ...updatedDealRegData[0],
            };
            await dispatch(insertDealRegAddress(obj12)).then((d) => {
              if (d) {
                router.push(`/dealRegDetail`);
              }
            });
          }
        });
      }
    });
  }, [updatedDealRegData]);

  return (
    <>
      {!toggle ? (
        <Space style={{width: '100%'}} direction="vertical" size={0}>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin items={RegisteredPartnersItem} />
          </CollapseSpaceStyle>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin items={SelfRegisteredItem} />
          </CollapseSpaceStyle>
        </Space>
      ) : (
        <Space style={{width: '100%'}} direction="vertical" size={24}>
          <Typography name="Body 2/Medium" color={token?.colorPrimaryText}>
            Fill Details
          </Typography>

          <Space
            size={4}
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Typography name="Body 4/Medium">Customer Account</Typography>
            <CommonSelect
              placeholder="Select"
              style={{width: '100%'}}
              options={customerOptions}
              onChange={(value) => {
                setCustomerValue(value);
                setDealRegFormData((prevData) =>
                  prevData.map((item) => ({
                    ...item,
                    customer_id: value,
                  })),
                );
              }}
              dropdownRender={(menu) => (
                <>
                  <Space
                    style={{cursor: 'pointer'}}
                    size={8}
                    onClick={() => setShowCustomerModal(true)}
                  >
                    <PlusIcon
                      width={24}
                      color={token?.colorInfoBorder}
                      style={{marginTop: '5px'}}
                    />
                    <Typography
                      color={token?.colorPrimaryText}
                      name="Body 3/Regular"
                    >
                      Add Customer Account
                    </Typography>
                  </Space>
                  {menu}
                </>
              )}
            />
          </Space>

          <Space
            size={4}
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Typography name="Body 4/Medium">Contact</Typography>
            <CommonSelect
              placeholder="Select"
              style={{width: '100%'}}
              options={billingOptionsData}
              onChange={(value) => {
                setDealRegFormData((prevData) =>
                  prevData.map((item) => ({
                    ...item,
                    contact_id: value,
                  })),
                );
              }}
            />
          </Space>

          <Space
            size={4}
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Typography name="Body 4/Medium">Opportunity</Typography>
            <CommonSelect
              placeholder="Select"
              style={{width: '100%'}}
              options={opportunityFilterOption}
              onChange={(value) => {
                setDealRegFormData((prevData) =>
                  prevData.map((item) => ({
                    ...item,
                    opportunity_id: value,
                  })),
                );
              }}
            />
          </Space>
        </Space>
      )}

      <Row justify="end" style={{marginTop: toggle ? '25px' : ''}}>
        <OsButton
          loading={loading}
          text={!toggle ? 'Next' : 'Create Form'}
          buttontype="PRIMARY"
          clickHandler={() => {
            setToggle(true);
            insertDealRegData();
          }}
        />
      </Row>
      <OsModal
        body={<AddCustomer setShowModal={setShowCustomerModal} />}
        width={800}
        open={showCustomerModal}
        onCancel={() => {
          setShowCustomerModal((p) => !p);
        }}
      />
    </>
  );
};

export default AddRegistrationForm;
