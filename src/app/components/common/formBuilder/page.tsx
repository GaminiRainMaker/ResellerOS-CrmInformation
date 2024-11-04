/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */

'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {MailOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {useDroppable} from '@dnd-kit/core';
import 'react-phone-number-input/style.css';

import ContactInput from '@/app/components/common/os-contact';
import CommonDatePicker from '@/app/components/common/os-date-picker';
import {
  RowStyledForForm,
  SectionColStyledInner,
  SectionColStyledInnerContent,
  SectionDivStyled1,
  SectionRowStyled,
  SectionRowStyledInner,
  StyledDivider,
  ToggleColStyled,
} from '@/app/components/common/os-div-row-col/styled-component';
import FormUpload from '@/app/components/common/os-upload/FormUpload';
import FormUploadCard from '@/app/components/common/os-upload/FormUploadCard';
import {formatStatus} from '@/app/utils/CONSTANTS';
import {formbuildernewObject} from '@/app/utils/base';
import {TrashIcon} from '@heroicons/react/24/outline';
import {Checkbox, Radio, Switch, TimePicker, notification} from 'antd';
import moment from 'moment';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {
  getPartnerProgramById,
  updatePartnerProgramById,
} from '../../../../../redux/actions/partnerProgram';

import {useAppDispatch, useAppSelector} from '../../../../../redux/hook';
import ItemName from './ItemName';
import GlobalLoader from '../os-global-loader';

