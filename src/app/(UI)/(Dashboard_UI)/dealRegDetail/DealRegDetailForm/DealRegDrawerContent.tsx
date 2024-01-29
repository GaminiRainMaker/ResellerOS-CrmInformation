import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import Typography from '@/app/components/common/typography';
import {dealRegStatusOptions} from '@/app/utils/CONSTANTS';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../../redux/hook';

const DealDrawerContent: FC<any> = ({form, onFinish}) => {
  const [token] = useThemeToken();
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const [customerValue, setCustomerValue] = useState<number>(0);
  const [billingOptionsData, setBillingOptionData] = useState<any>();
  const [selectedUserId, setSelectedUserId] = useState<any>();
  const customerOptions = dataAddress.map((dataAddressItem: any) => ({
    value: dataAddressItem.id,
    label: (
      <Typography color={token?.colorPrimaryText} name="Body 3/Regular">
        {dataAddressItem.name}
      </Typography>
    ),
  }));
  const [dealRegStatus, setDealRegStatus] = useState<string>('');

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

  useEffect(() => {
    form.resetFields();
  }, [dealReg]);

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      initialValues={dealReg}
    >
      <Space size={24} style={{width: '100%'}} direction="vertical">
        <Row justify="space-between">
          <Col>
            <Typography name="Body 4/Medium" as="div">
              Form Generate Date
            </Typography>
            <Typography name="Body 2/Regular">12/11/2023</Typography>
          </Col>
          <Col>
            <Form.Item
              label={<Typography name="Body 4/Medium">Status</Typography>}
              name="status"
            >
              <CommonStageSelect
                currentStage={dealRegStatus}
                onChange={(value: string) => {
                  setDealRegStatus(value);
                }}
                options={dealRegStatusOptions}
              />
            </Form.Item>
          </Col>
        </Row>

        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Account Information
        </Typography>

        <Row>
          <Col sm={24}>
            <Form.Item
              label={
                <Typography name="Body 4/Medium">Customer Account</Typography>
              }
              name="customer_id"
            >
              <CommonSelect
                placeholder="Impres Technologies"
                style={{width: '100%'}}
                onChange={(value) => {
                  setCustomerValue(value);
                  setSelectedUserId(value);
                }}
                options={customerOptions}
              />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label={
                <Typography name="Body 4/Medium">Account Contact</Typography>
              }
              name="contact_id"
            >
              <CommonSelect
                placeholder="Emma Watson"
                style={{width: '100%'}}
                options={billingOptionsData}
              />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label={<Typography name="Body 4/Medium">Industry</Typography>}
              name="industry_id"
            >
              <CommonSelect placeholder="IT Services" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label={
                <Typography name="Body 4/Medium">Account Website</Typography>
              }
              name="website_url"
            >
              <OsInput
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
            <Form.Item
              label={<Typography name="Body 4/Medium">Street 1</Typography>}
              name="street_1"
            >
              <OsInput
                placeholder="19 Washington Square N"
                style={{width: '100%'}}
              />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label={<Typography name="Body 4/Medium">Street 2</Typography>}
              name="street_2"
            >
              <OsInput placeholder="Select" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<Typography name="Body 4/Medium">City</Typography>}
              name="city"
            >
              <OsInput placeholder="New York" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<Typography name="Body 4/Medium">State</Typography>}
              name="state"
            >
              <OsInput placeholder="New York" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<Typography name="Body 4/Medium">Country</Typography>}
              name="country"
            >
              <OsInput placeholder="USA" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<Typography name="Body 4/Medium">Zip Code</Typography>}
              name="zip_code"
            >
              <OsInput placeholder="10011" style={{width: '100%'}} />
            </Form.Item>
          </Col>
        </Row>
      </Space>
    </Form>
  );
};

export default DealDrawerContent;
