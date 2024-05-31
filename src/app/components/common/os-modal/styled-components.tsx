/* eslint-disable @typescript-eslint/indent */
import styled from '@emotion/styled';
import {Modal} from '../antd/Modal';

export const OSModalStyle = styled(Modal)<{
  styleFooter?: boolean;
  bodyPadding?: number;
}>`
  .ant-modal-close {
    :hover {
      background-color: transparent;
    }
  }
  &.ant-modal .ant-modal-close {
    top: -12px;
    inset-inline-end: -15px;
    padding: 0px;
    margin: 0px;
  }
  &.ant-modal .ant-modal-close-x {
    display: unset;
  }
  .ant-modal-content {
    padding: ${(props) =>
      props.bodyPadding ? `${props.bodyPadding}px` : '0px'};
  }

  border-radius: 10px;
`;
