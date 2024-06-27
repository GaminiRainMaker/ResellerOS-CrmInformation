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
import {
  getAllDocuments,
  getDocumentById,
} from '../../../../../redux/actions/formstack';
import {getFormStackByDocId} from '../../../../../redux/actions/formStackSync';
import {getAllGeneralSetting} from '../../../../../redux/actions/generalSetting';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import AddDocument from '../generateQuote/AddDocument';
const FormStackSync = () => {
  const [token] = useThemeToken();
  const {data: FormstackData, loading: FormstackLoading} = useAppSelector(
    (state) => state.formstack,
  );
  const [addDocForm] = Form.useForm();
  const [syncedValueForDoc, setSyncValueForDoc] = useState<any>();
  const [documentId, setDocumentId] = useState<number>();
  const [documentName, setDocumentName] = useState<any>();
  const [documentKey, setDocumentKey] = useState<any>();
  const [syncedNewValue, setNewSyncedValue] = useState<any>([]);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [selectDropdownType, setSelectDropdownType] = useState<string>('Quote');

  const [columnSelectOptions, setColumnSelectOptions] = useState<any>([]);

  const [selectedColumn, setSelectColumn] = useState<any>();
  const [optionForLineItem, setOptionForLineItem] = useState<any>();

  const [fieldExist, setFieldExist] = useState<boolean>(true);

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
    dispatch(getAllDocuments(''));
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

  const [formStackDataOPtions, setFormStackDataOPtions] = useState<any>();
  useEffect(() => {
    if (FormstackData && FormstackData?.length > 0) {
      let newArr: any = [];
      FormstackData?.map((items: any) => {
        newArr?.push({
          value: items.id,
          label: items.name,
          key: items.key,
        });
      });
      setFormStackDataOPtions(newArr);
    }
  }, [FormstackData]);

  const onFinish = () => {};
  useEffect(() => {
    setFieldExist(true);
  }, [documentId]);

  const getDataOfFormStackByDocId = (id: any) => {
    dispatch(getDocumentById(id))?.then((payload: any) => {
      let keysOfAllFromFormStackApi: any;
      let optionsARRay: any = [];
      if (payload?.payload?.success?.fields) {
        keysOfAllFromFormStackApi = Object.keys(
          payload?.payload?.success?.fields,
        );
        keysOfAllFromFormStackApi?.map((items: string) => {
          optionsARRay?.push({label: formatStatus(items), value: items});
        });
      }

      setOptionForLineItem(optionsARRay);

      if (payload?.payload?.success?.fields?.length === 0) {
        setFieldExist(false);
      }

      if (keysOfAllFromFormStackApi) {
        dispatch(getFormStackByDocId(id))?.then((payload: any) => {
          if (payload?.payload) {
            let valuesFromSyncApi = JSON?.parse(payload?.payload?.syncJson);
            let newArrForSync: any = [];
            if (
              keysOfAllFromFormStackApi?.length > 0 &&
              valuesFromSyncApi?.length > 0
            ) {
              keysOfAllFromFormStackApi?.map(
                (itemsDoc: any, indexDoc: number) => {
                  let isExistValue = valuesFromSyncApi?.find(
                    (itemSync: any) => itemSync?.preVal === itemsDoc,
                  );

                  let newObj: any;
                  if (isExistValue) {
                    newObj = {
                      preVal: isExistValue?.preVal,
                      newVal: isExistValue?.newVal,
                      key: indexDoc,
                    };
                  } else {
                    newObj = {
                      preVal: itemsDoc,
                      newVal: '',
                      key: indexDoc,
                    };
                  }
                  newArrForSync?.push(newObj);
                },
              );
            }
            setNewSyncedValue(newArrForSync);
          } else {
            let newArr: any = [];
            keysOfAllFromFormStackApi?.map((items: any, index: number) => {
              let newObj: any = {
                preVal: items,
                newVal: '',
                key: index,
              };
              newArr?.push(newObj);
            });
            setNewSyncedValue(newArr);
          }
        });
      } else {
        setNewSyncedValue([]);
      }
    });
  };

  const changeTheLineItems = (value: any) => {
    const newArr = [...syncedNewValue];
    let finIndexOfValue = newArr?.findIndex(
      (items) => items?.preVal === value?.value,
    );
    let newArrAfterChange = newArr?.map((items: any, index: number) => {
      if (finIndexOfValue === index) {
        return {
          ...items,
          newVal: 'QuoteLineItem',
        };
      }
      return {
        ...items,
        newVal: '',
      };
    });

    setNewSyncedValue(newArrAfterChange);
  };
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
          {/* <Col>
            <SelectFormItem>
              <OsButton text="Save" buttontype="PRIMARY" htmlType="submit" />
            </SelectFormItem>
          </Col> */}
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
            labelInValue
            options={formStackDataOPtions}
            onChange={(e: any) => {
              setDocumentName(e?.label);
              setDocumentKey(e?.key);
              setDocumentId(e?.value);
              getDataOfFormStackByDocId(e?.value);
            }}
          />
        </SelectFormItem>

        {/* {optionForLineItem && (
          <SelectFormItem
            style={{marginTop: '10px', width: '100%'}}
            label={
              <Typography name="Body 4/Medium">
                Select LineItem Column
              </Typography>
            }
            name="lineItemId"
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
              labelInValue
              options={optionForLineItem}
              onChange={(e: any) => {
                changeTheLineItems(e);
              }}
            />
          </SelectFormItem>
        )} */}
      </Form>

      {syncedValueForDoc?.length > 0 ? (
        <AddDocument
          form={addDocForm}
          documentId={documentId}
          setDocumentId={setDocumentId}
          syncedNewValue={syncedNewValue}
          setNewSyncedValue={setNewSyncedValue}
          showDoucmentDropDown={false}
          showSyncScreen={true}
          documentName={documentName}
          selectedColumn={selectedColumn}
          documentKey={documentKey}
        />
      ) : (
        <>
          {documentId && (
            <>
              {!fieldExist && (
                <Typography
                  name="Body 3/Regular"
                  color={token?.colorPrimaryText}
                >
                  Feild values not available for this document!
                </Typography>
              )}
              <AddDocument
                form={addDocForm}
                documentId={documentId}
                setDocumentId={setDocumentId}
                syncedNewValue={syncedNewValue}
                setNewSyncedValue={setNewSyncedValue}
                showDoucmentDropDown={false}
                showSyncScreen={true}
                documentName={documentName}
                documentKey={documentKey}
                selectedColumn={selectedColumn}
              />
            </>
          )}
        </>
      )}
    </Space>
  );
};

export default FormStackSync;
