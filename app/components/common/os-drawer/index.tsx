import React from 'react';
import {DrawerProps} from 'antd';
import {OsDrawerStyle} from './styled-components';

const OsDrawer: React.FC<DrawerProps> = (props) => <OsDrawerStyle {...props} />;

export default OsDrawer;
