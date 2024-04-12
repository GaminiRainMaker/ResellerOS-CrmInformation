import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import {FC} from 'react';
import {AddStandardAttributeFieldInterface} from './superAdminDealReg.interface';

const AddNewStandardAttributeSection: FC<
  AddStandardAttributeFieldInterface
> = ({form, onFinish, isDrawer}) => {
  const [token] = useThemeToken();
  return (
    <>
      {!isDrawer && (
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
            New Standard Attribute Section
          </Typography>
        </Row>
      )}
      <Space
        size={0}
        direction="vertical"
        style={{
          width: '100%',
          padding: !isDrawer ? '24px 40px 20px 40px' : '',
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
                    Standard Attribute Section Name
                  </Typography>
                }
                name="name"
              >
                <OsInput placeholder="Write Text" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>

            <Col span={24}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Order</Typography>}
                name="order"
              >
                <OsInputNumber placeholder="Write" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>

            <Col span={24}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Active</Typography>}
                name="is_active"
                valuePropName="checked"
              >
                <Checkbox name="is_active" />
              </SelectFormItem>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Required</Typography>}
                name="is_required"
                valuePropName="checked"
              >
                <Checkbox name="is_required" />
              </SelectFormItem>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">View Only</Typography>}
                name="is_view"
                valuePropName="checked"
              >
                <Checkbox name="is_view" />
              </SelectFormItem>
            </Col>
          </Row>
        </Form>
      </Space>
    </>
  );
};

export default AddNewStandardAttributeSection;
