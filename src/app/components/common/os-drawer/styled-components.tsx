import styled from '@emotion/styled';
import {Drawer} from '../antd/Drawer';

export const OsDrawerStyle = styled(Drawer)`
  background: red;
  .ant-drawer .ant-drawer-header-title {
    display: flex;
    flex: 1;
    align-items: center;
    min-width: 0;
    min-height: 0;
    flex-direction: row-reverse;
  }
`;
