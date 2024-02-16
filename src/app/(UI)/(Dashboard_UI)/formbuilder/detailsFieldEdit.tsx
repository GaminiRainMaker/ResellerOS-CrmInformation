/* eslint-disable @typescript-eslint/no-unused-expressions */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import Typography from '@/app/components/common/typography';
import {Drawer, Form} from 'antd';
import React, {useState} from 'react';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import {useSearchParams} from 'next/navigation';
import {CollapseSpaceStyle} from '../dealRegDetail/DealRegDetailForm/styled-components';
import {FormBuilderInterFace} from './formBuilder.interface';

const EditFiledDetails: React.FC<FormBuilderInterFace> = ({
  isOpenDrawer = false,
  setIsOpenDrawer,
  sectionIndex,
  cartItems,
  contentIndex,
  setCartItems,
  form,
}) => {
  const [token] = useThemeToken();
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: 800,
    overflow: 'hidden',
    background: 'null',
    border: 'null',
    borderRadius: 'null',
    padding: '0px',
  };
  const [labelType, setLabelType] = useState<any>();
  const changeFieldValues = (newValue: any, labelTypeVal: string) => {
    setLabelType(labelTypeVal);
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                [labelTypeVal]: newValue,
              };
            }
            return contItem;
          }),
        };
      }
      return sectItem;
    });

    setCartItems(newTempArr);
  };

  const QuickSetupItems = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Quick Setup
        </Typography>
      ),
      children: (
        <Form layout="vertical" form={form}>
          ,
          <Row gutter={[16, 16]}>
            <Col sm={24}>
              <Form.Item
                label={
                  <Typography name="Body 4/Medium">Change Label</Typography>
                }
                name="no_of_rows"
              >
                {/* <OsInputNumber placeholder="2" /> */}
                <OsInput
                  placeholder="Label"
                  defaultValue={
                    isOpenDrawer &&
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.label
                  }
                  value={
                    isOpenDrawer &&
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.label
                  }
                  onChange={(e: any) => {
                    changeFieldValues(e?.target?.value, 'label');
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item
                label={<Typography name="Body 4/Medium">Field Type</Typography>}
                name="no_of_columns"
              >
                <CommonSelect
                  onChange={(e: any) => {
                    changeFieldValues(e, 'type');
                  }}
                  defaultValue={
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.type
                  }
                  value={
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.type
                  }
                  style={{width: '100%'}}
                  options={[
                    {label: 'Text', value: 'text'},
                    {label: 'Number', value: 'number'},
                    {label: 'Email', value: 'email'},
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  const optionsType = [
    {
      name: 'Required Field',
      key: 1,
      value:
        cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.required,
      changeValue: 'required',
    },
    {
      name: 'Label',
      key: 2,
      value:
        cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
          ?.requuireLabel,
      changeValue: 'requuireLabel',
    },
    {
      name: 'Hint Text',
      key: 3,
      value:
        cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.hintext,
      changeValue: 'hintext',
    },
  ];

  const OptionsItems = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Options
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          {optionsType?.map((itemOption: any) => (
            <Row style={{width: '100%'}}>
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '25px',
                }}
              >
                <Typography name="Body 4/Medium">{itemOption?.name}</Typography>
                <Switch
                  onChange={(e: any) => {
                    changeFieldValues(e, itemOption?.changeValue);
                  }}
                  defaultChecked={itemOption?.value}
                  checked={itemOption?.value}
                />
              </Col>
            </Row>
          ))}
        </Form>
      ),
    },
  ];

  return (
    <div style={containerStyle}>
      <Drawer
        title="Text Field"
        placement="right"
        closable={false}
        onClose={() => setIsOpenDrawer && setIsOpenDrawer(false)}
        open={isOpenDrawer}
        getContainer={false}
      >
        <Row>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin items={QuickSetupItems} />
          </CollapseSpaceStyle>
        </Row>

        <Row>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin items={OptionsItems} />
          </CollapseSpaceStyle>
        </Row>
      </Drawer>
    </div>
  );
};

export default EditFiledDetails;
