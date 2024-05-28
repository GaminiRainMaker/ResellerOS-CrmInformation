/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {getBase64} from '@/app/utils/upload';
import {MailOutlined} from '@ant-design/icons';
import {PencilSquareIcon, UserCircleIcon} from '@heroicons/react/24/outline';
import {Form, notification} from 'antd';
import _debounce from 'lodash/debounce';
import {useCallback, useState} from 'react';
import {insertbillingContact} from '../../../../../redux/actions/billingContact';
import {
  getCustomerProfileById,
  queryCustomer,
} from '../../../../../redux/actions/customer';
import {uploadToAwsForUserImage} from '../../../../../redux/actions/upload';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {setBillingContact} from '../../../../../redux/slices/billingAddress';
import {setCustomerProfile} from '../../../../../redux/slices/customer';
import {Checkbox} from '../antd/Checkbox';
import {Divider} from '../antd/Divider';
import {Space} from '../antd/Space';
import OsButton from '../os-button';
import OsInput from '../os-input';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import TableNameColumn from '../os-table/TableNameColumn';
import {AddCustomertInterface} from './os-add-customer-interface';
import {CustomerTabsStyle} from './styled-components';

const AddCustomer: React.FC<AddCustomertInterface> = ({
  drawer,
  form,
  onFinish,
  objectValuesForContact,
  setObjectValueForContact,
  contactDetail,
  setContactDetail,
}) => {
  const [token] = useThemeToken();
  const {billingContact} = useAppSelector((state) => state.billingContact);
  const {customerProfile} = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch();
  const [editContactOIndex, setEditContactIndex] = useState<any>(null);
  const [editBillingAddress, setEditBillingAddress] = useState<Boolean>(false);
  const [newAdd, setNewAdd] = useState<Boolean>(false);
  const [errorFileds, setErrorFileds] = useState<boolean>(false);

  const updateValues = (type: string, indexofupdate: number) => {
    const newArrOfContact: any =
      contactDetail?.length > 0 ? [...contactDetail] : [];

    if (type === 'update') {
      newArrOfContact[indexofupdate] = objectValuesForContact;
    } else {
      newArrOfContact?.push(objectValuesForContact);
    }

    const newBillingObject: any = {
      ...objectValuesForContact,
      customer_id: billingContact?.id,
    };

    if (newBillingObject) {
      dispatch(insertbillingContact(newBillingObject));
    }
    setContactDetail(newArrOfContact);
    setObjectValueForContact({});
    setEditBillingAddress(false);
    setEditContactIndex(null);
    setErrorFileds(false);
    setNewAdd(false);
  };

  const uploadImagesToBackend = async (newFileList: any, index: any) => {
    if (newFileList) {
      notification.open({
        message: `Image is uploading. Please wait`,
        type: 'info',
      });
    }
    const datas = await getBase64(newFileList);

    const mediaType = newFileList?.type.split('/')[0];

    const data = {
      base64: datas,
      type: mediaType,
      file: newFileList,
      userTypes: 'customer',
      userIds: billingContact?.id,
    };
    dispatch(uploadToAwsForUserImage(data)).then((d: any) => {
      if (d?.payload && !drawer) {
        dispatch(setCustomerProfile(d?.payload));
      } else if (d?.payload) {
        dispatch(getCustomerProfileById({id: billingContact?.id})).then(
          (payload: any) => {
            if (payload?.payload) {
              dispatch(
                setBillingContact({
                  BillingContacts: payload?.payload?.BillingContacts,
                  name: payload?.payload?.name,
                  image: payload?.payload?.profile_image,
                  id: payload?.payload?.id,
                }),
              );
            }
          },
        );
        dispatch(queryCustomer(null));
      }
    });
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

  const debounceFn = useCallback(_debounce(handleNotification, 500), [
    billingContact,
  ]);

  const AlphabetsRegex = /^[A-Za-z\s]+$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
          currency: '$', // Set default value here
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
              debounceFn={debounceFn}
              recordId={billingContact?.id}
              justifyContent="start"
              secondaryTextColor={token?.colorPrimary}
              primaryText={
                <Typography name="Body 4/Regular">
                  {billingContact?.name}
                </Typography>
              }
              secondaryText={
                <Typography name="Body 4/Regular">
                  {drawer && `ID: ${billingContact?.id}`}
                </Typography>
              }
              fallbackIcon={
                drawer ? (
                  `${
                    billingContact?.name
                      ?.toString()
                      ?.charAt(0)
                      ?.toUpperCase() ??
                    billingContact?.name?.toString()?.charAt(0)?.toUpperCase()
                  }`
                ) : (
                  <UserCircleIcon />
                )
              }
              logo={drawer ? billingContact?.image : customerProfile}
              iconBg="#1EB159"
              size={drawer ? 50 : 85}
              imgCursor
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
                  <OsInput placeholder="Enter here" />
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
          items={[
            {
              label: 'Shipping Address',
              key: '1',
              children: (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Address Line
                        </Typography>
                      }
                      name="shiping_address_line"
                      rules={[
                        {
                          required: true,
                          message: 'Address Line is required!',
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
                          message: 'Please enter valid city.',
                        },
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
                          message: 'Please enter valid state.',
                        },
                      ]}
                      label={
                        <Typography name="Body 4/Medium">State</Typography>
                      }
                      name="shiping_state"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">Zip Code</Typography>
                      }
                      name="shiping_pin_code"
                      rules={[
                        {
                          required: true,
                          message: 'Zip Code is required!',
                        },
                        {
                          pattern: /^[0-9]+$/,
                          message: 'Please enter valid zip code.',
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
                          message: 'Please enter valid country.',
                        },
                      ]}
                      label={
                        <Typography name="Body 4/Medium">Country</Typography>
                      }
                      name="shiping_country"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                </Row>
              ),
            },
            {
              label: 'Billing Address',
              key: '2',
              children: (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Checkbox
                      style={{marginRight: '10px'}}
                      onChange={(e) => {
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
                    <Typography name="Body 3/Regular">
                      Same as Shipping Address
                    </Typography>
                  </Col>
                  <Col span={24}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">
                          Address Line
                        </Typography>
                      }
                      name="billing_address_line"
                      rules={[
                        {
                          required: true,
                          message: 'Address Line is required!',
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
                          message: 'Please enter valid city.',
                        },
                      ]}
                      label={<Typography name="Body 4/Medium">City</Typography>}
                      name="billing_city"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      rules={[
                        {
                          pattern: /^[A-Za-z\s]+$/,
                          message: 'Please enter valid state.',
                        },
                      ]}
                      label={
                        <Typography name="Body 4/Medium">State</Typography>
                      }
                      name="billing_state"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                  <Col span={12}>
                    <SelectFormItem
                      label={
                        <Typography name="Body 4/Medium">Zip Code</Typography>
                      }
                      name="billing_pin_code"
                      rules={[
                        {
                          required: true,
                          message: 'Zip Code is required!',
                        },
                        {
                          pattern: /^[0-9]+$/,
                          message: 'Please enter valid zip code.',
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
                          message: 'Please enter valid country.',
                        },
                      ]}
                      label={
                        <Typography name="Body 4/Medium">Country</Typography>
                      }
                      name="billing_country"
                    >
                      <OsInput placeholder="Enter here" />
                    </SelectFormItem>
                  </Col>
                </Row>
              ),
            },
            {
              label: 'Contact',
              key: '3',
              children: (
                <>
                  <Row>
                    <Row
                      style={{
                        display: 'flex',
                        marginTop: '10px',
                        width: '100%',
                      }}
                    >
                      {drawer && (
                        <>
                          {' '}
                          {contactDetail?.map((item: any, index: number) => {
                            if (editContactOIndex !== index) {
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
                                          fallbackIcon={`${item?.billing_first_name
                                            ?.toString()
                                            ?.charAt(0)
                                            ?.toUpperCase()}${item?.billing_last_name
                                            ?.toString()
                                            ?.charAt(0)
                                            ?.toUpperCase()}`}
                                          iconBg="#1EB159"
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
                                            setEditBillingAddress(true);
                                            setEditContactIndex(index);
                                            setObjectValueForContact({
                                              ...objectValuesForContact,
                                              billing_email:
                                                item?.billing_email,
                                              billing_last_name:
                                                item?.billing_last_name,
                                              billing_first_name:
                                                item?.billing_first_name,
                                              billing_role: item?.billing_role,
                                              billing_id: item?.id,
                                              id: item?.id,
                                            });
                                          }}
                                          width={24}
                                          style={{color: '#949494'}}
                                        />
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              );
                            }
                          })}
                        </>
                      )}
                    </Row>
                    {(editBillingAddress || !drawer || newAdd) && (
                      <>
                        <Row
                          style={{
                            background: drawer ? '#F6F7F8' : '',
                            borderRadius: drawer ? '5px' : '',
                            padding: drawer ? '10px' : '',
                            marginTop: drawer ? '10px' : '',
                          }}
                        >
                          <Row
                            style={{marginTop: '20px', width: '100%'}}
                            justify="space-between"
                          >
                            <Col style={{width: '47%'}}>
                              <Typography name="Body 4/Regular">
                                First Name
                              </Typography>

                              <OsInput
                                placeholder="First Name"
                                value={
                                  objectValuesForContact?.billing_first_name
                                }
                                onChange={(e) => {
                                  setObjectValueForContact({
                                    ...objectValuesForContact,
                                    billing_first_name: e.target.value,
                                  });
                                }}
                              />
                              {errorFileds &&
                                !objectValuesForContact?.billing_first_name && (
                                  <div style={{color: 'red'}}>
                                    This filed is required!
                                  </div>
                                )}
                              {!AlphabetsRegex?.test(
                                objectValuesForContact?.billing_first_name,
                              ) && (
                                <div style={{color: 'red'}}>
                                  Please enter vaild first name
                                </div>
                              )}
                            </Col>
                            <Col style={{width: '47%'}}>
                              <Typography name="Body 4/Regular">
                                Last Name
                              </Typography>
                              <OsInput
                                placeholder="Last Name"
                                value={
                                  objectValuesForContact?.billing_last_name
                                }
                                onChange={(e) => {
                                  setObjectValueForContact({
                                    ...objectValuesForContact,
                                    billing_last_name: e.target.value,
                                  });
                                }}
                              />
                              {errorFileds &&
                                !objectValuesForContact?.billing_last_name && (
                                  <div style={{color: 'red'}}>
                                    This filed is required!
                                  </div>
                                )}
                              {!AlphabetsRegex?.test(
                                objectValuesForContact?.billing_last_name,
                              ) && (
                                <div style={{color: 'red'}}>
                                  Please enter vaild last name
                                </div>
                              )}
                            </Col>
                          </Row>

                          <Row
                            style={{marginTop: '20px', width: '100%'}}
                            justify="space-between"
                          >
                            <Col style={{width: '47%'}}>
                              <Typography name="Body 4/Regular">
                                Role
                              </Typography>

                              <OsInput
                                placeholder="Role"
                                value={objectValuesForContact?.billing_role}
                                onChange={(e) => {
                                  setObjectValueForContact({
                                    ...objectValuesForContact,
                                    billing_role: e.target.value,
                                  });
                                }}
                              />

                              {!AlphabetsRegex?.test(
                                objectValuesForContact?.billing_role,
                              ) && (
                                <div style={{color: 'red'}}>
                                  Please enter vaild role
                                </div>
                              )}
                            </Col>
                            <Col style={{width: '47%'}}>
                              <Typography name="Body 4/Regular">
                                Email
                              </Typography>

                              <OsInput
                                placeholder="Email"
                                value={objectValuesForContact?.billing_email}
                                onChange={(e) => {
                                  setObjectValueForContact({
                                    ...objectValuesForContact,
                                    billing_email: e.target.value,
                                  });
                                }}
                              />

                              {errorFileds &&
                                !emailRegex?.test(
                                  objectValuesForContact?.billing_email,
                                ) &&
                                objectValuesForContact?.billing_email && (
                                  <div style={{color: 'red'}}>
                                    Please enter vaild email
                                  </div>
                                )}
                            </Col>
                            {drawer && (
                              <Row
                                style={{
                                  marginTop: '20px',
                                  width: '100%',
                                  display: 'flex',
                                  justifyContent: 'end',
                                }}
                              >
                                <OsButton
                                  buttontype="PRIMARY"
                                  clickHandler={() => {
                                    if (
                                      !objectValuesForContact?.billing_email ||
                                      !objectValuesForContact?.billing_first_name ||
                                      !objectValuesForContact?.billing_last_name ||
                                      !objectValuesForContact?.billing_role
                                    ) {
                                      setErrorFileds(true);
                                      return;
                                    }
                                    if (
                                      objectValuesForContact?.customer_id ||
                                      editBillingAddress
                                    ) {
                                      updateValues('update', editContactOIndex);
                                    } else {
                                      updateValues('add', editContactOIndex);
                                    }
                                  }}
                                  text={
                                    editBillingAddress === true
                                      ? 'Update'
                                      : 'Add'
                                  }
                                />
                              </Row>
                            )}
                          </Row>
                          {/* {drawer && (
            
                  )} */}
                        </Row>
                      </>
                    )}
                    {drawer && !newAdd && !editBillingAddress && (
                      <Row
                        style={{marginTop: '20px'}}
                        onClick={() => {
                          setNewAdd(true);
                          // setFormValue({
                          //   ...formValue,
                          //   billing_email: '',
                          //   billing_last_name: '',
                          //   billing_first_name: '',
                          //   billing_role: '',
                          //   customer_id: formValue?.id,
                          // });
                        }}
                      >
                        <Typography name="Body 3/Bold" color="#3DA5D9">
                          {' '}
                          + Add New Contact
                        </Typography>
                      </Row>
                    )}
                  </Row>
                </>
              ),
            },
          ]}
        />
      </Form>
    </>
  );
};

export default AddCustomer;
