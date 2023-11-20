/* eslint-disable import/prefer-default-export */
import styled from '@emotion/styled';
import {Button} from '../antd/Button';

export const ButtonStyled = styled(Button)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--Corners, 8px);
  box-shadow: none;
  //   font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.6px;
  cursor: pointer;
  height: 56px;
  padding: 16px 32px;
`;
