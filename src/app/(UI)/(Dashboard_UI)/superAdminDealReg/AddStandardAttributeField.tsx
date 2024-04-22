'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsInput from '@/app/components/common/os-input';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import {SelectFormItem} from '@/app/components/common/os-oem-select/oem-select-styled';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {
  attributeFieldDataTypeOptions,
  attributeFieldMapToOptions,
} from '@/app/utils/CONSTANTS';
import {Form} from 'antd';
import {FC, useEffect} from 'react';
import {getAllAttributeSection} from '../../../../../redux/actions/attributeSection';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import {AddStandardAttributeFieldInterface} from './superAdminDealReg.interface';

const AddStandardAttributeField: FC<AddStandardAttributeFieldInterface> = ({
  form,
  onFinish,
  isDrawer,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();

  const {data: attributeSectionData} = useAppSelector(
    (state) => state.attributeSection,
  );

  useEffect(() => {
    dispatch(getAllAttributeSection(''));
  }, []);

  const attributeSectionOption = attributeSectionData?.map(
    (attributeSectionItem: any) => ({
      label: attributeSectionItem?.name,
      value: attributeSectionItem?.id,
    }),
  );

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
            New Standard Attribute Fields
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
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Standard Attribute Section
                  </Typography>
                }
                name="attribute_section_id"
                rules={[
                  {
                    required: true,
                    message: 'Please Select Standard Attribute Section!',
                  },
                ]}
              >
                <CommonSelect
                  allowClear
                  placeholder="Select Attribute Section"
                  style={{width: '100%'}}
                  options={attributeSectionOption}
                />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">Attribute Label</Typography>
                }
                name="label"
                rules={[
                  {
                    required: true,
                    message: 'Please Fill Label!',
                  },
                ]}
              >
                <OsInput placeholder="Select Label" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Attribute Data Type
                  </Typography>
                }
                name="data_type"
                rules={[
                  {
                    required: true,
                    message: 'Please Select Data Type!',
                  },
                ]}
              >
                <CommonSelect
                  allowClear
                  placeholder="Select Type"
                  style={{width: '100%'}}
                  options={attributeFieldDataTypeOptions}
                />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Order</Typography>}
                name="order"
              >
                <OsInputNumber placeholder="Write the Order here" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Map from Attribute Field
                  </Typography>
                }
                name="map_from"
              >
                <CommonSelect
                  placeholder="Select"
                  style={{width: '100%'}}
                  options={attributeFieldMapToOptions}
                />
              </SelectFormItem>
            </Col>
            <Col span={12}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Map to Attribute Field
                  </Typography>
                }
                name="map_to"
              >
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={24}>
              <SelectFormItem
                label={<Typography name="Body 4/Medium">Help Text</Typography>}
                name="help_text"
              >
                <OsInput placeholder="Write Help Text here" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={24}>
              <SelectFormItem
                label={
                  <Typography name="Body 4/Medium">
                    Standard Attribute Name
                  </Typography>
                }
                name="name"
              >
                <OsInput placeholder="Write Attribute Name" style={{width: '100%'}} />
              </SelectFormItem>
            </Col>
            <Col span={24} style={{display: 'flex'}}>
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

export default AddStandardAttributeField;
