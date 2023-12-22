import {BreadcrumbItemProps} from 'antd';
import React from 'react';
import {OsBreadCrumbStyle} from './styled-components';

const OsBreadCrumb: React.FC<BreadcrumbItemProps> = (props) => (
  <OsBreadCrumbStyle {...props} />
);

export default OsBreadCrumb;
