/* eslint-disable react/no-array-index-key */

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import {Form} from 'antd';
import React, {useState} from 'react';
import {EditableFiledsCommonInterface} from '../formBuilder.interface';
import {CollapseSpaceStyle} from '../../dealRegDetail/styled-component';

const EditCheckBoxField: React.FC<EditableFiledsCommonInterface> = ({
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

  const addnewOptions = (nameOptions: any) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      nameOptions
    ]?.push('');
    setCartItems(tempvalue);
  };
  const deleteOption = (indexofoption: number, nameOptions: any) => {
    const tempvalue: any = [...cartItems];
    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      nameOptions
    ]?.splice(indexofoption, 1);
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

  const editChoicesOptionsForCheckBox = [
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
              onClick={() => addnewOptions('labelOptions')}
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
            </div>
          </Form>
        </>
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
              defaultValue={CommonIndexOfUse?.label}
              value={CommonIndexOfUse?.label}
              onChange={(e: any) => {
                changeFieldValues(e?.target?.value, 'label');
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

  return (
    <>
      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={QuickSetupItemsForCheckBox} />
        </CollapseSpaceStyle>
      </Row>

      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={OptionsItems} />
        </CollapseSpaceStyle>
      </Row>
      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={editChoicesOptionsForCheckBox} />
        </CollapseSpaceStyle>
      </Row>
    </>
  );
};

export default EditCheckBoxField;
