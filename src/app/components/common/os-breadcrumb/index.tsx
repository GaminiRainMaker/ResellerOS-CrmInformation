import React from 'react';
import {ChevronRightIcon} from '@heroicons/react/24/outline';
import {OsBreadCrumbStyle} from './styled-components';
import {BreadCrumbProps} from './breadcrumb-interfcae';
import useThemeToken from '../hooks/useThemeToken';

const OsBreadCrumb: React.FC<BreadCrumbProps> = ({items}) => {
  const [token] = useThemeToken();

  return (
    <OsBreadCrumbStyle
      separator={
        <ChevronRightIcon
          width={24}
          height={24}
          color={token?.colorInfoBorder}
        />
      }
      items={items}
    />
  );
};
export default OsBreadCrumb;
