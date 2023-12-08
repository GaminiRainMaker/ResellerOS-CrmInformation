/* eslint-disable react/no-unstable-nested-components */
import {FC} from 'react';
import {CollapseProps} from '../antd/Collapse';
import useThemeToken from '../hooks/useThemeToken';
import {OsCollapseStyle} from './styled-components';

const OsCollapse: FC<CollapseProps> = ({items}) => {
  const [token] = useThemeToken();

  return (
    <OsCollapseStyle
      expandIconPosition="start"
      items={items}
      ghost
      //   expandIcon={() => (
      //     <ChevronDownIcon width={18} style={{color: token.colorLink}} />
      //   )}
    />
  );
};

export default OsCollapse;
