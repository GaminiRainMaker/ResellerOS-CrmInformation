import React, {FC} from 'react';
import I, {InputProps} from 'antd/es/input/Input';
import In, {InputNumberProps} from 'antd/es/input-number';
import Ip, {PasswordProps} from 'antd/es/input/Password';

export type {InputProps, InputNumberProps, PasswordProps};
export const Input: FC<InputProps> = (props) => <I {...props} />;
export const InputNumber: FC<InputNumberProps> = (props) => <In {...props} />;
export const InputNumberPassword: FC<PasswordProps> = (props) => (
  <Ip {...props} />
);
