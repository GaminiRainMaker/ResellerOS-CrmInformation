/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-lonely-if */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import {
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Radio,
  RadioChangeEvent,
} from 'antd';
import React, {useState} from 'react';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
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
                      return newValue;
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
    setCartItems(temp);
  };

  const addnewOptions = () => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.options?.push(
      '',
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

  // save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  // const handle drag sorting
  const handleSort = () => {
    const optionItems: any = [...cartItems];

    // remove and save the dragged item content
    const draggedItemContent1 = optionItems?.[sectionIndex || 0]?.content?.[
      contentIndex || 0
    ]?.options.splice(dragItem.current, 1)[0];

    // switch the position
    optionItems?.[sectionIndex || 0]?.content?.[
      contentIndex || 0
    ]?.options.splice(dragOverItem.current, 0, draggedItemContent1);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array;
    setCartItems(optionItems);
  };

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
                key={indexOp}
                className="list-item"
                draggable
                onDragStart={(e) => {
                  dragItem.current = indexOp;
                }}
                onDragEnter={(e) => {
                  dragOverItem.current = indexOp;
                }}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '25px',
                  gap: '12px',
                }}
              >
                {/* <div>{itemOption}</div> */}
                <OsInput
                  key={indexOp}
                  defaultValue={itemOption}
                  value={itemOption}
                  onChange={(e: any) => {
                    changeFiellOptionsValue(e?.target?.value, indexOp);
                  }}
                />{' '}
                <TrashIcon
                  color="#EB445A"
                  width={35}
                  onClick={() => deleteOption(indexOp)}
                />{' '}
                <ArrowsPointingOutIcon
                  color="#2364AA"
                  width={35}
                  key={indexOp}
                  className="list-item"
                  // draggable
                  onDragStart={(e) => {
                    dragItem.current = indexOp;
                  }}
                  onDragEnter={(e) => {
                    dragOverItem.current = indexOp;
                  }}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                />
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

  const QuickSetupItemsForTTextContent = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Quick Setup
        </Typography>
      ),
      children: (
        <Form layout="vertical" form={form}>
          <Form.Item
            label={<Typography name="Body 4/Medium">Text</Typography>}
            name="no_of_columns"
          >
            <OsInput
              style={{width: '100%'}}
              placeholder="Label"
              defaultValue={
                isOpenDrawer &&
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.sectionTitle
              }
              value={
                isOpenDrawer &&
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.sectionTitle
              }
              onChange={(e: any) => {
                changeFieldValues(e?.target?.value, 'sectionTitle');
              }}
            />
          </Form.Item>
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
  const OptionsItemsForTextContent = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Options
        </Typography>
      ),
      children: (
        <Form layout="vertical">
          {/* <Form.Item */}
          {/* label={<Typography name="Body 4/Medium">Date Format</Typography>}
          name="no_of_columns"
        > */}
          <Typography name="Body 4/Medium">Alignement</Typography>
          <CommonSelect
            onChange={(e: any) => {
              changeFieldValues(e, 'Alignemnt');
            }}
            defaultValue={
              cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                ?.Alignemnt
            }
            // value={
            //   cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
            //     ?.dateformat
            // }
            style={{width: '100%', marginBottom: '20px'}}
            options={[
              {label: 'Left', value: 'left'},
              {label: 'Right', value: 'right'},
              {label: 'Center', value: 'center'},
            ]}
          />
          {/* </Form.Item> */}
          <Form.Item
            label={<Typography name="Body 4/Medium">Font Size</Typography>}
            name="no_of_columns"
          >
            <CommonSelect
              onChange={(e: any) => {
                changeFieldValues(e, 'FontSize');
              }}
              defaultValue={
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.FontSize
              }
              // value={
              //   cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
              //     ?.dateformat
              // }
              style={{width: '100%', marginBottom: '20px'}}
              options={[
                {label: 'Heading 1', value: 'h1'},
                {label: 'Heading 2', value: 'h2'},
                {label: 'Heading 3', value: 'h3'},
                {label: 'Heading 4', value: 'h4'},
              ]}
            />
          </Form.Item>
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

  const validationOptionsForCurrency = [
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
            label={<Typography name="Body 4/Medium">Currency</Typography>}
            name="no_of_columns"
          >
            <CommonSelect
              onChange={(e: any) => {
                changeFieldValues(e, 'currency');
              }}
              defaultValue={
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.currency
              }
              value={
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.currency
              }
              style={{width: '100%'}}
              options={[
                {label: 'USB', value: 'USB'},
                {label: 'Euro', value: 'Euro'},
                {label: 'EUR', value: 'EUR'},
                {label: 'KWANZA', value: 'KWANZA'},
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
              <Typography name="Body 4/Medium">Hide Decimals</Typography>
              <Switch
                defaultChecked={
                  cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                    ?.deciamlHide
                }
                onChange={(e: any) => {
                  changeFieldValues(e, 'deciamlHide');
                }}
              />
            </Col>
          </Row>
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
          {/* <Form.Item */}
          {/* label={<Typography name="Body 4/Medium">Date Format</Typography>}
            name="no_of_columns"
          > */}
          <Typography name="Body 4/Medium">Date Format</Typography>
          <CommonSelect
            onChange={(e: any) => {
              changeFieldValues(e, 'dateformat');
            }}
            defaultValue={
              cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                ?.dateformat
            }
            // value={
            //   cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
            //     ?.dateformat
            // }
            style={{width: '100%', marginBottom: '20px'}}
            options={[
              {label: 'mm/dd/yyyy', value: 'mm/dd/yyyy'},
              {label: 'YYYY-MM-DD', value: 'YYYY-MM-DD'},
              {label: 'MM/DD/YYYY', value: 'MM/DD/YYYY'},
              {label: 'Day, month, year', value: 'Day, month, year'},
            ]}
          />
          {/* </Form.Item> */}
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
              // defaultValue={
              //   cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
              //     ?.weekStartOn
              // }
              value={
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.weekStartOn
              }
              style={{width: '100%'}}
              options={[
                {label: 'Sunday', value: 'sunday'},
                {label: 'Monday', value: 'monday'},
                {label: 'Tuesday', value: 'tuesday'},
                {label: 'Wednesday', value: 'wednesday'},
                {label: 'Thursday', value: 'thursday'},
                {label: 'Friday', value: 'friday'},
                {label: 'Saturday', value: 'saturday'},
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
                gap: '12px',
              }}
            >
              <Row>
                <Typography name="Body 4/Medium">Start Date</Typography>
                <DatePicker
                  onChange={(e: any) => {
                    changeFieldValues(e, 'StartDate');
                  }}
                  value={
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.StartDate
                  }
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
                  value={
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.enddate
                  }
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
            defaultValue={
              cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                ?.defaultcountry
            }
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
              value={
                cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                  ?.dataformat
              }
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
    <div style={containerStyle}>
      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin
            items={
              type === 'T text Content'
                ? QuickSetupItemsForTTextContent
                : QuickSetupItems
            }
          />
        </CollapseSpaceStyle>
      </Row>

      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin
            items={
              type === 'T text Content'
                ? OptionsItemsForTextContent
                : OptionsItems
            }
          />
        </CollapseSpaceStyle>
      </Row>
      {(type === 'Multi-Select' ||
        type === 'Date' ||
        type === 'Drop Down' ||
        type === 'Time' ||
        type === 'Currency' ||
        type === 'Contact') && (
        <Row>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin
              items={
                type == 'Time'
                  ? validationOptionsforTime
                  : type === 'Currency'
                    ? validationOptionsForCurrency
                    : type === 'Date'
                      ? validationOptionsForDate
                      : type === 'Contact'
                        ? validationOptionsForContact
                        : editChoicesOptions
              }
            />
          </CollapseSpaceStyle>
        </Row>
      )}
    </div>
  );
};

export default EditFiledDetails;
