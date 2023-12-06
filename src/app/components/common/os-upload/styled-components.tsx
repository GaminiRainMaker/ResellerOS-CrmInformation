import styled from '@emotion/styled';
import {Upload} from 'antd';

const {Dragger} = Upload;

export const OSDraggerStyle = styled(Dragger)`
  &.ant-upload-wrapper .ant-upload-drag {
    background: var(--foundation-n-pri-2-n-30, #f0f4f7);
    border: none;
  }
`;
export const OSUploadStyle = styled(Upload)`
  &.ant-upload-wrapper .ant-upload-list {
    // display: block;
    .ant-upload-list-item-container {
      margin-right: 20px;
    }
  }
`;
