'use client';

import {Divider} from '@/app/components/common/antd/Divider';
import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import CommonStageSelect from '@/app/components/common/os-stage-select';
import Typography from '@/app/components/common/typography';
import {StageValue} from '@/app/utils/CONSTANTS';
import {currencyAmountFormatter} from '@/app/utils/base';
import {Form} from 'antd';
import {useState} from 'react';
import OsCustomerSelect from '../os-customer-select';
import OsInputNumber from '../os-input/InputNumber';
import {SelectFormItem} from '../os-oem-select/oem-select-styled';
import {AddOpportunityInterface} from './os-add-opportunity-interface';

const AddOpportunity: React.FC<AddOpportunityInterface> = ({
  onFinish,
  drawer,
  form,
  customerValue,
  setCustomerValue,
  showCustomerSelect,
  stageValue,
}) => {
  const [token] = useThemeToken();
  const [stageNewValue, setStageNewValue] = useState<string>();

  return (
    <>
      {!drawer && (
        <Row
          justify="space-between"
          style={{
            padding: '24px 40px 20px 40px',
            backgroundColor: '#F0F4F7',
            borderRadius: '10px 10px 0px 0px',
          }}
          gutter={[0, 0]}
        >
          <Typography
            name="Body 1/Regular"
            align="left"
            color={token?.colorLinkHover}
          >
            Add Opportunity
          </Typography>
        </Row>
      )}

      <Form
        layout="vertical"
        requiredMark={false}
        style={{
          padding: drawer ? '0px' : '40px',
        }}
        form={form}
        onFinish={onFinish}
      >
        {!showCustomerSelect && (
          <>
            <OsCustomerSelect
              setCustomerValue={setCustomerValue}
              customerValue={customerValue}
              isAddNewCustomer
              isRequired
            />
            <Divider style={{border: '1px solid #C7CDD5'}} />
          </>
        )}

        <Row gutter={[16, 24]} justify="space-between">
          <Col span={24}>
            <SelectFormItem
              label={
                <Typography name="Body 4/Medium">Opportunity Title</Typography>
              }
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Opportunity Title is required!',
                },
              ]}
            >
              <OsInput placeholder="Enter Text" />
            </SelectFormItem>
          </Col>

          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Amount</Typography>}
              name="amount"
              rules={[
                {
                  required: true,
                  message: 'Amount is required!',
                },
                {
                  pattern: /^\d+(?:\.\d+)?$/,
                  message: 'Please enter valid amount.',
                },
              ]}
            >
              <OsInputNumber
                prefix="$"
                min={0}
                precision={2}
                formatter={currencyAmountFormatter}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                disabled={drawer}
                style={{
                  width: '100%',
                }}
                placeholder="Enter Amount"
              />
            </SelectFormItem>
          </Col>
          <Col span={12}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Stages</Typography>}
              name="stages"
              rules={[
                {
                  required: true,
                  message: 'Stages is required!',
                },
              ]}
            >
              <CommonStageSelect
                disabled={false}
                style={{width: '100%', marginTop: '10px'}}
                options={StageValue}
                onChange={(e: string) => {
                  setStageNewValue(e);
                }}
                currentStage={stageNewValue ?? stageValue}
              />
            </SelectFormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddOpportunity;
