import styled from '@emotion/styled';
import {Upload} from 'antd';

const {Dragger} = Upload;

export const OSUploadStyle = styled(Dragger)`
  &.ant-upload-wrapper .ant-upload-drag {
    background: var(--foundation-n-pri-2-n-30, #f0f4f7);
    border: none;
  }
`;
