'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {contactIndustryOption} from '@/app/utils/CONSTANTS';
import {MailOutlined} from '@ant-design/icons';
import {PencilSquareIcon, UserCircleIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import {useForm} from 'antd/es/form/Form';
import {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux/hook';
import {setBillingContact} from '../../../../redux/slices/billingAddress';
import {setCustomerProfile} from '../../../../redux/slices/customer';
import {Checkbox} from '../antd/Checkbox';
import {Divider} from '../antd/Divider';
import {Space} from '../antd/Space';
import AddContact from '../os-add-contact';
import OsInput from '../os-input';
import OsModal from '../os-modal';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import CommonSelect from '../os-select';
import TableNameColumn from '../os-table/TableNameColumn';
import {CustomerTabsStyle} from './styled-components';
import {
  getAllbillingContact,
  insertbillingContact,
} from '../../../../redux/actions/billingContact';

const AddCustomer: React.FC<any> = ({
  drawer,
  form,
  onFinish,
  contactDetail,
  setActiveKeyForTabs,
  activeKeyForTabs,
  customerData,
  setContactDetail,
}) => {
  const [token] = useThemeToken();
  const [contactForm] = useForm();
  const {billingContact} = useAppSelector((state) => state.billingContact);
  const {customerProfile} = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch();
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [contactLoading, setContactLoading] = useState<boolean>(false);
  const [contactRecordData, setcontactRecordData] = useState<any>();
  const [sameAsShippingAddress, setSameAsShippingAddress] =
    useState<boolean>(false);
  const {userInformation} = useAppSelector((state) => state.user);

  const formatPhoneNumber = (input: any) => {
    const cleaned = input.replace(/\D/g, ''); // Remove non-digits
    const formatted = cleaned.slice(0, 11); // Limit to 11 digits

    if (formatted.length <= 3) {
      return `(${formatted}`;
    } else if (formatted.length <= 6) {
      return `(${formatted.slice(0, 3)}) ${formatted.slice(3)}`;
    } else {
      return `(${formatted.slice(0, 3)}) ${formatted.slice(3, 6)}-${formatted.slice(6, 11)}`;
    }
  };
  const handlePhoneChange = (e: any) => {
    // Get the current value
    const value = e.target.value;

    if (value === '') {
      // If input is empty, reset the form field
      form.setFieldsValue({billing_phone: ''});
    } else {
      // Otherwise, format the phone number
      const formattedValue = formatPhoneNumber(value);
      form.setFieldsValue({billing_phone: formattedValue});
    }
  };

  const uploadImagesToBackend = async (newFileList: any, index: any) => {

  };

  const handleNotification = (list: any) => {
    let count = 0;
    if (count === 1) {
      return;
    }
    if (
      list?.file?.size > 5000000 &&
      !list?.file?.originFileObj?.name?.includes('webm') &&
      !list?.file?.originFileObj?.name?.includes('WEBM') &&
      !list?.file?.originFileObj?.name?.includes('mp4') &&
      !list?.file?.originFileObj?.name?.includes('MP4') &&
      !list?.file?.originFileObj?.name?.includes('mov') &&
      !list?.file?.originFileObj?.name?.includes('MOV') &&
      !list?.file?.originFileObj?.name?.includes('avchd') &&
      !list?.file?.originFileObj?.name?.includes('AVCHD') &&
      !list?.file?.originFileObj?.name?.includes('avi') &&
      !list?.file?.originFileObj?.name?.includes('AVI') &&
      !list?.file?.originFileObj?.name?.includes('flv') &&
      !list?.file?.originFileObj?.name?.includes('FLV') &&
      !list?.file?.originFileObj?.name?.includes('wmv') &&
      !list?.file?.originFileObj?.name?.includes('WMV')
    ) {
      count += 1;
      notification.open({
        message: `Image exceeded size limit. Please upload an image less than 5MB/500KB`,
      });
    } else {
      uploadImagesToBackend(list, '');
    }
  };

 
  const createContact = () => {
    setContactLoading(true);
    const contactData = contactForm.getFieldsValue();
    const finalDAta = {
      ...contactData,
      customer_id: contactRecordData?.customer_id ?? customerData?.id,
      id: contactRecordData?.customer_id ? contactRecordData?.id : null,
      user_id: userInformation?.id,
    };

    dispatch(insertbillingContact(finalDAta))?.then((d: any) => {
      if (d?.payload) {
        contactForm.resetFields();
        dispatch(getAllbillingContact('')).then((res) => {
          if (res?.payload) {
            setContactDetail(
              res?.payload?.filter(
                (data: any) => data?.customer_id === customerData?.id,
              ),
            );
          }
        });
        setShowContactModal(false);
        setcontactRecordData('');
        setContactLoading(false);
      }
    });
  };

  const ShippingAddressForm = () => {
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Address Line</Typography>}
            name="shiping_address_line"
          >
            <OsInput placeholder="Enter here" />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              {pattern: /^[A-Za-z\s]+$/, message: 'Please enter a valid city.'},
            ]}
            label={<Typography name="Body 4/Medium">City</Typography>}
            name="shiping_city"
          >
            <OsInput placeholder="Enter here" />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter a valid state.',
              },
            ]}
            label={<Typography name="Body 4/Medium">State</Typography>}
            name="shiping_state"
          >
            <OsInput placeholder="Enter here" />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Zip Code</Typography>}
            name="shiping_pin_code"
            rules={[
              {
                pattern: /^[0-9]{5}$/,
                message: 'Please enter a valid zip code (5 digits).',
              },
            ]}
          >
            <OsInput placeholder="Enter here" />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter a valid country.',
              },
            ]}
            label={<Typography name="Body 4/Medium">Country</Typography>}
            name="shiping_country"
          >
            <OsInput placeholder="Enter here" />
          </SelectFormItem>
        </Col>
        <Col span={24}>
          <Space align="start">
            <SelectFormItem
              label=""
              valuePropName="checked"
              name="primary_shipping"
            >
              <Checkbox style={{paddingBottom: '10px'}} />
            </SelectFormItem>
            <Typography name="Body 3/Regular">
              Should this be your default shipping address?
            </Typography>
          </Space>
        </Col>
      </Row>
    );
  };

  const BillingAddressForm = () => {
    return (
      <Row gutter={[16, 16]} justify={'space-between'}>
        {!drawer && (
          <Row style={{paddingTop: '24px'}}>
            <Col>
              <Space align="start">
                <SelectFormItem
                  label=""
                  valuePropName="checked"
                  name="is_same_shipping_address"
                >
                  <Checkbox
                    style={{paddingBottom: '10px'}}
                    onChange={(e) => {
                      setSameAsShippingAddress(e.target.checked);
                      if (e.target.checked) {
                        const data = form.getFieldsValue();
                        form.setFieldsValue({
                          billing_address_line: data?.shiping_address_line,
                          billing_city: data?.shiping_city,
                          billing_state: data?.shiping_state,
                          billing_pin_code: data?.shiping_pin_code,
                          billing_country: data?.shiping_country,
                          bill_preVale: true,
                        });
                      } else {
                        form.resetFields([
                          'billing_address_line',
                          'billing_city',
                          'billing_state',
                          'billing_pin_code',
                          'billing_country',
                          'bill_preVale',
                        ]);
                      }
                    }}
                  />
                </SelectFormItem>
                <Typography name="Body 3/Regular">
                  Same as Shipping Address
                </Typography>
              </Space>
            </Col>
          </Row>
        )}

        <Col span={24}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Address Line</Typography>}
            name="billing_address_line"
          >
            <OsInput
              placeholder="Enter here"
              disabled={sameAsShippingAddress}
            />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              {pattern: /^[A-Za-z\s]+$/, message: 'Please enter a valid city.'},
            ]}
            label={<Typography name="Body 4/Medium">City</Typography>}
            name="billing_city"
          >
            <OsInput
              placeholder="Enter here"
              disabled={sameAsShippingAddress}
            />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter a valid state.',
              },
            ]}
            label={<Typography name="Body 4/Medium">State</Typography>}
            name="billing_state"
          >
            <OsInput
              placeholder="Enter here"
              disabled={sameAsShippingAddress}
            />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            label={<Typography name="Body 4/Medium">Zip Code</Typography>}
            name="billing_pin_code"
            rules={[
              {
                pattern: /^[0-9]{5}$/,
                message: 'Please enter a valid zip code (5 digits).',
              },
            ]}
          >
            <OsInput
              placeholder="Enter here"
              disabled={sameAsShippingAddress}
            />
          </SelectFormItem>
        </Col>
        <Col span={12}>
          <SelectFormItem
            rules={[
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Please enter a valid country.',
              },
            ]}
            label={<Typography name="Body 4/Medium">Country</Typography>}
            name="billing_country"
          >
            <OsInput
              placeholder="Enter here"
              disabled={sameAsShippingAddress}
            />
          </SelectFormItem>
        </Col>

        <Col span={drawer ? 24 : 12}>
          <Space align="start">
            <SelectFormItem
              label=""
              valuePropName="checked"
              name="primary_billing"
            >
              <Checkbox style={{paddingBottom: '10px'}} />
            </SelectFormItem>
            <Typography name="Body 3/Regular">
              Should this be your default billing address?
            </Typography>
          </Space>
        </Col>
      </Row>
    );
  };
  return (
    <>
      {!drawer && (
        <Row
          justify="space-between"
          style={{
            padding: '24px 40px 20px 40px',
            backgroundColor: '#F0F4F7',
            borderRadius: '10px 10px 0px 0px',
          }}
          gutter={[0, 16]}
        >
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Add Customer
          </Typography>
        </Row>
      )}

      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={false}
        style={{width: '100%', padding: drawer ? '' : '40px'}}
        initialValues={{
          currency: '$',
        }}
      >
        <Row justify="space-between">
          <Col
            span={drawer ? 24 : 4}
            style={{
              marginBottom: drawer ? '5px' : '',
            }}
          >
            <TableNameColumn
              imageUpload
              recordId={billingContact?.id}
              justifyContent="start"
              secondaryTextColor={token?.colorPrimary}
              primaryText={
                <Typography name="Body 4/Regular">
                  {drawer && billingContact?.name}
                </Typography>
              }
              secondaryText={
                <Typography name="Body 4/Regular">
                  {drawer &&
                    `ID: ${customerData?.id ? customerData?.id : billingContact?.id}`}
                </Typography>
              }
              fallbackIcon={
                drawer ? (
                  `${
                    customerData?.name?.toString()?.charAt(0)?.toUpperCase() ??
                    customerData?.name?.toString()?.charAt(0)?.toUpperCase()
                  }`
                ) : (
                  <UserCircleIcon />
                )
              }
              logo={drawer ? billingContact?.image : customerProfile}
              iconBg="#1EB159"
              size={drawer ? 50 : 85}
              imgCursor
              isNotification={false}
            />
          </Col>

          <Col span={drawer ? 24 : 20}>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col span={drawer ? 24 : 12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">Legal Name</Typography>
                  }
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Legal Name is required!',
                    },
                  ]}
                >
                  <OsInput placeholder="Enter here" />
                </SelectFormItem>
              </Col>
              <Col span={drawer ? 24 : 12}>
                <SelectFormItem
                  label={
                    <Typography name="Body 4/Medium">
                      Default Currency
                    </Typography>
                  }
                  name="currency"
                  rules={[
                    {
                      required: true,
                      message: 'currency is required!',
                    },
                  ]}
                >
                  <OsInput
                    placeholder="Enter here"
                    defaultValue="Dollar"
                    disabled
                  />
                </SelectFormItem>
              </Col>
              <Col span={drawer ? 24 : 12}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Industry</Typography>}
                  name="industry"
                >
                  <CommonSelect
                    style={{width: '100%'}}
                    options={contactIndustryOption}
                  />
                </SelectFormItem>
              </Col>
              <Col span={drawer ? 24 : 12}>
                <SelectFormItem
                  label={<Typography name="Body 4/Medium">Website</Typography>}
                  name="website"
                  rules={[
                    {
                      pattern:
                        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/,
                      message: 'Please enter valid website.',
                    },
                  ]}
                >
                  <OsInput placeholder="Enter here" />
                </SelectFormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <CustomerTabsStyle
          defaultActiveKey="1"
          activeKey={activeKeyForTabs ?? '1'}
          items={[
            ...(drawer
              ? []
              : [
                  {
                    label: (
                      <div
                        onClick={() => {
                          setActiveKeyForTabs && setActiveKeyForTabs('1');
                        }}
                      >
                        Shipping Address
                      </div>
                    ),
                    key: '1',
                    children: <ShippingAddressForm />,
                  },
                  {
                    label: (
                      <div
                        onClick={() => {
                          setActiveKeyForTabs && setActiveKeyForTabs('2');
                        }}
                      >
                        Billing Address
                      </div>
                    ),
                    key: '2',
                    children: <BillingAddressForm />,
                  },
                ]),
            {
              label: (
                <div
                  onClick={() => {
                    setActiveKeyForTabs && setActiveKeyForTabs('3');
                  }}
                >
                  Contact
                </div>
              ),
              key: drawer ? '1' : '3',
              children: (
                <>
                  {!drawer ? (
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">
                              First Name
                            </Typography>
                          }
                          name="billing_first_name"
                        >
                          <OsInput placeholder="First Name" />
                        </SelectFormItem>
                      </Col>
                      <Col span={12}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">
                              Last Name
                            </Typography>
                          }
                          name="billing_last_name"
                        >
                          <OsInput placeholder="Last Name" />
                        </SelectFormItem>
                      </Col>
                      <Col span={12}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">Role</Typography>
                          }
                          name="billing_role"
                        >
                          <OsInput placeholder="Enter Role" />
                        </SelectFormItem>
                      </Col>
                      <Col span={12}>
                        <SelectFormItem
                          rules={[
                            {
                              pattern:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: 'Please enter valid email.',
                            },
                          ]}
                          label={
                            <Typography name="Body 4/Medium">Email</Typography>
                          }
                          name="billing_email"
                        >
                          <OsInput placeholder="Enter Email" />
                        </SelectFormItem>
                      </Col>
                      <Col span={24}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">Phone</Typography>
                          }
                          name="billing_phone"
                          rules={[
                            // {
                            //   required: true,
                            //   message: 'Please enter a phone number.',
                            // },
                            {
                              pattern: /^\(\d{3}\) \d{3}-\d{4}$/, // Regex to match (XXX) XXX-XXXX format
                              message: 'Please enter a valid phone number.',
                            },
                          ]}
                        >
                          <OsInput
                            maxLength={14} // Includes parentheses and dashes
                            placeholder="Enter phone number"
                            onChange={handlePhoneChange}
                          />
                        </SelectFormItem>
                      </Col>
                    </Row>
                  ) : (
                    <>
                      {contactDetail?.map((item: any, index: number) => {
                        return (
                          <Col key={item?.key} span={24}>
                            <Row
                              key={index}
                              style={{
                                background: '#F6F7F8',
                                padding: '12px',
                                borderRadius: '12px',
                                margin: '5px',
                              }}
                              justify="space-between"
                            >
                              <Col>
                                <Space direction="vertical" size={12}>
                                  <TableNameColumn
                                    primaryText={
                                      <Typography name="Body 3/Regular">
                                        {item?.billing_first_name}{' '}
                                        {item?.billing_last_name}
                                      </Typography>
                                    }
                                    secondaryText={
                                      <Typography name="Body 4/Regular">
                                        {item?.billing_role}
                                      </Typography>
                                    }
                                    fallbackIcon={`${
                                      item?.billing_first_name
                                        ? item?.billing_first_name
                                            ?.toString()
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                        : ''
                                    }${
                                      item?.billing_last_name
                                        ? item?.billing_last_name
                                            ?.toString()
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                        : ''
                                    }`}
                                    iconBg="#1EB159"
                                    isNotification={false}
                                  />
                                  <Typography name="Body 4/Regular">
                                    {' '}
                                    <MailOutlined
                                      size={24}
                                      style={{marginRight: '5px'}}
                                    />
                                    {item?.billing_email}
                                  </Typography>
                                </Space>
                              </Col>
                              <Col>
                                {' '}
                                <Row
                                  justify="center"
                                  align="middle"
                                  style={{height: '100%'}}
                                >
                                  <PencilSquareIcon
                                    onClick={() => {
                                      contactForm.setFieldsValue({
                                        billing_email: item?.billing_email,
                                        billing_last_name:
                                          item?.billing_last_name,
                                        billing_first_name:
                                          item?.billing_first_name,
                                        billing_role: item?.billing_role,
                                        billing_id: item?.id,
                                        id: item?.id,
                                        billing_phone: item?.billing_phone,
                                      });
                                      setcontactRecordData(item);
                                      setShowContactModal(true);
                                    }}
                                    width={24}
                                    style={{color: '#949494'}}
                                  />
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        );
                      })}

                      {drawer && (
                        <Row
                          style={{marginTop: '20px'}}
                          onClick={() => {
                            setShowContactModal(true);
                          }}
                        >
                          <Typography
                            name="Body 3/Bold"
                            color="#3DA5D9"
                            cursor="pointer"
                          >
                            + Add New Contact
                          </Typography>
                        </Row>
                      )}
                    </>
                  )}
                </>
              ),
            },
          ]}
        />
      </Form>

      <OsModal
        loading={contactLoading}
        body={
          <AddContact
            form={contactForm}
            onFinish={createContact}
            customerValue={contactRecordData?.customer_id}
            isDealregForm={true}
          />
        }
        width={700}
        open={showContactModal}
        onCancel={() => {
          setShowContactModal(false);
          contactForm.resetFields();
          setcontactRecordData('');
        }}
        onOk={contactForm.submit}
        primaryButtonText={'Save'}
        footerPadding={20}
      />
    </>
  );
};

export default AddCustomer;
