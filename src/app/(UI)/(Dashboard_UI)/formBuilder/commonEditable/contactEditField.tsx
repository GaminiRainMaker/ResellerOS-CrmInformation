/* eslint-disable @typescript-eslint/indent */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import React from 'react';
import {EditableFiledsCommonInterface} from '../formBuilder.interface';
import { CollapseSpaceStyle } from '../../dealRegDetail/styled-component';

const ContactEditFields: React.FC<EditableFiledsCommonInterface> = ({
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
      name: 'Uer Fill',
      key: 2,
      value: CommonIndexOfUse?.user_fill,
      changeValue: 'user_fill',
    },
    {
      name: 'Label',
      key: 3,
      value: CommonIndexOfUse?.requiredLabel,
      changeValue: 'requiredLabel',
    },
    {
      name: 'Hint Text',
      key: 4,
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

  const validationOptionsForContact = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Validation
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          {/* <Form.Item */}
          {/* label={<Typography name="Body 4/Medium">Date Format</Typography>}
            name="no_of_columns"
          > */}
          <Typography name="Body 4/Medium">Deafult</Typography>
          <CommonSelect
            onChange={(e: any) => {
              changeFieldValues(e, 'defaultcountry');
            }}
            defaultValue={CommonIndexOfUse?.defaultcountry}
            style={{width: '100%', marginBottom: '20px'}}
            options={[
              {label: '+91 India', value: 'india'},
              {label: '+64 NZ', value: 'NZ'},
              {label: '+31 Netherlands', value: 'netherlands'},
              {label: '+52 Mexico', value: 'mexico'},
              {label: '+1 Canada', value: 'canada'},
              {label: '+7 Russia', value: 'russia'},
              {label: '+44 USA', value: 'usa'},
            ]}
          />
          {/* </Form.Item> */}
          <Form.Item
            label={<Typography name="Body 4/Medium">Data Format</Typography>}
            name="no_of_columns"
          >
            <CommonSelect
              onChange={(e: any) => {
                changeFieldValues(e, 'dataformat');
              }}
              value={CommonIndexOfUse?.dataformat}
              style={{width: '100%'}}
              options={[
                {label: '3-3-3', value: '3-3-3'},
                {label: '33-33-33', value: '33-33-33'},
                {label: '333-333-333', value: '333-333-333'},
              ]}
            />
          </Form.Item>
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
          <OsCollapseAdmin items={validationOptionsForContact} />
        </CollapseSpaceStyle>
      </Row>
    </>
  );
};

export default ContactEditFields;
