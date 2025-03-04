import React from 'react';
import {OsCardStyle} from './styled-components';
import {CardProps} from '../antd/Card';

export const OsCard: React.FC<CardProps> = ({...props}) => (
  <OsCardStyle {...props} />
);
