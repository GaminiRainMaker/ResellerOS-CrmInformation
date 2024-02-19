/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Select} from '@/app/components/common/antd/Select';
import {Space} from '@/app/components/common/antd/Space';
import {Table} from '@/app/components/common/antd/Table';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {PlayCircleOutlined} from '@ant-design/icons';
import {DndContext, DragEndEvent, useDroppable} from '@dnd-kit/core';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import {DatePicker, Form, MenuProps, TimePicker} from 'antd';
import React, {useEffect, useState} from 'react';
import CommonSelect from '@/app/components/common/os-select';
import EditFiledDetails from './detailsFieldEdit';
import InputOptions from './inputOptions';

const FormBuilder = () => {
  const [sectionSelected, setSectionSelcted] = useState<any>();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const dropDownItemss: MenuProps['items'] = [];
  const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
  const [activeSetionIndex, setActiveSectionIndex] = useState<number>(0);
  const [form] = Form.useForm();
  const [selectedTypeFiled, setSelectedtypeFiled] = useState<string>();

  const [token] = useThemeToken();
  const [cartItems, setCartItems] = useState<any>([]);

  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title?.props?.text;
    const temp = [...cartItems];
    const cutomizedTables = [
      {
        filed: 'Filed Name',
        typeOfFiled: 'text',
      },
      {
        filed: 'Quote',
        typeOfFiled: 'number',
      },
    ];

    temp.push({
      section: `Section${cartItems?.length + 1}`,
      content:
        newItem === 'Table'
          ? [
              {
                name: newItem,
                label: 'Label',
                required: false,
                requuireLabel: true,
                noOfRows: 2,
                noOfColumn: 2,
                cutomizedTable: cutomizedTables,

                ColumnsData: [
                  {
                    title: (
                      <Typography name="Body 4/Medium" className="dragHandler">
                        Filed Name1
                      </Typography>
                    ),
                    dataIndex: 'Filed Name1',
                    key: 'Filed Name1',
                    width: 130,
                    render: (text: string) => (
                      <OsInput type="text" value={text} />
                    ),
                  },
                  {
                    title: (
                      <Typography name="Body 4/Medium" className="dragHandler">
                        Filed Name2
                      </Typography>
                    ),
                    dataIndex: 'Filed Name2',
                    key: 'Filed Name2',
                    width: 130,
                    render: (text: string) => (
                      <OsInput type="text" value={text} />
                    ),
                  },
                ],
                RowsData: [
                  {'Filed Name1': 'text', 'Filed Name2': 'text'},
                  {'Filed Name1': 'text', 'Filed Name2': 'text'},
                ],
              },
            ]
          : newItem === 'Multi-Select'
            ? [
                {
                  name: newItem,
                  label: 'Label',
                  type: 'multiple',
                  required: false,
                  requuireLabel: true,
                  hintext: false,
                  options: [],
                },
              ]
            : newItem == 'Time'
              ? [
                  {
                    name: newItem,
                    label: 'Label',
                    type: 'Time',
                    required: false,
                    requuireLabel: true,
                    hintext: false,
                    timeformat: 'HH:mm',
                    use12hours: true,
                  },
                ]
              : [
                  {
                    name: newItem,
                    label: 'Label',
                    type: 'text',
                    required: false,
                    requuireLabel: true,
                    hintext: false,
                  },
                ],
    });
    setCartItems(temp);
  };
  const {setNodeRef} = useDroppable({
    id: 'cart-droppable',
  });

  const deleteSelectedIntem = (sectionInde: number, contentIn: number) => {
    const temp: any = [...cartItems];
    temp?.[sectionInde || 0]?.content?.splice(contentIn, 1);
    setCartItems(temp);
  };
  const updateSection = (sectionInd: number, itemCont: string) => {
    const temp = [...cartItems];
    if (itemCont === 'Multi-Select') {
      temp?.[sectionInd]?.content?.push({
        name: itemCont,
        label: 'Label',
        type: 'multiple',
        required: false,
        requuireLabel: true,
        hintext: false,
        options: [],
      });
    } else if (itemCont === 'Time') {
      temp?.[sectionInd]?.content?.push({
        name: itemCont,
        label: 'Label',
        type: 'Time',
        required: false,
        requuireLabel: true,
        hintext: false,
        timeformat: 'HH:mm',
        use12hours: true,
      });
    } else {
      temp?.[sectionInd]?.content?.push({
        name: itemCont,
        label: 'Label',
        type: 'text',
        required: false,
        requuireLabel: true,
        hintext: false,
      });
    }

    setCartItems(temp);
  };

  // save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  // const handle drag sorting
  const handleSort = () => {
    // duplicate items
    const _fruitItems = [...cartItems?.[0]?.content];

    // remove and save the dragged item content
    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0];

    // switch the position
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array
    setCartItems(_fruitItems);
  };

  const openEditDrawer = () => {
    setIsOpenDrawer((p) => !p);
  };

  return (
    <>
      <Row style={{background: 'rrghed'}} justify="space-between">
        <DndContext onDragEnd={addItemsToCart}>
          <Col
            span={6}
            style={{
              padding: '36px 24px 36px 24px',
              gap: '12px',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            <InputOptions setSectionSelcted={setSectionSelcted} />
          </Col>
          <Col
            style={{
              padding: '36px 24px 36px 24px',
              gap: '12px',
              borderRadius: '10px',
            }}
            span={isOpenDrawer ? 10 : 18}
          >
            <Row justify="space-between">
              <Typography name="Heading 3/Medium">
                Cisco- Cisco Hardware
              </Typography>
              <Space size={10} style={{marginTop: '-10px'}}>
                <OsButton buttontype="PRIMARY" text="Save" />
                <OsButton
                  buttontype="PRIMARY_ICON"
                  text=""
                  icon={<PlayCircleOutlined />}
                />
                <Space>
                  <OsDropdown menu={{items: dropDownItemss}} />
                </Space>
              </Space>
            </Row>
            <Row>
              <div ref={setNodeRef} style={{width: '100%'}}>
                {cartItems && cartItems?.length > 0 ? (
                  <>
                    {' '}
                    {cartItems.map((item: any, Sectidx: number) => (
                      <div style={{marginTop: '20px'}} key={Sectidx}>
                        <Typography name="Body 1/Medium" color="#2364AA">
                          {item?.section}
                        </Typography>
                        <Row
                          style={{
                            padding: '16px',
                            border: '0.5px',
                            gap: '12px',
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            marginTop: '10px',
                          }}
                        >
                          {item?.content?.map(
                            (itemCon: any, ItemConindex: any) => {
                              if (itemCon?.name == 'Table') {
                                return (
                                  <Space
                                    direction="vertical"
                                    style={{
                                      width: '100%',
                                      // marginLeft:
                                      //   ItemConindex % 2 === 0 ? '25px' : '',
                                      // marginBottom: '20px',
                                    }}
                                    draggable
                                    // eslint-disable-next-line no-return-assign
                                    onDragStart={(e) =>
                                      (dragItem.current = ItemConindex)
                                    }
                                    // eslint-disable-next-line no-return-assign
                                    onDragEnter={(e) =>
                                      (dragOverItem.current = ItemConindex)
                                    }
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault()}
                                  >
                                    <Row justify="space-between">
                                      <Col
                                        onClick={() => {
                                          setSelectedtypeFiled('Table');
                                          openEditDrawer();
                                          setActiveContentIndex(ItemConindex);
                                          setActiveSectionIndex(Sectidx);
                                          form.resetFields();
                                        }}
                                        style={{
                                          width: '96px',
                                          height: '26px',
                                          borderRadius: '50px',
                                          padding: '4px 12px 4px 12px',
                                          gap: '12px',
                                          background: '#ECF2F5',
                                          display: 'flex',
                                          justifyContent: 'center',
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: '54px',
                                            height: '18px',
                                            fontWeight: '500',
                                            fontSize: '12px',
                                            lineHeight: '18px',
                                          }}
                                        >
                                          Table
                                        </div>
                                      </Col>
                                      <Col
                                        style={{
                                          width: '96px',
                                          height: '30px',
                                          borderRadius: '50px',
                                          padding: '4px 12px 4px 12px',
                                          gap: '12px',
                                          display: 'flex',
                                          justifyContent: 'center',
                                        }}
                                      >
                                        <TrashIcon color="#EB445A" />{' '}
                                        <ArrowsPointingOutIcon color="#2364AA" />
                                      </Col>
                                    </Row>

                                    <div
                                      style={{
                                        width: '100%',
                                        display: 'flex',
                                        gap: '12px',
                                      }}
                                    >
                                      <Table
                                        columns={itemCon?.ColumnsData}
                                        dataSource={itemCon?.RowsData}
                                        style={{
                                          marginTop: '10px',
                                          width: '100%',
                                        }}
                                      />
                                    </div>
                                  </Space>
                                );
                              }
                              if (
                                itemCon?.name == 'T text Content' ||
                                itemCon?.name == 'T Text' ||
                                itemCon?.name == 'Currency' ||
                                itemCon?.name == 'Email' ||
                                itemCon?.name == 'Toggle' ||
                                itemCon?.name == 'Radio Button' ||
                                itemCon?.name == 'Checkbox' ||
                                itemCon?.name == 'Line Break' ||
                                itemCon?.name == 'Attachment' ||
                                itemCon?.name == 'Contact' ||
                                itemCon?.name == 'Time' ||
                                itemCon?.name == 'Add Section'
                              ) {
                                return (
                                  <>
                                    {' '}
                                    <Space
                                      direction="vertical"
                                      style={{
                                        width:
                                          ItemConindex === 0 &&
                                          item?.content?.length === 0
                                            ? '100%'
                                            : '45%',
                                        marginLeft:
                                          ItemConindex % 2 === 0 ? '25px' : '',
                                        marginBottom: '20px',
                                      }}
                                      draggable
                                      // eslint-disable-next-line no-return-assign
                                      onDragStart={(e) =>
                                        (dragItem.current = ItemConindex)
                                      }
                                      // eslint-disable-next-line no-return-assign
                                      onDragEnter={(e) =>
                                        (dragOverItem.current = ItemConindex)
                                      }
                                      onDragEnd={handleSort}
                                      onDragOver={(e) => e.preventDefault()}
                                    >
                                      <Row justify="space-between">
                                        <Col
                                          onClick={() => {
                                            openEditDrawer();
                                            setActiveContentIndex(ItemConindex);
                                            setActiveSectionIndex(Sectidx);
                                            form.resetFields();
                                            setSelectedtypeFiled(itemCon?.name);
                                          }}
                                          style={{
                                            width: '96px',
                                            height: '26px',
                                            borderRadius: '50px',
                                            padding: '4px 12px 4px 12px',
                                            gap: '12px',
                                            background: '#ECF2F5',
                                            display: 'flex',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: '54px',
                                              height: '18px',
                                              fontWeight: '500',
                                              fontSize: '12px',
                                              lineHeight: '18px',
                                            }}
                                          >
                                            {itemCon?.name == 'Time'
                                              ? 'Time'
                                              : 'Text Filed'}
                                          </div>
                                        </Col>
                                        <Col
                                          style={{
                                            width: '96px',
                                            height: '30px',
                                            borderRadius: '50px',
                                            padding: '4px 12px 4px 12px',
                                            gap: '12px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <TrashIcon
                                            color="#EB445A"
                                            onClick={() => {
                                              deleteSelectedIntem(
                                                Sectidx,
                                                ItemConindex,
                                              );
                                            }}
                                          />{' '}
                                          <ArrowsPointingOutIcon color="#2364AA" />
                                        </Col>
                                      </Row>
                                      <Typography name="Body 4/Medium">
                                        {itemCon?.requuireLabel &&
                                          itemCon?.label}{' '}
                                        {itemCon?.required && (
                                          <span style={{color: 'red'}}>*</span>
                                        )}
                                      </Typography>
                                      <div
                                        style={{
                                          width: '100%',
                                          display: 'flex',
                                          gap: '12px',
                                        }}
                                      >
                                        {itemCon?.name == 'Time' ? (
                                          <TimePicker
                                            // format={{
                                            //   format: 'hh:mm A',
                                            //   use12Hours: true,
                                            // }}
                                            use12Hours={itemCon?.use12hours}
                                            format={itemCon?.timeformat}
                                            style={{
                                              width: '100%',
                                              height: '44px',
                                            }}
                                            // type={itemCon?.type}

                                            // style={{width: '270px'}}
                                            // onClick={showDrawer}
                                          />
                                        ) : (
                                          <OsInput
                                            type={itemCon?.type}

                                            // style={{width: '270px'}}
                                            // onClick={showDrawer}
                                          />
                                        )}{' '}
                                        {item?.content?.length - 1 ===
                                          ItemConindex && (
                                          <OsButton
                                            style={{marginLeft: '10px'}}
                                            buttontype="PRIMARY_ICON"
                                            icon="+"
                                            clickHandler={() => {
                                              updateSection(
                                                Sectidx,
                                                itemCon?.name,
                                              );
                                            }}
                                          />
                                        )}
                                      </div>
                                      {itemCon?.hintext && (
                                        <div>this is hint text</div>
                                      )}
                                    </Space>
                                  </>
                                );
                              }
                              if (
                                itemCon?.name == 'Multi-Select' ||
                                itemCon?.name == 'Drop Down'
                              ) {
                                return (
                                  <>
                                    {' '}
                                    <Space
                                      direction="vertical"
                                      style={{
                                        width:
                                          ItemConindex === 0 &&
                                          item?.content?.length === 0
                                            ? '100%'
                                            : '45%',
                                        marginLeft:
                                          ItemConindex % 2 === 0 ? '25px' : '',
                                        marginBottom: '20px',
                                      }}
                                      draggable
                                      // eslint-disable-next-line no-return-assign
                                      onDragStart={(e) =>
                                        (dragItem.current = ItemConindex)
                                      }
                                      // eslint-disable-next-line no-return-assign
                                      onDragEnter={(e) =>
                                        (dragOverItem.current = ItemConindex)
                                      }
                                      onDragEnd={handleSort}
                                      onDragOver={(e) => e.preventDefault()}
                                    >
                                      <Row justify="space-between">
                                        <Col
                                          onClick={() => {
                                            openEditDrawer();
                                            setActiveContentIndex(ItemConindex);
                                            setActiveSectionIndex(Sectidx);
                                            form.resetFields();
                                            setSelectedtypeFiled(itemCon?.name);
                                          }}
                                          style={{
                                            width: '96px',
                                            height: '26px',
                                            borderRadius: '50px',
                                            padding: '4px 12px 4px 12px',
                                            gap: '12px',
                                            background: '#ECF2F5',
                                            display: 'flex',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: '84px',
                                              height: '18px',
                                              fontWeight: '500',
                                              fontSize: '12px',
                                              lineHeight: '18px',
                                            }}
                                          >
                                            Multi-Select
                                          </div>
                                        </Col>
                                        <Col
                                          style={{
                                            width: '96px',
                                            height: '30px',
                                            borderRadius: '50px',
                                            padding: '4px 12px 4px 12px',
                                            gap: '12px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <TrashIcon
                                            color="#EB445A"
                                            onClick={() => {
                                              deleteSelectedIntem(
                                                Sectidx,
                                                ItemConindex,
                                              );
                                            }}
                                          />{' '}
                                          <ArrowsPointingOutIcon color="#2364AA" />
                                        </Col>
                                      </Row>
                                      <Typography name="Body 4/Medium">
                                        {itemCon?.requuireLabel &&
                                          itemCon?.label}{' '}
                                        {itemCon?.required && (
                                          <span style={{color: 'red'}}>*</span>
                                        )}
                                      </Typography>
                                      <div
                                        style={{
                                          width: '100%',
                                          display: 'flex',
                                          gap: '12px',
                                        }}
                                      >
                                        <CommonSelect
                                          options={itemCon?.options}
                                          style={{
                                            // marginTop: '10px',
                                            width: '100%',
                                          }}
                                          mode={itemCon?.type}
                                        />
                                        {item?.content?.length - 1 ===
                                          ItemConindex && (
                                          <OsButton
                                            style={{marginLeft: '10px'}}
                                            buttontype="PRIMARY_ICON"
                                            icon="+"
                                            clickHandler={() => {
                                              updateSection(
                                                Sectidx,
                                                itemCon?.name,
                                              );
                                            }}
                                          />
                                        )}
                                      </div>
                                      {itemCon?.hintext && (
                                        <div>this is hint text</div>
                                      )}
                                    </Space>
                                  </>
                                );
                              }
                              if (itemCon?.name == 'Date') {
                                return (
                                  <DatePicker
                                    style={{marginTop: '10px', width: '100%'}}
                                  />
                                );
                              }
                            },
                          )}
                        </Row>
                      </div>
                    ))}
                  </>
                ) : (
                  <Row
                    style={{
                      width: '100%',
                      height: '48px',
                      borderRadius: '12px',
                      padding: '12px',
                      backgroundColor: '#ECF6FB',
                      color: '#3DA5D9',
                      border: `1px dashed ${token?.colorLink}`,
                      marginTop: '10px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '16px',
                        height: '24px',
                      }}
                    >
                      + Drop Filed
                    </div>
                  </Row>
                )}
              </div>
            </Row>
          </Col>
          -
        </DndContext>
        <Col span={isOpenDrawer ? 6 : 0}>
          <EditFiledDetails
            setIsOpenDrawer={openEditDrawer}
            isOpenDrawer={isOpenDrawer}
            contentIndex={activeContentIndex}
            sectionIndex={activeSetionIndex}
            setCartItems={setCartItems}
            cartItems={cartItems}
            form={form}
            typeFiled=""
          />
        </Col>
      </Row>{' '}
    </>
  );
};

export default FormBuilder;
