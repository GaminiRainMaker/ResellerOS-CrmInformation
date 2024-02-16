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
import Typography from '@/app/components/common/typography';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import {PlayCircleOutlined} from '@ant-design/icons';
import OsDropdown from '@/app/components/common/os-dropdown';
import {DatePicker, MenuProps} from 'antd';
import React, {useState} from 'react';
import {DndContext, DragEndEvent, useDroppable} from '@dnd-kit/core';
import OsInput from '@/app/components/common/os-input';
import {Select} from '@/app/components/common/antd/Select';
import {Table} from '@/app/components/common/antd/Table';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsDrawer from '@/app/components/common/os-drawer';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import InputOptions from './inputOptions';
import EditFiledDetails from './detailsFieldEdit';
import ListSort from './listSort';

const FormBuilder = () => {
  const [sectionSelected, setSectionSelcted] = useState<any>();
  const dropDownItemss: MenuProps['items'] = [];

  const [token] = useThemeToken();
  const [cartItems, setCartItems] = useState<any>([]);

  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title?.props?.text;
    const temp = [...cartItems];
    temp.push({section: `Section${cartItems?.length + 1}`, content: [newItem]});
    setCartItems(temp);
  };
  const {setNodeRef} = useDroppable({
    id: 'cart-droppable',
  });

  const updateSection = (sectionInd: number, itemCont: string) => {
    const temp = [...cartItems];
    temp?.[sectionInd]?.content?.push(itemCont);
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

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Row>
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
            span={10}
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
                              if (itemCon == 'Table') {
                                return (
                                  <Table
                                    style={{marginTop: '10px', width: '100%'}}
                                  />
                                );
                              }
                              if (
                                itemCon == 'T text Content' ||
                                itemCon == 'T Text' ||
                                itemCon == 'Currency' ||
                                itemCon == 'Email' ||
                                itemCon == 'Toggle' ||
                                itemCon == 'Radio Button' ||
                                itemCon == 'Checkbox' ||
                                itemCon == 'Line Break' ||
                                itemCon == 'Attachment' ||
                                itemCon == 'Contact' ||
                                itemCon == 'Time' ||
                                itemCon == 'Add Section'
                              ) {
                                return (
                                  <>
                                    {' '}
                                    <Space
                                      direction="vertical"
                                      style={{
                                        width:
                                          ItemConindex === 0 ? '100%' : '45%',
                                        marginLeft:
                                          ItemConindex % 2 === 0 &&
                                          ItemConindex !== 0
                                            ? '25px'
                                            : '',
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
                                            Text Filed
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
                                      <Typography name="Body 4/Medium">
                                        Label
                                      </Typography>
                                      <div
                                        style={{
                                          width: '100%',
                                          display: 'flex',
                                          gap: '12px',
                                        }}
                                      >
                                        <OsInput
                                          // style={{width: '270px'}}
                                          onClick={showDrawer}
                                        />{' '}
                                        {item?.content?.length - 1 ===
                                          ItemConindex && (
                                          <OsButton
                                            style={{marginLeft: '10px'}}
                                            buttontype="PRIMARY_ICON"
                                            icon="+"
                                            clickHandler={() => {
                                              updateSection(Sectidx, itemCon);
                                            }}
                                          />
                                        )}
                                      </div>
                                    </Space>
                                  </>
                                );
                              }
                              if (
                                itemCon == 'Multi-Select' ||
                                itemCon == 'Drop Down'
                              ) {
                                return (
                                  <Select
                                    style={{marginTop: '10px', width: '100%'}}
                                  />
                                );
                              }
                              if (itemCon == 'Date') {
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
        <Col span={6}>
          {/* <OsDrawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            open={open}
            getContainer={false}
          >
            <EditFiledDetails
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </OsDrawer> */}
          <EditFiledDetails cartItems={cartItems} setCartItems={setCartItems} />
        </Col>
      </Row>{' '}
    </>
  );
};

export default FormBuilder;
