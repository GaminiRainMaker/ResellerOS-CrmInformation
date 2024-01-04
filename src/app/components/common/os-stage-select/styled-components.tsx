/* eslint-disable @typescript-eslint/indent */
import styled from '@emotion/styled';
import {Select} from '../antd/Select';

export const StageSelectStyle = styled(Select)<{
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
}>`
  width: fit-content;
  min-width: 95px;
  .ant-select-selector {
    display: flex;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 50px;
    color: ${(props) => (props.color ? props.color : '')};
  }
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
  border: ${(props) => (props.borderColor ? `1px solid ${props.borderColor}` : '')};
  background: ${(props) =>  props.backgroundColor ? props.backgroundColor : ''};
}
`;
