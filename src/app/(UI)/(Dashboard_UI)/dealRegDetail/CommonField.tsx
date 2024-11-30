import { Checkbox } from '@/app/components/common/antd/Checkbox';
import { Panel } from '@/app/components/common/antd/Collapse';
import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import { Switch } from '@/app/components/common/antd/Switch';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import OsInput from '@/app/components/common/os-input';
import { SelectFormItem } from '@/app/components/common/os-oem-select/oem-select-styled';
import OsTable from '@/app/components/common/os-table';
import Typography from '@/app/components/common/typography';
import { formatStatus } from '@/app/utils/CONSTANTS';
import { MailOutlined } from '@ant-design/icons';
import { Form, Radio, TimePicker } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../redux/hook';
import {
  AttributeData,
  CommonFieldsProps,
  TransformedChild,
  TransformedData,
} from './dealReg.interface';
import { ChildCollapse } from './styled-component';

const CommonFields: FC<CommonFieldsProps> = ({
  form,
  activeKey,
  handleBlur,
  formData,
}) => {
  const {isCanvas} = useAppSelector((state) => state.canvas);
  const {queryData} = useAppSelector((state) => state.attributeField);
  const {data: DealRegData} = useAppSelector((state) => state.dealReg);
  const [commonTemplateData, setCommonTemplateData] = useState<any>();

  useEffect(() => {
    if (formData) {
      const commonFormData = formData?.common_form_data;
      if (commonFormData) {
        setCommonTemplateData(commonFormData);
        const initialValues = Object.keys(commonFormData).reduce(
          (acc: any, key) => {
            acc[key] = commonFormData[key];
            return acc;
          },
          {},
        );
        form.setFieldsValue(initialValues);
      }
    }
  }, [form, formData]);

  const transformData = (data: AttributeData[]): TransformedData[] => {
    const groupedData = data?.reduce(
      (acc: Record<string, TransformedChild[]>, item) => {
        const sectionName = item?.AttributeSection?.name;
        if (!acc[sectionName]) {
          acc[sectionName] = [];
        }
        acc[sectionName].push({
          id: item.id,
          label: item.label,
          data_type: item.data_type,
          help_text: item.help_text,
          is_active: item.is_active,
          is_deleted: item.is_deleted,
          is_required: item.is_required,
          is_view: item.is_view,
          map_from: item.map_from,
          map_to: item.map_to,
          name: item.name,
          order: item.order,
        });
        return acc;
      },
      {},
    );
    return Object?.entries(groupedData)?.map(([title, children]) => ({
      title,
      children,
    }));
  };

  const template = transformData(queryData);

  useEffect(() => {
    template?.forEach((section: any) => {
      section?.children?.forEach((child: any, Childndex: any) => {
        const required = child?.is_required;
        if (child?.map_from && child?.map_to) {
          const relevantData = DealRegData?.find(
            (item: any) => item?.id === activeKey,
          );
          if (relevantData && relevantData[child?.map_from]) {
            let name =
              'c_' +
              convertToSnakeCase(child?.label) +
              Childndex +
              activeKey +
              (required ? '_required' : '');
            form.setFieldsValue({
              [name]: relevantData[child?.map_from][child?.map_to],
            });
          }
        }
      });
    });
  }, []);

  const getInputComponent = (child: TransformedChild) => {
    const fieldName = convertToSnakeCase(child?.label);
    const initialValue = commonTemplateData?.[fieldName];
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
    switch (child.data_type) {
      case 'textarea':
      case 'text':
        return <OsInput {...commonProps} />;
      case 'email':
        return (
          <OsInput type="email" suffix={<MailOutlined />} {...commonProps} />
        );
      case 'contact':
        return <OsInput type="contact" {...commonProps} />;
      case 'date':
        return <CommonDatePicker format="MM/DD/YYYY" />;
      case 'time':
        return <TimePicker />;
      case 'currency':
        return <OsInput type="text" suffix="$" {...commonProps} />;
      case 'table':
        return <OsTable />;
      case 'checkbox':
        return <Checkbox checked={!!initialValue} />;
      case 'radio':
        return <Radio checked={!!initialValue} />;
      case 'toggle':
        return <Switch checked={!!initialValue} />;
      default:
        return <OsInput placeholder={child.help_text} {...commonProps} />;
    }
  };

  const convertToSnakeCase = (input: string): string => {
    return input
      ?.toLowerCase()
      ?.replace(/\s+/g, '_')
      ?.replace(/[^a-z0-9_]/g, '');
  };

  useEffect(() => {
    if (formData && formData?.common_form_data) {
      const commonFormData = formData?.common_form_data;
      if (commonFormData) {
        setCommonTemplateData(commonFormData);
        const initialValues = Object?.keys(commonFormData).reduce(
          (acc: any, key) => {
            acc[key] = commonFormData[key];
            return acc;
          },
          {},
        );
        form.setFieldsValue(initialValues);
      }
    }
  }, [formData]);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{width: '100%', background: 'white', borderRadius: '12px'}}
    >
      {template?.map((section, index) => (
        <ChildCollapse key={index} accordion style={{width: '100%'}} ghost>
          <Panel
            header={
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                }}
              >
                <Typography name="Body 2/Medium">
                  {section?.title?.replace(/_/g, ' ')}
                </Typography>
              </Space>
            }
            key={index}
          >
            <Row gutter={[0, 16]}>
              {section?.children?.map((child, Childndex) => {
                const required = child?.is_required;
                return (
                  <Col span={24} key={child.id}>
                    <SelectFormItem
                      name={
                        'c_' +
                        convertToSnakeCase(child?.label) + '_' +
                        Childndex +
                        activeKey +
                        (required ? '_required' : '')
                      }
                      label={
                        <Typography name="Body 4/Medium">
                          {formatStatus(child?.label)}
                        </Typography>
                      }
                      rules={[
                        child?.name || child.label === 'Email'
                          ? {
                              type: 'email',
                              message: 'Please enter a valid email address!',
                            }
                          : {},
                        {
                          required: child?.is_required,
                          message: 'This field is required!',
                        },
                      ]}
                    >
                      {getInputComponent(child)}
                    </SelectFormItem>
                  </Col>
                );
              })}
            </Row>
          </Panel>
          <br />
        </ChildCollapse>
      ))}
    </Form>
  );
};

export default CommonFields;
