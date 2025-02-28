import React from 'react';
import Typography from '../typography';
import useCustomCapitaliationLabel from './useCustomCapitaliationLabel';

const CustomTextCapitalization = (text: any) => {
  const customCapitalizationLabel = useCustomCapitaliationLabel(text);
  return (
    <Typography name="Body 4/Regular">
      {customCapitalizationLabel ?? '--'}
    </Typography>
  );
};

export default CustomTextCapitalization;
