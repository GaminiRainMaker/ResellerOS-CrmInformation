/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */

'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
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
import { currencyFormatter, formatDate, handleDate } from '@/app/utils/base';
import { Form } from 'antd';
import { useSearchParams } from 'next/navigation';
import { FC, Suspense, useEffect, useState } from 'react';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import OsButton from '@/app/components/common/os-button';
import moment from 'moment';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { getAllSyncTable } from '../../../../../redux/actions/syncTable';
import { getQuoteByIdForEditQuoteHeader } from '../../../../../redux/actions/quote';
import {
  getAllOpportunity,
  updateOpportunity,
} from '../../../../../redux/actions/opportunity';
import { getAllCustomer } from '../../../../../redux/actions/customer';
import { getAddressByCustomerId } from '../../../../../redux/actions/address';
import { getAllBillingContactByCustomerId } from '../../../../../redux/actions/billingContact';

const DrawerContent: FC<any> = ({ form, onFinish, totalValues }) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteId = searchParams.get('id');
  const isView = searchParams.get('isView');
  const [token] = useThemeToken();

  const { data: dataAddress } = useAppSelector((state) => state.customer);
  // const {quoteById, quoteByIdLoading} = useAppSelector((state) => state.quote);
  const [customerValue, setCustomerValue] = useState<number>();
  const [billingOptionsData, setBillingOptionData] = useState<any>();
  const { data: syncTableData } = useAppSelector((state) => state.syncTable);
  const [opportunityObject, setOpportunityObject] = useState<any>();
  const [quoteByIdData, setQuoteByIdData] = useState<any>();

  const [billingOptions, setBillingOptions] = useState<any>();
  const [shippingOptions, setShippingOptions] = useState<any>();
  const [contactDetails, setContactDetails] = useState<any>();

  const [stageNewValue, setStageNewValue] = useState<string>(
    quoteByIdData?.status,
  );
  const [quoteByIdLoading, setQuoteByIdLoading] = useState<boolean>(false);
  const [opportunityFilterOption, setOpportunityFilterOption] = useState<any>();

  const [opportunitySynced, setOpportunitySynced] = useState<boolean>(false);


  const syncTheOppWithQuote = async () => {
    const data = {
      id: quoteByIdData?.opportunity_id,
      amount: totalValues?.ExitPrice,
      synced_quote: getQuoteId,
    };
    await dispatch(updateOpportunity(data))?.then((payload: any) => {
      if (payload?.payload) {
        setOpportunitySynced(true)
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // getAlllApisData();
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
    await dispatch(getAllOpportunity())?.then((payload: any) => {
      const opportunityOptions = payload?.payload?.map((opportunity: any) => ({
        value: opportunity.id,
        label: (
          <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
            {opportunity.title}
          </Typography>
        ),
      }));

      setOpportunityFilterOption(opportunityOptions);
    });

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
          shipping_phone: payload?.payload?.shipping_phone?.split('#')?.[0],
          billing_phone: payload?.payload?.billing_phone?.split('#')?.[0],
        });
        customerId = payload?.payload?.customer_id;
        opportuntityId = payload?.payload?.opportunity_id;
        setStageNewValue(payload?.payload?.status);
        setCustomerValue(payload?.payload?.customer_id);
        setStageNewValue(payload?.payload?.status);
      },
    );
    const formatValues = (values: any) => {
      // Check if values is a string and not null or undefined
      if (
        typeof values === 'string' &&
        values !== null &&
        values !== undefined
      ) {
        return `${values}-`;
      }
      return '';
    };
    const formatValuesLast = (values: any) => {
      // Check if values is a string and not null or undefined
      if (
        typeof values === 'string' &&
        values !== null &&
        values !== undefined
      ) {
        return `(${values})`;
      }
      return '';
    };

    await dispatch(getAddressByCustomerId(customerId))?.then((payload: any) => {
      const shipparry: any = [];
      const billingArray: any = [];
      if (payload?.payload && payload?.payload?.length > 0) {
        payload?.payload?.map((itemsIn: any) => {
          if (
            itemsIn?.address_type === 'Billing' &&
            (itemsIn?.shiping_address_line ||
              itemsIn?.shiping_city ||
              itemsIn?.shiping_state ||
              itemsIn?.shiping_country ||
              itemsIn?.shiping_pin_code)
          ) {
            billingArray?.push({
              label: `${formatValues(formatStatus(itemsIn?.shiping_address_line))}${formatValues(formatStatus(itemsIn?.shiping_city))}${formatValues(formatStatus(itemsIn?.shiping_state))}${formatValues(formatStatus(itemsIn?.shiping_country))}${formatValuesLast(itemsIn?.shiping_pin_code)}`,
              value: itemsIn?.id,
            });
          } else if (
            itemsIn?.address_type === 'Shipping' &&
            (itemsIn?.shiping_address_line ||
              itemsIn?.shiping_city ||
              itemsIn?.shiping_state ||
              itemsIn?.shiping_country ||
              itemsIn?.shiping_pin_code)
          ) {
            shipparry?.push({
              label: `${formatValues(formatStatus(itemsIn?.shiping_address_line))}${formatValues(formatStatus(itemsIn?.shiping_city))}${formatValues(formatStatus(itemsIn?.shiping_state))}${formatValues(formatStatus(itemsIn?.shiping_country))}${formatValuesLast(itemsIn?.shiping_pin_code)}`,
              value: itemsIn?.id,
            });
          } else if (
            itemsIn?.shiping_address_line ||
            itemsIn?.shiping_city ||
            itemsIn?.shiping_state ||
            itemsIn?.shiping_country ||
            itemsIn?.shiping_pin_code
          ) {
            billingArray?.push({
              label: `${formatValues(formatStatus(itemsIn?.shiping_address_line))}${formatValues(formatStatus(itemsIn?.shiping_city))}${formatValues(formatStatus(itemsIn?.shiping_state))}${formatValues(formatStatus(itemsIn?.shiping_country))}${formatValuesLast(itemsIn?.shiping_pin_code)}`,
              value: itemsIn?.id,
            });
            shipparry?.push({
              label: `${formatValues(formatStatus(itemsIn?.shiping_address_line))}${formatValues(formatStatus(itemsIn?.shiping_city))}${formatValues(formatStatus(itemsIn?.shiping_state))}${formatValues(formatStatus(itemsIn?.shiping_country))}${formatValuesLast(itemsIn?.shiping_pin_code)}`,
              value: itemsIn?.id,
            });
          }
        });
      }
      setShippingOptions(shipparry);
      setBillingOptions(billingArray);
    });
    await dispatch(getAllBillingContactByCustomerId(customerId))?.then(
      (payload: any) => {
        const allContactArrr: any = [];
        if (payload?.payload && payload?.payload?.length > 0) {
          payload?.payload?.map((itemsIn: any) => {
            if (
              itemsIn?.billing_first_name ||
              itemsIn?.billing_last_name ||
              itemsIn?.billing_role ||
              itemsIn?.billing_phone
            ) {
              allContactArrr?.push({
                label: `${formatValues(itemsIn?.billing_first_name)}${formatValues(itemsIn?.billing_last_name)}${formatValues(itemsIn?.billing_role)}${formatValuesLast(itemsIn?.billing_phone)}`,
                value: `${formatValues(itemsIn?.billing_first_name)}${formatValues(itemsIn?.billing_last_name)}${formatValues(itemsIn?.billing_role)}${formatValuesLast(itemsIn?.billing_phone)}#${itemsIn?.id}`,
              });
            }
          });
        }
        setContactDetails(allContactArrr);
      },
    );

    await dispatch(getAllCustomer({}))?.then((payload: any) => { });
    await dispatch(getAllOpportunity())?.then((payload: any) => {
      const oppAdddetails = payload?.payload?.find(
        (itemsIn: any) => itemsIn?.id === opportuntityId,
      );
      if (Number(oppAdddetails?.synced_quote) === Number(getQuoteId)) {
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
      (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
      {},
    );
    setOpportunityObject(singleObjects);
  }, [syncTableData, getQuoteId]);
  const disabledDate = (current: any) =>
    // Disable dates before today
    current && current < moment().startOf('day');
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalLoader loading={quoteByIdLoading}>
        <Form
          layout="vertical"
          wrapperCol={{ flex: 1 }}
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
                {quoteByIdData?.file_name ??
                  (quoteByIdData?.date
                    ? handleDate(quoteByIdData?.date, true)
                    : '--')}
                {/* {formatDate(quoteByIdData?.date, 'MM/DD/YYYY | HH:MM')} */}

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
                  style={{ width: '150px' }}
                  onChange={(e: string) => {
                    setStageNewValue(e);
                  }}
                  currentStage={stageNewValue}
                />
              </Form.Item>
            </Col>
            <Col style={{ marginBottom: '10px' }}>
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
                <OsInput disabled={isView === 'true'} />
              </Form.Item>
              <Form.Item label="Quote #" name="quote_unique_in">
                <OsInput placeholder="ID" disabled />
              </Form.Item>

              <Form.Item label="Expiration Date" name="expiration_date">
                <CommonDatePicker onBlur={undefined} disabledDate={disabledDate}
                />
              </Form.Item>
              <OsCustomerSelect
                setCustomerValue={setCustomerValue}
                customerValue={customerValue}
                isDisable
              />
              <Form.Item label="Opportunity" name="opportunity_id">
                <CommonSelect
                  style={{ width: '100%' }}
                  placeholder="Contacts"
                  options={opportunityFilterOption}
                  disabled
                />
              </Form.Item>
              {/* <OsOpportunitySelect
                form={form}
                customerValue={customerValue}
                isDisable
              /> */}
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
                  style={{ width: '100%' }}
                  placeholder="Contacts"
                  options={billingOptionsData}
                  disabled={isView === 'true'}
                />
              </Form.Item>

              <Form.Item label=" Quote Note" name="quote_notes">
                <OsInput placeholder="Notes" disabled={isView === 'true'} />
              </Form.Item>

              <Form.Item label="Quote Tax" name="quote_tax">
                <OsInputNumber
                  min={0}
                  precision={2}
                  prefix="$"
                  formatter={currencyFormatter}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  disabled={isView === 'true'}
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
                  prefix="$"
                  formatter={currencyFormatter}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  disabled={isView === 'true'}
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

              <Form.Item label="Billing Contact" name="billing_phone">
                <CommonSelect value={56} options={contactDetails} />
              </Form.Item>
              <Form.Item label="Shipping Contact" name="shipping_phone">
                <CommonSelect options={contactDetails} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </GlobalLoader>
    </Suspense>
  );
};

export default DrawerContent;
