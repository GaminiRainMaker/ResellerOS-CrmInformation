/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import {Col, Row} from '@/app/components/common/antd/Grid';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import OsOpportunitySelect from '@/app/components/common/os-opportunity-select';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import Typography from '@/app/components/common/typography';
import {quoteStatusOptions} from '@/app/utils/CONSTANTS';
import {formatDate} from '@/app/utils/base';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {getAllOpportunity} from '../../../../../redux/actions/opportunity';
import {getQuoteById} from '../../../../../redux/actions/quote';
import {getAllSyncTable} from '../../../../../redux/actions/syncTable';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const DrawerContent: FC<any> = ({open, form, onFinish}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteId = searchParams.get('id');
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const {data: generalSettingData} = useAppSelector(
    (state) => state.gereralSetting,
  );
  const {quoteById, quoteByIdLoading} = useAppSelector((state) => state.quote);
  const [customerValue, setCustomerValue] = useState<number>(0);
  const [quoteData, setQuoteData] = useState<any>();
  const [billingOptionsData, setBillingOptionData] = useState<any>();
  const {data: syncTableData} = useAppSelector((state) => state.syncTable);
  const [opportunityObject, setOpportunityObject] = useState<any>();
  const {userInformation} = useAppSelector((state) => state.user);

  // BillingContacts
  useEffect(() => {
    const customerOptions: any = [];
    const updatedAllBillingContact: any = [];
    const updatedAllCustomer: any = [];

    if (dataAddress) {
      dataAddress.forEach((item: any) => {
        updatedAllCustomer.push(item);
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

    const isLiveCustomer = updatedAllCustomer.filter(
      (item: any) => !item.is_deleted,
    );

    isLiveCustomer.forEach((item: any) => {
      customerOptions.push({
        label: item.name ?? '--',
        value: item.id,
      });
    });

    setBillingOptionData(updatedAllBillingContact);
  }, [dataAddress, customerValue]);

  useEffect(() => {
    dispatch(getAllCustomer({}));
    dispatch(getAllOpportunity());
    dispatch(getQuoteById(Number(getQuoteId))).then((payload) => {
      setQuoteData(payload?.payload);
    });
    dispatch(getAllSyncTable('Quote'));
  }, []);

  useEffect(() => {
    const newRequiredArray: any = [];
    syncTableData?.map((item: any) => {
      if (item?.is_required) {
        newRequiredArray?.push({
          sender: item?.sender_table_col,
          reciver: item?.reciver_table_col,
        });
      }
    });

    const newArrayForOpporQuoteLineItem: any = [];
    newRequiredArray?.map((itemsRe: any) => {
      newArrayForOpporQuoteLineItem?.push({
        key: itemsRe?.reciver,
        value: quoteData?.[itemsRe?.sender],
      });
    });

    const singleObjects = newArrayForOpporQuoteLineItem.reduce(
      (obj: any, item: any) => Object.assign(obj, {[item.key]: item.value}),
      {},
    );
    setOpportunityObject(singleObjects);
  }, [syncTableData, quoteData]);

  useEffect(() => {
    if (getQuoteId) dispatch(getQuoteById(Number(getQuoteId)));
  }, [open]);

  // const onSubmit = async (values: FormDataProps) => {
  //   console.log('values123', values)
  // if (
  //   generalSettingData?.attach_doc_type === 'opportunity' ||
  //   syncTableData?.length > 0
  // ) {
  //   const opportunityDataItemPDfUrl: any = [];
  //   let OpportunityValue: any = {};
  //   opportunityData?.map((opportunityDataItem: any) => {
  //     if (opportunityDataItem?.id === values?.opportunity_id) {
  //       opportunityDataItemPDfUrl.push(
  //         opportunityDataItem?.pdf_url,
  //         quoteById?.pdf_url,
  //       );
  //       if (generalSettingData?.attach_doc_type === 'opportunity') {
  //         OpportunityValue = {
  //           ...opportunityObject,
  //           id: opportunityDataItem?.id,
  //           pdf_url: [
  //             ...(opportunityDataItem?.pdf_url || []),
  //             ...opportunityDataItemPDfUrl.flat(),
  //           ],
  //         };
  //       }
  //     }
  //   });
  //   if (generalSettingData?.attach_doc_type === 'opportunity') {
  //     dispatch(updateOpportunity(OpportunityValue));
  //   } else {
  //     dispatch(updateOpportunity(opportunityObject));
  //   }
  // }
  //   setDrawerData((prev) => ({...prev, formData: values}));
  //   const obj = {
  //     id: Number(getQuoteLineItemId),
  //     ...values,
  //   };
  //   dispatch(updateQuoteById(obj));
  //   setOpen(false);
  // };

  useEffect(() => {
    form.setFieldsValue({
      file_name: quoteById?.file_name,
      opportunity_id: quoteById?.opportunity_id,
      customer_id: quoteById?.customer_id,
      contact_id: quoteById?.contact_id,
      status: quoteById?.status,
    });
    setCustomerValue(quoteById?.customer_id);
  }, [quoteById]);

  return (
    <GlobalLoader loading={quoteByIdLoading}>
      <Form
        layout="vertical"
        name="wrap"
        wrapperCol={{flex: 1}}
        onFinish={onFinish}
        form={form}
        requiredMark={false}
      >
        <Row justify="space-between">
          <Col span={12}>
            <Typography name="Body 4/Medium" as="div">
              Quote Generate Date
            </Typography>
            <Typography name="Body 2/Regular">
              {formatDate(quoteById?.createdAt, 'MM/DD/YYYY | HH:MM')}
            </Typography>
          </Col>
          <Col>
            <Form.Item
              label={
                <Typography name="Body 4/Medium" as="div">
                  Status
                </Typography>
              }
              name="status"
            >
              <CommonSelect options={quoteStatusOptions} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="File Name" name="file_name">
              <OsInput />
            </Form.Item>

            <OsCustomerSelect
              setCustomerValue={setCustomerValue}
              customerValue={customerValue}
            />

            <OsOpportunitySelect form={form} customerValue={customerValue} />

            <Form.Item label="Contacts" name="contact_id">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Contacts"
                options={billingOptionsData}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </GlobalLoader>
  );
};

export default DrawerContent;
