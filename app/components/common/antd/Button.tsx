import React, {FC} from 'react';
import B, {ButtonProps} from 'antd/es/button';
import styled from '@emotion/styled';

const CustomButton = styled(B)`
  display: flex;
  align-items: center;
  box-shadow: none;
`;
export type {ButtonProps};
export const Button: FC<ButtonProps> = (props) => <CustomButton {...props} />;
