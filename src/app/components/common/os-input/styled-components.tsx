import styled from '@emotion/styled';
import {Input, InputNumber, InputNumberPassword} from '../antd/Input';

export const InputStyled = styled(Input)`
  display: flex;
  height: 48px;
  padding: 12px;
  align-items: center;
  gap: var(--Corners, 8px);
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--foundation-neutrals-black-n-70, #a3a3a3);
  &.ant-input:focus-visible {
    border-color: none;
    box-shadow: none;
    border: 4px solid var(--foundation-secondary-21-secondary-21200, #a6d6ee);
    outline: none;
  }
`;
export const SearchInputStyled = styled(Input)`
  display: flex;
  height: 48px;
  align-items: center;
  gap: 8px;
  border-radius: 50px;
  background: var(--foundation-n-pri-1-n-30, #edeff2);
  &.ant-input-affix-wrapper > input.ant-input {
    background: none;
  }
`;
export const InputPasswordStyled = styled(InputNumberPassword)`
  display: flex;
  height: 48px;
  padding: 12px;
  align-items: center;
  gap: var(--Corners, 8px);
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--foundation-neutrals-black-n-70, #a3a3a3);
  width: 458px;
  &.ant-input:focus-visible {
    border-color: none;
    box-shadow: none;
    border: 4px solid var(--foundation-secondary-21-secondary-21200, #a6d6ee);
    outline: none;
  }
`;

export const InputNumberStyled = styled(InputNumber)`
  display: flex;
  height: 48px;
  padding: 12px;
  align-items: center;
  gap: var(--Corners, 8px);
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--foundation-neutrals-black-n-70, #a3a3a3);
  &.ant-input:focus-visible {
    border-color: none;
    box-shadow: none;
    border: 4px solid var(--foundation-secondary-21-secondary-21200, #a6d6ee);
    outline: none;
  }
`;
