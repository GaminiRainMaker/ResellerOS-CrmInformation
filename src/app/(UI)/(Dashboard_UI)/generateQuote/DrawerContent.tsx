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
  formatStatus,
} from '@/app/utils/CONSTANTS';
import {currencyFormatter, formatDate} from '@/app/utils/base';
import {Checkbox, DatePicker, Form} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {
  getAllOpportunity,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import {
  getQuoteById,
  getQuoteByIdForEditQuoteHeader,
} from '../../../../../redux/actions/quote';
import {getAllSyncTable} from '../../../../../redux/actions/syncTable';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import OsButton from '@/app/components/common/os-button';
import moment from 'moment';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import dayjs from 'dayjs';
import {getAddressByCustomerId} from '../../../../../redux/actions/address';

const DrawerContent: FC<any> = ({form, onFinish, totalValues}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()!;
  const getQuoteId = searchParams.get('id');
  const isView = searchParams.get('isView');
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  // const {quoteById, quoteByIdLoading} = useAppSelector((state) => state.quote);
  const [customerValue, setCustomerValue] = useState<number>();
  const [billingOptionsData, setBillingOptionData] = useState<any>();
  const {data: syncTableData} = useAppSelector((state) => state.syncTable);
  const [opportunityObject, setOpportunityObject] = useState<any>();
  const [quoteByIdData, setQuoteByIdData] = useState<any>();

  const [billingOptions, setBillingOptions] = useState<any>();
  const [shippingOptions, setShippingOptions] = useState<any>();

  const [stageNewValue, setStageNewValue] = useState<string>(
    quoteByIdData?.status,
  );
  const [quoteByIdLoading, setQuoteByIdLoading] = useState<boolean>(false);

  const [opportunitySynced, setOpportunitySynced] = useState<boolean>(false);

  const syncTheOppWithQuote = async () => {
    let data = {
      id: quoteByIdData?.opportunity_id,
      amount: totalValues?.ExitPrice,
      synced_quote: getQuoteId,
    };
    await dispatch(updateOpportunity(data));
    getAlllApisData();
  };
  useEffect(() => {
    const customerOptions: any = [];
    const updatedAllBillingContact: any = [];
    const updatedAllCustomer: any = [];

    if (dataAddress) {
      dataAddress &&
        dataAddress?.forEach((item: any) => {
          updatedAllCustomer?.push(item);
          if (item?.BillingContacts) {
            if (item.id === customerValue) {
              item?.BillingContacts?.forEach((itemss: any) => {
                updatedAllBillingContact?.push({
                  label: `${itemss.billing_first_name ?? itemss?.billing_first_name} ${itemss?.billing_last_name ?? itemss?.billing_last_name}`,
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
  const getAlllApisData = async () => {
    setQuoteByIdLoading(true);
    let opportuntityId: any;
    let customerId: any;
    await dispatch(getQuoteByIdForEditQuoteHeader(Number(getQuoteId)))?.then(
      (payload: any) => {
        setQuoteByIdData(payload?.payload);
        form.setFieldsValue({
          file_name: payload?.payload?.file_name,
          opportunity_id: payload?.payload?.opportunity_id,
          customer_id: payload?.payload?.customer_id,
          contact_id: payload?.payload?.contact_id,
          status: payload?.payload?.status,
          quote_notes: payload?.payload?.quote_notes,
          quote_shipping: payload?.payload?.quote_shipping,
          quote_tax: payload?.payload?.quote_tax,
          quote_name: payload?.payload?.quote_name,
          quote_unique_in: payload?.payload?.quote_unique_in,
          expiration_date: payload?.payload?.expiration_date
            ? moment(payload?.payload?.expiration_date)
            : null,
          billing_id: payload?.payload?.billing_id,
          shipping_id: payload?.payload?.shipping_id,
        });
        customerId = payload?.payload?.customer_id;
        opportuntityId = payload?.payload?.opportunity_id;
        setStageNewValue(payload?.payload?.status);
        setCustomerValue(payload?.payload?.customer_id);
        setStageNewValue(payload?.payload?.status);
      },
    );

    await dispatch(getAddressByCustomerId(customerId))?.then((payload: any) => {
      let shipparry: any = [];
      let billingArray: any = [];
      if (payload?.payload && payload?.payload?.length > 0) {
        payload?.payload?.map((itemsIn: any) => {
          if (itemsIn?.address_type == 'Billing') {
            billingArray?.push({
              label: formatStatus(itemsIn?.shiping_city),
              value: itemsIn?.id,
            });
          } else if (itemsIn?.address_type == 'Shipping') {
            shipparry?.push({
              label: formatStatus(itemsIn?.shiping_city),
              value: itemsIn?.id,
            });
          } else {
            billingArray?.push({
              label: formatStatus(itemsIn?.shiping_city),
              value: itemsIn?.id,
            });
            shipparry?.push({
              label: formatStatus(itemsIn?.shiping_city),
              value: itemsIn?.id,
            });
          }
        });
      }
      console.log('2432424324', shipparry, billingArray, payload?.payload);
      setShippingOptions(shipparry);
      setBillingOptions(billingArray);
    });

    await dispatch(getAllCustomer({}))?.then((payload: any) => {});
    await dispatch(getAllOpportunity())?.then((payload: any) => {
      let oppAdddetails = payload?.payload?.find(
        (itemsIn: any) => itemsIn?.id == opportuntityId,
      );
      if (oppAdddetails?.synced_quote == getQuoteId) {
        setOpportunitySynced(true);
      } else {
        setOpportunitySynced(false);
      }
    });

    await dispatch(getAllSyncTable('Quote'));
    setQuoteByIdLoading(false);
  };

  useEffect(() => {
    getAlllApisData();
  }, [getQuoteId]);

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
        value: getQuoteId?.[itemsRe?.sender],
      });
    });

    const singleObjects = newArrayForOpporQuoteLineItem.reduce(
      (obj: any, item: any) => Object.assign(obj, {[item.key]: item.value}),
      {},
    );
    setOpportunityObject(singleObjects);
  }, [syncTableData, getQuoteId]);

  // useEffect(() => {
  //   setQuoteByIdLoading(true);
  //   form.setFieldsValue({
  //     file_name: quoteByIdData?.file_name,
  //     opportunity_id: quoteByIdData?.opportunity_id,
  //     customer_id: quoteByIdData?.customer_id,
  //     contact_id: quoteByIdData?.contact_id,
  //     status: quoteByIdData?.status,
  //     quote_notes: quoteByIdData?.quote_notes,
  //     quote_shipping: quoteByIdData?.quote_shipping,
  //     quote_tax: quoteByIdData?.quote_tax,
  //     quote_name: quoteByIdData?.quote_name,
  //   });
  //   setStageNewValue(quoteByIdData?.status);
  //   setCustomerValue(quoteByIdData?.customer_id);
  //   setQuoteByIdLoading(false);
  // }, [quoteByIdData]);

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
              {formatDate(quoteByIdData?.createdAt, 'MM/DD/YYYY | HH:MM')}
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
                  isView === 'true'
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
          <Col style={{marginBottom: '10px'}}>
            {opportunitySynced ? (
              <Typography name="Body 3/Regular">
                Opportunity is synced to this quote
              </Typography>
            ) : (
              <OsButton
                text="Sync Opportunity"
                buttontype="PRIMARY"
                clickHandler={() => {
                  syncTheOppWithQuote();
                }}
              />
            )}
          </Col>

          <Col span={24}>
            <Form.Item label="Quote Name" name="file_name">
              <OsInput disabled={isView === 'true' ? true : false} />
            </Form.Item>
            <Form.Item label="Quote #" name="quote_unique_in">
              <OsInput placeholder="ID" disabled={true} />
            </Form.Item>

            <Form.Item label="Expiration Date" name="expiration_date">
              <CommonDatePicker onBlur={undefined} />
            </Form.Item>
            <OsCustomerSelect
              setCustomerValue={setCustomerValue}
              customerValue={customerValue}
              isDisable={isView === 'true' ? true : false}
            />

            <OsOpportunitySelect
              form={form}
              customerValue={customerValue}
              isDisable={isView === 'true' ? true : false}
            />
            {/* <Typography name="Body 4/Regular">Sync Opportunity</Typography>

            <span style={{marginLeft: '10px'}}>
              <Checkbox
                onChange={() => {
                  syncTheOppWithQuote();
                }}
              />
            </span> */}

            <Form.Item label="Contacts" name="contact_id">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Contacts"
                options={billingOptionsData}
                disabled={isView === 'true' ? true : false}
              />
            </Form.Item>

            <Form.Item label=" Quote Note" name="quote_notes">
              <OsInput
                placeholder="Notes"
                disabled={isView === 'true' ? true : false}
              />
            </Form.Item>

            <Form.Item label="Quote Tax" name="quote_tax">
              <OsInputNumber
                min={0}
                precision={2}
                prefix={'$'}
                formatter={currencyFormatter}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                disabled={isView === 'true' ? true : false}
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
                prefix={'$'}
                formatter={currencyFormatter}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                disabled={isView === 'true' ? true : false}
                style={{
                  width: '100%',
                }}
                placeholder="Quote Shipping"
              />
            </Form.Item>
            <Form.Item label="Billing Address" name="billing_id">
              <CommonSelect options={billingOptions} />
            </Form.Item>
            <Form.Item label="Shipping Address" name="shipping_id">
              <CommonSelect options={shippingOptions} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </GlobalLoader>
  );
};

export default DrawerContent;
