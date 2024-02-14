/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import {Button} from '../antd/Button';

export const ButtonStyled = styled(Button)<{buttontype?: any}>`
  display: inline-flex;
  justify-content: ${(props) => {
    if (props.buttontype === 'BUILD_BUTTON') {
      return 'start';
    }
    return 'center';
  }};
  align-items: center;
  gap: var(--Corners, 8px);
  box-shadow: none;
  cursor: pointer;
  background: ${(props) => {
    if (props.buttontype === 'PRIMARY') {
      return '#1c3557 !important';
    }
    if (props.buttontype === 'BUILD_BUTTON') {
      return '#E9F0F7 !important';
    }
    if (props.buttontype === 'PRIMARY_SMALL') {
      return '#1c3557 !important';
    }
    if (props.buttontype === 'PRIMARY_ICON') {
      return '#1c3557 !important';
    }
    if (props.buttontype === 'PRIMARY_DISABLED') {
      return '#C7CDD5 !important';
    }
    if (props.buttontype === 'SECONDARY') {
      return 'transperent !important';
    }
    if (props.buttontype === 'SECONDARY_DISABLED') {
      return 'transperent !important';
    }
    return '';
  }};
  // border: 1px solid #14263e !important;
  border: ${(props) => {
    if (props.buttontype === 'PRIMARY') {
      return '1px solid #14263e !important';
    }
    if (props.buttontype === 'BUILD_BUTTON') {
      return '1px solid #E9F0F7 !important';
    }
    if (props.buttontype === 'PRIMARY_SMALL') {
      return '1px solid #14263e !important';
    }
    if (props.buttontype === 'PRIMARY_ICON') {
      return '1px solid #14263e !importantt';
    }
    if (props.buttontype === 'PRIMARY_DISABLED') {
      return 'transparent !important';
    }
    if (props.buttontype === 'SECONDARY') {
      return '1px solid #14263E !important';
    }
    if (props.buttontype === 'SECONDARY_DISABLED') {
      return '1px solid #C6CDD5 !important';
    }
    return '#14263E !important';
  }};
  color: ${(props) => {
    if (props.buttontype === 'PRIMARY') {
      return 'white !important';
    }
    if (props.buttontype === 'BUILD_BUTTON') {
      return '#2364AA !important';
    }
    if (props.buttontype === 'PRIMARY_SMALL') {
      return 'white !important';
    }
    if (props.buttontype === 'PRIMARY_ICON') {
      return 'white !important';
    }
    if (props.buttontype === 'PRIMARY_DISABLED') {
      return 'white !important';
    }
    if (props.buttontype === 'SECONDARY') {
      return '#14263E !important';
    }
    if (props.buttontype === 'SECONDARY_DISABLED') {
      return '#C6CDD5!important';
    }
    return '#14263E !important';
  }};

  padding: ${(props) => {
    if (props.buttontype === 'PRIMARY') {
      return '12px 24px';
    }
    if (props.buttontype === 'PRIMARY_SMALL') {
      return '10px 20px';
    }
    if (props.buttontype === 'PRIMARY_ICON') {
      return '12px';
    }

    return '';
  }};
  height: ${(props) => {
    if (props.buttontype === 'PRIMARY') {
      return '48px';
    }
    if (props.buttontype === 'PRIMARY_SMALL') {
      return '40px';
    }
    if (props.buttontype === 'BUILD_BUTTON') {
      return '44px';
    }
    return '48px';
  }};
  width: ${(props) => {
    if (props.buttontype === 'BUILD_BUTTON') {
      return '130px';
    }
    return 'auto';
  }};
  &.ant-btn:not(:disabled):focus-visible {
    outline: 4px solid var(--foundation-secondary-2-secondary-2200, #a6d6ee);
  }
  &.ant-btn-primary {
    width: 100%;
  }
`;
