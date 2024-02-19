/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-lonely-if */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInputNumber from '@/app/components/common/os-input/InputNumber';
import Typography from '@/app/components/common/typography';
import {Checkbox, Drawer, Form, Radio, RadioChangeEvent} from 'antd';
import React, {useState} from 'react';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import {useSearchParams} from 'next/navigation';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
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
  typeFiled,
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

  const changeFiellOptionsValue = (newValue: string, indexofOption: number) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                options: contItem?.options?.map(
                  (itemOp: any, indexOption: number) => {
                    if (indexofOption === indexOption) {
                      return {
                        ...itemOp,
                        value: newValue,
                        label: newValue,
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
  const addNewRowsColumn = (
    labelTypeVal: string,
    type: string,
    newValue: number,
  ) => {
    let temp: any = [...cartItems];
    if (labelTypeVal == 'noOfRows') {
      if (type == 'increase') {
        temp?.[sectionIndex || 0]?.content?.[
          contentIndex || 0
        ]?.tableData?.push({});
      } else {
        temp?.[sectionIndex || 0]?.content?.[
          contentIndex || 0
        ]?.tableData?.splice(0, 1);
      }
    } else {
      if (type == 'increase') {
        temp?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.Rows?.push({
          title: (
            <Typography name="Body 4/Medium" className="dragHandler">
              Filed Name
              {temp?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.Rows
                ?.length + 1}
            </Typography>
          ),
          dataIndex: 'Filed Name1',
          key: 'Filed Name1',
          width: 130,
          render: (text: string) => <OsInput type="text" />,
        });
      } else {
        temp?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.Rows?.splice(
          0,
          1,
        );
      }
    }

    temp = cartItems.map((sectItem: any, sectioIndex: number) => {
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
    console.log('3454353', temp);
    setCartItems(temp);
  };

  const addnewOptions = () => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.options?.push(
      {value: '', label: ''},
    );
    setCartItems(tempvalue);
  };
  const deleteOption = (indexofoption: number) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[
      contentIndex || 0
    ]?.options?.splice(indexofoption, 1);
    setCartItems(tempvalue);
  };

  const type =
    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.name;

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
          {type == 'Table' ? (
            <Row gutter={[16, 16]}>
              <Col sm={12}>
                <Form.Item
                  label={
                    <Typography name="Body 4/Medium">No. of Rows</Typography>
                  }
                  name="no_of_rows"
                >
                  {/* <OsInputNumber placeholder="2" /> */}
                  <OsInput
                    placeholder="Label"
                    type="number"
                    defaultValue={
                      isOpenDrawer &&
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.noOfRows
                    }
                    value={
                      isOpenDrawer &&
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.noOfRows
                    }
                    onChange={(e: any) => {
                      // changeFieldValues(e?.target?.value, 'noOfRows');
                      if (
                        e?.target?.value >
                        cartItems?.[sectionIndex || 0]?.content?.[
                          contentIndex || 0
                        ]?.noOfRows
                      ) {
                        addNewRowsColumn(
                          'noOfRows',
                          'increase',
                          e?.target?.value,
                        );
                      } else {
                        addNewRowsColumn(
                          'noOfRows',
                          'decrease',
                          e?.target?.value,
                        );
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col sm={12}>
                <Form.Item
                  label={
                    <Typography name="Body 4/Medium">No. of Columns</Typography>
                  }
                  name="no_of_columns"
                >
                  <OsInput
                    placeholder="Label"
                    type="number"
                    defaultValue={
                      isOpenDrawer &&
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.noOfColumn
                    }
                    value={
                      isOpenDrawer &&
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.noOfColumn
                    }
                    onChange={(e: any) => {
                      // changeFieldValues(e?.target?.value, 'noOfRows');
                      if (
                        e?.target?.value >
                        cartItems?.[sectionIndex || 0]?.content?.[
                          contentIndex || 0
                        ]?.noOfRows
                      ) {
                        addNewRowsColumn(
                          'noOfColumn',
                          'increase',
                          e?.target?.value,
                        );
                      } else {
                        addNewRowsColumn(
                          'noOfColumn',
                          'decrease',
                          e?.target?.value,
                        );
                      }
                    }}
                  />
                  {/* <CommonSelect
                    onChange={(e: any) => {
                      changeFieldValues(e, 'type');
                    }}
                    defaultValue={
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.type
                    }
                    value={
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.type
                    }
                    style={{width: '100%'}}
                    options={[
                      {label: 'Text', value: 'text'},
                      {label: 'Number', value: 'number'},
                      {label: 'Email', value: 'email'},
                    ]}
                  /> */}
                </Form.Item>
              </Col>
            </Row>
          ) : (
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
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.label
                    }
                    value={
                      isOpenDrawer &&
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.label
                    }
                    onChange={(e: any) => {
                      changeFieldValues(e?.target?.value, 'label');
                    }}
                  />
                </Form.Item>
              </Col>
              <Col sm={24}>
                <Form.Item
                  label={
                    <Typography name="Body 4/Medium">Field Type</Typography>
                  }
                  name="no_of_columns"
                >
                  <CommonSelect
                    disabled={type === 'Time'}
                    onChange={(e: any) => {
                      changeFieldValues(e, 'type');
                    }}
                    defaultValue={
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.type
                    }
                    value={
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.type
                    }
                    style={{width: '100%'}}
                    options={
                      type == 'Multi-Select'
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
          )}
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
  const editChoicesOptions = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Edit Choices
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          {cartItems?.[sectionIndex || 0]?.content?.[
            contentIndex || 0
          ]?.options?.map((itemOption: any, indexOp: number) => (
            <Row style={{width: '100%'}}>
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '25px',
                  gap: '12px',
                }}
              >
                <OsInput
                  onChange={(e: any) => {
                    changeFiellOptionsValue(e?.target?.value, indexOp);
                  }}
                />{' '}
                <TrashIcon
                  color="#EB445A"
                  width={35}
                  onClick={() => deleteOption(indexOp)}
                />{' '}
                <ArrowsPointingOutIcon color="#2364AA" width={35} />
              </Col>
            </Row>
          ))}
          <Typography
            name="Body 3/Bold"
            color={token?.colorInfo}
            onClick={addnewOptions}
            cursor="pointer"
            style={{cursor: 'pointer'}}
          >
            + Add New
          </Typography>
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

  const validationOptions = [
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
              defaultValue={
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.timeformat
              }
              value={
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.timeformat
              }
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
                defaultValue={
                  cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                    ?.use12hours
                    ? 1
                    : 2
                }
              >
                <Radio value={1}>
                  <Typography name="Body 4/Medium">12 Hour Clock</Typography>
                </Radio>
                <Radio value={2}>
                  <Typography name="Body 4/Medium">24 Hour Clock</Typography>
                </Radio>
              </Radio.Group>
              {/* <Typography name="Body 4/Medium">
                <Checkbox /> 12 Hour Clock
              </Typography>
              <Typography name="Body 4/Medium">
                <Checkbox /> 24 Hour Clock
              </Typography> */}
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  console.log('typetype', type);
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
        {(type === 'Multi-Select' || type === 'Time') && (
          <Row>
            <CollapseSpaceStyle size={24} direction="vertical">
              <OsCollapseAdmin
                items={type == 'Time' ? validationOptions : editChoicesOptions}
              />
            </CollapseSpaceStyle>
          </Row>
        )}
      </Drawer>
    </div>
  );
};

export default EditFiledDetails;
