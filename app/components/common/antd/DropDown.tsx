import React, {FC} from 'react';
import D, {DropdownButtonProps, DropdownProps} from 'antd/es/dropdown';

export const Dropdown: FC<DropdownProps> = React.memo((props) => (
  <D {...props} />
));
export const DropdownButton: FC<DropdownButtonProps> = React.memo((props) => (
  <D.Button {...props} />
));
export type {DropdownProps};
