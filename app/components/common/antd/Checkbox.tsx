import React, {FC} from 'react';
import C, {CheckboxProps, CheckboxGroupProps} from 'antd/es/checkbox';

export const Checkbox: FC<CheckboxProps> = (props) => <C {...props} />;
export const CheckboxGroup: FC<CheckboxGroupProps> = (props) => (
  <C.Group {...props} />
);
