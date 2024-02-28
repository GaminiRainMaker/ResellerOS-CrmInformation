import React from 'react';
import AttachmentEditFields from './commonEditable/attachmentEdit';
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
  const commonProps = {
    sectionIndex,
    cartItems,
    contentIndex,
    setCartItems,
    form,
    selectedColumnIndex,
  };

  const NameofTheCurrentFiled =
    cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.name;

  const renderComponent = (Component: React.FC<any>) => (
    <Component {...commonProps} />
  );

  return (
    <div style={{position: 'relative', height: 800, overflow: 'hidden'}}>
      {NameofTheCurrentFiled === 'Table' && renderComponent(EditTableFields)}
      {['Checkbox', 'Radio Button', 'Toggle'].includes(NameofTheCurrentFiled) &&
        renderComponent(EditCheckBoxField)}
      {NameofTheCurrentFiled === 'Text Content' &&
        renderComponent(EditFiledDetailsForTextContent)}
      {['Drop Down', 'Multi-Select'].includes(NameofTheCurrentFiled) &&
        renderComponent(EditMultiSelectFields)}
      {NameofTheCurrentFiled === 'Attachment' &&
        renderComponent(AttachmentEditFields)}
      {NameofTheCurrentFiled === 'Date' &&
        renderComponent(EditFiledDetailsForDate)}
      {NameofTheCurrentFiled === 'Currency' &&
        renderComponent(CurrencyEditField)}
      {NameofTheCurrentFiled === 'Contact' &&
        renderComponent(ContactEditFields)}
      {NameofTheCurrentFiled === 'Time' && renderComponent(TimeEditFileds)}
      {(NameofTheCurrentFiled === 'Text' ||
        NameofTheCurrentFiled === 'Email') &&
        renderComponent(EditCommonRestFields)}
    </div>
  );
};

export default EditFiledDetails;
