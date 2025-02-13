import styled from '@emotion/styled';
import {Input, InputNumber, InputNumberPassword} from '../antd/Input';
import {Select} from '../antd/Select';

export const InputStyled = styled(Input)`
  display: flex;
  height: 48px;
  padding: 12px;
  align-items: center;
  gap: var(--Corners, 8px);
  align-self: stretch;
  border-radius: 12px;
  background: none !important;

  &.ant-input {
    border: 1px solid #a3a3a3;
  }
  &.ant-input:focus-visible {
    border-color: none;
    box-shadow: none;
    border: 4px solid var(--foundation-secondary-21-secondary-21200, #a6d6ee);
    outline: none;
    background: none !important;
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
export const SearchInputStyled2 = styled(Select)`
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
  padding: 0px;
  align-items: center;
  gap: var(--Corners, 8px);
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--foundation-neutrals-black-n-70, #a3a3a3);
  &.ant-input-number-out-of-range .ant-input-number-input-wrap input {
    color: black;
  }

  &.ant-input:focus-visible {
    border-color: none;
    box-shadow: none;
    border: 4px solid var(--foundation-secondary-21-secondary-21200, #a6d6ee);
    outline: none;
  }
`;
