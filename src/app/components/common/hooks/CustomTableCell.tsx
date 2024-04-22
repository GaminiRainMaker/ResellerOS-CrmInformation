import React from 'react';
import Typography from '../typography';
import useCustomLabel from './useCustomLabelHook';

const CustomTableCell = (text: any) => {
  const customLabel = useCustomLabel(text);
  return <Typography name="Body 4/Regular">{customLabel ?? '--'}</Typography>;
};

export default CustomTableCell;
