import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import {
  StyledDivider,
  ToggleColStyled,
} from '@/app/components/common/os-div-row-col/styled-component';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {convertToSnakeCase} from '@/app/utils/base';
import {MailOutlined} from '@ant-design/icons';
import {Form, Radio, TimePicker} from 'antd';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {UniqueFieldsProps} from './dealReg.interface';
import {useSearchParams} from 'next/navigation';
interface CheckboxState {
  [key: string]: boolean;
}
const UniqueFields: React.FC<UniqueFieldsProps> = ({
  data,
  form,
  activeKey,
  handleBlur,
  formData,
}) => {
  const searchParams = useSearchParams()!;
  const salesForceUrl = searchParams.get('instance_url');

  const allContent =
    data?.form_data?.length > 0 &&
    data?.form_data?.[0] &&
    JSON.parse(data?.form_data[0]).flatMap((section: any) => section.content);
  const [uniqueTemplateData, setUniqueTemplateData] = useState<any>();
  const [radioValues, setRadioValues] = useState<{[key: string]: any}>({});

  const getInputComponent = (
    itemCon: any,
    itemIndex: any,
    activeKey: any,
    required: any,
    userfill: any,
  ) => {
    const fieldName = convertToSnakeCase(itemCon?.label);
    const initialValue = uniqueTemplateData?.[fieldName];
    let commonProps;
    if (salesForceUrl) {
      commonProps = {
        defaultValue: initialValue,
      };
    } else {
      commonProps = {
        defaultValue: initialValue,
        onBlur: handleBlur,
      };
    }

    const dateName =
      'u_' +
      convertToSnakeCase(itemCon.label) +
      itemIndex +
      activeKey +
      (required ? '_required' : '') +
      (userfill ? '_userfill' : '');

    switch (itemCon?.name) {
      case 'Text':
      case 'Email':
      case 'Contact':
      case 'Time':
      case 'Date':
      case 'Currency':
        return (
          <>
            {itemCon?.name === 'Time' ? (
              <TimePicker
                use12Hours={itemCon?.use12hours}
                format={itemCon?.timeformat}
                style={{width: '100%', height: '44px'}}
              />
            ) : itemCon?.name === 'Currency' ? (
              <OsInput
                suffix={itemCon?.currency}
                type={itemCon?.type}
                {...commonProps}
              />
            ) : itemCon?.name === 'Date' ? (
              <CommonDatePicker
                format="MMM D, YYYY"
                onChange={(date, dateString) => {
                  form.setFieldValue(dateName, date);
                  if (
                    'onBlur' in commonProps &&
                    typeof commonProps.onBlur === 'function'
                  ) {
                    commonProps.onBlur();
                  }
                }}
              />
            ) : itemCon?.name === 'Email' ? (
              <OsInput
                type="email"
                suffix={<MailOutlined />}
                {...commonProps}
              />
            ) : (
              <OsInput type={itemCon?.type} {...commonProps} />
            )}
          </>
        );
      case 'Multi-Select':
      case 'Drop Down':
        const optionssMulti = itemCon?.options?.map((itemoo: any) => ({
          label: itemoo,
          value: itemoo,
        }));
        return (
          <CommonSelect
            allowClear
            options={optionssMulti}
            style={{width: '100%'}}
            mode={itemCon?.type}
            {...commonProps}
          />
        );

      case 'Checkbox':
      case 'Toggle':
        return (
          <>
            {itemCon?.name === 'Checkbox' || itemCon?.name === 'Toggle' ? (
              itemCon?.labelOptions?.map(
                (itemLabelOp: any, itemLabelIndex: number) => (
                  <Col
                    span={Math.floor(24 / itemCon?.columnRequired)}
                    key={itemLabelIndex}
                  >
                    {itemCon?.name === 'Toggle' ? (
                      <>
                        <Switch
                        // checked={
                        //   checkboxState[itemLabelOp as keyof CheckboxState]
                        // }
                        // onChange={() => handleToggleChange(itemLabelOp)}
                        ></Switch>{' '}
                        {itemLabelOp}
                      </>
                    ) : (
                      <Checkbox
                      // checked={form.getFieldValue(itemLabelOp) === 'true'}
                      // onChange={(e) => handleCheckboxChange(itemLabelOp, e)}
                      >
                        {itemLabelOp}
                      </Checkbox>
                    )}
                  </Col>
                ),
              )
            ) : (
              <></>
            )}
          </>
        );

      case 'Radio Button':
        return (
          <>
            <Radio.Group
              onChange={(e) => {
                const value = e.target.value;
                setRadioValues((prev) => ({
                  ...prev,
                  [itemCon.label]: value,
                }));
                form.setFieldValue(
                  'u_' +
                    convertToSnakeCase(itemCon.label) +
                    activeKey +
                    (itemCon.required ? '_required' : '') +
                    (itemCon.user_fill ? '_userfill' : ''),
                  value,
                );
              }}
              value={radioValues[itemCon.label]}
            >
              {itemCon?.labelOptions?.map(
                (itemLabelOp: any, itemLabelIndex: number) => {
                  const totalFloorValue = Math.floor(
                    24 / itemCon?.columnRequired,
                  );
                  return (
                    <ToggleColStyled
                      span={totalFloorValue}
                      key={itemLabelIndex}
                    >
                      <Radio value={itemLabelOp} {...commonProps}>
                        {itemLabelOp}
                      </Radio>
                    </ToggleColStyled>
                  );
                },
              )}
            </Radio.Group>
          </>
        );
      case 'Line Break':
        return <StyledDivider />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (formData && formData?.unique_form_data) {
      const uniqueFormData = formData?.unique_form_data;
      if (uniqueFormData) {
        setUniqueTemplateData(uniqueFormData);
        const initialValues = Object.keys(uniqueFormData).reduce(
          (acc: any, key) => {
            if (key.includes('date')) {
              acc[key] = uniqueFormData[key]
                ? dayjs(uniqueFormData[key])
                : null;
            } else {
              acc[key] = uniqueFormData[key];
            }
            return acc;
          },
          {},
        );
        console.log('initialValues', initialValues);
        form.setFieldsValue(initialValues);
      }
    }
  }, [formData]);

  useEffect(() => {
    let newArrForTheSalesForceJson: any = [];
    let newFinalArr: any = [];
    let count = 0;
    if (allContent && allContent?.length > 0) {
      allContent?.map((allContentItem: any, itemIndex: number) => {
        const required = allContentItem?.required;
        let newObj;

        let labelVal =
          'u_' +
          convertToSnakeCase(allContentItem.label) +
          itemIndex +
          activeKey +
          (required ? '_required' : '');
        if (allContentItem?.name === 'Text Content') {
          count = count + 1;
          newObj = {
            type: 'title',
            name: allContentItem?.sectionTitle,
            objectNo: count,
          };
          newArrForTheSalesForceJson?.push(newObj);
        } else {
          newObj = {
            type: 'content',
            name: allContentItem?.label,
            objectNo: count,
            valueGet: uniqueTemplateData?.[labelVal],
          };
          newArrForTheSalesForceJson?.push(newObj);
        }
      });
    }
  }, [allContent]);

  return (
    <Form
      layout="vertical"
      style={{width: '100%', background: 'white', borderRadius: '12px'}}
      form={form}
    >
      <Row>
        {allContent?.map((allContentItem: any, itemIndex: number) => {
          const alignment = allContentItem?.Alignemnt || 'left';
          const fontSize = allContentItem?.FontSize || 'default';
          const required = allContentItem?.required;
          const userfill = allContentItem?.user_fill;
          if (allContentItem?.name === 'Text Content') {
            return (
              <Col
                span={24}
                style={{textAlign: alignment, padding: '12px 0px'}}
              >
                <p style={{fontSize: fontSize === 'h2' ? 24 : 16}}>
                  {allContentItem?.sectionTitle}
                </p>
              </Col>
            );
          }

          return (
            <Col
              span={allContentItem.name === 'Line Break' ? 24 : 12}
              style={{
                padding: '12px',
                paddingTop: '0px',
              }}
              key={itemIndex}
            >
              <SelectFormItem
                name={
                  'u_' +
                  convertToSnakeCase(allContentItem.label) +
                  itemIndex +
                  activeKey +
                  (required ? '_required' : '') +
                  (userfill ? '_userfill' : '')
                }
                label={
                  <Typography name="Body 4/Medium">
                    {allContentItem.label}
                  </Typography>
                }
                required={allContentItem.required}
                rules={[
                  allContentItem.label === 'Email'
                    ? {
                        type: 'email',
                        message: 'Please enter a valid email address!',
                      }
                    : {},
                  {
                    required: allContentItem.required,
                    message: 'This field is required!',
                  },
                ]}
              >
                {getInputComponent(
                  allContentItem,
                  itemIndex,
                  activeKey,
                  required,
                  userfill,
                )}
              </SelectFormItem>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};

export default UniqueFields;
