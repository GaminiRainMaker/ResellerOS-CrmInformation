import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsContactSelect from '@/app/components/common/os-contact-select';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {formatDate} from '@/app/utils/base';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {getAllCustomer} from '../../../../../redux/actions/customer';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

const DealRegDrawer: FC<any> = ({form, onFinish}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const [customerValue, setCustomerValue] = useState<number>();
  const [contactValue, setContactValue] = useState<any>();
  const [customerData, setCustomerData] = useState<any>([]);
  const {data: dataAddress} = useAppSelector((state) => state?.customer);

  useEffect(() => {
    dispatch(getAllCustomer({}));
  }, []);

  useEffect(() => {
    setCustomerValue(dealReg?.customer_id);
    setContactValue(dealReg?.contact_id);
  }, [dealReg]);

  useEffect(() => {
    if (dataAddress && customerValue) {
      const filteredData = dataAddress.filter(
        (dataAddressItem: any) => dataAddressItem?.id === customerValue,
      );
      setCustomerData(filteredData);
    } else {
      setCustomerData([]);
    }
  }, [dataAddress, customerValue]);

  useEffect(() => {
    setContactValue('');
    form.setFieldsValue({
      industry: customerData?.[0]?.industry,
      website: customerData?.[0]?.website,
      street: customerData?.[0]?.Addresses?.[0]?.shiping_address_line,
      city: customerData?.[0]?.Addresses?.[0]?.shiping_city,
      state: customerData?.[0]?.Addresses?.[0]?.shiping_state,
      country: customerData?.[0]?.Addresses?.[0]?.shiping_country,
      zip_code: customerData?.[0]?.Addresses?.[0]?.shiping_pin_code,
    });
  }, [customerData]);

  return (
    <GlobalLoader loading={customerData?.length <= 0 || !customerValue}>
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        <Space size={24} style={{width: '100%'}} direction="vertical">
          <Row justify="space-between">
            <Col>
              <Typography name="Body 4/Medium" as="div">
                Form Generate Date
              </Typography>
              <Typography name="Body 2/Regular">
                {formatDate(dealReg?.createdAt, 'MM/DD/YYYY')}
              </Typography>
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
                name="contact_id"
                value={contactValue}
                form={form}
              />
            </Col>

            <Col sm={24}>
              <Form.Item
                label={<Typography name="Body 4/Medium">Industry</Typography>}
                name="industry"
              >
                <OsInput
                  placeholder="IT Services"
                  style={{width: '100%'}}
                  disabled
                />
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
                  disabled
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
                name="street"
              >
                <OsInput
                  placeholder="19 Washington Square N"
                  style={{width: '100%'}}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<Typography name="Body 4/Medium">City</Typography>}
                name="city"
              >
                <OsInput
                  placeholder="New York"
                  style={{width: '100%'}}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<Typography name="Body 4/Medium">State</Typography>}
                name="state"
              >
                <OsInput
                  placeholder="New York"
                  style={{width: '100%'}}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<Typography name="Body 4/Medium">Country</Typography>}
                name="country"
              >
                <OsInput placeholder="USA" style={{width: '100%'}} disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<Typography name="Body 4/Medium">Zip Code</Typography>}
                name="zip_code"
              >
                <OsInput placeholder="10011" style={{width: '100%'}} disabled />
              </Form.Item>
            </Col>
          </Row>
        </Space>
      </Form>
    </GlobalLoader>
  );
};

export default DealRegDrawer;
