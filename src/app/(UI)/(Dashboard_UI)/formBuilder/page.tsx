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
import {Space} from '@/app/components/common/antd/Space';
import {Table} from '@/app/components/common/antd/Table';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {MailOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {DndContext, DragEndEvent, useDroppable} from '@dnd-kit/core';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import 'react-phone-number-input/style.css';

import {
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Layout,
  MenuProps,
  TimePicker,
  Radio,
  Switch,
  Input,
  Select,
} from 'antd';
import {OsPhoneInputStyle} from '@/app/components/common/os-contact/styled-components';
import {formbuildernewObject} from '@/app/utils/base';
import React, {useState} from 'react';
import FormUpload from '@/app/components/common/os-upload/FormUpload';
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
  const [contentActiveIndex, setContentActiveIndex] = useState<number>(0);
  const [radioValue, setRadioValue] = useState<any>();
  const [token] = useThemeToken();
  const [cartItems, setCartItems] = useState<any>([]);
  const [columnData, setColumnData] = useState<any>([]);

  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title?.props?.text;
    const temp = [...cartItems];
    const addnewField = formbuildernewObject(newItem, columnData);

    if (newItem === 'Add Section' || cartItems?.length === 0) {
      temp?.push({
        section: `Section${cartItems?.length + 1}`,
        content: newItem === 'Add Section' ? [] : [addnewField],
      });
      const tempVar: any = [...columnData];
      if (newItem === 'Table') {
        tempVar?.push({
          tableKey: columnData?.length,
          tableCol: [
            {title: 'Column 1', dataIndex: 'address', key: '1'},
            {title: 'Column 2', dataIndex: 'address', key: '2'},
          ],
        });
      }
      setColumnData(tempVar);
      setSectionIndexActive(cartItems?.length);
      setContentActiveIndex(cartItems?.length);
    } else {
      const tempVar: any = [...columnData];
      if (newItem === 'Table') {
        tempVar?.push({
          tableKey: columnData?.length,
          tableCol: [
            {title: 'Column 1', dataIndex: 'address', key: '1'},
            {title: 'Column 2', dataIndex: 'address', key: '2'},
          ],
        });
      }
      setColumnData(tempVar);
      temp?.[sectionIndexActive]?.content?.push(addnewField);
      setContentActiveIndex(temp?.[sectionIndexActive]?.content?.length);
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
    const addnewField = formbuildernewObject(itemCont, columnData);
    const temp = [...cartItems];
    temp?.[sectionInd]?.content?.push(addnewField);
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

  const addnewColumn = () => {
    const tempVar: any = [...columnData];
    console.log('3333333', tempVar);
    tempVar?.[0]?.tableCol?.push({
      title: 'Column 1',
      dataIndex: 'address',
      key: '3',
    });
    // tempVar?.push({
    //   tableKey: columnData?.length,
    //   C: [
    //     {title: 'Column 1', dataIndex: 'address', key: '1'},
    //     {title: 'Column 2', dataIndex: 'address', key: '2'},
    //   ],
    // });

    setColumnData(tempVar);
  };
  const [colmsss, setColumnss] = useState<any>([
    'Column1 ',
    'column2',
    'Column3',
  ]);
  const addnewColimnsdsds = () => {
    const temp: any = [...colmsss];
    temp?.push('Column4');
    setColumnss(temp);
  };
  return (
    <Layout style={layoutStyle}>
      <DndContext onDragEnd={addItemsToCart}>
        <Sider width="350px" theme="light" style={siderStyle}>
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
                              const newColumnData = columnData?.find(
                                (itemss: any) => {
                                  if (itemss?.tableKey === itemCon?.tableKey) {
                                    return itemss;
                                  }
                                },
                              );
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
                                    <button onClick={addnewColumn}>
                                      dsssd
                                    </button>
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
                                        // columns={itemCon?.ColumnsData}
                                        columns={newColumnData?.tableCol}
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
                                itemCon?.name == 'Text' ||
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
                                                              'Text Content'
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
                                        {itemCon?.requiredLabel &&
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
                                            <OsPhoneInputStyle
                                              style={{
                                                border:
                                                  '1px solid var(--foundation-neutrals-black-n-70, #a3a3a3)',
                                                borderRadius: '10px',
                                                padding: '3px',
                                              }}
                                              mask={itemCon?.dataformat}
                                              limitMaxLength
                                              defaultCountry={
                                                itemCon?.defaultcountry
                                              }
                                              countryCallingCodeEditable={false}
                                              max={11}
                                              onChange={(e: any) => {}}
                                            />
                                          </>
                                        ) : itemCon?.name === 'Email' ? (
                                          <OsInput
                                            type={itemCon?.type}
                                            suffix={<MailOutlined />}
                                          />
                                        ) : (
                                          <OsInput type={itemCon?.type} />
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
                                        <div>{itemCon?.hintTextValue}</div>
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
                                        {itemCon?.requiredLabel &&
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
                                        <div>{itemCon?.hintTextValue}</div>
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
                              if (itemCon?.name == 'Text Content') {
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

                              if (
                                itemCon?.name == 'Checkbox' ||
                                itemCon?.name == 'Radio Button' ||
                                itemCon?.name == 'Toggle'
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
                                        width: '95%',
                                        marginBottom: '20px',
                                        background:
                                          contentActiveIndex == ItemConindex
                                            ? '#F6F7F8'
                                            : 'transparent',
                                        padding:
                                          contentActiveIndex == ItemConindex
                                            ? '10px'
                                            : '10px',
                                        borderRadius:
                                          contentActiveIndex == ItemConindex
                                            ? '10px'
                                            : '10px',
                                      }}
                                    >
                                      <Row justify="space-between">
                                        <Col
                                          onClick={() => {
                                            setCollapsed((p) => !p);
                                            setActiveContentIndex(ItemConindex);
                                            setActiveSectionIndex(Sectidx);
                                            setContentActiveIndex(ItemConindex);
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
                                            {itemCon?.name == 'Radio Button'
                                              ? 'Radio'
                                              : itemCon?.name == 'Toggle'
                                                ? 'Toggle'
                                                : 'checkbox'}
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
                                            color={token?.colorError}
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
                                        {itemCon?.requiredLabel &&
                                          itemCon?.placeholdertext}{' '}
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
                                        <Row>
                                          {itemCon?.labelOptions?.map(
                                            (
                                              itemLabelOp: any,
                                              itemLabelInde: number,
                                            ) => (
                                              <Col
                                                style={{
                                                  display: 'flex',
                                                  gap: '10px',
                                                  marginBottom: '10px',
                                                }}
                                                span={24}
                                              >
                                                {itemCon?.name ===
                                                'Radio Button' ? (
                                                  <Radio.Group
                                                    onChange={(e: any) => {
                                                      setRadioValue(
                                                        e.target.value,
                                                      );
                                                    }}
                                                    value={radioValue}
                                                  >
                                                    <Radio
                                                      value={itemLabelInde}
                                                    >
                                                      {' '}
                                                      {itemLabelOp}
                                                    </Radio>
                                                  </Radio.Group>
                                                ) : itemCon?.name ===
                                                  'Toggle' ? (
                                                  <>
                                                    <Switch /> {itemLabelOp}
                                                  </>
                                                ) : (
                                                  <>
                                                    <Checkbox /> {itemLabelOp}
                                                  </>
                                                )}
                                              </Col>
                                            ),
                                          )}
                                        </Row>
                                      </div>
                                      {itemCon?.hintTextValue}
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
                  <>
                    {' '}
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
                        onClick={addnewColimnsdsds}
                      >
                        + Drop Filed
                      </div>
                    </Row>
                    <FormUpload />
                    <Row
                      style={{
                        background: '#F6F7F8',
                        padding: '10px',
                        marginTop: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Row style={{width: '100%'}}>
                        {colmsss?.map((itemColum: string) => {
                          const totalSpanVaue = 24;
                          const totalCol = colmsss?.length;
                          const totalLengthAchived = totalSpanVaue / totalCol;
                          const totalFloorValue =
                            Math.floor(totalLengthAchived);
                          return (
                            <Col
                              span={totalFloorValue}
                              style={{
                                height: '40px',
                                borderRadius: '0px 0px 1px 0px',
                                gap: '8px',
                                padding: '8px 12px 8px 12px',
                                background: '#EDEFF2',
                                width: '100%',
                                color: '#0D0D0D',
                                display: 'flex',
                                justifyContent: 'center',
                                borderLeft: '1px solid white',
                              }}
                            >
                              Colun1
                            </Col>
                          );
                        })}
                      </Row>
                      <Row style={{width: '100%'}}>
                        {colmsss?.map((itemColum: string) => {
                          const totalSpanVaue = 24;
                          const totalCol = colmsss?.length;
                          const totalLengthAchived = totalSpanVaue / totalCol;
                          const totalFloorValue =
                            Math.floor(totalLengthAchived);
                          return (
                            <Col
                              span={totalFloorValue}
                              style={{
                                height: '48px',
                                borderRadius: '0px 0px 1px 0px',
                                gap: '8px',
                                padding: '8px 12px 8px 12px',
                                background: 'white',
                                color: '#0D0D0D',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '1px solid rgb(242 242 242)',
                                width: '100%',
                              }}
                            />
                          );
                        })}
                      </Row>
                      <Row style={{width: '100%'}}>
                        {colmsss?.map((itemColum: string) => {
                          const totalSpanVaue = 24;
                          const totalCol = colmsss?.length;
                          const totalLengthAchived = totalSpanVaue / totalCol;
                          const totalFloorValue =
                            Math.floor(totalLengthAchived);
                          return (
                            <Col
                              span={totalFloorValue}
                              style={{
                                height: 'auto',
                                borderRadius: '0px 0px 1px 0px',
                                gap: '8px',
                                padding: '8px 12px 8px 12px',
                                background: 'white',
                                color: '#0D0D0D',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '1px solid rgb(242 242 242)',
                                width: '100%',
                              }}
                            >
                              <Select
                                variant="borderless"
                                style={{width: '100%'}}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    </Row>
                  </>
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
            setColumnData={setColumnData}
            columnData={columnData}
          />
        </div>
      )}
    </Layout>
  );
};

export default FormBuilder;
