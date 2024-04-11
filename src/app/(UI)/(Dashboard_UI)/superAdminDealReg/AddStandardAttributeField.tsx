import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FC} from 'react';
import {AddStandardAttributeFieldInterface} from './superAdminDealReg.interface';

const AddStandardAttributeField: FC<AddStandardAttributeFieldInterface> = ({
  form,
  onFinish,
}) => {
  const [token] = useThemeToken();
  return (
    <>
      <Row
        justify="space-between"
        style={{
          padding: '24px 40px 20px 40px',
          backgroundColor: '#F0F4F7',
          borderRadius: '10px 10px 0px 0px',
        }}
        gutter={[0, 16]}
      >
        <Typography
          name="Body 1/Regular"
          align="left"
          color={token?.colorLinkHover}
        >
          New Standard Attribute Fields
        </Typography>
      </Row>
      <Space
        size={0}
        direction="vertical"
        style={{
          width: '100%',
          padding: '24px 40px 20px 40px',
        }}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          requiredMark={false}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Standard Attribute Name
                  </Typography>
                }
                name="standard_attribute_name"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={24}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">Attribute Label</Typography>
                }
                name="attribute_label"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Attribute Data Type
                  </Typography>
                }
                name="attribute_data_type"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Order</Typography>}
                name="order"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>

            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Map from Attribute Field
                  </Typography>
                }
                name="map_from_attribute_field"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Map to Attribute Field
                  </Typography>
                }
                name="map_to_attribute_field"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Help Text</Typography>}
                name="help_text"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Standard Attribute Section
                  </Typography>
                }
                name="standard_attribute_section"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};

export default AddStandardAttributeField;
