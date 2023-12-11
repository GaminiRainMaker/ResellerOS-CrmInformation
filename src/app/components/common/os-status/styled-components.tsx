import styled from '@emotion/styled';
import {Tag} from '../antd/Tag';

interface ITagProps {
  textcolor: string;
  border?: string;
}

export const CustomTag = styled(Tag)<ITagProps>`
  border-radius: 50px;
  display: flex;
  padding: 4px 16px;
  &.ant-tag {
    color: ${(props) => props?.textcolor};
    border: 1px solid ${(props) => props.border};
    font-weight: 500;
    width: fit-content;
    font-size: 14px;
  }
`;
