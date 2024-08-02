/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-lonely-if */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Form, Input} from 'antd';
import React, {useState} from 'react';
import {EditableFiledsCommonInterface} from '../formBuilder.interface';
import { CollapseSpaceStyle } from '../../dealRegDetail/styled-component';

const EditTableFields: React.FC<EditableFiledsCommonInterface> = ({
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

  const addNewRowsColumn = (labelTypeVal: string, type: string) => {
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

  const deleteOption = (indexofoption: number, nameOptions: any) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.ColumnsData?.[
      selectedColumnIndex || 0
    ]?.[nameOptions]?.splice(indexofoption, 1);
    setCartItems(tempvalue);
  };

  // save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

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
        <>
          {' '}
          <div style={{marginBottom: '10px', width: '100%'}}>
            <Typography
              name="Body 3/Bold"
              color={token?.colorInfo}
              onClick={() => addnewOptionsForTable('options')}
              cursor="pointer"
              style={{cursor: 'pointer'}}
            >
              + Add New
            </Typography>
          </div>{' '}
          <Form layout="vertical">
            <div>
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
            </div>
          </Form>
        </>
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
                        addNewRowsColumn('noOfRowsData', 'increase');
                      } else {
                        addNewRowsColumn('noOfRowsData', 'decrease');
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
                        addNewRowsColumn('ColumnsData', 'increase');
                      } else {
                        addNewRowsColumn('ColumnsData', 'decrease');
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
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.ColumnsData[selectedColumnIndex || 0]?.title
                  }
                  defaultValue={
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.ColumnsData[selectedColumnIndex || 0]?.title
                  }
                  onChange={(e: any) => {
                    onChangeColumnHeader(e?.target?.value, 'title');
                  }}
                />
              </Form.Item>
              <Form.Item
                label={<Typography name="Body 4/Medium">Field Type</Typography>}
                name="filedType"
              >
                <CommonSelect
                  onChange={(e: any) => {
                    onChangeColumnHeader(e, 'type');
                  }}
                  defaultValue={
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.ColumnsData[selectedColumnIndex || 0]?.type
                  }
                  value={
                    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
                      ?.ColumnsData[selectedColumnIndex || 0]?.type
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
    <>
      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={QuickSetupItems} />
        </CollapseSpaceStyle>
      </Row>

      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={OptionsItemsForTable} />
        </CollapseSpaceStyle>
      </Row>
      <Row>
        {NameofTheCurrentFiled === 'Table' &&
          (CommonIndexOfUse?.ColumnsData?.[selectedColumnIndex || 0]?.type ===
            'multiple' ||
            CommonIndexOfUse?.ColumnsData?.[selectedColumnIndex || 0]?.type ===
              'single') && (
            <CollapseSpaceStyle size={24} direction="vertical">
              <OsCollapseAdmin items={editChoicesOptionsFOrTable} />
            </CollapseSpaceStyle>
          )}
      </Row>
    </>
  );
};

export default EditTableFields;
