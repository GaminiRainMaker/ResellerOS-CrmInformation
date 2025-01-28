/* eslint-disable react/no-array-index-key */

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Switch} from '@/app/components/common/antd/Switch';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {Checkbox, Collapse, Form, notification, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {EditableFiledsCommonInterface} from '../formBuilder.interface';
import {CollapseSpaceStyle} from '../../dealRegDetail/styled-component';
import OsModal from '@/app/components/common/os-modal';
import {Panel} from '@/app/components/common/antd/Collapse';
import {OsCollapseStyleForAdmin} from '@/app/components/common/os-collapse/styled-components';
import AddMappedOptionsForFormBuilder from '../addMappedOptions';
import OsButton from '@/app/components/common/os-button';

const EditCheckBoxField: React.FC<EditableFiledsCommonInterface> = ({
  sectionIndex,
  cartItems,
  contentIndex,
  setCartItems,
  form,
  selectedColumnIndex,
}) => {
  const [token] = useThemeToken();

  const [openModalForDependentFiled, setOpenModalForDependentFiled] =
    useState<boolean>(false);
  const [activeIndexForDependent, setActiveIndexForDendent] =
    useState<number>(0);
  const [openMappedModal, setOpenMappedModal] = useState<boolean>(false);

  const [CommonIndexOfUse, setCommonIndexOfUse] = useState<any>();

  const [
    activeIndexForDependentInnerChild,
    setActiveIndexForDendentInnerChild,
  ] = useState<number>(0);
  useEffect(() => {
    const CommonIndexOfUsedd =
      cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0];
    setCommonIndexOfUse(CommonIndexOfUsedd);
  }, [cartItems, JSON?.stringify(cartItems)]);
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

  const changeFieldValuesForDependent = (
    newValue: any,
    labelTypeVal: string,
  ) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                ['dependentFiledArr']: contItem?.['dependentFiledArr']?.map(
                  (itemsInner: any, indexInner: number) => {
                    if (indexInner === activeIndexForDependent) {
                      return itemsInner?.map(
                        (innerChild: any, innerChildIdx: number) => {
                          if (
                            innerChildIdx === activeIndexForDependentInnerChild
                          ) {
                            return {
                              ...innerChild,
                              [labelTypeVal]: newValue,
                            };
                          }
                          return innerChild;
                        },
                      );
                    }
                    return itemsInner;
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

  const deleteTheInnerChildFiled = (indexInn: number, type: string) => {
    let tempvalue: any = [...cartItems];
    if (type === 'main') {
      const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
        if (sectioIndex === sectionIndex) {
          return {
            ...sectItem,
            content: sectItem.content.map((contItem: any, contInde: number) => {
              if (contInde === contentIndex) {
                return {
                  ...contItem,
                  ['dependentFiledArr']: contItem?.['dependentFiledArr']?.map(
                    (itemsInner: any, indexInner: number) => {
                      if (indexInner === activeIndexForDependent) {
                        return [];
                      }
                      return itemsInner;
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
    } else {
      tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
        'dependentFiledArr'
      ]?.[activeIndexForDependent || 0]?.splice(indexInn, 1);

      setActiveIndexForDendentInnerChild(0);
      setCartItems(tempvalue);
    }
  };

  const deleteOptionForDependent = (
    indexofoption: number,
    nameOptions: any,
  ) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      nameOptions
    ]?.[activeIndexForDependent || 0]?.[
      activeIndexForDependentInnerChild || 0
    ]?.['options']?.splice(indexofoption, 1);
    setCartItems(tempvalue);
  };
  const removeTheDependentArr = () => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                ['dependentFiledArr']: [],
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
  const changeFiellOptionsValueForDependent = (
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
                    if (activeIndexForDependent === indexOption) {
                      return itemOp?.map(
                        (itemChilDEp: any, itemChildInd: number) => {
                          if (
                            itemChildInd === activeIndexForDependentInnerChild
                          ) {
                            return {
                              ...itemChilDEp,
                              ['options']: itemChilDEp?.['options']?.map(
                                (
                                  itemOpTionsVal: any,
                                  indexOptionVal: number,
                                ) => {
                                  if (indexofOption === indexOptionVal) {
                                    return newValue;
                                  }
                                  return itemOpTionsVal;
                                },
                              ),
                            };
                          }
                          return itemChilDEp;
                        },
                      );
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
  const handleSortForDependent = (changeOptions: any) => {
    const optionItems: any = [...cartItems];

    // remove and save the dragged item content
    const draggedItemContent1 = optionItems?.[sectionIndex || 0]?.content?.[
      contentIndex || 0
    ]?.[changeOptions]?.[activeIndexForDependent || 0]?.[
      activeIndexForDependentInnerChild || 0
    ]?.['options'].splice(dragItem.current, 1)[0];

    // switch the position
    optionItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      changeOptions
    ]?.[activeIndexForDependent || 0]?.[
      activeIndexForDependentInnerChild || 0
    ]?.['options'].splice(dragOverItem.current, 0, draggedItemContent1);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array;
    setCartItems(optionItems);
  };
  const addnewOptionsForDependent = (nameOptions: any) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      nameOptions
    ]?.[activeIndexForDependent || 0]?.[
      activeIndexForDependentInnerChild || 0
    ]?.['options']?.push('');

    setCartItems(tempvalue);
  };
  const addnewOptions = (nameOptions: any) => {
    const tempvalue: any = [...cartItems];

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      nameOptions
    ]?.push('');

    tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
      'dependentFiledArr'
    ]?.[activeIndexForDependent || 0]?.['options']?.pop();
    changeFieldValues(false, 'dependentFiled');

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
  console.log('345435343242', CommonIndexOfUse?.customFieldName);
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
          <Typography name="Body 4/Medium">Change Name</Typography>
          <OsInput
            style={{width: '100%', marginBottom: '20px'}}
            placeholder="name"
            defaultValue={CommonIndexOfUse?.customFieldName}
            value={CommonIndexOfUse?.customFieldName}
            onChange={(e: any) => {
              changeFieldValues(e?.target?.value, 'customFieldName');
            }}
          />{' '}
          <Typography name="Body 4/Medium">Locater</Typography>
          <OsInput
            style={{width: '100%', marginBottom: '20px'}}
            placeholder="locater value"
            defaultValue={CommonIndexOfUse?.locater}
            value={CommonIndexOfUse?.locater}
            onChange={(e: any) => {
              changeFieldValues(e?.target?.value, 'locater');
            }}
          />
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
                style={{width: '100%'}}
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

  const addnewOptionTochildDependent = (
    value: string,
    idForOptions: string,
  ) => {
    let allOptionsForChild =
      cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
        ?.dependentFiledArr?.[activeIndexForDependent || 0];
    let newArrayForAdding: any =
      allOptionsForChild?.length > 0 ? [...allOptionsForChild] : [];
    newArrayForAdding?.push({
      name: 'Multi-Select',
      label: 'Label',
      type: value,
      user_fill: false,
      required: false,
      requiredLabel: true,
      hintext: false,
      hintTextValue: '',
      options: [],
      id: idForOptions,
    });

    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                ['dependentFiledArr']: contItem?.dependentFiledArr?.map(
                  (itemsDep: any, indexDep: number) => {
                    if (indexDep === activeIndexForDependent) {
                      return newArrayForAdding;
                    }
                    return itemsDep;
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

  const openModalFordependentFileds = (checked: boolean) => {
    let options =
      cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]
        ?.labelOptions;
    if (checked) {
      if (options?.length === 0) {
        notification?.open({
          message: 'Please add options before adding dependent filed',
          type: 'error',
        });
        return;
      }
      let isExistEmptyOptions = options?.findIndex((items: any) => items == '');
      if (isExistEmptyOptions !== -1) {
        notification?.open({
          message: 'Option cannot be empty. please add name for the option',
          type: 'error',
        });
        return;
      } else {
        let newArrayForAdding: any = [];
        cartItems?.[sectionIndex || 0]?.content?.[
          contentIndex || 0
        ]?.labelOptions?.map((items: any) => {
          let newObj: any = {
            name: 'Multi-Select',
            label: 'Label',
            type: 'multiple',
            user_fill: false,
            required: false,
            requiredLabel: true,
            hintext: false,
            hintTextValue: '',
            options: [],
            customFieldName: '',
            locater: '',
            userFillTextValue: '',
          };
          newObj.id = items;
          newArrayForAdding?.push([newObj]);
        });

        const newTempArr = cartItems.map(
          (sectItem: any, sectioIndex: number) => {
            if (sectioIndex === sectionIndex) {
              return {
                ...sectItem,
                content: sectItem.content.map(
                  (contItem: any, contInde: number) => {
                    if (contInde === contentIndex) {
                      return {
                        ...contItem,
                        ['dependentFiledArr']: newArrayForAdding,
                        ['dependentFiled']: true,
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
        setTimeout(() => {
          setOpenModalForDependentFiled(true);
        }, 100);
      }
    } else {
      changeFieldValues(checked, 'dependentFiled');
    }
  };

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

      <Row
        style={{
          background: '#E9F0F7',
          padding: '15px',
          width: '90%',
          margin: '10px',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
          // border: '1px solid #2364AA',
        }}
      >
        <Typography
          name="Body 3/Medium"
          onClick={() => {
            setOpenMappedModal(true);
          }}
          cursor="pointer"
        >
          Add Mapped Options
        </Typography>
      </Row>
      <Row>
        <CollapseSpaceStyle size={24} direction="vertical">
          <OsCollapseAdmin items={editChoicesOptionsForCheckBox} />
        </CollapseSpaceStyle>
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '15px',
          marginRight: '15px',
        }}
      >
        {NameofTheCurrentFiled !== 'Toggle' && (
          <div
            style={{
              display: 'flex',
            }}
          >
            {' '}
            <div style={{marginRight: '4px'}}>
              {' '}
              <Checkbox
                checked={CommonIndexOfUse?.dependentFiled}
                onChange={(e: any) => {
                  if (e?.target?.checked) {
                    openModalFordependentFileds(e?.target?.checked);
                  } else {
                    removeTheDependentArr();
                    changeFieldValues(false, 'dependentFiled');
                  }
                }}
              />
            </div>
            <Typography name="Body 3/Regular" color={'#0D0D0D'}>
              Create Dependent Field
            </Typography>{' '}
          </div>
        )}
        {CommonIndexOfUse?.dependentFiled && (
          <Typography
            name="Body 3/Bold"
            color={'#3DA5D9'}
            onClick={() => {
              setOpenModalForDependentFiled(true);
            }}
          >
            View/Edit
          </Typography>
        )}{' '}
      </Row>
      <OsModal
        title="Create Nested Component"
        bodyPadding={22}
        body={
          <>
            <Space size={20} direction="vertical" style={{width: '100%'}}>
              {' '}
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {' '}
                <Typography name="Body 1/Regular">
                  Select The Following:
                </Typography>
                <OsButton
                  text="Save & Close"
                  buttontype="PRIMARY"
                  clickHandler={() => {
                    setOpenModalForDependentFiled(false);
                  }}
                />
              </div>
              <Row gutter={[20, 20]}>
                {cartItems?.[sectionIndex || 0]?.content?.[
                  contentIndex || 0
                ]?.dependentFiledArr?.map((items: any, index: number) => {
                  if (items?.length === 0) {
                    return;
                  }
                  return (
                    <Col
                      style={{
                        background: ' #F5F5F5',
                        // padding: '0px  18px 18px 18px',
                        gap: '24px',
                        margin: '10px',
                        width: '100%',
                        borderStyle: 'dotted',
                        border:
                          activeIndexForDependent === index
                            ? '1px solid #3DA5D9'
                            : '',
                        padding: '20px',
                      }}
                      span={11}
                      onClick={() => {
                        setActiveIndexForDendent(index);
                      }}
                    >
                      <div
                        style={{
                          paddingTop: '18px',
                          paddingBottom: '18px',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {' '}
                        <Typography name="Body 3/Regular">
                          {items?.[0]?.id}
                        </Typography>
                        <TrashIcon
                          color="#EB445A"
                          width={25}
                          onClick={() =>
                            deleteTheInnerChildFiled(index, 'main')
                          }
                          style={{marginRight: '10px'}}
                        />
                      </div>
                      {items &&
                        items?.length > 0 &&
                        items?.map((itemInner: any, indexInn: number) => {
                          return (
                            <Col
                              onClick={() => {
                                setActiveIndexForDendent(index);

                                setActiveIndexForDendentInnerChild(indexInn);
                              }}
                              // span={11}
                              style={{
                                borderStyle: 'solid',
                                border:
                                  activeIndexForDependent === index &&
                                  activeIndexForDependentInnerChild === indexInn
                                    ? '2px solid #3DA5D9'
                                    : '1px solid grey',
                                padding: '10px',
                                marginTop: '5px',
                              }}
                            >
                              <div
                                style={{
                                  marginTop: '0px',
                                  display: 'flex',
                                  justifyContent: 'end',
                                  marginBottom: '5px',
                                }}
                              >
                                {' '}
                                <TrashIcon
                                  color="#EB445A"
                                  width={25}
                                  onClick={() =>
                                    deleteTheInnerChildFiled(indexInn, 'child')
                                  }
                                />
                              </div>{' '}
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <OsInput
                                  style={{width: '70%'}}
                                  disabled={
                                    activeIndexForDependent === index &&
                                    activeIndexForDependentInnerChild ===
                                      indexInn
                                      ? false
                                      : true
                                  }
                                  value={itemInner?.label}
                                  onChange={(e) => {
                                    changeFieldValuesForDependent(
                                      e?.target?.value,
                                      'label',
                                    );
                                  }}
                                />{' '}
                                {items?.length - 1 === indexInn && (
                                  <div style={{marginTop: '0px'}}>
                                    {' '}
                                    <OsButton
                                      text="+"
                                      buttontype="PRIMARY"
                                      clickHandler={() => {
                                        if (itemInner?.type === 'text') {
                                          addnewOptionTochildDependent(
                                            'text',
                                            items?.[0]?.id,
                                          );
                                        } else {
                                          addnewOptionTochildDependent(
                                            'tag',
                                            items?.[0]?.id,
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                              <div
                                style={{
                                  marginTop: '10px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Typography name="Body 3/Regular">
                                  Required{' '}
                                  <Switch
                                    disabled={
                                      activeIndexForDependent === index &&
                                      activeIndexForDependentInnerChild ===
                                        indexInn
                                        ? false
                                        : true
                                    }
                                    value={itemInner?.required}
                                    onChange={(e) => {
                                      changeFieldValuesForDependent(
                                        e,
                                        'required',
                                      );
                                    }}
                                  />
                                </Typography>{' '}
                                <Typography name="Body 3/Regular">
                                  User Fill{' '}
                                  <Switch
                                    disabled={
                                      activeIndexForDependent === index &&
                                      activeIndexForDependentInnerChild ===
                                        indexInn
                                        ? false
                                        : true
                                    }
                                    value={itemInner?.user_fill}
                                    onChange={(e) => {
                                      changeFieldValuesForDependent(
                                        e,
                                        'user_fill',
                                      );
                                    }}
                                  />
                                </Typography>
                              </div>
                              {itemInner?.user_fill && (
                                <>
                                  {' '}
                                  <Typography name="Body 4/Medium">
                                    User Fill Text
                                  </Typography>
                                  <OsInput
                                    style={{width: '100%'}}
                                    placeholder="Label"
                                    type="text"
                                    defaultValue={itemInner?.userFillTextValue}
                                    value={itemInner?.userFillTextValue}
                                    onChange={(e: any) => {
                                      changeFieldValuesForDependent(
                                        e?.target?.value,
                                        'userFillTextValue',
                                      );
                                    }}
                                  />
                                </>
                              )}
                              <Row>
                                <Col sm={24}>
                                  {' '}
                                  <Typography name="Body 4/Medium">
                                    Change Name
                                  </Typography>
                                  <OsInput
                                    disabled={
                                      activeIndexForDependent === index &&
                                      activeIndexForDependentInnerChild ===
                                        indexInn
                                        ? false
                                        : true
                                    }
                                    style={{
                                      width: '100%',
                                      marginBottom: '20px',
                                    }}
                                    placeholder="name"
                                    defaultValue={itemInner?.customFieldName}
                                    value={itemInner?.customFieldName}
                                    onChange={(e: any) => {
                                      changeFieldValuesForDependent(
                                        e?.target?.value,
                                        'customFieldName',
                                      );
                                    }}
                                  />
                                </Col>{' '}
                                <Col sm={24}>
                                  {' '}
                                  <Typography name="Body 4/Medium">
                                    Locater
                                  </Typography>
                                  <OsInput
                                    style={{
                                      width: '100%',
                                      marginBottom: '20px',
                                    }}
                                    disabled={
                                      activeIndexForDependent === index &&
                                      activeIndexForDependentInnerChild ===
                                        indexInn
                                        ? false
                                        : true
                                    }
                                    placeholder="locater value"
                                    defaultValue={itemInner?.locater}
                                    value={itemInner?.locater}
                                    onChange={(e: any) => {
                                      changeFieldValuesForDependent(
                                        e?.target?.value,
                                        'locater',
                                      );
                                    }}
                                  />
                                </Col>{' '}
                              </Row>
                              <div
                                style={{
                                  marginTop: '10px',
                                }}
                              >
                                {' '}
                                <Typography name="Body 4/Medium">
                                  Field Type
                                </Typography>
                                <CommonSelect
                                  disabled={
                                    activeIndexForDependent === index &&
                                    activeIndexForDependentInnerChild ===
                                      indexInn
                                      ? false
                                      : true
                                  }
                                  onChange={(e: any) => {
                                    changeFieldValuesForDependent(e, 'type');
                                  }}
                                  defaultValue={
                                    cartItems?.[sectionIndex || 0]?.content?.[
                                      contentIndex || 0
                                    ]?.type
                                  }
                                  value={itemInner?.type}
                                  style={{width: '100%'}}
                                  options={[
                                    {label: 'Mutiple', value: 'multiple'},
                                    {label: 'Single', value: 'tag'},
                                    {label: 'Input', value: 'text'},
                                  ]}
                                />
                              </div>
                              {itemInner?.type !== 'text' && (
                                <Row
                                  style={{
                                    background: '#E9F0F7',
                                    padding: '15px',
                                    width: '90%',
                                    margin: '10px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: 'pointer',

                                    // border: '1px solid #2364AA',
                                  }}
                                >
                                  <Typography
                                    name="Body 3/Medium"
                                    onClick={() => {
                                      setOpenMappedModal(true);
                                    }}
                                    cursor="pointer"
                                  >
                                    Add Mapped Options
                                  </Typography>
                                </Row>
                              )}
                              {itemInner?.type !== 'text' && (
                                <Row
                                  style={{
                                    marginTop: '10px',
                                    width: '100%',
                                  }}
                                >
                                  <OsCollapseStyleForAdmin
                                    key={index}
                                    defaultActiveKey={['1']}
                                    style={{
                                      width: '100%',
                                      padding: '10px',
                                      height:
                                        cartItems?.[sectionIndex || 0]
                                          ?.content?.[contentIndex || 0]
                                          ?.dependentFiledArr?.[index || 0]?.[
                                          indexInn || 0
                                        ]?.options?.length > 2
                                          ? '300px'
                                          : '100px',
                                      overflow: 'auto',
                                    }}
                                    bordered={false}
                                    // expandIcon={true}
                                  >
                                    <Panel
                                      header={
                                        <Typography
                                          name="Body 2/Medium"
                                          color={token?.colorInfo}
                                        >
                                          Edit Choices
                                        </Typography>
                                      }
                                      key="1"
                                      showArrow={false}
                                    >
                                      {' '}
                                      <>
                                        {' '}
                                        <div
                                          style={{
                                            marginBottom: '10px',
                                            width: '100%',
                                          }}
                                        >
                                          <Typography
                                            name="Body 3/Bold"
                                            color={token?.colorLink}
                                            onClick={() =>
                                              addnewOptionsForDependent(
                                                'dependentFiledArr',
                                              )
                                            }
                                            cursor="pointer"
                                            style={{cursor: 'pointer'}}
                                          >
                                            + Add New
                                          </Typography>
                                        </div>{' '}
                                        <Form layout="vertical">
                                          <div>
                                            {cartItems?.[
                                              sectionIndex || 0
                                            ]?.content?.[
                                              contentIndex || 0
                                            ]?.dependentFiledArr?.[
                                              index || 0
                                            ]?.[indexInn || 0]?.options?.map(
                                              (
                                                itemOption: any,
                                                indexOp: number,
                                              ) => (
                                                <Row
                                                  style={{
                                                    width: '100%',
                                                  }}
                                                >
                                                  <Col
                                                    key={indexOp}
                                                    className="list-item"
                                                    draggable
                                                    onDragStart={(e) => {
                                                      dragItem.current =
                                                        indexOp;
                                                    }}
                                                    onDragEnter={(e) => {
                                                      dragOverItem.current =
                                                        indexOp;
                                                    }}
                                                    onDragEnd={() =>
                                                      handleSortForDependent(
                                                        'dependentFiledArr',
                                                      )
                                                    }
                                                    onDragOver={(e) =>
                                                      e.preventDefault()
                                                    }
                                                    style={{
                                                      display: 'flex',
                                                      justifyContent:
                                                        'space-between',
                                                      width: '100%',
                                                      marginBottom: '25px',
                                                      gap: '12px',
                                                    }}
                                                  >
                                                    {/* <div>{itemOption}</div> */}
                                                    <OsInput
                                                      key={indexOp}
                                                      // defaultValue={itemOption}
                                                      value={itemOption}
                                                      onChange={(e: any) => {
                                                        changeFiellOptionsValueForDependent(
                                                          e?.target?.value,
                                                          indexOp,
                                                          'dependentFiledArr',
                                                        );
                                                      }}
                                                    />{' '}
                                                    <TrashIcon
                                                      color="#EB445A"
                                                      width={35}
                                                      onClick={() =>
                                                        deleteOptionForDependent(
                                                          indexOp,
                                                          'dependentFiledArr',
                                                        )
                                                      }
                                                    />{' '}
                                                    <ArrowsPointingOutIcon
                                                      color="#2364AA"
                                                      width={35}
                                                      key={indexOp}
                                                      className="list-item"
                                                      // draggable
                                                      onDragStart={(e) => {
                                                        dragItem.current =
                                                          indexOp;
                                                      }}
                                                      onDragEnter={(e) => {
                                                        dragOverItem.current =
                                                          indexOp;
                                                      }}
                                                      onDragEnd={() =>
                                                        handleSortForDependent(
                                                          'dependentFiledArr',
                                                        )
                                                      }
                                                      onDragOver={(e) =>
                                                        e.preventDefault()
                                                      }
                                                    />
                                                  </Col>
                                                </Row>
                                              ),
                                            )}
                                          </div>
                                        </Form>
                                      </>
                                    </Panel>
                                  </OsCollapseStyleForAdmin>
                                </Row>
                              )}
                            </Col>
                          );
                        })}
                    </Col>
                  );
                })}
              </Row>
            </Space>
          </>
        }
        width={1100}
        open={openModalForDependentFiled}
        // open={true}
        onCancel={() => {
          setOpenModalForDependentFiled(false);
        }}
      />

      <OsModal
        title="Add Mapped Otions "
        bodyPadding={22}
        body={
          <AddMappedOptionsForFormBuilder
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            selectedColumnIndex={selectedColumnIndex}
            setOpenMappedModal={setOpenMappedModal}
            typeOfFILE={'Checkbox'}
            activeIndexForDependentInnerChild={
              activeIndexForDependentInnerChild
            }
          />
        }
        width={500}
        open={openMappedModal}
        // open={true}
        onCancel={() => {
          setOpenMappedModal(false);
        }}
      />
    </>
  );
};

export default EditCheckBoxField;
