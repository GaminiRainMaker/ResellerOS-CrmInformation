import {Panel} from '@/app/components/common/antd/Collapse';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Collapse, Form, FormInstance} from 'antd';
import {useSearchParams} from 'next/navigation';
import {FC, useEffect, useState} from 'react';
import {queryAttributeField} from '../../../../../redux/actions/attributeField';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';

interface AttributeData {
  id: number;
  is_deleted: boolean;
  name: string | null;
  label: string;
  data_type: string;
  order: number;
  map_from: string;
  map_to: string | null;
  help_text: string;
  attribute_section_id: number;
  is_active: boolean;
  is_view: boolean;
  is_required: boolean;
  createdAt: string;
  updatedAt: string;
  AttributeSection: {
    id: number;
    is_deleted: boolean;
    name: string;
    order: number;
    is_active: boolean;
    is_view: boolean;
    is_required: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface TransformedChild {
  id: number;
  label: string;
  data_type: string;
  help_text: string;
  is_active: boolean;
  is_deleted: boolean;
  is_required: boolean;
  is_view: boolean;
  map_from: string;
  name: string | null;
  order: number;
}

interface TransformedData {
  title: string;
  children: TransformedChild[];
}

interface CommonFieldsProps {
  form: FormInstance;
  activeKey: string;
  onPercentageChange: (percentage: number) => void; // Add this callback
}

const CommonFields: FC<CommonFieldsProps> = ({
  form,
  activeKey,
  onPercentageChange,
}) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getDealId = searchParams.get('id');
  const {data: AttributeFieldData} = useAppSelector(
    (state) => state.attributeField,
  );
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const [templateData, setTemplateData] = useState<any>();

  useEffect(() => {
    dispatch(queryAttributeField(''));
  }, [dispatch]);

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

  const template = transformData(AttributeFieldData);

  const getInputComponent = (child: TransformedChild) => {
    const fieldName = convertToSnakeCase(child?.label);
    const initialValue = templateData?.[fieldName];
    switch (child.data_type) {
      case 'textarea':
        return (
          <OsInput placeholder={child.help_text} defaultValue={initialValue} />
        );
      case 'email':
        return (
          <OsInput
            type="email"
            placeholder={child.help_text}
            defaultValue={initialValue}
          />
        );
      // Add more cases as needed for different data types
      default:
        return (
          <OsInput placeholder={child.help_text} defaultValue={initialValue} />
        );
    }
  };

  const convertToSnakeCase = (input: string): string => {
    return input
      ?.toLowerCase()
      ?.replace(/\s+/g, '_')
      ?.replace(/[^a-z0-9_]/g, '');
  };

  useEffect(() => {
    if (dealReg?.PartnerProgram?.id === activeKey) {
      const commonFormData =
        dealReg?.common_form_data && JSON.parse(dealReg?.common_form_data);
      if (commonFormData) {
        setTemplateData(commonFormData);
      } else {
        setTemplateData('');
        form.resetFields();
      }
    } else {
      setTemplateData('');
      form.resetFields();
    }
  }, [activeKey, dealReg, form]);

  console.log(
    'daaataaa',
    dealReg?.PartnerProgram?.id,
    activeKey,
    'templateData',
    templateData,
  );
  useEffect(() => {
    if (templateData) {
      const initialValues = Object.keys(templateData).reduce(
        (acc: any, key) => {
          acc[key] = templateData[key];
          return acc;
        },
        {},
      );
      form.setFieldsValue(initialValues);
    }
  }, [templateData, form]);

  const calculatePercentage = () => {
    let requiredFieldsCount = 0;
    let filledRequiredFieldsCount = 0;

    template.forEach((section) => {
      section.children.forEach((child) => {
        if (child.is_required) {
          requiredFieldsCount++;
          const fieldName = convertToSnakeCase(child.label);
          if (templateData?.[fieldName]) {
            filledRequiredFieldsCount++;
          }
        }
      });
    });

    if (requiredFieldsCount === 0) return 100;
    return (filledRequiredFieldsCount / requiredFieldsCount) * 100;
  };

  useEffect(() => {
    if (templateData) {
      const percentage = calculatePercentage();
      onPercentageChange(percentage);
    }
  }, [templateData, onPercentageChange]);

  return (
    <Row>
      <Form
        form={form}
        layout="vertical"
        style={{width: '100%', background: 'white', borderRadius: '12px'}}
      >
        <Collapse accordion style={{width: '100%'}} ghost>
          {template?.map((section, index) => (
            <Panel
              header={
                <Space
                  style={{
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                >
                  <Typography name="Body 2/Medium">{section?.title}</Typography>
                </Space>
              }
              key={index}
            >
              {section.children.map((child) => (
                <Col
                  span={8}
                  style={{padding: '24px', paddingTop: '0px'}}
                  key={child.id}
                >
                  <SelectFormItem
                    name={convertToSnakeCase(child?.label)}
                    label={
                      <Typography name="Body 4/Medium">
                        {child?.label}
                      </Typography>
                    }
                    rules={[
                      {
                        required: child?.is_required,
                        message: 'This field is required!',
                      },
                    ]}
                  >
                    {getInputComponent(child)}
                  </SelectFormItem>
                </Col>
              ))}
            </Panel>
          ))}
        </Collapse>
      </Form>
    </Row>
  );
};

export default CommonFields;
