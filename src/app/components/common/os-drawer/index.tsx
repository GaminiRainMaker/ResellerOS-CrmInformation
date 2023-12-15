import React from 'react';
import {DrawerProps} from 'antd';
import {OsDrawerStyle} from './styled-components';

const OsDrawer: React.FC<DrawerProps> = (props) => (
  <OsDrawerStyle
    styles={{
      header: {
        display: 'flex',
        flexDirection: 'row-reverse',
      },
    }}
    {...props}
  />
);

export default OsDrawer;
