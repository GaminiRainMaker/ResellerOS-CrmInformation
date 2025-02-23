import {Checkbox, CheckboxGroup} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import EmptyContainer from '@/app/components/common/os-empty-container';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {handleDate} from '@/app/utils/base';
import {Form, Radio} from 'antd';
import {useState} from 'react';

const GrantLicense = ({form, onFinish}: any) => {
  const [licenseCategory, setLicenseCategory] = useState<any>('Organization');
  const [isLifetime, setIsLifetime] = useState('ExpirationTime');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleCheckboxChange = (checkedValues: string[]) => {
    setSelectedFeatures(checkedValues);
  };

  const handleLicenseCategoryChange = (e: any) => {
    setLicenseCategory(e.target.value);
    const licenseCategoryValue = form.getFieldValue('licenseCategory');
    form.resetFields();
    form.setFieldsValue({
      licenseCategory: licenseCategoryValue,
    });
    setSelectedFeatures([]);
  };

  const licenseTypeChange = (e: any) => {
    setIsLifetime(e.target.value);
    const licenseCategoryValue = form.getFieldValue('licenseCategory');
    const licenseTypeValue = form.getFieldValue('licenseType');
    form.resetFields();
    form.setFieldsValue({
      licenseCategory: licenseCategoryValue,
      licenseType: licenseTypeValue,
    });
    setSelectedFeatures([]);
  };

  const SelectOption = [
    {
      label: 'Days',
      value: 'days',
    },
    {
      label: 'Month',
      value: 'month',
    },
    {
      label: 'Year',
      value: 'year',
    },
  ];

  const locale = {
    emptyText: <EmptyContainer title="No Active License" />,
  };

  const LicenseColumns = [
    {
      title: (
        <Typography name="Body 4/Medium" className="dragHandler">
          Feature Name
        </Typography>
      ),
      dataIndex: 'feature_name',
      key: 'feature_name',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: <Typography name="Body 4/Medium">License Type</Typography>,
      dataIndex: 'license_type',
      key: 'license_type',
      render: (text: string) => (
        <Typography name="Body 4/Regular">{text ?? '--'}</Typography>
      ),
    },
    {
      title: <Typography name="Body 4/Medium">Expiration Date</Typography>,
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      render: (text: string) => (
        <Typography name="Body 4/Regular">
          {text ? handleDate(text, true) : '--'}
        </Typography>
      ),
    },
  ];

  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
    >
      <br />
      <Row>
        <Col span={24}>
          <Space direction="vertical" style={{width: '100%'}} size={2}>
            <Typography name="Body 3/Medium">License Category</Typography>
            <SelectFormItem
              name="licenseCategory"
              initialValue={licenseCategory}
            >
              <Radio.Group onChange={handleLicenseCategoryChange}>
                <Radio value="Individual">Individual</Radio>
                <Radio value="Organization">Organization</Radio>
              </Radio.Group>
            </SelectFormItem>
          </Space>

          <Space
            direction="vertical"
            style={{width: '100%', marginTop: '16px'}}
            size={2}
          >
            <Typography name="Body 3/Medium">License Type</Typography>
            <SelectFormItem name="licenseType" initialValue={isLifetime}>
              <Radio.Group onChange={licenseTypeChange}>
                <Radio value="ExpirationTime">Expiration Time</Radio>
                <Radio value="Lifetime">Lifetime</Radio>
              </Radio.Group>
            </SelectFormItem>
          </Space>

          {isLifetime === 'ExpirationTime' && (
            <Space
              direction="vertical"
              style={{width: '100%', marginTop: '16px'}}
              size={2}
            >
              <Typography name="Body 3/Medium">Expiration Time</Typography>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <SelectFormItem name="expirationTime">
                    <OsInput
                      style={{width: '80%'}}
                      placeholder="Enter a number"
                    />
                  </SelectFormItem>
                </Col>
                <Col span={12}>
                  <SelectFormItem name="expirationTimeUnit">
                    <CommonSelect
                      style={{width: '80%'}}
                      placeholder="Select Expiration Time"
                      options={SelectOption}
                      allowClear
                    />
                  </SelectFormItem>
                </Col>
              </Row>
            </Space>
          )}

          <Space
            direction="vertical"
            style={{width: '100%', marginTop: '16px'}}
            size={2}
          >
            <Typography name="Body 3/Medium">License Features</Typography>
            <SelectFormItem name="features">
              <CheckboxGroup onChange={handleCheckboxChange}>
                <Checkbox value="QuoteAI">QuoteAI</Checkbox>
                <Checkbox value="DealRegAI">DealRegAI</Checkbox>
              </CheckboxGroup>
            </SelectFormItem>

            {licenseCategory !== 'Individual' && (
              <Row gutter={[16, 0]}>
                <Col>
                  {selectedFeatures.includes('QuoteAI') && (
                    <SelectFormItem
                      label="Enter QuoteAI Seats"
                      name="quoteAISeats"
                    >
                      <OsInput placeholder="Enter number of seats for QuoteAI" />
                    </SelectFormItem>
                  )}
                </Col>
                <Col>
                  {selectedFeatures.includes('DealRegAI') && (
                    <SelectFormItem
                      label="Enter DealRegAI Seats"
                      name="dealRegAISeats"
                    >
                      <OsInput placeholder="Enter number of seats for DealRegAI" />
                    </SelectFormItem>
                  )}
                </Col>
              </Row>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default GrantLicense;
