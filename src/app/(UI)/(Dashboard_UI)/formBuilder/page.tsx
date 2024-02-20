/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import {MailOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {DndContext, DragEndEvent, useDroppable} from '@dnd-kit/core';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import {
  Checkbox,
  DatePicker,
  Divider,
  Form,
  MenuProps,
  Radio,
  Switch,
  TimePicker,
  Layout,
} from 'antd';
import React, {useEffect, useState} from 'react';
import CommonSelect from '@/app/components/common/os-select';
import EditFiledDetails from './detailsFieldEdit';

import FieldCard from './FieldCard';

const {Sider, Content} = Layout;

const FormBuilder = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const dropDownItemss: MenuProps['items'] = [];
  const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
  const [activeSetionIndex, setActiveSectionIndex] = useState<number>(0);
  const [form] = Form.useForm();
  const [sectionIndexActive, setSectionIndexActive] = useState<number>(0);

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
    if (newItem === 'Add Section') {
      temp?.push({
        section: `Section${cartItems?.length + 1}`,
        content: [],
      });
      setSectionIndexActive(cartItems?.length);
    } else {
      temp?.[sectionIndexActive]?.content?.push(
        newItem === 'Table'
          ? {
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
            }
          : newItem === 'Multi-Select' || newItem === 'Drop Down'
            ? {
                name: newItem,
                label: 'Label',
                type: 'multiple',
                required: false,
                requuireLabel: true,
                hintext: false,
                options: [],
              }
            : newItem === 'Line Break'
              ? {
                  name: newItem,
                }
              : newItem == 'Time'
                ? {
                    name: newItem,
                    label: 'Label',
                    type: 'Time',
                    required: false,
                    requuireLabel: true,
                    hintext: false,
                    timeformat: 'HH:mm',
                    use12hours: true,
                  }
                : newItem == 'Date'
                  ? {
                      name: newItem,
                      label: 'Label',
                      type: 'Date',
                      required: false,
                      requuireLabel: true,
                      hintext: false,
                      dateformat: 'mm/dd/yyyy',
                      weekStartOn: 'sunday',
                      StartDate: '',
                      enddate: '',
                    }
                  : newItem == 'Contact'
                    ? {
                        name: newItem,
                        label: 'Label',
                        type: 'number',
                        required: false,
                        requuireLabel: true,
                        hintext: false,
                        defaultcountry: 'india',
                        dataformat: '3-3-3',
                      }
                    : newItem == 'Currency'
                      ? {
                          name: newItem,
                          label: 'Label',
                          type: 'text',
                          required: false,
                          requuireLabel: true,
                          hintext: false,
                          currency: 'USB',
                          deciamlHide: false,
                        }
                      : newItem == 'Checkbox' ||
                          newItem == 'Radio Button' ||
                          newItem == 'Toggle'
                        ? {
                            name: newItem,
                            label: 'Label',
                            type: 'text',
                            required: false,
                            requuireLabel: true,
                            hintext: false,
                          }
                        : newItem == 'T text Content'
                          ? {
                              name: newItem,
                              sectionTitle: 'Section Title',
                              Alignemnt: 'left',
                              FontSize: 'Heading 2',
                            }
                          : {
                              name: newItem,
                              label: 'Label',
                              type: 'text',
                              required: false,
                              requuireLabel: true,
                              hintext: false,
                            },
      );
    }
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
    if (itemCont === 'Multi-Select' || itemCont === 'Drop Down') {
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
    } else if (itemCont == 'Currency') {
      temp?.[sectionInd]?.content?.push({
        name: itemCont,
        label: 'Label',
        type: 'text',
        required: false,
        requuireLabel: true,
        hintext: false,
        currency: 'USB',
        deciamlHide: false,
      });
    } else if (itemCont === 'Date') {
      temp?.[sectionInd]?.content?.push({
        name: itemCont,
        label: 'Label',
        type: 'Date',
        required: false,
        requuireLabel: true,
        hintext: false,
        dateformat: 'mm/dd/yyyy',
        weekStartOn: 'sunday',
        StartDate: '',
        enddate: '',
      });
    } else if (itemCont === 'Contact') {
      temp?.[sectionInd]?.content?.push({
        name: itemCont,
        label: 'Label',
        type: 'number',
        required: false,
        requuireLabel: true,
        hintext: false,
        defaultcountry: 'india',
        dataformat: '3-3-3',
      });
    } else if (itemCont == 'T text Content') {
      temp?.[sectionInd]?.content?.push({
        name: itemCont,
        sectionTitle: 'Section Title',
        Alignemnt: 'left',
        FontSize: 'h2',
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
  const handleSort = (sectionIndex: any) => {
    const optionItems: any = [...cartItems];

    // remove and save the dragged item content
    const draggedItemContent1 = optionItems?.[
      sectionIndex || 0
    ]?.content.splice(dragItem.current, 1)[0];

    // switch the position
    optionItems?.[sectionIndex || 0]?.content.splice(
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

  const openEditDrawer = () => {
    setIsOpenDrawer((p) => !p);
  };

  const contentStyle: React.CSSProperties = {
    margin: '24px 24px 24px 0px',
    backgroundColor: 'transparent',
  };

  const layoutStyle = {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  };

  const siderStyle: React.CSSProperties = {
    padding: '12px',
    margin: '24px',
    borderRadius: 12,
  };

  //   <p
  //   onClick={() => {
  //     setCollapsed((p) => !p);
  //   }}
  // >
  //   Button
  // </p>
  console.log('4354354345', cartItems);
  return (
    <Layout style={layoutStyle}>
      <DndContext onDragEnd={addItemsToCart}>
        <Sider width="300px" theme="light" style={siderStyle}>
          <FieldCard />
        </Sider>

        <Layout>
          <Content style={contentStyle}>
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
                      <div
                        onClick={() => {
                          setSectionIndexActive(Sectidx);
                        }}
                        style={{marginTop: '20px'}}
                        key={Sectidx}
                      >
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
                                    onDragEnd={() => {
                                      handleSort(Sectidx);
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                  >
                                    <Row justify="space-between">
                                      <Col
                                        onClick={() => {
                                          setCollapsed((p) => !p);
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
                                        <TrashIcon
                                          onClick={() => {
                                            deleteSelectedIntem(
                                              Sectidx,
                                              ItemConindex,
                                            );
                                          }}
                                          color="#EB445A"
                                        />{' '}
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
                                itemCon?.name == 'T Text' ||
                                itemCon?.name == 'Currency' ||
                                itemCon?.name == 'Email' ||
                                itemCon?.name == 'Contact' ||
                                itemCon?.name == 'Time' ||
                                itemCon?.name == 'Add Section' ||
                                itemCon?.name == 'Date'
                              ) {
                                return (
                                  <>
                                    {' '}
                                    <Space
                                      key={ItemConindex}
                                      className="list-item"
                                      draggable
                                      onDragStart={(e) => {
                                        dragItem.current = ItemConindex;
                                      }}
                                      onDragEnter={(e) => {
                                        dragOverItem.current = ItemConindex;
                                      }}
                                      onDragEnd={() => {
                                        handleSort(Sectidx);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
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
                                    >
                                      <Row justify="space-between">
                                        <Col
                                          onClick={() => {
                                            setCollapsed((p) => !p);
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
                                              width: '104px',
                                              height: '18px',
                                              fontWeight: '500',
                                              fontSize: '12px',
                                              lineHeight: '18px',
                                            }}
                                          >
                                            {itemCon?.name == 'Time'
                                              ? 'Time'
                                              : itemCon?.name == 'Email'
                                                ? 'Email'
                                                : itemCon?.name == 'Currency'
                                                  ? 'Currency'
                                                  : itemCon?.name == 'Checkbox'
                                                    ? 'Checkbox'
                                                    : itemCon?.name ==
                                                        'Radio Button'
                                                      ? 'Radio'
                                                      : itemCon?.name == 'Date'
                                                        ? 'Date'
                                                        : itemCon?.name ==
                                                            'Contact'
                                                          ? 'Contact'
                                                          : itemCon?.name ===
                                                              'T text Content'
                                                            ? 'Header Text'
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
                                        ) : itemCon?.name == 'Currency' ? (
                                          <>
                                            {' '}
                                            <OsInput
                                              suffix={itemCon?.currency}
                                              type={itemCon?.type}
                                              value={
                                                itemCon?.deciamlHide
                                                  ? '12'
                                                  : '12.00'
                                              }

                                              // style={{width: '270px'}}
                                              // onClick={showDrawer}
                                            />
                                          </>
                                        ) : itemCon?.name == 'Date' ? (
                                          <>
                                            <DatePicker
                                              format={itemCon?.dateformat}
                                              style={{
                                                width: '100%',
                                                height: '44px',
                                              }}
                                            />
                                          </>
                                        ) : itemCon?.name === 'Contact' ? (
                                          <>
                                            {' '}
                                            <OsInput
                                              type={itemCon?.type}

                                              // style={{width: '270px'}}
                                              // onClick={showDrawer}
                                            />
                                          </>
                                        ) : itemCon?.name === 'Email' ? (
                                          <OsInput
                                            type={itemCon?.type}
                                            suffix={<MailOutlined />}

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
                                const optionssMulti: any = [];
                                itemCon?.options?.map((itemoo: any) => {
                                  optionssMulti?.push({
                                    label: itemoo,
                                    value: itemoo,
                                  });
                                });

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
                                      onDragEnd={() => {
                                        handleSort(Sectidx);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                    >
                                      <Row justify="space-between">
                                        <Col
                                          onClick={() => {
                                            setCollapsed((p) => !p);
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
                                              width: '84px',
                                              height: '18px',
                                              fontWeight: '500',
                                              fontSize: '12px',
                                              lineHeight: '18px',
                                            }}
                                          >
                                            {itemCon?.name === 'Drop Down'
                                              ? 'Drop Down'
                                              : 'Multi-Select'}
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
                                          options={optionssMulti}
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
                                    style={{
                                      marginTop: '10px',
                                      width: '100%',
                                    }}
                                  />
                                );
                              }
                              if (itemCon?.name == 'T text Content') {
                                return (
                                  <>
                                    {' '}
                                    <Space
                                      direction="vertical"
                                      style={{
                                        width: '94%',
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
                                      onDragEnd={() => {
                                        handleSort(Sectidx);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                    >
                                      <Row justify="space-between">
                                        <Col
                                          onClick={() => {
                                            setCollapsed((p) => !p);
                                            setActiveContentIndex(ItemConindex);
                                            setActiveSectionIndex(Sectidx);
                                            form.resetFields();
                                          }}
                                          style={{
                                            width: '100px',
                                            height: '26px',
                                            borderRadius: '50px',
                                            // padding: '4px 12px 4px 12px',
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
                                              lineHeight: '24px',
                                            }}
                                          >
                                            Header Text
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
                                      <div
                                        style={{
                                          width: '100%',
                                          display: 'flex',
                                          gap: '12px',
                                        }}
                                      >
                                        <>
                                          {itemCon?.FontSize == 'h1' ? (
                                            <h1
                                              style={{
                                                display: 'flex',
                                                justifyContent:
                                                  itemCon?.Alignemnt,
                                                width: '100%',
                                              }}
                                            >
                                              {itemCon?.sectionTitle}
                                            </h1>
                                          ) : itemCon?.FontSize == 'h2' ? (
                                            <h2
                                              style={{
                                                display: 'flex',
                                                justifyContent:
                                                  itemCon?.Alignemnt,
                                                width: '100%',
                                              }}
                                            >
                                              {itemCon?.sectionTitle}
                                            </h2>
                                          ) : itemCon?.FontSize == 'h3' ? (
                                            <h3
                                              style={{
                                                display: 'flex',
                                                justifyContent:
                                                  itemCon?.Alignemnt,
                                                width: '100%',
                                              }}
                                            >
                                              {itemCon?.sectionTitle}
                                            </h3>
                                          ) : (
                                            <h4
                                              style={{
                                                display: 'flex',
                                                justifyContent:
                                                  itemCon?.Alignemnt,
                                                width: '100%',
                                              }}
                                            >
                                              {itemCon?.sectionTitle}
                                            </h4>
                                          )}
                                        </>
                                      </div>
                                    </Space>
                                  </>
                                );
                              }
                              if (itemCon?.name == 'Line Break') {
                                return (
                                  <>
                                    {' '}
                                    <Divider
                                      style={{
                                        margin: '0px',
                                        border: '1px solid #C7CDD5',
                                      }}
                                    />
                                  </>
                                );
                              }
                              if (itemCon?.name == 'Checkbox') {
                                return (
                                  <>
                                    {' '}
                                    <Space
                                      direction="vertical"
                                      style={{
                                        width: '94%',
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
                                      onDragEnd={() => {
                                        handleSort(Sectidx);
                                      }}
                                      onDragOver={(e) => e.preventDefault()}
                                    >
                                      <Row justify="space-between">
                                        <Col
                                          onClick={() => {
                                            setCollapsed((p) => !p);
                                            setActiveContentIndex(ItemConindex);
                                            setActiveSectionIndex(Sectidx);
                                            form.resetFields();
                                          }}
                                          style={{
                                            width: '100px',
                                            height: '26px',
                                            borderRadius: '50px',
                                            // padding: '4px 12px 4px 12px',
                                            gap: '12px',
                                            background: '#ECF2F5',
                                            display: 'flex',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: '64px',
                                              height: '18px',
                                              fontWeight: '500',
                                              fontSize: '12px',
                                              lineHeight: '24px',
                                            }}
                                          >
                                            Header Text
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
                                      <div
                                        style={{
                                          width: '100%',
                                          display: 'flex',
                                          gap: '12px',
                                        }}
                                      >
                                        <>
                                          {itemCon?.FontSize == 'h1' ? (
                                            <h1
                                              style={{
                                                display: 'flex',
                                                justifyContent:
                                                  itemCon?.Alignemnt,
                                                width: '100%',
                                              }}
                                            >
                                              {itemCon?.sectionTitle}
                                            </h1>
                                          ) : itemCon?.FontSize == 'h2' ? (
                                            <h2
                                              style={{
                                                display: 'flex',
                                                justifyContent:
                                                  itemCon?.Alignemnt,
                                                width: '100%',
                                              }}
                                            >
                                              {itemCon?.sectionTitle}
                                            </h2>
                                          ) : itemCon?.FontSize == 'h3' ? (
                                            <h3
                                              style={{
                                                display: 'flex',
                                                justifyContent:
                                                  itemCon?.Alignemnt,
                                                width: '100%',
                                              }}
                                            >
                                              {itemCon?.sectionTitle}
                                            </h3>
                                          ) : (
                                            <h4
                                              style={{
                                                display: 'flex',
                                                justifyContent:
                                                  itemCon?.Alignemnt,
                                                width: '100%',
                                              }}
                                            >
                                              {itemCon?.sectionTitle}
                                            </h4>
                                          )}
                                        </>
                                      </div>
                                    </Space>
                                  </>
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
          </Content>
        </Layout>
      </DndContext>

      {collapsed && (
        <div
          style={{
            width: '20%',
            // height: '100vh',
            background: 'white',
          }}
        >
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
        </div>
      )}
    </Layout>
  );
};

export default FormBuilder;
