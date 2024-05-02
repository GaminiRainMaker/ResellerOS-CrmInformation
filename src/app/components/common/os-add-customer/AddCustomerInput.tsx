/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import TableNameColumn from '@/app/components/common/os-table/TableNameColumn';
import Typography from '@/app/components/common/typography';
import {MailOutlined} from '@ant-design/icons';
import {PencilSquareIcon} from '@heroicons/react/24/outline';
import {Avatar, Checkbox, Space, TabsProps} from 'antd';
import Image from 'next/image';
import {useState} from 'react';
import UserIcon from '../../../../../public/assets/static/userIcon.svg';
import uploadGallery from '../../../../../public/assets/static/uploadGallery.svg';
import {insertAddAddress} from '../../../../../redux/actions/address';
import {
  insertbillingContact,
  updateBillingContact,
} from '../../../../../redux/actions/billingContact';
import {
  getAllCustomer,
  insertCustomer,
} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {CustomerAccountInterface} from './os-add-customer-interface';

const AddCustomerInputVale: React.FC<CustomerAccountInterface> = ({
  formValue,
  setFormValue,
  setCustomerValue,
  customerValue,
  setShowModal,
  drawer,
  setOpen,
}) => {
  const dispatch = useAppDispatch();
  const [token] = useThemeToken();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [editBillingAddress, setEditBillingAddress] = useState<Boolean>(false);
  const [newAdd, setNewAdd] = useState<Boolean>(false);
  const {loading} = useAppSelector((state) => state.customer);
  const [contactDetail, setContactDetail] = useState<[]>();
  const [objectValuesForContact, setObjectValueForContact] = useState<any>();
  const [editContactOIndex, setEditContactIndex] = useState<number>();

  const updateValues = (type: string, indexofupdate: number) => {
    const newArrOfContact: any = [];

    if (type === 'update') {
      newArrOfContact[indexofupdate] = objectValuesForContact;
    } else {
      newArrOfContact?.push(objectValuesForContact);
    }
    setContactDetail(newArrOfContact);
  };

  const addCustomerAndAddress = async () => {
    try {
      // if (!customerValue) {
      //   return null;
      // }
      dispatch(insertCustomer(customerValue)).then((data) => {
        const newAddressObj: any = {
          ...formValue,
          customer_id: data?.payload?.id,
        };

        if (newAddressObj) {
          dispatch(insertAddAddress(newAddressObj));
        }
        if (newAddressObj) {
          dispatch(insertbillingContact(newAddressObj));
        }
      });
      dispatch(getAllCustomer({}));
      setShowModal((p: boolean) => !p);
      setEditBillingAddress(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBillingContacts = async () => {
    try {
      dispatch(updateBillingContact(formValue));
      setEditBillingAddress(false);
      setShowModal((p: boolean) => !p);
      setOpen((p: boolean) => !p);
      setEditBillingAddress(false);
    } catch (error) {
      console.log(error);
    }
  };
  const AddBillingContacts = async () => {
    try {
      dispatch(insertbillingContact(formValue));
      setNewAdd(false);

      setShowModal((p: boolean) => !p);
      setOpen((p: boolean) => !p);
      setEditBillingAddress(false);
    } catch (error) {
      console.log(error);
    }
  };

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <div>
          <Typography
            name="Body 4/Regular"
            color={activeTab === 1 ? '#1C3557' : '#666666'}
            cursor="pointer"
          >
            Shipping Address
          </Typography>
          <div
            style={{
              border: activeTab === 1 ? '1px solid #1C3557' : '',
              marginTop: '10px',
            }}
          />
        </div>
      ),
      key: '1',
    },
    {
      label: (
        <div>
          <Typography
            name="Body 4/Regular"
            color={activeTab === 2 ? '#1C3557' : '#666666'}
            cursor="pointer"
          >
            Billing Address
          </Typography>
          <div
            style={{
              border: activeTab === 2 ? '1px solid #1C3557' : '',
              marginTop: '10px',
            }}
          />
        </div>
      ),
      key: '2',
    },
    {
      label: (
        <div>
          <Typography
            name="Body 4/Regular"
            color={activeTab === 3 ? '#1C3557' : '#666666'}
            cursor="pointer"
          >
            Contact
          </Typography>
          <div
            style={{
              marginTop: '10px',
              border: activeTab === 3 ? '1px solid #1C3557' : '',
            }}
          />
        </div>
      ),
      key: '3',
    },
  ];
  return (
    <>
      <Space
        size={0}
        direction="vertical"
        style={{width: '100%', padding: drawer ? '' : '24px 60px 20px 60px'}}
      >
        <Row justify="space-between" align="middle">
          <Col style={{marginTop: drawer ? '7px' : ''}} span={drawer ? 24 : 6}>
            {drawer ? (
              <>
                {' '}
                <div>
                  {' '}
                  <Space style={{marginBottom: '10px'}}>
                    <Avatar shape="circle" size="large" />
                    <Space direction="vertical" size={0}>
                      <Typography name="Body 3/Regular">
                        {customerValue?.name}
                      </Typography>
                    </Space>
                  </Space>
                </div>
                <Typography
                  name="Body 4/Medium"
                  color={token?.colorPrimaryText}
                >
                  ID
                </Typography>
                <OsInput
                  disabled
                  placeholder="ID"
                  // value={customerValue?.name}
                  onChange={(e: any) => {
                    setCustomerValue({
                      ...customerValue,
                      name: e.target.value,
                    });
                  }}
                />
              </>
            ) : (
              <Image
                src={uploadGallery}
                alt="uploadGallery"
                style={{cursor: 'pointer'}}
              />
            )}
          </Col>
          <Col style={{marginTop: drawer ? '7px' : ''}} span={drawer ? 24 : 8}>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              Legal Name
            </Typography>

            <OsInput
              placeholder="Legal name"
              value={customerValue?.name}
              onChange={(e: any) => {
                setCustomerValue({...customerValue, name: e.target.value});
              }}
            />
          </Col>
          <Col style={{marginTop: drawer ? '7px' : ''}} span={drawer ? 24 : 8}>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              Default Currency
            </Typography>

            <OsInput
              placeholder="Default Currency"
              value={customerValue?.currency}
              onChange={(e: any) => {
                setCustomerValue({
                  ...customerValue,
                  currency: e.target.value,
                });
              }}
            />
          </Col>
        </Row>
      </Space>

      <div
        style={{
          border: ' 1px solid #C7CDD5',
          marginLeft: drawer ? '' : '40px',
          marginRight: drawer ? '' : '40px',
          width: drawer ? '100%' : '90%',
          marginTop: '40px',
          marginBottom: '20px',
        }}
      />
      <Space
        size={0}
        direction="vertical"
        style={{width: '100%', padding: drawer ? '' : '24px 40px 20px 40px'}}
      >
        <Row justify="space-between" align="middle">
          {tabItems?.map((item: any) => (
            <Col span={8}>
              <Typography
                onClick={() => {
                  setActiveTab(Number(item?.key));
                  setEditBillingAddress(false);
                }}
                name="Heading 3/Medium"
                color={token?.colorPrimaryText}
                align="center"
              >
                {item?.label}
              </Typography>
            </Col>
          ))}
        </Row>
        {activeTab === 1 ? (
          <Row>
            <Row style={{marginTop: '20px', width: '100%'}}>
              <Typography name="Body 4/Regular">Address Line</Typography>
              <OsInput
                placeholder="Address Line"
                value={formValue?.shiping_address_line}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    shiping_address_line: e.target.value,
                  });
                }}
              />
            </Row>
            <Row
              style={{marginTop: '20px', width: '100%'}}
              justify="space-between"
            >
              <Col style={{width: '47%'}}>
                <Typography name="Body 4/Regular">City</Typography>

                <OsInput
                  placeholder="City"
                  value={formValue?.shiping_city}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      shiping_city: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col style={{width: '47%'}}>
                <Typography name="Body 4/Regular">State</Typography>

                <OsInput
                  placeholder="State"
                  value={formValue?.shiping_state}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      shiping_state: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row
              style={{marginTop: '20px', width: '100%'}}
              justify="space-between"
            >
              <Col style={{width: '47%'}}>
                <Typography name="Body 4/Regular">Zip Code</Typography>

                <OsInput
                  placeholder="pin code"
                  value={formValue?.shiping_pin_code}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      shiping_pin_code: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col style={{width: '47%'}}>
                <Typography name="Body 4/Regular">Country</Typography>

                <OsInput
                  placeholder="Country"
                  value={formValue?.shiping_country}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      shiping_country: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
          </Row>
        ) : activeTab === 2 ? (
          <Row>
            <Row style={{marginTop: '20px', marginBottom: '5px'}}>
              <Checkbox
                checked={formValue?.bill_preVale}
                style={{marginRight: '10px'}}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormValue({
                      ...formValue,
                      billing_address_line: formValue?.shiping_address_line,
                      billing_city: formValue?.shiping_city,
                      billing_state: formValue?.shiping_state,
                      billing_pin_code: formValue?.shiping_pin_code,
                      billing_country: formValue?.shiping_country,
                      bill_preVale: true,
                    });
                  } else {
                    setFormValue({
                      ...formValue,
                      billing_address_line: '',
                      billing_city: '',
                      billing_state: '',
                      billing_pin_code: '',
                      billing_country: '',
                      bill_preVale: false,
                    });
                  }
                }}
              />{' '}
              <Typography name="Body 3/Regular" align="left">
                Same as Shipping Address
              </Typography>
            </Row>
            <Row style={{marginTop: '20px', width: '100%'}}>
              <Typography name="Body 4/Regular">Address Line</Typography>
              <OsInput
                placeholder="Address Line"
                value={formValue?.billing_address_line}
                onChange={(e) => {
                  setFormValue({
                    ...formValue,
                    billing_address_line: e.target.value,
                  });
                }}
              />
            </Row>
            <Row
              style={{marginTop: '20px', width: '100%'}}
              justify="space-between"
            >
              <Col style={{width: '47%'}}>
                <Typography name="Body 4/Regular">City</Typography>
                <OsInput
                  placeholder="City"
                  value={formValue?.billing_city}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      billing_city: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col style={{width: '47%'}}>
                <Typography name="Body 4/Regular">State</Typography>
                <OsInput
                  placeholder="State"
                  value={formValue?.billing_state}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      billing_state: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row
              style={{marginTop: '20px', width: '100%'}}
              justify="space-between"
            >
              <Col style={{width: '47%'}}>
                <Typography name="Body 4/Regular">Zip Code</Typography>
                <OsInput
                  placeholder="pin code"
                  value={formValue?.billing_pin_code}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      billing_pin_code: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col style={{width: '47%'}}>
                <Typography name="Body 4/Regular">Country</Typography>
                <OsInput
                  placeholder="Country"
                  value={formValue?.billing_country}
                  onChange={(e) => {
                    setFormValue({
                      ...formValue,
                      billing_country: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
          </Row>
        ) : (
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
                  {contactDetail?.map((item: any, index: number) => (
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

                                setFormValue({
                                  ...formValue,
                                  billing_email: item?.billing_email,
                                  billing_last_name: item?.billing_last_name,
                                  billing_first_name: item?.billing_first_name,
                                  billing_role: item?.billing_role,
                                  billing_id: item?.id,
                                });
                              }}
                              width={24}
                              style={{color: '#949494'}}
                            />
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  ))}
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
                      <Typography name="Body 4/Regular">First Name</Typography>

                      <OsInput
                        placeholder="First Name"
                        value={objectValuesForContact?.billing_first_name}
                        onChange={(e) => {
                          setObjectValueForContact({
                            ...objectValuesForContact,
                            billing_first_name: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col style={{width: '47%'}}>
                      <Typography name="Body 4/Regular">Last Name</Typography>
                      <OsInput
                        placeholder="Last Name"
                        value={objectValuesForContact?.billing_last_name}
                        onChange={(e) => {
                          setObjectValueForContact({
                            ...objectValuesForContact,
                            billing_last_name: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>

                  <Row
                    style={{marginTop: '20px', width: '100%'}}
                    justify="space-between"
                  >
                    <Col style={{width: '47%'}}>
                      <Typography name="Body 4/Regular">Role</Typography>

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
                    </Col>
                    <Col style={{width: '47%'}}>
                      <Typography name="Body 4/Regular">Email</Typography>

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
                    </Col>
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
                        clickHandler={
                          formValue?.customer_id
                            ? AddBillingContacts
                            : updateBillingContacts
                        }
                        text={formValue?.customer_id ? 'ADD' : 'UPDATE'}
                      />
                    </Row>
                  </Row>
                  {/* {drawer && (
            
                  )} */}
                </Row>
              </>
            )}
            {drawer && (
              <Row
                style={{marginTop: '20px'}}
                onClick={() => {
                  setNewAdd(true);
                  setFormValue({
                    ...formValue,
                    billing_email: '',
                    billing_last_name: '',
                    billing_first_name: '',
                    billing_role: '',
                    customer_id: formValue?.id,
                  });
                }}
              >
                <Typography name="Body 3/Bold" color="#3DA5D9">
                  {' '}
                  + Add New Contact
                </Typography>
              </Row>
            )}
          </Row>
        )}
        {!drawer && (
          <Row
            style={{
              marginTop: '20px',
              width: '100%',
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <OsButton
              loading={loading}
              buttontype="PRIMARY"
              clickHandler={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                activeTab === 3
                  ? addCustomerAndAddress()
                  : setActiveTab(Number(+activeTab + 1));
              }}
              text={activeTab === 3 ? 'Add' : 'Next'}
            />
          </Row>
        )}
      </Space>
    </>
  );
};

export default AddCustomerInputVale;
