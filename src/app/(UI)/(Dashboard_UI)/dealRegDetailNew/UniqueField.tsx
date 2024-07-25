import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Collapse, Panel} from '@/app/components/common/antd/Collapse';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import {Switch} from '@/app/components/common/antd/Switch';
import ContactInput from '@/app/components/common/os-contact';
import CommonDatePicker from '@/app/components/common/os-date-picker';
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
import {useAppSelector} from '../../../../../redux/hook';
import {useEffect, useState} from 'react';
import {FormInstance} from 'antd/lib';

interface UniqueFieldsProps {
  data: any;
  form: FormInstance;
  activeKey: string;
}

const UniqueFields: React.FC<UniqueFieldsProps> = ({data, form, activeKey}) => {
  const template = JSON.parse(data?.form_data)?.[0]?.content;
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const [uniqueTemplateData, setUniqueTemplateData] = useState<any>();

  const getInputComponent = (itemCon: any) => {
    const fieldName = convertToSnakeCase(itemCon?.label);
    const initialValue = uniqueTemplateData?.[fieldName];
    console.log('itemConitemCon', itemCon);
    switch (itemCon?.name) {
      case 'Table':
        return (
          <SectionRowStyledInner>
            {itemCon?.ColumnsData?.map(
              (itemColum: any, indexOfColumn: number) => {
                const totalCol = itemCon?.ColumnsData?.length;
                const totalFloorValue = Math.floor(24 / totalCol);
                return (
                  <SectionColStyledInner span={totalFloorValue}>
                    {itemColum?.title}
                  </SectionColStyledInner>
                );
              },
            )}
            {itemCon?.noOfRowsData?.map((rowsMapItem: string) => (
              <Row style={{width: '100%'}}>
                {itemCon?.ColumnsData?.map((itemColum: any) => {
                  const totalFloorValue = Math.floor(
                    24 / itemCon?.ColumnsData?.length,
                  );
                  return (
                    <SectionColStyledInnerContent span={totalFloorValue}>
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
                })}
              </Row>
            ))}
          </SectionRowStyledInner>
        );
      case 'Text':
      case 'Currency':
      case 'Email':
      case 'Contact':
      case 'Time':
      case 'Add Section':
      case 'Date':
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
                defaultValue={initialValue}
              />
            ) : itemCon?.name === 'Date' ? (
              <CommonDatePicker format={itemCon?.dateformat} />
            ) : // : itemCon?.name === 'Contact' ? (
            //   <ContactInput
            //     name="Contact"
            //     id="Contact"
            //     value={itemCon?.value}
            //     mask={itemCon?.dataformat}
            //     limitMaxLength
            //     defaultCountry={itemCon?.defaultcountry}
            //     max={11}
            //     onChange={() => {}}
            //   />
            // )
            itemCon?.name === 'Email' || itemCon?.label === 'Email' ? (
              <OsInput
                type={itemCon?.type}
                suffix={<MailOutlined />}
                defaultValue={initialValue}
              />
            ) : (
              <OsInput type={itemCon?.type} defaultValue={initialValue} />
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
            options={optionssMulti}
            style={{width: '100%'}}
            mode={itemCon?.type}
            defaultValue={initialValue}
          />
        );
      case 'Checkbox':
      case 'Radio Button':
      case 'Toggle':
        return (
          <>
            {itemCon?.labelOptions?.map(
              (itemLabelOp: any, itemLabelInde: number) => {
                const totalFloorValue = Math.floor(
                  24 / itemCon?.columnRequired,
                );
                return (
                  <ToggleColStyled span={totalFloorValue}>
                    {itemCon?.name === 'Radio Button' ? (
                      <Radio value={itemLabelInde}>{itemLabelOp}</Radio>
                    ) : itemCon?.name === 'Toggle' ? (
                      <>
                        <Switch /> {itemLabelOp}
                      </>
                    ) : (
                      <Checkbox value={itemLabelOp} checked>
                        {itemLabelOp}
                      </Checkbox>
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

  const sections = template?.reduce((acc: any[], item: any) => {
    if (item?.sectionTitle) {
      acc.push({sectionTitle: item?.sectionTitle, items: []});
    } else if (acc.length > 0) {
      acc[acc.length - 1]?.items?.push(item);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (dealReg?.PartnerProgram?.id === activeKey) {
      const uniqueFormData =
        dealReg?.common_form_data && JSON.parse(dealReg?.unique_form_data);
      if (uniqueFormData) {
        setUniqueTemplateData(uniqueFormData);
      } else {
        setUniqueTemplateData('');
        form.resetFields();
      }
    } else {
      setUniqueTemplateData('');
      form.resetFields();
    }
  }, [activeKey, dealReg, form]);

  useEffect(() => {
    if (uniqueTemplateData) {
      const initialValues = Object.keys(uniqueTemplateData).reduce(
        (acc: any, key) => {
          acc[key] = uniqueTemplateData[key];
          return acc;
        },
        {},
      );
      form.setFieldsValue(initialValues);
    }
  }, [uniqueTemplateData, form]);

  return (
    <Row>
      <Form
        layout="vertical"
        style={{width: '100%', background: 'white', borderRadius: '12px'}}
        form={form}
      >
        <Collapse accordion style={{width: '100%'}} ghost>
          {sections.map((section: any, sectionIndex: number) => (
            <Panel
              header={
                <Space style={{display: 'flex', justifyContent: 'start'}}>
                  <Typography name="Body 2/Medium">
                    {section.sectionTitle}
                  </Typography>
                </Space>
              }
              key={sectionIndex}
            >
              <Row>
                {section.items.map((formItem: any, itemIndex: number) => {
                  return (
                    <Col
                      span={formItem.name === 'Line Break' ? 24 : 12}
                      style={{
                        padding: '24px',
                        paddingTop: '0px',
                      }}
                      key={itemIndex}
                    >
                      <SelectFormItem
                        name={convertToSnakeCase(formItem.label)}
                        label={
                          <Typography name="Body 4/Medium">
                            {formItem.label}
                          </Typography>
                        }
                        required={formItem.required}
                        // help={formItem.hintTextValue}
                      >
                        {getInputComponent(formItem)}
                      </SelectFormItem>
                    </Col>
                  );
                })}
              </Row>
            </Panel>
          ))}
        </Collapse>
      </Form>
    </Row>
  );
};

export default UniqueFields;
