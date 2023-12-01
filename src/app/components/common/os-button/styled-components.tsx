/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import {Button} from '../antd/Button';

export const ButtonStyled = styled(Button)<{buttontype?: any}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--Corners, 8px);
  box-shadow: none;
  cursor: pointer;
  padding: ${(props) => {
    if (props.buttontype === 'PRIMARY') {
      return '12px 24px';
    }
    if (props.buttontype === 'PRIMARY_SMALL') {
      return '10px 20px';
    }
    return '16px 32px';
  }};
  height: ${(props) => {
    if (props.buttontype === 'PRIMARY') {
      return '48px';
    }
    if (props.buttontype === 'PRIMARY_SMALL') {
      return '40px';
    }
    return '56px';
  }};
  &.ant-btn:not(:disabled):focus-visible {
    outline: 4px solid var(--foundation-secondary-2-secondary-2200, #a6d6ee);
  }
  &.ant-btn-primary {
    width: 100%;
  }
`;
