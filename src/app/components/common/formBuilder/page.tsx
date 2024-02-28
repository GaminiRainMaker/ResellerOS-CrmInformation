/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */

'use client';

import { Col, Row } from '@/app/components/common/antd/Grid';
import { Space } from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import OsDropdown from '@/app/components/common/os-dropdown';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import { MailOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useDroppable } from '@dnd-kit/core';
import 'react-phone-number-input/style.css';

import { FormBuilderMainInterFace } from '@/app/(UI)/(Dashboard_UI)/formBuilder/formBuilder.interface';
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
import { formbuildernewObject } from '@/app/utils/base';
import { Checkbox, MenuProps, Radio, Switch, TimePicker } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { updatePartnerProgramById } from '../../../../../redux/actions/partnerProgram';
import { useAppDispatch } from '../../../../../redux/hook';
import ItemName from './ItemName';

const FormBuilderMain: React.FC<FormBuilderMainInterFace> = ({
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
}) => {
  const dropDownItemss: MenuProps['items'] = [];
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const getPartnerProgramID = searchParams.get('id');
  const [radioValue, setRadioValue] = useState<any>();
  //   const [previewFile, setPreviewFile] = useState<boolean>(true);
  const [token] = useThemeToken();

  const deleteSelectedIntem = (sectionInde: number, contentIn: number) => {
    const temp: any = [...cartItems];
    temp?.[sectionInde || 0]?.content?.splice(contentIn, 1);
    setCartItems(temp);
  };
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
    const objNew = {
      form_data: JSON?.stringify(cartItems),
      id: Number(getPartnerProgramID),
    };
    dispatch(updatePartnerProgramById(objNew));
    router.push(`/superAdminPartner`);
  };

  return (
    <>
      {!previewFile && (
        <Row justify="space-between">
          <Space size={10} direction="horizontal">
            <Typography name="Heading 3/Medium">
              Cisco- Cisco Hardware
            </Typography>
          </Space>
          <Space size={10}>
            <OsButton
              buttontype="PRIMARY"
              text="Save"
              clickHandler={addFormData}
            />
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
      )}
      <div ref={setNodeRef}>
        {cartItems && cartItems?.length > 0 ? (
          <>
            {cartItems.map((item: any, Sectidx: number) => (
              <div
                onClick={() => {
                  setSectionIndexActive(Sectidx);
                }}
                key={Sectidx}
              >
                <Typography name="Body 1/Medium" color={token?.colorInfo}>
                  {item?.section}
                </Typography>
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
                            <ItemName
                              itemName={itemCon?.name}
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                              isPreview={!previewFile}
                              onClick={() => {
                                setCollapsed((p: boolean) => !p);
                                setActiveContentIndex(ItemConindex);
                                setActiveSectionIndex(Sectidx);
                                form.resetFields();
                              }}
                            />
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
                        return (
                          <Col
                            span={12}
                            {...(!previewFile && {
                              ...commonDraggableProps(ItemConindex, Sectidx),
                            })}
                          >
                            <ItemName
                              itemName={
                                itemCon?.name === 'Text'
                                  ? 'Text Field'
                                  : itemCon?.name
                              }
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                              isPreview={!previewFile}
                              onClick={() => {
                                setCollapsed((p: boolean) => !p);
                                setActiveContentIndex(ItemConindex);
                                setActiveSectionIndex(Sectidx);
                                form.resetFields();
                              }}
                            />
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
                                />
                              ) : itemCon?.name === 'Currency' ? (
                                <>
                                  {' '}
                                  <OsInput
                                    suffix={itemCon?.currency}
                                    type={itemCon?.type}
                                    value={
                                      itemCon?.deciamlHide ? '12' : '12.00'
                                    }
                                  />
                                </>
                              ) : itemCon?.name === 'Date' ? (
                                <>
                                  <CommonDatePicker
                                    format={itemCon?.dateformat}
                                  />
                                </>
                              ) : itemCon?.name === 'Contact' ? (
                                <>
                                  <ContactInput
                                    name="Contact"
                                    id="Contact"
                                    value=""
                                    mask={itemCon?.dataformat}
                                    limitMaxLength
                                    defaultCountry={itemCon?.defaultcountry}
                                    max={11}
                                    onChange={(e: any) => {}}
                                    // countryCallingCodeEditable={false}
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
                          optionssMulti?.push({
                            label: itemoo,
                            value: itemoo,
                          });
                        });
                        return (
                          <Col
                            span={12}
                            {...(!previewFile && {
                              ...commonDraggableProps(ItemConindex, Sectidx),
                            })}
                          >
                            <ItemName
                              itemName={itemCon?.name}
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                              isPreview={!previewFile}
                              onClick={() => {
                                setCollapsed((p: boolean) => !p);
                                setActiveContentIndex(ItemConindex);
                                setActiveSectionIndex(Sectidx);
                                form.resetFields();
                              }}
                            />
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
                            <ItemName
                              itemName={itemCon?.name}
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                              isPreview={!previewFile}
                              onClick={() => {
                                setCollapsed((p: boolean) => !p);
                                setActiveContentIndex(ItemConindex);
                                setActiveSectionIndex(Sectidx);
                                form.resetFields();
                              }}
                            />
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
                        return (
                          <Col
                            span={12}
                            {...(!previewFile && {
                              ...commonDraggableProps(ItemConindex, Sectidx),
                            })}
                          >
                            <ItemName
                              itemName={itemCon?.name}
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                              isPreview={!previewFile}
                              onClick={() => {
                                setCollapsed((p: boolean) => !p);
                                setActiveContentIndex(ItemConindex);
                                setActiveSectionIndex(Sectidx);
                                form.resetFields();
                              }}
                            />
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
                                  (itemLabelOp: any, itemLabelInde: number) => (
                                    <ToggleColStyled span={24}>
                                      {itemCon?.name === 'Radio Button' ? (
                                        <Radio.Group
                                          onChange={(e: any) => {
                                            setRadioValue(e.target.value);
                                          }}
                                          value={radioValue}
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
                                          <Checkbox /> {itemLabelOp}
                                        </>
                                      )}
                                    </ToggleColStyled>
                                  ),
                                )}
                              </Row>
                            </SectionDivStyled1>
                            {itemCon?.hintTextValue}
                          </Col>
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
                            <ItemName
                              itemName={itemCon?.name}
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                              isPreview={!previewFile}
                              onClick={() => {
                                setCollapsed((p: boolean) => !p);
                                setActiveContentIndex(ItemConindex);
                                setActiveSectionIndex(Sectidx);
                                form.resetFields();
                              }}
                            />

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
                        return <StyledDivider />;
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
    </>
  );
};
export default FormBuilderMain;
