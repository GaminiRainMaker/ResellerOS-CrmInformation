/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-lonely-if */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import AttachmentEditFileds from './commonEditable/attachmentEdit';
import EditCheckBoxField from './commonEditable/checkBoxEdit';
import ContactEditFields from './commonEditable/contactEditField';
import CurrencyEditField from './commonEditable/currencyEdit';
import EditFiledDetailsForDate from './commonEditable/dateEdit';
import EditMultiSelectFields from './commonEditable/multiSelectEdit';
import EditCommonRestFields from './commonEditable/restFormDetails';
import EditTableFields from './commonEditable/tableEdit';
import EditFiledDetailsForTextContent from './commonEditable/textContentEdit';
import TimeEditFileds from './commonEditable/timeEditFiled';
import {FormBuilderInterFace} from './formBuilder.interface';

const EditFiledDetails: React.FC<FormBuilderInterFace> = ({
  sectionIndex,
  cartItems,
  contentIndex,
  setCartItems,
  form,
  selectedColumnIndex,
}) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: 800,
    overflow: 'hidden',
    background: 'null',
    border: 'null',
    borderRadius: 'null',
    padding: '0px',
  };

  const CommonIndexOfUse =
    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0];

  const NameofTheCurrentFiled = CommonIndexOfUse?.name;

  return (
    <div style={containerStyle}>
      {NameofTheCurrentFiled === 'Table' ? (
        <EditTableFields
          sectionIndex={sectionIndex}
          cartItems={cartItems}
          contentIndex={contentIndex}
          setCartItems={setCartItems}
          form={form}
          selectedColumnIndex={selectedColumnIndex}
        />
      ) : NameofTheCurrentFiled === 'Checkbox' ||
        NameofTheCurrentFiled === 'Radio Button' ||
        NameofTheCurrentFiled === 'Toggle' ? (
        <>
          <EditCheckBoxField
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      ) : NameofTheCurrentFiled === 'Text Content' ? (
        <>
          <EditFiledDetailsForTextContent
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      ) : NameofTheCurrentFiled === 'Drop Down' ||
        NameofTheCurrentFiled === 'Multi-Select' ? (
        <>
          <EditMultiSelectFields
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      ) : NameofTheCurrentFiled === 'Attachment' ? (
        <>
          <AttachmentEditFileds
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      ) : NameofTheCurrentFiled === 'Date' ? (
        <>
          <EditFiledDetailsForDate
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      ) : NameofTheCurrentFiled === 'Currency' ? (
        <>
          <CurrencyEditField
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      ) : NameofTheCurrentFiled === 'Contact' ? (
        <>
          <ContactEditFields
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      ) : NameofTheCurrentFiled == 'Time' ? (
        <>
          <TimeEditFileds
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      ) : (
        <>
          <EditCommonRestFields
            sectionIndex={sectionIndex}
            cartItems={cartItems}
            contentIndex={contentIndex}
            setCartItems={setCartItems}
            form={form}
            selectedColumnIndex={selectedColumnIndex}
          />
        </>
      )}
    </div>
  );
};

export default EditFiledDetails;
