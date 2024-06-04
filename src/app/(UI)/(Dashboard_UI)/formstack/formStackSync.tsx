'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInputPassword from '@/app/components/common/os-input/InputPassword';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Button, Divider, Form} from 'antd';
import Image from 'next/image';
import eyeSlashIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye-slash.svg';
import eyeIcon from '../../../../../public/assets/static/iconsax-svg/Svg/All/outline/eye.svg';

import {useEffect, useState} from 'react';

import CommonSelect from '@/app/components/common/os-select';
import {
  customerColumnsSync,
  formatStatus,
  opportunityColumnsSync,
  quotLineItemsColumnsSync,
  quoteColumns,
} from '@/app/utils/CONSTANTS';
import OsInput from '@/app/components/common/os-input';
import {getFormStackByDocId} from '../../../../../redux/actions/formStackSync';
import {queryAllDocuments} from '../../../../../redux/actions/formstack';
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
  const [syncedNewValue, setNewSyncedValue] = useState<any>([]);
  const [pdfUrlForDocument, setPdfUrlForDocument] = useState<any>();

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
        console.log('435435435435', payload?.payload);
        setPdfUrlForDocument(payload?.payload?.doc_url);
        let values = JSON?.parse(payload?.payload?.syncJson);
        let newArrr: any = [];

        values?.map((itemss: any) => {
          newArrr?.push(itemss);
        });
        setNewSyncedValue(newArrr);
      } else {
        setNewSyncedValue([]);
        setPdfUrlForDocument('');
      }
    });
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
              getDataOfFormStackByDocId(e);
            }}
          />
        </SelectFormItem>
      </Form>

      {syncedValueForDoc?.length > 0 ? (
        <AddDocument
          form={addDocForm}
          documentId={documentId}
          setDocumentId={setDocumentId}
          syncedNewValue={syncedNewValue}
          setNewSyncedValue={setNewSyncedValue}
          showDoucmentDropDown={false}
          pdfUrlForDocument={pdfUrlForDocument}
          setPdfUrlForDocument={setPdfUrlForDocument}
        />
      ) : (
        <>
          {documentId && (
            <>
              <Typography name="Body 3/Regular" color={token?.colorPrimaryText}>
                Mapping or Sync Values are not Available for this Document!
              </Typography>
              <AddDocument
                form={addDocForm}
                documentId={documentId}
                setDocumentId={setDocumentId}
                syncedNewValue={syncedNewValue}
                setNewSyncedValue={setNewSyncedValue}
                showDoucmentDropDown={false}
                pdfUrlForDocument={pdfUrlForDocument}
                setPdfUrlForDocument={setPdfUrlForDocument}
              />
            </>
          )}
        </>
      )}
    </Space>
  );
};

export default FormStackSync;
