import {Checkbox, CheckboxGroup} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import EmptyContainer from '@/app/components/common/os-empty-container';
import CommonSelect from '@/app/components/common/os-select';
import OsTable from '@/app/components/common/os-table';
import OsTabs from '@/app/components/common/os-tabs';
import Typography from '@/app/components/common/typography';
import {Form, Radio} from 'antd';
import {JSX, useEffect, useState} from 'react';
import {getActiveLicensesByOrgUserId} from '../../../../../redux/actions/license';
import {useAppDispatch} from '../../../../../redux/hook';
import {handleDate} from '@/app/utils/base';

const GrantLicense = ({
  form,
  onFinish,
  setActiveKey,
  recordData,
  activeKey,
}: any) => {
  const [licenseType, setLicenseType] = useState('LifeTime');
  const dispatch = useAppDispatch();
  const [activeLicense, setActiveLicense] = useState<any>();

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const handleLicenseTypeChange = (e: any) => {
    setLicenseType(e.target.value);
    const licenseTypeValue = form.getFieldValue('licenseType');
    form.resetFields();
    form.setFieldsValue({licenseType: licenseTypeValue});
  };

  const SelectOption = [
    {
      label: '7 days',
      value: '7 days',
    },
    {
      label: '15 days',
      value: '15 days',
    },
    {
      label: '1 month',
      value: '1 month',
    },
    {
      label: '6 months',
      value: '6 months',
    },
    {
      label: '1 year',
      value: '1 year',
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

  useEffect(() => {
    if (recordData?.id) {
      dispatch(getActiveLicensesByOrgUserId({user_id: recordData.id}))
        .then((data) => {
          const activeLicenses = data?.payload?.activeLicenses;
          // Extract feature_name values from the array
          const features_type =
            activeLicenses?.map((item: any) => item.feature_name) || [];
          if (activeLicenses?.length > 0) {
            setActiveLicense(activeLicenses);

            // Set the extracted values in the form
            form.setFieldsValue({
              features_type, // This will be an array like ["QuoteAI"] or ["QuoteAI", "DealRegAI"]
            });
          }
        })
        .catch((err) => {
          console.log('ERR===>', err);
        });
    }
  }, [recordData]);

  useEffect(() => {
    const features_type =
      activeLicense?.map((item: any) => item.feature_name) || [];
    if (activeLicense?.length > 0) {
      setActiveLicense(activeLicense);

      // Set the extracted values in the form
      form.setFieldsValue({
        features_type, // This will be an array like ["QuoteAI"] or ["QuoteAI", "DealRegAI"]
      });
    }
  }, [activeLicense, activeKey]);

  const items = [
    {
      label: <Typography name="Body 4/Regular">Grant License</Typography>,
      key: '1',
      children: (
        <Row>
          <Col span={24}>
            <Space direction="vertical" style={{width: '100%'}} size={2}>
              <Typography name="Body 3/Medium">License Type</Typography>
              <Form.Item name="licenseType">
                <Radio.Group onChange={handleLicenseTypeChange}>
                  <Radio value="LifeTime">LifeTime</Radio>
                  <Radio value="Paid">Paid</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>

            {licenseType === 'LifeTime' && (
              <Space
                direction="vertical"
                style={{width: '100%', marginTop: '16px'}}
                size={2}
              >
                <Typography name="Body 3/Medium">License Features</Typography>
                <Form.Item name="features">
                  <CheckboxGroup>
                    <Checkbox value="QuoteAI">QuoteAI</Checkbox>
                    <Checkbox value="DealRegAI">DealRegAI</Checkbox>
                  </CheckboxGroup>
                </Form.Item>
              </Space>
            )}

            {licenseType === 'Paid' && (
              <Space direction="vertical" style={{width: '100%'}} size={2}>
                <Typography name="Body 3/Medium">Expiration Time</Typography>
                <Form.Item name="expirationTime">
                  <CommonSelect
                    style={{width: '100%'}}
                    placeholder="Select Expiration Time"
                    options={SelectOption}
                    allowClear
                  />
                </Form.Item>
                <Space
                  direction="vertical"
                  style={{marginTop: '16px', width: '100%'}}
                  size={2}
                >
                  <Typography name="Body 3/Medium">License Features</Typography>
                  <Form.Item name="features">
                    <CheckboxGroup>
                      <Checkbox value="QuoteAI">QuoteAI</Checkbox>
                      <Checkbox value="DealRegAI">DealRegAI</Checkbox>
                    </CheckboxGroup>
                  </Form.Item>
                </Space>
              </Space>
            )}
          </Col>
        </Row>
      ),
    },
    activeLicense?.length > 0
      ? {
          label: <Typography name="Body 4/Regular">Revoke License</Typography>,
          key: '2',
          children: (
            <Row gutter={[12, 12]} justify="space-between">
              <Col span={24}>
                <Space
                  direction="vertical"
                  style={{marginTop: '16px', width: '100%'}}
                  size={2}
                >
                  <Typography name="Body 3/Medium">License Features</Typography>
                  <Form.Item name="features_type">
                    <CheckboxGroup>
                      <Checkbox value="QuoteAI">QuoteAI</Checkbox>
                      <Checkbox value="DealRegAI">DealRegAI</Checkbox>
                    </CheckboxGroup>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          ),
        }
      : null,
    {
      label: <Typography name="Body 4/Regular">Active License</Typography>,
      key: '3',
      children: (
        <Row gutter={[12, 12]} justify="space-between">
          <Col span={24}>
            <Space
              direction="vertical"
              style={{marginTop: '16px', width: '100%'}}
              size={2}
            >
              <OsTable
                loading={false}
                columns={LicenseColumns}
                dataSource={activeLicense}
                locale={locale}
              />
            </Space>
          </Col>
        </Row>
      ),
    },
  ].filter(
    (item): item is {label: JSX.Element; key: string; children: JSX.Element} =>
      Boolean(item),
  ); // Ensures proper type inference

  return (
    <>
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
      >
        <OsTabs defaultActiveKey="1" onChange={onChange} items={items} />
      </Form>
    </>
  );
};

export default GrantLicense;
