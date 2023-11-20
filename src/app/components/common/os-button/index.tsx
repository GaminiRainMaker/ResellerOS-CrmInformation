import React, {FC, forwardRef} from 'react';
import {ButtonProps} from '../antd/Button';
import {ButtonStyled} from './styled-components';

const OsButton: FC<ButtonProps> = forwardRef((props, ref) => (
  <ButtonStyled {...props} />
));

export default OsButton;
