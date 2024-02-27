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

import ContactInput from '@/app/components/common/os-contact';
import CommonDatePicker from '@/app/components/common/os-date-picker';
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
  StyledDivider,
  ToggleColStyled,
} from '@/app/components/common/os-div-row-col/styled-component';
import FormUpload from '@/app/components/common/os-upload/FormUpload';
import FormUploadCard from '@/app/components/common/os-upload/FormUploadCard';
import {formbuildernewObject} from '@/app/utils/base';
import {
  Checkbox,
  Form,
  Layout,
  MenuProps,
  Modal,
  Radio,
  Switch,
  TimePicker,
} from 'antd';
import React, {useState} from 'react';
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

  const [token] = useThemeToken();
  const [cartItems, setCartItems] = useState<any>([]);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title?.props?.text;
    const temp = [...cartItems];
    const addnewField = formbuildernewObject(newItem);

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
    const addnewField = formbuildernewObject(itemCont);
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

  return (
    <Layout style={layoutStyle}>
      <DndContext onDragEnd={addItemsToCart}>
        <Sider width="350px" theme="light" style={siderStyle}>
          <FieldCard />
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <FormBuilderPreview
              setCartItems={setCartItems}
              cartItems={cartItems}
              form={form}
              setSectionIndexActive={setSectionIndexActive}
              setOpenPreviewModal={setOpenPreviewModal}
              openPreviewModal={openPreviewModal}
              setCollapsed={setCollapsed}
              setActiveContentIndex={setActiveContentIndex}
              setActiveSectionIndex={setActiveSectionIndex}
              setSelectedColumnIndex={setSelectedColumnIndex}
              setContentActiveIndex={setContentActiveIndex}
            />
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
            dd
            <FormBuilderPreview
              setCartItems={setCartItems}
              cartItems={cartItems}
              form={form}
              setSectionIndexActive={setSectionIndexActive}
              setOpenPreviewModal={setOpenPreviewModal}
              openPreviewModal={openPreviewModal}
              setCollapsed={setCollapsed}
              setActiveContentIndex={setActiveContentIndex}
              setActiveSectionIndex={setActiveSectionIndex}
              setSelectedColumnIndex={setSelectedColumnIndex}
              setContentActiveIndex={setContentActiveIndex}
            />
          </Modal>
        </>
      )}
    </Layout>
  );
};

export default FormBuilder;
