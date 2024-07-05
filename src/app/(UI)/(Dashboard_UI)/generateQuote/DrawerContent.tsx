/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import {Col, Row} from '@/app/components/common/antd/Grid';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import OsOpportunitySelect from '@/app/components/common/os-opportunity-select';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {
  quoteStatusOptions,
  quoteReviewStatusOptions,
} from '@/app/utils/CONSTANTS';
import {currencyFormatter, formatDate} from '@/app/utils/base';
import {Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {getAllOpportunity} from '../../../../../redux/actions/opportunity';
import {getQuoteById} from '../../../../../redux/actions/quote';
import {getAllSyncTable} from '../../../../../redux/actions/syncTable';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import CommonStageSelect from '@/app/components/common/os-stage-select';

const DrawerContent: FC<any> = ({form, onFinish}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteId = searchParams.get('id');
  const getInReviewQuote = searchParams.get('inReviewQuote');
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {quoteById, quoteByIdLoading} = useAppSelector((state) => state.quote);
  const [customerValue, setCustomerValue] = useState<number>(0);
  const [quoteData, setQuoteData] = useState<any>();
  const [billingOptionsData, setBillingOptionData] = useState<any>();
  const {data: syncTableData} = useAppSelector((state) => state.syncTable);
  const [opportunityObject, setOpportunityObject] = useState<any>();
  const [stageNewValue, setStageNewValue] = useState<string>(quoteById?.status);

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
                label: `${itemss.billing_first_name ?? itemss.billing_first_name} ${itemss.billing_last_name ?? itemss.billing_last_name}`,
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
    form.setFieldsValue({
      file_name: quoteById?.file_name,
      opportunity_id: quoteById?.opportunity_id,
      customer_id: quoteById?.customer_id,
      contact_id: quoteById?.contact_id,
      status: quoteById?.status,
      quote_notes: quoteById?.quote_notes,
      quote_shipping: quoteById?.quote_shipping,
      quote_tax: quoteById?.quote_tax,
      quote_name: quoteById?.quote_name,
    });
    setStageNewValue(quoteById?.status);
    setCustomerValue(quoteById?.customer_id);
  }, [quoteById]);

  return (
    <GlobalLoader loading={quoteByIdLoading}>
      <Form
        layout="vertical"
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
              <CommonStageSelect
                options={
                  getInReviewQuote === 'true'
                    ? quoteReviewStatusOptions
                    : quoteStatusOptions
                }
                style={{width: '150px'}}
                onChange={(e: string) => {
                  setStageNewValue(e);
                }}
                currentStage={stageNewValue}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Quote Name" name="file_name">
              <OsInput disabled={getInReviewQuote === 'true' ? true : false} />
            </Form.Item>

            <OsCustomerSelect
              setCustomerValue={setCustomerValue}
              customerValue={customerValue}
              isDisable={getInReviewQuote === 'true' ? true : false}
            />

            <OsOpportunitySelect
              form={form}
              customerValue={customerValue}
              isDisable={getInReviewQuote === 'true' ? true : false}
            />

            <Form.Item label="Contacts" name="contact_id">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Contacts"
                options={billingOptionsData}
                disabled={getInReviewQuote === 'true' ? true : false}
              />
            </Form.Item>

            <Form.Item label=" Quote Note" name="quote_notes">
              <OsInput
                placeholder="Notes"
                disabled={getInReviewQuote === 'true' ? true : false}
              />
            </Form.Item>

            <Form.Item label="Quote Tax" name="quote_tax">
              <OsInputNumber
                min={0}
                precision={2}
                formatter={currencyFormatter}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                disabled={getInReviewQuote === 'true' ? true : false}
                style={{
                  width: '100%',
                }}
                placeholder="Quote Tax"
              />
            </Form.Item>

            <Form.Item label="Quote Shipping" name="quote_shipping">
              <OsInputNumber
                min={0}
                precision={2}
                formatter={currencyFormatter}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                disabled={getInReviewQuote === 'true' ? true : false}
                style={{
                  width: '100%',
                }}
                placeholder="Quote Shipping"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </GlobalLoader>
  );
};

export default DrawerContent;
