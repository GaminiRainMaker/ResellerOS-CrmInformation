import {Collapse, Panel} from '@/app/components/common/antd/Collapse';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsInput from '@/app/components/common/os-input';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';

const UniqueFields: React.FC<any> = ({data, activeKey, form}) => {
  const FinalData = JSON.parse(data?.form_data)?.[0];

  const getInputComponent = (child: any) => {
    switch (child.data_type) {
      case 'textarea':
        return <OsInput placeholder={child.help_text} />;
      case 'email':
        return <OsInput type="email" placeholder={child.help_text} />;
      // Add more cases as needed for different data types
      default:
        return <OsInput placeholder={child.help_text} />;
    }
  };

  const convertToSnakeCase = (input: string): string => {
    return input
      ?.toLowerCase()
      ?.replace(/\s+/g, '_')
      ?.replace(/[^a-z0-9_]/g, '');
  };

  return (
    <Row>
      <Form
        layout="vertical"
        style={{width: '100%', background: 'white', borderRadius: '12px'}}
        form={form}
      >
        <Collapse accordion style={{width: '100%'}} ghost>
          {FinalData?.content.map((child: any, index: number) =>
            child?.sectionTitle ? (
              <Panel
                header={
                  <Space style={{display: 'flex', justifyContent: 'start'}}>
                    <Typography name="Body 2/Medium">
                      {child.sectionTitle}
                    </Typography>
                  </Space>
                }
                key={index}
              >
                <Row>
                  {FinalData.content.map((formItem: any, idx: number) =>
                    formItem.sectionTitle ? null : (
                      <Col
                        span={8}
                        style={{padding: '24px', paddingTop: '0px'}}
                        key={idx}
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
                    ),
                  )}
                </Row>
              </Panel>
            ) : null,
          )}
        </Collapse>
      </Form>
    </Row>
  );
};
export default UniqueFields;
