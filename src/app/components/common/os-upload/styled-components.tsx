import styled from '@emotion/styled';
import {Upload} from 'antd';

const {Dragger} = Upload;

export const OSDraggerStyle = styled(Dragger)`
  &.ant-upload-wrapper .ant-upload-drag {
    background: var(--foundation-n-pri-2-n-30, #f0f4f7);
    border: none;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
    background: cyan;
    display: flex;
    width: 192px;
    height: 164px;
    padding: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    word-break: break-word;
    display: revert-layer;
    border-radius: 12px;
  }
`;
export const OSUploadStyle = styled(Upload)``;
