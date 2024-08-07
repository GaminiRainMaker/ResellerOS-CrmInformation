import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import {
  SectionColStyledInner,
  SectionColStyledInnerContent,
  SectionRowStyledInner,
  StyledDivider,
  ToggleColStyled,
} from '@/app/components/common/os-div-row-col/styled-component';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import FormUpload from '@/app/components/common/os-upload/FormUpload';
import FormUploadCard from '@/app/components/common/os-upload/FormUploadCard';
import Typography from '@/app/components/common/typography';
import {MailOutlined} from '@ant-design/icons';
import {Form, Radio, TimePicker} from 'antd';
import {useEffect, useState} from 'react';
import {UniqueFieldsProps} from './dealReg.interface';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import moment from 'moment';

const UniqueFields: React.FC<UniqueFieldsProps> = ({
  data,
  form,
  activeKey,
  handleBlur,
  formData,
}) => {
  const allContent = JSON.parse(data?.form_data).flatMap(
    (section: any) => section.content,
  );
  const [uniqueTemplateData, setUniqueTemplateData] = useState<any>();

  const getInputComponent = (itemCon: any) => {
    const fieldName = convertToSnakeCase(itemCon?.label);
    const initialValue = uniqueTemplateData?.[fieldName];
    const commonProps = {defaultValue: initialValue, onBlur: handleBlur};
    if (itemCon?.name === 'Date' && initialValue) {
      commonProps.defaultValue = moment(initialValue);
    }

    switch (itemCon?.name) {
      case 'Table':
        return (
          <SectionRowStyledInner>
            {itemCon?.ColumnsData?.map(
              (itemColum: any, indexOfColumn: number) => {
                const totalCol = itemCon?.ColumnsData?.length;
                const totalFloorValue = Math.floor(24 / totalCol);
                return (
                  <SectionColStyledInner
                    span={totalFloorValue}
                    key={indexOfColumn}
                  >
                    {itemColum?.title}
                  </SectionColStyledInner>
                );
              },
            )}
            {itemCon?.noOfRowsData?.map(
              (rowsMapItem: string, rowIndex: number) => (
                <Row style={{width: '100%'}} key={rowIndex}>
                  {itemCon?.ColumnsData?.map(
                    (itemColum: any, colIndex: number) => {
                      const totalFloorValue = Math.floor(
                        24 / itemCon?.ColumnsData?.length,
                      );
                      return (
                        <SectionColStyledInnerContent
                          span={totalFloorValue}
                          key={colIndex}
                        >
                          {itemColum?.type === 'single' ||
                          itemColum?.type === 'multiple' ? (
                            <CommonSelect
                              variant="borderless"
                              mode={itemColum?.type}
                              style={{border: 'none', width: '100%'}}
                            />
                          ) : (
                            <OsInput
                              variant="borderless"
                              type={itemColum?.type}
                              style={{border: 'none'}}
                            />
                          )}
                        </SectionColStyledInnerContent>
                      );
                    },
                  )}
                </Row>
              ),
            )}
          </SectionRowStyledInner>
        );

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
              <CommonDatePicker {...commonProps} />
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
      case 'Radio Button':
      case 'Toggle':
        return (
          <>
            {itemCon?.labelOptions?.map(
              (itemLabelOp: any, itemLabelIndex: number) => {
                const totalFloorValue = Math.floor(
                  24 / itemCon?.columnRequired,
                );
                console.log('RecordDataa', itemCon);
                return (
                  <ToggleColStyled span={totalFloorValue} key={itemLabelIndex}>
                    {itemCon?.name === 'Radio Button' ? (
                      <Radio.Group {...commonProps}>
                        <Radio>{itemLabelOp}</Radio>
                      </Radio.Group>
                    ) : itemCon?.name === 'Toggle' ? (
                      <>
                        <Switch {...commonProps} /> {itemLabelOp}
                      </>
                    ) : (
                      <Checkbox {...commonProps}>{itemLabelOp}</Checkbox>
                    )}
                  </ToggleColStyled>
                );
              },
            )}
          </>
        );

      case 'Attachment':
        return (
          <Space direction="vertical">
            {itemCon?.pdfUrl ? (
              <FormUploadCard uploadFileData={itemCon?.pdfUrl} />
            ) : (
              <FormUpload />
            )}
          </Space>
        );

      case 'Line Break':
        return <StyledDivider />;

      default:
        return null;
    }
  };

  const convertToSnakeCase = (input: string): string => {
    return input
      ?.toLowerCase()
      ?.replace(/\s+/g, '_')
      ?.replace(/[^a-z0-9_]/g, '');
  };

  useEffect(() => {
    if (formData && formData?.unique_form_data) {
      const uniqueFormData = formData?.unique_form_data;
      if (uniqueFormData) {
        setUniqueTemplateData(uniqueFormData);
        const initialValues = Object.keys(uniqueFormData).reduce(
          (acc: any, key) => {
            acc[key] = uniqueFormData[key];
            return acc;
          },
          {},
        );
        form.setFieldsValue(initialValues);
      }
    }
  }, [form, formData]);

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

          console.log('allContentItem', allContentItem);

          if (allContentItem?.name === 'Text Content') {
            return (
              <Col span={24} style={{textAlign: alignment, padding: '24px'}}>
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
                padding: '24px',
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
                  (required ? '_required' : '')
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
                {getInputComponent(allContentItem)}
              </SelectFormItem>
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};

export default UniqueFields;
