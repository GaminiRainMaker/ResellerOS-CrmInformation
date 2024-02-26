/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {MailOutlined} from '@ant-design/icons';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import 'react-phone-number-input/style.css';

import {OsPhoneInputStyle} from '@/app/components/common/os-contact/styled-components';
import FormUpload from '@/app/components/common/os-upload/FormUpload';
import FormUploadCard from '@/app/components/common/os-upload/FormUploadCard';
import {
  Checkbox,
  DatePicker,
  Divider,
  Layout,
  Radio,
  Switch,
  TimePicker,
} from 'antd';
import React from 'react';

import {PreviewFormBuilder} from './formBuilder.interface';

const FormBuilderPreview: React.FC<PreviewFormBuilder> = ({cartItems}) => {
  const {Content} = Layout;
  const contentStyle: React.CSSProperties = {
    margin: '24px 24px 24px 0px',
    backgroundColor: 'transparent',
    padding: '12px',
  };

  const layoutStyle = {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  };

  return (
    <Layout style={layoutStyle}>
      <Layout>
        <Content style={contentStyle}>
          <div style={{width: '100%'}}>
            <>
              {cartItems.map((item: any, Sectidx: number) => (
                <div style={{marginTop: '20px'}} key={Sectidx}>
                  <Typography name="Body 1/Medium" color="#2364AA">
                    {item?.section}
                  </Typography>
                  <Row
                    style={{
                      padding: '16px',
                      border: '0.5px',
                      gap: '12px',
                      borderRadius: '12px',
                      backgroundColor: 'white',
                      marginTop: '10px',
                    }}
                  >
                    {item?.content?.map((itemCon: any, ItemConindex: any) => {
                      if (itemCon?.name == 'Table') {
                        return (
                          <Space direction="vertical">
                            <Row justify="space-between">
                              <Col
                                style={{
                                  width: '96px',
                                  height: '26px',
                                  borderRadius: '50px',
                                  padding: '4px 12px 4px 12px',
                                  gap: '12px',
                                  background: '#ECF2F5',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <div
                                  style={{
                                    width: '54px',
                                    height: '18px',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    lineHeight: '18px',
                                  }}
                                >
                                  Table
                                </div>
                              </Col>
                              <Col
                                style={{
                                  width: '96px',
                                  height: '30px',
                                  borderRadius: '50px',
                                  padding: '4px 12px 4px 12px',
                                  gap: '12px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <TrashIcon color="#EB445A" />{' '}
                                <ArrowsPointingOutIcon color="#2364AA" />
                              </Col>
                            </Row>

                            <div
                              style={{
                                display: 'flex',
                                gap: '12px',
                                width: '100%',
                              }}
                            >
                              <Row
                                style={{
                                  background: '#F6F7F8',
                                  padding: '10px',
                                  marginTop: '30px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  width: '100%',
                                }}
                              >
                                <Row style={{width: '100%'}}>
                                  {itemCon?.ColumnsData?.length > 0 &&
                                    itemCon?.ColumnsData?.map(
                                      (
                                        itemColum: any,
                                        indexOfColumn: number,
                                      ) => {
                                        const totalSpanVaue = 24;
                                        const totalCol =
                                          itemCon?.ColumnsData?.length;
                                        const totalLengthAchived =
                                          totalSpanVaue / totalCol;
                                        const totalFloorValue =
                                          Math.floor(totalLengthAchived);
                                        return (
                                          <Col
                                            span={totalFloorValue}
                                            style={{
                                              height: '40px',
                                              borderRadius: '0px 0px 1px 0px',
                                              gap: '8px',
                                              padding: '8px 12px 8px 12px',
                                              background: '#EDEFF2',
                                              width: '100%',
                                              color: '#0D0D0D',
                                              display: 'flex',
                                              justifyContent: 'center',
                                              borderLeft: '1px solid white',
                                            }}
                                          >
                                            {itemColum?.title}
                                          </Col>
                                        );
                                      },
                                    )}
                                </Row>
                                {itemCon?.noOfRowsData?.map(
                                  (rowsMapItem: string) => (
                                    <Row style={{width: '100%'}}>
                                      {itemCon?.ColumnsData?.map(
                                        (itemColum: any) => {
                                          const totalSpanVaue = 24;
                                          const totalCol =
                                            itemCon?.ColumnsData?.length;
                                          const totalLengthAchived =
                                            totalSpanVaue / totalCol;
                                          const totalFloorValue =
                                            Math.floor(totalLengthAchived);
                                          {
                                            // eslint-disable-next-line no-unreachable-loop
                                            console.log(
                                              '4564564',
                                              itemColum?.type === 'single',
                                            );
                                            const optionsData: any = [];
                                            itemColum?.options?.map(
                                              (itemss: any) => {
                                                optionsData?.push({
                                                  label: itemss,
                                                  value: itemss,
                                                });
                                              },
                                            );
                                            return (
                                              <Col
                                                span={totalFloorValue}
                                                style={{
                                                  height: 'auto',
                                                  borderRadius:
                                                    '0px 0px 1px 0px',
                                                  gap: '8px',
                                                  padding: '8px 12px 8px 12px',
                                                  background: 'white',
                                                  color: '#0D0D0D',
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                  border:
                                                    '1px solid rgb(242 242 242)',
                                                  width: '100%',
                                                }}
                                              >
                                                {itemColum?.type === 'single' ||
                                                itemColum?.type ===
                                                  'multiple' ? (
                                                  <CommonSelect
                                                    variant="borderless"
                                                    // type={number}
                                                    mode={itemColum?.type}
                                                    options={optionsData}
                                                    style={{
                                                      border: 'none',
                                                      width: '100%',
                                                    }}
                                                  />
                                                ) : (
                                                  <OsInput
                                                    variant="borderless"
                                                    type={itemColum?.type}
                                                    style={{
                                                      border: 'none',
                                                    }}
                                                  />
                                                )}
                                              </Col>
                                            );
                                          }
                                        },
                                      )}
                                    </Row>
                                  ),
                                )}
                              </Row>
                            </div>
                          </Space>
                        );
                      }
                      if (
                        itemCon?.name == 'Text' ||
                        itemCon?.name == 'Currency' ||
                        itemCon?.name == 'Email' ||
                        itemCon?.name == 'Contact' ||
                        itemCon?.name == 'Time' ||
                        itemCon?.name == 'Add Section' ||
                        itemCon?.name == 'Date'
                      ) {
                        return (
                          <>
                            {' '}
                            <Space direction="vertical" key={ItemConindex}>
                              <Row justify="space-between">
                                <Col
                                  style={{
                                    width: '96px',
                                    height: '26px',
                                    borderRadius: '50px',
                                    padding: '4px 12px 4px 12px',
                                    gap: '12px',
                                    background: '#ECF2F5',
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '104px',
                                      height: '18px',
                                      fontWeight: '500',
                                      fontSize: '12px',
                                      lineHeight: '18px',
                                    }}
                                  >
                                    {itemCon?.name == 'Time'
                                      ? 'Time'
                                      : itemCon?.name == 'Email'
                                        ? 'Email'
                                        : itemCon?.name == 'Currency'
                                          ? 'Currency'
                                          : itemCon?.name == 'Checkbox'
                                            ? 'Checkbox'
                                            : itemCon?.name == 'Radio Button'
                                              ? 'Radio'
                                              : itemCon?.name == 'Date'
                                                ? 'Date'
                                                : itemCon?.name == 'Contact'
                                                  ? 'Contact'
                                                  : itemCon?.name ===
                                                      'Text Content'
                                                    ? 'Header Text'
                                                    : 'Text Filed'}
                                  </div>
                                </Col>
                              </Row>
                              <Typography name="Body 4/Medium">
                                {itemCon?.requiredLabel && itemCon?.label}{' '}
                                {itemCon?.required && (
                                  <span style={{color: 'red'}}>*</span>
                                )}
                              </Typography>
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  gap: '12px',
                                }}
                              >
                                {itemCon?.name == 'Time' ? (
                                  <TimePicker
                                    // format={{
                                    //   format: 'hh:mm A',
                                    //   use12Hours: true,
                                    // }}
                                    use12Hours={itemCon?.use12hours}
                                    format={itemCon?.timeformat}
                                    style={{
                                      width: '100%',
                                      height: '44px',
                                    }}
                                    // type={itemCon?.type}

                                    // style={{width: '270px'}}
                                    // onClick={showDrawer}
                                  />
                                ) : itemCon?.name == 'Currency' ? (
                                  <>
                                    {' '}
                                    <OsInput
                                      suffix={itemCon?.currency}
                                      type={itemCon?.type}
                                      value={
                                        itemCon?.deciamlHide ? '12' : '12.00'
                                      }
                                    />
                                  </>
                                ) : itemCon?.name == 'Date' ? (
                                  <>
                                    <DatePicker
                                      format={itemCon?.dateformat}
                                      style={{
                                        width: '100%',
                                        height: '44px',
                                      }}
                                    />
                                  </>
                                ) : itemCon?.name === 'Contact' ? (
                                  <>
                                    <OsPhoneInputStyle
                                      style={{
                                        border:
                                          '1px solid var(--foundation-neutrals-black-n-70, #a3a3a3)',
                                        borderRadius: '10px',
                                        padding: '3px',
                                      }}
                                      mask={itemCon?.dataformat}
                                      limitMaxLength
                                      defaultCountry={itemCon?.defaultcountry}
                                      countryCallingCodeEditable={false}
                                      max={11}
                                      onChange={(e: any) => {}}
                                    />
                                  </>
                                ) : itemCon?.name === 'Email' ? (
                                  <OsInput
                                    type={itemCon?.type}
                                    suffix={<MailOutlined />}
                                  />
                                ) : (
                                  <OsInput type={itemCon?.type} />
                                )}{' '}
                                {item?.content?.length - 1 === ItemConindex && (
                                  <OsButton
                                    style={{marginLeft: '10px'}}
                                    buttontype="PRIMARY_ICON"
                                    icon="+"
                                  />
                                )}
                              </div>
                              {itemCon?.hintext && (
                                <div>{itemCon?.hintTextValue}</div>
                              )}
                            </Space>
                          </>
                        );
                      }
                      if (
                        itemCon?.name == 'Multi-Select' ||
                        itemCon?.name == 'Drop Down'
                      ) {
                        const optionssMulti: any = [];
                        itemCon?.options?.map((itemoo: any) => {
                          optionssMulti?.push({
                            label: itemoo,
                            value: itemoo,
                          });
                        });

                        return (
                          <>
                            {' '}
                            <Space
                              direction="vertical"
                              style={{
                                width: '100%',
                                marginLeft: '',
                                marginBottom: '20px',
                              }}
                            >
                              <Row justify="space-between">
                                <Col
                                  style={{
                                    width: '96px',
                                    height: '26px',
                                    borderRadius: '50px',
                                    padding: '4px 12px 4px 12px',
                                    gap: '12px',
                                    background: '#ECF2F5',
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '84px',
                                      height: '18px',
                                      fontWeight: '500',
                                      fontSize: '12px',
                                      lineHeight: '18px',
                                    }}
                                  >
                                    {itemCon?.name === 'Drop Down'
                                      ? 'Drop Down'
                                      : 'Multi-Select'}
                                  </div>
                                </Col>
                              </Row>
                              <Typography name="Body 4/Medium">
                                {itemCon?.requiredLabel && itemCon?.label}{' '}
                                {itemCon?.required && (
                                  <span style={{color: 'red'}}>*</span>
                                )}
                              </Typography>

                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  gap: '12px',
                                }}
                              >
                                <CommonSelect
                                  options={optionssMulti}
                                  style={{
                                    // marginTop: '10px',
                                    width: '100%',
                                  }}
                                  mode={itemCon?.type}
                                />
                              </div>
                              {itemCon?.hintext && (
                                <div>{itemCon?.hintTextValue}</div>
                              )}
                            </Space>
                          </>
                        );
                      }
                      if (itemCon?.name == 'Date') {
                        return (
                          <DatePicker
                            style={{
                              marginTop: '10px',
                              width: '100%',
                            }}
                          />
                        );
                      }
                      if (itemCon?.name == 'Text Content') {
                        return (
                          <>
                            {' '}
                            <Space
                              direction="vertical"
                              style={{
                                width: '94%',
                                marginBottom: '20px',
                              }}
                            >
                              <Row justify="space-between">
                                <Col
                                  style={{
                                    width: '100px',
                                    height: '26px',
                                    borderRadius: '50px',
                                    // padding: '4px 12px 4px 12px',
                                    gap: '12px',
                                    background: '#ECF2F5',
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '84px',
                                      height: '18px',
                                      fontWeight: '500',
                                      fontSize: '12px',
                                      lineHeight: '24px',
                                    }}
                                  >
                                    Header Text
                                  </div>
                                </Col>
                              </Row>
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  gap: '12px',
                                }}
                              >
                                <>
                                  {itemCon?.FontSize == 'h1' ? (
                                    <h1
                                      style={{
                                        display: 'flex',
                                        justifyContent: itemCon?.Alignemnt,
                                        width: '100%',
                                      }}
                                    >
                                      {itemCon?.sectionTitle}
                                    </h1>
                                  ) : itemCon?.FontSize == 'h2' ? (
                                    <h2
                                      style={{
                                        display: 'flex',
                                        justifyContent: itemCon?.Alignemnt,
                                        width: '100%',
                                      }}
                                    >
                                      {itemCon?.sectionTitle}
                                    </h2>
                                  ) : itemCon?.FontSize == 'h3' ? (
                                    <h3
                                      style={{
                                        display: 'flex',
                                        justifyContent: itemCon?.Alignemnt,
                                        width: '100%',
                                      }}
                                    >
                                      {itemCon?.sectionTitle}
                                    </h3>
                                  ) : (
                                    <h4
                                      style={{
                                        display: 'flex',
                                        justifyContent: itemCon?.Alignemnt,
                                        width: '100%',
                                      }}
                                    >
                                      {itemCon?.sectionTitle}
                                    </h4>
                                  )}
                                </>
                              </div>
                            </Space>
                          </>
                        );
                      }
                      if (itemCon?.name == 'Line Break') {
                        return (
                          <>
                            {' '}
                            <Divider
                              style={{
                                margin: '0px',
                                border: '1px solid #C7CDD5',
                              }}
                            />
                          </>
                        );
                      }

                      if (
                        itemCon?.name == 'Checkbox' ||
                        itemCon?.name == 'Radio Button' ||
                        itemCon?.name == 'Toggle'
                      ) {
                        return (
                          <>
                            {' '}
                            <Space
                              key={ItemConindex}
                              className="list-item"
                              direction="vertical"
                              style={{
                                width: '95%',
                                marginBottom: '20px',
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '10px',
                              }}
                            >
                              <Row justify="space-between">
                                <Col
                                  style={{
                                    width: '96px',
                                    height: '26px',
                                    borderRadius: '50px',
                                    padding: '4px 12px 4px 12px',
                                    gap: '12px',
                                    background: '#ECF2F5',
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '104px',
                                      height: '18px',
                                      fontWeight: '500',
                                      fontSize: '12px',
                                      lineHeight: '18px',
                                    }}
                                  >
                                    {itemCon?.name == 'Radio Button'
                                      ? 'Radio'
                                      : itemCon?.name == 'Toggle'
                                        ? 'Toggle'
                                        : 'checkbox'}
                                  </div>
                                </Col>
                              </Row>
                              <Typography name="Body 4/Medium">
                                {itemCon?.requiredLabel &&
                                  itemCon?.placeholdertext}{' '}
                                {itemCon?.required && (
                                  <span style={{color: 'red'}}>*</span>
                                )}
                              </Typography>
                              <div
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  gap: '12px',
                                }}
                              >
                                <Row>
                                  {itemCon?.labelOptions?.map(
                                    (
                                      itemLabelOp: any,
                                      itemLabelInde: number,
                                    ) => (
                                      <Col
                                        style={{
                                          display: 'flex',
                                          gap: '10px',
                                          marginBottom: '10px',
                                        }}
                                        span={24}
                                      >
                                        {itemCon?.name === 'Radio Button' ? (
                                          <Radio.Group

                                          //   value={radioValue}
                                          >
                                            <Radio value={itemLabelInde}>
                                              {' '}
                                              {itemLabelOp}
                                            </Radio>
                                          </Radio.Group>
                                        ) : itemCon?.name === 'Toggle' ? (
                                          <>
                                            <Switch /> {itemLabelOp}
                                          </>
                                        ) : (
                                          <>
                                            <Checkbox /> {itemLabelOp}
                                          </>
                                        )}
                                      </Col>
                                    ),
                                  )}
                                </Row>
                              </div>
                              {itemCon?.hintTextValue}
                            </Space>
                          </>
                        );
                      }
                      if (itemCon?.name == 'Attachment') {
                        return (
                          <Space direction="vertical">
                            <Col
                              style={{
                                width: '100px',
                                height: '26px',
                                borderRadius: '50px',
                                // padding: '4px 12px 4px 12px',
                                gap: '12px',
                                background: '#ECF2F5',
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <div
                                style={{
                                  width: '84px',
                                  height: '18px',
                                  fontWeight: '500',
                                  fontSize: '12px',
                                  lineHeight: '24px',
                                  cursor: 'pointer',
                                }}
                              >
                                Attachment{' '}
                                {itemCon?.required && (
                                  <span style={{color: 'red'}}>*</span>
                                )}
                              </div>
                            </Col>
                            {itemCon?.pdfUrl ? (
                              <>
                                {' '}
                                <FormUploadCard
                                  uploadFileData={itemCon?.pdfUrl}
                                />
                              </>
                            ) : (
                              <FormUpload setCollapsed="" />
                            )}
                          </Space>
                        );
                      }
                    })}
                  </Row>
                </div>
              ))}
            </>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default FormBuilderPreview;
