import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {pricingMethod, selectDataForProduct} from '@/app/utils/CONSTANTS';
import {PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import {FC, useState} from 'react';
import {UpdateLineItemsInterFace} from './generateQuote.interface';

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
    label: 'MSRP ($)',
    value: 'list_price',
  },
  {
    label: 'Cost ($)',
    value: 'adjusted_price',
  },
  {
    label: 'Pricing Method',
    value: 'pricing_method',
  },
  {
    label: 'Product Family',
    value: 'product_family',
  },
  {
    label: 'Amount',
    value: 'line_amount',
  },
];

const UpdatingLineItems: FC<UpdateLineItemsInterFace> = ({
  profabilityUpdationState,
  setProfabilityUpdationState,
  tableColumnDataShow,
}) => {
  const [token] = useThemeToken();

  const updatedFieldOptions = fieldOption?.map((option) => {
    const match = tableColumnDataShow?.find(
      (data: any) => data.field_name === option.label,
    );
    return {
      ...option,
      is_editable: match ? match.is_editable : false,
    };
  });
  const editableFieldOptions = updatedFieldOptions?.filter(
    (option) => option?.is_editable,
  );

  const [finalFieldOption, setFinalFieldOption] =
    useState<any>(editableFieldOptions);

  const updateFieldOptions = () => {
    const updatedOptions = finalFieldOption?.filter(
      (item: any) =>
        !profabilityUpdationState?.some(
          (data: any) => data?.field === item?.value,
        ),
    );
    setFinalFieldOption(updatedOptions);
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      style={{maxWidth: 600}}
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
                onChange={(value: string, option: any) => {
                  setProfabilityUpdationState((prev) =>
                    prev.map((prevItem) => {
                      if (prevItem.id === id) {
                        return {
                          ...prevItem,
                          field: value,
                          label: option?.label,
                        };
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
                ) : field === 'product_family' ? (
                  <CommonSelect
                    placeholder="Select"
                    allowClear
                    options={selectDataForProduct}
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
                let tempArrayElement = {value: '', label: ''};
                setProfabilityUpdationState((prev) =>
                  prev.filter((prevItem) => {
                    if (prevItem.id === id) {
                      tempArrayElement = {
                        value: prevItem.field || '',
                        label: prevItem.label,
                      };
                    }
                    return prevItem.id !== id;
                  }),
                );
                setFinalFieldOption((prevOptions: any) => [
                  ...prevOptions,
                  ...[tempArrayElement],
                ]);
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
              ...[
                {
                  id: Math.floor(Math.random() * 10000000 + 10),
                  value: '',
                  field: null,
                  label: '',
                },
              ],
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
