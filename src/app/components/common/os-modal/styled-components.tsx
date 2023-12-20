import styled from '@emotion/styled';
import {Modal} from '../antd/Modal';

export const OSModalStyle = styled(Modal)<{styleFooter?: boolean}>`
  .ant-modal-close {
    :hover {
      background-color: transparent;
    }
  }
  &.ant-modal .ant-modal-close {
    top: -18px;
    inset-inline-end: -10px;
    padding: 0px;
    margin: 0px;
  }
  &.ant-modal .ant-modal-close-x {
    display: unset;
  }
  .ant-modal-content {
    padding: 0px;
  }
  border-radius: 10px;
`;
