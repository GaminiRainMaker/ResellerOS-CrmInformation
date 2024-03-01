import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {partnerOptions} from '@/app/utils/CONSTANTS';
import {formatDate} from '@/app/utils/base';
import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {setDealRegUpdateData} from '../../../../../../redux/slices/dealReg';
import {CollapseSpaceStyle} from './styled-components';

const CommonFields: FC<any> = (data) => {
  const dispatch = useAppDispatch();
  const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const {dealReg} = useAppSelector((state) => state.dealReg);

  const [partnerProgramOptions, setPartnerProgramOptions] = useState<any>();

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
  const [filteredOppOptions, setFilteredOppOptions] = useState<any>();
  useEffect(() => {
    let opportunityOptions: any;
    if (data?.selectedUserId) {
      const filteredData = opportunityData?.filter((item: any) =>
        item?.customer_id?.toString()?.includes(data?.selectedUserId),
      );
      opportunityOptions = filteredData.map((opportunity: any) => ({
        value: opportunity.id,
        label: opportunity.title,
      }));
    } else {
      opportunityOptions = opportunityData.map((customer: any) => ({
        value: customer.id,
        label: customer.name,
      }));
    }
    setFilteredOppOptions(opportunityOptions);
  }, [data?.selectedUserId, data]);

  const customerOptions = dataAddress.map((customer: any) => ({
    value: customer.id,
    label: customer.name,
  }));

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

  const OpportunityInformationItem = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium">Opportunity Information</Typography>
      ),
      children: (
        <Space
          size={36}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner Account</Typography>
                <CommonSelect
                  placeholder="Cisco"
                  style={{width: '100%'}}
                  defaultValue={data?.data?.partner_id}
                  onChange={(value) => {
                    handleDealRegInformationChange('partner_id', value);
                    // setPartnerProgramOptions(getProgramOptions(value));
                  }}
                  options={partnerOptions}
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
                <Typography name="Body 4/Medium">Partner Programm</Typography>
                <CommonSelect
                  placeholder="Cisco Hardware"
                  defaultValue={data?.data?.partner_program_id}
                  style={{width: '100%'}}
                  onChange={(value) =>
                    handleDealRegInformationChange('partner_program_id', value)
                  }
                  options={partnerProgramOptions}
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
                <Typography name="Body 4/Medium">Opportunity</Typography>
                <CommonSelect
                  placeholder="Blue hive- tech world"
                  style={{width: '100%'}}
                  defaultValue={
                    data?.selectedUserId ? null : data?.data?.Opportunity?.title
                  }
                  options={filteredOppOptions}
                  onChange={(value) =>
                    handleDealRegInformationChange('opportunity_id', value)
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
                  Opportunity Description
                </Typography>
                <OsInput
                  placeholder="Write text here!"
                  style={{width: '100%'}}
                  defaultValue={data?.data?.opportunity_description}
                  onChange={(e) =>
                    handleDealRegInformationChange(
                      'opportunity_description',
                      e?.target?.value,
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
                <Typography name="Body 4/Medium">Opportunity Value</Typography>
                <CommonSelect
                  placeholder="$ 000-000-0000"
                  style={{width: '100%'}}
                  value={data?.data?.Opportunity?.amount}
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
                <Typography name="Body 4/Medium">Probability</Typography>
                <OsInputNumber
                  placeholder="0.00%"
                  style={{width: '100%'}}
                  min={0}
                  max={100}
                  defaultValue={data?.data?.probability}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value!.replace('%', '')}
                  onChange={(value) =>
                    handleDealRegInformationChange('probability', value)
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
                <Typography name="Body 4/Medium">
                  Estimated Close Date
                </Typography>
                <CommonDatePicker
                  // value={data?.data?.estimated_close_date}
                  onChange={(value: any) =>
                    handleDealRegInformationChange(
                      'estimated_close_date',
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
                <Typography name="Body 4/Medium">
                  New or Existing Customer
                </Typography>
                <CommonSelect
                  placeholder="Select"
                  style={{width: '100%'}}
                  options={customerOptions}
                  onChange={(value) =>
                    handleDealRegInformationChange('customer_id', value)
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
    dispatch(setDealRegUpdateData(commonFieldData));
  }, [commonFieldData]);

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
