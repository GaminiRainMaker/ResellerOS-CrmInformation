/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';

interface FormDataProps {
  customer_id: number;
  account_contact_id: number;
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

const DealDrawerContent: FC<any> = ({setOpen}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const [form] = Form.useForm();
  const [customerValue, setCustomerValue] = useState<number>(0);
  const [billingOptionsData, setBillingOptionData] = useState<any>();

  const [drawerData, setDrawerData] = useState<{
    id: number | string;
    createdAt: string;
    status: string;
    formData: FormDataProps;
  }>({
    id: dealReg?.id,
    createdAt: '12/11/2023',
    status: 'In Progress',
    formData: {
      customer_id: dealReg?.Customer?.id ?? 0,
      account_contact_id: dealReg?.BillingContact?.id ?? 0,
      street_1: dealReg?.Customer?.Addresses?.[0]?.billing_address_line ?? '',
      street_2: dealReg?.Customer?.Addresses?.[0]?.billing_address_line ?? '',
      city: dealReg?.Customer?.Addresses?.[0]?.billing_city ?? '',
      state: dealReg?.Customer?.Addresses?.[0]?.billing_state ?? '',
      country: dealReg?.Customer?.Addresses?.[0]?.billing_country ?? '',
      zip_code: dealReg?.Customer?.Addresses?.[0]?.billing_pin_code ?? '',
    },
  });

  console.log('drawerData', drawerData);

  //   const onSubmit = async (values: FormDataProps) => {
  //     if (
  //       generalSettingData?.attach_doc_type === 'opportunity' ||
  //       syncTableData?.length > 0
  //     ) {
  //       const opportunityDataItemPDfUrl: any = [];
  //       let OpportunityValue: any = {};
  //       opportunityData?.map((opportunityDataItem: any) => {
  //         if (opportunityDataItem?.id === values?.opportunity_id) {
  //           opportunityDataItemPDfUrl.push(
  //             opportunityDataItem?.pdf_url,
  //             quoteById?.pdf_url,
  //           );
  //           if (generalSettingData?.attach_doc_type === 'opportunity') {
  //             OpportunityValue = {
  //               ...opportunityObject,
  //               id: opportunityDataItem?.id,
  //               pdf_url: [
  //                 ...(opportunityDataItem?.pdf_url || []),
  //                 ...opportunityDataItemPDfUrl.flat(),
  //               ],
  //             };
  //           }
  //         }
  //       });
  //       if (generalSettingData?.attach_doc_type === 'opportunity') {
  //         dispatch(updateOpportunity(OpportunityValue));
  //       } else {
  //         dispatch(updateOpportunity(opportunityObject));
  //       }
  //     }

  //     setDrawerData((prev) => ({...prev, formData: values}));
  //     const obj = {
  //       id: Number(getQuoteLineItemId),
  //       ...values,
  //     };
  //     dispatch(updateQuoteById(obj));
  //     dispatch(getQuoteLineItemByQuoteId(Number(getQuoteLineItemId)));
  //     setOpen(false);
  //   };

  const customerOptions = dataAddress.map((dataAddressItem: any) => ({
    value: dataAddressItem.id,
    label: (
      <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
        {dataAddressItem.name}
      </Typography>
    ),
  }));

  useEffect(() => {
    const updatedAllBillingContact: any = [];
    if (dataAddress) {
      dataAddress.forEach((item: any) => {
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
    setBillingOptionData(updatedAllBillingContact);
  }, [dataAddress, customerValue]);

  return (
    <Space size={24} style={{width: '100%'}} direction="vertical">
      <Row justify="space-between">
        <Col>
          <Typography name="Body 4/Medium" as="div">
            Form Generate Date
          </Typography>
          <Typography name="Body 2/Regular">12/11/2023</Typography>
        </Col>
        <Col>
          <Typography name="Body 4/Medium" as="div">
            Status
          </Typography>
          <CommonStageSelect currentStage="In Progress" />
        </Col>
      </Row>

      <Typography name="Body 2/Medium" color={token?.colorInfo}>
        Account Information
      </Typography>
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        // onFinish={onFinish}
        initialValues={drawerData?.formData}
      >
        <Row>
          <Col sm={24}>
            <Form.Item label="Customer Account" name="customer_id">
              <CommonSelect
                placeholder="Impres Technologies"
                style={{width: '100%'}}
                onChange={(value) => {
                  setCustomerValue(value);
                }}
                options={customerOptions}
              />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item label="Account Contact" name="account_contact_id">
              <CommonSelect
                placeholder="Emma Watson"
                style={{width: '100%'}}
                options={billingOptionsData}
              />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item label="Industry" name="industry">
              <CommonSelect placeholder="IT Services" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item label="Account Website" name="account_website">
              <CommonSelect
                placeholder="www.imprestech.com"
                style={{width: '100%'}}
              />
            </Form.Item>
          </Col>
        </Row>

        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Address Information
        </Typography>

        <Row justify="space-between" gutter={[16, 0]}>
          <Col sm={24}>
            <Form.Item label="Street 1" name="street_1">
              <OsInput
                placeholder="19 Washington Square N"
                style={{width: '100%'}}
              />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item label="Street 2" name="street_2">
              <OsInput placeholder="Select" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="City" name="city">
              <OsInput placeholder="New York" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="State" name="state">
              <OsInput placeholder="New York" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Country" name="country">
              <OsInput placeholder="USA" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Zip Code" name="zip_code">
              <OsInput placeholder="10011" style={{width: '100%'}} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default DealDrawerContent;
