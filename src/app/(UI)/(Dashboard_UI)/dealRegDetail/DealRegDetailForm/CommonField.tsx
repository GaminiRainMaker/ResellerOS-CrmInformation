import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsCustomerSelect from '@/app/components/common/os-customer-select';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import OsOpportunitySelect from '@/app/components/common/os-opportunity-select';
import OsPartnerProgramSelect from '@/app/components/common/os-partner-program-select';
import OsPartnerSelect from '@/app/components/common/os-partner-select';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {formatDate} from '@/app/utils/base';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setDealRegUpdateData} from '../../../../../../redux/slices/dealReg';
import {CollapseSpaceStyle} from './styled-components';

const CommonFields: FC<any> = (data) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {dealReg, submitDealRegData} = useAppSelector((state) => state.dealReg);
  const [partnerValue, setPartnerValue] = useState<number>();
  const [commonFieldData, setCommonFieldData] = useState<{
    status: '';
    date_submitted: '';
    expiration_date: '';
    partner_deal_id: '';
    partner_approval_id: '';
    customer_account: '';
    account_contact: '';
    industry: '';
    account_website: '';
    opportunity_description: '';
    opportunity_id: 0;
  }>();

  const handleDealRegInformationChange = (field: string, value: any) => {
    setCommonFieldData((prevData: any) => ({
      ...prevData,
      id: dealReg?.id,
      [field]: value,
    }));
  };

  const ResponseDetailItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Response Detail</Typography>,
      children: (
        <Space
          size={36}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Space
            size={4}
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Typography name="Body 4/Medium">Status</Typography>
            <CommonSelect placeholder="Select" style={{width: '100%'}} />
          </Space>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Date Submitted </Typography>
                <CommonDatePicker
                  // value={data?.data?.date_submitted}
                  onChange={(value: any) =>
                    handleDealRegInformationChange(
                      'date_submitted',
                      formatDate(value),
                    )
                  }
                />
              </Space>
            </Col>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Expiration Date</Typography>
                <CommonDatePicker
                  // value={data?.data?.expiration_date}
                  onChange={(value: any) =>
                    handleDealRegInformationChange(
                      'expiration_date',
                      formatDate(value),
                    )
                  }
                />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner Deal ID</Typography>
                <OsInput
                  placeholder="Enter ID"
                  defaultValue={data?.data?.partner_deal_id}
                  onChange={(e) =>
                    handleDealRegInformationChange(
                      'partner_deal_id',
                      e?.target?.value,
                    )
                  }
                />
              </Space>
            </Col>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">
                  Partner Approval ID
                </Typography>
                <OsInput
                  placeholder="Enter ID"
                  defaultValue={data?.data?.partner_approval_id}
                  onChange={(e) =>
                    handleDealRegInformationChange(
                      'partner_approval_id',
                      e?.target?.value,
                    )
                  }
                />
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    form?.setFieldsValue({
      partner_id: data?.data?.partner_id,
      partner_program_id: data?.data?.partner_program_id,
      opportunity_id: data?.data?.opportunity_id,
      amount: data?.data?.amount,
      estimated_close_date: data?.data?.estimated_close_date,
      opportunity_description: data?.data?.opportunity_description,
      probability: data?.data?.probability,
      customer_id: data?.data?.customer_id,
    });
  }, [data]);

  const onFinish = (values: any) => {
    console.log('valuesvalues', values);
  };

  const OpportunityInformationItem = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium">Opportunity Information</Typography>
      ),
      children: (
        <Form
          layout="vertical"
          form={form}
          // onFinish={onFinish}
          requiredMark={false}
          // onCanPlayCapture={onChange}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <OsPartnerSelect
                name="partner_id"
                setPartnerValue={setPartnerValue}
                form={form}
                partnerProgramName="partner_program_id"
                isSuperAdmin={false}
              />
            </Col>

            <Col sm={24} md={12}>
              <OsPartnerProgramSelect
                name="partner_program_id"
                partnerId={partnerValue}
                form={form}
              />
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <OsOpportunitySelect
                form={form}
                customerValue={data?.data?.customer_id}
              />
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="opportunity_description"
                label="Opportunity Description"
              >
                <OsInput placeholder="Write text here!" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Form.Item name="amount" label="Opportunity Value">
                <OsInput placeholder="Write text here!" />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item name="probability" label="Probability">
                <OsInputNumber
                  min={0}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value!.replace('%', '')}
                  max={100}
                  style={{width: '100%'}}
                  placeholder="0.00%"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Form.Item
                name="estimated_close_date"
                label="Estimated Close Date"
              >
                <CommonDatePicker />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <OsCustomerSelect isRequired={false} />
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return (
    <Row>
      <CollapseSpaceStyle size={24} direction="vertical">
        <OsCollapseAdmin items={ResponseDetailItem} />
      </CollapseSpaceStyle>
      <CollapseSpaceStyle
        size={24}
        direction="vertical"
        style={{
          marginTop: '30px',
        }}
      >
        <OsCollapseAdmin items={OpportunityInformationItem} />
      </CollapseSpaceStyle>
    </Row>
  );
};

export default CommonFields;
