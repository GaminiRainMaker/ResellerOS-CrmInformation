import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {partnerOptions} from '@/app/utils/CONSTANTS';
import {getProgramOptions} from '@/app/utils/base';
import {FC, useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../../redux/hook';
import {CollapseSpaceStyle} from './styled-components';

const CommonFields: FC<any> = (data) => {
  const {data: opportunityData} = useAppSelector((state) => state.Opportunity);
  const {data: dataAddress} = useAppSelector((state) => state.customer);
  const [partnerProgramOptions, setPartnerProgramOptions] = useState<any>();

  const [commonFieldData, setCommonFieldData] = useState<{
    responseDetail: {
      status: '';
      date_submitted: '';
      expiration_date: '';
      partner_deal_id: '';
      partner_approval_id: '';
    };
    accountInformation: {
      customer_account: '';
      account_contact: '';
      industry: '';
      account_website: '';
    };
    addressInformation: {
      customer_account: '';
      account_contact: '';
      industry: '';
      account_website: '';
    };
    opportunityInformation: {
      customer_account: '';
      account_contact: '';
      industry: '';
      account_website: '';
    };
  }>();

  const handleOpportunityInformationChange = (field: string, value: any) => {
    setCommonFieldData((prevData: any) => ({
      ...prevData,
      opportunityInformation: {
        ...prevData?.opportunityInformation,
        [field]: value,
      },
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
                <CommonSelect placeholder="0.00%" style={{width: '100%'}} />
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
                <CommonSelect
                  placeholder="$ 000-000-0000"
                  style={{width: '100%'}}
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
                <CommonSelect
                  placeholder="MM/DD/YYYY"
                  style={{width: '100%'}}
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
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
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
                  defaultValue={data?.data?.title}
                  onChange={(value) => {
                    handleOpportunityInformationChange('partner_id', value);
                    setPartnerProgramOptions(getProgramOptions(value));
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
                  style={{width: '100%'}}
                  onChange={(value) =>
                    handleOpportunityInformationChange(
                      'partner_program_id',
                      value,
                    )
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
                    handleOpportunityInformationChange('opportunity', value)
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
                  onChange={(e) =>
                    handleOpportunityInformationChange(
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
                <OsInput
                  placeholder="0.00%"
                  style={{width: '100%'}}
                  onChange={(e) =>
                    handleOpportunityInformationChange(
                      'probability',
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
                <Typography name="Body 4/Medium">
                  Estimated Close Date
                </Typography>
                <CommonDatePicker
                // value={data?.data?.createdAt}
                // onChange={(value) =>
                //   handleOpportunityInformationChange(
                //     'estimated_close_date',
                //     value,
                //   )
                // }
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
                    handleOpportunityInformationChange('customer_id', value)
                  }
                />
              </Space>
            </Col>
          </Row>
        </Space>
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
