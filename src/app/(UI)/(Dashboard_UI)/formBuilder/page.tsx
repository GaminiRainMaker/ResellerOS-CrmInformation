/* eslint-disable no-unsafe-optional-chaining */

'use client';

import {DndContext, DragEndEvent} from '@dnd-kit/core';
import 'react-phone-number-input/style.css';

import FormBuilderMain from '@/app/components/common/formBuilder/page';
import {SiderDivStyled} from '@/app/components/common/os-div-row-col/styled-component';
import {formbuildernewObject} from '@/app/utils/base';
import {Form, Layout, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import EditFiledDetails from './detailsFieldEdit';

import FieldCard from './FieldCard';
import { getPartnerProgramById } from '../../../../../redux/actions/partnerProgram';

const {Sider, Content} = Layout;

const FormBuilder = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
  const [activeSetionIndex, setActiveSectionIndex] = useState<number>(0);
  const [form] = Form.useForm();
  const [sectionIndexActive, setSectionIndexActive] = useState<number>(0);
  const [contentActiveIndex, setContentActiveIndex] = useState<number>(0);

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
            <FormBuilderMain
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
              previewFile={false}
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
            <FormBuilderMain
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
              // eslint-disable-next-line react/jsx-boolean-value
              previewFile
              // previewFile={true}
            />
          </Modal>
        </>
      )}
    </Layout>
  );
};

export default FormBuilder;
