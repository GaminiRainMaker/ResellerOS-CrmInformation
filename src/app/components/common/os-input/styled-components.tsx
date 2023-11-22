import styled from '@emotion/styled';
import {Input} from '../antd/Input';

export const InputStyled = styled(Input)`
  border-radius: 48px;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
  font-size: 12px;
  height: 32px;
  & ::placeholder {
    color: #767676;
  }
  height: ${(props) => props.height || 'auto'};
`;
