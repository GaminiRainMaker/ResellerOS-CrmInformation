import React from 'react';
import {ProgressProps} from '../antd/Progress';
import {OsProgressStyle} from './styled-components';

const OsProgress: React.FC<ProgressProps> = (props) => (
  <OsProgressStyle
    size="small"
    {...props}
    strokeWidth={10}
    strokeLinecap="butt"
    gapPosition="left"
  />
);

export default OsProgress;
