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
import {Checkbox, Form, Input, Radio, TimePicker} from 'antd';
import {Option} from 'antd/es/mentions';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../../redux/hook';
import {UniqueFieldsProps} from './dealReg.interface';

const UniqueFields: React.FC<UniqueFieldsProps> = ({
  data,
  form,
  activeKey,
  handleBlur,
  formData,
}) => {
  const {isCanvas} = useAppSelector((state) => state.canvas);
  const {TextArea} = Input;
  const [globalStateForDependentFields, setGlobalStateForDependentFields] =
    useState<any>();

  const allContent =
    data?.form_data?.length > 0 &&
    data?.form_data?.[0] &&
    JSON.parse(data?.form_data[0]).flatMap((section: any) => section.content);

  useEffect(() => {
    let newArrForAllDependentFil: any = [];

    if (allContent && allContent?.length > 0 && formData?.unique_form_data) {
      allContent?.map((items: any, index: number) => {
        let dependentField = items?.dependentFiledArr?.find(
          (depField: any) =>
            depField.id ===
            formData?.unique_form_data?.[items?.label?.toString()], // Check both selections
        );
        let convertedToCheckValue =
          'u_' + convertToSnakeCase(items.label) + '_' + index + activeKey;

        if (items?.dependentFiled) {
          let newObj = {
            idName: items?.label,
            valueOut:
              formData?.unique_form_data?.[convertedToCheckValue?.toString()],
            valueIn:
              formData?.unique_form_data?.[dependentField?.label?.toString()],
          };
          // convertedToCheckValue
          newArrForAllDependentFil?.push(newObj);
        }
      });
    }
    setGlobalStateForDependentFields(newArrForAllDependentFil);
  }, [formData, JSON?.stringify(formData)]);

  // For Dependent fields above

  const [uniqueTemplateData, setUniqueTemplateData] = useState<any>();
  const [radioValues, setRadioValues] = useState<{[key: string]: any}>({});
  const [checkBoxValues, setCheckBoxValues] = useState<{[key: string]: any}>(
    {},
  );

  const getInputComponent = (
    itemCon: any,
    activeKey: any,
    required: any,
    userfill: any,
  ) => {
    const fieldName = convertToSnakeCase(itemCon?.label);
    const initialValue = uniqueTemplateData?.[fieldName];

    let commonProps;
    if (isCanvas) {
      commonProps = {
        defaultValue: initialValue,
      };
    } else {
      commonProps = {
        defaultValue: initialValue,
        onBlur: handleBlur,
      };
    }

    const dateName = 'u_' + convertToSnakeCase(itemCon.label) + '_' + activeKey;

    if (itemCon.dependentFiled) {
      return renderDependentField(
        itemCon,
        activeKey,
        required,
        userfill,
        commonProps,
      );
    } else {
      switch (itemCon?.name) {
        case 'Text':
        case 'Email':
        case 'Contact':
        case 'Time':
        case 'Date':
        case 'Currency':
        case 'Textarea':
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
              ) : itemCon?.name === 'Textarea' ? (
                <TextArea {...commonProps} />
              ) : itemCon?.name === 'Date' ? (
                <>
                  <CommonDatePicker
                    format={
                      itemCon?.dateformat ? itemCon?.dateformat : 'MMM D, YYYY'
                    }
                    value={
                      form.getFieldValue(dateName)
                        ? dayjs(form.getFieldValue(dateName))
                        : null
                    } // Load date correctly
                    placeholder={itemCon?.dateformat}
                    showTime={false}
                    onChange={(date, dateString) => {
                      // Check if date is valid using Day.js
                      const parsedDate = date ? dayjs(date) : null;
                      if (parsedDate && parsedDate.isValid()) {
                        form.setFieldValue(dateName, parsedDate); // Store parsed date in the field
                      } else {
                        form.setFieldValue(dateName, null); // Clear the field if date is invalid
                      }
                      if (
                        'onBlur' in commonProps &&
                        typeof commonProps.onBlur === 'function'
                      ) {
                        commonProps.onBlur();
                      }
                    }}
                  />
                </>
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
                      {itemCon?.name === 'Toggle' && (
                        <>
                          <Switch></Switch> {itemLabelOp}
                        </>
                      )}
                    </Col>
                  ),
                )
              ) : (
                <></>
              )}
            </>
          );

        case 'Checkbox':
          return (
            <Checkbox.Group
              onChange={(checkedValues: any) => {
                setCheckBoxValues((prev) => ({
                  ...prev,
                  [itemCon.label]: checkedValues,
                }));
                form.setFieldValue(
                  'u_' + convertToSnakeCase(itemCon.label) + '_' + activeKey,
                  checkedValues,
                );
              }}
              value={checkBoxValues[itemCon.label]}
            >
              {itemCon?.labelOptions?.map(
                (itemLabelOp: any, itemLabelIndex: any) => {
                  const totalFloorValue = Math.floor(
                    24 / itemCon?.columnRequired,
                  );
                  return (
                    <ToggleColStyled
                      span={totalFloorValue}
                      key={itemLabelIndex}
                    >
                      <Checkbox value={itemLabelOp} {...commonProps}>
                        {itemLabelOp}
                      </Checkbox>
                    </ToggleColStyled>
                  );
                },
              )}
            </Checkbox.Group>
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
                    'u_' + convertToSnakeCase(itemCon.label) + '_' + activeKey,
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
    }
  };

  const renderDependentField = (
    itemCon: {
      name: string;
      label: string;
      options: string[];
      labelOptions: string[];
      dependentFiledArr: {
        id: string;
        label: string;
        options: string[];
        type: string;
      }[];
    },
    activeKey: any,
    required: boolean,
    userfill: any,
    commonProps: any,
  ) => {
    let convertedToCheckValue =
      'u_' + convertToSnakeCase(itemCon.label) + '_' + activeKey;

    let newObjTORerender: any = {
      itemCon: {...itemCon},
      activeKey: activeKey,
      required: required,
      userfill: userfill,
      commonProps: commonProps,
    };
    let originalValueSaved =
      formData?.unique_form_data?.[convertedToCheckValue?.toString()];

    const [selectedOption, setSelectedOption] = useState<string | null>(
      originalValueSaved,
    ); // Store the selected main option
    const [dependentVal, setDependentVal] = useState<string | null>(null); // Store the selected main option

    const [radioSelection, setRadioSelection] = useState<any>(null); // Store selected radio option

    let dependentField: any;

    let finTheFiledActive = globalStateForDependentFields?.find(
      (item: any) => item?.idName === itemCon?.label,
    );
    dependentField = itemCon?.dependentFiledArr.find(
      (depField: any) => depField.id === finTheFiledActive?.valueOut, // Check both selections
    );
    let convertedToCheckDependentValue =
      'u_' + convertToSnakeCase(dependentField?.label) + '_' + activeKey;
    let originalDependentValueSaved =
      formData?.unique_form_data?.[convertedToCheckDependentValue?.toString()];
    let findTheShowDependentForMulti = itemCon?.options?.findIndex(
      (idd: any) =>
        (selectedOption && idd === selectedOption) ||
        idd === originalValueSaved,
    );
    let findTheShowDependentForCheck = itemCon?.labelOptions?.findIndex(
      (idd: any) =>
        idd === (selectedOption || finTheFiledActive?.valueOut?.[0]),
    );
    let dependentArrValOrMulti: any =
      itemCon?.dependentFiledArr?.[findTheShowDependentForMulti];
    let dependentArrValOrCheck: any =
      itemCon?.dependentFiledArr?.[findTheShowDependentForCheck];
    return (
      <>
        {/* Render Main Field Based on the Type */}
        {itemCon.name === 'Multi-Select' || itemCon.name === 'Drop Down' ? (
          <CommonSelect
            style={{width: '100%', marginBottom: '1rem'}}
            placeholder="Select an option"
            value={selectedOption || originalValueSaved}
            onChange={(value) => {
              form.setFieldValue(convertedToCheckValue, value);
              setSelectedOption(value);
            }}
            allowClear
            {...commonProps}
          >
            {itemCon?.options?.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </CommonSelect>
        ) : itemCon.name === 'Checkbox' ? (
          <>
            <Checkbox.Group value={finTheFiledActive?.valueOut}>
              {itemCon?.labelOptions?.map((option) => (
                <Checkbox
                  style={{width: '100%'}}
                  key={option}
                  value={option}
                  {...commonProps}
                >
                  {option}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </>
        ) : itemCon.name === 'Radio Button' ? (
          <>
            <Radio.Group value={finTheFiledActive?.valueOut}>
              {itemCon?.labelOptions?.map((option) => (
                <Radio
                  style={{width: '100%'}}
                  key={option}
                  value={option}
                  {...commonProps}
                >
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </>
        ) : (
          <></>
        )}
        {dependentArrValOrMulti?.map((itemsDeCh: any, indexDepCh: number) => {
          return (
            <SelectFormItem
              name={
                'u_' + convertToSnakeCase(itemsDeCh?.label) + '_' + activeKey
              }
              label={
                <Typography name="Body 4/Medium">{itemsDeCh?.label}</Typography>
              }
              required={itemsDeCh?.required}
              rules={[
                itemsDeCh?.label === 'Email'
                  ? {
                      type: 'email',
                      message: 'Please enter a valid email address!',
                    }
                  : {},
                {
                  required: itemsDeCh?.required,
                  message: 'This field is required!',
                },
              ]}
            >
              {itemsDeCh?.type === 'text' ? (
                <>
                  <OsInput
                    style={{width: '100%'}}
                    placeholder={`Select ${itemsDeCh?.label}`}
                    allowClear
                    value={dependentVal || originalDependentValueSaved}
                    onChange={(e) => {
                      form.setFieldValue(
                        convertedToCheckDependentValue,
                        e?.target?.value,
                      );
                      setDependentVal(e?.target?.value);
                    }}
                    {...commonProps}
                  />
                </>
              ) : (
                <CommonSelect
                  style={{width: '100%'}}
                  placeholder={`Select ${itemsDeCh?.label}`}
                  allowClear
                  options={itemsDeCh?.options.map((opt: any) => ({
                    label: opt,
                    value: opt,
                  }))}
                  value={dependentVal || originalDependentValueSaved}
                  onChange={(value) => {
                    form.setFieldValue(convertedToCheckDependentValue, value);
                    setDependentVal(value);
                  }}
                  {...commonProps}
                />
              )}
            </SelectFormItem>
          );
        })}
        {dependentArrValOrCheck?.map((itemsDeCh: any, indexDepCh: number) => {
          console.log('');
          return (
            <SelectFormItem
              name={
                'u_' + convertToSnakeCase(itemsDeCh?.label) + '_' + activeKey
              }
              label={
                <Typography name="Body 4/Medium">{itemsDeCh?.label}</Typography>
              }
              required={itemsDeCh?.required}
              rules={[
                itemsDeCh?.label === 'Email'
                  ? {
                      type: 'email',
                      message: 'Please enter a valid email address!',
                    }
                  : {},
                {
                  required: itemsDeCh?.required,
                  message: 'This field is required!',
                },
              ]}
            >
              {itemsDeCh?.type === 'text' ? (
                <>
                  <OsInput
                    style={{width: '100%'}}
                    placeholder={`Select ${itemsDeCh?.label}`}
                    allowClear
                    value={dependentVal || originalDependentValueSaved}
                    onChange={(e) => {
                      form.setFieldValue(
                        convertedToCheckDependentValue,
                        e?.target?.value,
                      );
                      setDependentVal(e?.target?.value);
                    }}
                    {...commonProps}
                  />
                </>
              ) : (
                <CommonSelect
                  style={{width: '100%'}}
                  placeholder={`Select ${itemsDeCh?.label}`}
                  allowClear
                  options={itemsDeCh?.options.map((opt: any) => ({
                    label: opt,
                    value: opt,
                  }))}
                  value={dependentVal || originalDependentValueSaved}
                  onChange={(value) => {
                    form.setFieldValue(convertedToCheckDependentValue, value);
                    setDependentVal(value);
                  }}
                  {...commonProps}
                />
              )}
            </SelectFormItem>
          );
        })}
        {/* Conditionally Render Dependent Field Based on Selection */}
        {/* {(selectedOption || radioSelection || originalValueSaved) && (

          <SelectFormItem
            name={
              'u_' +
              convertToSnakeCase(dependentField?.label) +
              '_' +
              activeKey 
            }
            label={
              <Typography name="Body 4/Medium">
                {dependentField?.label}
              </Typography>
            }
            required={dependentField?.required}
            rules={[
              dependentField?.label === 'Email'
                ? {
                    type: 'email',
                    message: 'Please enter a valid email address!',
                  }
                : {},
              {
                required: dependentField?.required,
                message: 'This field is required!',
              },
            ]}
          >
            {dependentField?.user_fill ? (
              <>
                <OsInput
                  style={{width: '100%'}}
                  placeholder={`Select ${dependentField?.label}`}
                  allowClear
                  value={dependentVal || originalDependentValueSaved}
                  onChange={(e) => {
                    form.setFieldValue(
                      convertedToCheckDependentValue,
                      e?.target?.value,
                    );
                    setDependentVal(e?.target?.value);
                  }}
                  {...commonProps}
                />
              </>
            ) : (
              <CommonSelect
                style={{width: '100%'}}
                placeholder={`Select ${dependentField?.label}`}
                allowClear
                options={dependentField?.options.map((opt: any) => ({
                  label: opt,
                  value: opt,
                }))}
                value={dependentVal || originalDependentValueSaved}
                onChange={(value) => {
                  form.setFieldValue(convertedToCheckDependentValue, value);
                  setDependentVal(value);
                }}
                {...commonProps}
              />
            )}
          </SelectFormItem>
        )} */}
      </>
    );
  };

  useEffect(() => {
    if (formData && formData?.unique_form_data) {
      const uniqueFormData = formData?.unique_form_data;
      if (uniqueFormData) {
        setUniqueTemplateData(uniqueFormData);
        const initialValues = Object.keys(uniqueFormData).reduce(
          (acc: any, key) => {
            if (/date/i.test(key)) {
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
        form.setFieldsValue(initialValues);
      }
    }
  }, [formData]);

  useEffect(() => {
    let newArrForTheSalesForceJson: any = [];
    let newFinalArr: any = [];
    let count = 0;
    if (allContent && allContent?.length > 0) {
      allContent?.map((allContentItem: any) => {
        const required = allContentItem?.required;
        let newObj;

        let labelVal =
          'u_' + convertToSnakeCase(allContentItem.label) + '_' + activeKey;
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
                key={itemIndex}
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
                  '_' +
                  activeKey
                }
                label={
                  <Typography name="Body 4/Medium">
                    {allContentItem.label}
                  </Typography>
                }
                required={allContentItem.required}
                rules={[
                  ...(allContentItem.label === 'Email'
                    ? [
                        {
                          type: 'email' as const, // Ensures 'email' is treated as a specific literal type
                          message: 'Please enter a valid email address!',
                        },
                        {
                          required: true,
                          message: 'This field is required!',
                        },
                      ]
                    : allContentItem.required
                      ? [
                          {
                            required: true,
                            message: 'This field is required!',
                          },
                        ]
                      : []),
                ]}
              >
                {getInputComponent(
                  allContentItem,
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
