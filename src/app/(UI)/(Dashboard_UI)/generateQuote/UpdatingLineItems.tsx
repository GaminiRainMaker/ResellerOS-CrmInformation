import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import { SelectFormItem } from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import { pricingMethod } from '@/app/utils/CONSTANTS';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Form } from 'antd';
import { FC, useState } from 'react';
import { UpdateLineItemsInterFace } from './generateQuote.interface';

const fieldOption = [
  {
    label: 'SKU',
    value: 'product_code',
  },
  {
    label: 'Quantity',
    value: 'quantity',
  },
  {
    label: 'MSRP',
    value: 'list_price',
  },
  {
    label: 'Cost',
    value: 'adjusted_price',
  },
  {
    label: 'Description',
    value: 'description',
  },
  {
    label: 'Pricing Method',
    value: 'pricing_method',
  },
  {
    label: 'Amount',
    value: 'line_amount',
  },
];

const UpdatingLineItems: FC<UpdateLineItemsInterFace> = ({
  form,
  onFinish,
  profabilityUpdationState,
  setProfabilityUpdationState,
}) => {
  const [token] = useThemeToken();
  const [finalFieldOption, setFinalFieldOption] = useState<any>(fieldOption);

  const updateFieldOptions = () => {
    const updatedOptions = finalFieldOption?.filter(
      (item: any) =>
        !profabilityUpdationState?.some(
          (data: any) => data?.field === item?.value,
        ),
    );
    console.log('updatedOptions', updatedOptions);
    setFinalFieldOption(updatedOptions);
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{maxWidth: 600}}
      form={form}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
    >
      {profabilityUpdationState?.map(({id, field, value}) => (
        <Row
          justify="space-between"
          align="middle"
          gutter={[16, 16]}
          key={id}
          style={{
            marginBottom: '8px',
          }}
        >
          <Col span={10}>
            <SelectFormItem
              label={<Typography name="Body 4/Medium">Fields</Typography>}
              name={`field_${id}`}
              rules={[
                {
                  required: true,
                  message: 'Field is required!',
                },
              ]}
            >
              <CommonSelect
                allowClear
                placeholder="Select"
                style={{width: '100%'}}
                options={finalFieldOption}
                value={field}
                onChange={(value) => {
                  console.log('value123', value);
                  setProfabilityUpdationState((prev) =>
                    prev.map((prevItem) => {
                      if (prevItem.id === id) {
                        console.log('value123 idsddssd', value);
                        return {...prevItem, field: value};
                      }
                      return prevItem;
                    }),
                  );
                }}
              />
            </SelectFormItem>
          </Col>
          {field && (
            <Col span={10}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Value</Typography>}
                name={`value_${id}`}
                rules={[
                  {
                    required: true,
                    message: 'value is required!',
                  },
                ]}
              >
                {field === 'pricing_method' ? (
                  <CommonSelect
                    placeholder="Select"
                    options={pricingMethod}
                    style={{width: '100%'}}
                    onChange={(selectValue) => {
                      setProfabilityUpdationState((prev) =>
                        prev.map((prevItem) => {
                          if (prevItem.id === id) {
                            return {...prevItem, value: selectValue};
                          }
                          return prevItem;
                        }),
                      );
                    }}
                  />
                ) : (
                  <OsInput
                    value={value}
                    type={
                      field === 'quantity' ||
                      field === 'list_price' ||
                      field === 'adjusted_price' ||
                      field === 'line_amount'
                        ? 'number'
                        : ''
                    }
                    onChange={(e) => {
                      setProfabilityUpdationState((prev) =>
                        prev.map((prevItem) => {
                          if (prevItem.id === id) {
                            return {...prevItem, value: e.target.value};
                          }
                          return prevItem;
                        }),
                      );
                    }}
                  />
                )}
              </SelectFormItem>
            </Col>
          )}
          <Col span={4}>
            <TrashIcon
              width={25}
              color={token?.colorError}
              onClick={(e: any) => {
                console.log('updateFieldOptions', e, e?.target?.value);
                updateFieldOptions();
                setProfabilityUpdationState((prev) =>
                  prev.filter((prevItem) => prevItem.id !== id),
                );
              }}
              style={{paddingTop: '10px'}}
              cursor="pointer"
            />
          </Col>
        </Row>
      ))}

      <Form.Item>
        <Space
          size={4}
          style={{
            width: '100%',
            cursor: 'pointer',
          }}
          onClick={() => {
            setProfabilityUpdationState((prev) => [
              ...prev,
              ...[{id: prev.length + 1, value: '', field: null}],
            ]);
            updateFieldOptions();
          }}
        >
          <PlusIcon
            width={24}
            color={token?.colorLink}
            style={{marginTop: '5px'}}
          />
          <Typography
            name="Body 3/Bold"
            color={token?.colorLink}
            cursor="pointer"
          >
            Add Field
          </Typography>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UpdatingLineItems;
