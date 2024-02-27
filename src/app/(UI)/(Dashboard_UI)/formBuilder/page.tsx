/* eslint-disable no-lone-blocks */
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

import {OsPhoneInputStyle} from '@/app/components/common/os-contact/styled-components';
import FormUpload from '@/app/components/common/os-upload/FormUpload';
import FormUploadCard from '@/app/components/common/os-upload/FormUploadCard';
import {formbuildernewObject} from '@/app/utils/base';
import {
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Layout,
  MenuProps,
  Modal,
  Radio,
  Switch,
  TimePicker,
} from 'antd';
import React, {useState} from 'react';
import {
  RowStyledForForm,
  SectionColDivStyled,
  SectionColStyled,
  SectionColStyledForTextCont,
  SectionColStyledForTextContDIV,
  SectionColStyledInner,
  SectionColStyledInnerContent,
  SectionColStyledOPtions,
  SectionDivStyled1,
  SectionRowStyled,
  SectionRowStyledInner,
  SiderDivStyled,
  StyledDatePicker,
  StyledDivider,
  ToggleColStyled,
} from '@/app/components/common/os-div-row-col/styled-component';
import EditFiledDetails from './detailsFieldEdit';

import FieldCard from './FieldCard';
import FormBuilderPreview from './previewFile';

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
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title?.props?.text;
    const temp = [...cartItems];
    const addnewField = formbuildernewObject(newItem, columnData);

    if (newItem === 'Add Section' || cartItems?.length === 0) {
      temp?.push({
        section: `Section${cartItems?.length + 1}`,
        content: newItem === 'Add Section' ? [] : [addnewField],
      });

      setSectionIndexActive(cartItems?.length);
      setContentActiveIndex(cartItems?.length);
    } else {
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

  return (
    <Layout style={layoutStyle}>
      <DndContext onDragEnd={addItemsToCart}>
        <Sider width="350px" theme="light" style={siderStyle}>
          <FieldCard />
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <Row justify="space-between">
              <Space size={10} direction="horizontal">
                <Typography name="Heading 3/Medium">
                  Cisco- Cisco Hardware
                </Typography>
              </Space>
              <Space size={10}>
                <OsButton buttontype="PRIMARY" text="Save" />
                <OsButton
                  buttontype="PRIMARY_ICON"
                  onClick={() => {
                    setOpenPreviewModal(!openPreviewModal);
                  }}
                  text=""
                  icon={
                    <PlayCircleOutlined
                      onClick={() => {
                        setOpenPreviewModal(!openPreviewModal);
                      }}
                    />
                  }
                />
                <OsDropdown menu={{items: dropDownItemss}} />
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
                        // style={{marginTop: '20px'}}
                        key={Sectidx}
                      >
                        <Typography
                          name="Body 1/Medium"
                          color={token?.colorInfo}
                        >
                          {item?.section}
                        </Typography>
                        <SectionRowStyled style={{background: 'green'}}>
                          {' '}
                          {item?.content?.map(
                            (itemCon: any, ItemConindex: any) => {
                              if (itemCon?.name == 'Table') {
                                return (
                                  <Space
                                    direction="vertical"
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
                                      <SectionColStyled
                                        onClick={() => {
                                          setCollapsed((p) => !p);
                                          setActiveContentIndex(ItemConindex);
                                          setActiveSectionIndex(Sectidx);
                                          form.resetFields();
                                        }}
                                      >
                                        <SectionColDivStyled>
                                          Table
                                        </SectionColDivStyled>
                                      </SectionColStyled>
                                      <SectionColStyledOPtions>
                                        <TrashIcon
                                          onClick={() => {
                                            deleteSelectedIntem(
                                              Sectidx,
                                              ItemConindex,
                                            );
                                          }}
                                          color={token?.colorError}
                                        />{' '}
                                        <ArrowsPointingOutIcon
                                          color={token?.colorInfo}
                                        />
                                      </SectionColStyledOPtions>
                                    </Row>

                                    <SectionRowStyledInner>
                                      {itemCon?.ColumnsData?.length > 0 &&
                                        itemCon?.ColumnsData?.map(
                                          (
                                            itemColum: any,
                                            indexOfColumn: number,
                                          ) => {
                                            const totalSpanVaue = 24;
                                            const totalCol =
                                              itemCon?.ColumnsData?.length;
                                            const totalLengthAchived =
                                              totalSpanVaue / totalCol;
                                            const totalFloorValue =
                                              Math.floor(totalLengthAchived);
                                            return (
                                              <SectionColStyledInner
                                                onClick={() => {
                                                  form.resetFields();
                                                  setSelectedColumnIndex(
                                                    indexOfColumn,
                                                  );
                                                }}
                                                span={totalFloorValue}
                                              >
                                                {itemColum?.title}
                                              </SectionColStyledInner>
                                            );
                                          },
                                        )}

                                      {itemCon?.noOfRowsData?.map(
                                        (rowsMapItem: string) => (
                                          <Row style={{width: '100%'}}>
                                            {itemCon?.ColumnsData?.map(
                                              (itemColum: any) => {
                                                const totalSpanVaue = 24;
                                                const totalCol =
                                                  itemCon?.ColumnsData?.length;
                                                const totalLengthAchived =
                                                  totalSpanVaue / totalCol;
                                                const totalFloorValue =
                                                  Math.floor(
                                                    totalLengthAchived,
                                                  );
                                                {
                                                  // eslint-disable-next-line no-unreachable-loop

                                                  const optionsData: any = [];
                                                  itemColum?.options?.map(
                                                    (itemss: any) => {
                                                      optionsData?.push({
                                                        label: itemss,
                                                        value: itemss,
                                                      });
                                                    },
                                                  );
                                                  return (
                                                    <SectionColStyledInnerContent
                                                      span={totalFloorValue}
                                                    >
                                                      {itemColum?.type ===
                                                        'single' ||
                                                      itemColum?.type ===
                                                        'multiple' ? (
                                                        <CommonSelect
                                                          variant="borderless"
                                                          // type={number}
                                                          mode={itemColum?.type}
                                                          options={optionsData}
                                                          style={{
                                                            border: 'none',
                                                            width: '100%',
                                                          }}
                                                        />
                                                      ) : (
                                                        <OsInput
                                                          variant="borderless"
                                                          type={itemColum?.type}
                                                          style={{
                                                            border: 'none',
                                                          }}
                                                        />
                                                      )}
                                                    </SectionColStyledInnerContent>
                                                  );
                                                }
                                              },
                                            )}
                                          </Row>
                                        ),
                                      )}
                                    </SectionRowStyledInner>
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
                                        width: '100%',
                                        background: 'red',
                                        // marginLeft:
                                        //   ItemConindex % 2 === 0
                                        //     ? '25px'
                                        //     : '',
                                        // marginBottom: '20px',
                                      }}
                                    >
                                      <Row>
                                        <Col>
                                          <Row justify="space-between">
                                            <SectionColStyled
                                              onClick={() => {
                                                setCollapsed((p) => !p);
                                                setActiveContentIndex(
                                                  ItemConindex,
                                                );
                                                setActiveSectionIndex(Sectidx);
                                                form.resetFields();
                                              }}
                                            >
                                              <SectionColDivStyled>
                                                {itemCon?.name == 'Time'
                                                  ? 'Time'
                                                  : itemCon?.name == 'Email'
                                                    ? 'Email'
                                                    : itemCon?.name ==
                                                        'Currency'
                                                      ? 'Currency'
                                                      : itemCon?.name ==
                                                          'Checkbox'
                                                        ? 'Checkbox'
                                                        : itemCon?.name ==
                                                            'Radio Button'
                                                          ? 'Radio'
                                                          : itemCon?.name ==
                                                              'Date'
                                                            ? 'Date'
                                                            : itemCon?.name ==
                                                                'Contact'
                                                              ? 'Contact'
                                                              : itemCon?.name ===
                                                                  'Text Content'
                                                                ? 'Header Text'
                                                                : 'Text Filed'}
                                              </SectionColDivStyled>
                                            </SectionColStyled>
                                            <SectionColStyledOPtions>
                                              <TrashIcon
                                                color={token?.colorError}
                                                onClick={() => {
                                                  deleteSelectedIntem(
                                                    Sectidx,
                                                    ItemConindex,
                                                  );
                                                }}
                                              />{' '}
                                              <ArrowsPointingOutIcon
                                                color={token?.colorInfo}
                                              />
                                            </SectionColStyledOPtions>
                                          </Row>
                                          <Typography name="Body 4/Medium">
                                            {itemCon?.requiredLabel &&
                                              itemCon?.label}{' '}
                                            {itemCon?.required && (
                                              <span style={{color: 'red'}}>
                                                *
                                              </span>
                                            )}
                                          </Typography>
                                          <SectionDivStyled1>
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
                                                  countryCallingCodeEditable={
                                                    false
                                                  }
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
                                          </SectionDivStyled1>
                                          {itemCon?.hintext && (
                                            <div>{itemCon?.hintTextValue}</div>
                                          )}
                                        </Col>
                                      </Row>
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
                                        <SectionColStyled
                                          onClick={() => {
                                            setCollapsed((p) => !p);
                                            setActiveContentIndex(ItemConindex);
                                            setActiveSectionIndex(Sectidx);
                                            form.resetFields();
                                          }}
                                        >
                                          <SectionColDivStyled>
                                            {itemCon?.name === 'Drop Down'
                                              ? 'Drop Down'
                                              : 'Multi-Select'}
                                          </SectionColDivStyled>
                                        </SectionColStyled>
                                        <SectionColStyledOPtions>
                                          <TrashIcon
                                            color={token?.colorError}
                                            onClick={() => {
                                              deleteSelectedIntem(
                                                Sectidx,
                                                ItemConindex,
                                              );
                                            }}
                                          />{' '}
                                          <ArrowsPointingOutIcon
                                            color={token?.colorInfo}
                                          />
                                        </SectionColStyledOPtions>
                                      </Row>
                                      <Typography name="Body 4/Medium">
                                        {itemCon?.requiredLabel &&
                                          itemCon?.label}{' '}
                                        {itemCon?.required && (
                                          <span style={{color: 'red'}}>*</span>
                                        )}
                                      </Typography>

                                      <SectionDivStyled1>
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
                                      </SectionDivStyled1>
                                      {itemCon?.hintext && (
                                        <div>{itemCon?.hintTextValue}</div>
                                      )}
                                    </Space>
                                  </>
                                );
                              }
                              if (itemCon?.name == 'Date') {
                                return <StyledDatePicker />;
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
                                        <SectionColStyledForTextCont
                                          onClick={() => {
                                            setCollapsed((p) => !p);
                                            setActiveContentIndex(ItemConindex);
                                            setActiveSectionIndex(Sectidx);
                                            form.resetFields();
                                          }}
                                        >
                                          <SectionColStyledForTextContDIV>
                                            Header Text
                                          </SectionColStyledForTextContDIV>
                                        </SectionColStyledForTextCont>
                                        <SectionColStyledOPtions>
                                          <TrashIcon
                                            color={token?.colorError}
                                            onClick={() => {
                                              deleteSelectedIntem(
                                                Sectidx,
                                                ItemConindex,
                                              );
                                            }}
                                          />{' '}
                                          <ArrowsPointingOutIcon
                                            color={token?.colorInfo}
                                          />
                                        </SectionColStyledOPtions>
                                      </Row>
                                      <SectionDivStyled1>
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
                                      </SectionDivStyled1>
                                    </Space>
                                  </>
                                );
                              }
                              if (itemCon?.name == 'Line Break') {
                                return (
                                  <>
                                    {' '}
                                    <StyledDivider />
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
                                        // width: '95%',
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
                                        <SectionColStyled
                                          onClick={() => {
                                            setCollapsed((p) => !p);
                                            setActiveContentIndex(ItemConindex);
                                            setActiveSectionIndex(Sectidx);
                                            setContentActiveIndex(ItemConindex);
                                            form.resetFields();
                                          }}
                                        >
                                          <SectionColStyledForTextContDIV>
                                            {itemCon?.name == 'Radio Button'
                                              ? 'Radio'
                                              : itemCon?.name == 'Toggle'
                                                ? 'Toggle'
                                                : 'checkbox'}
                                          </SectionColStyledForTextContDIV>
                                        </SectionColStyled>
                                        <SectionColStyledOPtions>
                                          <TrashIcon
                                            color={token?.colorError}
                                            onClick={() => {
                                              deleteSelectedIntem(
                                                Sectidx,
                                                ItemConindex,
                                              );
                                            }}
                                          />{' '}
                                          <ArrowsPointingOutIcon
                                            color={token?.colorInfo}
                                          />
                                        </SectionColStyledOPtions>
                                      </Row>
                                      <Typography name="Body 4/Medium">
                                        {itemCon?.requiredLabel &&
                                          itemCon?.placeholdertext}{' '}
                                        {itemCon?.required && (
                                          <span style={{color: 'red'}}>*</span>
                                        )}
                                      </Typography>
                                      <SectionDivStyled1>
                                        <Row>
                                          {itemCon?.labelOptions?.map(
                                            (
                                              itemLabelOp: any,
                                              itemLabelInde: number,
                                            ) => (
                                              <ToggleColStyled span={24}>
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
                                              </ToggleColStyled>
                                            ),
                                          )}
                                        </Row>
                                      </SectionDivStyled1>
                                      {itemCon?.hintTextValue}
                                    </Space>
                                  </>
                                );
                              }
                              if (itemCon?.name == 'Attachment') {
                                return (
                                  <Space direction="vertical">
                                    <SectionColStyledForTextCont
                                      onClick={() => {
                                        setCollapsed((p) => !p);
                                        setActiveContentIndex(ItemConindex);
                                        setActiveSectionIndex(Sectidx);
                                        form.resetFields();
                                      }}
                                    >
                                      <SectionColStyledForTextContDIV>
                                        Attachment{' '}
                                        {itemCon?.required && (
                                          <span style={{color: 'red'}}>*</span>
                                        )}
                                      </SectionColStyledForTextContDIV>
                                    </SectionColStyledForTextCont>
                                    {itemCon?.pdfUrl ? (
                                      <>
                                        {' '}
                                        <FormUploadCard
                                          uploadFileData={itemCon?.pdfUrl}
                                        />
                                      </>
                                    ) : (
                                      <FormUpload setCollapsed={setCollapsed} />
                                    )}
                                  </Space>
                                );
                              }
                            },
                          )}
                        </SectionRowStyled>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {' '}
                    <RowStyledForForm>+ Drop Filed</RowStyledForForm>
                  </>
                )}
              </div>
            </Row>
          </Content>
        </Layout>
      </DndContext>

      {collapsed && (
        <SiderDivStyled>
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
            selectedColumnIndex={selectedColumnIndex}
          />
        </SiderDivStyled>
      )}
      {openPreviewModal && (
        <>
          <Modal
            open={openPreviewModal}
            width={1400}
            footer={false}
            onCancel={() => {
              setOpenPreviewModal(false);
            }}
          >
            <FormBuilderPreview cartItems={cartItems} />
          </Modal>
        </>
      )}
    </Layout>
  );
};

export default FormBuilder;
