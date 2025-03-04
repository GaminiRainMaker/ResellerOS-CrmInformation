import React, {forwardRef} from 'react';
import {InputNumberProps} from '../antd/Input';
import {InputNumberStyled} from './styled-components';

const OsInputNumber: React.FC<InputNumberProps> = forwardRef((props, ref) => (
  <InputNumberStyled controls={false} {...props} />
));

export default OsInputNumber;
