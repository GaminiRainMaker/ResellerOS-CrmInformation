/* eslint-disable react/no-children-prop */
import React, {FC} from 'react';
import {EllipsisVerticalIcon} from '@heroicons/react/24/outline';
import {DropdownProps} from 'antd';
import {OsDropDownStyle} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';

const OsDropdown: FC<DropdownProps> = ({menu}) => {
  const [token] = useThemeToken();

  return (
    <OsDropDownStyle
      token={token}
      menu={menu}
      placement="bottomRight"
      trigger={['click']}
    >
      <EllipsisVerticalIcon width={24} color="white" />
    </OsDropDownStyle>
  );
};

export default OsDropdown;
