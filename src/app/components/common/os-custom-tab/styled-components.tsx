import styled from '@emotion/styled';
import {GlobalToken} from 'antd/es/theme/interface';

export const CustomTabStyle = styled.div<{token: GlobalToken}>`
  display: flex;
  min-width: 292px;
  max-width: 292px;
  padding: 36px 24px;
  background: ${({token}) => token.colorBgContainer};
  border-radius: 12px;
`;
