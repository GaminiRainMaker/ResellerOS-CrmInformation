import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsContactSelect from '@/app/components/common/os-contact-select';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';

const DealRegDrawer: FC<any> = ({form, onFinish}) => {
  const [token] = useThemeToken();
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const {data: dealRegAddressData} = useAppSelector(
    (state) => state.dealRegAddress,
  );
  const [customerValue, setCustomerValue] = useState<number>();
  const [contactValue, setContactValue] = useState<any>();

  console.log('dealReg', dealReg);

  useEffect(() => {
    form.setFieldsValue({
      industry: dealReg?.Customer?.industry,
      website: dealReg?.Customer?.website,
      contact_id: dealReg?.contact_id,
    });
    setCustomerValue(dealReg?.customer_id);
    setContactValue(dealReg?.contact_id);
  }, [dealReg]);

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      initialValues={{...dealReg, ...dealRegAddressData}}
    >
      <Space size={24} style={{width: '100%'}} direction="vertical">
        <Row justify="space-between">
          <Col>
            <Typography name="Body 4/Medium" as="div">
              Form Generate Date
            </Typography>
            <Typography name="Body 2/Regular">12/11/2023</Typography>
          </Col>
          {/* <Col>
            <Form.Item
              label={<Typography name="Body 4/Medium">Status</Typography>}
              name="status"
            >
              <CommonStageSelect
                disabled={false}
                style={{width: '120px'}}
                currentStage={dealRegStatus}
                onChange={(value: string) => {
                  setDealRegStatus(value);
                }}
                options={dealRegStatusOptions}
              />
            </Form.Item>
          </Col> */}
        </Row>

        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Account Information
        </Typography>

        <Row>
          <Col sm={24}>
            <OsCustomerSelect
              setCustomerValue={setCustomerValue}
              customerValue={customerValue}
            />
          </Col>
          <Col sm={24}>
            <OsContactSelect
              customerValue={customerValue}
              value={contactValue}
              name="billing_contact_id"
              form={form}
            />
          </Col>

          <Col sm={24}>
            <Form.Item
              label={<Typography name="Body 4/Medium">Industry</Typography>}
              name="industry"
            >
              <OsInput placeholder="IT Services" style={{width: '100%'}} />
            </Form.Item>
          </Col>
          <Col sm={24}>
            <Form.Item
              label={
                <Typography name="Body 4/Medium">Account Website</Typography>
              }
              name="website"
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

export default DealRegDrawer;
