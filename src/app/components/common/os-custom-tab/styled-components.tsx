import styled from '@emotion/styled';
import {GlobalToken} from 'antd/es/theme/interface';
import {Col} from '../antd/Grid';

export const CustomTabStyle = styled.div<{token: GlobalToken}>`
  display: flex;
  min-width: 292px;
  max-width: 292px;
  padding: 36px 24px;
  background: ${({token}) => token.colorBgContainer};
  border-radius: 12px;
`;
export const DealRegCustomTabStyle = styled.div<{token: GlobalToken}>`
  display: flex;
  // min-width: 292px;
  // max-width: 292px;
  // padding: 36px 24px;
  // background: ${({token}) => token.colorBgContainer};
  // border-radius: 12px;
`;

export const DealRegCustomTabHeaderStyle = styled(Col)<{
  token: GlobalToken;
}>`
  display: flex;
  width: 228px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 24px;
`;
