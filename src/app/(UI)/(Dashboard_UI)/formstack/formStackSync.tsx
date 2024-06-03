'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Button, Divider, Form} from 'antd';

import {useEffect, useState} from 'react';

import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import {
  customerColumnsSync,
  formatStatus,
  opportunityColumnsSync,
  quotLineItemsColumnsSync,
  quoteColumns,
} from '@/app/utils/CONSTANTS';
import {getFormStackByDocId} from '../../../../../redux/actions/formStackSync';
import {queryAllDocuments} from '../../../../../redux/actions/formstack';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
const FormStackSync = () => {
  const [token] = useThemeToken();
  const {data: FormstackData, loading: FormstackLoading} = useAppSelector(
    (state) => state.formstack,
  );
  const [syncedValueForDoc, setSyncValueForDoc] = useState<any>();
  const [documentId, setDocumentId] = useState<number>();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [selectDropdownType, setSelectDropdownType] = useState<string>('Quote');
  const {data: generalSettingData, loading: GeneralSettingLoading} =
    useAppSelector((state) => state.gereralSetting);

  const [columnSelectOptions, setColumnSelectOptions] = useState<any>([]);

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);

  const buttonActiveStyle = {
    background: token.colorPrimaryBg,
    borderColor: token.colorPrimaryBg,
  };

  const buttonInactiveStyle = {
    borderColor: token.colorPrimaryBg,
  };

  useEffect(() => {
    let obj = {
      username: generalSettingData?.api_key,
      password: generalSettingData?.secret_key,
    };
    if (obj) {
      dispatch(queryAllDocuments(obj));
    }
  }, [generalSettingData]);

  useEffect(() => {
    dispatch(getAllGeneralSetting(''));
  }, []);
  useEffect(() => {
    switch (selectDropdownType) {
      case 'Quote Line Item':
        setColumnSelectOptions(quotLineItemsColumnsSync);
        break;
      case 'Customer':
        setColumnSelectOptions(customerColumnsSync);
        break;
      case 'Opportunity':
        setColumnSelectOptions(opportunityColumnsSync);
        break;
      default:
        setColumnSelectOptions(quoteColumns);
    }
  }, [selectDropdownType]);

  const FormstackDataOptions =
    FormstackData &&
    FormstackData.length > 0 &&
    FormstackData?.map((FormstackDataItem: any) => ({
      value: FormstackDataItem.id,
      label: (
        <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
          {FormstackDataItem.name}
        </Typography>
      ),
    }));

  const onFinish = () => {};

  const getDataOfFormStackByDocId = (id: any) => {
    dispatch(getFormStackByDocId(id))?.then((payload: any) => {
      if (payload?.payload) {
        setSyncValueForDoc(JSON?.parse(payload?.payload?.syncJson));
      }
    });
  };

  console.log('payloadpayload', syncedValueForDoc);
  return (
    <Space direction="vertical" size={24} style={{width: '100%'}}>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
              Select Document
            </Typography>
          </Col>
          <Col>
            <SelectFormItem>
              <OsButton text="Save" buttontype="PRIMARY" htmlType="submit" />
            </SelectFormItem>
          </Col>
        </Row>
        <SelectFormItem
          label={<Typography name="Body 4/Medium">Document</Typography>}
          name="document_id"
          rules={[
            {
              required: true,
              message: 'Document is required!',
            },
          ]}
        >
          <CommonSelect
            style={{width: '100%'}}
            placeholder="Select Document"
            allowClear
            options={FormstackDataOptions}
            onChange={(e: any) => {
              setDocumentId(e);
              getDataOfFormStackByDocId(e);
            }}
          />
        </SelectFormItem>
      </Form>

      {syncedValueForDoc?.length > 0 ? (
        <>
          <Typography name="Heading 3/Regular" color={token?.colorPrimaryText}>
            Mapping Available
          </Typography>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px',
              height: '50vh',
              overflow: 'auto',
            }}
          >
            <Col>
              <Row style={{marginTop: '6px'}}>
                {' '}
                <Typography
                  style={{marginLeft: '10px'}}
                  align="center"
                  name="Body 3/Medium"
                >
                  Your File Header
                </Typography>
              </Row>
              <Divider />
              {syncedValueForDoc?.map((item: any) => (
                <Row style={{marginTop: '6px'}}>
                  <OsInput disabled value={formatStatus(item?.preVal)} />
                </Row>
              ))}
            </Col>

            <Col span={16}>
              <Row style={{marginTop: '6px'}}>
                {' '}
                <Typography
                  style={{marginLeft: '10px'}}
                  align="center"
                  name="Body 3/Medium"
                >
                  Quote Header
                </Typography>
              </Row>
              <Divider />
              {syncedValueForDoc?.map((item: any, indexOfCol: number) => (
                <Row style={{marginTop: '6px'}}>
                  <br />
                  <CommonSelect
                    style={{width: '100%'}}
                    placeholder="Select Columns"
                    allowClear
                    options={columnSelectOptions}
                    value={item?.newVal}
                    dropdownRender={(menu) => (
                      <>
                        <Space
                          direction="vertical"
                          style={{padding: '9px 0px 0px 16px'}}
                        >
                          <Typography
                            color={token?.colorPrimaryText}
                            name="Body 3/Regular"
                          >
                            Select by:
                          </Typography>
                          <Space>
                            <Button
                              onClick={() => {
                                setSelectDropdownType('Quote');
                              }}
                              style={
                                selectDropdownType === 'Quote'
                                  ? buttonActiveStyle
                                  : buttonInactiveStyle
                              }
                            >
                              <Typography
                                name="Body 4/Regular"
                                color={
                                  token[
                                    selectDropdownType === 'Quote'
                                      ? 'colorPrimaryHover'
                                      : 'colorPrimaryBorder'
                                  ]
                                }
                                cursor="pointer"
                              >
                                Quote
                              </Typography>
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectDropdownType('Quote Line Item');
                              }}
                              style={
                                selectDropdownType === 'Quote Line Item'
                                  ? buttonActiveStyle
                                  : buttonInactiveStyle
                              }
                            >
                              <Typography
                                name="Body 4/Regular"
                                color={
                                  token[
                                    selectDropdownType === 'Quote Line Item'
                                      ? 'colorPrimaryHover'
                                      : 'colorPrimaryBorder'
                                  ]
                                }
                                cursor="pointer"
                              >
                                Quote Line Item
                              </Typography>
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectDropdownType('Customer');
                              }}
                              style={
                                selectDropdownType === 'Customer'
                                  ? buttonActiveStyle
                                  : buttonInactiveStyle
                              }
                            >
                              <Typography
                                name="Body 4/Regular"
                                color={
                                  token[
                                    selectDropdownType === 'Customer'
                                      ? 'colorPrimaryHover'
                                      : 'colorPrimaryBorder'
                                  ]
                                }
                                cursor="pointer"
                              >
                                Customer
                              </Typography>
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectDropdownType('Opportunity');
                              }}
                              style={
                                selectDropdownType === 'Opportunity'
                                  ? buttonActiveStyle
                                  : buttonInactiveStyle
                              }
                            >
                              <Typography
                                name="Body 4/Regular"
                                color={
                                  token[
                                    selectDropdownType === 'Opportunity'
                                      ? 'colorPrimaryHover'
                                      : 'colorPrimaryBorder'
                                  ]
                                }
                                cursor="pointer"
                              >
                                Opportunity
                              </Typography>
                            </Button>
                          </Space>
                        </Space>
                        <Divider style={{margin: '5px'}} />
                        {menu}
                      </>
                    )}
                  />
                </Row>
              ))}
            </Col>
          </Row>
        </>
      ) : (
        <>
          {documentId && (
            <Typography
              name="Heading 3/Regular"
              color={token?.colorPrimaryText}
            >
              Mapping or Sync Values are not Available for this Document!
            </Typography>
          )}
        </>
      )}
    </Space>
  );
};

export default FormStackSync;
