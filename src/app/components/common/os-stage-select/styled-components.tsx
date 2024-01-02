/* eslint-disable @typescript-eslint/indent */
import styled from '@emotion/styled';
import {Select} from '../antd/Select';

export const StageSelectStyle = styled(Select)<{
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
}>`
  width: fit-content;
  .ant-select-selector {
    display: flex;
    padding: 4px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 50px;
    color: ${(props) => (props.color ? props.color : 'red')};
    background: ${(props) =>
      props.backgroundColor ? props.backgroundColor : 'red'};
  }
  &.ant-select-single {
    border-radius: 50px;

    background: ${(props) =>
      props.backgroundColor ? props.backgroundColor : 'red'};
    border: ${(props) =>
      props.borderColor ? `1px solid ${props.borderColor}` : '1px solid black'};
  }
`;
