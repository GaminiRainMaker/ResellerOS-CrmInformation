/* eslint-disable @typescript-eslint/no-redeclare */
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
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import {OSDraggerStyle} from '@/app/components/common/os-upload/styled-components';
import Typography from '@/app/components/common/typography';
import {convertFileToBase64} from '@/app/utils/base';
import {
  ArrowsPointingOutIcon,
  FolderArrowDownIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {DatePicker, Form, Input, Radio, RadioChangeEvent, message} from 'antd';
import React, {useState} from 'react';
import {EditableFiledsCommonInterface} from '../formBuilder.interface';

const EditFiledDetails: React.FC<EditableFiledsCommonInterface> = ({
  sectionIndex,
  cartItems,
  contentIndex,
  setCartItems,
  form,
  selectedColumnIndex,
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

  const CommonIndexOfUse =
    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0];
  const [noofrows, setNoofrows] = useState<number>(CommonIndexOfUse?.noOfRows);
  const [noofcolumn, setNoofcolumn] = useState<number>(
    CommonIndexOfUse?.noOfColumn,
  );

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

  const addnewOptions = (nameOptions: any) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      nameOptions
    ]?.push('');
    setCartItems(tempvalue);
  };
  const deleteOption = (indexofoption: number, nameOptions: any) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.ColumnsData?.[
      selectedColumnIndex || 0
    ]?.[nameOptions]?.splice(indexofoption, 1);
    setCartItems(tempvalue);
  };

  const changeFiellOptionsValue = (
    newValue: string,
    indexofOption: number,
    optiontypename: string,
  ) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                [optiontypename]: contItem?.[optiontypename]?.map(
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

  // save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  // const handle drag sorting
  const handleSort = (changeOptions: any) => {
    const optionItems: any = [...cartItems];

    // remove and save the dragged item content
    const draggedItemContent1 = optionItems?.[sectionIndex || 0]?.content?.[
      contentIndex || 0
    ]?.[changeOptions].splice(dragItem.current, 1)[0];

    // switch the position
    optionItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      changeOptions
    ].splice(dragOverItem.current, 0, draggedItemContent1);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array;
    setCartItems(optionItems);
  };

  const handleSortfortable = (changeOptions: any) => {
    const optionItems: any = [...cartItems];

    // remove and save the dragged item content
    const draggedItemContent1 = optionItems?.[sectionIndex || 0]?.content?.[
      contentIndex || 0
    ]?.ColumnsData?.[selectedColumnIndex || 0]?.options.splice(
      dragItem.current,
      1,
    )[0];

    // switch the position
    optionItems?.[sectionIndex || 0]?.content?.[
      contentIndex || 0
    ]?.ColumnsData?.[selectedColumnIndex || 0]?.options.splice(
      dragOverItem.current,
      0,
      draggedItemContent1,
    );

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
                onDragEnd={() => handleSort('options')}
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
                <Input
                  key={indexOp}
                  // defaultValue={itemOption}
                  value={itemOption}
                  onChange={(e: any) => {
                    changeFiellOptionsValue(
                      e?.target?.value,
                      indexOp,
                      'options',
                    );
                  }}
                />{' '}
                <TrashIcon
                  color="#EB445A"
                  width={35}
                  onClick={() => deleteOption(indexOp, 'options')}
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
                  onDragEnd={() => handleSort('options')}
                  onDragOver={(e) => e.preventDefault()}
                />
              </Col>
            </Row>
          ))}
          <Typography
            name="Body 3/Bold"
            color={token?.colorInfo}
            onClick={() => addnewOptions('options')}
            cursor="pointer"
            style={{cursor: 'pointer'}}
          >
            + Add New
          </Typography>
        </Form>
      ),
    },
  ];
  const editChoicesOptionsForCheckBox = [
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
          ]?.labelOptions?.map((itemOption: any, indexOp: number) => (
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
                onDragEnd={() => handleSort('labelOptions')}
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
                    changeFiellOptionsValue(
                      e?.target?.value,
                      indexOp,
                      'labelOptions',
                    );
                  }}
                />{' '}
                <TrashIcon
                  color="#EB445A"
                  width={35}
                  onClick={() => deleteOption(indexOp, 'labelOptions')}
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
                  onDragEnd={() => handleSort('labelOptions')}
                  onDragOver={(e) => e.preventDefault()}
                />
              </Col>
            </Row>
          ))}
          <Typography
            name="Body 3/Bold"
            color={token?.colorInfo}
            onClick={() => addnewOptions('labelOptions')}
            cursor="pointer"
            style={{cursor: 'pointer'}}
          >
            + Add New
          </Typography>
        </Form>
      ),
    },
  ];
  const addnewOptionsForTable = (nameOptions: any) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.ColumnsData?.[
      selectedColumnIndex || 0
    ]?.[nameOptions]?.push('');
    setCartItems(tempvalue);
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

  const changeFiellOptionsValueForTable = (
    newValue: string,
    indexofOption: number,
    optiontypename: string,
  ) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                ColumnsData: contItem?.ColumnsData?.map(
                  (columnIntData: any, columnIntIndex: number) => {
                    if (selectedColumnIndex === columnIntIndex) {
                      return {
                        ...columnIntData,
                        options: columnIntData?.options?.map(
                          (optionItem: any, optionIndex: number) => {
                            if (optionIndex === indexofOption) {
                              return newValue;
                            }
                            return optionItem;
                          },
                        ),
                      };
                    }
                    return columnIntData;
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
    console.log('newTempArr', newTempArr);
    setCartItems(newTempArr);
  };
  const editChoicesOptionsFOrTable = [
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
          ]?.ColumnsData?.[selectedColumnIndex || 0]?.options?.map(
            (itemOption: any, indexOp: number) => (
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
                  onDragEnd={() => handleSortfortable('options')}
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
                  <Input
                    key={indexOp}
                    // defaultValue={itemOption}
                    type="text"
                    value={itemOption}
                    onChange={(e: any) => {
                      changeFiellOptionsValueForTable(
                        e?.target?.value,
                        indexOp,
                        'options',
                      );
                    }}
                  />{' '}
                  <TrashIcon
                    color="#EB445A"
                    width={35}
                    onClick={() => deleteOption(indexOp, 'options')}
                  />{' '}
                  <ArrowsPointingOutIcon
                    color="#2364AA"
                    width={35}
                    key={indexOp}
                  />
                </Col>
              </Row>
            ),
          )}
          <Typography
            name="Body 3/Bold"
            color={token?.colorInfo}
            onClick={() => addnewOptionsForTable('options')}
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
          {NameofTheCurrentFiled == 'Table' ? (
            <>
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
                        cartItems?.[sectionIndex || 0]?.content?.[
                          contentIndex || 0
                        ]?.noOfRows
                      }
                      value={
                        cartItems?.[sectionIndex || 0]?.content?.[
                          contentIndex || 0
                        ]?.noOfRows
                      }
                      onChange={(e: any) => {
                        changeFieldValues(e?.target?.value, 'noOfRows');
                        setNoofrows(e?.target?.value);
                        if (e?.target?.value > noofrows) {
                          addNewRowsColumn(
                            'noOfRowsData',
                            'increase',
                            e?.target?.value,
                          );
                        } else {
                          addNewRowsColumn(
                            'noOfRowsData',
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
                      <Typography name="Body 4/Medium">
                        No. of Columns
                      </Typography>
                    }
                    name="no_of_columns"
                  >
                    <OsInput
                      placeholder="Label"
                      type="number"
                      defaultValue={
                        cartItems?.[sectionIndex || 0]?.content?.[
                          contentIndex || 0
                        ]?.noOfColumn
                      }
                      value={
                        cartItems?.[sectionIndex || 0]?.content?.[
                          contentIndex || 0
                        ]?.noOfColumn
                      }
                      onChange={(e: any) => {
                        changeFieldValues(e?.target?.value, 'noOfColumn');
                        setNoofcolumn(e?.target?.value);
                        if (e?.target?.value > noofcolumn) {
                          addNewRowsColumn(
                            'ColumnsData',
                            'increase',
                            e?.target?.value,
                          );
                        } else {
                          addNewRowsColumn(
                            'ColumnsData',
                            'decrease',
                            e?.target?.value,
                          );
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <>
                <Form.Item
                  label={
                    <Typography name="Body 4/Medium">Column Header</Typography>
                  }
                  name="header"
                >
                  <OsInput
                    type="text"
                    value={
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.ColumnsData[selectedColumnIndex || 0]?.title
                    }
                    defaultValue={
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.ColumnsData[selectedColumnIndex || 0]?.title
                    }
                    onChange={(e: any) => {
                      onChangeColumnHeader(e?.target?.value, 'title');
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <Typography name="Body 4/Medium">Field Type</Typography>
                  }
                  name="filedType"
                >
                  <CommonSelect
                    onChange={(e: any) => {
                      onChangeColumnHeader(e, 'type');
                    }}
                    defaultValue={
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.ColumnsData[selectedColumnIndex || 0]?.type
                    }
                    value={
                      cartItems?.[sectionIndex || 0]?.content?.[
                        contentIndex || 0
                      ]?.ColumnsData[selectedColumnIndex || 0]?.type
                    }
                    style={{width: '100%', marginBottom: '20px'}}
                    options={[
                      {label: 'Multi-select Drop Down', value: 'multiple'},
                      {label: 'Single-select Drop Down', value: 'single'},
                      {label: 'Text', value: 'text'},
                      {label: 'Number', value: 'number'},
                    ]}
                  />
                </Form.Item>
              </>
            </>
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
                    disabled={NameofTheCurrentFiled === 'Time'}
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
                      NameofTheCurrentFiled == 'Multi-Select'
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
              defaultValue={CommonIndexOfUse?.sectionTitle}
              value={CommonIndexOfUse?.sectionTitle}
              onChange={(e: any) => {
                changeFieldValues(e?.target?.value, 'sectionTitle');
              }}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];
  const QuickSetupItemsForCheckBox = [
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
            label={<Typography name="Body 4/Medium">Change Label</Typography>}
            name="placeholdertext"
          >
            <OsInput
              style={{width: '100%'}}
              placeholder="Label"
              defaultValue={CommonIndexOfUse?.placeholdertext}
              value={CommonIndexOfUse?.placeholdertext}
              onChange={(e: any) => {
                changeFieldValues(e?.target?.value, 'placeholdertext');
              }}
            />
          </Form.Item>
          {NameofTheCurrentFiled === 'Radio Button' ? (
            <></>
          ) : (
            <Form.Item
              label={<Typography name="Body 4/Medium">Field Type</Typography>}
              name="filedType"
            >
              <CommonSelect
                onChange={(e: any) => {
                  changeFieldValues(e, 'filedType');
                }}
                defaultValue={CommonIndexOfUse?.filedType}
                value={CommonIndexOfUse?.filedType}
                style={{width: '100%', marginBottom: '20px'}}
                options={[
                  {label: 'Multi-select Drop Down', value: 'multiple'},
                  {label: 'Single-select Drop Down', value: 'single'},
                ]}
              />
            </Form.Item>
          )}
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
                index != 2) ||
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
          <Typography name="Body 4/Medium">Alignement</Typography>
          <CommonSelect
            onChange={(e: any) => {
              changeFieldValues(e, 'Alignemnt');
            }}
            defaultValue={CommonIndexOfUse?.Alignemnt}
            style={{width: '100%', marginBottom: '20px'}}
            options={[
              {label: 'Left', value: 'left'},
              {label: 'Right', value: 'right'},
              {label: 'Center', value: 'center'},
            ]}
          />

          <Form.Item
            label={<Typography name="Body 4/Medium">Font Size</Typography>}
            name="no_of_columns"
          >
            <CommonSelect
              onChange={(e: any) => {
                changeFieldValues(e, 'FontSize');
              }}
              defaultValue={CommonIndexOfUse?.FontSize}
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
              defaultValue={CommonIndexOfUse?.currency}
              value={CommonIndexOfUse?.currency}
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
                defaultChecked={CommonIndexOfUse?.deciamlHide}
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
            defaultValue={CommonIndexOfUse?.dateformat}
            // value={
            //   CommonIndexOfUse
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
              //   CommonIndexOfUse
              //     ?.weekStartOn
              // }
              value={CommonIndexOfUse?.weekStartOn}
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
  const dispatch = useAppDispatch();
  const beforeUpload = (file: File) => {
    convertFileToBase64(file)
      .then((base64String) => {
        console.log('base64String', base64String);

        if (base64String) {
          dispatch(uploadToAws({document: base64String})).then(
            (payload: any) => {
              const pdfUrl = payload?.payload?.data?.Location;

              const newTempArr = cartItems.map(
                (sectItem: any, sectioIndex: number) => {
                  if (sectioIndex === sectionIndex) {
                    return {
                      ...sectItem,
                      content: sectItem.content.map(
                        (contItem: any, contInde: number) => {
                          if (contInde === contentIndex) {
                            const tempPdf: any =
                              contItem?.pdfUrl?.length > 0
                                ? [...contItem?.pdfUrl]
                                : [];
                            tempPdf?.push(pdfUrl);
                            return {
                              ...contItem,
                              pdfUrl: tempPdf,
                            };
                          }
                          return contItem;
                        },
                      ),
                    };
                  }
                  return sectItem;
                },
              );

              setCartItems(newTempArr);
            },
          );
        }
      })
      .catch((error) => {
        message.error('Error converting file to base64', error);
      });
    return false;
  };
  const QuickSetupItemsForAttachement = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium" color={token?.colorInfo}>
          Quick Setup
        </Typography>
      ),
      children: (
        <Form layout="vertical" form={form}>
          <OSDraggerStyle
            beforeUpload={beforeUpload}
            showUploadList={false}
            multiple
          >
            <FolderArrowDownIcon width={24} color={token?.colorInfoBorder} />
            <Typography
              name="Body 4/Medium"
              color={token?.colorPrimaryText}
              as="div"
            >
              <Typography
                name="Body 4/Medium"
                style={{textDecoration: 'underline', cursor: 'pointer'}}
                color={token?.colorPrimary}
              >
                Click to Upload
              </Typography>{' '}
              or Drag and Drop
            </Typography>
            <Typography name="Body 4/Medium" color={token?.colorPrimaryText}>
              XLS, PDF, DOC, PNG and JPG
            </Typography>
          </OSDraggerStyle>
        </Form>
      ),
    },
  ];

  const OptionsItemsForTable = [
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
              {index === 0 && (
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
              NameofTheCurrentFiled === 'Text Content'
                ? QuickSetupItemsForTTextContent
                : NameofTheCurrentFiled === 'Checkbox' ||
                    NameofTheCurrentFiled === 'Radio Button' ||
                    NameofTheCurrentFiled === 'Toggle'
                  ? QuickSetupItemsForCheckBox
                  : NameofTheCurrentFiled === 'Attachment'
                    ? QuickSetupItemsForAttachement
                    : QuickSetupItems
            }
          />
        </CollapseSpaceStyle>
      </Row>

      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin
            items={
              NameofTheCurrentFiled === 'Text Content'
                ? OptionsItemsForTextContent
                : NameofTheCurrentFiled === 'Table' ||
                    NameofTheCurrentFiled === 'Attachment'
                  ? OptionsItemsForTable
                  : OptionsItems
            }
          />
        </CollapseSpaceStyle>
      </Row>
      {NameofTheCurrentFiled === 'Multi-Select' ||
      NameofTheCurrentFiled === 'Checkbox' ||
      NameofTheCurrentFiled === 'Radio Button' ||
      NameofTheCurrentFiled === 'Toggle' ||
      NameofTheCurrentFiled === 'Date' ||
      NameofTheCurrentFiled === 'Drop Down' ||
      NameofTheCurrentFiled === 'Time' ||
      NameofTheCurrentFiled === 'Currency' ||
      NameofTheCurrentFiled === 'Contact' ? (
        <Row>
          <CollapseSpaceStyle size={24} direction="vertical">
            <OsCollapseAdmin
              items={
                NameofTheCurrentFiled == 'Time'
                  ? validationOptionsforTime
                  : NameofTheCurrentFiled === 'Currency'
                    ? validationOptionsForCurrency
                    : NameofTheCurrentFiled === 'Date'
                      ? validationOptionsForDate
                      : NameofTheCurrentFiled === 'Contact'
                        ? validationOptionsForContact
                        : NameofTheCurrentFiled === 'Checkbox' ||
                            NameofTheCurrentFiled === 'Radio Button' ||
                            NameofTheCurrentFiled === 'Toggle'
                          ? editChoicesOptionsForCheckBox
                          : editChoicesOptions
              }
            />
          </CollapseSpaceStyle>
        </Row>
      ) : (
        <Row>
          {NameofTheCurrentFiled === 'Table' &&
            (CommonIndexOfUse?.ColumnsData?.[selectedColumnIndex || 0]?.type ===
              'multiple' ||
              CommonIndexOfUse?.ColumnsData?.[selectedColumnIndex || 0]
                ?.type === 'single') && (
              <CollapseSpaceStyle size={24} direction="vertical">
                <OsCollapseAdmin items={editChoicesOptionsFOrTable} />
              </CollapseSpaceStyle>
            )}
        </Row>
      )}
    </div>
  );
};

export default EditFiledDetails;
