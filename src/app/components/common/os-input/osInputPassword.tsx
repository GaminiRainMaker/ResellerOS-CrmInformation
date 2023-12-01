import React from 'react';
import {PasswordProps} from '../antd/Input';
import {InputPasswordStyled} from './styled-components';

const OsInputPassword: React.FC<PasswordProps> = (props) => (
  <InputPasswordStyled {...props} />
);

export default OsInputPassword;
