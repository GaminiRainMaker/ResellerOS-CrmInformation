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
  const [customerValue, setCustomerValue] = useState<number>(0);
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

  useEffect(() => {
    dispatch(getAllCustomer({}));
  }, []);

  const onSubmit = (values: FormDataProps) => {
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
              />
            </Form.Item>

            <Form.Item label="Customer" name="customer_name">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Select Customer"
                options={customerOptionsData}
                onChange={(e) => {
                  console.log('dfasdasfdsd', e);
                  setCustomerValue(e);
                }}
              />
            </Form.Item>

            <Form.Item label="Contact Assign" name="billing_contact">
              <CommonSelect
                style={{width: '100%'}}
                placeholder="Contact Assign"
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
