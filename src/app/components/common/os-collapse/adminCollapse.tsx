/* eslint-disable react/no-unstable-nested-components */
import {FC} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import {CollapseProps} from '../antd/Collapse';
import {OsCollapseStyleForAdmin} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';

const OsCollapseAdmin: FC<CollapseProps> = ({items, ...props}) => {
  const [token] = useThemeToken();
  return (
    <OsCollapseStyleForAdmin
      defaultActiveKey={['1', '2', '3']}
      expandIconPosition="end"
      items={items}
      ghost
      {...props}
      expandIcon={() => (
        <ChevronDownIcon
          className="viewIcon"
          width={24}
          style={{color: token.colorInfoBorder}}
        />
      )}
    />
  );
};

export default OsCollapseAdmin;
