import React, {forwardRef} from 'react';
import {InputProps} from '../antd/Input';
import {InputStyled} from './styled-components';

const OsInput: React.FC<InputProps> = forwardRef((props, ref) => (
  <InputStyled {...props} />
));

export default OsInput;
