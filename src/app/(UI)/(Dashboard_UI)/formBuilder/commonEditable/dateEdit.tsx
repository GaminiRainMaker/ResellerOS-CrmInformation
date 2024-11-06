/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-lonely-if */
/* eslint-disable no-unsafe-optional-chaining */

import { Col, Row } from '@/app/components/common/antd/Grid';
import { Switch } from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import { DatePicker, Form } from 'antd';
import React from 'react';
import { EditableFiledsCommonInterface } from '../formBuilder.interface';
import { CollapseSpaceStyle } from '../../dealRegDetail/styled-component';

const EditFiledDetailsForDate: React.FC<EditableFiledsCommonInterface> = ({
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

  const addNewRowsColumn = (
    labelTypeVal: string,
    type: string,
    newValue: number,
  ) => {
    let temp: any;

    if (labelTypeVal === 'ColumnsData') {
      if (type === 'increase') {
        temp = cartItems.map((sectItem: any, sectioIndex: number) => {
          if (sectioIndex === sectionIndex) {
            return {
              ...sectItem,
              content: sectItem.content.map(
                (contItem: any, contInde: number) => {
                  if (contInde === contentIndex) {
                    const tempvar: any = [...contItem?.ColumnsData];
                    tempvar?.push({
                      title: `Column${contItem?.ColumnsData?.length + 1}`,
                      dataIndex: 'address',
                      key: '1',
                      type: 'text',
                      options: [],
                    });
                    return {
                      ...contItem,
                      ColumnsData: tempvar,
                    };
                  }
                  return contItem;
                },
              ),
            };
          }
          return sectItem;
        });
      } else {
        temp = cartItems.map((sectItem: any, sectioIndex: number) => {
          if (sectioIndex === sectionIndex) {
            return {
              ...sectItem,
              content: sectItem.content.map(
                (contItem: any, contInde: number) => {
                  if (contInde === contentIndex) {
                    const tempvar: any = [...contItem?.ColumnsData];
                    tempvar?.splice(contItem?.ColumnsData?.length - 1, 1);

                    return {
                      ...contItem,
                      ColumnsData: tempvar,
                    };
                  }
                  return contItem;
                },
              ),
            };
          }
          return sectItem;
        });
      }
    } else {
      if (type === 'increase') {
        temp = cartItems.map((sectItem: any, sectioIndex: number) => {
          if (sectioIndex === sectionIndex) {
            return {
              ...sectItem,
              content: sectItem.content.map(
                (contItem: any, contInde: number) => {
                  if (contInde === contentIndex) {
                    const tempvar: any = [...contItem?.noOfRowsData];
                    tempvar?.push('row');
                    return {
                      ...contItem,
                      noOfRowsData: tempvar,
                    };
                  }
                  return contItem;
                },
              ),
            };
          }
          return sectItem;
        });
      } else {
        temp = cartItems.map((sectItem: any, sectioIndex: number) => {
          if (sectioIndex === sectionIndex) {
            return {
              ...sectItem,
              content: sectItem.content.map(
                (contItem: any, contInde: number) => {
                  if (contInde === contentIndex) {
                    const tempvar: any = [...contItem?.noOfRowsData];
                    tempvar?.splice(contItem?.ColumnsData?.length - 1, 1);

                    return {
                      ...contItem,
                      noOfRowsData: tempvar,
                    };
                  }
                  return contItem;
                },
              ),
            };
          }
          return sectItem;
        });
      }
    }
    setCartItems(temp);
  };

  const onChangeColumnHeader = (newValue: string, typeOfUpdate: string) => {
    let newTempArr: any = [...cartItems];
    newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                ColumnsData: contItem?.ColumnsData?.map(
                  (itemOp: any, indexOption: number) => {
                    if (selectedColumnIndex === indexOption) {
                      return {
                        ...itemOp,
                        [typeOfUpdate]: newValue,
                      };
                    }
                    return itemOp;
                  },
                ),
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
                  disabled={
                    NameofTheCurrentFiled === 'Time' ||
                    NameofTheCurrentFiled === 'Date'
                  }
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
                  style={{ width: '100%' }}
                  options={
                    NameofTheCurrentFiled === 'Multi-Select'
                      ? [
                        { label: 'Mutiple', value: 'multiple' },
                        { label: 'Single', value: 'tag' },
                      ]
                      : [
                        { label: 'Text', value: 'text' },
                        { label: 'Number', value: 'number' },
                        { label: 'Email', value: 'email' },
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
      name: 'User Fill',
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
                  <Row style={{ width: '100%' }}>
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
                style={{ width: '100%' }}
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
           {CommonIndexOfUse?.user_fill && (
            <>
              {' '}
              <Typography name="Body 4/Medium">User Fill Text</Typography>
              <OsInput
                style={{width: '100%'}}
                placeholder="Label"
                type="text"
                defaultValue={CommonIndexOfUse?.userFillTextValue}
                value={CommonIndexOfUse?.userFillTextValue}
                onChange={(e: any) => {
                  changeFieldValues(e?.target?.value, 'userFillTextValue');
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
                  style={{ width: '100%' }}
                  placeholder="Label"
                  type="number"
                  defaultValue={CommonIndexOfUse?.columnRequired}
                  value={CommonIndexOfUse?.columnRequired}
                  onChange={(e: any) => {
                    // changeFieldValues(e?.target?.value, 'columnRequired');
                    if (e?.target?.value > 0) {
                      changeFieldValues(e?.target?.value, 'columnRequired');
                    }
                  }}
                />
              </>
            )}
        </Form>
      ),
    },
  ];

  const validationOptionsForDate = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Validation
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          <Typography name="Body 4/Medium">Date Format</Typography>
          <CommonSelect
            onChange={(e: any) => {
              changeFieldValues(e, 'dateformat');
            }}
            defaultValue={CommonIndexOfUse?.dateformat}
            style={{ width: '100%', marginBottom: '20px' }}
            options={[
              { label: 'mm/dd/yyyy', value: 'mm/dd/yyyy' },
              { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
              { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
              { label: 'MMM D, YYYY', value: 'MMM D, YYYY' },
              { label: 'Day, month, year', value: 'Day, month, year' },
            ]}
          />
          <Form.Item
            label={
              <Typography name="Body 4/Medium">Weeks Starts On</Typography>
            }
            name="no_of_columns"
          >
            <CommonSelect
              onChange={(e: any) => {
                changeFieldValues(e, 'weekStartOn');
              }}
              value={CommonIndexOfUse?.weekStartOn}
              style={{ width: '100%' }}
              options={[
                { label: 'Sunday', value: 'sunday' },
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
              ]}
            />
          </Form.Item>
          <Row style={{ width: '100%' }}>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '25px',
                gap: '12px',
              }}
            >
              <Row>
                <Typography name="Body 4/Medium">Start Date</Typography>
                <DatePicker
                  onChange={(e: any) => {
                    changeFieldValues(e, 'StartDate');
                  }}
                  value={CommonIndexOfUse?.StartDate}
                  style={{
                    width: '100%',
                    height: '44px',
                  }}
                />{' '}
              </Row>
              <Row>
                <Typography name="Body 4/Medium">End Date</Typography>
                <DatePicker
                  onChange={(e: any) => {
                    changeFieldValues(e, 'enddate');
                  }}
                  value={CommonIndexOfUse?.enddate}
                  style={{
                    width: '100%',
                    height: '44px',
                  }}
                />{' '}
              </Row>
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
          <OsCollapseAdmin items={validationOptionsForDate} />
        </CollapseSpaceStyle>
      </Row>
    </>
  );
};

export default EditFiledDetailsForDate;
