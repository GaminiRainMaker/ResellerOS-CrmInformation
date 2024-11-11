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
import {Checkbox} from 'antd';
import {Option} from 'antd/es/mentions';

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

  // For Dependent fields
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Store the selected main option
  const [checkboxSelections, setCheckboxSelections] = useState<string[]>([]); // Store checkbox selections
  const [radioSelection, setRadioSelection] = useState<string | null>(null); // Store selected radio option
  const [globalStateForDependentFields, setGlobalStateForDependentFields] =
    useState<any>();

  const handleCheckboxChange = (value: string, label: string) => {
    // Deselect all checkboxes except the selected one
    const newSelections = checkboxSelections.includes(value)
      ? checkboxSelections.filter((v) => v !== value) // Deselect if already selected
      : [value]; // Only keep the currently selected checkbox
    form.getFieldValue(label) || [];

    setCheckboxSelections(newSelections);
    setSelectedOption(newSelections[0]); // Set the selected option to the first checkbox selected
  };

  const handleRadioChange = (e: any) => {
    const value = e.target.value;

    setRadioSelection(value);

    setSelectedOption(value); // Update selected option based on radio button selection
    setCheckboxSelections([]); // Clear checkbox selections when selecting a radio button
  };

  const handleRadioChangeFopForm = (label: any) => {
    form.getFieldValue(label) || [];
  };

  const handleChangeForTheDependentMultu = (label: any) => {
    console.log('2312321312', label);
    form.getFieldValue(label) || [];
  };
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
          'u_' +
          convertToSnakeCase(items.label) +
          '_' +
          index +
          activeKey +
          (items?.required ? '_required' : '') +
          (items?.userfill ? '_userfill' : '');

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
    console.log('sfrewrwerew', newArrForAllDependentFil);
  }, [allContent, formData, JSON?.stringify(formData)]);

  // For Dependent fields above

  const [uniqueTemplateData, setUniqueTemplateData] = useState<any>();
  const [radioValues, setRadioValues] = useState<{[key: string]: any}>({});
  const [checkBoxValues, setCheckBoxValues] = useState<{[key: string]: any}>(
    {},
  );

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

    if (itemCon.dependentFiled) {
      renderDependentField(
        itemCon,
        itemIndex,
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
                  'u_' +
                    convertToSnakeCase(itemCon.label) +
                    '_' +
                    activeKey +
                    (itemCon.required ? '_required' : '') +
                    (itemCon.user_fill ? '_userfill' : ''),
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
                    'u_' +
                      convertToSnakeCase(itemCon.label) +
                      '_' +
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
    itemIndex: number,
    activeKey: any,
    required: boolean,
    userfill: any,
    commonProps: any,
  ) => {
    let convertedToCheckValue =
      'u_' +
      convertToSnakeCase(itemCon.label) +
      '_' +
      itemIndex +
      activeKey +
      (required ? '_required' : '') +
      (userfill ? '_userfill' : '');

    let originalValueSaved =
      formData?.unique_form_data?.[convertedToCheckValue?.toString()];

    console.log('originalValueSaved', originalValueSaved, itemCon);

    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Store the selected main option
    const [checkboxSelections, setCheckboxSelections] = useState<string[]>([]); // Store checkbox selections
    const [radioSelection, setRadioSelection] = useState<string | null>(null); // Store selected radio option

    // Find the dependent field array based on the selected option

    let dependentField: any;
    if (selectedOption || radioSelection) {
      dependentField = itemCon?.dependentFiledArr.find(
        (depField: any) => depField.id === (selectedOption || radioSelection), // Check both selections
      );
    } else {
      dependentField = itemCon?.dependentFiledArr.find(
        (depField: any) => depField.id === originalValueSaved, // Check both selections
      );
    }

    console.log('dependentField', dependentField);

    const handleCheckboxChange = (value: string) => {
      // Deselect all checkboxes except the selected one
      const newSelections = checkboxSelections.includes(value)
        ? checkboxSelections.filter((v) => v !== value) // Deselect if already selected
        : [value]; // Only keep the currently selected checkbox

      setCheckboxSelections(newSelections);
      setSelectedOption(newSelections[0]); // Set the selected option to the first checkbox selected
    };

    const handleRadioChange = (e: any) => {
      const value = e.target.value;
      setRadioSelection(value);
      setSelectedOption(value); // Update selected option based on radio button selection
      setCheckboxSelections([]); // Clear checkbox selections when selecting a radio button
    };

    return (
      <>
        {/* Render Main Field Based on the Type */}
        {itemCon.name === 'Multi-Select' || itemCon.name === 'Drop Down' ? (
          <CommonSelect
            style={{width: '100%', marginBottom: '1rem'}}
            placeholder="Select an option"
            onChange={(value) => {
              setSelectedOption(value);
              setCheckboxSelections([]); // Clear checkbox selections when selecting from dropdown
              setRadioSelection(null); // Clear radio selection when selecting from dropdown
            }}
            allowClear
          >
            {/* {itemCon?.options?.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))} */}
          </CommonSelect>
        ) : itemCon.name === 'Checkbox' ? (
          <>
            {itemCon?.labelOptions?.map((option) => (
              <Checkbox
                style={{width: '100%'}}
                key={option}
                checked={checkboxSelections.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              >
                {option}
              </Checkbox>
            ))}
          </>
        ) : itemCon.name === 'Radio Button' ? (
          <>
            <Radio.Group onChange={handleRadioChange} value={radioSelection}>
              {itemCon?.labelOptions?.map((option) => (
                <Radio style={{width: '100%'}} key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </>
        ) : (
          <></>
        )}

        {/* Conditionally Render Dependent Field Based on Selection */}
        {/* {selectedOption ||
          radioSelection ||
          (dependentField && ( */}
        <>
          {/* {console.log('dependentField123', dependentField)} */}
          <Typography name="Body 4/Medium">{dependentField?.label}</Typography>
          <CommonSelect
            style={{width: '100%'}}
            placeholder={`Select ${dependentField?.label}`}
            allowClear
            options={dependentField?.options.map((opt: any) => ({
              label: opt,
              value: opt,
            }))}
            {...commonProps}
          />
        </>
        {/* ))} */}
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
          '_' +
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

  console.log('formData12345', formData?.unique_form_data);

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
                  '_' +
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
