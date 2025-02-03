import styled from '@emotion/styled';
import {Avatar, Upload} from 'antd';
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
export const OSDraggerStyleForSupport = styled(Dragger)`
  &.ant-upload-wrapper .ant-upload-drag {
    background: var(--foundation-n-pri-2-n-30, #f0f4f7);
    border: 1px solid grey;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
    // background: cyan;
    display: flex;
    width: 20px;
    height: 164px;
    padding: 14px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
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

export const FormUploadCardColStyle = styled(Col)<{}>`
  display: flex;
  width: 246px;
  height: 102px;
  padding: 18px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #f8fafb;
  position: relative;
  text-align: center;
`;
export const AtachmentStyleCol = styled(Col)`
  width: fit-content;
  padding: 4px 12px;
  background: #ecf2f5;
  border-radius: 50px;
`;

export const DraggerStyle = styled(Dragger)`
  &.ant-upload-wrapper .ant-upload-drag {
    background: white
    border: none;
  }
  &.ant-upload-wrapper .ant-upload-list .ant-upload-list-item {
    background: red;
    display: flex;
    // width: 192px;
    height: 102px;
    padding: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    word-break: break-word;
    display: revert-layer;
    border-radius: 12px;
  }
  background: red;
`;
export const DraggerStyleDiv = styled.div`
  background: red;
  display: flex;
  // width: 192px;
  height: 102px;
  padding: 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  word-break: break-word;
  display: revert-layer;
  border-radius: 12px;
  background: white;
  border: 1px dashed #3da5d9;
`;
