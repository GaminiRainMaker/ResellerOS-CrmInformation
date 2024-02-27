/* eslint-disable @typescript-eslint/indent */

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form, Radio, RadioChangeEvent} from 'antd';
import React from 'react';
import {EditableFiledsCommonInterface} from '../formBuilder.interface';
import {CollapseSpaceStyle} from '../../dealRegDetail/DealRegDetailForm/styled-components';

const TimeEditFileds: React.FC<EditableFiledsCommonInterface> = ({
  sectionIndex,
  cartItems,
  contentIndex,
  setCartItems,
  form,
  selectedColumnIndex,
}) => {
  const [token] = useThemeToken();

  const CommonIndexOfUse =
    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0];

  const NameofTheCurrentFiled = CommonIndexOfUse?.name;

  const changeFieldValues = (newValue: any, labelTypeVal: string) => {
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
                  disabled={NameofTheCurrentFiled === 'Time'}
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
                  options={
                    NameofTheCurrentFiled === 'Multi-Select'
                      ? [
                          {label: 'Mutiple', value: 'multiple'},
                          {label: 'Single', value: 'tag'},
                        ]
                      : [
                          {label: 'Text', value: 'text'},
                          {label: 'Number', value: 'number'},
                          {label: 'Email', value: 'email'},
                        ]
                  }
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
      value: CommonIndexOfUse?.required,
      changeValue: 'required',
    },
    {
      name: 'Label',
      key: 2,
      value: CommonIndexOfUse?.requiredLabel,
      changeValue: 'requiredLabel',
    },
    {
      name: 'Hint Text',
      key: 3,
      value: CommonIndexOfUse?.hintext,
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
          {optionsType?.map((itemOption: any, index: number) => (
            <>
              {' '}
              {(((NameofTheCurrentFiled === 'Checkbox' ||
                NameofTheCurrentFiled === 'Radio Button' ||
                NameofTheCurrentFiled === 'Toggle') &&
                index !== 2) ||
                NameofTheCurrentFiled !== 'Checkbox') && (
                <Row style={{width: '100%'}}>
                  <Col
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: '25px',
                    }}
                  >
                    <Typography name="Body 4/Medium">
                      {itemOption?.name}
                    </Typography>
                    <Switch
                      onChange={(e: any) => {
                        changeFieldValues(e, itemOption?.changeValue);
                      }}
                      defaultChecked={itemOption?.value}
                      checked={itemOption?.value}
                    />
                  </Col>
                </Row>
              )}
            </>
          ))}
          {CommonIndexOfUse?.hintext && (
            <>
              {' '}
              <Typography name="Body 4/Medium">Hint Text</Typography>
              <OsInput
                style={{width: '100%'}}
                placeholder="Label"
                type="text"
                defaultValue={CommonIndexOfUse?.hintTextValue}
                value={CommonIndexOfUse?.hintTextValue}
                onChange={(e: any) => {
                  changeFieldValues(e?.target?.value, 'hintTextValue');
                }}
              />
            </>
          )}
          {(NameofTheCurrentFiled === 'Checkbox' ||
            NameofTheCurrentFiled === 'Radio Button' ||
            NameofTheCurrentFiled === 'Toggle') && (
            <>
              {' '}
              <Typography name="Body 4/Medium">No Of Columns</Typography>
              <OsInput
                style={{width: '100%'}}
                placeholder="Label"
                type="number"
                defaultValue={CommonIndexOfUse?.columnRequired}
                value={CommonIndexOfUse?.columnRequired}
                onChange={(e: any) => {
                  changeFieldValues(e?.target?.value, 'columnRequired');
                }}
              />
            </>
          )}
        </Form>
      ),
    },
  ];

  const onChangeRadio = (e: RadioChangeEvent) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                use12hours: e?.target?.value === 1,
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

  const validationOptionsforTime = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Validation
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          <Form.Item
            label={<Typography name="Body 4/Medium">Time Format</Typography>}
            name="no_of_columns"
          >
            <CommonSelect
              onChange={(e: any) => {
                changeFieldValues(e, 'timeformat');
              }}
              defaultValue={CommonIndexOfUse?.timeformat}
              value={CommonIndexOfUse?.timeformat}
              style={{width: '100%'}}
              options={[
                {label: 'HH:MM', value: 'HH:mm'},
                {label: 'HH:MM :SS', value: 'HH:mm:ss'},
              ]}
            />
          </Form.Item>
          <Row style={{width: '100%'}}>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '25px',
              }}
            >
              <Radio.Group
                onChange={onChangeRadio}
                defaultValue={CommonIndexOfUse?.use12hours ? 1 : 2}
              >
                <Radio value={1}>
                  <Typography name="Body 4/Medium">12 Hour Clock</Typography>
                </Radio>
                <Radio value={2}>
                  <Typography name="Body 4/Medium">24 Hour Clock</Typography>
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return (
    <>
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
      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={validationOptionsforTime} />
        </CollapseSpaceStyle>
      </Row>
    </>
  );
};

export default TimeEditFileds;
