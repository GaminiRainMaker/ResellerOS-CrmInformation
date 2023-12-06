import styled from '@emotion/styled';
import {Modal} from '../antd/Modal';

export const OSModalStyle = styled(Modal)<{styleFooter?: boolean}>`
  .ant-modal-close {
    // :hover {
    //   background-color: transparent;
    // }
    color: #2a2a2a;
  }
  &.ant-modal .ant-modal-close {
    top: -10px;
    inset-inline-end: -10px;
    // background: white;
    padding: 0px;
    margin: 0px;
  }
  .ant-modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(28, 53, 87, 0.5);
    backdrop-filter: blur(8px);
  }
`;
