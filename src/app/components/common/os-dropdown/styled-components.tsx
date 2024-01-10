import styled from '@emotion/styled';
import {GlobalToken} from 'antd/es/theme';
import {Dropdown} from '../antd/DropDown';

export const OsDropDownStyle = styled(Dropdown)<{token: GlobalToken}>`
  padding: 12px;
  width: 48px;
  height: 48px !important;
  background: ${({token}) => token.colorPrimary};
  border-radius: 12px;
  cursor: pointer;
`;
