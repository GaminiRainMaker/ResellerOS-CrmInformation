import styled from '@emotion/styled';
import {Upload} from 'antd';
import {Avatar} from '../antd/Avatar';
import {Col} from '../antd/Grid';

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
export const UploadCardAvatarStyle = styled(Avatar)<{colorErrorBg?: string}>`
  position: absolute;
  top: 0%;
  right: 0%;
  cursor: pointer;
  border-radius: 12px;
  background: ${(props) => `${props?.colorErrorBg}`};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const UploadCardColStyle = styled(Col)<{}>`
  display: flex;
  width: 192px;
  height: 164px;
  padding: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #f8fafb;
  position: relative;
  text-align: center;
`;
