/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import OsStatusWrapper from '@/app/components/common/os-status';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {formatDate} from '@/app/utils/base';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {
  getAllOpportunity,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import {
  getQuoteById,
  updateQuoteById,
} from '../../../../../redux/actions/quote';
import {getQuoteLineItemByQuoteId} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {getAllSyncTable} from '../../../../../redux/actions/syncTable';

interface FormDataProps {
  file_name: string;
  opportunity_id: number;
  customer_id: number;
}

const DrawerContent: FC<any> = ({setOpen}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteLineItemId = searchParams.get('id');
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {quoteLineItemByQuoteID} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const {data: generalSettingData} = useAppSelector(
    (state) => state.gereralSetting,
  );
  const {quoteById} = useAppSelector((state) => state.quote);

  const [form] = Form.useForm();
  const [customerValue, setCustomerValue] = useState<number>(0);
  const [quoteData, setQuoteData] = useState<any>();
  const [drawerData, setDrawerData] = useState<{
    id: number | string;
    createdAt: string;
    status: string;
    formData: FormDataProps;
  }>({
    id: 1,
    createdAt: quoteLineItemByQuoteID?.[0]?.Quote?.createdAt ?? '12/11/2023',
    status: quoteLineItemByQuoteID?.[0]?.Quote?.is_completed
      ? 'Completed'
      : quoteLineItemByQuoteID?.[0]?.Quote?.is_drafted
        ? 'In Progress'
        : 'Drafts',
    formData: {
      file_name: quoteLineItemByQuoteID?.[0]?.Quote?.file_name ?? '',
      opportunity_id: quoteLineItemByQuoteID?.[0]?.Quote?.opportunity_id ?? 0,
      customer_id: quoteLineItemByQuoteID?.[0]?.Quote?.customer_id ?? 0,
    },
  });

  const [customerOptionsData, setCustomerOptionData] = useState<any>();
  const [billingOptionsData, setBillingOptionData] = useState<any>();
  const {data: syncTableData} = useAppSelector((state) => state.syncTable);
  const [opportunityObject, setOpportunityObject] = useState<any>();

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

    setCustomerOptionData(customerOptions);
    setBillingOptionData(updatedAllBillingContact);
  }, [dataAddress, customerValue]);

  const opportunityOptions = opportunityData.map((opportunity: any) => ({
    value: opportunity.id,
    label: opportunity.title,
  }));

  useEffect(() => {
    dispatch(getAllCustomer({}));
    dispatch(getAllOpportunity());
    dispatch(getQuoteById(Number(getQuoteLineItemId))).then((payload) => {
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

  const onSubmit = async (values: FormDataProps) => {
    if (
      generalSettingData?.attach_doc_type === 'opportunity' ||
      syncTableData?.length > 0
    ) {
      const opportunityDataItemPDfUrl: any = [];
      let OpportunityValue: any = {};
      opportunityData?.map((opportunityDataItem: any) => {
        if (opportunityDataItem?.id === values?.opportunity_id) {
          opportunityDataItemPDfUrl.push(
            opportunityDataItem?.pdf_url,
            quoteById?.pdf_url,
          );
          if (generalSettingData?.attach_doc_type === 'opportunity') {
            OpportunityValue = {
              ...opportunityObject,
              id: opportunityDataItem?.id,
              pdf_url: [
                ...(opportunityDataItem?.pdf_url || []),
                ...opportunityDataItemPDfUrl.flat(),
              ],
            };
          }
        }
      });
      if (generalSettingData?.attach_doc_type === 'opportunity') {
        dispatch(updateOpportunity(OpportunityValue));
      } else {
        dispatch(updateOpportunity(opportunityObject));
      }
    }

    setDrawerData((prev) => ({...prev, formData: values}));
    const obj = {
      id: Number(getQuoteLineItemId),
      ...values,
    };
    dispatch(updateQuoteById(obj));
    dispatch(getQuoteLineItemByQuoteId(Number(getQuoteLineItemId)));
    setOpen(false);
  };

  return (
    <Space size={24} style={{width: '100%'}} direction="vertical">
      <Row justify="space-between">
        <Col>
          <Typography name="Body 4/Medium" as="div">
            Quote Generate Date
          </Typography>
          <Typography name="Body 2/Regular">
            {formatDate(drawerData?.createdAt, 'MM/DD/YYYY | HH:MM')}
          </Typography>
        </Col>
        <Col>
          <Typography name="Body 4/Medium" as="div">
            Status
          </Typography>
          <OsStatusWrapper value={drawerData?.status} />
        </Col>
      </Row>
      <Row>
        <Col style={{width: '100%'}}>
          <Form
            layout="vertical"
            name="wrap"
            wrapperCol={{flex: 1}}
            onFinish={onSubmit}
            form={form}
            initialValues={drawerData?.formData}
          >
            <Form.Item label="File Name" name="file_name">
              <OsInput />
            </Form.Item>

            <Form.Item label="Opportunity" name="opportunity_id">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Select Opportunity"
                options={opportunityOptions}
                // value={}
              />
            </Form.Item>

            <Form.Item label="Customer" name="customer_id">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Select Customer"
                options={customerOptionsData}
                onChange={(e) => {
                  setCustomerValue(e);
                }}
              />
            </Form.Item>

            <Form.Item label="Contacts" name="billing_contact">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Contacts"
                options={billingOptionsData}
              />
            </Form.Item>

            <Form.Item label=" ">
              <OsButton
                text="Update Changes"
                buttontype="PRIMARY"
                clickHandler={() => form.submit()}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Space>
  );
};

export default DrawerContent;
