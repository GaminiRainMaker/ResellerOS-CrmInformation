/* eslint-disable no-unsafe-optional-chaining */

'use client';

import {DndContext, DragEndEvent} from '@dnd-kit/core';
import 'react-phone-number-input/style.css';

import FormBuilderMain from '@/app/components/common/formBuilder/page';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {SiderDivStyled} from '@/app/components/common/os-div-row-col/styled-component';
import {formbuildernewObject} from '@/app/utils/base';
import {Form, Layout, Modal} from 'antd';
import React, {Suspense, useState} from 'react';
import {XMarkIcon} from '@heroicons/react/24/solid';
import EditFiledDetails from './detailsFieldEdit';

import FieldCard from './FieldCard';

const {Sider, Content} = Layout;

const FormBuilder = () => {
  const [token] = useThemeToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [activeContentIndex, setActiveContentIndex] = useState<number>(0);
  const [activeSetionIndex, setActiveSectionIndex] = useState<number>(0);
  const [form] = Form.useForm();
  const [sectionIndexActive, setSectionIndexActive] = useState<any>(0);
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
    <Suspense fallback={<div>Loading...</div>}>
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
                collapsed={collapsed}
                setActiveContentIndex={setActiveContentIndex}
                setActiveSectionIndex={setActiveSectionIndex}
                setSelectedColumnIndex={setSelectedColumnIndex}
                setContentActiveIndex={setContentActiveIndex}
                setIsOpenDrawer={setIsOpenDrawer}
                previewFile={false}
              />
            </Content>
          </Layout>
        </DndContext>

        {collapsed && (
          <SiderDivStyled>
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                padding: '10px',
                // overflow: 'auto',
              }}
            >
              <XMarkIcon
                onClick={() => {
                  setCollapsed(false);
                }}
                width={24}
                color={token?.colorError}
                cursor="pointer"
              />
            </div>
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
                collapsed={collapsed}
                setActiveContentIndex={setActiveContentIndex}
                setActiveSectionIndex={setActiveSectionIndex}
                setSelectedColumnIndex={setSelectedColumnIndex}
                setContentActiveIndex={setContentActiveIndex}
                setIsOpenDrawer={setIsOpenDrawer}
                // eslint-disable-next-line react/jsx-boolean-value
                previewFile
                // previewFile={true}
              />
            </Modal>
          </>
        )}
      </Layout>
    </Suspense>
  );
};

export default FormBuilder;
