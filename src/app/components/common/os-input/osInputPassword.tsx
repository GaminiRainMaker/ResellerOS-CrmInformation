import React from 'react';
import {PasswordProps} from '../antd/Input';
import {InputStyled} from './styled-components';

const OsInputPassword: React.FC<PasswordProps> = (props) => (
  <InputStyled {...props} />
);

export default OsInputPassword;
