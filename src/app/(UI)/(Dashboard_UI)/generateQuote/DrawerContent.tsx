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
import {updateQuoteById} from '../../../../../redux/actions/quote';
import {getQuoteLineItemByQuoteId} from '../../../../../redux/actions/quotelineitem';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {getAllCustomer} from '../../../../../redux/actions/customer';

interface FormDataProps {
  file_name: string;
  opportunity: string;
  customer_name: string;
}

const DrawerContent: FC<any> = ({setOpen}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getQuoteLineItemId = searchParams.get('id');
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {quoteLineItemByQuoteID} = useAppSelector(
    (state) => state.quoteLineItem,
  );
  const [form] = Form.useForm();
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
      opportunity: quoteLineItemByQuoteID?.[0]?.Quote?.opportunity ?? '',
      customer_name: quoteLineItemByQuoteID?.[0]?.Quote?.customer_name ?? '',
    },
  });

  const [customerOptionsData, setCustomerOptionData] = useState<any>();
  const [billingOptionsData, setBillingOptionData] = useState<any>();

  // BillingContacts
  useEffect(() => {
    const billingOptions: any = [];
    const customerOptions: any = [];
    const AllBillingContact: any = [];
    const AllCustomer: any = [];
    if (dataAddress) {
      dataAddress?.map((item: any) => {
        AllCustomer?.push(item);
        if (item?.BillingContacts) {
          item?.BillingContacts?.map((itemss: any) => {
            AllBillingContact?.push(itemss);
          });
        }
      });
    }

    const isLiveAndBilling = AllBillingContact?.filter(
      (item: any) => !item?.is_deleted && item?.billing,
    );
    const isLiveCustomer = AllCustomer?.filter(
      (item: any) => !item?.is_deleted,
    );
    isLiveAndBilling?.map((item: any) => {
      billingOptions?.push({
        label: `${item?.billing_first_name}${item?.billing_last_name}`,
        value: item?.id,
      });
    });
    isLiveCustomer?.map((item: any) => {
      customerOptions?.push({
        label: item?.name,
        value: item?.id,
      });
    });
    setCustomerOptionData(customerOptions);
    setBillingOptionData(billingOptions);
  }, [dataAddress]);
  useEffect(() => {
    dispatch(getAllCustomer(''));
  }, []);

  const onSubmit = (values: FormDataProps) => {
    setDrawerData((prev) => ({...prev, formData: values}));
    const obj = {
      id: Number(getQuoteLineItemId),
      ...values,
    };
    console.log('weetree', values);
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
          <Typography name="Body 2/Regular">{drawerData?.createdAt}</Typography>
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

            <Form.Item label="Opportunity" name="opportunity">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Select Opportunity"
                // options={bundleOptions}
                onChange={(e) => {
                  console.log('object', e);
                }}
              />
            </Form.Item>

            <Form.Item label="Customer" name="customer_name">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Select Customer"
                options={customerOptionsData}
                onChange={(e) => {}}
              />
            </Form.Item>

            <Form.Item label="Billing Contact" name="billing_contact">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Billing Contact"
                options={billingOptionsData}
                onChange={(e) => {}}
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
