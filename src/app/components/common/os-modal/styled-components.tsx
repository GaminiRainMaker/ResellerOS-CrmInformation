import styled from '@emotion/styled';
import {Modal} from '../antd/Modal';

export const OSModalStyle = styled(Modal)<{styleFooter?: boolean}>`
  .ant-modal-body {
    margin-bottom: 25px;
  }
  ${(props) =>
    props.styleFooter
      ? `.ant-modal-footer {
    position: absolute;
    bottom: 0;
    padding: 10px 4px 25px 4px;
    right: 18px;
    width: 94%;
    background: linear-gradient(0deg, #ffffff 32.84%, rgba(255, 255, 255, 0) 110.45%);
  }`
      : null}
  .ant-modal-close {
    :hover {
      background-color: transparent;
    }
    color: #2a2a2a;
  }
  .ant-btn-default {
    :hover {
      border-color: #378483;
      color: #378483;
      box-shadow: 0px 4px 8px -2px #0d5a580f;
    }
  }
`;
