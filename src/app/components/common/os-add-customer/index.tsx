/* eslint-disable react/no-array-index-key */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import Typography from '@/app/components/common/typography';
import {MailOutlined} from '@ant-design/icons';
import {PencilSquareIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import Image from 'next/image';
import uploadGallery from '../../../../../public/assets/static/uploadGallery.svg';
import {useAppSelector} from '../../../../../redux/hook';
import {Checkbox} from '../antd/Checkbox';
import {Divider} from '../antd/Divider';
import {Space} from '../antd/Space';
import OsInput from '../os-input';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import TableNameColumn from '../os-table/TableNameColumn';
import {AddCustomertInterface} from './os-add-customer-interface';
import {CustomerTabsStyle} from './styled-components';

const AddCustomer: React.FC<AddCustomertInterface> = ({
  drawer,
  form,
  onFinish,
}) => {
  const [token] = useThemeToken();
  const {billingContact} = useAppSelector((state) => state.billingContact);

  console.log('billingContact', billingContact);

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
      >
        <Row justify="space-between">
          <Col
            span={drawer ? 24 : 4}
            style={{
              marginBottom: drawer ? '5px' : '',
            }}
          >
            {drawer ? (
              <TableNameColumn
                justifyContent="start"
                secondaryTextColor={token?.colorPrimary}
                primaryText={
                  <Typography name="Body 4/Regular">
                    {billingContact?.name}
                  </Typography>
                }
                secondaryText={
                  <Typography name="Body 4/Regular">
                    ID: {billingContact?.id}
                  </Typography>
                }
                fallbackIcon={`${
                  billingContact?.name?.toString()?.charAt(0)?.toUpperCase() ??
                  billingContact?.name?.toString()?.charAt(0)?.toUpperCase()
                }`}
                iconBg="#1EB159"
              />
            ) : (
              <Image
                src={uploadGallery}
                alt="uploadGallery"
                style={{cursor: 'pointer'}}
              />
            )}
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
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: 'Please enter valid currency.',
                    },
                  ]}
                >
                  <OsInput placeholder="Enter here" defaultValue="Dollar" />
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
                  {drawer && billingContact?.BillingContacts?.length > 0 ? (
                    // <Row
                    //   style={{
                    //     display: 'flex',
                    //     marginTop: '10px',
                    //     width: '100%',
                    //   }}
                    // >
                    //   {billingContact?.map((item: any, index: number) => (
                    //     <Col key={item?.key} span={24}>
                    //       <Row
                    //         key={index}
                    //         style={{
                    //           background: '#F6F7F8',
                    //           padding: '12px',
                    //           borderRadius: '12px',
                    //           margin: '5px',
                    //         }}
                    //         justify="space-between"
                    //       >
                    //         <Col>
                    //           <Space direction="vertical" size={12}>
                    //             <TableNameColumn
                    //               primaryText={
                    //                 <Typography name="Body 3/Regular">
                    //                   {item?.billing_first_name}{' '}
                    //                   {item?.billing_last_name}
                    //                 </Typography>
                    //               }
                    //               secondaryText={
                    //                 <Typography name="Body 4/Regular">
                    //                   {item?.billing_role}
                    //                 </Typography>
                    //               }
                    //               fallbackIcon={`${item?.billing_first_name
                    //                 ?.toString()
                    //                 ?.charAt(0)
                    //                 ?.toUpperCase()}${item?.billing_last_name
                    //                 ?.toString()
                    //                 ?.charAt(0)
                    //                 ?.toUpperCase()}`}
                    //               iconBg="#1EB159"
                    //             />
                    //             <Typography name="Body 4/Regular">
                    //               {' '}
                    //               <MailOutlined
                    //                 size={24}
                    //                 style={{marginRight: '5px'}}
                    //               />
                    //               {item?.billing_email}
                    //             </Typography>
                    //           </Space>
                    //         </Col>
                    //         <Col>
                    //           {' '}
                    //           <Row
                    //             justify="center"
                    //             align="middle"
                    //             style={{height: '100%'}}
                    //           >
                    //             <PencilSquareIcon
                    //               // onClick={() => {
                    //               //   setEditBillingAddress(true);
                    //               //   setFormValue({
                    //               //     ...formValue,
                    //               //     billing_email: item?.billing_email,
                    //               //     billing_last_name:
                    //               //       item?.billing_last_name,
                    //               //     billing_first_name:
                    //               //       item?.billing_first_name,
                    //               //     billing_role: item?.billing_role,
                    //               //     billing_id: item?.id,
                    //               //   });
                    //               // }}
                    //               width={24}
                    //               style={{color: '#949494'}}
                    //             />
                    //           </Row>
                    //         </Col>
                    //       </Row>
                    //     </Col>
                    //   ))}
                    // </Row>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">
                              First Name
                            </Typography>
                          }
                          name="billing_first_name"
                          rules={[
                            {
                              required: true,
                              message: 'Name is required!',
                            },
                          ]}
                        >
                          <OsInput placeholder="Enter here" />
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
                          <OsInput placeholder="Enter here" />
                        </SelectFormItem>
                      </Col>
                      <Col span={24}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">
                              Job Title
                            </Typography>
                          }
                          name="billing_role"
                        >
                          <OsInput placeholder="Enter here" />
                        </SelectFormItem>
                      </Col>
                      <Col span={24}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">Email</Typography>
                          }
                          name="billing_email"
                          rules={
                            [
                              // {
                              //   required: true,
                              //   message: 'Zip Code is required!',
                              // },
                            ]
                          }
                        >
                          <OsInput placeholder="Enter here" />
                        </SelectFormItem>
                      </Col>
                    </Row>
                  ) : (
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">
                              First Name
                            </Typography>
                          }
                          name="billing_first_name"
                          rules={[
                            {
                              required: true,
                              message: 'Name is required!',
                            },
                          ]}
                        >
                          <OsInput placeholder="Enter here" />
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
                          <OsInput placeholder="Enter here" />
                        </SelectFormItem>
                      </Col>
                      <Col span={24}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">
                              Job Title
                            </Typography>
                          }
                          name="billing_role"
                        >
                          <OsInput placeholder="Enter here" />
                        </SelectFormItem>
                      </Col>
                      <Col span={24}>
                        <SelectFormItem
                          label={
                            <Typography name="Body 4/Medium">Email</Typography>
                          }
                          name="billing_email"
                          rules={
                            [
                              // {
                              //   required: true,
                              //   message: 'Zip Code is required!',
                              // },
                            ]
                          }
                        >
                          <OsInput placeholder="Enter here" />
                        </SelectFormItem>
                      </Col>
                    </Row>
                  )}
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