const FormBuilderMain: React.FC<any> = ({
  cartItems,
  setCartItems,
  form,
  setSectionIndexActive,
  setOpenPreviewModal,
  openPreviewModal,
  setCollapsed,
  setActiveContentIndex,
  setActiveSectionIndex,
  setSelectedColumnIndex,
  setContentActiveIndex,
  previewFile,
  sectionIndexActive,
  setNewValue,
  collapsed,
  setIsOpenDrawer,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  // dealRegDetail
  const [formLoading, setFormLoading] = useState<boolean>(false);

  let pathnameForFlow = pathname === '/dealRegDetail';
  const getPartnerProgramID = searchParams.get('id');
  const isLoginTemplate = searchParams.get('loginTemplate');
  const [holdelSelectedValue, setHoldSelectedValue] = useState<any>();
  const [radioValue, setRadioValue] = useState<any>();
  const [token] = useThemeToken();
  const {data: partnerData, loading: partnerProgramLoading} = useAppSelector(
    (state) => state.partnerProgram,
  );
  const [selectIndexFOrAllDependentField, setSelectIndexFOrAllDependentField] =
    useState<any>();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api.warning({
      message: 'Please Add the Fields!',
      description: 'We are here to assist you! Please select the fields.',
    });
  };

  useEffect(() => {
    let allTHeIndexAndSection: any = [];
    if (cartItems) {
      cartItems?.map((items: any, indexOut: number) => {
        items?.content?.map((itemsin: any, indexIn: number) => {
          if (itemsin?.dependentFiled) {
            allTHeIndexAndSection.push({
              section: indexOut,
              indexOfItems: indexIn,
              selectedIndexForDepend: null,
            });
          }
        });
      });
    }
    setSelectIndexFOrAllDependentField(allTHeIndexAndSection);
  }, [cartItems]);

  console.log(
    'selectIndexFOrAllDependentFieldselectIndexFOrAllDependentField',
    selectIndexFOrAllDependentField,
  );
  const deleteSelectedIntem = (sectionInde: number) => {
    const temp: any = [...cartItems];
    temp?.splice(sectionInde, 1);
    setCartItems(temp);
    setCollapsed(false);
  };

  console.log('isLoginTemplate', isLoginTemplate === 'true');

  useEffect(() => {
    if (!openPreviewModal && getPartnerProgramID) {
      setFormLoading(true);
      dispatch(getPartnerProgramById(Number(getPartnerProgramID)))?.then(
        (payload: any) => {
          if (isLoginTemplate === 'true') {
            if (payload?.payload?.login_template?.[0]?.[0]) {
              const formData: any = JSON?.parse(
                payload?.payload?.login_template?.[0]?.[0],
              );
              setCartItems(formData);
            }
          } else {
            if (payload?.payload?.form_data?.[0]?.[0]) {
              const formData: any = JSON?.parse(
                payload?.payload?.form_data?.[0]?.[0],
              );
              setCartItems(formData);
            }
          }
        },
      );
      setTimeout(() => {
        setFormLoading(false);
      }, 1000);
    }
  }, []);

  const updateSection = (sectionInd: number, itemCont: string) => {
    const addnewField = formbuildernewObject(itemCont);
    const temp = [...cartItems];
    temp?.[sectionInd]?.content?.push(addnewField);
    setCartItems(temp);
  };

  // save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  // const handle drag sorting
  const handleSort = (sectionIndexx: any) => {
    const optionItems: any = [...cartItems];

    // remove and save the dragged item content
    const draggedItemContent1 = optionItems?.[
      sectionIndexx || 0
    ]?.content.splice(dragItem.current, 1)[0];

    // switch the position
    optionItems?.[sectionIndexx || 0]?.content.splice(
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

  const commonDraggableProps = (ItemConindex: number, Sectidx: number) => ({
    draggable: true,
    // eslint-disable-next-line no-return-assign
    onDragStart: () => (dragItem.current = ItemConindex),
    // eslint-disable-next-line no-return-assign
    onDragEnter: () => (dragOverItem.current = ItemConindex),
    onDragEnd: () => {
      handleSort(Sectidx);
    },
    onDragOver: (e: any) => e.preventDefault(),
  });

  const {setNodeRef} = useDroppable({
    id: 'cart-droppable',
  });

  const addFormData = async () => {
    let objNew = {};
    if (isLoginTemplate === 'true') {
      objNew = {
        login_template: [JSON?.stringify(cartItems)],
        id: Number(getPartnerProgramID),
      };
    } else {
      objNew = {
        form_data: [JSON?.stringify(cartItems)],
        id: Number(getPartnerProgramID),
      };
    }
    if (cartItems?.[0]?.content?.length > 0) {
      dispatch(updatePartnerProgramById(objNew));
      router.push(`/superAdminPartner`);
    } else {
      openNotificationWithIcon();
    }
  };

  const updateTheValues = (
    changedValue: any,
    sectionIndex: number,
    itemIndex: number,
  ) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === itemIndex) {
              return {
                ...contItem,
                value: changedValue,
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

  useEffect(() => {
    if (cartItems?.[0]?.content?.length === 0) {
      setCollapsed(false);
    }
  }, [cartItems]);
  console.log('cartItemscartItems', cartItems);

  const changeOptionsSelected = (
    indexOfItem: number,
    indexOfSection: number,
    valueIndex: any,
  ) => {
    const newTempArr = selectIndexFOrAllDependentField.map(
      (sectItem: any, sectioIndex: number) => {
        if (
          sectItem?.section === indexOfSection &&
          indexOfItem === sectItem?.indexOfItems
        ) {
          return {
            ...sectItem,
            selectedIndexForDepend: valueIndex,
          };
        }
        return sectItem;
      },
    );

    console.log(
      '32432432423',
      indexOfItem,
      indexOfSection,
      valueIndex,
      newTempArr,
    );

    setSelectIndexFOrAllDependentField(newTempArr);
  };
  return (
    <GlobalLoader loading={formLoading}>
      {contextHolder}
      {!previewFile && (
        <Row
          justify="space-between"
          onClick={(e: any) => {
            e?.preventDefault();
            if (collapsed) {
              setCollapsed(false);
            }
          }}
        >
          <Space size={10} direction="horizontal">
            <Typography name="Heading 3/Medium">
              {formatStatus(partnerData?.Partner?.partner)} -{' '}
              {formatStatus(partnerData?.partner_program)}
            </Typography>
          </Space>
          <Space size={10}>
            <OsButton
              loading={partnerProgramLoading}
              buttontype="PRIMARY"
              text="Save"
              clickHandler={addFormData}
            />
            <OsButton
              buttontype="PRIMARY_ICON"
              clickHandler={() => {
                setOpenPreviewModal(!openPreviewModal);
              }}
              text=""
              icon={<PlayCircleOutlined />}
            />
            {/* <OsDropdown menu={{items: dropDownItemss}} /> */}
          </Space>
        </Row>
      )}
      <div
        ref={setNodeRef}
        onClick={(e: any) => {
          e?.preventDefault();
          // setCollapsed(false);
        }}
      >
        {cartItems && cartItems?.length > 0 ? (
          <>
            {cartItems?.map((item: any, Sectidx: number) => (
              <div
                onClick={() => {
                  if (!previewFile) {
                    setSectionIndexActive(Sectidx);
                  }
                }}
                key={Sectidx}
              >
                {!previewFile && (
                  <Typography name="Body 1/Medium" color={token?.colorInfo}>
                    Section {Sectidx + 1}
                    <TrashIcon
                      cursor="pointer"
                      style={{marginLeft: '20px'}}
                      width={18}
                      onClick={() => {
                        deleteSelectedIntem(Sectidx);
                      }}
                      color={token?.colorError}
                    />
                  </Typography>
                )}
                <SectionRowStyled gutter={[16, 16]} justify="space-between">
                  <>
                    {item?.content?.map((itemCon: any, ItemConindex: any) => {
                      if (itemCon?.name === 'Table') {
                        return (
                          <Col
                            span={24}
                            {...(!previewFile && {
                              ...commonDraggableProps(ItemConindex, Sectidx),
                            })}
                          >
                            {!previewFile && (
                              <ItemName
                                itemName={itemCon?.name}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                isPreview={!previewFile}
                                ItemConindex={ItemConindex}
                                Sectidx={Sectidx}
                                setCollapsed={setCollapsed}
                                onClick={(e: any) => {
                                  e?.preventDefault();
                                  setCollapsed(true);
                                  setActiveContentIndex(ItemConindex);
                                  setActiveSectionIndex(Sectidx);
                                  form.resetFields();
                                }}
                              />
                            )}
                            <SectionRowStyledInner>
                              {itemCon?.ColumnsData?.length > 0 &&
                                itemCon?.ColumnsData?.map(
                                  (itemColum: any, indexOfColumn: number) => {
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
                                          setSelectedColumnIndex(indexOfColumn);
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
                                          Math.floor(totalLengthAchived);
                                        {
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
                                              {itemColum?.type === 'single' ||
                                              itemColum?.type === 'multiple' ? (
                                                <CommonSelect
                                                  variant="borderless"
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
                          </Col>
                        );
                      }
                      if (
                        itemCon?.name === 'Text' ||
                        itemCon?.name === 'Currency' ||
                        itemCon?.name === 'Email' ||
                        itemCon?.name === 'Contact' ||
                        itemCon?.name === 'Time' ||
                        itemCon?.name === 'Add Section' ||
                        itemCon?.name === 'Date'
                      ) {
                        const newDateeDaTa: any = moment(itemCon?.value).format(
                          'MM-DD-YYYY',
                        );
                        return (
                          <Col
                            span={12}
                            {...(!previewFile && {
                              ...commonDraggableProps(ItemConindex, Sectidx),
                            })}
                          >
                            {!previewFile && (
                              <ItemName
                                itemName={
                                  itemCon?.name === 'Text'
                                    ? 'Text Field'
                                    : itemCon?.name
                                }
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                isPreview={!previewFile}
                                setCollapsed={setCollapsed}
                                onClick={(e: any) => {
                                  e?.preventDefault();
                                  setCollapsed(true);
                                  setActiveContentIndex(ItemConindex);
                                  setActiveSectionIndex(Sectidx);
                                  form.resetFields();
                                }}
                                ItemConindex={ItemConindex}
                                Sectidx={Sectidx}
                              />
                            )}

                            <Typography name="Body 4/Medium">
                              {itemCon?.requiredLabel && itemCon?.label}{' '}
                              {itemCon?.required && (
                                <span style={{color: 'red'}}>*</span>
                              )}
                            </Typography>
                            <SectionDivStyled1>
                              {itemCon?.name === 'Time' ? (
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
                                  defaultValue={itemCon?.value}
                                  onChange={(e: any) => {
                                    if (pathnameForFlow) {
                                      updateTheValues(
                                        e?.target?.value,
                                        Sectidx,
                                        ItemConindex,
                                      );
                                    }
                                  }}
                                />
                              ) : itemCon?.name === 'Currency' ? (
                                <>
                                  {' '}
                                  <OsInput
                                    suffix={itemCon?.currency}
                                    type={itemCon?.type}
                                    defaultValue={
                                      itemCon?.deciamlHide
                                        ? itemCon?.value?.split('.'[0])
                                        : itemCon?.value
                                    }
                                    onChange={(e: any) => {
                                      if (pathnameForFlow) {
                                        updateTheValues(
                                          e?.target?.value,
                                          Sectidx,
                                          ItemConindex,
                                        );
                                      }
                                    }}
                                  />
                                </>
                              ) : itemCon?.name === 'Date' ? (
                                <>
                                  <CommonDatePicker
                                    format={itemCon?.dateformat}
                                    // value={newDateeDaTa}
                                    onChange={(e: any) => {
                                      if (pathnameForFlow) {
                                        updateTheValues(
                                          e,
                                          Sectidx,
                                          ItemConindex,
                                        );
                                      }
                                    }}
                                  />
                                </>
                              ) : itemCon?.name === 'Contact' ? (
                                <>
                                  <ContactInput
                                    name="Contact"
                                    id="Contact"
                                    value={itemCon?.value}
                                    onChange={(e: any) => {
                                      if (pathnameForFlow) {
                                        updateTheValues(
                                          e?.target?.value,
                                          Sectidx,
                                          ItemConindex,
                                        );
                                      }
                                    }}
                                    mask={itemCon?.dataformat}
                                    limitMaxLength
                                    defaultCountry={itemCon?.defaultcountry}
                                    max={11}
                                    // countryCallingCodeEditable={false}
                                  />
                                </>
                              ) : itemCon?.name === 'Email' ||
                                itemCon?.label === 'Email' ? (
                                <OsInput
                                  type={itemCon?.type}
                                  suffix={<MailOutlined />}
                                  defaultValue={itemCon?.value}
                                  onChange={(e: any) => {
                                    if (pathnameForFlow) {
                                      updateTheValues(
                                        e?.target?.value,
                                        Sectidx,
                                        ItemConindex,
                                      );
                                    }
                                  }}
                                />
                              ) : (
                                <OsInput
                                  type={itemCon?.type}
                                  defaultValue={itemCon?.value}
                                  onChange={(e: any) => {
                                    if (pathnameForFlow) {
                                      updateTheValues(
                                        e?.target?.value,
                                        Sectidx,
                                        ItemConindex,
                                      );
                                    }
                                  }}
                                />
                              )}{' '}
                              {item?.content?.length - 1 === ItemConindex &&
                                !previewFile && (
                                  <OsButton
                                    style={{marginLeft: '10px'}}
                                    buttontype="PRIMARY_ICON"
                                    icon="+"
                                    clickHandler={() => {
                                      updateSection(Sectidx, itemCon?.name);
                                    }}
                                  />
                                )}
                            </SectionDivStyled1>
                            {itemCon?.hintext && (
                              <div>{itemCon?.hintTextValue}</div>
                            )}
                          </Col>
                        );
                      }
                      if (
                        itemCon?.name === 'Multi-Select' ||
                        itemCon?.name === 'Drop Down'
                      ) {
                        const optionssMulti: any = [];
                        itemCon?.options?.map((itemoo: any) => {
                          if (itemoo && itemoo?.length > 0) {
                            optionssMulti?.push({
                              label: itemoo,
                              value: itemoo,
                            });
                          }
                        });
                        let findIndexx =
                          selectIndexFOrAllDependentField?.findIndex(
                            (items: any) =>
                              items?.indexOfItems === ItemConindex &&
                              items?.section === Sectidx,
                          );
                        let PropertSelected =
                          selectIndexFOrAllDependentField?.[findIndexx]
                            ?.selectedIndexForDepend;
                        let dependentDataaForIndex =
                          itemCon?.dependentFiledArr?.find(
                            (items: any) => items?.id === PropertSelected,
                          );
                        return (
                          <>
                            {' '}
                            <Col
                              span={itemCon?.dependentFiled ? 24 : 12}
                              {...(!previewFile && {
                                ...commonDraggableProps(ItemConindex, Sectidx),
                              })}
                            >
                              {!previewFile && (
                                <ItemName
                                  itemName={itemCon?.name}
                                  cartItems={cartItems}
                                  ItemConindex={ItemConindex}
                                  Sectidx={Sectidx}
                                  setCartItems={setCartItems}
                                  isPreview={!previewFile}
                                  setCollapsed={setCollapsed}
                                  onClick={(e: any) => {
                                    e?.preventDefault();
                                    setCollapsed(true);
                                    setActiveContentIndex(ItemConindex);
                                    setActiveSectionIndex(Sectidx);
                                    form.resetFields();
                                  }}
                                />
                              )}
                              <Typography name="Body 4/Medium">
                                {itemCon?.requiredLabel && itemCon?.label}{' '}
                                {itemCon?.required && (
                                  <span style={{color: 'red'}}>*</span>
                                )}
                              </Typography>
                              <SectionDivStyled1>
                                <CommonSelect
                                  options={optionssMulti}
                                  style={{
                                    width: '100%',
                                  }}
                                  mode={itemCon?.type}
                                  defaultValue={itemCon?.value}
                                  onChange={(e: any) => {
                                    if (pathnameForFlow) {
                                      updateTheValues(e, Sectidx, ItemConindex);
                                    }

                                    changeOptionsSelected(
                                      ItemConindex,
                                      Sectidx,
                                      e,
                                    );
                                  }}
                                />
                                {item?.content?.length - 1 === ItemConindex &&
                                  !previewFile && (
                                    <OsButton
                                      style={{marginLeft: '10px'}}
                                      buttontype="PRIMARY_ICON"
                                      icon="+"
                                      clickHandler={() => {
                                        updateSection(Sectidx, itemCon?.name);
                                      }}
                                    />
                                  )}
                              </SectionDivStyled1>
                              {itemCon?.hintext && (
                                <div>{itemCon?.hintTextValue}</div>
                              )}
                            </Col>
                            {itemCon?.dependentFiled && (
                              <Col
                                span={itemCon?.dependentFiled ? 24 : 12}
                                {...(!previewFile && {
                                  ...commonDraggableProps(
                                    ItemConindex,
                                    Sectidx,
                                  ),
                                })}
                              >
                                {!previewFile && (
                                  <ItemName
                                    itemName={`${itemCon?.name}-Dependent-Select`}
                                    cartItems={cartItems}
                                    ItemConindex={ItemConindex}
                                    Sectidx={Sectidx}
                                    setCartItems={setCartItems}
                                    isPreview={!previewFile}
                                    setCollapsed={setCollapsed}
                                    onClick={(e: any) => {
                                      if (itemCon?.dependentFiled) {
                                        return;
                                      }
                                      e?.preventDefault();
                                      setCollapsed(true);
                                      setActiveContentIndex(ItemConindex);
                                      setActiveSectionIndex(Sectidx);
                                      form.resetFields();
                                    }}
                                  />
                                )}
                                <Typography name="Body 4/Medium">
                                  {dependentDataaForIndex?.requiredLabel &&
                                    dependentDataaForIndex?.label}{' '}
                                  {dependentDataaForIndex?.required && (
                                    <span style={{color: 'red'}}>*</span>
                                  )}
                                </Typography>
                                <SectionDivStyled1>
                                  <CommonSelect
                                    disabled={PropertSelected === null}
                                    options={dependentDataaForIndex?.options?.map(
                                      (items: any) => {
                                        return {label: items, value: items};
                                      },
                                    )}
                                    style={{
                                      width: '100%',
                                    }}
                                    mode={dependentDataaForIndex?.type}
                                    defaultValue={itemCon?.value}
                                    onChange={(e: any) => {
                                      if (pathnameForFlow) {
                                        updateTheValues(
                                          e,
                                          Sectidx,
                                          ItemConindex,
                                        );
                                      }
                                    }}
                                  />
                                  {item?.content?.length - 1 === ItemConindex &&
                                    !previewFile && (
                                      <OsButton
                                        style={{marginLeft: '10px'}}
                                        buttontype="PRIMARY_ICON"
                                        icon="+"
                                        clickHandler={() => {
                                          updateSection(Sectidx, itemCon?.name);
                                        }}
                                      />
                                    )}
                                </SectionDivStyled1>
                                {itemCon?.hintext && (
                                  <div>{itemCon?.hintTextValue}</div>
                                )}
                              </Col>
                            )}
                          </>
                        );
                      }
                      if (itemCon?.name === 'Text Content') {
                        return (
                          <Col
                            span={24}
                            {...(!previewFile && {
                              ...commonDraggableProps(ItemConindex, Sectidx),
                            })}
                          >
                            {!previewFile && (
                              <ItemName
                                itemName={itemCon?.name}
                                ItemConindex={ItemConindex}
                                setCollapsed={setCollapsed}
                                Sectidx={Sectidx}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                isPreview={!previewFile}
                                onClick={(e: any) => {
                                  e?.preventDefault();
                                  setCollapsed(true);
                                  setActiveContentIndex(ItemConindex);
                                  setActiveSectionIndex(Sectidx);
                                  form.resetFields();
                                }}
                              />
                            )}
                            <SectionDivStyled1>
                              <>
                                {itemCon?.FontSize === 'h1' ? (
                                  <h1
                                    style={{
                                      display: 'flex',
                                      justifyContent: itemCon?.Alignemnt,
                                      width: '100%',
                                    }}
                                  >
                                    {itemCon?.sectionTitle}
                                  </h1>
                                ) : itemCon?.FontSize === 'h2' ? (
                                  <h2
                                    style={{
                                      display: 'flex',
                                      justifyContent: itemCon?.Alignemnt,
                                      width: '100%',
                                    }}
                                  >
                                    {itemCon?.sectionTitle}
                                  </h2>
                                ) : itemCon?.FontSize === 'h3' ? (
                                  <h3
                                    style={{
                                      display: 'flex',
                                      justifyContent: itemCon?.Alignemnt,
                                      width: '100%',
                                    }}
                                  >
                                    {itemCon?.sectionTitle}
                                  </h3>
                                ) : (
                                  <h4
                                    style={{
                                      display: 'flex',
                                      justifyContent: itemCon?.Alignemnt,
                                      width: '100%',
                                    }}
                                  >
                                    {itemCon?.sectionTitle}
                                  </h4>
                                )}
                              </>
                            </SectionDivStyled1>
                          </Col>
                        );
                      }
                      if (
                        itemCon?.name === 'Checkbox' ||
                        itemCon?.name === 'Radio Button' ||
                        itemCon?.name === 'Toggle'
                      ) {
                        // if (itemCon?.name === 'Checkbox') {
                        //   setHoldSelectedValue(itemCon?.value);
                        // }

                        let findIndexx =
                          selectIndexFOrAllDependentField?.findIndex(
                            (items: any) =>
                              items?.indexOfItems === ItemConindex &&
                              items?.section === Sectidx,
                          );

                        console.log(
                          'selectIndexFOrAllDependentFieldselectIndexFOrAllDependentField',
                          selectIndexFOrAllDependentField,
                        );
                        let PropertSelected =
                          selectIndexFOrAllDependentField?.[findIndexx]
                            ?.selectedIndexForDepend;
                        let dependentDataaForIndex =
                          itemCon?.dependentFiledArr?.[PropertSelected];
                        // let dependentDataaForIndex =
                        //   itemCon?.dependentFiledArr?.[0];
                        return (
                          <>
                            <Col
                              span={itemCon?.dependentFiled ? 24 : 12}
                              {...(!previewFile && {
                                ...commonDraggableProps(ItemConindex, Sectidx),
                              })}
                            >
                              {!previewFile && (
                                <ItemName
                                  itemName={itemCon?.name}
                                  ItemConindex={ItemConindex}
                                  setCollapsed={setCollapsed}
                                  Sectidx={Sectidx}
                                  cartItems={cartItems}
                                  setCartItems={setCartItems}
                                  isPreview={!previewFile}
                                  onClick={(e: any) => {
                                    e?.preventDefault();
                                    setCollapsed(true);
                                    setActiveContentIndex(ItemConindex);
                                    setActiveSectionIndex(Sectidx);
                                    form.resetFields();
                                  }}
                                />
                              )}
                              <Typography name="Body 4/Medium">
                                {itemCon?.requiredLabel && itemCon?.label}{' '}
                                {itemCon?.required && (
                                  <span style={{color: 'red'}}>*</span>
                                )}
                              </Typography>
                              <SectionDivStyled1>
                                <Row
                                  style={{
                                    width: '100%',
                                  }}
                                >
                                  {itemCon?.labelOptions?.map(
                                    (
                                      itemLabelOp: any,
                                      itemLabelInde: number,
                                    ) => {
                                      const totalSpanVaue = 24;
                                      const totalCol = itemCon?.columnRequired;
                                      const totalLengthAchived =
                                        totalSpanVaue / totalCol;
                                      const totalFloorValue =
                                        Math.floor(totalLengthAchived);
                                      return (
                                        <ToggleColStyled span={totalFloorValue}>
                                          {itemCon?.name === 'Radio Button' ? (
                                            <Radio.Group
                                              onChange={(e: any) => {
                                                setRadioValue(e.target.value);
                                                changeOptionsSelected(
                                                  ItemConindex,
                                                  Sectidx,
                                                  itemLabelInde,
                                                );
                                              }}
                                              defaultValue={radioValue}
                                            >
                                              <Radio value={itemLabelInde}>
                                                {' '}
                                                {itemLabelOp}
                                              </Radio>
                                            </Radio.Group>
                                          ) : itemCon?.name === 'Toggle' ? (
                                            <>
                                              <Switch /> {itemLabelOp}
                                            </>
                                          ) : (
                                            <>
                                              {' '}
                                              {/* setHoldSelectedValue */}
                                              <Checkbox.Group
                                                onChange={(e) => {
                                                  console.log('eeeeee', e);
                                                  changeOptionsSelected(
                                                    ItemConindex,
                                                    Sectidx,
                                                    itemLabelInde,
                                                  );
                                                  if (
                                                    itemCon?.filedType ===
                                                    'multiple'
                                                  ) {
                                                    const temp: any =
                                                      holdelSelectedValue?.length >
                                                      0
                                                        ? [
                                                            ...holdelSelectedValue,
                                                          ]
                                                        : [];
                                                    temp?.push(e?.[0]);
                                                    if (pathnameForFlow) {
                                                      updateTheValues(
                                                        temp,
                                                        Sectidx,
                                                        ItemConindex,
                                                      );
                                                    }

                                                    setHoldSelectedValue(temp);
                                                  } else {
                                                    setHoldSelectedValue(
                                                      e?.[0],
                                                    );
                                                    if (pathnameForFlow) {
                                                      updateTheValues(
                                                        e?.[0],
                                                        Sectidx,
                                                        ItemConindex,
                                                      );
                                                    }
                                                  }
                                                }}
                                                value={holdelSelectedValue}
                                                defaultValue={itemCon?.value}
                                              >
                                                {' '}
                                                <Checkbox
                                                  value={itemLabelOp}
                                                  checked
                                                >
                                                  {' '}
                                                  {itemLabelOp}
                                                </Checkbox>
                                              </Checkbox.Group>
                                            </>
                                          )}
                                        </ToggleColStyled>
                                      );
                                    },
                                  )}
                                </Row>
                              </SectionDivStyled1>
                              {itemCon?.hintext && (
                                <> {itemCon?.hintTextValue}</>
                              )}
                            </Col>
                            {itemCon?.dependentFiled && (
                              <Col
                                span={itemCon?.dependentFiled ? 24 : 12}
                                {...(!previewFile && {
                                  ...commonDraggableProps(
                                    ItemConindex,
                                    Sectidx,
                                  ),
                                })}
                              >
                                {!previewFile && (
                                  <ItemName
                                    itemName={`${itemCon?.name}-Dependent-Select`}
                                    cartItems={cartItems}
                                    ItemConindex={ItemConindex}
                                    Sectidx={Sectidx}
                                    setCartItems={setCartItems}
                                    isPreview={!previewFile}
                                    setCollapsed={setCollapsed}
                                    onClick={(e: any) => {
                                      if (itemCon?.dependentFiled) {
                                        return;
                                      }
                                      e?.preventDefault();
                                      setCollapsed(true);
                                      setActiveContentIndex(ItemConindex);
                                      setActiveSectionIndex(Sectidx);
                                      form.resetFields();
                                    }}
                                  />
                                )}
                                <Typography name="Body 4/Medium">
                                  {dependentDataaForIndex?.requiredLabel &&
                                    dependentDataaForIndex?.label}{' '}
                                  {dependentDataaForIndex?.required && (
                                    <span style={{color: 'red'}}>*</span>
                                  )}
                                </Typography>
                                <SectionDivStyled1>
                                  <CommonSelect
                                    disabled={PropertSelected === null}
                                    options={dependentDataaForIndex?.options?.map(
                                      (items: any) => {
                                        return {label: items, value: items};
                                      },
                                    )}
                                    style={{
                                      width: '100%',
                                    }}
                                    mode={dependentDataaForIndex?.type}
                                    defaultValue={itemCon?.value}
                                    onChange={(e: any) => {
                                      if (pathnameForFlow) {
                                        updateTheValues(
                                          e,
                                          Sectidx,
                                          ItemConindex,
                                        );
                                      }
                                    }}
                                  />
                                  {item?.content?.length - 1 === ItemConindex &&
                                    !previewFile && (
                                      <OsButton
                                        style={{marginLeft: '10px'}}
                                        buttontype="PRIMARY_ICON"
                                        icon="+"
                                        clickHandler={() => {
                                          updateSection(Sectidx, itemCon?.name);
                                        }}
                                      />
                                    )}
                                </SectionDivStyled1>
                                {itemCon?.hintext && (
                                  <div>{itemCon?.hintTextValue}</div>
                                )}
                              </Col>
                            )}
                          </>
                        );
                      }
                      if (itemCon?.name === 'Attachment') {
                        return (
                          <Space
                            direction="vertical"
                            {...(!previewFile && {
                              ...commonDraggableProps(ItemConindex, Sectidx),
                            })}
                          >
                            {!previewFile && (
                              <ItemName
                                itemName={itemCon?.name}
                                ItemConindex={ItemConindex}
                                Sectidx={Sectidx}
                                setCollapsed={setCollapsed}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                isPreview={!previewFile}
                                onClick={(e: any) => {
                                  e?.preventDefault();
                                  setCollapsed(true);
                                  setActiveContentIndex(ItemConindex);
                                  setActiveSectionIndex(Sectidx);
                                  form.resetFields();
                                }}
                              />
                            )}
                            {itemCon?.pdfUrl ? (
                              <FormUploadCard
                                uploadFileData={itemCon?.pdfUrl}
                              />
                            ) : (
                              <FormUpload />
                            )}
                          </Space>
                        );
                      }
                      if (itemCon?.name === 'Line Break')
                        return (
                          <>
                            {' '}
                            {!previewFile && (
                              <ItemName
                                itemName={itemCon?.name}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                isPreview={!previewFile}
                                ItemConindex={ItemConindex}
                                Sectidx={Sectidx}
                                setCollapsed={setCollapsed}
                                onClick={(e: any) => {
                                  e?.preventDefault();
                                  // setCollapsed(true);
                                  setActiveContentIndex(ItemConindex);
                                  setActiveSectionIndex(Sectidx);
                                  form.resetFields();
                                }}
                              />
                            )}
                            <StyledDivider />
                          </>
                        );
                    })}
                  </>
                </SectionRowStyled>
              </div>
            ))}
          </>
        ) : (
          <RowStyledForForm>+ Drop Filed</RowStyledForForm>
        )}
      </div>
    </GlobalLoader>
  );
};
export default FormBuilderMain;
